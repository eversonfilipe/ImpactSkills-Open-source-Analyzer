import { GoogleGenAI, Type, type GenerateContentParameters } from "@google/genai";
import { type AnalysisResult } from '../types';
import { GEMINI_MODEL } from '../config';
import { createTextAnalysisPrompt, createPdfAnalysisPrompt } from './promptService';

// This check ensures that the API key is available.
if (!process.env.API_KEY) {
    // A console warning is helpful for developers, but the UI will handle the user-facing error.
    console.warn("API_KEY environment variable not set. The application will show a configuration error.");
}

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Define the expected JSON schema for the AI's response.
// This ensures we get structured, predictable data back from the model.
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        matchedSkills: {
            type: Type.ARRAY,
            description: "Skills the user has that are relevant to the job.",
            items: { type: Type.STRING }
        },
        skillsToDevelop: {
            type: Type.ARRAY,
            description: "Key skills from the job description that the user is missing.",
            items: { type: Type.STRING }
        }
    },
    required: ["matchedSkills", "skillsToDevelop"]
};


/**
 * A generic function to perform the analysis by calling the Gemini API.
 * @param contents - The contents (prompt and/or files) to send to the model.
 * @returns A promise that resolves to an AnalysisResult object.
 */
async function performAnalysis(contents: GenerateContentParameters['contents']): Promise<AnalysisResult> {
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2, // Lower temperature for more deterministic results
            }
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AnalysisResult;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Re-throw the error to be handled by the calling function in the useAnalysis hook.
        throw new Error("Failed to get analysis from Gemini API.");
    }
}


/**
 * Analyzes skills based on text input.
 * @param jobDescription - The full text of the job description.
 * @param userSkills - A comma-separated string of the user's skills.
 * @returns A promise that resolves to an AnalysisResult object.
 */
export async function analyzeSkillsWithText(jobDescription: string, userSkills: string): Promise<AnalysisResult> {
    const prompt = createTextAnalysisPrompt(jobDescription, userSkills);
    return performAnalysis(prompt);
}


/**
 * Analyzes skills based on a PDF resume file.
 * @param jobDescription - The full text of the job description.
 * @param base64pdf - The user's PDF resume encoded in base64.
 * @param mimeType - The MIME type of the uploaded file (e.g., 'application/pdf').
 * @returns A promise that resolves to an AnalysisResult object.
 */
export async function analyzeSkillsWithPdf(jobDescription: string, base64pdf: string, mimeType: string): Promise<AnalysisResult> {
    const prompt = createPdfAnalysisPrompt(jobDescription);
    const contents = {
        parts: [
            { inlineData: { data: base64pdf, mimeType: mimeType } },
            { text: prompt }
        ]
    };
    return performAnalysis(contents);
}
