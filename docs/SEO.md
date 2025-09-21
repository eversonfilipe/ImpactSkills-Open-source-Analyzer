# SEO & Discoverability

While ImpactSkills is a tool-based Single Page Application (SPA) and not a content-driven website, principles of Search Engine Optimization (SEO) and general discoverability are still important for its success as an open-source project.

[Read this in Portuguese / Leia em Português](./SEO-PT.md)

## 1. Metadata

The `index.html` file contains crucial metadata that helps search engines and social media platforms understand what the application is about.

- **Title Tag**: `<title>ImpactSkills: Open-source Analyzer</title>`
  - This is the most important piece of metadata. It's what appears in the browser tab and as the main headline in search results. It is concise and descriptive.

- **Meta Description**: The `metadata.json` file contains a description that is used to populate the meta description tag.
  - This provides a brief summary of the page's content, which search engines may use as a snippet in search results.

## 2. Accessibility (A11y)

Modern search engines prioritize user experience, and accessibility is a huge part of that. A more accessible site is often ranked higher. ImpactSkills incorporates several accessibility best practices:

- **Semantic HTML**: Using tags like `<header>`, `<main>`, and `<button>` provides structure for screen readers.
- **ARIA Attributes**: Attributes like `aria-label`, `aria-modal`, and `role="dialog"` are used to make complex components like the results modal understandable to assistive technologies.
- **Keyboard Navigation**: The application is navigable using a keyboard, with clear focus states (`focus:ring`) and logical tab order.

## 3. Discoverability on GitHub

For an open-source project, discoverability within the developer community is paramount.

- **High-Quality README**: A detailed `README.md` is the single most important factor for discoverability on GitHub. It should clearly explain what the project does, why it's useful, and how to get started.
- **Keywords**: The project description and README use relevant keywords like "AI", "Skills Analysis", "Gemini", "React", and "Open-source" to appear in relevant searches.
- **License**: Having a clear `LICENSE` file makes the project more attractive for adoption and contribution.
