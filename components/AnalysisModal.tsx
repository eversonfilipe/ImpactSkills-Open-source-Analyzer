import React, { useEffect, useRef } from 'react';
import { type AnalysisResult } from '../types';

interface SkillListProps {
    title: string;
    skills: string[];
    className: string;
}

// A component that renders a list of skills.
const SkillList = ({ title, skills, className }: SkillListProps): React.JSX.Element => (
    <div>
        <h3 className={`text-lg font-display font-semibold mb-3 ${className}`}>
            {title}
        </h3>
        {skills && skills.length > 0 ? (
            <ul className="space-y-2">
                {skills.map((skill, index) => (
                    <li key={index} className="flex items-start">
                        <svg className={`w-5 h-5 mr-2 flex-shrink-0 mt-1 ${className}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-slate-700">{skill}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-slate-500 italic">No specific skills identified in this category.</p>
        )}
    </div>
);

interface AnalysisModalProps {
    result: AnalysisResult;
    onClose: () => void;
}

// This component displays the AI analysis results in a modal dialog.
export const AnalysisModal = ({ result, onClose }: AnalysisModalProps): React.JSX.Element => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Focus the close button when the modal opens for better keyboard navigation.
    useEffect(() => {
        closeButtonRef.current?.focus();
    }, []);

    // Handle 'Escape' key press to close the modal.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform animate-scale-in">
                <header className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 id="modal-title" className="text-2xl font-display font-bold text-blue-900">Analysis Complete</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Close analysis results">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </header>
                
                <main className="p-6 md:p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SkillList
                            title="Your Strengths"
                            skills={result.matchedSkills}
                            className="text-green-600"
                        />
                        <SkillList
                            title="Areas to Develop"
                            skills={result.skillsToDevelop}
                            className="text-amber-600"
                        />
                    </div>
                </main>

                <footer className="p-6 bg-slate-50 border-t border-slate-200 rounded-b-2xl text-right">
                    <button 
                        ref={closeButtonRef}
                        onClick={onClose} 
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};
