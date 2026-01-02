import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Problem from "@/models/Problem";
import Submission from "@/models/Submission";
import User from "@/models/User";
import axios from "axios";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

// --- HELPER: GENERATE DRIVER CODE ---
const generateDriverCode = (language, userCode, problem) => {
  const { handlerFunction, testCases } = problem;
  
  switch (language) {
    case "javascript":
      return `
        ${userCode}
        const testCases = ${JSON.stringify(testCases)};
        try {
          testCases.forEach((test) => {
            const result = ${handlerFunction}(...test.input);
            console.log(JSON.stringify(result));
          });
        } catch (error) {
          console.error(error.message);
        }
      `;

    case "python":
      // Python needs to map 'true'/'false' to 'True'/'False' for input arrays
      // But standard JSON is compatible.
      return `
import json
import sys

# User Code
${userCode}

# Driver Code
test_cases = ${JSON.stringify(testCases)}

for test in test_cases:
    try:
        # Prepare arguments
        args = test['input']
        
        # Call the function (Dynamic calling)
        result = ${handlerFunction}(*args)
        
        # Print result as JSON string
        print(json.dumps(result))
    except Exception as e:
        print(str(e), file=sys.stderr)
      `;

    case "java":
      // Java is verbose. We assume user writes "class Solution { ... }"
      // We wrap it in a Main class.
      // NOTE: Handling generic inputs in Java dynamically is hard without reflection.
      // For this MVP, we hardcode a specific structure or assume standard primitives.
      // This is a simplified Generic Driver for LeetCode style.
      return `
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        try {
            Solution sol = new Solution();
            
            // Hardcoded input parsing for Two Sum (MVP Approach)
            // Real LeetCode uses complex reflection here.
            
            // Test Case 1
            int[] nums1 = {2, 7, 11, 15};
            int target1 = 9;
            printResult(sol.twoSum(nums1, target1));
            
            // Test Case 2
            int[] nums2 = {3, 2, 4};
            int target2 = 6;
            printResult(sol.twoSum(nums2, target2));
            
             // Test Case 3
            int[] nums3 = {3, 3};
            int target3 = 6;
            printResult(sol.twoSum(nums3, target3));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    // Helper to print arrays as valid JSON style "[1, 2]"
    public static void printResult(Object result) {
        if (result instanceof int[]) {
            System.out.println(Arrays.toString((int[]) result));
        } else {
            System.out.println(result);
        }
    }
}

// User Code appended here
${userCode}
      `;

    default:
      return null;
  }
};

// --- HELPER: GET PISTON LANGUAGE VERSION ---
const getLanguageConfig = (lang) => {
  switch(lang) {
    case "javascript": return { language: "javascript", version: "18.15.0" };
    case "python": return { language: "python", version: "3.10.0" };
    case "java": return { language: "java", version: "15.0.2" };
    default: return null;
  }
}

export async function POST(request) {
  try {
    const { code, language, slug } = await request.json();

    // 1. AUTH & DB SETUP
    const headersList = await headers();
    const token = headersList.get("authorization")?.split(" ")[1];
    let userId = null;
    if (token) {
      try {
        userId = jwt.verify(token, process.env.JWT_SECRET).id;
      } catch (e) {}
    }


    await connectDB();
    const problem = await Problem.findOne({ slug });
    if (!problem) return NextResponse.json({ error: "Problem not found" }, { status: 404 });

    // 2. GENERATE DRIVER CODE
    const driverCode = generateDriverCode(language, code, problem);
    const langConfig = getLanguageConfig(language);

    if (!driverCode || !langConfig) {
      return NextResponse.json({ error: "Language not supported" }, { status: 400 });
    }

    // 3. EXECUTE ON PISTON
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: langConfig.language,
      version: langConfig.version,
      files: [{ content: driverCode }],
    });

    const { run } = response.data;

    // 4. VERDICT LOGIC
    let verdict = {
      status: "Accepted",
      message: "All test cases passed!",
      success: true
    };

    if (run.stderr) {
      verdict = { status: "Runtime Error", message: run.stderr, success: false };
    } else {
      const outputs = run.stdout.split("\n").filter(line => line.trim() !== "");
      
      // Compare outputs
      for (let i = 0; i < problem.testCases.length; i++) {
        // We normalize to string to compare easily across languages
        const expected = JSON.stringify(problem.testCases[i].output).replace(/\s/g, "");
        const actual = (outputs[i] || "").replace(/\s/g, ""); // Remove spaces (e.g. [ 0, 1 ] vs [0,1])

        if (actual !== expected) {
          verdict = {
            status: "Wrong Answer",
            message: `Test Case ${i + 1} Failed`,
            expected: problem.testCases[i].output,
            actual: actual,
            success: false
          };
          break;
        }
      }
    }

    // 5. SAVE SUBMISSION
    if (userId) {
      await Submission.create({
        userId,
        problemId: problem._id,
        code,
        language,
        status: verdict.status
      });
      if (verdict.status === "Accepted") {
        await User.findByIdAndUpdate(userId, { $addToSet: { solvedProblems: problem._id } });
      }
    }

    return NextResponse.json(verdict);

  } catch (error) {
    console.error("Run Error:", error);
    return NextResponse.json({ error: "Execution Error" }, { status: 500 });
  }
}