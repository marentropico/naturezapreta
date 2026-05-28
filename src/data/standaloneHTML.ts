export const standaloneHTMLContent = `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pitch Deck ESG: Parceria Contra o Racismo Ambiental — ArcelorMittal</title>
    <!-- Favicon / Meta Tags Corporativas -->
    <meta name="description" content="Apresentação de Projeto de Mitigação de Racismo Ambiental e Alinhamento ESG para Executivos e Investidores da ArcelorMittal.">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            slate: '#0f172a',   /* Slate Corporativo / Fundo */
                            grayBg: '#f8fafc',  /* Fundo secundário claro */
                            green: '#15803d',   /* Verde Floresta Sustentabilidade */
                            emerald: '#059669', /* Esmeralda de Destaque */
                            orange: '#ea580c',  /* Laranja ArcelorMittal Match */
                            earth: '#78350f',   /* Marrom Terra de Conexão Humana */
                            charcoal: '#334155' /* Cinza Escuro de Texto */
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Space Grotesk', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <style>
        /* Smooth Custom Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
        }
        /* Custom Hover Zoom & Shadows */
        .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px -10px rgba(15, 23, 42, 0.15);
            border-color: #ea580c;
        }
        .transition-all-custom {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 font-sans tracking-tight leading-relaxed">

    <!-- 1. HEADER & BARRA DE NAVEGAÇÃO FIXA -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all-custom">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <!-- Brand Logo -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-green to-brand-orange flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    E
                </div>
                <div>
                    <span class="font-display font-bold text-lg text-brand-slate uppercase tracking-wide">Plataforma ECO-INTEGRA</span>
                    <span class="block text-[10px] text-brand-orange font-semibold tracking-wider uppercase">ESG de Precisão Humana & Territorial</span>
                </div>
            </div>

            <!-- Navegação Desktop -->
            <nav class="hidden md:flex items-center space-x-8" aria-label="Menu Principal">
                <a href="#problema" class="text-sm font-medium text-brand-charcoal hover:text-brand-orange transition-colors">O Problema</a>
                <a href="#solucao" class="text-sm font-medium text-brand-charcoal hover:text-brand-orange transition-colors">A Solução</a>
                <a href="#ods" class="text-sm font-medium text-brand-charcoal hover:text-brand-orange transition-colors">Alinhamento ODS</a>
                <a href="#custo-inacao" class="text-sm font-medium text-brand-charcoal hover:text-brand-orange transition-colors">Custo da Inação</a>
                <a href="#arcelormittal" class="text-sm font-medium text-brand-charcoal hover:text-brand-orange transition-colors">Por que ArcelorMittal?</a>
            </nav>

            <!-- CTA Header -->
            <div class="flex items-center space-x-4">
                <a href="#arcelormittal" class="bg-brand-slate text-white hover:bg-brand-orange transition-all-custom duration-300 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange">
                    Parceria Estratégica
                </a>
            </div>
        </div>
    </header>

    <!-- HERO SECTION -->
    <section class="relative bg-gradient-to-b from-white via-slate-50 to-emerald-50/20 py-16 lg:py-28 overflow-hidden">
        <!-- Elemento Gráfico de Fundo -->
        <div class="absolute inset-0 z-0 pointer-events-none opacity-40">
            <div class="absolute top-1/4 left-1/10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div class="absolute bottom-1/4 right-1/10 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center max-w-4xl mx-auto animate-fade-in">
                <!-- Tag de Contexto -->
                <span class="inline-flex items-center rounded-full bg-orange-50 px-4 py-1.5 text-xs font-semibold text-brand-orange border border-orange-100 uppercase tracking-widest mb-6" aria-label="Foco do Pitch">
                    <svg class="w-2.5 h-2.5 mr-1.5 fill-current" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3"></circle></svg>
                    Apresentação Corporativa & ESG de Impacto
                </span>

                <!-- Título de Impacto -->
                <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-slate tracking-tight mb-8">
                    A verdadeira sustentabilidade <br class="hidden sm:inline" />
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-emerald">não deixa nenhuma comunidade</span> para trás.
                </h1>

                <!-- Subtítulo Persuasivo -->
                <p class="text-lg sm:text-xl text-brand-charcoal font-normal leading-relaxed mb-10 max-w-3xl mx-auto">
                    Conectando a excelência industrial da <strong>ArcelorMittal</strong> à justiça climática. Um projeto pioneiro de inteligência territorial para combater o <strong>Racismo Ambiental</strong> através de monitoramento participativo, cinturões verdes urbanos e inclusão produtiva socioambiental de alta performance.
                </p>

                <!-- Botões CTA -->
                <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <a href="#problema" class="w-full sm:w-auto text-center bg-brand-green hover:bg-brand-emerald text-white text-base font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        Conheça a Proposta
                    </a>
                    <a href="#custo-inacao" class="w-full sm:w-auto text-center border-2 border-slate-300 hover:border-brand-slate bg-transparent text-brand-slate hover:bg-slate-50 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                        O Custo da Inação
                    </a>
                </div>
            </div>
            
            <!-- Bento Stats Panel (Apoio ao Pitch) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 sm:mt-24 max-w-5xl mx-auto">
                <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
                    <div class="p-3 bg-red-50 rounded-lg text-brand-orange">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                    <div>
                        <div class="font-display font-bold text-2xl text-slate-900">75%</div>
                        <p class="text-xs text-brand-charcoal mt-1">Das comunidades historicamente vulneráveis residem próximas a zonas com atividade industrial pesada global sem buffers florestais.</p>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
                    <div class="p-3 bg-emerald-50 rounded-lg text-brand-green">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                    </div>
                    <div>
                        <div class="font-display font-bold text-2xl text-slate-900">+12%</div>
                        <p class="text-xs text-brand-charcoal mt-1">De valorização média em pontuações de agências de Rating ESG para companhias industriais com projetos co-criados e geridos por comunidades locais.</p>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
                    <div class="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <div class="font-display font-bold text-2xl text-slate-900">U$ 53Trilhões</div>
                        <p class="text-xs text-brand-charcoal mt-1">Estimativa de circulação global em ativos sob métricas ESG estritas e diligências comunitárias integradas até o final desta década.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. O PROBLEMA (A Dor da Sociedade) -->
    <section id="problema" class="py-20 lg:py-28 bg-white border-y border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
                
                <!-- Coluna Texto e Introdução ao Conceito -->
                <div class="lg:col-span-5 mb-12 lg:mb-0">
                    <span class="text-sm font-bold text-brand-orange uppercase tracking-wider block mb-2">A Dor da Sociedade</span>
                    <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-brand-slate leading-tight mb-6">
                        O Diagnóstico Ético: <br/>O que é o Racismo Ambiental?
                    </h2>
                    
                    <p class="text-brand-charcoal text-base mb-6">
                        Aprovado pela sociologia acadêmica e pelas instâncias internacionais do clima, o conceito de <strong>Racismo Ambiental</strong> refere-se à imposição sistemática de resíduos, poluição e riscos ecológicos a comunidades historicamente marginalizadas (minorias étnicas, periféricas e de baixa renda).
                    </p>
                    
                    <p class="text-brand-charcoal text-base mb-6">
                        A injustiça reside no fato de que essas comunidades herdam as <strong>externalidades industriais negativas</strong> (solo empobrecido, má qualidade do ar, e estresse térmico) mesmo sendo as que menos consomem ou lucram com a cadeia de supra-produção.
                    </p>
                    
                    <div class="p-5 bg-orange-50/50 rounded-xl border border-orange-100 flex items-start space-x-3">
                        <div class="text-brand-orange shrink-0 mt-1">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <p class="text-sm text-brand-earth">
                            <strong>Diretriz ESG Global:</strong> A governança de vanguarda exige mitigar esses contrastes, passando de uma postura de mera doação filantrópica para projetos estruturais de <em>reparação tecnológica ativa</em>.
                        </p>
                    </div>
                </div>

                <!-- Coluna Visual / Cards de Impacto Real -->
                <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <!-- Impacto 1 -->
                    <div class="bg-slate-50 p-8 rounded-2xl border border-slate-200 transition-all-custom card-hover">
                        <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-brand-orange mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>
                        </div>
                        <h3 class="font-display font-bold text-lg text-slate-900 mb-3">Poluição Atmosférica Desproporcional</h3>
                        <p class="text-sm text-brand-charcoal leading-relaxed">
                            Bairros periféricos periféricos a áreas metalúrgicas possuem taxas de material particulado de 2 a 3 vezes maiores que as áreas nobres. Isso eleva de forma severa as internações infantis por asma e bronquite crônica.
                        </p>
                    </div>

                    <!-- Impacto 2 -->
                    <div class="bg-slate-50 p-8 rounded-2xl border border-slate-200 transition-all-custom card-hover">
                        <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h3 class="font-display font-bold text-lg text-slate-900 mb-3">Estresse Térmico & Ilhas de Calor</h3>
                        <p class="text-sm text-brand-charcoal leading-relaxed">
                            A virtual ausência de cobertura vegetal urbana gera variação térmica local de até 8°C a mais de calor em bairros pauperizados em comparação a distritos arborizados na mesma região geográfica.
                        </p>
                    </div>

                    <!-- Impacto 3 -->
                    <div class="bg-slate-50 p-8 rounded-2xl border border-slate-200 transition-all-custom card-hover">
                        <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-700 mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path></svg>
                        </div>
                        <h3 class="font-display font-bold text-lg text-slate-900 mb-3">Vulnerabilidade de Infraestrutura</h3>
                        <p class="text-sm text-brand-charcoal leading-relaxed">
                            Estas áreas carecem de saneamento adequado e de bacias de contenção eficientes. Isso as coloca na linha de frente dos desastres climáticos (inundações e deslizamentos de terra).
                        </p>
                    </div>

                    <!-- Impacto 4 -->
                    <div class="bg-slate-50 p-8 rounded-2xl border border-slate-200 transition-all-custom card-hover">
                        <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <h3 class="font-display font-bold text-lg text-slate-900 mb-3">Invisibilidade Estatística</h3>
                        <p class="text-sm text-brand-charcoal leading-relaxed">
                            A falta de estações públicas de monitoramento ambiental nestas periferias mascara os níveis de contaminação e impede a proposição de políticas assertivas de mitigação.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- 3. A SOLUÇÃO (Nosso Projeto) -->
    <section id="solucao" class="py-20 lg:py-28 bg-brand-slate text-white relative">
        <div class="absolute inset-0 z-0 pointer-events-none opacity-10">
            <!-- Padrão Geométrico de Fundo -->
            <div class="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                <span class="text-sm font-bold text-brand-emerald uppercase tracking-wider block mb-2">A Tecnologia e o Planejamento Sócio-Urbano</span>
                <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                    Plataforma ECO-INTEGRA: <br class="hidden sm:inline" />
                    Sinergia Humana & Territorial
                </h2>
                <div class="h-1.5 w-24 bg-brand-orange mx-auto mt-6 rounded-full"></div>
                <p class="text-slate-300 mt-6 text-base sm:text-lg">
                    Desenvolvemos um ecossistema holístico que une hardware IoT acessível, ecodesign de mitigação e formação produtiva local. Um modelo que transforma o risco de passivo social em ativo reputacional ESG.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <!-- Pilar 1 -->
                <div class="bg-slate-800/60 p-8 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-brand-emerald/15 text-brand-emerald flex items-center justify-center mb-6">
                            <span class="font-display font-extrabold text-xl">01</span>
                        </div>
                        <h3 class="font-display font-bold text-xl mb-4">Sensores IoT & Monitoramento Comunitário</h3>
                        <p class="text-sm text-slate-300 leading-relaxed mb-6">
                            Estações simplificadas de monitoramento em tempo real (Qualidade do Ar, Material Particulado PM2.5/PM10, NOx, Ruídos e Temperatura) são instaladas em escolas, creches e moradias periféricas. Os dados são abertos e geridos conjuntamente, gerando relatórios de transparência inovadores.
                        </p>
                    </div>
                    <div class="text-xs text-brand-emerald font-semibold flex items-center gap-1">
                        🔬 Testado cientificamente • Protocolo de Transparência
                    </div>
                </div>

                <!-- Pilar 2 -->
                <div class="bg-slate-800/60 p-8 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-brand-orange/15 text-brand-orange flex items-center justify-center mb-6">
                            <span class="font-display font-extrabold text-xl">02</span>
                        </div>
                        <h3 class="font-display font-bold text-xl mb-4">Cinturões Verdes de Absorção e Lazer</h3>
                        <p class="text-sm text-slate-300 leading-relaxed mb-6">
                            Implantação de florestas de microbolso urbanas utilizando espécies arbóreas nativas hiperacumuladoras de poluentes, criando barreiras físicas ecológicas de dispersão. Esses cinturões amortecem o calor e oferecem espaços arborizados para o convívio saudável da comunidade de entorno.
                        </p>
                    </div>
                    <div class="text-xs text-brand-orange font-semibold flex items-center gap-1">
                        🌳 Compensação Voluntária • Sequestro de Carbono Ativo
                    </div>
                </div>

                <!-- Pilar 3 -->
                <div class="bg-slate-800/60 p-8 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-6">
                            <span class="font-display font-extrabold text-xl">03</span>
                        </div>
                        <h3 class="font-display font-bold text-xl mb-4">Inclusão em Economia Circular</h3>
                        <p class="text-sm text-slate-300 leading-relaxed mb-6">
                            Parceria com cooperativas de catadores locais para reciclagem de subprodutos de escória e metais industriais secundários. Criamos a "Academia de Líderes Verdes" para capacitar jovens em manutenção de sensores e agricultura ecourbana, tornando-os guardiões ambientais do projeto.
                        </p>
                    </div>
                    <div class="text-xs text-blue-400 font-semibold flex items-center gap-1">
                        💼 Inclusão Produtiva • Empoderamento Econômico Local
                    </div>
                </div>

            </div>

            <!-- ROI Introdutório de Impacto -->
            <div class="mt-16 bg-gradient-to-r from-brand-orange/20 to-brand-green/10 border border-slate-700 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between">
                <div class="mb-4 sm:mb-0">
                    <h4 class="font-display font-bold text-lg mb-1">Deseja simular o impacto financeiro para a ArcelorMittal?</h4>
                    <p class="text-slate-300 text-xs">A nossa solução apresenta um retorno mensurável em retenção e valor do capital sob escrutínio ESG.</p>
                </div>
                <a href="#custo-inacao" class="bg-brand-orange hover:bg-orange-500 text-white font-semibold text-xs py-3 px-6 rounded-lg transition-all">
                    Simular Custo da Inação
                </a>
            </div>
        </div>
    </section>

    <!-- 4. ALINHAMENTO COM AS ODS (Acordeão e Cards Interativos) -->
    <section id="ods" class="py-20 lg:py-28 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <span class="text-sm font-bold text-brand-green uppercase tracking-wider block mb-2">Alinhamento Global</span>
                <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-brand-slate tracking-tight">
                    Conexão Crítica com as ODS da ONU
                </h2>
                <p class="text-brand-charcoal mt-4 text-base">
                    Nosso projeto cumpre diretamente com as exigências dos Objetivos de Desenvolvimento Sustentável que guiam a Agenda 2030, promovendo um impacto socioespacial rastreável de ponta a ponta.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <!-- Coluna Interativa: Acordeão de ODS -->
                <div class="lg:col-span-12 max-w-4xl mx-auto w-full">
                    <div class="space-y-4">
                        
                        <!-- ODS 10 -->
                        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm shadow-slate-100 transition-all duration-300">
                            <button onclick="toggleOds('ods-10')" class="w-full flex items-center justify-between p-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-emerald text-left">
                                <div class="flex items-center space-x-4">
                                    <div class="w-14 h-14 bg-[#E5243B] text-white rounded-xl flex flex-col items-center justify-center font-bold text-xl shadow-inner shrink-0 leading-none">
                                        <span class="text-[10px] opacity-75 uppercase">ODS</span>
                                        <span>10</span>
                                    </div>
                                    <div>
                                        <h3 class="font-display font-bold text-slate-900 text-lg">Redução das Desigualdades</h3>
                                        <p class="text-xs text-brand-charcoal font-medium mt-0.5">Equidade ambiental e empoderamento de minorias georreferenciadas</p>
                                    </div>
                                </div>
                                <span id="icon-ods-10" class="text-brand-slate text-xl font-bold font-mono transition-transform duration-300 rotate-180">−</span>
                            </button>
                            <div id="body-ods-10" class="px-6 pb-6 pt-2 block transition-all duration-300">
                                <div class="border-t border-slate-100 pt-4 space-y-3">
                                    <p class="text-sm text-brand-charcoal">
                                        O Racismo Ambiental é a maior expressão de opressão estrutural urbana. Ao instalar a rede de monitoramento e capacitar os líderes comunitários, transferimos poder técnico diretamente às mãos da população vulnerável, neutralizando a assimetria informativa frente ao poder corporativo e público.
                                    </p>
                                    <p class="text-xs text-brand-emerald font-semibold">
                                        🎯 Meta de Negócio: Demonstra ao mercado europeu como a ArcelorMittal está desarmando tensões e mitigando o risco social.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- ODS 11 -->
                        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm shadow-slate-100 transition-all duration-300">
                            <button onclick="toggleOds('ods-11')" class="w-full flex items-center justify-between p-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-emerald text-left">
                                <div class="flex items-center space-x-4">
                                    <div class="w-14 h-14 bg-[#FD9D24] text-white rounded-xl flex flex-col items-center justify-center font-bold text-xl shadow-inner shrink-0 leading-none">
                                        <span class="text-[10px] opacity-75 uppercase">ODS</span>
                                        <span>11</span>
                                    </div>
                                    <div>
                                        <h3 class="font-display font-bold text-slate-900 text-lg">Cidades e Comunidades Sustentáveis</h3>
                                        <p class="text-xs text-brand-charcoal font-medium mt-0.5">Sistemas de resiliência e áreas verdes produtivas</p>
                                    </div>
                                </div>
                                <span id="icon-ods-11" class="text-brand-slate text-xl font-bold font-mono transition-transform duration-300">+</span>
                            </button>
                            <div id="body-ods-11" class="px-6 pb-6 pt-2 hidden transition-all duration-300">
                                <div class="border-t border-slate-100 pt-4 space-y-3">
                                    <p class="text-sm text-brand-charcoal">
                                        Ao redesenhar polígonos urbanos degradados com microflorestas bioativas em territórios no entorno da usina, o projeto traz regeneração direta. Combate o efeito do estresse térmico, melhora a permeabilidade e reduz poeiras em suspensão de forma perene.
                                    </p>
                                    <p class="text-xs text-brand-orange font-semibold">
                                        🎯 Meta de Negócio: Alinha-se perfeitamente com a Diretriz de Licenciamento Social de Operação da ArcelorMittal e com o desenvolvimento urbano compartilhado para o amanhã.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- ODS 13 -->
                        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm shadow-slate-100 transition-all duration-300">
                            <button onclick="toggleOds('ods-13')" class="w-full flex items-center justify-between p-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-emerald text-left">
                                <div class="flex items-center space-x-4">
                                    <div class="w-14 h-14 bg-[#3F7E44] text-white rounded-xl flex flex-col items-center justify-center font-bold text-xl shadow-inner shrink-0 leading-none">
                                        <span class="text-[10px] opacity-75 uppercase">ODS</span>
                                        <span>13</span>
                                    </div>
                                    <div>
                                        <h3 class="font-display font-bold text-slate-900 text-lg">Ação Contra a Mudança Global do Clima</h3>
                                        <p class="text-xs text-brand-charcoal font-medium mt-0.5">Adaptação urbana ativa e regulação de microclima local</p>
                                    </div>
                                </div>
                                <span id="icon-ods-13" class="text-brand-slate text-xl font-bold font-mono transition-transform duration-300">+</span>
                            </button>
                            <div id="body-ods-13" class="px-6 pb-6 pt-2 hidden transition-all duration-300">
                                <div class="border-t border-slate-100 pt-4 space-y-3">
                                    <p class="text-sm text-brand-charcoal">
                                        Os extremos climáticos (estresse térmico severo, secas prolongadas) afetam primeiramente as calçadas sem árvores e moradias sem isolamento térmico das periferias. Os cinturões verdes urbanos atuam como mitigadores térmicos de ponta, sequestrando CO₂ enquanto salvaguardam vidas vulneráveis de forma concreta.
                                    </p>
                                    <p class="text-xs text-blue-600 font-semibold">
                                        🎯 Meta de Negócio: Contribui com metas diretas de escopo agroflorestal corporativo para neutralização de compensações de emissões de carbono secundárias.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. O CUSTO DA INAÇÃO (Simulador Corporativo / Alvo para Finanças) -->
    <section id="custo-inacao" class="py-20 lg:py-28 bg-white border-y border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-16">
                <span class="text-sm font-bold text-brand-orange uppercase tracking-wider block mb-2">Decisão Estratégica & ROI</span>
                <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-brand-slate tracking-tight">
                    O Verdadeiro Custo da Inação
                </h2>
                <p class="text-brand-charcoal mt-4 text-base">
                    As maiores gestoras de capital do planeta punem a inércia social. Deixar de mitigar preventivamente tensões comunitárias e o impacto da degradação nos entornos industriais custa infinitamente mais caro do que investir no projeto.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                <!-- Coluna Simulador de Cenários -->
                <div class="lg:col-span-7 bg-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-8">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-5">
                        <h3 class="font-display font-bold text-lg text-slate-200 flex items-center gap-2">
                            <span>🎮</span> Simulador de Impacto Social / Riscos ESG
                        </h3>
                        <span class="text-[10px] text-brand-orange tracking-widest font-bold uppercase block">Versão Beta</span>
                    </div>

                    <!-- Slider de Escopo de População sob Risco -->
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            População Residente Estimada no Entorno das Usinas: 
                            <span id="pop-value" class="text-brand-orange text-sm font-mono font-bold ml-1">5.000 pessoas</span>
                        </label>
                        <input id="pop-slider" type="range" min="1000" max="50000" step="1000" value="5000" class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-orange" oninput="calculateRisks()">
                    </div>

                    <!-- Slider de Distância de Buffer Community -->
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Nível Médio de Distância do Buffer de Contenção Verde (em metros): 
                            <span id="buffer-value" class="text-brand-green text-sm font-mono font-bold ml-1">50 metros (Insuficiente)</span>
                        </label>
                        <input id="buffer-slider" type="range" min="10" max="500" step="10" value="50" class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-green" oninput="calculateRisks()">
                    </div>

                    <!-- Grid de Custos em Tempo Real -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div class="bg-slate-800/50 p-5 rounded-2xl border border-slate-850">
                            <span class="text-[10px] uppercase font-bold text-slate-400">Risco Legal e de Multas Judiciais</span>
                            <div id="cost-legal" class="font-display text-2xl font-bold text-brand-orange mt-1">R$ 150.000</div>
                            <p class="text-[10px] text-slate-400 mt-1">Ações coletivas, TACs ambientais e notificações do Ministério Público.</p>
                        </div>

                        <div class="bg-slate-800/50 p-5 rounded-2xl border border-slate-850">
                            <span class="text-[10px] uppercase font-bold text-slate-400">Custo Total de Inação ESG Estimado</span>
                            <div id="cost-total" class="font-display text-2xl font-bold text-red-500 mt-1">R$ 490.000</div>
                            <p class="text-[10px] text-slate-400 mt-1">Soma de penalidades de licença, multas e custos associados a atrito público.</p>
                        </div>
                    </div>

                    <div class="text-[11px] text-slate-400 italic bg-slate-850 p-4 rounded-xl border border-slate-800">
                        *Os cálculos baseiam-se em valores padrão de penalidades médias do setor e em dados históricos de acordos do Ministério Público para mitigação de impacto no solo e atmosfera.
                    </div>
                </div>

                <!-- Coluna Opinião de Mercado e Análise -->
                <div class="lg:col-span-5 space-y-6">
                    <h3 class="font-display font-bold text-2xl text-slate-900 leading-tight">
                        Por que isso afeta o valor de mercado e a reputação da ArcelorMittal?
                    </h3>

                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-1 font-bold">1</div>
                            <div>
                                <h4 class="font-semibold text-slate-900 text-sm">Custo Regulatório Crescente (Leis Climáticas)</h4>
                                <p class="text-xs text-brand-charcoal mt-1">Com as novas regulamentações nacionais de transição ecológica justa, multas por desconformidade com buffers sociais e poluição secundária urbana tendem a atingir recordes históricos.</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3">
                            <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-1 font-bold">2</div>
                            <div>
                                <h4 class="font-semibold text-slate-900 text-sm">Penalizações e Multas em Linhas de Crédito ESG</h4>
                                <p class="text-xs text-brand-charcoal mt-1">Bancos internacionais impõem taxas de juros superiores (até 2.5% a mais) para empresas siderúrgicas que possuem pendências ou conflitos locais e vulnerabilidade comunitária em seus entornos.</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3">
                            <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-1 font-bold">3</div>
                            <div>
                                <h4 class="font-semibold text-slate-900 text-sm">Deterioração da Reputação de Marca (Marketshare Global)</h4>
                                <p class="text-xs text-brand-charcoal mt-1">Grandes construtoras norte-americanas e europeias exigem selo "Green Steel" com prova audível de inclusão e respeito de comunidade. Não agir impede o fechamento de transações comerciais altamente lucrativas.</p>
                            </div>
                        </div>
                    </div>

                    <div class="pt-6">
                        <a href="#arcelormittal" class="inline-flex items-center font-bold text-brand-orange hover:text-brand-slate transition-all text-sm gap-2">
                            <span>A Solução Sinergética para ArcelorMittal</span>
                            <span>➔</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- 6. POR QUE A ARCELORMITTAL? (O Match Perfeito) -->
    <section id="arcelormittal" class="py-20 lg:py-28 bg-[#fafaf9] relative overflow-hidden">
        <!-- Detalhes ArcelorMittal Colors -->
        <span class="absolute top-0 left-0 w-2 h-full bg-brand-orange"></span>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                
                <div class="lg:col-span-6 mb-12 lg:mb-0">
                    <span class="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-2">Parceria Estratégica Inovadora</span>
                    <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-slate leading-tight mb-8">
                        Liderança Global para o Futuro do Aço Sustentável
                    </h2>

                    <p class="text-brand-charcoal text-base mb-6">
                        A canônica promessa da <strong>ArcelorMittal</strong> baseia-se em produzir o <em>"Aço para o Amanhã"</em>, liderando a vanguarda industrial sustentável e o advento da descarbonização. No entanto, o aço verdadeiramente descarbonizado requer ser humano e comunitário.
                    </p>

                    <p class="text-brand-charcoal text-base mb-6">
                        Ao patrocinar e co-construir o projeto <strong>ECO-INTEGRA</strong> conosco, a ArcelorMittal adquire um laboratório real, de ponta, focado na transição energética justa. Trata-se da primeira plataforma digital que combina Big Data comunitário (sensores ambientais IoT de baixo custo e alta precisão) à reparação socio-ecológica territorial.
                    </p>

                    <div class="space-y-4">
                        <div class="flex items-center space-x-3">
                            <span class="text-brand-orange text-lg">✔</span>
                            <span class="text-sm font-semibold text-brand-slate">Alinhamento Perfeito com as metas globais de Liderança ESG da ArcelorMittal de 2030.</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-brand-orange text-lg">✔</span>
                            <span class="text-sm font-semibold text-brand-slate">Relatórios de dados ambientais de Entorno rastreáveis por Blockchain comunitário.</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-brand-orange text-lg">✔</span>
                            <span class="text-sm font-semibold text-brand-slate">Mitigação de 100% dos riscos reputacionais de zoneamento industrial adverso.</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-6">
                    <div class="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md relative">
                        <!-- Símbolo de Destaque -->
                        <div class="absolute -top-6 right-6 w-12 h-12 bg-brand-orange text-white font-extrabold flex items-center justify-center rounded-2xl shadow-lg ring-4 ring-orange-50 font-display">
                            AM
                        </div>

                        <h3 class="font-display font-bold text-2xl text-slate-900 mb-6">Proposta Comercial & Investimento Estimado</h3>
                        
                        <div class="space-y-6">
                            <div class="flex justify-between border-b border-slate-100 pb-3">
                                <span class="text-sm text-brand-charcoal">Fase 1: Estudo Territorial + Instalação de Sensores IoT</span>
                                <span class="text-sm font-bold text-slate-900">R$ 250.000</span>
                            </div>
                            <div class="flex justify-between border-b border-slate-100 pb-3">
                                <span class="text-sm text-brand-charcoal">Fase 2: Ecodesign, Cinturões Verdes & Parques de Amortecimento</span>
                                <span class="text-sm font-bold text-slate-900">R$ 480.000</span>
                            </div>
                            <div class="flex justify-between border-b border-slate-100 pb-3">
                                <span class="text-sm text-brand-charcoal">Fase 3: Capacitação da Academia Verde e Inclusão Corporativa</span>
                                <span class="text-sm font-bold text-slate-900">R$ 180.000</span>
                            </div>
                            <div class="flex justify-between font-bold text-lg text-brand-slate pt-2 border-t border-slate-250">
                                <span>Investimento Piloto Total</span>
                                <span class="text-brand-green">R$ 910.000</span>
                            </div>
                        </div>

                        <p class="text-xs text-brand-charcoal mt-6 leading-relaxed">
                            Como investidora fundadora de vanguarda, a ArcelorMittal deterá assento prioritário no Comitê Consultivo Tecnológico e a exclusividade nacional para a veiculação publicitária da solução, além da geração exclusiva de créditos de carbono sociais de impacto regional.
                        </p>

                        <div class="mt-8">
                            <button onclick="alert('Obrigado pelo seu interesse! Esta é uma demonstração de Pitch Deck interativo corporativo do projeto de mitigação sob as diretrizes ESG e combate ao Racismo Ambiental criado para a ArcelorMittal.')" class="w-full text-center bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:-translate-y-0.5 shadow-md">
                                Seja um Investidor Pioneiro
                            </button>
                            <span class="block text-center text-[10px] text-brand-charcoal mt-3 uppercase tracking-wider font-semibold">Abra novos horizontes para o desenvolvimento sustentável</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- 7. FOOTER DA COMPANHIA -->
    <footer class="bg-brand-slate text-white py-16 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
                
                <!-- Coluna Logo & Resumo -->
                <div class="md:col-span-2 space-y-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 rounded bg-gradient-to-tr from-brand-green to-brand-emerald flex items-center justify-center text-white font-bold text-sm">
                            E
                        </div>
                        <span class="font-display font-bold text-white tracking-widest text-md uppercase">Plataforma ECO-INTEGRA</span>
                    </div>
                    <p class="text-sm text-slate-400 max-w-sm">
                        Proposta Tecnológica e Coletiva para Mitigação Preventiva de Impactos Socioambientais e Reparação Ativa do Racismo Ambiental nas cadeias industriais sustentáveis.
                    </p>
                    <p class="text-xs text-slate-500">
                        © 2026 Plataforma ECO-INTEGRA • Todos os direitos reservados.
                    </p>
                </div>

                <!-- Links Rápidos -->
                <div>
                    <h4 class="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Navegação</h4>
                    <ul class="space-y-2 text-sm text-slate-400">
                        <li><a href="#problema" class="hover:text-brand-orange transition">O Diagnóstico</a></li>
                        <li><a href="#solucao" class="hover:text-brand-orange transition">A Plataforma</a></li>
                        <li><a href="#ods" class="hover:text-brand-orange transition">Metas Globais ODS</a></li>
                        <li><a href="#custo-inacao" class="hover:text-brand-orange transition">Análise de ROI</a></li>
                        <li><a href="#arcelormittal" class="hover:text-brand-orange transition">Investimento</a></li>
                    </ul>
                </div>

                <!-- Contatos & Redes Sociais -->
                <div>
                    <h4 class="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Contato e Presença</h4>
                    <ul class="space-y-2 text-sm text-slate-400">
                        <li>📧 corporativo@ecointegralabs.org</li>
                        <li>📞 +55 (11) 3255-0892</li>
                        <li>🏢 Av. Paulista, 1200 - Conjunto 82, São Paulo, Brasil</li>
                    </ul>
                    <div class="flex space-x-3 mt-4">
                        <span class="text-xs text-brand-orange font-bold uppercase hover:underline cursor-pointer">LinkedIn</span>
                        <span class="text-slate-500">•</span>
                        <span class="text-xs text-brand-orange font-bold uppercase hover:underline cursor-pointer">Medium Climático</span>
                        <span class="text-slate-500">•</span>
                        <span class="text-xs text-brand-green font-bold uppercase hover:underline cursor-pointer">GitHub ODS</span>
                    </div>
                </div>

            </div>
            
            <div class="border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>Termos de Uso e Políticas de Privacidade formulados com base nas melhores regras corporativas e LGPD de Proteção de Dados.</p>
                <div>
                    <a href="#" class="hover:underline hover:text-white transition">Segurança do Portal</a> | <a href="#" class="hover:underline hover:text-white transition">Canal ESG da ArcelorMittal</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- INTERACTIVITY JAVASCRIPT -->
    <script>
        // ODS EXPANDABLE ACCORDION FUNCTION
        function toggleOds(id) {
            const listIds = ['ods-10', 'ods-11', 'ods-13'];
            
            listIds.forEach(currId => {
                const b = document.getElementById('body-' + currId);
                const icon = document.getElementById('icon-' + currId);
                
                if (currId === id) {
                    if (b.classList.contains('hidden')) {
                        b.classList.remove('hidden');
                        b.classList.add('block');
                        icon.textContent = '−';
                        icon.classList.add('rotate-180');
                    } else {
                        b.classList.remove('block');
                        b.classList.add('hidden');
                        icon.textContent = '+';
                        icon.classList.remove('rotate-185');
                    }
                } else {
                    b.classList.remove('block');
                    b.classList.add('hidden');
                    icon.textContent = '+';
                    icon.classList.remove('rotate-180');
                }
            });
        }

        // REAL-TIME INVESTMENT & ESG RISK CALCULATOR
        function calculateRisks() {
            var popValueElement = document.getElementById('pop-value');
            var bufferValueElement = document.getElementById('buffer-value');
            
            var popSlider = document.getElementById('pop-slider');
            var bufferSlider = document.getElementById('buffer-slider');
            
            var costLegalElement = document.getElementById('cost-legal');
            var costTotalElement = document.getElementById('cost-total');
            
            var pop = parseInt(popSlider.value);
            var buffer = parseInt(bufferSlider.value);
            
            // Format population representation
            popValueElement.textContent = pop.toLocaleString('pt-BR') + ' pessoas';
            
            // Calculate buffer text label & color
            var ratingText = "";
            if (buffer < 100) {
                ratingText = buffer + " metros (Insuficiente)";
                bufferValueElement.className = "text-brand-orange text-sm font-mono font-bold ml-1";
            } else if (buffer < 250) {
                ratingText = buffer + " metros (Moderado)";
                bufferValueElement.className = "text-yellow-600 text-sm font-mono font-bold ml-1";
            } else {
                ratingText = buffer + " metros (Excelente Retenção)";
                bufferValueElement.className = "text-brand-green text-sm font-mono font-bold ml-1";
            }
            bufferValueElement.textContent = ratingText;
            
            // Risk formulas
            // Legal risk proportional to population, inversely proportional to buffer width
            var legalRiskFactor = (pop * 15) * (300 / (buffer + 50));
            // Total risk adds environmental degradation penalties and reputational loss
            var globalEsgRisk = legalRiskFactor * 2.8 + (pop * 2.5);
            
            // Update UI
            costLegalElement.textContent = 'R$ ' + Math.round(legalRiskFactor).toLocaleString('pt-BR');
            costTotalElement.textContent = 'R$ ' + Math.round(globalEsgRisk).toLocaleString('pt-BR');
        }

        // Initial launch
        window.addEventListener('load', function() {
            calculateRisks();
        });
    </script>
</body>
</html>`;
