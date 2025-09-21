# ImpactSkills: Analisador de Habilidades Open-source

[![GitHub Repo](https://img.shields.io/badge/GitHub-Ver%20C%C3%B3digo-blue?logo=github)](https://github.com/eversonfilipe/ImpactSkills-Open-source-Analyzer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Uma ferramenta com Inteligência Artificial para analisar descrições de vagas em comparação com suas habilidades, identificando pontos fortes e áreas para desenvolvimento. Este projeto foi criado por **Éverson Filipe** como projeto final do programa de mentoria **Lab.AI**, uma parceria entre o **Instituto Localiza** e o **Instituto Joule**.

[Read this in English / Leia em Inglês](./README.md)

---

## ✨ Principais Funcionalidades

- **Análise com IA**: Utiliza a IA Gemini do Google para fornecer uma comparação aprofundada entre uma descrição de vaga e suas qualificações.
- **Dois Modos de Entrada**: Cole suas habilidades como texto ou simplesmente faça o upload do seu currículo em formato PDF para uma análise completa.
- **Insights Práticos**: Receba duas listas claras: "Seus Pontos Fortes" (habilidades que correspondem à vaga) e "Áreas a Desenvolver" (habilidades que você precisa adquirir).
- **UI Moderna e Responsiva**: Uma interface limpa, profissional e responsiva construída com React e Tailwind CSS.
- **Seguro e Privado**: Todo o processamento é feito sem armazenar seus dados pessoais. Suas informações são enviadas de forma segura para análise e não são retidas.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript
- **Estilização**: Tailwind CSS
- **IA**: Google Gemini API (`gemini-2.5-flash`)
- **Modularidade**: Construído com componentes reutilizáveis e custom hooks para escalabilidade.

## ⚙️ Como Começar

### Pré-requisitos

- Um navegador web moderno.
- Uma Chave de API do Google AI.

### Instalação e Configuração


2.  **Configure sua Chave de API:**
    Esta aplicação requer uma chave de API do Google AI para funcionar. Você deve configurá-la como uma variável de ambiente chamada `API_KEY`.

    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione sua chave de API a este arquivo:
      ```
      API_KEY=sua_chave_de_api_google_ai_aqui
      ```
    - A aplicação usará essa chave automaticamente.

3.  **Execute a aplicação:**
    Abra o arquivo `index.html` em seu navegador, ou sirva o diretório usando um servidor web local.

## 📖 Como Usar

1.  **Adicione a Descrição da Vaga**: Cole o texto completo da descrição da vaga de seu interesse no painel esquerdo.
2.  **Forneça Suas Habilidades**:
    - **Opção A (Texto)**: No painel direito, liste suas habilidades profissionais, separadas por vírgulas.
    - **Opção B (PDF)**: Clique no seletor "Upload CV (PDF)" e faça o upload do seu currículo.
3.  **Analise**: Clique no botão "Analisar Minhas Habilidades".
4.  **Revise os Resultados**: Um modal aparecerá mostrando suas habilidades compatíveis e as habilidades que você deve focar em desenvolver.

## 🤝 Contribuição

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito bem-vinda**.

Por favor, leia nossas [**Diretrizes de Contribuição**](./docs/CONTRIBUTING-PT.md) para detalhes sobre nosso código de conduta e o processo para enviar pull requests.

## 🛡️ Política de Segurança

Levamos a segurança deste projeto a sério. Se você descobrir uma vulnerabilidade de segurança, por favor, siga nossa [**Política de Segurança**](./docs/SECURITY-PT.md) para reportá-la.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT

## 🙏 Agradecimentos

- **Éverson Filipe** ([@eversonfilipe](https://github.com/eversonfilipe)) - Criador do Projeto
- **Programa de Mentoria Lab.AI**
- **Instituto Localiza**
- **Instituto Joule**