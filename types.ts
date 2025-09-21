
// Defines the structure for the analysis result returned by the AI.
export interface AnalysisResult {
  matchedSkills: string[];
  skillsToDevelop: string[];
}

// Defines the possible input modes for user skills.
export type InputMode = 'text' | 'pdf';
