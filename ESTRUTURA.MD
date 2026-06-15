# 🌿 Arquitetura EcoVoz & Natureza Preta

Este documento detalha o mapa de arquivos, a arquitetura de persistência e a lógica de acessibilidade do portal **EcoVoz - Natureza Preta**. O projeto original, construído como um aplicativo integrado Remix (React e TypeScript), foi totalmente refatorado para operar exclusivamente com arquivos **HTML, CSS e JavaScript Vanilla (nativo)**, de modo modular, portável e educativo.

---

## 🗺️ Mapa da Estrutura de Arquivos

A estrutura do projeto foi simplificada e blocada para garantir máxima portabilidade e independência de ferramentas de build complexas:

```text
naturezapreta/
├── assets/
│   ├── db.js             <- Camada de dados (Model) baseada em localStorage + Seed Data
│   ├── main.js           <- Inicializador comum, injeção de Header, Footer e AuthModal
│   ├── accessibility.js  <- Painel lateral de acessibilidade, TTS por voz e atalhos e-MAG
│   └── style.css         <- Design System consolidado com tema verde-musgo/preto e contrastes
├── index.html            <- Página Inicial (Apresentação, status e CTAs)
├── sobre.html            <- Sobre o EcoVoz (Valores, 4 pilares e alinhamento com ODS)
├── dores.html            <- Impactos Territoriais (Dados IBGE/Ipea e Casos Reais)
├── mapa.html             <- Cartografia Participativa (Mapa SVG interativo com filtros e heatmap)
├── relatar.html          <- Canal de Denúncias (Formulário com ViaCEP, gravidade e sentimento)
├── solucoes.html         <- Banco de Soluções (Calculadoras de ROI ESG, Metais e novo envio)
├── dashboard.html        <- Painel Estatístico ESG (Gráficos SVG/CSS responsivos sem dependências)
├── restrito.html         <- Portal do Gestor / Ouvidoria (CRUD completo e exportador PDF via CDN)
└── ESTRUTURA.MD          <- Este manual arquitetônico
```

---

## 🧠 Camada de Dados e Persistência (`assets/db.js`)

Para manter o dinamismo de estados do React original (criação de denúncias, propostas e login) sem depender de um banco de dados no servidor, o projeto utiliza a API **`localStorage`** do navegador.

- **Inicialização Automática (`initDatabase`):** No primeiro carregamento de qualquer página, o banco é semeado com dados padrão baseados em conflitos reais de racismo ambiental no Brasil (Volta Redonda, Cubatão, Jesuítas-Santa Cruz e Guarujá).
- **Entidades Armazenadas:**
  - `esg_relatos`: Vetor contendo a descrição das ocorrências, categoria, gravidade, coordenadas cartográficas e e-mail do autor (quando logado).
  - `esg_propostas`: Vetor contendo propostas sustentáveis de mitigação socioambiental em acompanhamento.
  - `esg_plataforma_users`: Lista de contas cadastradas. Inclui a conta padrão para demonstração:
    - **E-mail:** `gestor@ecovoz.com.br`
    - **Senha:** `123456`
  - `esg_plataforma_active_user`: Armazena o usuário da sessão corrente após a autenticação.
- **Interface Pública (`window.AppDB`):** Expõe métodos auxiliares CRUD (`getRelatos()`, `addRelato()`, `deleteRelato()`, `updateProposta()`, etc.) acessíveis de forma transparente por todas as páginas.

---

## 🎨 Design System e Estilos (`assets/style.css`)

O design do EcoVoz adota a premissa de **verde musgo com degradê para o preto**, aplicando estética premium (glassmorphism, transições suaves e tipografia moderna via Google Fonts):

- **Paleta de Cores:**
  - Principal: Verde Musgo Escuro (`--green-dark`: `#123524`)
  - Acentuação: Laranja Alerta/Contraste (`--accent`: `#F28C28`)
  - Fundo Geral: Bege acinzentado suave (`--bg-primary`: `#F4F7F2`)
  - Gradiente de fundo: Mescla suave de musgo e preto asfalto.
- **Tipografia:** Uso da fonte sans-serif **Inter** para leitura fluida e **JetBrains Mono** para metadados numéricos, datas e logs de conformidade.
- **Responsividade:** Grid adaptativo baseado em CSS Flexbox e CSS Grid nativos, garantindo fluidez desde telas mobile pequenas até monitores ultra-wide.

