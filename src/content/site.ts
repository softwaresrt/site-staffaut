export type Agent = {
  id: string;
  name: string;
  role: string;
  dept: string;
  line: string;
  details: string;
  number: string;
  image?: string;
  skills: string[];
  task: string;
};

export const site = {
  name: 'StaffAut',
  tagline: 'Funcionários digitais que fazem acontecer.',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  brand: { orange: '#ff4210', black: '#111111', white: '#ffffff' },
  nav: [
    { label: 'A revolução', id: '#revolucao' },
    { label: 'Funcionários', id: '#funcionarios' },
    { label: 'Como funciona', id: '#como-funciona' },
    { label: 'Perguntas', id: '#perguntas' }
  ]
};

// Cinco retratos oficiais foram fornecidos. Não substituir os três ausentes por rostos inventados.
export const agents: Agent[] = [
  { id:'telos',name:'Telos', role:'Especialista em vendas',dept:'COMERCIAL',line:'Da oportunidade à proposta.',details:'Organiza a prospecção, acompanha oportunidades e ajuda sua operação comercial a avançar.',number:'01',skills:['Prospecção','Qualificação','Propostas'],task:'Lead qualificado e encaminhado ao comercial.' },
  { id:'codask',name:'Codask',role:'Especialista em atendimento',dept:'RELACIONAMENTO',line:'O seu atendimento não para.',details:'Conduz conversas, responde dúvidas e organiza solicitações para sua equipe.',number:'02',skills:['Atendimento','Triagem','Follow-up'],task:'Solicitação recebida e classificada.' },
  { id:'voxel',name:'Voxel',role:'Especialista em marketing',dept:'MARKETING',line:'Ideias que viram operação.',details:'Apoia o planejamento e a execução de rotinas de comunicação digital.',number:'03',skills:['Campanhas','Planejamento','Conteúdo'],task:'Plano de campanha organizado para aprovação.' },
  { id:'artyx',name:'Artyx',role:'Designer digital',dept:'CRIAÇÃO',line:'Design que não fica na fila.',details:'Apoia a produção de peças e entregas visuais com direcionamento de marca.',number:'04',image:'/agents/artyx.webp',skills:['Peças digitais','Identidade','Criação'],task:'Peça visual enviada para revisão.' },
  { id:'metryx',name:'Metryx',role:'Gestor de tráfego',dept:'PERFORMANCE',line:'Campanhas sob controle.',details:'Acompanha a organização de campanhas, criativos e indicadores de performance.',number:'05',image:'/agents/metryx.webp',skills:['Tráfego pago','Análise','Otimização'],task:'Resumo de campanha preparado.' },
  { id:'krypton',name:'Krypton',role:'Especialista financeiro',dept:'FINANCEIRO',line:'Mais clareza nos números.',details:'Auxilia em rotinas financeiras, organização e acompanhamento de demandas.',number:'06',image:'/agents/krypton.webp',skills:['Rotinas','Organização','Relatórios'],task:'Lançamentos organizados para conferência.' },
  { id:'codanik',name:'Codanik',role:'Desenvolvedor digital',dept:'TECNOLOGIA',line:'Tecnologia em movimento.',details:'Apoia demandas de desenvolvimento, manutenção e melhorias digitais.',number:'07',image:'/agents/codanik.webp',skills:['Desenvolvimento','Manutenção','Integrações'],task:'Tarefa técnica documentada e encaminhada.' },
  { id:'cinex',name:'Cinex',role:'Editor de vídeo',dept:'AUDIOVISUAL',line:'Do briefing ao corte final.',details:'Apoia a edição e produção de vídeos para a rotina de conteúdo da empresa.',number:'08',image:'/agents/cinex.webp',skills:['Edição','Vídeos curtos','Pós-produção'],task:'Prévia de vídeo preparada para revisão.' }
];

export const questions = [
  { question:'O que é um funcionário digital?', answer:'É um agente de inteligência artificial configurado para assumir atividades de uma função específica, com regras, ferramentas e supervisão. Não é uma pessoa contratada e não substitui automaticamente todas as responsabilidades de um profissional.' },
  { question:'É a mesma coisa que um chatbot?', answer:'Não. Além de conversar, a proposta da StaffAut é organizar e executar etapas de processos, conforme as funções e integrações disponíveis para cada agente.' },
  { question:'Preciso usar WhatsApp para contratar?', answer:'Não necessariamente. A disponibilidade de canais e integrações depende do funcionário e da configuração escolhida. A integração com WhatsApp pode ser opcional.' },
  { question:'Posso acompanhar o trabalho do funcionário?', answer:'A proposta do produto inclui visibilidade das atividades, regras e resultados. Os recursos exatos e sua disponibilidade devem ser confirmados no ambiente de contratação.' },
  { question:'Como faço para começar?', answer:'Escolha o funcionário que atende melhor sua necessidade e envie seu interesse pelo formulário. A equipe poderá orientar sobre configuração, integração e disponibilidade.' },
  { question:'Quanto custa?', answer:'As condições comerciais dependem do funcionário e do plano disponível. Consulte a StaffAut para receber as informações atualizadas antes de contratar.' }
];
