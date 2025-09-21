
import React from 'react';

interface SkillListProps {
    title: string;
    skills: string[];
    className: string;
}

// A component that renders a titled list of skills.
// Used in the AnalysisModal to show matched and developing skills.
export const SkillList = ({ title, skills, className }: SkillListProps): React.JSX.Element => (
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
