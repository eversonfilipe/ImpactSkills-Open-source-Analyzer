
// Centralized configuration for the application.

/**
 * The specific Gemini model to be used for the analysis.
 * Using a centralized constant makes it easy to update the model in one place.
 */
export const GEMINI_MODEL = 'gemini-2.5-flash';

/**
 * The maximum file size in megabytes (MB) allowed for a user's CV upload.
 * This helps prevent excessively large files from being processed.
 */
export const MAX_CV_SIZE_MB = 5;


/**
 * Checks if the Google AI API key is set in the environment variables.
 * This is a crucial check to ensure the application can connect to the service.
 * @returns {boolean} - True if the API key is present, false otherwise.
 */
export function isApiKeySet(): boolean {
    const key = process.env.API_KEY;
    return !!key && key.length > 0;
}