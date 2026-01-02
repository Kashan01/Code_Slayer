import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  category: { type: String, required: true },
  order: { type: Number, required: true, unique: true },
  videoId: { type: String, default: "" },
  description: { type: String, required: true },
  starterCodes: {
    javascript: { type: String, required: true },
    python: { type: String, required: true },
    java: { type: String, required: true }
  },
  
  // Existing Examples (For display only)
  examples: [
    {
      id: Number,
      inputText: { type: String, required: true },
      outputText: { type: String, required: true },
      explanation: { type: String },
      image: { type: String }
    }
  ],
  constraints: [{ type: String, required: true }],

  // --- ADD THESE TWO NEW FIELDS ---
  
  // 1. Function Name: Tells the runner what function to call (e.g., "twoSum")
  handlerFunction: { 
    type: String, 
    required: true 
  }, 

  // 2. Hidden Test Cases: The actual data we feed to the code
  testCases: [
    {
      input: [mongoose.Schema.Types.Mixed], // "Mixed" because inputs can be arrays, numbers, strings
      output: mongoose.Schema.Types.Mixed   // Expected result
    }
  ]
  // --------------------------------

}, { timestamps: true });

const Problem = mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);

export default Problem;