---

## ♿ Sistema Avançado de Acessibilidade (`assets/accessibility.js`)

Implementado em conformidade com as diretrizes do **e-MAG** (Modelo de Acessibilidade em Governo Eletrônico), o sistema injeta um menu flutuante lateral e recursos em todas as páginas:

1. **Ajustes Visuais:** Alternadores para Alto Contraste (preto com letras amarelas), Escala de Cinza (monocromático) e Sublinhado automático em todos os links da página.
2. **Auxiliar de Leitura (Régua):** Uma barra semitransparente horizontal que segue a posição do cursor do mouse, facilitando a leitura de blocos longos de texto para usuários com TDAH ou dificuldades de foco.
3. **Fonte para Dislexia:** Altera a família tipográfica global e amplia o espaçamento das letras, mitigando a distorção visual na leitura.
4. **Sintetizador de Voz Integrado (TTS):** Utiliza a API `SpeechSynthesis` do navegador para ler o texto em português ao passar o mouse ou focar os elementos da página via teclado.
5. **Atalhos do Teclado (Alt + Número):**
   - `Alt + 1`: Início (`index.html`)
   - `Alt + 2`: Diagnóstico (`dores.html`)
   - `Alt + 3`: Mapa (`mapa.html`)
   - `Alt + 4`: Relatar (`relatar.html`)
   - `Alt + 5`: Soluções (`solucoes.html`)
   - `Alt + 6`: Painel ESG (`dashboard.html`)
   - `Alt + 7`: Sobre (`sobre.html`)
   - `Alt + 8`: Área Restrita (`restrito.html`)

---

## 📈 Gráficos Sem Dependências em `dashboard.html`

Em conformidade com a premissa de código portable e limpo, não importamos bibliotecas pesadas de gráficos (como Chart.js ou Recharts). O painel reconstrói os gráficos nativamente via **SVG + CSS + JS**:

- **Esgotamento Sanitário (IBGE) e Banheiros (Ipea):** Desenhados com coordenadas de vetores `<rect>` e `<circle>` calculados dinamicamente. Os dados do Ipea usam a fórmula de `stroke-dasharray` para segmentar arcos do donut de maneira precisa.
- **Dados do Protótipo (Categorias e Status):** Lidos diretamente do `AppDB` no localStorage em tempo real e montados dinamicamente via JS manipulando o DOM do SVG.
- **Interatividade:** Tooltips dinâmicos posicionados via escuta do cursor do mouse com detalhamento fino dos valores em foco.

---

## 🛡️ Área Restrita e Exportador de PDF em `restrito.html`

- **Verificação de Acesso:** Ao carregar a página, um script checa a sessão no `localStorage`. Caso não exista usuário logado, uma tela de bloqueio com banner informativo substitui o dashboard de ouvidoria.
- **Acompanhamento e CRUD Completo:**
  - O gestor logado visualiza exclusivamente seus relatos e propostas submetidos.
  - Permite a edição ágil de relatos e propostas através de modais interativos.
  - Disponibiliza uma caixa de seleção rápida para atualizar o andamento de propostas (Discussão, Andamento, Concluído) que reflete instantaneamente nos gráficos de `dashboard.html`.
- **Exportação de Dossiê PDF:** Utiliza a biblioteca **`jsPDF`** via CDN. O script formata e exporta um dossiê executivo contendo o timbre institucional, cabeçalhos, metadados do autor e o texto detalhado de cada relato para apresentação em reuniões de comitê.

---

## 🚀 Como Executar Localmente

Como o projeto opera com arquivos puramente estáticos e APIs nativas do navegador, a execução é extremamente simples:

1. Abra qualquer navegador e dê dois cliques em `index.html`.
2. Para evitar bloqueio de requisições e garantir funcionamento perfeito de integrações de rede (como a consulta automática de CEP na API do ViaCEP), é recomendado rodar um servidor local simples:
   - Utilizando **VS Code**: Instale a extensão *Live Server* e clique em **Go Live**.
   - Utilizando **Node.js**:
     ```bash
     npm install -g serve
     serve .
     ```
   - Utilizando **Python**:
     ```bash
     python -m http.server 8000
     ```
3. Acesse `http://localhost:8000` no seu navegador favorito.
