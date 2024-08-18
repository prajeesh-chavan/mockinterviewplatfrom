import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyATrV754XYMGQTmiNy2u506uWJzbd3155c"; // Use environment variables for API key

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let conversationHistory = [];

/**
 * Function to remove asterisks from the response text
 * @param {string} text - The text from which to remove asterisks.
 * @returns {string} - The text with asterisks removed.
 */
const removeAsterisks = (text) => text.replace(/\*/g, "");

/**
 * Start the interview with the initial prompt
 * @param {string} selectedRole - The role for which the interview is being conducted.
 * @param {string} name - The name of the candidate.
 * @param {string} interviewType - The type of interview to conduct.
 */
const startInterview = async (role, name, interviewType) => {
  const initialPrompt = `You are an experienced interviewer for a ${role} position. Begin the ${interviewType} interview by greeting the candidate and asking a concise, interview-appropriate question to ${name}. Please do not provide any additional commentary or responses, only ask a question.`;

  try {
    const result = await model.generateContent(initialPrompt, {
      maxTokens: 50, // Limit the length of the response
    });
    const firstQuestion = removeAsterisks(result.response.text().trim());

    // Push the first question to conversation history
    conversationHistory.push({ role: "model", content: firstQuestion });

    return firstQuestion;
  } catch (error) {
    console.error("Error generating initial question:", error.message);
    throw new Error("Failed to generate the initial question.");
  }
};

/**
 * Handle the user's answer and generate the next question
 * @param {string} userAnswer - The candidate's answer to the current question.
 */
const handleAnswer = async (userAnswer) => {
  // Push the user's answer to the conversation history
  conversationHistory.push({ role: "user", content: userAnswer });

  // Create the conversation string with context for generating follow-up questions
  const conversationString = conversationHistory
    .map((entry) => `${entry.role}: ${entry.content}`)
    .join("\n");

  try {
    const result = await model.generateContent(conversationString, {
      maxTokens: 100, // Adjust response length as needed
    });

    const responseText = removeAsterisks(result.response.text().trim());

    // Extract the next question from the response
    const nextQuestion = responseText.split("\n").find(line => line.trim() && line.trim().endsWith('?')).trim(); // Ensure it's a question

    if (nextQuestion) {
      // Push the model's response (next question) to conversation history
      conversationHistory.push({
        role: "model",
        content: nextQuestion,
      });
    } else {
      throw new Error("No valid next question was generated.");
    }

    return nextQuestion;
  } catch (error) {
    console.error("Error generating next question:", error.message);
    throw new Error("Failed to generate the next question.");
  }
};

export { startInterview, handleAnswer };
