
import React from 'react';

// A visual indicator to show that the application is busy.
// Displayed during the API call to the AI model.
export const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-8 space-y-2">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-600 font-medium">AI is analyzing...</p>
        </div>
    );
};
