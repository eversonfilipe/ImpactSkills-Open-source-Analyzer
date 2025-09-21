
import React from 'react';

// A simple, static component for the application header.
// It displays the app name and a subtitle.
export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6 text-center">
                <h1 className="font-display text-4xl font-bold text-blue-800">
                    ImpactSkills
                </h1>
                <p className="text-slate-500 text-lg mt-1">Open-source Skills Analyzer</p>
            </div>
        </header>
    );
};
