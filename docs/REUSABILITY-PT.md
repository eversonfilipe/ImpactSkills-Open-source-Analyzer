# Reutilização da Arquitetura

Um dos princípios fundamentais por trás do ImpactSkills é o compromisso com um código limpo, modular e reutilizável. Este documento descreve as decisões arquitetônicas tomadas para apoiar esse objetivo, tornando o projeto mais fácil de manter, escalar e adaptar.

[Read this in English / Leia em Inglês](./REUSABILITY.md)

## Arquitetura Baseada em Componentes

Toda a interface do usuário é dividida em pequenos componentes React de propósito único, localizados no diretório `/components`.

- **Componentes Genéricos**: Componentes como `<Button />` e `<Loader />` são completamente genéricos. Eles aceitam props para controlar seu conteúdo e comportamento, permitindo que sejam usados em qualquer contexto sem modificação.
- **Componentes Especializados**: Componentes como `<JobInput />` e `<SkillsInput />` encapsulam uma parte específica da funcionalidade da UI. Essa separação de responsabilidades significa que uma mudança em um componente provavelmente não afetará os outros.

## Encapsulamento da Lógica com Custom Hooks

Toda a lógica central da aplicação para gerenciamento de estado, chamadas de API e tratamento de erros está encapsulada no custom hook `useAnalysis` (`/useAnalysis.ts`).

Esta abordagem oferece vários benefícios:
- **Desacoplamento**: O componente principal `App.tsx` é puramente presentacional. Ele é responsável por organizar a UI e passar dados, mas não contém nenhuma lógica de negócio. Isso torna o componente `App` incrivelmente simples e fácil de entender.
- **Reutilização**: O hook `useAnalysis` poderia ser importado em qualquer outro componente para fornecer a mesma funcionalidade de análise de habilidades com zero duplicação de código.
- **Testabilidade**: O hook pode ser testado isoladamente, separado da UI, levando a testes mais robustos e confiáveis.

## Abstração da Camada de Serviço

Todas as interações com a API externa do Google Gemini são tratadas por um módulo de serviço dedicado (`/services/geminiService.ts`).

- **Responsabilidade Única**: A única função deste serviço é comunicar-se com a IA. Ele sabe como formatar requisições e analisar respostas.
- **Troca Fácil**: Se quiséssemos mudar para um provedor de IA diferente, precisaríamos atualizar apenas este único arquivo. O resto da aplicação permaneceria inalterado, pois não tem conhecimento direto da API Gemini.

Essa arquitetura profissional e em camadas garante que o ImpactSkills não seja apenas uma aplicação funcional, mas uma base robusta e escalável para o desenvolvimento futuro.
