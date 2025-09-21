import React, { useState } from 'react';
import { Header } from './components/Header';
import { JobInput } from './components/JobInput';
import { SkillsInput } from './components/SkillsInput';
import { Button } from './components/Button';
import { Loader } from './components/Loader';
import { AnalysisModal } from './components/AnalysisModal';
import { type InputMode } from './types';
import { useAnalysis } from './useAnalysis';
import { isApiKeySet } from './config';

// A component to display when the API key is not configured.
const ApiKeyWarning = () => (
    <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg max-w-2xl mx-auto shadow-md">
            <h2 className="font-display text-2xl font-bold mb-2">Configuration Error</h2>
            <p className="text-lg">
                The Google AI API key is not set. Please ensure the <code>API_KEY</code> environment variable is configured to use the application.
            </p>
        </div>
    </div>
);

// This is the main application component.
// It orchestrates the UI and delegates logic to custom hooks and components.
export default function App(): React.JSX.Element {
    const [jobDescription, setJobDescription] = useState<string>('');
    const [userSkillsText, setUserSkillsText] = useState<string>('');
    const [userCvFile, setUserCvFile] = useState<File | null>(null);
    const [inputMode, setInputMode] = useState<InputMode>('text');
    
    // Custom hook for handling the analysis logic and state
    const {
        isLoading,
        error,
        analysisResult,
        isModalOpen,
        runAnalysis,
        closeModal,
    } = useAnalysis();

    // Check if the API key is configured.
    if (!isApiKeySet()) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
                <Header />
                <ApiKeyWarning />
            </div>
        );
    }

    // Determines if the analysis button should be disabled
    const isAnalyzeDisabled = isLoading || !jobDescription || (inputMode === 'text' ? !userSkillsText : !userCvFile);
    
    const handleAnalyzeClick = () => {
        runAnalysis({ jobDescription, userSkillsText, userCvFile, inputMode });
    };

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
                        <Button onClick={handleAnalyzeClick} disabled={isAnalyzeDisabled} aria-busy={isLoading}>
                            {isLoading ? 'Analyzing...' : 'Analyze My Skills'}
                        </Button>
                    </div>

                    {isLoading && <Loader />}
                    
                    {error && (
                        <div className="mt-6 text-center text-red-600 bg-red-100 border border-red-300 rounded-lg p-4 max-w-md mx-auto" role="alert">
                            <p className="font-bold">{error.title}</p>
                            <p>{error.message}</p>
                        </div>
                    )}
                </div>
            </main>
            
            <footer className="text-center py-6 text-slate-500">
                <p>Created with ❤️ by Éverson Filipe for Lab.AI</p>
            </footer>

            {isModalOpen && analysisResult && (
                <AnalysisModal result={analysisResult} onClose={closeModal} />
            )}
        </div>
    );
}
