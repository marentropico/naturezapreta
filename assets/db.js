/**
 * EcoVoz - Módulo de Banco de Dados Local (localStorage)
 * 
 * Este arquivo funciona como a camada de dados (Model) do aplicativo.
 * Ele inicializa o localStorage com dados de semente (seed data) na primeira execução,
 * fornecendo relatos, propostas de soluções, estatísticas oficiais e contas de demonstração.
 */

// 1. Relatos de ocorrências iniciais (seed data) baseados em casos reais de assimetria socioambiental no Brasil
const initialRelatos = [
  {
    id: '1',
    bairro: 'Jesuítas (Santa Cruz)',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    cep: '23525-060',
    problema: 'Particulado siderúrgico sedimentável (Poeira prateada metálica)',
    descricao: 'Presença constante de poeira de ferro de usina siderúrgica local, manchando varandas, corroendo fiações elétricas e provocando crises respiratórias infantis. Registro demonstrativo para exemplificar como o EcoVoz organizaria recorrência.',
    gravidade: 'Alta',
    categoria: 'Ar',
    frequência: 'Diária',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-05-28',
    coordenadas: { x: 28, y: 44 },
    vulnerabilidade: 'Alta',
    numRelatos: 12,
    sentimento: 'crítico',
    userEmail: 'gestor@ecovoz.com.br'
  },
  {
    id: '2',
    bairro: 'Vila Parisi',
    cidade: 'Cubatão',
    uf: 'SP',
    cep: '11500-000',
    problema: 'Ruído industrial noturno acima dos limites da NBR 10151',
    descricao: 'Emissão contínua de exaustores de fundição e moagem operando após o horário comercial. Registro demonstrativo para simular triagem de ruído noturno, sem afirmar medição real.',
    gravidade: 'Média',
    categoria: 'Ruído',
    frequência: 'Intermitente (noturno)',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-05-30',
    coordenadas: { x: 44, y: 36 },
    vulnerabilidade: 'Média',
    numRelatos: 8,
    sentimento: 'crítico',
    userEmail: 'gestor@ecovoz.com.br'
  },
  {
    id: '3',
    bairro: 'Santa Cruz dos Navegantes',
    cidade: 'Guarujá',
    uf: 'SP',
    cep: '11403-100',
    problema: 'Assoreamento e poluidores pesados no Canal do Porto',
    descricao: 'Vazamentos pontuais de óleos combustíveis na zona de manobra de navios e arraste de fuligem das chaminés de cargueiros de grande porte. A comunidade pesqueira artesanal reporta diminuição de espécies nativas no estuário interno.',
    gravidade: 'Alta',
    categoria: 'Água',
    frequência: 'Sempre que há alta maré e tráfego pesado',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-06-01',
    coordenadas: { x: 67, y: 72 },
    vulnerabilidade: 'Alta',
    numRelatos: 9,
    sentimento: 'crítico',
    userEmail: 'gestor@ecovoz.com.br'
  },
  {
    id: '4',
    bairro: 'Veneza',
    cidade: 'Ipatinga',
    uf: 'MG',
    cep: '35160-025',
    problema: 'Ilhas de calor e fuligem de partículas de coque da aciaria',
    descricao: 'Redução drástica da arborização perimetral próxima aos limites da aciaria. Registro demonstrativo de ilha de calor e baixa arborização. Precipitação de partículas de carbono negro que afetam diretamente as calçadas residenciais.',
    gravidade: 'Média',
    categoria: 'Verde urbano',
    frequência: 'Constante',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-05-25',
    coordenadas: { x: 21, y: 76 },
    vulnerabilidade: 'Média',
    numRelatos: 6,
    sentimento: 'neutro'
  },
  {
    id: '5',
    bairro: 'Centro',
    cidade: 'Candiota',
    uf: 'RS',
    cep: '96495-000',
    problema: 'Dispersão de poeira de cinzas de carvão mineral de termelétrica',
    descricao: 'Pluma visível de emissão de particulados na área de depósito de cinzas sob ventos fortes. Saturação das canaletas locais de microdrenagem, contaminando águas pluviais rasas com resíduos alcalinos sedimentados.',
    gravidade: 'Alta',
    categoria: 'Mobilidade', 
    frequência: 'Dias com ventos superiores a 25 km/h',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-06-02',
    coordenadas: { x: 52, y: 18 },
    vulnerabilidade: 'Baixa',
    numRelatos: 5,
    sentimento: 'crítico'
  },
  {
    id: '6',
    bairro: 'Distrito Industrial',
    cidade: 'Camaçari',
    uf: 'BA',
    cep: '42816-000',
    problema: 'Odores agressivos de compostos orgânicos voláteis (COVs)',
    descricao: 'Constante liberação de gases industriais característicos no período da madrugada, forçando moradores a selarem as janelas domésticas para evitar episódios agudos de enxaqueca infantil e alergias cutâneas graves.',
    gravidade: 'Crítica',
    categoria: 'Ar',
    frequência: 'Finais de semana (madrugada)',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-06-05',
    coordenadas: { x: 38, y: 55 },
    vulnerabilidade: 'Alta',
    numRelatos: 10,
    sentimento: 'crítico'
  },
  {
    id: '7',
    bairro: 'Vila Operária (Vila Santa Cecília)',
    cidade: 'Volta Redonda',
    uf: 'RJ',
    cep: '27260-150',
    problema: 'Precipitação em excesso de pó de escória preta brilhante',
    descricao: 'Pó preto proveniente de pátios de estocagem de escória sedimenta-se diariamente nas áreas de recreação infantil públicas e escolas da Vila. O pó possui altos índices de óxido de ferro e silício.',
    gravidade: 'Crítica',
    categoria: 'Ar',
    frequência: 'Diária',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-06-06',
    coordenadas: { x: 32, y: 41 },
    vulnerabilidade: 'Alta',
    numRelatos: 14,
    sentimento: 'crítico'
  }
];

