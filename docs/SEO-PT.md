# SEO e Visibilidade

Embora o ImpactSkills seja uma Single Page Application (SPA) baseada em ferramentas e não um site focado em conteúdo, os princípios de Search Engine Optimization (SEO) e visibilidade geral ainda são importantes para seu sucesso como um projeto de código aberto.

[Read this in English / Leia em Inglês](./SEO.md)

## 1. Metadados

O arquivo `index.html` contém metadados cruciais que ajudam os mecanismos de busca e as plataformas de mídia social a entender do que se trata a aplicação.

- **Tag Title**: `<title>ImpactSkills: Open-source Analyzer</title>`
  - Esta é a peça mais importante de metadados. É o que aparece na aba do navegador e como o título principal nos resultados de busca. É conciso e descritivo.

- **Meta Description**: O arquivo `metadata.json` contém uma descrição que é usada para preencher a tag de meta descrição.
  - Isso fornece um breve resumo do conteúdo da página, que os mecanismos de busca podem usar como um snippet nos resultados.

## 2. Acessibilidade (A11y)

Mecanismos de busca modernos priorizam a experiência do usuário, e a acessibilidade é uma grande parte disso. Um site mais acessível geralmente é classificado em uma posição mais alta. O ImpactSkills incorpora várias boas práticas de acessibilidade:

- **HTML Semântico**: O uso de tags como `<header>`, `<main>` e `<button>` fornece estrutura para leitores de tela.
- **Atributos ARIA**: Atributos como `aria-label`, `aria-modal` e `role="dialog"` são usados para tornar componentes complexos, como o modal de resultados, compreensíveis para tecnologias assistivas.
- **Navegação por Teclado**: A aplicação é navegável usando um teclado, com estados de foco claros (`focus:ring`) e uma ordem de tabulação lógica.

## 3. Visibilidade no GitHub

Para um projeto de código aberto, a visibilidade dentro da comunidade de desenvolvedores é fundamental.

- **README de Alta Qualidade**: Um `README.md` detalhado é o fator mais importante para a visibilidade no GitHub. Ele deve explicar claramente o que o projeto faz, por que é útil e como começar.
- **Palavras-chave**: A descrição do projeto e o README usam palavras-chave relevantes como "IA", "Análise de Habilidades", "Gemini", "React" e "Open-source" para aparecer em buscas relevantes.
- **Licença**: Ter um arquivo `LICENSE` claro torna o projeto mais atraente para adoção e contribuição.
