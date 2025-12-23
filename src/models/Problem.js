import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  // --- List View Fields (Existing) ---
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  category: { type: String, required: true },
  order: { type: Number, required: true, unique: true },
  videoId: { type: String, default: "" },
  companyTags: [String],

  // --- Single Problem View Fields (NEW) ---
  description: { 
    type: String, 
    required: true // Can be HTML or Markdown
  },
  examples: [
    {
      id: Number,
      inputText: { type: String, required: true },
      outputText: { type: String, required: true },
      explanation: { type: String },
      image: { type: String } // Optional diagram
    }
  ],
  constraints: [
    { type: String, required: true } // e.g., "2 <= nums.length <= 10^4"
  ],
  starterCode: { 
    type: String, 
    required: true // The default code showing in the editor
  },
  // Future: handlerFunction and testCases for the code execution engine
}, { timestamps: true });

const Problem = mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);

export default Problem;