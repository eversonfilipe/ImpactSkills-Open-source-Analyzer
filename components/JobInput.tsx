
import React from 'react';

interface JobInputProps {
    value: string;
    onChange: (value: string) => void;
}

// This component is a styled wrapper around a textarea for the job description.
export const JobInput: React.FC<JobInputProps> = ({ value, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 h-full flex flex-col">
            <label htmlFor="job-description" className="block text-xl font-display font-bold text-blue-900 mb-3">
                1. Job Description
            </label>
            <textarea
                id="job-description"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Paste the full job description here..."
                className="w-full flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-none min-h-[300px]"
            />
        </div>
    );
};