// 2. Propostas iniciais enviadas para mitigação socioambiental
const initialPropostas = [
  {
    id: 'p1',
    titulo: 'Barreira Biológica de Ipês e Sibipirunas no Canal de Jesuítas',
    autor: 'Coletivo Agroecológico EcoCarioca',
    problemaRelacionado: 'Sedimentação de partículas de ferro nas residências de Santa Cruz (RJ).',
    descricao: 'Implantação de cinturão verde em faixas de amortecimento de 50 metros de largura ao redor do polo industrial. Utilização de árvores de copa densa (Ipê-Rosa e Sibipiruna) consorciadas com espécies arbustivas nativas para retenção natural por adsorção de poeira e regulação térmica do vento.',
    categoria: 'Barreiras verdes',
    custo: 'Médio',
    prazo: '6 meses',
    impacto: 'Redução localizada de dispersão de poeira, regulação microclimática térmica e enriquecimento paisagístico do espaço público.',
    viabilidade: 'Alta',
    status: 'Em Andamento',
    userEmail: 'gestor@ecovoz.com.br' // Vinculada ao gestor padrão para testes imediatos
  },
  {
    id: 'p2',
    titulo: 'Convênio de Economia Circular de Agregados Reciclados (Cubatão)',
    autor: 'Faculdade de Engenharia Industrial Mogi',
    problemaRelacionado: 'Descarte e acumulação de agregados siderúrgicos no leito de vias industriais secundárias.',
    descricao: 'Desenvolvimento de blocos intertravados para calçamento de vias próximas e praças públicas locais a partir de coprodutos de alto-forno inertizados. Projeto promove integração comunitária com capacitação profissional de jovens vulnerabilizados.',
    categoria: 'Economia circular',
    custo: 'Baixo',
    prazo: '3 meses',
    impacto: 'Mitigação de poeira de asfalto secundário, redução do uso de agregados virgens e fomento à cooperativa de reciclagem de materiais.',
    viabilidade: 'Alta',
    status: 'Em Discussão',
    userEmail: 'gestor@ecovoz.com.br'
  },
  {
    id: 'p3',
    titulo: 'Filtros Urbanos de Briófitas (Musgos) Inteligentes de Sucção',
    autor: 'Startup Biotecnológica Verde-Tec',
    problemaRelacionado: 'Concentração de partículas finas PM2.5 no ar de Volta Redonda (RJ).',
    descricao: 'Instalação de painéis públicos de musgo ativo (briófitas) acoplados a exautores solares verticais de baixíssimo ruído. O musgo metaboliza poeira de ferro e retém o material particulado pesado de forma 18 vezes mais eficaz que árvores convencionais.',
    categoria: 'Monitoramento ambiental',
    custo: 'Médio',
    prazo: '4 meses',
    impacto: 'Melhoria localizada da qualidade do ar e geração de dados abertos sobre material particulado.',
    viabilidade: 'Alta',
    status: 'Implementado',
    userEmail: 'gestor@ecovoz.com.br'
  }
];

