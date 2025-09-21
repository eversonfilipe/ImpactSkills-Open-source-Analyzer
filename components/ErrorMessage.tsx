
import React from 'react';

interface ErrorMessageProps {
    title: string;
    message: string;
}

// A dedicated component for displaying user-facing errors.
export const ErrorMessage = ({ title, message }: ErrorMessageProps): React.JSX.Element => {
    return (
        <div className="mt-6 text-center text-red-600 bg-red-100 border border-red-300 rounded-lg p-4 max-w-md mx-auto" role="alert">
            <p className="font-bold">{title}</p>
            <p>{message}</p>
        </div>
    );
};
