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

// A small 'X' button for removing the selected file.
const RemoveFileButton = ({ onClick }: { onClick: (e: React.MouseEvent) => void }): React.JSX.Element => (
    <button
        type="button"
        onClick={onClick}
        className="ml-2 text-slate-400 hover:text-red-600 transition-colors"
        aria-label="Remove file"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    </button>
);


// This component handles both text and file inputs for user skills,
// with a toggle to switch between the two modes.
export const SkillsInput = ({
    inputMode,
    setInputMode,
    skillsText,
    setSkillsText,
    cvFile,
    setCvFile,
}: SkillsInputProps): React.JSX.Element => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Basic validation for PDF files
            if (e.target.files[0].type === 'application/pdf') {
                setCvFile(e.target.files[0]);
            } else {
                alert("Please upload a valid PDF file.");
            }
        }
        // Reset the input value to allow re-uploading the same file name
        e.target.value = '';
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the file input from opening
        setCvFile(null);
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
                    aria-pressed={inputMode === 'text'}
                >
                    <TextIcon />
                    List Skills
                </button>
                <button
                    onClick={() => setInputMode('pdf')}
                    className={`w-1/2 flex items-center justify-center gap-2 p-2 rounded-md transition-colors duration-200 ${inputMode === 'pdf' ? 'bg-white text-blue-700 shadow' : 'text-slate-600 hover:bg-slate-200'}`}
                    aria-pressed={inputMode === 'pdf'}
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
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-2">
                                <DocumentIcon className="w-10 h-10 mb-3 text-slate-400" />
                                {cvFile ? (
                                    <div className="flex items-center">
                                        <div>
                                            <p className="mb-1 text-sm text-slate-700 font-semibold break-all">{cvFile.name}</p>
                                            <p className="text-xs text-slate-500">{(cvFile.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                        <RemoveFileButton onClick={handleRemoveFile} />
                                    </div>
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
