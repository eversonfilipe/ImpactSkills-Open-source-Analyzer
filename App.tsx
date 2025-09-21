
import React, { useState } from 'react';
import { Header } from './components/Header';
import { JobInput } from './components/JobInput';
import { SkillsInput } from './components/SkillsInput';
import { Button } from './components/Button';
import { Loader } from './components/Loader';
import { AnalysisModal } from './components/AnalysisModal';
import { ApiKeyWarning } from './components/ApiKeyWarning';
import { ErrorMessage } from './components/ErrorMessage';
import { type InputMode } from './types';
import { useAnalysis } from './useAnalysis';
import { isApiKeySet } from './config';

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
                    <p className="text-center text-slate-600 mb-10 text-md sm:text-lg max-w-3xl mx-auto">
                        Paste a job description and your skills to get an AI-powered analysis of how you match up, and what you need to learn to bridge the gap.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
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
                    
                    {error && <ErrorMessage title={error.title} message={error.message} />}
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