// 3. Contas de usuários padrão de semente (Seed Accounts)
const defaultUsers = [
  {
    id: 'user-default-1',
    name: 'Gestor ESG EcoVoz',
    email: 'gestor@ecovoz.com.br',
    password: '123456' // senha simples para facilitar a demonstração/correção
  },
  {
    id: 'user-default-2',
    name: 'Maria Lúcia Santos',
    email: 'maria.santos@comunidade.org',
    password: '123456'
  }
];

/**
 * Inicialização dos dados no LocalStorage se não estiverem presentes
 */
function initDatabase() {
  if (!localStorage.getItem('esg_relatos')) {
    localStorage.setItem('esg_relatos', JSON.stringify(initialRelatos));
  }
  if (!localStorage.getItem('esg_propostas')) {
    localStorage.setItem('esg_propostas', JSON.stringify(initialPropostas));
  }
  if (!localStorage.getItem('esg_plataforma_users')) {
    localStorage.setItem('esg_plataforma_users', JSON.stringify(defaultUsers));
  }
}

// Inicializa imediatamente ao carregar o script
initDatabase();

/**
 * Interface do Banco de Dados Local (API de Acesso)
 */
const AppDB = {
  // RELATOS
  getRelatos: () => {
    try {
      return JSON.parse(localStorage.getItem('esg_relatos') || '[]');
    } catch (e) {
      console.error("Erro ao ler relatos do localStorage", e);
      return [];
    }
  },

  addRelato: (novoRelato) => {
    const relatos = AppDB.getRelatos();
    relatos.unshift(novoRelato);
    localStorage.setItem('esg_relatos', JSON.stringify(relatos));
    return novoRelato;
  },

  updateRelato: (relatoAtualizado) => {
    const relatos = AppDB.getRelatos();
    const index = relatos.findIndex(r => r.id === relatoAtualizado.id);
    if (index !== -1) {
      relatos[index] = relatoAtualizado;
      localStorage.setItem('esg_relatos', JSON.stringify(relatos));
      return true;
    }
    return false;
  },

  deleteRelato: (id) => {
    const relatos = AppDB.getRelatos();
    const filtrados = relatos.filter(r => r.id !== id);
    localStorage.setItem('esg_relatos', JSON.stringify(filtrados));
    return true;
  },

  // PROPOSTAS
  getPropostas: () => {
    try {
      return JSON.parse(localStorage.getItem('esg_propostas') || '[]');
    } catch (e) {
      console.error("Erro ao ler propostas do localStorage", e);
      return [];
    }
  },

  addProposta: (novaProposta) => {
    const propostas = AppDB.getPropostas();
    propostas.unshift(novaProposta);
    localStorage.setItem('esg_propostas', JSON.stringify(propostas));
    return novaProposta;
  },

  updateProposta: (propostaAtualizada) => {
    const propostas = AppDB.getPropostas();
    const index = propostas.findIndex(p => p.id === propostaAtualizada.id);
    if (index !== -1) {
      propostas[index] = propostaAtualizada;
      localStorage.setItem('esg_propostas', JSON.stringify(propostas));
      return true;
    }
    return false;
  },

  deleteProposta: (id) => {
    const propostas = AppDB.getPropostas();
    const filtradas = propostas.filter(p => p.id !== id);
    localStorage.setItem('esg_propostas', JSON.stringify(filtradas));
    return true;
  },

  // USUÁRIOS
  getUsers: () => {
    try {
      return JSON.parse(localStorage.getItem('esg_plataforma_users') || '[]');
    } catch (e) {
      console.error("Erro ao ler usuários do localStorage", e);
      return [];
    }
  },

  registerUser: (newUser) => {
    const users = AppDB.getUsers();
    const emailExists = users.some(u => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (emailExists) {
      return { success: false, message: 'Este e-mail já está em uso.' };
    }
    users.push(newUser);
    localStorage.setItem('esg_plataforma_users', JSON.stringify(users));
    return { success: true, user: newUser };
  },

  loginUser: (email, password) => {
    const users = AppDB.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, message: 'Usuário não localizado.' };
    }
    if (found.password !== password) {
      return { success: false, message: 'Senha incorreta.' };
    }
    const userSession = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem('esg_plataforma_active_user', JSON.stringify(userSession));
    return { success: true, user: userSession };
  },

  logoutUser: () => {
    localStorage.removeItem('esg_plataforma_active_user');
  },

  getActiveUser: () => {
    try {
      const active = localStorage.getItem('esg_plataforma_active_user');
      return active ? JSON.parse(active) : null;
    } catch (e) {
      return null;
    }
  }
};

// Exportação global para outros scripts carregados na mesma janela
window.AppDB = AppDB;
