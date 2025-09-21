// Manages the creation of prompts for the Gemini API.
// Separating prompt logic makes it easier to test, manage, and refine the prompts.

/**
 * Creates the prompt for analyzing skills based on a user's text input.
 * @param {string} jobDescription - The job description text.
 * @param {string} userSkills - A comma-separated string of user's skills.
 * @returns {string} The complete prompt to be sent to the Gemini API.
 */
export function createTextAnalysisPrompt(jobDescription: string, userSkills: string): string {
    return `
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
}

/**
 * Creates the prompt for analyzing skills based on a user's PDF resume.
 * @param {string} jobDescription - The job description text.
 * @returns {string} The complete prompt to be sent to the Gemini API.
 */
export function createPdfAnalysisPrompt(jobDescription: string): string {
    return `
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
}
