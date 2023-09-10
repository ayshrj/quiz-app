import React from "react";

const data = `
[
    {
      "question": "What is dynamic programming?",
      "options": [
        "A programming technique to optimize recursive algorithms",
        "A method to solve complex problems by breaking them down into simpler subproblems",
        "A programming language for creating interactive web applications",
        "A technique to dynamically allocate memory for variables"
      ],
      "correct": "1"
    },
    {
      "question": "Which of the following is NOT a characteristic of dynamic programming?",
      "options": [
        "Overlapping subproblems",
        "Optimal substructure",
        "Greedy approach",
        "Memoization"
      ],
      "correct": "3"
    },
    {
      "question": "What is memoization in dynamic programming?",
      "options": [
        "A technique to store computed results of expensive function calls and reuse them",
        "A method to optimize the use of memory in dynamic programming algorithms",
        "An approach to solve problems by storing intermediate results in a matrix",
        "A strategy to divide a problem into independent subproblems"
      ],
      "correct": "1"
    },
    {
      "question": "Which algorithmic problem is commonly used to illustrate dynamic programming?",
      "options": [
        "Knapsack problem",
        "Binomial coefficient",
        "Fibonacci sequence",
        "All of the above"
      ],
      "correct": "4"
    },
    {
      "question": "In dynamic programming, what does the term 'optimal substructure' mean?",
      "options": [
        "A problem can be solved by combining optimal solutions to its subproblems",
        "A problem can be broken down into smaller subproblems of equal size",
        "A problem can be solved using greedy algorithms",
        "A problem has a unique optimal solution"
      ],
      "correct": "1"
    },
    {
      "question": "Which of the following dynamic programming algorithms is used to find the shortest path in a graph?",
      "options": [
        "Bellman-Ford algorithm",
        "Knapsack algorithm",
        "Dijkstra's algorithm",
        "Floyd-Warshall algorithm"
      ],
      "correct": "3"
    },
    {
      "question": "What is the time complexity of a dynamic programming algorithm with overlapping subproblems and optimal substructure?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n^2)",
        "O(2^n)"
      ],
      "correct": "3"
    },
    {
      "question": "Which of the following problems can be solved using dynamic programming?",
      "options": [
        "Finding the maximum element in an array",
        "Sorting a linked list",
        "Finding the longest common subsequence of two strings",
        "Searching for an element in a binary search tree"
      ],
      "correct": "3"
    },
    {
      "question": "What is the main advantage of using dynamic programming over other techniques?",
      "options": [
        "Dynamic programming always guarantees the optimal solution",
        "Dynamic programming algorithms are easier to implement",
        "Dynamic programming can solve any problem efficiently",
        "Dynamic programming can handle exponential time complexity"
      ],
      "correct": "1"
    },
    {
      "question": "What is the key idea behind dynamic programming?",
      "options": [
        "Divide and conquer",
        "Backtracking",
        "Memoization",
        "Iterative optimization"
      ],
      "correct": "3"
    }
  ]`;

export default data;
