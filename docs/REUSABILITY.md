# Architectural Reusability

One of the core principles behind ImpactSkills is a commitment to clean, modular, and reusable code. This document outlines the architectural decisions made to support this goal, making the project easier to maintain, scale, and adapt.

[Read this in Portuguese / Leia em Português](./REUSABILITY-PT.md)

## Component-Based Architecture

The entire user interface is broken down into small, single-purpose React components located in the `/components` directory.

- **Generic Components**: Components like `<Button />` and `<Loader />` are completely generic. They accept props to control their content and behavior, allowing them to be used in any context without modification.
- **Specialized Components**: Components like `<JobInput />` and `<SkillsInput />` encapsulate a specific piece of the UI's functionality. This separation of concerns means that a change to one component is unlikely to affect others.

## Logic Encapsulation with Custom Hooks

All of the core application logic for state management, API calls, and error handling is encapsulated within the `useAnalysis` custom hook (`/useAnalysis.ts`).

This approach provides several benefits:
- **Decoupling**: The main `App.tsx` component is purely presentational. It is responsible for laying out the UI and passing data, but it contains no business logic itself. This makes the `App` component incredibly simple and easy to understand.
- **Reusability**: The `useAnalysis` hook could be imported into any other component to provide the same skill analysis functionality with zero code duplication.
- **Testability**: The hook can be tested in isolation, separate from the UI, leading to more robust and reliable tests.

## Service Layer Abstraction

All interactions with the external Google Gemini API are handled by a dedicated service module (`/services/geminiService.ts`).

- **Single Responsibility**: This service's only job is to communicate with the AI. It knows how to format requests and parse responses.
- **Easy Swapping**: If we ever wanted to switch to a different AI provider, we would only need to update this single file. The rest of the application would remain unchanged, as it does not have any direct knowledge of the Gemini API.

This professional, layered architecture ensures that ImpactSkills is not just a functional application, but a robust and scalable foundation for future development.
