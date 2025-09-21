
import React from 'react';
import { type InputMode } from '../types';
import { DocumentIcon } from './icons/DocumentIcon';
import { TextIcon } from './icons/TextIcon';

interface SkillsInputProps {
    inputMode: InputMode;
    setInputMode: (mode: InputMode) => void;
    skillsText: string;
    setSkillsText: (text: string) => void;
    cvFile: File | null;
    setCvFile: (file: File | null) => void;
}

// This component handles both text and file inputs for user skills,
// with a toggle to switch between the two modes.
export const SkillsInput: React.FC<SkillsInputProps> = ({
    inputMode,
    setInputMode,
    skillsText,
    setSkillsText,
    cvFile,
    setCvFile,
}) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCvFile(e.target.files[0]);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 h-full flex flex-col">
            <h2 className="block text-xl font-display font-bold text-blue-900 mb-3">
                2. Your Skills
            </h2>
            
            {/* Input Mode Toggler */}
            <div className="flex border border-slate-300 rounded-lg p-1 mb-4 bg-slate-100">
                <button
                    onClick={() => setInputMode('text')}
                    className={`w-1/2 flex items-center justify-center gap-2 p-2 rounded-md transition-colors duration-200 ${inputMode === 'text' ? 'bg-white text-blue-700 shadow' : 'text-slate-600 hover:bg-slate-200'}`}
                >
                    <TextIcon />
                    List Skills
                </button>
                <button
                    onClick={() => setInputMode('pdf')}
                    className={`w-1/2 flex items-center justify-center gap-2 p-2 rounded-md transition-colors duration-200 ${inputMode === 'pdf' ? 'bg-white text-blue-700 shadow' : 'text-slate-600 hover:bg-slate-200'}`}
                >
                    <DocumentIcon />
                    Upload CV (PDF)
                </button>
            </div>

            {/* Conditional rendering based on inputMode */}
            <div className="flex-grow">
                {inputMode === 'text' ? (
                    <textarea
                        id="user-skills"
                        value={skillsText}
                        onChange={(e) => setSkillsText(e.target.value)}
                        placeholder="List your skills, separated by commas (e.g., React, TypeScript, Node.js)..."
                        className="w-full h-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-none min-h-[250px]"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full min-h-[250px]">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <DocumentIcon className="w-10 h-10 mb-3 text-slate-400" />
                                {cvFile ? (
                                    <>
                                        <p className="mb-2 text-sm text-slate-700 font-semibold">{cvFile.name}</p>
                                        <p className="text-xs text-slate-500">{(cvFile.size / 1024).toFixed(2)} KB</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-slate-500">PDF (MAX. 5MB)</p>
                                    </>
                                )}
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                        </label>
                    </div> 
                )}
            </div>
        </div>
    );
};
