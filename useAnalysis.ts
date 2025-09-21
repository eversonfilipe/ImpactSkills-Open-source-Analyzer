import { useState, useCallback } from 'react';
import { type AnalysisResult, type InputMode, type AppError } from './types';
import { analyzeSkillsWithText, analyzeSkillsWithPdf } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

// Defines the parameters needed to run an analysis.
interface RunAnalysisParams {
    jobDescription: string;
    userSkillsText: string;
    userCvFile: File | null;
    inputMode: InputMode;
}

/**
 * Custom hook to encapsulate the entire skill analysis logic.
 * This hook manages the state for loading, errors, and results,
 * abstracting the complexity away from the main App component.
 * @returns An object containing the analysis state and the function to trigger the analysis.
 */
export function useAnalysis() {
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<AppError | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const runAnalysis = useCallback(async ({ jobDescription, userSkillsText, userCvFile, inputMode }: RunAnalysisParams) => {
        setError(null);
        setIsLoading(true);
        setAnalysisResult(null);
        setIsModalOpen(false);

        // Input validation
        if (!jobDescription.trim()) {
            setError({ title: 'Missing Information', message: 'Please provide a job description.' });
            setIsLoading(false);
            return;
        }
        if (inputMode === 'text' && !userSkillsText.trim()) {
            setError({ title: 'Missing Information', message: 'Please list your skills.' });
            setIsLoading(false);
            return;
        }
        if (inputMode === 'pdf' && !userCvFile) {
            setError({ title: 'Missing Information', message: 'Please upload your CV file.' });
            setIsLoading(false);
            return;
        }

        try {
            let result: AnalysisResult;
            if (inputMode === 'text') {
                result = await analyzeSkillsWithText(jobDescription, userSkillsText);
            } else {
                if (!userCvFile) throw new Error("CV File not found during analysis execution.");
                const base64pdf = await fileToBase64(userCvFile);
                result = await analyzeSkillsWithPdf(jobDescription, base64pdf, userCvFile.type);
            }
            
            setAnalysisResult(result);
            setIsModalOpen(true);
        } catch (err) {
            console.error("Analysis failed:", err);
            setError({ title: 'Analysis Failed', message: 'An unexpected error occurred. The API might be unavailable or the API key might be invalid.' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        error,
        analysisResult,
        isModalOpen,
        runAnalysis,
        closeModal: () => setIsModalOpen(false),
    };
}
