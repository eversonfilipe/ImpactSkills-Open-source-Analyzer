
import { GoogleGenAI, Type } from "@google/genai";
import { type AnalysisResult } from '../types';

// This check ensures that the API key is available.
// In a real-world scenario, you would have a more robust configuration system.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
 * Analyzes skills based on text input.
 * @param jobDescription - The full text of the job description.
 * @param userSkills - A comma-separated string of the user's skills.
 * @returns A promise that resolves to an AnalysisResult object.
 */
export async function analyzeSkillsWithText(jobDescription: string, userSkills: string): Promise<AnalysisResult> {
    const prompt = `
        You are an expert career advisor and skills analyst. Your task is to compare a job description with a user's list of skills.

        Analyze the following job description and the user's skills.
        
        **Job Description:**
        ---
        ${jobDescription}
        ---
        
        **User's Skills:**
        ---
        ${userSkills}
        ---
        
        Based on your analysis, identify two lists of skills:
        1.  **Matched Skills:** Skills the user has that are directly mentioned or strongly implied in the job description.
        2.  **Skills to Develop:** Key skills required by the job description that are missing from the user's list.
        
        Provide a concise list of the most important skills for each category.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2,
            }
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AnalysisResult;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from Gemini API.");
    }
}


/**
 * Analyzes skills based on a PDF resume file.
 * @param jobDescription - The full text of the job description.
 * @param base64pdf - The user's PDF resume encoded in base64.
 * @param mimeType - The MIME type of the uploaded file (e.g., 'application/pdf').
 * @returns A promise that resolves to an AnalysisResult object.
 */
export async function analyzeSkillsWithPdf(jobDescription: string, base64pdf: string, mimeType: string): Promise<AnalysisResult> {
    const prompt = `
        You are an expert career advisor and skills analyst. 
        Your task is to analyze the provided PDF resume and compare the user's skills and experience against the given job description.

        First, thoroughly read and understand the user's resume from the attached PDF.
        Then, analyze the following job description.
        
        **Job Description:**
        ---
        ${jobDescription}
        ---
        
        Based on your analysis of both the resume and the job description, identify two lists of skills:
        1.  **Matched Skills:** Skills and experiences from the user's resume that are directly mentioned or strongly implied in the job description.
        2.  **Skills to Develop:** Key skills or qualifications required by the job description that appear to be missing from the user's resume.

        Provide a concise list of the most important skills for each category.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // Using a model that supports multimodal input
            contents: {
                parts: [
                    { inlineData: { data: base64pdf, mimeType: mimeType } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2,
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AnalysisResult;
    } catch (error) {
        console.error("Error calling Gemini API with PDF:", error);
        throw new Error("Failed to get analysis from Gemini API.");
    }
}
