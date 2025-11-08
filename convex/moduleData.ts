type QuestionsSectionProps = {
  id: string;
  title?: string;
  description?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  className?: string;
  expectedOutput?: string;
};

const dummyData: QuestionsSectionProps[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

  You may assume that each input would have exactly one solution, and you may not use the same element twice.

  You can return the answer in any order.

  Example 1:

  Input: nums = [2,7,11,15], target = 9
  Output: [0,1]
  Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

  Example 2:

  Input: nums = [3,2,4], target = 6
  Output: [1,2]

  Example 3:

  Input: nums = [3,3], target = 6
  Output: [0,1]`,
    difficulty: "Easy",
    expectedOutput: "0 1\n1 2\n0 1",
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    description: `Given an integer n, return a string array answer (1-indexed) where:
  
  - answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
  - answer[i] == "Fizz" if i is divisible by 3.
  - answer[i] == "Buzz" if i is divisible by 5.
  - answer[i] == i (as a string) if none of the above conditions are true.
  
  Example 1:
  
  Input: n = 3
  Output: ["1","2","Fizz"]
  
  Example 2:
  
  Input: n = 5
  Output: ["1","2","Fizz","4","Buzz"]
  
  Example 3:
  
  Input: n = 15
  Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`,
    difficulty: "Easy",
    expectedOutput:
      '["1","2","Fizz"]\n["1","2","Fizz","4","Buzz"]\n["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]',
  },
  {
    id: "palindrome-number",
    title: "Palindrome Number",
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.
  
  Example 1:
  
  Input: x = 121
  Output: true
  Explanation: 121 reads as 121 from left to right and from right to left.
  
  Example 2:
  
  Input: x = -121
  Output: false
  Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
  
  Example 3:
  
  Input: x = 10
  Output: false
  Explanation: Reads 01 from right to left. Therefore it is not a palindrome.`,
    difficulty: "Easy",
    expectedOutput: "true\nfalse\nfalse",
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.
  
  You must do this by modifying the input array in-place with O(1) extra memory.
  
  Example 1:
  
  Input: s = ["h","e","l","l","o"]
  Output: ["o","l","l","e","h"]
  
  Example 2:
  
  Input: s = ["H","a","n","n","a","h"]
  Output: ["h","a","n","n","a","H"]`,
    difficulty: "Easy",
    expectedOutput: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.
  
  An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
  
  Example 1:
  
  Input: s = "anagram", t = "nagaram"
  Output: true
  
  Example 2:
  
  Input: s = "rat", t = "car"
  Output: false`,
    difficulty: "Easy",
    expectedOutput: "true\nfalse",
  },
  {
    id: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.
  
  You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
  
  Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
  
  Example 1:
  
  Input: prices = [7,1,5,3,6,4]
  Output: 5
  Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
  
  Example 2:
  
  Input: prices = [7,6,4,3,1]
  Output: 0
  Explanation: In this case, no transactions are done and the max profit = 0.`,
    difficulty: "Easy",
    expectedOutput: "5\n0",
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.
  
  Example 1:
  
  Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
  Output: 6
  Explanation: The subarray [4,-1,2,1] has the largest sum 6.
  
  Example 2:
  
  Input: nums = [1]
  Output: 1
  Explanation: The subarray [1] has the largest sum 1.
  
  Example 3:
  
  Input: nums = [5,4,-1,7,8]
  Output: 23
  Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.`,
    difficulty: "Medium",
    expectedOutput: "6\n1\n23",
  },
  {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
  
  The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
  
  You must write an algorithm that runs in O(n) time and without using the division operation.
  
  Example 1:
  
  Input: nums = [1,2,3,4]
  Output: [24,12,8,6]
  
  Example 2:
  
  Input: nums = [-1,1,0,-3,3]
  Output: [0,0,9,0,0]`,
    difficulty: "Medium",
    expectedOutput: "[24,12,8,6]\n[0,0,9,0,0]",
  },
  {
    id: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.
  
  Example 1:
  
  Input: s = "abcabcbb"
  Output: 3
  Explanation: The answer is "abc", with the length of 3.
  
  Example 2:
  
  Input: s = "bbbbb"
  Output: 1
  Explanation: The answer is "b", with the length of 1.
  
  Example 3:
  
  Input: s = "pwwkew"
  Output: 3
  Explanation: The answer is "wke", with the length of 3.`,
    difficulty: "Medium",
    expectedOutput: "3\n1\n3",
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
  
  Find two lines that together with the x-axis form a container, such that the container contains the most water.
  
  Return the maximum amount of water a container can store.
  
  Example 1:
  
  Input: height = [1,8,6,2,5,4,8,3,7]
  Output: 49
  
  Example 2:
  
  Input: height = [1,1]
  Output: 1`,
    difficulty: "Medium",
    expectedOutput: "49\n1",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
  
  Example 1:
  
  Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
  Output: [[1,6],[8,10],[15,18]]
  Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
  
  Example 2:
  
  Input: intervals = [[1,4],[4,5]]
  Output: [[1,5]]
  Explanation: Intervals [1,4] and [4,5] are considered overlapping.`,
    difficulty: "Medium",
    expectedOutput: "[[1,6],[8,10],[15,18]]\n[[1,5]]",
  },
  {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
  
  Example 1:
  
  Input: root = [3,9,20,null,null,15,7]
  Output: [[3],[9,20],[15,7]]
  
  Example 2:
  
  Input: root = [1]
  Output: [[1]]
  
  Example 3:
  
  Input: root = []
  Output: []`,
    difficulty: "Medium",
    expectedOutput: "[[3],[9,20],[15,7]]\n[[1]]\n[]",
  },
  {
    id: "lowest-common-ancestor",
    title: "Lowest Common Ancestor of a Binary Tree",
    description: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
  
  According to the definition of LCA: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."
  
  Example 1:
  
  Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
  Output: 3
  Explanation: The LCA of nodes 5 and 1 is 3.
  
  Example 2:
  
  Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
  Output: 5
  Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.`,
    difficulty: "Medium",
    expectedOutput: "3\n5",
  },
  {
    id: "coin-change",
    title: "Coin Change",
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
  
  Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
  
  You may assume that you have an infinite number of each kind of coin.
  
  Example 1:
  
  Input: coins = [1,2,5], amount = 11
  Output: 3
  Explanation: 11 = 5 + 5 + 1
  
  Example 2:
  
  Input: coins = [2], amount = 3
  Output: -1
  
  Example 3:
  
  Input: coins = [1], amount = 0
  Output: 0`,
    difficulty: "Medium",
    expectedOutput: "3\n-1\n0",
  },
  {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
  
  The overall run time complexity should be O(log (m+n)).
  
  Example 1:
  
  Input: nums1 = [1,3], nums2 = [2]
  Output: 2.00000
  Explanation: merged array = [1,2,3] and median is 2.
  
  Example 2:
  
  Input: nums1 = [1,2], nums2 = [3,4]
  Output: 2.50000
  Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.`,
    difficulty: "Hard",
    expectedOutput: "2.00000\n2.50000",
  },
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
  
  Example 1:
  
  Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
  Output: 6
  Explanation: The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.
  
  Example 2:
  
  Input: height = [4,2,0,3,2,5]
  Output: 9`,
    difficulty: "Hard",
    expectedOutput: "6\n9",
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    description: `A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
  
  - Every adjacent pair of words differs by a single letter.
  - Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
  - sk == endWord
  
  Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.
  
  Example 1:
  
  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
  Output: 5
  Explanation: One shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.
  
  Example 2:
  
  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
  Output: 0
  Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.`,
    difficulty: "Hard",
    expectedOutput: "5\n0",
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    description: `Given a string s, return the longest palindromic substring in s.
  
  Example 1:
  
  Input: s = "babad"
  Output: "bab"
  Explanation: "aba" is also a valid answer.
  
  Example 2:
  
  Input: s = "cbbd"
  Output: "bb"`,
    difficulty: "Medium",
    expectedOutput: "bab\nbb",
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.
  
  Example 1:
  
  Input: head = [1,2,3,4,5]
  Output: [5,4,3,2,1]
  
  Example 2:
  
  Input: head = [1,2]
  Output: [2,1]
  
  Example 3:
  
  Input: head = []
  Output: []`,
    difficulty: "Easy",
    expectedOutput: "[5,4,3,2,1]\n[2,1]\n[]",
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    description: `You are climbing a staircase. It takes n steps to reach the top.
  
  Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
  
  Example 1:
  
  Input: n = 2
  Output: 2
  Explanation: There are two ways to climb to the top.
  1. 1 step + 1 step
  2. 2 steps
  
  Example 2:
  
  Input: n = 3
  Output: 3
  Explanation: There are three ways to climb to the top.
  1. 1 step + 1 step + 1 step
  2. 1 step + 2 steps
  3. 2 steps + 1 step`,
    difficulty: "Easy",
    expectedOutput: "2\n3",
  },
];

export const dsaQuestions = dummyData.map((q, i) => ({
  id: i + 1,
  title: q.title,
  description: q.description,
  difficulty: q.difficulty,
  route: `/question/${q.id}`
}));
