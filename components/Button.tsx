import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

// A reusable button component with consistent styling.
// It accepts all standard button attributes, including `onClick` and `disabled`.
export const Button = ({ children, ...props }: ButtonProps): React.JSX.Element => {
    return (
        <button
            {...props}
            className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
        >
            {children}
        </button>
    );
};
