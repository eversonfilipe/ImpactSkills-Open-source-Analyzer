# ImpactSkills: Open-source Skills Analyzer

<img width="1920" height="1080" alt="Captura de tela 2025-09-20 224919. Na tela, aparece a interface da aplicação open-source de Éverson Filipe. Com dois campos principais." src="https://github.com/user-attachments/assets/efd66577-4ccd-45fa-a1a5-59f44ef9c261" />


[![GitHub Repo](https://img.shields.io/badge/GitHub-View%20Source-blue?logo=github)](https://github.com/eversonfilipe/ImpactSkills-Open-source-Analyzer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An AI-powered tool to analyze job descriptions against your skills, identifying strengths and areas for development. This project was created by **Éverson Filipe** as the final project for the **Lab.AI** mentorship program, a partnership between **Instituto Localiza** and **Instituto Joule**.

[Read this in Portuguese / Leia em Português](./README-PT.md)

---

## ✨ Key Features

- **AI-Powered Analysis**: Leverages Google's Gemini AI to provide a deep comparison between a job description and your qualifications.
- **Dual Input Modes**: Paste your skills as text or simply upload your CV in PDF format for a comprehensive analysis.
- **Actionable Insights**: Receive two clear lists: "Your Strengths" (skills that match the job) and "Areas to Develop" (skills you need to acquire).
- **Modern & Responsive UI**: A clean, professional, and responsive interface built with React and Tailwind CSS.
- **Secure & Private**: All processing is done without storing your personal data. Your information is sent securely for analysis and is not retained.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`gemini-2.5-flash`)
- **Modularity**: Built with reusable components and custom hooks for scalability.

## ⚙️ Getting Started

### Prerequisites

- A modern web browser.
- A Google AI API Key.


2.  **Set up your API Key:**
    This application requires a Google AI API key to function. You must set it as an environment variable named `API_KEY`.

    - Create a file named `.env` in the root of the project.
    - Add your API key to this file:
      ```
      API_KEY=your_google_ai_api_key_here
      ```
    - The application will automatically use this key.

3.  **Run the application:**
    Open the `index.html` file in your web browser, or serve the directory using a local web server.

## 📖 How to Use

1.  **Add Job Description**: Paste the complete text of the job description you are interested in into the left-hand panel.
2.  **Provide Your Skills**:
    - **Option A (Text)**: In the right-hand panel, list your professional skills, separated by commas.
    - **Option B (PDF)**: Click the "Upload CV (PDF)" toggle and upload your resume.
3.  **Analyze**: Click the "Analyze My Skills" button.
4.  **Review Results**: A modal will appear showing your matched skills and the skills you should focus on developing.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please read our [**Contributing Guidelines**](./docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🛡️ Security Policy

We take the security of this project seriously. If you discover a security vulnerability, please follow our [**Security Policy**](./docs/SECURITY.md) to report it.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgements

- **Éverson Filipe** ([@eversonfilipe](https://github.com/eversonfilipe)) - Project Creator
- **Lab.AI Mentorship Program**
- **Instituto Localiza**
- **Instituto Joule**
