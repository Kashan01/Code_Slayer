import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Problem from "@/models/Problem";



const dummyProblems = [
  // 1. Two Sum (Easy)
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Array",
    order: 1,
    videoId: "UXDSeD9mN-k",
    description: "<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>",
    starterCode: "function twoSum(nums, target) {\n  // Write your code here\n};",
    handlerFunction: "twoSum",
    constraints: ["2 <= nums.length <= 10^4"],
    examples: [
      {
        id: 1,
        inputText: "nums = [2,7,11,15], target = 9",
        outputText: "[0,1]",
        explanation: "nums[0] + nums[1] == 9"
      }
    ],
    testCases: [
      { input: [[2, 7, 11, 15], 9], output: [0, 1] },
      { input: [[3, 2, 4], 6], output: [1, 2] },
      { input: [[3, 3], 6], output: [0, 1] }
    ]
  },

  // 2. Reverse String (Easy)
  {
    title: "Reverse String",
    slug: "reverse-string",
    difficulty: "Easy",
    category: "String",
    order: 2,
    videoId: "tG0-bQZ9zP4",
    description: "<p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>",
    starterCode: "function reverseString(s) {\n  // Write your code here\n  return s.reverse();\n};",
    handlerFunction: "reverseString",
    constraints: ["1 <= s.length <= 10^5"],
    examples: [
      {
        id: 1,
        inputText: 's = ["h","e","l","l","o"]',
        outputText: '["o","l","l","e","h"]',
        explanation: "Reverse the array in-place."
      }
    ],
    testCases: [
      { input: [["h","e","l","l","o"]], output: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], output: ["h","a","n","n","a","H"] }
    ]
  },

  // 3. Palindrome Number (Medium)
  {
    title: "Palindrome Number",
    slug: "palindrome-number",
    difficulty: "Medium",
    category: "Math",
    order: 3,
    videoId: "yqbL18D455",
    description: "<p>Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a palindrome, and <code>false</code> otherwise.</p>",
    starterCode: "function isPalindrome(x) {\n  // Write your code here\n};",
    handlerFunction: "isPalindrome",
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    examples: [
      {
        id: 1,
        inputText: "x = 121",
        outputText: "true",
        explanation: "121 reads as 121 from left to right and from right to left."
      }
    ],
    testCases: [
      { input: [121], output: true },
      { input: [-121], output: false },
      { input: [10], output: false }
    ]
  }
];

// --- THE CRITICAL PART: NAMED EXPORT ---
// Correct: export async function POST
// Wrong: export default async function POST
export async function POST(request) {
  try {
    await connectDB();

    // 1. Clear old data to avoid duplicates
    await Problem.deleteMany({});

    // 2. Insert new data
    await Problem.insertMany(dummyProblems);

    return NextResponse.json({
      message: "Database seeded successfully!",
      count: dummyProblems.length
    }, { status: 201 });

  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}