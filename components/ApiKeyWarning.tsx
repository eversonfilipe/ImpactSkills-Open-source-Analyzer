
import React from 'react';

// A component to display when the API key is not configured.
// Extracting this into its own component makes the App component cleaner.
export const ApiKeyWarning = (): React.JSX.Element => (
    <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg max-w-2xl mx-auto shadow-md">
            <h2 className="font-display text-2xl font-bold mb-2">Configuration Error</h2>
            <p className="text-lg">
                The Google AI API key is not set. Please ensure the <code>API_KEY</code> environment variable is configured to use the application.
            </p>
        </div>
    </div>
);
