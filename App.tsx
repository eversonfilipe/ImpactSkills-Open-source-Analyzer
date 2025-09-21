
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { JobInput } from './components/JobInput';
import { SkillsInput } from './components/SkillsInput';
import { Button } from './components/Button';
import { Loader } from './components/Loader';
import { AnalysisModal } from './components/AnalysisModal';
import { type AnalysisResult, type InputMode } from './types';
import { analyzeSkillsWithText, analyzeSkillsWithPdf } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

// This is the main application component.
// It acts as the orchestrator for the entire UI, managing state and logic.
export default function App(): React.JSX.Element {
    // State for the job description textarea
    const [jobDescription, setJobDescription] = useState<string>('');
    // State for the user's skills entered as text
    const [userSkillsText, setUserSkillsText] = useState<string>('');
    // State for the user's uploaded CV file
    const [userCvFile, setUserCvFile] = useState<File | null>(null);
    // State to toggle between 'text' and 'pdf' input modes
    const [inputMode, setInputMode] = useState<InputMode>('text');
    // State to store the analysis result from the AI
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    // State to manage the loading spinner visibility
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // State to display any errors that occur during analysis
    const [error, setError] = useState<string | null>(null);
    // State to control the visibility of the results modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Memoized callback to handle the analysis process.
    // This function is called when the "Analyze" button is clicked.
    const handleAnalyze = useCallback(async () => {
        // Reset state before starting a new analysis
        setError(null);
        setIsLoading(true);
        setAnalysisResult(null);

        // Input validation
        if (!jobDescription.trim()) {
            setError('Please provide a job description.');
            setIsLoading(false);
            return;
        }

        if (inputMode === 'text' && !userSkillsText.trim()) {
            setError('Please list your skills.');
            setIsLoading(false);
            return;
        }

        if (inputMode === 'pdf' && !userCvFile) {
            setError('Please upload your CV file.');
            setIsLoading(false);
            return;
        }

        try {
            let result: AnalysisResult;
            // Call the appropriate service based on the input mode
            if (inputMode === 'text') {
                result = await analyzeSkillsWithText(jobDescription, userSkillsText);
            } else {
                if (!userCvFile) throw new Error("CV File not found");
                const base64pdf = await fileToBase64(userCvFile);
                result = await analyzeSkillsWithPdf(jobDescription, base64pdf, userCvFile.type);
            }
            
            setAnalysisResult(result);
            setIsModalOpen(true);
        } catch (err) {
            console.error("Analysis failed:", err);
            setError('An error occurred during analysis. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    }, [jobDescription, userSkillsText, userCvFile, inputMode]);

    // Determines if the analysis button should be disabled
    const isAnalyzeDisabled = isLoading || !jobDescription || (inputMode === 'text' ? !userSkillsText : !userCvFile);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <p className="text-center text-slate-600 mb-10 text-lg max-w-3xl mx-auto">
                        Paste a job description and your skills to get an AI-powered analysis of how you match up, and what you need to learn to bridge the gap.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <JobInput value={jobDescription} onChange={setJobDescription} />
                        <SkillsInput
                            inputMode={inputMode}
                            setInputMode={setInputMode}
                            skillsText={userSkillsText}
                            setSkillsText={setUserSkillsText}
                            cvFile={userCvFile}
                            setCvFile={setUserCvFile}
                        />
                    </div>
                    
                    <div className="text-center">
                        <Button onClick={handleAnalyze} disabled={isAnalyzeDisabled}>
                            {isLoading ? 'Analyzing...' : 'Analyze My Skills'}
                        </Button>
                    </div>

                    {isLoading && <Loader />}
                    
                    {error && (
                        <div className="mt-6 text-center text-red-600 bg-red-100 border border-red-300 rounded-lg p-4 max-w-md mx-auto">
                            <p className="font-medium">Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </main>
            
            <footer className="text-center py-6 text-slate-500">
                <p>Created with ❤️ by Éverson Filipe for Lab.AI</p>
            </footer>

            {isModalOpen && analysisResult && (
                <AnalysisModal result={analysisResult} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}
