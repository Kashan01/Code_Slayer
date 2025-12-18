import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Problem from "@/models/Problem";

// --- YOUR DATA HERE ---
const dummyProblems = [
  // --- ARRAYS & HASHING ---
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Array",
    order: 1,
    videoId: "UXDSeD9mN-k",
    description: "<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>",
    examples: [{ id: 1, inputText: "nums = [2,7,11,15], target = 9", outputText: "[0,1]", explanation: "nums[0] + nums[1] == 9" }],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    starterCode: "function twoSum(nums, target) {\n  // Write your code here\n};",
    companyTags: ["Google", "Amazon", "Apple", "Adobe", "Microsoft"]
  },
  {
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    difficulty: "Easy",
    category: "Array",
    order: 2,
    videoId: "3OamzN90kPg",
    description: "<p>Given an integer array <code>nums</code>, return <code>true</code> if any value appears <strong>at least twice</strong> in the array, and return <code>false</code> if every element is distinct.</p>",
    examples: [{ id: 1, inputText: "nums = [1,2,3,1]", outputText: "true", explanation: "1 appears twice" }],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    starterCode: "function containsDuplicate(nums) {\n  \n};",
    companyTags: ["Google", "Adobe", "Amazon"]
  },
  {
    title: "Valid Anagram",
    slug: "valid-anagram",
    difficulty: "Easy",
    category: "String",
    order: 3,
    videoId: "9UtInBqnCgA",
    description: "<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code>, and <code>false</code> otherwise.</p>",
    examples: [{ id: 1, inputText: "s = 'anagram', t = 'nagaram'", outputText: "true", explanation: "" }],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
    starterCode: "function isAnagram(s, t) {\n  \n};",
    companyTags: ["Facebook", "Uber", "Google", "Goldman Sachs"]
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "Medium",
    category: "String",
    order: 4,
    videoId: "vzdQHs09kmg",
    description: "<p>Given an array of strings <code>strs</code>, group <strong>the anagrams</strong> together. You can return the answer in <strong>any order</strong>.</p>",
    examples: [{ id: 1, inputText: "strs = ['eat','tea','tan','ate','nat','bat']", outputText: "[['bat'],['nat','tan'],['ate','eat','tea']]", explanation: "" }],
    constraints: ["1 <= strs.length <= 10^4"],
    starterCode: "function groupAnagrams(strs) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Salesforce", "Google"]
  },
  {
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    difficulty: "Medium",
    category: "Array",
    order: 5,
    videoId: "YPTqKIgVkJk",
    description: "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements.</p>",
    examples: [{ id: 1, inputText: "nums = [1,1,1,2,2,3], k = 2", outputText: "[1,2]", explanation: "" }],
    constraints: ["1 <= nums.length <= 10^5"],
    starterCode: "function topKFrequent(nums, k) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Oracle", "Spotify"]
  },
  {
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "Medium",
    category: "Array",
    order: 6,
    videoId: "bNvIQI2wAjk",
    description: "<p>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.</p>",
    examples: [{ id: 1, inputText: "nums = [1,2,3,4]", outputText: "[24,12,8,6]", explanation: "" }],
    constraints: ["2 <= nums.length <= 10^5"],
    starterCode: "function productExceptSelf(nums) {\n  \n};",
    companyTags: ["Amazon", "Apple", "Microsoft", "Facebook"]
  },
  {
    title: "Encode and Decode Strings",
    slug: "encode-and-decode-strings",
    difficulty: "Medium",
    category: "String",
    order: 7,
    videoId: "B1k_sxOSgv8",
    description: "<p>Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.</p>",
    examples: [{ id: 1, inputText: "['lint','code','love','you']", outputText: "['lint','code','love','you']", explanation: "" }],
    constraints: ["1 <= strs.length <= 200"],
    starterCode: "class Solution {\n  encode(strs) {}\n  decode(str) {}\n};",
    companyTags: ["Google", "Facebook", "Twitter"]
  },
  {
    title: "Longest Consecutive Sequence",
    slug: "longest-consecutive-sequence",
    difficulty: "Medium",
    category: "Array",
    order: 8,
    videoId: "P6RZZMu_maU",
    description: "<p>Given an unsorted array of integers <code>nums</code>, return the length of the longest consecutive elements sequence.</p>",
    examples: [{ id: 1, inputText: "nums = [100,4,200,1,3,2]", outputText: "4", explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4." }],
    constraints: ["0 <= nums.length <= 10^5"],
    starterCode: "function longestConsecutive(nums) {\n  \n};",
    companyTags: ["Google", "Microsoft", "Amazon", "Salesforce"]
  },

  // --- TWO POINTERS ---
  {
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    order: 9,
    videoId: "jJXJ16kPFWg",
    description: "<p>A phrase is a <strong>palindrome</strong> if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.</p>",
    examples: [{ id: 1, inputText: "s = 'A man, a plan, a canal: Panama'", outputText: "true", explanation: "amanaplanacanalpanama is a palindrome." }],
    constraints: ["1 <= s.length <= 2 * 10^5"],
    starterCode: "function isPalindrome(s) {\n  \n};",
    companyTags: ["Facebook", "Microsoft", "Amazon"]
  },
  {
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    category: "Two Pointers",
    order: 10,
    videoId: "jzZsG8n2R9A",
    description: "<p>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>",
    examples: [{ id: 1, inputText: "nums = [-1,0,1,2,-1,-4]", outputText: "[[-1,-1,2],[-1,0,1]]", explanation: "" }],
    constraints: ["0 <= nums.length <= 3000"],
    starterCode: "function threeSum(nums) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Adobe", "Microsoft"]
  },
  {
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    category: "Two Pointers",
    order: 11,
    videoId: "UuiTKBwPgAo",
    description: "<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>ith</code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>. Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>",
    examples: [{ id: 1, inputText: "height = [1,8,6,2,5,4,8,3,7]", outputText: "49", explanation: "" }],
    constraints: ["n == height.length", "2 <= n <= 10^5"],
    starterCode: "function maxArea(height) {\n  \n};",
    companyTags: ["Google", "Amazon", "Adobe", "Goldman Sachs"]
  },

  // --- SLIDING WINDOW ---
  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    category: "Sliding Window",
    order: 12,
    videoId: "1pkOgXD63yU",
    description: "<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>ith</code> day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.</p>",
    examples: [{ id: 1, inputText: "prices = [7,1,5,3,6,4]", outputText: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." }],
    constraints: ["1 <= prices.length <= 10^5"],
    starterCode: "function maxProfit(prices) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Goldman Sachs", "Apple"]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    category: "Sliding Window",
    order: 13,
    videoId: "wiGpQwO92KY",
    description: "<p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>",
    examples: [{ id: 1, inputText: "s = 'abcabcbb'", outputText: "3", explanation: "The answer is 'abc', with the length of 3." }],
    constraints: ["0 <= s.length <= 5 * 10^4"],
    starterCode: "function lengthOfLongestSubstring(s) {\n  \n};",
    companyTags: ["Amazon", "Bloomberg", "Microsoft", "Google"]
  },
  {
    title: "Longest Repeating Character Replacement",
    slug: "longest-repeating-character-replacement",
    difficulty: "Medium",
    category: "Sliding Window",
    order: 14,
    videoId: "gqXU1UyA8pk",
    description: "<p>You are given a string <code>s</code> and an integer <code>k</code>. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most <code>k</code> times.</p>",
    examples: [{ id: 1, inputText: "s = 'ABAB', k = 2", outputText: "4", explanation: "Replace the two 'A's with two 'B's or vice versa." }],
    constraints: ["1 <= s.length <= 10^5"],
    starterCode: "function characterReplacement(s, k) {\n  \n};",
    companyTags: ["Google", "Amazon", "Uber"]
  },

  // --- STACK ---
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 15,
    videoId: "WTzjTskDFMg",
    description: "<p>Given a string <code>s</code> containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.</p>",
    examples: [{ id: 1, inputText: "s = '()[]{}'", outputText: "true", explanation: "" }],
    constraints: ["1 <= s.length <= 10^4"],
    starterCode: "function isValid(s) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Microsoft", "Bloomberg"]
  },
  {
    title: "Min Stack",
    slug: "min-stack",
    difficulty: "Medium",
    category: "Stack",
    order: 16,
    videoId: "kxXDoPNBq7s",
    description: "<p>Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.</p>",
    examples: [{ id: 1, inputText: "MinStack ms = new MinStack(); ms.push(-2); ms.push(0); ms.push(-3); ms.getMin();", outputText: "-3", explanation: "" }],
    constraints: ["Methods pop, top and getMin operations will always be called on non-empty stacks."],
    starterCode: "class MinStack {\n  constructor() {}\n  push(val) {}\n  pop() {}\n  top() {}\n  getMin() {}\n};",
    companyTags: ["Amazon", "Apple", "Microsoft", "Walmart"]
  },
  {
    title: "Evaluate Reverse Polish Notation",
    slug: "evaluate-reverse-polish-notation",
    difficulty: "Medium",
    category: "Stack",
    order: 17,
    videoId: "iu0082c4HDE",
    description: "<p>Evaluate the value of an arithmetic expression in Reverse Polish Notation.</p>",
    examples: [{ id: 1, inputText: "tokens = ['2','1','+','3','*']", outputText: "9", explanation: "((2 + 1) * 3) = 9" }],
    constraints: ["1 <= tokens.length <= 10^4"],
    starterCode: "function evalRPN(tokens) {\n  \n};",
    companyTags: ["LinkedIn", "Google", "Amazon"]
  },

  // --- BINARY SEARCH ---
  {
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "Easy",
    category: "Binary Search",
    order: 18,
    videoId: "s4DPM8ct1pI",
    description: "<p>Given an array of integers <code>nums</code> which is sorted in ascending order, and an integer <code>target</code>, write a function to search <code>target</code> in <code>nums</code>. If <code>target</code> exists, then return its index. Otherwise, return <code>-1</code>.</p>",
    examples: [{ id: 1, inputText: "nums = [-1,0,3,5,9,12], target = 9", outputText: "4", explanation: "" }],
    constraints: ["1 <= nums.length <= 10^4"],
    starterCode: "function search(nums, target) {\n  \n};",
    companyTags: ["Microsoft", "Google", "Adobe"]
  },
  {
    title: "Search a 2D Matrix",
    slug: "search-a-2d-matrix",
    difficulty: "Medium",
    category: "Binary Search",
    order: 19,
    videoId: "Ber2pi2C0j0",
    description: "<p>Write an efficient algorithm that searches for a value in an <code>m x n</code> matrix. This matrix has the following properties: Integers in each row are sorted from left to right. The first integer of each row is greater than the last integer of the previous row.</p>",
    examples: [{ id: 1, inputText: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", outputText: "true", explanation: "" }],
    constraints: ["m == matrix.length", "n == matrix[i].length"],
    starterCode: "function searchMatrix(matrix, target) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Apple", "Nvidia"]
  },
  {
    title: "Koko Eating Bananas",
    slug: "koko-eating-bananas",
    difficulty: "Medium",
    category: "Binary Search",
    order: 20,
    videoId: "U2SozAs9RzA",
    description: "<p>Koko loves to eat bananas. There are <code>n</code> piles of bananas, the <code>ith</code> pile has <code>piles[i]</code> bananas. The guards have gone and will come back in <code>h</code> hours. Return the minimum integer <code>k</code> such that she can eat all the bananas within <code>h</code> hours.</p>",
    examples: [{ id: 1, inputText: "piles = [3,6,7,11], h = 8", outputText: "4", explanation: "" }],
    constraints: ["1 <= piles.length <= 10^4"],
    starterCode: "function minEatingSpeed(piles, h) {\n  \n};",
    companyTags: ["Airbnb", "Google", "Amazon"]
  },
  {
    title: "Find Minimum in Rotated Sorted Array",
    slug: "find-minimum-in-rotated-sorted-array",
    difficulty: "Medium",
    category: "Binary Search",
    order: 21,
    videoId: "nIVW4P8b1VA",
    description: "<p>Suppose an array of length <code>n</code> sorted in ascending order is rotated between <code>1</code> and <code>n</code> times. Find the minimum element.</p>",
    examples: [{ id: 1, inputText: "nums = [3,4,5,1,2]", outputText: "1", explanation: "" }],
    constraints: ["n == nums.length", "1 <= n <= 5000"],
    starterCode: "function findMin(nums) {\n  \n};",
    companyTags: ["Amazon", "Facebook", "Microsoft", "Intel"]
  },

  // --- LINKED LIST ---
  {
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    category: "Linked List",
    order: 22,
    videoId: "G0_I-ZF0S38",
    description: "<p>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>",
    examples: [{ id: 1, inputText: "head = [1,2,3,4,5]", outputText: "[5,4,3,2,1]", explanation: "" }],
    constraints: ["The number of nodes in the list is the range [0, 5000]."],
    starterCode: "function reverseList(head) {\n  \n};",
    companyTags: ["Amazon", "Adobe", "Microsoft", "Apple"]
  },
  {
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "Easy",
    category: "Linked List",
    order: 23,
    videoId: "XIdigk956u0",
    description: "<p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>. Merge the two lists in a one sorted list.</p>",
    examples: [{ id: 1, inputText: "list1 = [1,2,4], list2 = [1,3,4]", outputText: "[1,1,2,3,4,4]", explanation: "" }],
    constraints: ["The number of nodes in both lists is in the range [0, 50]."],
    starterCode: "function mergeTwoLists(list1, list2) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Google", "Oracle"]
  },
  {
    title: "Reorder List",
    slug: "reorder-list",
    difficulty: "Medium",
    category: "Linked List",
    order: 24,
    videoId: "S5bfdUTrKLM",
    description: "<p>You are given the head of a singly linked-list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln. Reorder the list to be on the following form: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …</p>",
    examples: [{ id: 1, inputText: "head = [1,2,3,4]", outputText: "[1,4,2,3]", explanation: "" }],
    constraints: ["1 <= n <= 5 * 10^4"],
    starterCode: "function reorderList(head) {\n  \n};",
    companyTags: ["Amazon", "Facebook", "Uber"]
  },
  {
    title: "Remove Nth Node From End of List",
    slug: "remove-nth-node-from-end-of-list",
    difficulty: "Medium",
    category: "Linked List",
    order: 25,
    videoId: "XVuQxVej6y8",
    description: "<p>Given the <code>head</code> of a linked list, remove the <code>nth</code> node from the end of the list and return its head.</p>",
    examples: [{ id: 1, inputText: "head = [1,2,3,4,5], n = 2", outputText: "[1,2,3,5]", explanation: "" }],
    constraints: ["The number of nodes in the list is sz.", "1 <= sz <= 30"],
    starterCode: "function removeNthFromEnd(head, n) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Google"]
  },

  // --- TREES ---
  {
    title: "Invert Binary Tree",
    slug: "invert-binary-tree",
    difficulty: "Easy",
    category: "Tree",
    order: 26,
    videoId: "OnSn2XEQ4MY",
    description: "<p>Given the <code>head</code> of a binary tree, invert the tree, and return its root.</p>",
    examples: [{ id: 1, inputText: "root = [4,2,7,1,3,6,9]", outputText: "[4,7,2,9,6,3,1]", explanation: "" }],
    constraints: ["The number of nodes in the tree is in the range [0, 100]."],
    starterCode: "function invertTree(root) {\n  \n};",
    companyTags: ["Google", "Amazon", "Microsoft"]
  },
  {
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-of-binary-tree",
    difficulty: "Easy",
    category: "Tree",
    order: 27,
    videoId: "hTM3phVI6YQ",
    description: "<p>Given the <code>root</code> of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.</p>",
    examples: [{ id: 1, inputText: "root = [3,9,20,null,null,15,7]", outputText: "3", explanation: "" }],
    constraints: ["The number of nodes in the tree is in the range [0, 10^4]."],
    starterCode: "function maxDepth(root) {\n  \n};",
    companyTags: ["Amazon", "LinkedIn", "Microsoft"]
  },
  {
    title: "Same Tree",
    slug: "same-tree",
    difficulty: "Easy",
    category: "Tree",
    order: 28,
    videoId: "vRbbcKXCxOw",
    description: "<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, write a function to check if they are the same or not.</p>",
    examples: [{ id: 1, inputText: "p = [1,2,3], q = [1,2,3]", outputText: "true", explanation: "" }],
    constraints: ["The number of nodes in both trees is in the range [0, 100]."],
    starterCode: "function isSameTree(p, q) {\n  \n};",
    companyTags: ["Amazon", "Google", "Bloomberg"]
  },
  {
    title: "Subtree of Another Tree",
    slug: "subtree-of-another-tree",
    difficulty: "Easy",
    category: "Tree",
    order: 29,
    videoId: "E36O5SWp-LE",
    description: "<p>Given the roots of two binary trees <code>root</code> and <code>subRoot</code>, return <code>true</code> if there is a subtree of <code>root</code> with the same structure and node values of <code>subRoot</code> and <code>false</code> otherwise.</p>",
    examples: [{ id: 1, inputText: "root = [3,4,5,1,2], subRoot = [4,1,2]", outputText: "true", explanation: "" }],
    constraints: ["The number of nodes in the root tree is in the range [1, 2000]."],
    starterCode: "function isSubtree(root, subRoot) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Facebook"]
  },
  {
    title: "Lowest Common Ancestor of a Binary Search Tree",
    slug: "lowest-common-ancestor-of-a-binary-search-tree",
    difficulty: "Medium",
    category: "Tree",
    order: 30,
    videoId: "gs2LMfuOR9k",
    description: "<p>Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.</p>",
    examples: [{ id: 1, inputText: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", outputText: "6", explanation: "" }],
    constraints: ["The number of nodes in the tree is in the range [2, 10^5]."],
    starterCode: "function lowestCommonAncestor(root, p, q) {\n  \n};",
    companyTags: ["Amazon", "Facebook", "Microsoft", "Twitter"]
  },
  {
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "Medium",
    category: "Tree",
    order: 31,
    videoId: "6ZnyEApgFYg",
    description: "<p>Given the <code>root</code> of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).</p>",
    examples: [{ id: 1, inputText: "root = [3,9,20,null,null,15,7]", outputText: "[[3],[9,20],[15,7]]", explanation: "" }],
    constraints: ["The number of nodes in the tree is in the range [0, 2000]."],
    starterCode: "function levelOrder(root) {\n  \n};",
    companyTags: ["LinkedIn", "Amazon", "Microsoft", "Facebook"]
  },
  {
    title: "Validate Binary Search Tree",
    slug: "validate-binary-search-tree",
    difficulty: "Medium",
    category: "Tree",
    order: 32,
    videoId: "s6ATEkipzow",
    description: "<p>Given the <code>root</code> of a binary tree, determine if it is a valid binary search tree (BST).</p>",
    examples: [{ id: 1, inputText: "root = [2,1,3]", outputText: "true", explanation: "" }],
    constraints: ["The number of nodes in the tree is in the range [1, 10^4]."],
    starterCode: "function isValidBST(root) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Bloomberg", "Facebook"]
  },
  {
    title: "Kth Smallest Element in a BST",
    slug: "kth-smallest-element-in-a-bst",
    difficulty: "Medium",
    category: "Tree",
    order: 33,
    videoId: "5LUXSvjmGCw",
    description: "<p>Given the <code>root</code> of a binary search tree, and an integer <code>k</code>, return the <code>kth</code> smallest value (1-indexed) of all the values of the nodes in the tree.</p>",
    examples: [{ id: 1, inputText: "root = [3,1,4,null,2], k = 1", outputText: "1", explanation: "" }],
    constraints: ["The number of nodes in the tree is n."],
    starterCode: "function kthSmallest(root, k) {\n  \n};",
    companyTags: ["Amazon", "Google", "Facebook"]
  },

  // --- HEAP / PRIORITY QUEUE ---
  {
    title: "Kth Largest Element in an Array",
    slug: "kth-largest-element-in-an-array",
    difficulty: "Medium",
    category: "Heap",
    order: 34,
    videoId: "XEmy13g1Qxc",
    description: "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>kth</code> largest element in the array.</p>",
    examples: [{ id: 1, inputText: "nums = [3,2,1,5,6,4], k = 2", outputText: "5", explanation: "" }],
    constraints: ["1 <= k <= nums.length <= 10^5"],
    starterCode: "function findKthLargest(nums, k) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Microsoft", "Goldman Sachs"]
  },
  {
    title: "Last Stone Weight",
    slug: "last-stone-weight",
    difficulty: "Easy",
    category: "Heap",
    order: 35,
    videoId: "B-NQYPr7gJY",
    description: "<p>You are given an array of integers <code>stones</code> where <code>stones[i]</code> is the weight of the <code>ith</code> stone. We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together.</p>",
    examples: [{ id: 1, inputText: "stones = [2,7,4,1,8,1]", outputText: "1", explanation: "" }],
    constraints: ["1 <= stones.length <= 30"],
    starterCode: "function lastStoneWeight(stones) {\n  \n};",
    companyTags: ["Amazon", "Google"]
  },

  // --- BACKTRACKING ---
  {
    title: "Permutations",
    slug: "permutations",
    difficulty: "Medium",
    category: "Backtracking",
    order: 36,
    videoId: "s7AvT7cGdSo",
    description: "<p>Given an array <code>nums</code> of distinct integers, return all the possible permutations. You can return the answer in <strong>any order</strong>.</p>",
    examples: [{ id: 1, inputText: "nums = [1,2,3]", outputText: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "" }],
    constraints: ["1 <= nums.length <= 6"],
    starterCode: "function permute(nums) {\n  \n};",
    companyTags: ["Microsoft", "Amazon", "Facebook", "Adobe"]
  },
  {
    title: "Subsets",
    slug: "subsets",
    difficulty: "Medium",
    category: "Backtracking",
    order: 37,
    videoId: "REOH22Xwdkk",
    description: "<p>Given an integer array <code>nums</code> of unique elements, return all possible subsets (the power set).</p>",
    examples: [{ id: 1, inputText: "nums = [1,2,3]", outputText: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", explanation: "" }],
    constraints: ["1 <= nums.length <= 10"],
    starterCode: "function subsets(nums) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Microsoft", "Cisco"]
  },
  {
    title: "Combination Sum",
    slug: "combination-sum",
    difficulty: "Medium",
    category: "Backtracking",
    order: 38,
    videoId: "GBKI9VSKdGg",
    description: "<p>Given an array of distinct integers <code>candidates</code> and a target integer <code>target</code>, return a list of all unique combinations of <code>candidates</code> where the chosen numbers sum to <code>target</code>.</p>",
    examples: [{ id: 1, inputText: "candidates = [2,3,6,7], target = 7", outputText: "[[2,2,3],[7]]", explanation: "" }],
    constraints: ["1 <= candidates.length <= 30"],
    starterCode: "function combinationSum(candidates, target) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Microsoft", "Uber"]
  },

  // --- GRAPHS ---
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    category: "Graph",
    order: 39,
    videoId: "pV2kpPD66nE",
    description: "<p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of '1's (land) and '0's (water), return the number of islands.</p>",
    examples: [{ id: 1, inputText: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", outputText: "1", explanation: "" }],
    constraints: ["m == grid.length", "n == grid[i].length"],
    starterCode: "function numIslands(grid) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Facebook", "Google", "Bloomberg"]
  },
  {
    title: "Clone Graph",
    slug: "clone-graph",
    difficulty: "Medium",
    category: "Graph",
    order: 40,
    videoId: "mQeF6bN8hMk",
    description: "<p>Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.</p>",
    examples: [{ id: 1, inputText: "adjList = [[2,4],[1,3],[2,4],[1,3]]", outputText: "[[2,4],[1,3],[2,4],[1,3]]", explanation: "" }],
    constraints: ["The number of nodes in the graph is in the range [0, 100]."],
    starterCode: "function cloneGraph(node) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Microsoft", "Twitter"]
  },
  {
    title: "Max Area of Island",
    slug: "max-area-of-island",
    difficulty: "Medium",
    category: "Graph",
    order: 41,
    videoId: "iJGr1OtmH0c",
    description: "<p>You are given an <code>m x n</code> binary matrix <code>grid</code>. An island is a group of 1s (representing land) connected 4-directionally (horizontal or vertical). Return the maximum area of an island in <code>grid</code>. If there is no island, return 0.</p>",
    examples: [{ id: 1, inputText: "grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0]...]", outputText: "6", explanation: "" }],
    constraints: ["m == grid.length", "n == grid[i].length"],
    starterCode: "function maxAreaOfIsland(grid) {\n  \n};",
    companyTags: ["Amazon", "Google", "Facebook"]
  },
  {
    title: "Pacific Atlantic Water Flow",
    slug: "pacific-atlantic-water-flow",
    difficulty: "Medium",
    category: "Graph",
    order: 42,
    videoId: "s-VkcjHqkGI",
    description: "<p>There is an <code>m x n</code> rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Return a list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.</p>",
    examples: [{ id: 1, inputText: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", outputText: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", explanation: "" }],
    constraints: ["m == heights.length", "n == heights[r].length"],
    starterCode: "function pacificAtlantic(heights) {\n  \n};",
    companyTags: ["Google", "Amazon", "Facebook"]
  },

  // --- DYNAMIC PROGRAMMING (1D) ---
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    category: "DP",
    order: 43,
    videoId: "Y0lT9Fck7qI",
    description: "<p>You are climbing a staircase. It takes <code>n</code> steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?</p>",
    examples: [{ id: 1, inputText: "n = 2", outputText: "2", explanation: "1. 1 step + 1 step\n2. 2 steps" }],
    constraints: ["1 <= n <= 45"],
    starterCode: "function climbStairs(n) {\n  \n};",
    companyTags: ["Amazon", "Adobe", "Microsoft", "Apple"]
  },
  {
    title: "Min Cost Climbing Stairs",
    slug: "min-cost-climbing-stairs",
    difficulty: "Easy",
    category: "DP",
    order: 44,
    videoId: "ktmwVwEl0uy",
    description: "<p>You are given an integer array <code>cost</code> where <code>cost[i]</code> is the cost of <code>ith</code> step on a staircase. Return the minimum cost to reach the top of the floor.</p>",
    examples: [{ id: 1, inputText: "cost = [10,15,20]", outputText: "15", explanation: "" }],
    constraints: ["2 <= cost.length <= 1000"],
    starterCode: "function minCostClimbingStairs(cost) {\n  \n};",
    companyTags: ["Amazon", "Google", "Microsoft"]
  },
  {
    title: "House Robber",
    slug: "house-robber",
    difficulty: "Medium",
    category: "DP",
    order: 45,
    videoId: "73r3KWiEvyk",
    description: "<p>You are a professional robber planning to rob houses along a street. Adjacent houses have security systems connected and <strong>it will automatically contact the police if two adjacent houses were broken into on the same night</strong>.</p>",
    examples: [{ id: 1, inputText: "nums = [1,2,3,1]", outputText: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3)." }],
    constraints: ["1 <= nums.length <= 100"],
    starterCode: "function rob(nums) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Google", "Cisco"]
  },
  {
    title: "House Robber II",
    slug: "house-robber-ii",
    difficulty: "Medium",
    category: "DP",
    order: 46,
    videoId: "rWAJCfYYOvM",
    description: "<p>You are a professional robber planning to rob houses along a street. This time, all houses at this place are <strong>arranged in a circle</strong>.</p>",
    examples: [{ id: 1, inputText: "nums = [2,3,2]", outputText: "3", explanation: "" }],
    constraints: ["1 <= nums.length <= 100"],
    starterCode: "function rob(nums) {\n  \n};",
    companyTags: ["Microsoft", "Amazon", "Facebook"]
  },
  {
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "Medium",
    category: "DP",
    order: 47,
    videoId: "XYQecbcd6_c",
    description: "<p>Given a string <code>s</code>, return the longest palindromic substring in <code>s</code>.</p>",
    examples: [{ id: 1, inputText: "s = 'babad'", outputText: "'bab'", explanation: "" }],
    constraints: ["1 <= s.length <= 1000"],
    starterCode: "function longestPalindrome(s) {\n  \n};",
    companyTags: ["Amazon", "Microsoft", "Facebook", "Adobe", "Google"]
  },
  {
    title: "Palindromic Substrings",
    slug: "palindromic-substrings",
    difficulty: "Medium",
    category: "DP",
    order: 48,
    videoId: "4RACzI5-du8",
    description: "<p>Given a string <code>s</code>, return the number of <strong>palindromic substrings</strong> in it.</p>",
    examples: [{ id: 1, inputText: "s = 'abc'", outputText: "3", explanation: "Three palindromic strings: 'a', 'b', 'c'." }],
    constraints: ["1 <= s.length <= 1000"],
    starterCode: "function countSubstrings(s) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Microsoft"]
  },
  {
    title: "Decode Ways",
    slug: "decode-ways",
    difficulty: "Medium",
    category: "DP",
    order: 49,
    videoId: "6aEyTjOwlJU",
    description: "<p>A message containing letters from A-Z can be encoded into numbers using the mapping 'A'->'1', 'B'->'2', ... 'Z'->'26'. Return the number of ways to decode it.</p>",
    examples: [{ id: 1, inputText: "s = '12'", outputText: "2", explanation: "'AB' (1 2) or 'L' (12)." }],
    constraints: ["1 <= s.length <= 100"],
    starterCode: "function numDecodings(s) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Microsoft", "Uber"]
  },

  // --- INTERVALS ---
  {
    title: "Insert Interval",
    slug: "insert-interval",
    difficulty: "Medium",
    category: "Intervals",
    order: 50,
    videoId: "A8NUOmlwOlM",
    description: "<p>You are given an array of non-overlapping intervals <code>intervals</code> where <code>intervals[i] = [starti, endi]</code> represent the start and the end of the <code>ith</code> interval and <code>intervals</code> is sorted in ascending order by <code>starti</code>. You are also given an interval <code>newInterval = [start, end]</code> that represents the start and end of another interval.</p>",
    examples: [{ id: 1, inputText: "intervals = [[1,3],[6,9]], newInterval = [2,5]", outputText: "[[1,5],[6,9]]", explanation: "" }],
    constraints: ["0 <= intervals.length <= 10^4"],
    starterCode: "function insert(intervals, newInterval) {\n  \n};",
    companyTags: ["Google", "Facebook", "Amazon", "LinkedIn"]
  },
  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "Medium",
    category: "Intervals",
    order: 51,
    videoId: "44H3cEC2fFM",
    description: "<p>Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.</p>",
    examples: [{ id: 1, inputText: "intervals = [[1,3],[2,6],[8,10],[15,18]]", outputText: "[[1,6],[8,10],[15,18]]", explanation: "Intervals [1,3] and [2,6] overlap, merge them into [1,6]." }],
    constraints: ["1 <= intervals.length <= 10^4"],
    starterCode: "function merge(intervals) {\n  \n};",
    companyTags: ["Amazon", "Facebook", "Microsoft", "Google", "Salesforce"]
  },
  {
    title: "Non-overlapping Intervals",
    slug: "non-overlapping-intervals",
    difficulty: "Medium",
    category: "Intervals",
    order: 52,
    videoId: "nONCGxWoUfM",
    description: "<p>Given an array of intervals <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.</p>",
    examples: [{ id: 1, inputText: "intervals = [[1,2],[2,3],[3,4],[1,3]]", outputText: "1", explanation: "[1,3] can be removed and the rest of the intervals are non-overlapping." }],
    constraints: ["1 <= intervals.length <= 10^5"],
    starterCode: "function eraseOverlapIntervals(intervals) {\n  \n};",
    companyTags: ["Facebook", "Amazon"]
  },

  // --- HARD PROBLEMS ---
  {
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "Hard",
    category: "Binary Search",
    order: 53,
    videoId: "q6IEA26hvXc",
    description: "<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return the median of the two sorted arrays. The overall run time complexity should be <code>O(log (m+n))</code>.</p>",
    examples: [{ id: 1, inputText: "nums1 = [1,3], nums2 = [2]", outputText: "2.00000", explanation: "" }],
    constraints: ["nums1.length == m", "nums2.length == n", "0 <= m <= 1000", "0 <= n <= 1000"],
    starterCode: "function findMedianSortedArrays(nums1, nums2) {\n  \n};",
    companyTags: ["Google", "Amazon", "Microsoft", "Apple", "Uber"]
  },
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    category: "Two Pointers",
    order: 54,
    videoId: "ZI2z5pq0TqA",
    description: "<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>",
    examples: [{ id: 1, inputText: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", outputText: "6", explanation: "" }],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4"],
    starterCode: "function trap(height) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Google", "Microsoft", "Twitter", "Goldman Sachs"]
  },
  {
    title: "Merge k Sorted Lists",
    slug: "merge-k-sorted-lists",
    difficulty: "Hard",
    category: "Heap",
    order: 55,
    videoId: "q5bR2tpQ5Ns",
    description: "<p>You are given an array of <code>k</code> linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.</p>",
    examples: [{ id: 1, inputText: "lists = [[1,4,5],[1,3,4],[2,6]]", outputText: "[1,1,2,3,4,4,5,6]", explanation: "" }],
    constraints: ["k == lists.length", "0 <= k <= 10^4"],
    starterCode: "function mergeKLists(lists) {\n  \n};",
    companyTags: ["Facebook", "Amazon", "Google", "Microsoft", "Twitter"]
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