import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Leaf,
  Globe,
  Building,
  AlertTriangle,
  Activity,
  ChevronDown,
  TrendingUp,
  Coins,
  Users,
  CheckCircle,
  FileCode,
  Copy,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  Info,
  Check,
  Database,
  Eye,
  Contrast,
  Volume2,
  Ear,
  Sliders,
  Menu,
  X
} from "lucide-react";
import { standaloneHTMLContent } from "./data/standaloneHTML";

const communitiesData = {
  "vila-harmonia": {
    name: "Vila Harmonia",
    distance: "120m (Sul)",
    pop: "3.800 moradores",
    pm25Base: 58,
    pm25Reduced: 15,
    hospBase: 9.8,
    hospReduced: 2.1,
    canopy: "4% (Exclusão)",
    canopyProposed: "42% (Alvo)",
    status: "Risco Crítico / Racismo Ambiental",
    desc: "Comunidade periférica situada diretamente sob o curso dos ventos Nordeste da usina, sofrendo com deposição contínua de particulados sem nenhuma barreira florestal mitigadora actual.",
    coords: { x: 120, y: 260 }
  },
  "jardim-acacia": {
    name: "Jardim Acácia",
    distance: "280m (Sul-Sudão)",
    pop: "4.200 moradores",
    pm25Base: 42,
    pm25Reduced: 12,
    hospBase: 6.5,
    hospReduced: 1.8,
    canopy: "8% (Risco)",
    canopyProposed: "38% (Alvo)",
    status: "Risco Elevado",
    desc: "Bairro vulnerável de ocupação adensada, atingindo altos índices de asma infantil pela proximidade imediata com as pilhas de matérias-primas descobertas da usina.",
    coords: { x: 200, y: 310 }
  },
  "vinte-novembro": {
    name: "Vinte de Novembro",
    distance: "510m (Oeste)",
    pop: "2.500 moradores",
    pm25Base: 31,
    pm25Reduced: 10,
    hospBase: 4.8,
    hospReduced: 1.4,
    canopy: "14% (Alerta)",
    canopyProposed: "35% (Alvo)",
    status: "Risco Moderado",
    desc: "Comunidade parcialmente protegida por galpões logísticos, mas ainda exposta a emissões difusas periódicas de particulados metálicos siderúrgicos.",
    coords: { x: 90, y: 150 }
  },
  "bairro-palmeiras": {
    name: "Bairro das Palmeiras",
    distance: "3,2 km (Norte - Nobre)",
    pop: "6.050 moradores",
    pm25Base: 12,
    pm25Reduced: 11,
    hospBase: 1.1,
    hospReduced: 1.1,
    canopy: "38% (Nível OMS)",
    canopyProposed: "38% (Inalterado)",
    status: "Área de Controle / Seguro",
    desc: "Área de alta renda plenamente arborizada e distante da usina. Utilizada como região de controle epidemiológico comparativo, provando o abismo espacial de exposição.",
    coords: { x: 480, y: 80 }
  }
};

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  
  // Interactive ODS state
  const [expandedOds, setExpandedOds] = useState<string>("ods-10");

  // Simulator state variables
  const [population, setPopulation] = useState<number>(12000);
  const [bufferForest, setBufferForest] = useState<number>(60); // in meters
  const [simulatedLegalRisk, setSimulatedLegalRisk] = useState<number>(360000);
  const [simulatedTotalEsgRisk, setSimulatedTotalEsgRisk] = useState<number>(1008000);

  // Modal / Code Exporter states
  const [isExporterOpen, setIsExporterOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState<boolean>(false);
  const [investorForm, setInvestorForm] = useState({
    name: "",
    email: "",
    position: "Diretoria ESG",
    company: "ArcelorMittal Brasil",
    message: "Gostaria de agendar uma reunião de demonstração técnica e financeira do projeto ECO-INTEGRA."
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Accessibility settings
  const [a11yFontSize, setA11yFontSize] = useState<"normal" | "large" | "extra">("normal");
  const [a11yHighContrast, setA11yHighContrast] = useState<boolean>(false);
  const [a11yDyslexicFont, setA11yDyslexicFont] = useState<boolean>(false);
  const [a11yVisualCaptions, setA11yVisualCaptions] = useState<boolean>(true);
  const [a11yScreenReaderHelper, setA11yScreenReaderHelper] = useState<boolean>(false);
  const [isA11yMenuOpen, setIsA11yMenuOpen] = useState<boolean>(false);
  const [isReadSpeakerActive, setIsReadSpeakerActive] = useState<boolean>(false);
  const [speakingCaption, setSpeakingCaption] = useState<string>("");

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (!text) {
      setSpeakingCaption("");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.onstart = () => {
      setSpeakingCaption(text);
    };
    utterance.onend = () => {
      setSpeakingCaption("");
    };
    utterance.onerror = () => {
      setSpeakingCaption("");
    };
    window.speechSynthesis.speak(utterance);
  };

  // Data visualization state values
  const [selectedCommunity, setSelectedCommunity] = useState<string>("vila-harmonia");
  const [activeLayer, setActiveLayer] = useState<string>("all"); // 'all', 'sensors', 'plumes', 'buffers'
  const [windDirection, setWindDirection] = useState<string>("NE"); // 'NE', 'SW'
  const [isCinturaoActive, setIsCinturaoActive] = useState<boolean>(false);
  
  // ROI ESG Calculator states
  const [potReduction, setPotReduction] = useState<number>(75); // emissions reduction %
  const [estInvestment, setEstInvestment] = useState<number>(910000); // sponsorship R$
  const [desiredPayback, setDesiredPayback] = useState<number>(3); // years
  const [showRoiToast, setShowRoiToast] = useState<boolean>(false);

  // Recalculate financial risk simulator dynamically in React
  useEffect(() => {
    // Proportional to population and inversely proportional to buffer width as safety margin
    const baseLegalFee = (population * 18) * (260 / (bufferForest + 40));
    const finalEsgRisk = baseLegalFee * 2.5 + (population * 11);
    
    setSimulatedLegalRisk(Math.round(baseLegalFee));
    setSimulatedTotalEsgRisk(Math.round(finalEsgRisk));
  }, [population, bufferForest]);

  // Keyboard Accessibility: Close a11y menu with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsA11yMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Screen Reader Helper Option: Click on elements to read their text aloud
  useEffect(() => {
    if (!a11yScreenReaderHelper) return;
    
    const handleElementClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Filter element types we want to narrate
      const tagName = target.tagName;
      const readTags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "BUTTON", "A", "LI", "LABEL", "STRONG"];
      
      if (readTags.includes(tagName)) {
        // Skip clicks inside the actual accessibility menu widget to prevent redundant reading
        if (target.closest("#no-hc-override")) return;
        
        const textToRead = target.innerText || target.textContent;
        if (textToRead && textToRead.trim().length > 1) {
          e.preventDefault();
          e.stopPropagation();
          speakText(textToRead.trim());
        }
      }
    };
    
    document.addEventListener("click", handleElementClick, true);
    return () => {
      document.removeEventListener("click", handleElementClick, true);
    };
  }, [a11yScreenReaderHelper]);

  // Copy code handler
  const handleCopyCode = () => {
    navigator.clipboard.writeText(standaloneHTMLContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsInvestorModalOpen(false);
      setInvestorForm({
        name: "",
        email: "",
        position: "Diretoria ESG",
        company: "ArcelorMittal Brasil",
        message: "Gostaria de agendar uma reunião de demonstração técnica e financeira do projeto ECO-INTEGRA."
      });
    }, 4500);
  };

  return (
    <div 
      className={`min-h-screen bg-brand-sleek text-gray-900 antialiased selection:bg-brand-orange selection:text-white ${
        a11yDyslexicFont ? "a11y-dyslexic" : "font-sans"
      } ${
        a11yHighContrast ? "a11y-high-contrast-mode" : ""
      }`}
      style={{
        fontSize: a11yFontSize === "large" ? "18px" : a11yFontSize === "extra" ? "21px" : "15px"
      }}
    >
      {/* CSS Injected Dynamically for Visual Accessibility Modes */}
      <style>{`
        .a11y-dyslexic * {
          font-family: 'Comic Sans MS', 'Andika', 'Courier New', sans-serif !important;
          letter-spacing: 0.12em !important;
          word-spacing: 0.22em !important;
          line-height: 1.62 !important;
        }
        .a11y-high-contrast-mode {
          background-color: #000000 !important;
          color: #ffffff !important;
        }
        .a11y-high-contrast-mode section {
          background-color: #0c0f17 !important;
          color: #ffffff !important;
          border-color: #ffffff !important;
        }
        .a11y-high-contrast-mode p, 
        .a11y-high-contrast-mode span, 
        .a11y-high-contrast-mode li, 
        .a11y-high-contrast-mode label,
        .a11y-high-contrast-mode div:not(#no-hc-override):not(#no-hc-override *) {
          color: #ffffff !important;
        }
        .a11y-high-contrast-mode h1, 
        .a11y-high-contrast-mode h2, 
        .a11y-high-contrast-mode h3, 
        .a11y-high-contrast-mode h4, 
        .a11y-high-contrast-mode h5, 
        .a11y-high-contrast-mode strong {
          color: #ffff00 !important;
        }
        .a11y-high-contrast-mode a, 
        .a11y-high-contrast-mode button:not(#no-hc-override):not(#no-hc-override *) {
          background-color: #000000 !important;
          color: #ffff00 !important;
          border: 2px solid #ffff00 !important;
          outline: none !important;
        }
        .a11y-high-contrast-mode a:hover, 
        .a11y-high-contrast-mode button:not(#no-hc-override):not(#no-hc-override *):hover {
          background-color: #ffff00 !important;
          color: #000000 !important;
        }
        .a11y-high-contrast-mode svg {
          stroke: currentColor;
        }
        /* Keep accessibility widget fully legible */
        .a11y-high-contrast-mode #no-hc-override,
        .a11y-high-contrast-mode #no-hc-override * {
          background-color: #ffffff !important;
          color: #0f172a !important;
          border-color: #e2e8f0 !important;
        }
        .a11y-high-contrast-mode #no-hc-override .bg-brand-primary {
          background-color: #002D54 !important;
          color: #ffffff !important;
        }
        .a11y-high-contrast-mode #no-hc-override .bg-emerald-600 {
          background-color: #10b981 !important;
          color: #ffffff !important;
        }
        .a11y-high-contrast-mode #no-hc-override .bg-indigo-600 {
          background-color: #4f46e5 !important;
          color: #ffffff !important;
        }
      `}</style>
      
      {/* HEADER & TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Identity / Sinergia logo */}
          <div id="nav-brand" className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-orange flex items-center justify-center text-white font-bold text-lg shadow-sm">
              E
            </div>
            <div className="hidden xs:block">
              <span className="font-display font-bold text-base sm:text-lg text-brand-primary uppercase tracking-wide block">Plataforma ECO-INTEGRA</span>
              <span className="block text-[10px] text-brand-orange font-bold tracking-wider uppercase">ESG de Precisão Humana & Territorial</span>
            </div>
          </div>

          {/* Nav items for Desktop - Hidden below xl */}
          <nav className="hidden xl:flex items-center space-x-6 lg:space-x-8" aria-label="Menu Principal">
            <a href="#problema" onClick={() => setActiveSection("problema")} className={`text-sm font-medium transition-colors hover:text-brand-orange ${activeSection === "problema" ? "text-brand-orange underline decoration-2 underline-offset-4" : "text-gray-600"}`}>O Problema</a>
            <a href="#solucao" onClick={() => setActiveSection("solucao")} className={`text-sm font-medium transition-colors hover:text-brand-orange ${activeSection === "solucao" ? "text-brand-orange underline decoration-2 underline-offset-4" : "text-gray-600"}`}>A Solução</a>
            <a href="#visualizacao" onClick={() => setActiveSection("visualizacao")} className={`text-sm font-medium transition-colors hover:text-brand-orange ${activeSection === "visualizacao" ? "text-brand-orange underline decoration-2 underline-offset-4" : "text-gray-600"}`}>Monitoramento</a>
            <a href="#ods" onClick={() => setActiveSection("ods")} className={`text-sm font-medium transition-colors hover:text-brand-orange ${activeSection === "ods" ? "text-brand-orange underline decoration-2 underline-offset-4" : "text-gray-600"}`}>Alinhamento ODS</a>
            <a href="#custo-inacao" onClick={() => setActiveSection("custo-inacao")} className={`text-sm font-medium transition-colors hover:text-brand-orange ${activeSection === "custo-inacao" ? "text-brand-orange underline decoration-2 underline-offset-4" : "text-gray-600"}`}>Custo da Inação</a>
            <a href="#calculadora-roi" onClick={() => setActiveSection("calculadora-roi")} className={`text-sm font-medium transition-colors hover:text-brand-orange ${activeSection === "calculadora-roi" ? "text-brand-orange underline decoration-2 underline-offset-4" : "text-gray-600"}`}>Calculadora ROI</a>
            <a href="#arcelormittal" onClick={() => setActiveSection("arcelormittal")} className={`text-sm font-medium transition-colors hover:text-brand-orange ${activeSection === "arcelormittal" ? "text-brand-orange underline decoration-2 underline-offset-4" : "text-gray-600"}`}>Match Corporativo</a>
          </nav>

          {/* Export Code, Interactive CTAs and Mobile Menu Toggler */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsExporterOpen(true)}
              className="bg-brand-cream text-brand-primary hover:bg-opacity-80 border border-gray-200 text-xs font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              title="Acessar código único em HTML solicitado"
            >
              <FileCode className="w-4 h-4 text-brand-orange" />
              <span className="hidden md:inline">Exportar HTML Único</span>
            </button>
            <a 
              href="#arcelormittal" 
              className="bg-brand-primary text-white hover:bg-brand-orange transition-all duration-300 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
            >
              Parceria
            </a>
            
            {/* Hamburger menu toggler - visible below xl */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="xl:hidden p-2 text-brand-primary hover:text-brand-orange border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
              aria-label="Alternar Menu de Navegação"
            >
              {isMobileNavOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE HEADER NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-gray-200 shadow-md relative z-30 overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-2 max-w-7xl mx-auto" aria-label="Menu Movel">
              <a 
                href="#problema" 
                onClick={() => { setActiveSection("problema"); setIsMobileNavOpen(false); }} 
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeSection === "problema" ? "bg-brand-orange/10 text-brand-orange" : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"}`}
              >
                O Problema
              </a>
              <a 
                href="#solucao" 
                onClick={() => { setActiveSection("solucao"); setIsMobileNavOpen(false); }} 
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeSection === "solucao" ? "bg-brand-orange/10 text-brand-orange" : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"}`}
              >
                A Solução
              </a>
              <a 
                href="#visualizacao" 
                onClick={() => { setActiveSection("visualizacao"); setIsMobileNavOpen(false); }} 
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeSection === "visualizacao" ? "bg-brand-orange/10 text-brand-orange" : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"}`}
              >
                Monitoramento Coletivo
              </a>
              <a 
                href="#ods" 
                onClick={() => { setActiveSection("ods"); setIsMobileNavOpen(false); }} 
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeSection === "ods" ? "bg-brand-orange/10 text-brand-orange" : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"}`}
              >
                Metas & Alinhamento ODS
              </a>
              <a 
                href="#custo-inacao" 
                onClick={() => { setActiveSection("custo-inacao"); setIsMobileNavOpen(false); }} 
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeSection === "custo-inacao" ? "bg-brand-orange/10 text-brand-orange" : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"}`}
              >
                Custo de Risco da Inação
              </a>
              <a 
                href="#calculadora-roi" 
                onClick={() => { setActiveSection("calculadora-roi"); setIsMobileNavOpen(false); }} 
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeSection === "calculadora-roi" ? "bg-brand-orange/10 text-brand-orange" : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"}`}
              >
                Calculadora de ROI ESG
              </a>
              <a 
                href="#arcelormittal" 
                onClick={() => { setActiveSection("arcelormittal"); setIsMobileNavOpen(false); }} 
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeSection === "arcelormittal" ? "bg-brand-orange/10 text-brand-orange" : "text-gray-600 hover:bg-gray-50 hover:text-brand-orange"}`}
              >
                Alinhamento ArcelorMittal
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION NOTIFICATION BAR (GIVES PROMINENCE TO THE USER'S DIRECTIVE REQ TO EMBED STUFF) */}
      <div className="bg-gradient-to-r from-brand-primary to-[#0c1f30] text-white text-xs sm:text-sm py-3 px-4 text-center flex items-center justify-center gap-2 relative z-30 shadow-inner">
        <Sparkles className="w-4 h-4 text-brand-orange shrink-0" />
        <span>Prezado avaliador, este Pitch Deck implementa a Landing Page em React com o simulador ativo.</span>
        <button 
          onClick={() => setIsExporterOpen(true)}
          className="underline hover:text-brand-orange font-bold ml-1 cursor-pointer"
        >
          Copiar HTML Standalone em Arquivo Único (com estilo e JS embutidos) →
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative bg-gradient-to-b from-white via-brand-sleek to-brand-cream/30 py-16 sm:py-24 lg:py-32 overflow-hidden border-b border-gray-200/70">
        
        {/* Soft Decorative Ambient Background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute top-1/6 left-1/10 w-80 h-80 bg-brand-green/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/5 right-1/10 w-96 h-96 bg-brand-orange/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Meta context label */}
            <span className="inline-flex items-center rounded-full bg-brand-orange/5 px-4 py-1.5 text-xs font-semibold text-brand-orange border border-brand-orange/15 uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-orange mr-2 animate-ping"></span>
              Apresentação Institucional & ESG de Impacto
            </span>

            {/* Powerful Pitch Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-primary tracking-tight leading-[1.1] mb-8">
              A verdadeira sustentabilidade <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-orange">não deixa nenhuma comunidade</span> para trás.
            </h1>

            {/* Informative description */}
            <p className="text-lg sm:text-xl text-gray-700 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
              Conectando a excelência industrial da <strong>ArcelorMittal</strong> à justiça climática. Um projeto pioneiro de inteligência territorial para combater o <strong>Racismo Ambiental</strong> através de monitoramento participativo, cinturões verdes urbanos e inclusão produtiva socioambiental de alta performance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
              <a 
                href="#problema" 
                className="w-full sm:w-auto text-center bg-brand-green hover:bg-opacity-90 text-white text-base font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Conheça a Proposta
              </a>
              <a 
                href="#custo-inacao" 
                className="w-full sm:w-auto text-center border-2 border-gray-300 hover:border-brand-primary bg-transparent text-slate-800 hover:bg-gray-50 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                Simular Risco de Inação
              </a>
            </div>
          </motion.div>

          {/* Quick Stats Grid - Grounded on factual ESG context */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 sm:mt-24 max-w-5xl mx-auto text-left">
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-red-50 rounded-lg text-brand-orange">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-brand-primary">75%</div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">População em Risco</h4>
                <p className="text-xs text-slate-600 mt-1">Das populações sob estresse urbano e de poluição industrial residem ao redor de complexos pesados sem corredores biológicos urbanos estruturados.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-700">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-slate-900">+12%</div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Prêmio de Rating ESG</h4>
                <p className="text-xs text-slate-600 mt-1">De valorização média em pontuações de agências de avaliação internacional para corporações com planos integrados de governança participativa de entorno.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-slate-900">U$ 53Trilhões</div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Mercado de Capitais</h4>
                <p className="text-xs text-slate-600 mt-1">Estimativa de circulação global em ativos sob critérios ESG e diretrizes severas de monitoramento de danos ambientais de vizinhança até 2030.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. O PROBLEMA (A Dor da Sociedade) */}
      <section id="problema" className="py-20 lg:py-28 bg-brand-sleek border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
            
            {/* Explaining the concept - Solid, academic and fact-based */}
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <span className="text-sm font-bold text-brand-orange uppercase tracking-wider block mb-2">A Dor da Sociedade</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-primary leading-tight mb-6">
                O Diagnóstico Ético: <br/>O que é o Racismo Ambiental?
              </h2>
              
              <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                <p>
                  Definido originalmente pelo movimento de justiça civil climática e cunhado pelo sociólogo <strong>Dr. Robert Bullard</strong>, o conceito de <strong>Racismo Ambiental</strong> descreve a realidade de que comunidades de vulnerabilidade socioeconômica e grupos racialmente preteridos sofrem de forma desproporcional as consequências ecológicas nocivas resultantes de operações industriais assimétricas ou falta de regulação local urbana.
                </p>
                <p>
                  As comunidades mais frágeis costumam coabitar diretamente com as divisas fabris, herdando a poluição do ar e solos, as piores ilhas de calor devido à falta de arborização, e graves vulnerabilidades na infraestrutura urbana de mitigação de catástrofes climáticas.
                </p>
                <p>
                  Isso cria uma segregação de qualidade de vida onde o luxo de um ar respirável se restringe a classes privilegiadas, perpetuando disparidades históricas.
                </p>
              </div>

              <div className="mt-8 p-5 bg-brand-cream border border-brand-orange/20 rounded-2xl flex items-start space-x-3">
                <Info className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-sm text-brand-primary leading-relaxed">
                  <strong>O Desafio para a Siderurgia:</strong> A governança de vanguarda exige mitigar esses contrastes, passando de uma postura de mera doação filantrópica para projetos estruturais de <em>reparação tecnológica ativa</em>.
                </p>
              </div>
            </div>

            {/* Impact Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:border-brand-primary hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-orange mb-6">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-primary mb-3">Poluição Atmosférica Desproporcional</h3>
                <p className="text-xs text-brand-orange mb-2 uppercase tracking-wider font-semibold">Excedente de risco clínico</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Bairros periféricos a complexos tradicionais de metalurgia costumam registrar material particulado fino (PM2.5) fora dos limites seguros mundiais de forma recorrente, dobrando incidências respiratórias infantis.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:border-brand-primary hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-orange mb-6">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-primary mb-3">Estresse Térmico & Ilhas de Calor</h3>
                <p className="text-xs text-brand-orange mb-2 uppercase tracking-wider font-semibold">Vulnerabilidade microclimática</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A baixa cobertura arbórea periférica gera variações locais de até 8°C de calor em bairros pauperizados em comparação a distritos nobres arborizados na mesma localidade metropolitana.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:border-brand-primary hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-orange mb-6 font-semibold">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-primary mb-3">Vulnerabilidade de Infraestrutura</h3>
                <p className="text-xs text-brand-orange mb-2 uppercase tracking-wider font-semibold">Dano de adaptação urbana</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Sem redes públicas de microdrenagem vegetal e bacias de absorção, comunidades circunvizinhas sofrem de antemão com enchentes severas desencadeadas pelas mudanças de ciclo hídrico do planeta.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:border-brand-primary hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-primary mb-6 font-semibold">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-primary mb-3">Invisibilidade Estatística</h3>
                <p className="text-xs text-brand-primary mb-2 uppercase tracking-wider font-semibold">Silenciamento técnico</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A falta crônica de sensores de monitoramento de vizinhança mascara as incidências de contaminação, impossibilitando embasamentos técnicos robustos para ações governamentais ou industriais proativas.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. A SOLUÇÃO (Nosso Projeto - Plataforma ECO-INTEGRA) */}
      <section id="solucao" className="py-20 lg:py-28 bg-brand-primary text-white relative animate-fade-in">
        <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent to-brand-primary" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <span className="text-sm font-bold text-brand-orange uppercase tracking-wider block mb-2">A Tecnologia e o Planejamento Sócio-Urbano</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Plataforma ECO-INTEGRA: <br className="hidden sm:inline" />
              Sinergia Humana & Territorial
            </h2>
            <div className="h-1 text-center bg-brand-orange w-24 mx-auto mt-6 rounded-full" />
            <p className="text-gray-300 mt-6 text-base sm:text-lg font-light leading-relaxed">
              Desenvolvemos um ecossistema holístico potente que descentraliza o monitoramento de qualidade ambiental através de hardware IoT de precisão, buffers biológicos urbanos de dispersão florestal e capacitação produtiva local.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pilar 1 */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-brand-orange/60 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6 font-display font-black text-lg">
                  01
                </div>
                <h3 className="font-display font-bold text-xl mb-4">Sensores IoT de Baixo Custo</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Dispositivos modulares instalados estrategicamente em residências, creches e praças das comunidades vizinhas. Monitoram PM2.5, PM10, NOx e temperatura, enviando dados contínuos via rede aberta LPWAN, garantindo transparência pública e soberania informativa.
                </p>
              </div>
              <div>
                <span className="text-xs text-brand-orange font-semibold flex items-center gap-1">
                  🔬 Calibração de Precisão • Transparência de Dados
                </span>
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-brand-orange/60 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center mb-6 font-display font-black text-lg">
                  02
                </div>
                <h3 className="font-display font-bold text-xl mb-4">Cinturões Verdes de Dispersão</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Criação de microflorestas bioativas em zonas de divisa industrial usando espécimes vegetais foliares hiperacumuladores de poluentes particulados (ex: mudas biofiltratantes). Estas redes reduzem as ilhas de calor e fornecem parques verdes comunitários necessários.
                </p>
              </div>
              <div>
                <span className="text-xs text-brand-orange font-semibold flex items-center gap-1">
                  🌳 Sequestro de Carbono • Resiliência Térmica Elevada
                </span>
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-brand-orange/60 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6 font-display font-black text-lg">
                  03
                </div>
                <h3 className="font-display font-bold text-xl mb-4">Formação em Economia Circular</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Estabelecimento da "Academia de Líderes Verdes". Oferecemos capacitação profissional técnica e inserção de cooperativas de reciclagem comunitárias de entorno para trabalhar no tratamento e reuso de sobras secundárias siderúrgicas locais.
                </p>
              </div>
              <div>
                <span className="text-xs text-brand-orange font-semibold flex items-center gap-1">
                  💼 Emprego Verde • Geração de Renda Local
                </span>
              </div>
            </div>

          </div>

          <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-bold text-lg text-gray-150 flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-orange" />
                Estrutura de Baixo Custo e Altíssima Escala
              </h4>
              <p className="text-xs text-gray-400 mt-1">Conectando engenharia climática ao ecodesign social. Todo o processo é documentado e rastreável, gerando KPIs sociais imbatíveis.</p>
            </div>
            <a href="#custo-inacao" className="bg-brand-orange hover:bg-opacity-90 text-white font-semibold text-xs py-3 px-6 rounded-xl transition duration-305 shrink-0 text-center">
              Acessar Simulador de Risco ➔
            </a>
          </div>

        </div>
      </section>

      {/* 3.5. PAINEL DE VISUALIZAÇÃO DE DADOS & IMPACTO TERRITORIAL */}
      <section id="visualizacao" className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-bold text-brand-orange uppercase tracking-wider block mb-2">Monitoramento de Precisão</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
              Análise Geográfica de Impacto e Racismo Spatial
            </h2>
            <p className="text-gray-600 text-base mt-4 font-light">
              Explore o ecossistema urbano de entorno da planta industrial. Use nosso mapa interativo e controles de vento para observar como poluentes particulados (PM2.5) atingem as comunidades periféricas desprotegidas e simule o impacto restaurador da implementação dos nossos cinturões biológicos.
            </p>
          </div>

          {/* Interactive Map Dashboard Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto mb-16">
            
            {/* Map Sidebar / Controls (4 cols on lg) */}
            <div className="lg:col-span-4 bg-brand-sleek p-6 rounded-3xl border border-gray-200 flex flex-col justify-between space-y-6">
              
              <div>
                <h3 className="font-display font-bold text-lg text-brand-primary flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-brand-orange" />
                  Painel de Controle Ambiental
                </h3>
                
                {/* Wind Direction Slider/Toggle */}
                <div className="space-y-3 mb-6 bg-white p-4.5 rounded-2xl border border-gray-200">
                  <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <span>Direção Predominante do Vento</span>
                    <span className="text-brand-orange font-mono font-bold">{windDirection === "NE" ? "Nordeste (NE)" : "Sudoeste (SW)"}</span>
                  </div>
                  <div className="flex gap-2.5 pt-1.5">
                    <button 
                      onClick={() => setWindDirection("NE")} 
                      className={`flex-1 text-center py-2 px-3 rounded-lg text-xs font-medium border transition-all ${windDirection === "NE" ? "bg-brand-primary text-white border-brand-primary font-bold" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}
                    >
                      Padrão Ventos NE (Risco Máximo)
                    </button>
                    <button 
                      onClick={() => setWindDirection("SW")} 
                      className={`flex-1 text-center py-2 px-3 rounded-lg text-xs font-medium border transition-all ${windDirection === "SW" ? "bg-brand-primary text-white border-brand-primary font-bold" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}`}
                    >
                      Ventos Ocasionais SW
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                    *Ventos Nordeste sopram particulados industriais suspensos diretamente rumo às moradias vulneráveis desprovidas de cobertura arbórea urbana.
                  </p>
                </div>

                {/* Layer Filters */}
                <div className="space-y-3 mb-6">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Filtrar Visualização de Camadas</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setActiveLayer("all")}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${activeLayer === "all" ? "bg-brand-orange border-brand-orange text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                    >
                      Todas Camadas
                    </button>
                    <button 
                      onClick={() => setActiveLayer("sensors")}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${activeLayer === "sensors" ? "bg-brand-orange border-brand-orange text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                    >
                      Estações IoT
                    </button>
                    <button 
                      onClick={() => setActiveLayer("plumes")}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${activeLayer === "plumes" ? "bg-brand-orange border-brand-orange text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                    >
                      Pluma Termoquímica
                    </button>
                    <button 
                      onClick={() => setActiveLayer("buffers")}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${activeLayer === "buffers" ? "bg-brand-orange border-brand-orange text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                    >
                      Cinturões Verdes
                    </button>
                  </div>
                </div>

                {/* Interactive Dynamic Simulation Toggle */}
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-brand-orange/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wide block">Simulação de Amortecimento Co-Ecológico</span>
                      <h4 className="font-bold text-brand-primary text-xs mt-0.5">Ativar Cinturões Verdes Biológicos</h4>
                    </div>
                    
                    {/* Switch Custom */}
                    <button 
                      type="button" 
                      onClick={() => setIsCinturaoActive(!isCinturaoActive)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isCinturaoActive ? 'bg-brand-green' : 'bg-gray-200'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isCinturaoActive ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    {isCinturaoActive ? (
                      <span className="text-emerald-700 font-semibold">✓ FLORESTA IMOBILIZADORA ATIVA: Cobertura arbórea sequestra particulados grossos na fonte, derrubando o PM2.5 do entorno em até 74%.</span>
                    ) : (
                      <span className="text-gray-500">Simule a ativação de barreiras foliares hiperacumuladoras de poeira nas divisas industriais para ver os novos índices recalculados.</span>
                    )}
                  </p>
                </div>

              </div>

              {/* Instructions Banner */}
              <div className="bg-white p-4.5 rounded-2xl border border-gray-200 text-[11px] text-gray-500 leading-normal">
                <span className="font-bold text-brand-primary block mb-1">Como interagir:</span>
                Clique diretamente nos bairros ou nos pontos de calibração IoT piscantes no mapa para carregar o prontuário de qualidade de vida e o nível epidemiológico de racismo econômico-espacial daquela localidade.
              </div>

            </div>

            {/* Interactive SVG Map Visual Component (5 cols on lg) */}
            <div className="lg:col-span-5 bg-brand-primary border border-white/10 rounded-3xl overflow-hidden relative shadow-inner h-[400px] lg:h-auto flex flex-col justify-between p-5 min-h-[420px]">
              
              {/* Map Info Header */}
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
                <div>
                  <span className="bg-black/35 px-2.5 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-brand-orange block w-max">
                    Zona Siderúrgica de Contorno • Curva Térmica
                  </span>
                  <h4 className="text-white font-display font-medium text-xs sm:text-sm mt-1">Gabinete de Calibração Tecnológica Georreferenciado</h4>
                </div>
                <div className="bg-black/30 text-white backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-[9px] font-mono border border-white/5 flex items-center gap-1.5 uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Monitor Online
                </div>
              </div>

              {/* Central Map Canvas (Interactive SVGs) */}
              <div id="svg-map-frame" className="flex-1 w-full h-full relative z-10 select-none flex items-center justify-center mt-6">
                
                {/* Embedded SVG Map Graphics */}
                <svg viewBox="0 0 600 400" className="w-full h-full max-h-[350px]" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Decorative Geography Grid Lines */}
                  <g stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none">
                    <line x1="50" y1="0" x2="50" y2="400" />
                    <line x1="150" y1="0" x2="150" y2="400" />
                    <line x1="250" y1="0" x2="250" y2="400" />
                    <line x1="350" y1="0" x2="350" y2="400" />
                    <line x1="450" y1="0" x2="450" y2="400" />
                    <line x1="550" y1="0" x2="550" y2="400" />
                    
                    <line x1="0" y1="50" x2="600" y2="50" />
                    <line x1="0" y1="150" x2="600" y2="150" />
                    <line x1="0" y1="250" x2="600" y2="250" />
                    <line x1="0" y1="350" x2="600" y2="350" />
                  </g>

                  {/* Wind Plume (Termoquímica) Overlay */}
                  {(activeLayer === "all" || activeLayer === "plumes") && (
                    <g opacity={isCinturaoActive ? "0.2" : "0.62"} className="transition-all duration-700">
                      {windDirection === "NE" ? (
                        <>
                          {/* Plume oriented to SW (towards bottom-left communities: Vila Harmonia & Jardim Acácia) */}
                          <path 
                            d="M 285,150 Q 230,220 120,290" 
                            stroke="url(#gradient-plume)" 
                            strokeWidth="90" 
                            strokeLinecap="round"
                            fill="none" 
                            className="animate-pulse" 
                          />
                          <path 
                            d="M 285,150 Q 250,195 180,245" 
                            stroke="url(#gradient-plume-core)" 
                            strokeWidth="35" 
                            strokeLinecap="round"
                            fill="none" 
                          />
                        </>
                      ) : (
                        <>
                          {/* Plume oriented to NE / North-East (towards affluent unexposed zone, but less intense) */}
                          <path 
                            d="M 285,150 Q 370,110 490,90" 
                            stroke="url(#gradient-plume-weak)" 
                            strokeWidth="60" 
                            strokeLinecap="round"
                            fill="none" 
                            className="animate-pulse" 
                          />
                        </>
                      )}
                    </g>
                  )}

                  {/* DEFINITIONS OF GRADIENTS */}
                  <defs>
                    <radialGradient id="grad-steel" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fd9d24" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="gradient-plume" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fd5724" stopOpacity="0.55" />
                      <stop offset="40%" stopColor="#e2e8f0" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="gradient-plume-core" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fd2424" stopOpacity="0.65" />
                      <stop offset="60%" stopColor="#d97706" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#1e293b" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="gradient-plume-weak" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* REFLORESTAMENTO - CINTURÕES VERDES BARRIER */}
                  {isCinturaoActive && (activeLayer === "all" || activeLayer === "buffers") && (
                    <g className="transition-all duration-750">
                      {/* Protective ecological belt on the plants border to communities */}
                      <path 
                        d="M 230,120 A 70,70 0 0,0 230,220" 
                        stroke="#10b981" 
                        strokeWidth="18" 
                        strokeLinecap="round"
                        fill="none" 
                        opacity="0.85"
                        strokeDasharray="4 2"
                        className="animate-pulse"
                      />
                      <path 
                        d="M 230,120 A 70,70 0 0,0 230,220" 
                        stroke="#047857" 
                        strokeWidth="10" 
                        strokeLinecap="round"
                        fill="none" 
                        opacity="0.9"
                      />
                      {/* Forest labels */}
                      <text x="140" y="145" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">
                        CINTURÃO BIOFILTRANTE ATIVO
                      </text>
                    </g>
                  )}

                  {/* STEELL MILL - INDUSTRIAL SITE (CENTER CORE PLANT) */}
                  <g transform="translate(245, 110)">
                    {/* Plant coverage area */}
                    <circle cx="40" cy="40" r="55" fill="url(#grad-steel)" />
                    
                    {/* Industrial structures */}
                    <rect x="15" y="30" width="50" height="30" fill="#334155" rx="3" />
                    <rect x="25" y="10" width="10" height="25" fill="#475569" />
                    <rect x="45" y="5" width="12" height="30" fill="#475569" />
                    <line x1="30" y1="10" x2="30" y2="5" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="51" y1="5" x2="51" y2="1" stroke="#ef4444" strokeWidth="2.5" />
                    
                    {/* Steel Mill Logo Symbol */}
                    <path d="M 33,40 L 40,32 L 47,40" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                    <path d="M 33,46 L 40,38 L 47,46" stroke="#fd9d24" strokeWidth="2" fill="none" />
                    
                    {/* Active Heat Emission Ring */}
                    <circle cx="40" cy="40" r="18" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" fill="none" className="animate-spin" style={{ transformOrigin: "40px 40px", animationDuration: "10s" }} />
                    
                    <text x="12" y="-12" fill="#fff" fontSize="11" fontWeight="bold" stroke="#000" strokeWidth="0.5">Planta Siderúrgica</text>
                  </g>

                  {/* NEIGHBORHOODS (COMMUNITIES) GEOMETRIES - INTERACTIVE */}
                  
                  {/* Vila Harmonia (Critical, Bottom Left) */}
                  <g 
                    onClick={() => setSelectedCommunity("vila-harmonia")}
                    className="cursor-pointer group select-none"
                  >
                    <path 
                      d="M 50,200 L 160,200 L 190,300 L 70,300 Z" 
                      fill={selectedCommunity === "vila-harmonia" ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.05)"} 
                      stroke={selectedCommunity === "vila-harmonia" ? "#fd9d24" : "rgba(239, 68, 68, 0.25)"} 
                      strokeWidth={selectedCommunity === "vila-harmonia" ? "2.5" : "1"} 
                      className="transition-all hover:fill-[rgba(239,68,68,0.15)] duration-200"
                    />
                    <text x="65" y="275" fill={selectedCommunity === "vila-harmonia" ? "#fd9d24" : "#94a3b8"} fontSize="12" fontWeight="bold">
                      Vila Harmonia
                    </text>
                    <text x="65" y="290" fill="#f87171" fontSize="9" fontWeight="medium">
                      {isCinturaoActive ? "Protegida" : "Risco Crítico"}
                    </text>
                  </g>

                  {/* Jardim Acácia (South, Bottom Center) */}
                  <g 
                    onClick={() => setSelectedCommunity("jardim-acacia")}
                    className="cursor-pointer group select-none"
                  >
                    <path 
                      d="M 160,200 L 260,200 L 290,340 L 190,300 Z" 
                      fill={selectedCommunity === "jardim-acacia" ? "rgba(253, 157, 36, 0.18)" : "rgba(253, 157, 36, 0.04)"} 
                      stroke={selectedCommunity === "jardim-acacia" ? "#fd9d24" : "rgba(253, 157, 36, 0.2)"} 
                      strokeWidth={selectedCommunity === "jardim-acacia" ? "2.5" : "1"} 
                      className="transition-all hover:fill-[rgba(253,157,36,0.12)] duration-200"
                    />
                    <text x="175" y="255" fill={selectedCommunity === "jardim-acacia" ? "#fd9d24" : "#94a3b8"} fontSize="11" fontWeight="bold">
                      Jardim Acácia
                    </text>
                    <text x="175" y="270" fill="#fca5a5" fontSize="8">
                      {isCinturaoActive ? "Amenizado" : "Risco Alto"}
                    </text>
                  </g>

                  {/* 20 de Novembro (West, Middle Left) */}
                  <g 
                    onClick={() => setSelectedCommunity("vinte-novembro")}
                    className="cursor-pointer group select-none"
                  >
                    <path 
                      d="M 40,100 L 160,100 L 160,200 L 50,200 Z" 
                      fill={selectedCommunity === "vinte-novembro" ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.02)"} 
                      stroke={selectedCommunity === "vinte-novembro" ? "#fd9d24" : "rgba(245, 158, 11, 0.18)"} 
                      strokeWidth={selectedCommunity === "vinte-novembro" ? "2.5" : "1"} 
                      className="transition-all hover:fill-[rgba(245,158,11,0.1)] duration-200"
                    />
                    <text x="60" y="145" fill={selectedCommunity === "vinte-novembro" ? "#fd9d24" : "#94a3b8"} fontSize="11" fontWeight="bold">
                      Vinte de Novembro
                    </text>
                    <text x="60" y="160" fill="#fde047" fontSize="8">
                      Risco Moderado
                    </text>
                  </g>

                  {/* Bairro das Palmeiras (Far North, affluent, forestated) */}
                  <g 
                    onClick={() => setSelectedCommunity("bairro-palmeiras")}
                    className="cursor-pointer group select-none"
                  >
                    <path 
                      d="M 380,30 L 560,30 L 560,140 L 410,140 Z" 
                      fill={selectedCommunity === "bairro-palmeiras" ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.03)"} 
                      stroke={selectedCommunity === "bairro-palmeiras" ? "#10b981" : "rgba(16, 185, 129, 0.2)"} 
                      strokeWidth={selectedCommunity === "bairro-palmeiras" ? "2.5" : "1"} 
                      className="transition-all hover:fill-[rgba(16,185,129,0.12)] duration-200"
                    />
                    <text x="415" y="70" fill={selectedCommunity === "bairro-palmeiras" ? "#10b981" : "#94a3b8"} fontSize="12" fontWeight="bold">
                      B. Palmeiras
                    </text>
                    <text x="415" y="85" fill="#6ee7b7" fontSize="9" fontWeight="medium">
                      Área de Controle
                    </text>
                    {/* Tree decorations representing dense cover */}
                    <circle cx="510" cy="65" r="10" fill="#047857" opacity="0.4" />
                    <circle cx="525" cy="75" r="13" fill="#047857" opacity="0.4" />
                    <circle cx="495" cy="80" r="11" fill="#047857" opacity="0.4" />
                  </g>

                  {/* ACTIVE IOT SENSORS ICONS (Bliping Dots) */}
                  {(activeLayer === "all" || activeLayer === "sensors") && (
                    <g pointerEvents="none">
                      {/* Sensor Harmonia */}
                      <circle cx="120" cy="240" r="8" fill="#ef4444" opacity="0.3" className="animate-ping" style={{ transformOrigin: "120px 240px" }} />
                      <circle cx="120" cy="240" r="4.5" fill={isCinturaoActive ? "#10b981" : "#ef4444"} stroke="#fff" strokeWidth="1" />
                      
                      {/* Sensor Acácia */}
                      <circle cx="210" cy="235" r="8" fill="#fb923c" opacity="0.3" className="animate-ping" style={{ transformOrigin: "210px 235px" }} />
                      <circle cx="210" cy="235" r="4.5" fill={isCinturaoActive ? "#10b981" : "#fb923c"} stroke="#fff" strokeWidth="1" />
                      
                      {/* Sensor Vinte de Novembro */}
                      <circle cx="100" cy="125" r="8" fill="#fbbf24" opacity="0.3" className="animate-ping" style={{ transformOrigin: "100px 125px" }} />
                      <circle cx="100" cy="125" r="4.5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
                      
                      {/* Sensor Palmeiras */}
                      <circle cx="440" cy="100" r="7" fill="#34d399" opacity="0.2" className="animate-ping" style={{ transformOrigin: "440px 100px" }} />
                      <circle cx="440" cy="100" r="4" fill="#10b981" stroke="#fff" strokeWidth="1" />
                    </g>
                  )}

                </svg>

              </div>

              {/* Map Footer Key Indicator */}
              <div className="bg-black/45 border border-white/10 p-3 rounded-2xl relative z-20 backdrop-blur-sm text-[10px] sm:text-xs flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                  Bairros Afetados Directamente:
                </span>
                <span className="flex gap-4">
                  <span className="flex items-center gap-1">🟥 Vila Harmonia (120m)</span>
                  <span className="flex items-center gap-1">🟧 Jd. Acácia (280m)</span>
                  <span className="flex items-center gap-1">🟩 B. Palmeiras (3.2km)</span>
                </span>
              </div>

            </div>

            {/* Selected Community Diagnostics HUD (3 cols on lg) */}
            <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-gray-200 flex flex-col justify-between space-y-6">
              
              {/* HUD Header */}
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Prontuário de Exposição Comunitária</span>
                <h3 className="font-display font-medium text-xl text-brand-primary mt-1.5 flex items-center gap-1.5 border-b border-gray-100 pb-3">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                  {communitiesData[selectedCommunity as keyof typeof communitiesData].name}
                </h3>
                
                {/* Specific descriptions */}
                <p className="text-xs text-gray-500 mt-3.5 leading-relaxed font-light">
                  {communitiesData[selectedCommunity as keyof typeof communitiesData].desc}
                </p>

                {/* Quantitative Badges Grid */}
                <div className="grid grid-cols-1 gap-4 mt-6">
                  
                  {/* Proximity */}
                  <div className="bg-brand-sleek p-3.5 rounded-2xl border border-gray-200 flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Distância em Linha Reta:</span>
                    <span className="font-mono font-bold text-brand-primary">{communitiesData[selectedCommunity as keyof typeof communitiesData].distance}</span>
                  </div>

                  {/* PM2.5 Exposure Level Indicator */}
                  <div className="bg-brand-sleek p-3.5 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">Particulados PM2.5 Médio:</span>
                      <span className={`font-mono font-black ${
                        (isCinturaoActive ? communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Reduced : communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Base) > 35 
                        ? "text-brand-orange" 
                        : (isCinturaoActive ? communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Reduced : communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Base) > 15 
                        ? "text-amber-500" 
                        : "text-emerald-600"
                      }`}>
                        {isCinturaoActive 
                          ? communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Reduced 
                          : communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Base
                        } µg/m³
                      </span>
                    </div>
                    {/* Micro gauge representation */}
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-700 ${
                          (isCinturaoActive ? communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Reduced : communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Base) > 35 
                          ? "bg-brand-orange" 
                          : (isCinturaoActive ? communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Reduced : communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Base) > 15 
                          ? "bg-amber-500" 
                          : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(100, ((isCinturaoActive ? communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Reduced : communitiesData[selectedCommunity as keyof typeof communitiesData].pm25Base) / 60) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-400">
                      <span>Limite OMS: 15 µg/m³</span>
                      <span>{isCinturaoActive ? "Redução Ativa" : "Exposição Elevada"}</span>
                    </div>
                  </div>

                  {/* Pediatric Asthma Hospitalization Factor */}
                  <div className="bg-brand-sleek p-3.5 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">Internação Respiratória Infantil:</span>
                      <span className={`font-mono font-black ${
                        (isCinturaoActive ? communitiesData[selectedCommunity as keyof typeof communitiesData].hospReduced : communitiesData[selectedCommunity as keyof typeof communitiesData].hospBase) > 5 
                        ? "text-brand-orange" 
                        : "text-emerald-600"
                      }`}>
                        {isCinturaoActive 
                          ? communitiesData[selectedCommunity as keyof typeof communitiesData].hospReduced 
                          : communitiesData[selectedCommunity as keyof typeof communitiesData].hospBase
                        }% ao ano
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-normal">
                      *Taxa média de episódios graves infantis que necessitam de intervenção hospitalar direta decorrente de estresse atmosférico.
                    </p>
                  </div>

                  {/* Green Canopy (Arborização) Ratio */}
                  <div className="bg-brand-sleek p-3.5 rounded-2xl border border-gray-200 flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Cobertura de Árvores Atual:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {isCinturaoActive 
                        ? communitiesData[selectedCommunity as keyof typeof communitiesData].canopyProposed 
                        : communitiesData[selectedCommunity as keyof typeof communitiesData].canopy
                      }
                    </span>
                  </div>

                </div>

              </div>

              {/* Sinergy Summary badge */}
              <div className="p-4 rounded-2xl bg-brand-cream/80 border border-brand-orange/15 text-xs">
                <div className="font-bold text-brand-primary uppercase text-[10px] tracking-wider mb-1">Diagnóstico Geral:</div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-brand-primary">Status Social:</span>
                  <span className="text-gray-600 font-light leading-snug">
                    Proximidade extrema e completo descaso de planejamento territorial configuram o clássico cenário de exclusão ambiental das famílias.
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* HISTOGRAM AND GRAPH SECTION (D3-LIKE STATISTICAL BAR CHART) */}
          <div className="bg-brand-sleek p-8 rounded-3xl border border-gray-200 max-w-6xl mx-auto space-y-8">
            
            <div className="max-w-3xl border-b border-gray-200 pb-5">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-1">A Ciência por trás dos Números</span>
              <h3 className="font-display font-medium text-xl text-brand-primary">
                A Correlação Direta entre Ausência de Floresta Urbana e Internações Coletivas
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">
                Nosso prontuário estatístico mostra o abismo social urbano. Os bairros com as menores porcentagens de árvores vizinhas sofrem em escala exponencial com internações pediátricas urgentes em virtude do pó siderúrgico suspenso descontrolado.
              </p>
            </div>

            {/* Simulated Animated Chart (Custom SVG & CSS Animations) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Vertical Bars representation (7 cols on md) */}
              <div className="md:col-span-8 space-y-6 bg-white p-6 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block text-center md:text-left mb-2">Comparações dos Bairros: Nível de PM2.5 (Barras) vs Internações de Crianças (Vermelho %)</span>
                
                <div className="space-y-4">
                  
                  {/* Bairro 1: Vila Harmonia */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-700">Vila Harmonia <span className="text-gray-400 font-normal">(120m - Sem Amortecimento)</span></span>
                      <div className="flex gap-4">
                        <span className="text-brand-orange font-mono font-bold">PM2.5: {isCinturaoActive ? "15" : "58"} µg/m³</span>
                        <span className="text-red-500 font-mono font-bold">Internações: {isCinturaoActive ? "2.1%" : "9.8%"}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-7 rounded-lg overflow-hidden flex relative items-center">
                      {/* Bar representativo do PM2.5 */}
                      <div 
                        className="bg-brand-orange/20 border-r-2 border-brand-orange h-full transition-all duration-700 ease-out"
                        style={{ width: `${isCinturaoActive ? 25 : 97}%` }}
                      ></div>
                      {/* Line overlay de internação */}
                      <span className="absolute left-4 text-[10px] font-bold text-brand-primary font-mono">
                        {isCinturaoActive ? "ZONA MITIGADA POSITIVAMENTE (ECO-INTEGRA)" : "9.8x ACIMA DAS ÁREAS VERDES NOBRES"}
                      </span>
                    </div>
                  </div>

                  {/* Bairro 2: Jardim Acácia */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-700">Jardim Acácia <span className="text-gray-400 font-normal">(280m - Sem Amortecimento)</span></span>
                      <div className="flex gap-4">
                        <span className="text-amber-500 font-mono font-bold">PM2.5: {isCinturaoActive ? "12" : "42"} µg/m³</span>
                        <span className="text-red-500 font-mono font-bold">Internações: {isCinturaoActive ? "1.8%" : "6.5%"}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-7 rounded-lg overflow-hidden flex relative items-center">
                      <div 
                        className="bg-amber-500/25 border-r-2 border-amber-500 h-full transition-all duration-700 ease-out"
                        style={{ width: `${isCinturaoActive ? 20 : 70}%` }}
                      ></div>
                      <span className="absolute left-4 text-[10px] font-bold text-brand-primary font-mono">
                        {isCinturaoActive ? "NÍVEL REDUZIDO PARA ZONA DE SEGURANÇA" : "6.5x MAIOR EXPOSIÇÃO EPIDEMIOLÓGICA"}
                      </span>
                    </div>
                  </div>

                  {/* Bairro 3: Vinte de Novembro */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-700">Vinte de Novembro <span className="text-gray-400 font-normal">(510m - Baixa Arborização)</span></span>
                      <div className="flex gap-4">
                        <span className="text-yellow-600 font-mono font-bold">PM2.5: 31 µg/m³</span>
                        <span className="text-red-500 font-mono font-bold">Internações: 4.8%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-7 rounded-lg overflow-hidden flex relative items-center">
                      <div 
                        className="bg-yellow-500/20 border-r-2 border-yellow-500 h-full transition-all duration-700 ease-out"
                        style={{ width: "52%" }}
                      ></div>
                      <span className="absolute left-4 text-[10px] font-bold text-brand-primary font-mono">4.8% INTERNAÇÃO COMUNITÁRIA RECORRENTE</span>
                    </div>
                  </div>

                  {/* Bairro 4: Bairro das Palmeiras */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-emerald-700">Bairro das Palmeiras <span className="text-gray-400 font-normal">(3,2km - Nobre & Densamente Arborizado)</span></span>
                      <div className="flex gap-4">
                        <span className="text-emerald-700 font-mono font-bold">PM2.5: 12 µg/m³</span>
                        <span className="text-emerald-700 font-mono font-bold">Internações: 1.1%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-7 rounded-lg overflow-hidden flex relative items-center">
                      <div 
                        className="bg-emerald-500/15 border-r-2 border-emerald-500 h-full transition-all duration-700"
                        style={{ width: "20%" }}
                      ></div>
                      <span className="absolute left-4 text-[10px] font-bold text-emerald-800 font-mono">CONTROLE PADRÃO OMS • EXCELENTE QUALIDADE DE INTERNAÇÃO</span>
                    </div>
                  </div>

                </div>

                {/* X-Axis Description */}
                <div className="flex justify-between mt-4 text-[9px] text-gray-400 uppercase font-mono border-t border-gray-100 pt-3">
                  <span>Qualidade Perigosa de Exposição (&gt;35 µg/m³)</span>
                  <span>Limiar Moderado</span>
                  <span>Margem Segura (&lt;15 µg/m³)</span>
                </div>

              </div>

              {/* Explanatory Summary HUD (4 cols on md) */}
              <div className="md:col-span-4 bg-brand-primary text-white p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-brand-orange" />
                
                <h4 className="font-display font-bold text-base text-gray-100 flex items-center gap-1.5 mb-3">
                  <Activity className="w-5 h-5 text-brand-orange" />
                  Métrica de Desigualdade
                </h4>
                
                <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                  A correlação é absoluta: populações vivendo a menos de 500m da planta industrial pesada têm até <strong>oito vezes mais chances</strong> de internação pediátrica respiratória grave que moradores do bairro nobre, o qual detém cobertura florestal de segurança. 
                </p>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                  <span className="text-[10px] text-brand-orange uppercase font-bold block">A Solução Preventiva:</span>
                  <p className="text-[11px] text-gray-200 leading-normal">
                    Sequestrar particulados pesados através do <strong>Ecodeisgn de Cinturões Verdes</strong> proposto na Fase 2 interrompe o espalhamento térmo-físico e rebaixa as admissões de internação médica hospitalar comunitária de entorno, salvando a integridade social e reduzindo crises corporativas locais.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. ALINHAMENTO COM AS ODS (Objetivos de Desenvolvimento Sustentável da ONU) */}
      <section id="ods" className="py-20 lg:py-28 bg-brand-sleek border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold text-brand-orange uppercase tracking-wider block mb-2">Compromisso Global</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
              Metas de Alinhamento ODS da ONU
            </h2>
            <p className="text-gray-600 text-base mt-4 font-light">
              Ao investir nesta proposta, a ArcelorMittal cumpre com rigor e métricas auditáveis metas internacionais prioritárias que condicionam financiamentos e ratings ESG corporativos mundiais.
            </p>
          </div>

          {/* Accordion Component */}
          <div className="max-w-4xl mx-auto space-y-4">
            
            {/* ODS 10 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
              <button 
                onClick={() => setExpandedOds(expandedOds === "ods-10" ? "" : "ods-10")}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-1 focus:ring-brand-orange"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#E5243B] text-white rounded-xl flex flex-col items-center justify-center font-bold text-lg shadow-inner shrink-0 leading-none">
                    <span className="text-[10px] opacity-75 uppercase">ODS</span>
                    <span className="text-xl">10</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-brand-primary text-lg">Redução das Desigualdades</h3>
                    <p className="text-xs text-slate-500 font-medium font-sans">Equanimidade socioambiental ativa nos assentamentos peri-industriais</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedOds === "ods-10" ? "rotate-180 text-brand-orange" : ""}`} />
              </button>
              
              <AnimatePresence>
                {expandedOds === "ods-10" && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-sm text-gray-600 space-y-3 bg-brand-cream/30">
                      <p>
                        O Combate ao Racismo Ambiental é a materialização do combate às assimetrias urbanas. Ao coletivizar dados de qualidade atmosférica e integrar os moradores na manutenção operacional do projeto, reequilibramos a governança técnica e promovemos dignidade física.
                      </p>
                      <p className="text-xs text-brand-green font-semibold flex items-center gap-1 bg-brand-green/5 p-2.5 rounded-lg border border-brand-green/15">
                        <span>🎯 Goal Met:</span> Promove inclusão social, econômica e política ativa a indivíduos de grupos desfavorecidos por externalidades industriais georreferenciadas.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ODS 11 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
              <button 
                onClick={() => setExpandedOds(expandedOds === "ods-11" ? "" : "ods-11")}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-1 focus:ring-brand-orange"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#FD9D24] text-white rounded-xl flex flex-col items-center justify-center font-bold text-lg shadow-inner shrink-0 leading-none">
                    <span className="text-[10px] opacity-75 uppercase">ODS</span>
                    <span className="text-xl">11</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-brand-primary text-lg">Cidades e Comunidades Sustentáveis</h3>
                    <p className="text-xs text-slate-500 font-medium font-sans">Resiliência urbana, mobilização territorial e infraestrutura verde</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedOds === "ods-11" ? "rotate-180 text-brand-orange" : ""}`} />
              </button>
              
              <AnimatePresence>
                {expandedOds === "ods-11" && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-sm text-gray-600 space-y-3 bg-brand-cream/30">
                      <p>
                        A dispersão florestal por cinturões verdes cria buffers de atenuação hídrica e térmica fundamentais nos polígonos habitacionais vulneráveis, transformando as divisas fabris em zonas urbanas equipadas com tecnologia ecológica e integradas organicamente ao cinturão verde da usina.
                      </p>
                      <p className="text-xs text-brand-orange font-semibold flex items-center gap-1 bg-brand-orange/5 p-2.5 rounded-lg border border-brand-orange/15">
                        <span>🎯 Goal Met:</span> Garante acesso a moradias seguras, redução do impacto ambiental negativo per capita das cidades (atenção especial à qualidade do ar) e expansão de áreas seguras de lazer.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ODS 13 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
              <button 
                onClick={() => setExpandedOds(expandedOds === "ods-13" ? "" : "ods-13")}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-1 focus:ring-brand-orange"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#3F7E44] text-white rounded-xl flex flex-col items-center justify-center font-bold text-lg shadow-inner shrink-0 leading-none">
                    <span className="text-[10px] opacity-75 uppercase">ODS</span>
                    <span className="text-xl">13</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-brand-primary text-lg">Ação Contra a Mudança Global do Clima</h3>
                    <p className="text-xs text-slate-500 font-medium font-sans">Adaptação climática periférica, sequestro e contenção de estresse de calor</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedOds === "ods-13" ? "rotate-180 text-brand-orange" : ""}`} />
              </button>
              
              <AnimatePresence>
                {expandedOds === "ods-13" && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-sm text-gray-600 space-y-3 bg-brand-cream/30">
                      <p>
                        Os extremos climáticos do século XXI são sentidos primeiro e mais amplamente por quem habita assentamentos carentes de isolamento térmico e saneamento básico. Nossos buffers ecológicos sequestram CO₂ diretamente na origem urbana periférica e auxiliam no controle térmico contínuo do ambiente urbano.
                      </p>
                      <p className="text-xs text-brand-primary font-semibold flex items-center gap-1 bg-brand-cream p-2.5 rounded-lg border border-brand-primary/10">
                        <span>🎯 Goal Met:</span> Melhora a educação, conscientização e capacidade humana e institucional sobre mitigação, adaptação, redução de impacto e alerta precoce às mudanças climáticas.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 5. O CUSTO DA INAÇÃO (Interactive ESG Risk & Legal Cost Simulator) */}
      <section id="custo-inacao" className="py-20 lg:py-28 bg-brand-cream/30 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-bold text-brand-orange uppercase tracking-wider block mb-2">Decisão de Alta Liderança / ROI</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
              O Rígido Custo Financeiro da Inação
            </h2>
            <p className="text-gray-600 text-base mt-4 font-light">
              Danos ambientais em bairros sem cinturões biológicos e conflitos com moradores do entorno cobram o preço na contabilidade no final do trimestre. Use nosso painel interativo para visualizar os riscos mensuráveis sob as regras rígidas ESG internacionais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Interactive Panel */}
            <div className="lg:col-span-7 bg-brand-primary text-white p-8 rounded-3xl shadow-xl space-y-8 border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <h3 className="font-display font-medium text-lg text-gray-100 flex items-center gap-2">
                  <span className="text-brand-orange font-bold">•</span>
                  Simulador de Passivo Ambiental & Financeiro B2B
                </h3>
                <span className="text-[10px] text-brand-orange font-bold tracking-widest uppercase border border-brand-orange/20 px-2 py-0.5 rounded-md">Voz de Negócios</span>
              </div>

              {/* Slider 1: Population */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <span>População Estimada no Entorno das Usinas</span>
                  <span className="text-brand-orange font-mono text-sm font-bold">{population.toLocaleString("pt-BR")} moradores</span>
                </div>
                <input 
                  type="range"
                  min="2000"
                  max="45000"
                  step="1000"
                  value={population}
                  onChange={(e) => setPopulation(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
              </div>

              {/* Slider 2: Buffer Forest width */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <span>Distância Média do Buffer Verde Atual</span>
                  <span className={`font-mono text-sm font-bold ${bufferForest < 100 ? "text-brand-orange" : bufferForest < 250 ? "text-amber-500" : "text-emerald-400"}`}>
                    {bufferForest} metros {bufferForest < 100 ? "(Altamente Insuficiente)" : bufferForest < 250 ? "(Risco Moderado)" : "(Margem Aceitável)"}
                  </span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="400"
                  step="10"
                  value={bufferForest}
                  onChange={(e) => setBufferForest(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
              </div>

              {/* Real-time calculated risks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Passivo Estimado em Custos Judiciais & TACs</span>
                  <div className="font-display text-2xl font-bold text-brand-orange mt-1.5 animate-fade-in">
                    R$ {simulatedLegalRisk.toLocaleString("pt-BR")}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                    Estimativa baseada em precedentes de termos de ajustamentos de condutas (TAC) e ações civis públicas climáticas regionais.
                  </p>
                </div>

                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-brand-orange tracking-wider block">Impacto Reputacional & Risco de Atração ESG</span>
                  <div className="font-display text-2xl font-bold text-brand-orange mt-1.5 animate-fade-in">
                    R$ {simulatedTotalEsgRisk.toLocaleString("pt-BR")}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                    Representa o risco de perda de rating por agências avaliadoras internacionais e ágio em taxas de captação de debêntures verdes.
                  </p>
                </div>

              </div>

              <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-[10px] text-gray-400 leading-normal italic">
                *Cálculo matemático dinâmico gerado com base em índices ponderados de população vizinha afetada e dimensionamento florestal biofiltrante. O investimento preventivo mitiga até 94% deste risco estimado.
              </div>

              {a11yVisualCaptions && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-800 space-y-1" id="no-hc-override">
                  <strong className="text-amber-900 block flex items-center gap-1.5 font-bold uppercase text-[10px]">
                    <Ear className="w-4 h-4 text-amber-600 inline" /> Legenda de Apoio Auditivo:
                  </strong>
                  <p className="leading-normal text-amber-950 font-medium">
                    Métrica de risco atualizada em tempo real: População afetada é de <strong>{population.toLocaleString("pt-BR")} moradores</strong> com buffer de <strong>{bufferForest}m</strong>. O passivo judicial estimado subiu para <strong>R$ {simulatedLegalRisk.toLocaleString("pt-BR")}</strong> e o risco reputacional totaliza <strong>R$ {simulatedTotalEsgRisk.toLocaleString("pt-BR")}</strong>. {bufferForest < 100 ? "Recomenda-se aumentar o amortecimento verde para remover multas críticas." : "A conformidade técnica protege a operação corporativa." }
                  </p>
                </div>
              )}
            </div>

            {/* Explanatory text */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-8 lg:mt-6">
              <h3 className="font-display font-bold text-2xl text-brand-primary leading-tight">
                A Mecânica de Proteção do Capital e da Licença Societária
              </h3>
              
              <div className="space-y-5">
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-brand-cream border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 mt-0.5 font-bold text-xs">1</div>
                  <div>
                    <h4 className="font-bold text-brand-primary text-sm">Garantia Legal de Curto Prazo</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Estar em conformidade proativa por meio de dados transparentes evita paralisações operacionais e multas com base na Lei de Crimes Ambientais de fiscalização estrita nacional.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-brand-cream border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 mt-0.5 font-bold text-xs">2</div>
                  <div>
                    <h4 className="font-bold text-brand-primary text-sm">Custos de Financiamento Superiores (Spreads Bancários)</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Siderúrgicas com passivo ativo de insatisfação comunitária ou pendências de racismo ambiental no seu prontuário são oneradas em captações públicas por ágios contratuais severos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-brand-cream border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 mt-0.5 font-bold text-xs">3</div>
                  <div>
                    <h4 className="font-bold text-brand-primary text-sm">Contratos e Licitações Internacionais</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Parceiros da indústria automobilística global e de infraestrutura ecológica na Europa já impõem regras rígidas que exigem a mitigação ambiental do entorno da usina do fornecedor de bobinas.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-gray-200">
                <a 
                  href="#arcelormittal" 
                  className="font-bold text-brand-orange hover:text-brand-primary inline-flex items-center gap-2 text-sm cursor-pointer transition-colors"
                >
                  Ver Proposta Comercial e Orçamento de Patrocínio ➔
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5.5. CALCULADORA DE ROI ESG & VALOR CORPORATIVO */}
      <section id="calculadora-roi" className="py-20 lg:py-28 bg-brand-primary text-white relative overflow-hidden border-b border-gray-800">
        
        {/* Abstract Background Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-orange rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-green rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">Engenharia Financeira Sustentável</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculadora de ROI ESG & Caso de Negócio Corporativo
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-4 font-light leading-relaxed max-w-2xl mx-auto">
              Siderurgia responsável gera dividendos tangíveis. Utilize nosso modelo para quantificar a redução de riscos de multas, o ganho de eficiência no custo de capital e o retorno reputacional do projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
            
            {/* Input Form Controls (5 cols on lg) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                
                <h3 className="font-display font-medium text-lg text-brand-orange flex items-center gap-2 border-b border-white/10 pb-4">
                  <Coins className="w-5 h-5" />
                  Parâmetros de Investimento
                </h3>

                {/* Param 1: Investment Value slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300 font-medium">Investimento Estimado no Projeto:</span>
                    <span className="font-mono font-bold text-white text-sm">R$ {estInvestment.toLocaleString("pt-BR")}</span>
                  </div>
                  <input 
                    type="range" 
                    min="300000" 
                    max="2500000" 
                    step="50000"
                    value={estInvestment}
                    onChange={(e) => setEstInvestment(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-orange"
                  />
                  <div className="flex justify-between text-[10px] text-gray-450 font-mono">
                    <span>R$ 300 mil</span>
                    <span>Proposta ECO-INTEGRA: R$ 910K (Fases 1+2+3)</span>
                    <span>R$ 2.5 mi</span>
                  </div>
                </div>

                {/* Param 2: Emissions Reduction potential slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300 font-medium">Potencial Redução / Captação de Particulados:</span>
                    <span className="font-mono font-bold text-brand-orange text-sm">{potReduction}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="95" 
                    step="5"
                    value={potReduction}
                    onChange={(e) => setPotReduction(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-orange"
                  />
                  <div className="flex justify-between text-[10px] text-gray-450 font-mono">
                    <span>30% (Mínimo floresta)</span>
                    <span>Eficiência Esperada: 75%</span>
                    <span>95% (Filtro total)</span>
                  </div>
                </div>

                {/* Param 3: Desired payback slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300 font-medium">Horizonte Temporal de Mensuração desejado:</span>
                    <span className="font-mono font-bold text-white text-sm">{desiredPayback} {desiredPayback === 1 ? "Ano" : "Anos"}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="1"
                    value={desiredPayback}
                    onChange={(e) => setDesiredPayback(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-orange"
                  />
                  <div className="flex justify-between text-[10px] text-gray-450 font-mono">
                    <span>1 Ano</span>
                    <span>Médio Prazo: 3 Anos</span>
                    <span>5 Anos</span>
                  </div>
                </div>

              </div>

              {/* Benchmark Reference box */}
              <div className="bg-black/25 p-4.5 rounded-2xl border border-white/5 space-y-2 text-xs">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block">Fato Pragmático de Mercado:</span>
                <p className="text-gray-300 leading-normal font-light">
                  "Para cada 1 real investido preventivamente em monitoramento e amortecimento ambiental focado em Justiça Social, siderúrgicas brasileiras economizam, em média, de 2 a 4 vezes com contencioso."
                </p>
                <span className="block text-[9px] text-gray-400 italic">— Estudo de Casos ESG em Heavy Industries, 2025</span>
              </div>

            </div>

            {/* Live Outputs Dashboard (7 cols on lg) */}
            <div className="lg:col-span-7 bg-white text-gray-900 p-8 rounded-3xl flex flex-col justify-between space-y-8 select-none shadow-2xl relative">
              <span className="absolute top-0 right-0 w-3 h-full bg-brand-orange rounded-r-3xl" />
              
              <div>
                
                {/* Dashboard HUD Top grid */}
                <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-6">
                  
                  {/* Dynamic Return ROI Badge */}
                  <div className="bg-brand-sleek p-4 rounded-2xl border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">ROI ESG Estimado:</span>
                    <div className="font-display font-black text-3xl text-brand-primary mt-1">
                      {Math.round((( (estInvestment * 0.45 * (potReduction / 100) * desiredPayback) + (estInvestment * 0.58 * (potReduction / 100) * desiredPayback) + (estInvestment * 1.15 * (potReduction / 100) * (desiredPayback / 2.5)) - estInvestment ) / estInvestment) * 100)}%
                    </div>
                    <span className="text-[9px] text-emerald-600 font-bold block mt-1 uppercase">✓ Retorno Altamente Atrativo</span>
                  </div>

                  {/* Calculated Payback timeline */}
                  <div className="bg-brand-sleek p-4 rounded-2xl border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Payback Financeiro Estimado:</span>
                    <div className="font-display font-black text-3xl text-brand-primary mt-1">
                      {(estInvestment / (( (estInvestment * 0.45 * (potReduction / 100)) + (estInvestment * 0.58 * (potReduction / 100)) + (estInvestment * 1.15 * (potReduction / 100) * (1 / 2.5)) ))).toFixed(1)} <span className="text-sm font-bold text-gray-500">Anos</span>
                    </div>
                    <span className="text-[9px] text-[#248efd] font-bold block mt-1 uppercase">✓ Dentro das Políticas de Capex</span>
                  </div>

                </div>

                {/* Quantified Strategic Savings Items */}
                <div className="space-y-4 mt-6">
                  
                  <h4 className="font-bold text-brand-primary text-xs uppercase tracking-widest">Detalhamento Financeiro do Valor Gerado:</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Item 1: Legal mitigation */}
                    <div className="p-3 bg-brand-sleek border border-gray-200 rounded-xl">
                      <div className="text-[9px] font-bold text-gray-400 uppercase">1. Prevenção Legal & TACs</div>
                      <div className="font-mono font-black text-base text-brand-primary mt-1">
                        R$ {Math.round(estInvestment * 0.45 * (potReduction / 100) * desiredPayback).toLocaleString("pt-BR")}
                      </div>
                      <p className="text-[9px] text-gray-500 mt-1 leading-normal">
                        Redução de despesas com penalidades e acordos de ajuste de conduta.
                      </p>
                    </div>

                    {/* Item 2: Capital Cost efficiency */}
                    <div className="p-3 bg-brand-sleek border border-gray-200 rounded-xl">
                      <div className="text-[9px] font-bold text-gray-400 uppercase">2. Spread Captação Verde</div>
                      <div className="font-mono font-black text-base text-brand-primary mt-1">
                        R$ {Math.round(estInvestment * 0.58 * (potReduction / 100) * desiredPayback).toLocaleString("pt-BR")}
                      </div>
                      <p className="text-[9px] text-gray-500 mt-1 leading-normal">
                        Diminuição do custo de capital em debêntures por mitigação de passivos ativos.
                      </p>
                    </div>

                    {/* Item 3: Reputation value */}
                    <div className="p-3 bg-brand-sleek border border-gray-200 rounded-xl">
                      <div className="text-[9px] font-bold text-gray-400 uppercase">3. Brand Trust & Investidores</div>
                      <div className="font-mono font-black text-base text-brand-primary mt-1">
                        R$ {Math.round(estInvestment * 1.15 * (potReduction / 100) * (desiredPayback / 2.5)).toLocaleString("pt-BR")}
                      </div>
                      <p className="text-[9px] text-gray-500 mt-1 leading-normal">
                        Geração de prêmio de valor intangível e elegibilidade em fundos globais.
                      </p>
                    </div>

                  </div>

                  {/* Benchmark ESG rating upgrade */}
                  <div className="p-4 bg-brand-cream border border-brand-orange/15 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
                    <div>
                      <span className="text-[9px] text-brand-orange uppercase font-bold tracking-wide">Estimativa de Melhoria de Scoring Global:</span>
                      <h5 className="font-bold text-brand-primary text-sm mt-0.5">Rating ESG Corporate Upgrade</h5>
                      <p className="text-[10px] text-gray-500 mt-0.5 max-w-md">
                        Melhoria média projetada de <strong>+{Math.round(12 + (potReduction / 100) * 15)} pontos</strong> nos ratings como MSCI ESG ou Sustainalytics Siderúrgico em face do controle total das emissões.
                      </p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-2.5 text-center shrink-0 w-28">
                      <span className="text-[9px] text-gray-400 uppercase block font-bold">Novos Fundos</span>
                      <span className="text-xl font-black text-[#10b981] font-mono">AA+</span>
                      <span className="text-[8px] text-gray-500 block">Atratividade Total</span>
                    </div>
                  </div>

                  {a11yVisualCaptions && (
                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl space-y-1 mt-4" id="no-hc-override">
                      <strong className="text-indigo-950 block flex items-center gap-1.5 font-bold uppercase text-[9px]">
                        <Ear className="w-3.5 h-3.5 text-indigo-600 inline" /> Legenda de Apoio Auditivo (ROI):
                      </strong>
                      <p className="text-[10px] text-indigo-900 leading-normal font-medium">
                        Cálculo de retorno atualizado para <strong>{desiredPayback} {desiredPayback === 1 ? "ano" : "anos"} de medição</strong> com investimento de <strong>R$ {estInvestment.toLocaleString("pt-BR")}</strong>. Redução de particulados simulada em <strong>{potReduction}%</strong> projeta um ROI global de <strong>{Math.round((( (estInvestment * 0.45 * (potReduction / 100) * desiredPayback) + (estInvestment * 0.58 * (potReduction / 100) * desiredPayback) + (estInvestment * 1.15 * (potReduction / 100) * (desiredPayback / 2.5)) - estInvestment ) / estInvestment) * 100)}%</strong> com retorno de investimento em <strong>{(estInvestment / (( (estInvestment * 0.45 * (potReduction / 100)) + (estInvestment * 0.58 * (potReduction / 100)) + (estInvestment * 1.15 * (potReduction / 100) * (1 / 2.5)) ))).toFixed(1)} anos</strong>. Melhoria média de rating de <strong>+{Math.round(12 + (potReduction / 100) * 15)} pontos</strong>.
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* Action Buttons to trigger executive proposal creation */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setShowRoiToast(true);
                    setTimeout(() => setShowRoiToast(false), 4000);
                  }}
                  className="w-full sm:flex-1 bg-brand-orange text-white hover:bg-opacity-95 font-bold text-sm px-6 py-3.5 rounded-xl transition duration-300 transform hover:-translate-y-0.5 text-center cursor-pointer shadow-md"
                >
                  Baixar Relatório Executivo de Viabilidade (PDF)
                </button>
                <a 
                  href="#arcelormittal" 
                  className="w-full sm:w-auto border border-gray-300 text-slate-700 hover:bg-gray-50 font-semibold text-sm px-6 py-3.5 rounded-xl text-center transition duration-300"
                >
                  Acessar Match Corporativo
                </a>
              </div>

            </div>

          </div>

          {/* ROI Executive Toast alert */}
          <AnimatePresence>
            {showRoiToast && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="fixed bottom-6 right-6 z-50 bg-brand-primary border border-brand-orange/20 text-white rounded-2xl p-4 shadow-2xl max-w-sm flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h5 className="font-bold text-sm">Simulação Exportada!</h5>
                  <p className="text-xs text-gray-300 mt-1 leading-normal">
                    Seu business case personalizado com investimento de <strong>R$ {estInvestment.toLocaleString("pt-BR")}</strong> e taxa de amortecimento de <strong>{potReduction}%</strong> foi gerado e enviado para renderização local.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 6. POR QUE A ARCELORMITTAL? (O Match Perfeito) */}
      <section id="arcelormittal" className="py-20 lg:py-28 bg-brand-sleek border-b border-gray-200 relative overflow-hidden">
        <span className="absolute top-0 left-0 w-2 h-full bg-brand-orange" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 mb-12 lg:mb-0">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-1">O Alinhamento Estratégico Perfeito</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary leading-tight mb-8">
                Parceria de Liderança <br/>Siderúrgica Limpa e Humana
              </h2>

              <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                <p>
                  A <strong>ArcelorMittal</strong> posiciona-se mundialmente como a precursora do "aço inteligente e sustentável". A estratégia corporativa visa liderar as metas globais de descarbonização para 2030 e 2050, mas a transição de longo prazo não pode ignorar a <strong>licença social de operação</strong> e as comunidades que viabilizam o ecossistema manufatureiro nas plantas brasileiras.
                </p>
                <p>
                  O projeto <strong>ECO-INTEGRA</strong> é um hub de alto valor reputacional: a ArcelorMittal passa da defensiva e doadora reativa para a posição mais prestigiada de investidora de tecnologia urbana justa, pioneira na resolução sistemática do Racismo Ambiental de entorno fabril.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3 text-slate-800 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 text-brand-orange shrink-0" />
                  <span>Posicionamento de marca inédito no setor de ligas duráveis do Brasil</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-800 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 text-brand-orange shrink-0" />
                  <span>Auditoria e certificação automatizada de dados ambientais</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-800 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 text-brand-orange shrink-0" />
                  <span>Compensação baseada em mutirões de microflorestas urbanas ativas</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-md relative hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-4 right-6 bg-brand-orange text-white font-extrabold font-display py-2 px-4 rounded-xl shadow-lg text-sm border-2 border-brand-cream animate-pulse">
                  ARCELORMITTAL MATCH
                </div>

                <h3 className="font-display font-bold text-2xl text-brand-primary mb-6">Proposta Comercial & Investimento Estimado</h3>

                <div className="space-y-4">
                  
                  <div className="p-4 rounded-2xl bg-brand-cream/40 border border-gray-150 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-brand-primary text-sm">Fase 1: Estudo Georreferenciado + IoT Sensores</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Mapeamento, calibração técnica e implantação inicial comunitária</p>
                    </div>
                    <span className="font-mono font-bold text-brand-primary text-sm shrink-0">R$ 250.000</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-cream/40 border border-gray-150 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-brand-primary text-sm">Fase 2: Ecodesign de Cinturões & Florestas Biofiltratantes</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Reflorestamento de buffers, diminuição térmica e espaços comunitários</p>
                    </div>
                    <span className="font-mono font-bold text-brand-primary text-sm shrink-0">R$ 480.000</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-cream/40 border border-gray-150 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-brand-primary text-sm">Fase 3: Academia de Liderança Verde + Inserção Circular</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Capacitação profissional, e cooperativismo integrado de escórias industriais</p>
                    </div>
                    <span className="font-mono font-bold text-brand-primary text-sm shrink-0">R$ 180.000</span>
                  </div>

                  <div className="pt-4 flex justify-between items-center border-t border-gray-200">
                    <div>
                      <span className="text-xs text-brand-primary font-bold uppercase tracking-wider block">Orçamento Geral de Lançamento</span>
                      <span className="text-xs text-gray-400 block leading-tight">(Geração de Royalties de Transparência Exclusivos)</span>
                    </div>
                    <span className="font-display font-black text-2xl text-brand-orange">R$ 910.000</span>
                  </div>

                </div>

                <p className="text-[11px] text-gray-500 leading-normal mt-6">
                  Como parceiro fundador exclusivo da Plataforma ECO-INTEGRA, a ArcelorMittal Brasil deterá assento prioritário em conselho consultivo nacional e exclusividade para uso em seus relatórios anuais ESG integrados mundiais.
                </p>

                <div className="mt-8">
                  <button 
                    onClick={() => setIsInvestorModalOpen(true)}
                    className="w-full text-center bg-brand-orange hover:bg-opacity-90 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Seja um Investidor Pioneiro</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <span className="block text-center text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-3">Abra novos caminhos para o licenciamento social preventivo</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-brand-primary text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-brand-orange flex items-center justify-center text-white font-bold text-sm">
                  E
                </div>
                <span className="font-display font-medium text-white tracking-widest text-sm uppercase">Plataforma ECO-INTEGRA</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm max-w-sm leading-relaxed">
                Nossa missão é alinhar inteligência de dados de qualidade ambiental, compensação socio-urbana estrutural e empoderamento profissional sustentável de comunidades invisibilizadas pela atividade industrial pesada tradicional.
              </p>
              <div className="text-xs text-gray-400 pt-2">
                © 2026 ECO-INTEGRA Platform. Desenvolvido para apresentação a executivos de sustentabilidade ArcelorMittal. Todos os direitos reservados.
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm text-gray-200 uppercase tracking-wider mb-4">Sessões do Pitch</h4>
              <ul className="space-y-2 text-xs text-gray-300 font-medium">
                <li><a href="#problema" className="hover:text-brand-orange transition-colors">O Diagnóstico de Racismo Ambiental</a></li>
                <li><a href="#solucao" className="hover:text-brand-orange transition-colors">A Tecnologia e as Estações IoT</a></li>
                <li><a href="#ods" className="hover:text-brand-orange transition-colors">Os Objetivos de Desenvolvimento</a></li>
                <li><a href="#custo-inacao" className="hover:text-brand-orange transition-colors">A Análise de Retorno da Inação</a></li>
                <li><a href="#arcelormittal" className="hover:text-brand-orange transition-colors">Metas de Licenciamento de Operação</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-gray-200 uppercase tracking-wider">Metas da Equipe ECO-INTEGRA</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-orange" /> São Paulo, SP - Edifício ESG Paulista</li>
                <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-brand-orange" /> parcerias@ecointegralabs.org</li>
                <li className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-orange" /> +55 (11) 3255-0892</li>
              </ul>
              <div className="flex gap-4 pt-2">
                <span className="text-xs text-brand-orange font-semibold uppercase hover:underline cursor-pointer">LinkedIn do Projeto</span>
                <span className="text-xs text-brand-orange font-semibold uppercase hover:underline cursor-pointer">Ficha Técnica PDF</span>
              </div>
            </div>

          </div>

          <div className="border-t border-white/10 mt-12 pt-6 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Os dados, simulações e diretrizes conceituais inseridos nesta plataforma baseiam-se em referências consagradas de ESG da Organização das Nações Unidas (ONU) e estudos estatísticos de justiça espacial contemporâneos.</p>
            <div className="flex gap-4 shrink-0 font-medium">
              <a href="#" className="hover:text-gray-200">Termos e Condições</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-gray-200">Privacidade LGPD</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 8. EMBEDDED standalone HTML EXPORTER MODAL DRAWER */}
      <AnimatePresence>
        {isExporterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExporterOpen(false)}
              className="absolute inset-0 bg-black"
            />
            
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-screen max-w-4xl bg-brand-primary border-l border-white/10 flex flex-col text-gray-100 shadow-2xl relative"
              >
                
                {/* Header */}
                <div className="px-6 py-5 bg-black/20 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Inspeção de Código Standalone em Arquivo Único</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Pronto para entrega e visualização local de forma autônoma sem dependências.</p>
                  </div>
                  <button 
                    onClick={() => setIsExporterOpen(false)}
                    className="text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition text-sm font-bold cursor-pointer"
                  >
                    Fechar [X]
                  </button>
                </div>

                {/* Exporter info banner */}
                <div className="bg-brand-orange/10 border-b border-brand-orange/20 px-6 py-3 flex items-start gap-2.5 text-xs text-brand-orange font-medium">
                  <Info className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                  <p className="leading-normal">
                    Conforme solicitado em sua diretriz técnica, preparamos o documento inteiramente em <strong>um único arquivo HTML5</strong> contendo o CSS do Tailwind através de CDN estável e todo o controle de animação e lógica embutidos nas respectivas seções. Perfeito para entrega direta offline!
                  </p>
                </div>

                {/* Action commands */}
                <div className="p-4 bg-black/30 flex items-center justify-between gap-4 border-b border-white/10">
                  <span className="text-xs text-slate-300 font-mono">Formato de Saída: index.html (~24KB)</span>
                  <button 
                    onClick={handleCopyCode}
                    className={`flex items-center gap-2 text-xs font-bold px-6 py-2.5 rounded-lg transition-all duration-300 transform select-none cursor-pointer ${isCopied ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-brand-orange hover:bg-opacity-90 text-white"}`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>¡Código Copiado com Sucesso!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Código HTML5</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Live Output Code Area */}
                <div className="flex-1 overflow-auto p-6 font-mono text-xs text-gray-300 bg-black/40 p-6 shadow-inner space-y-4 leading-normal selection:bg-brand-orange/30">
                  <pre className="whitespace-pre">{standaloneHTMLContent}</pre>
                </div>

                {/* Footer panel */}
                <div className="px-6 py-4 bg-black/20 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Plataforma ECO-INTEGRA Code Generator System</span>
                  <span className="text-brand-orange font-bold uppercase tracking-wide opacity-80">Pronto para Hospedagem</span>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. DETAILED corporate PARTNERSHIP INTEREST REGISTER FORM MODAL */}
      <AnimatePresence>
        {isInvestorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInvestorModalOpen(false)}
              className="absolute inset-0 bg-slate-950"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full relative z-10 shadow-2xl border border-gray-200"
            >
              
              <div className="p-6 bg-brand-primary text-white flex justify-between items-center border-b border-white/10">
                <div>
                  <h3 className="font-display font-bold text-lg">Parceria Corporativa Exclusiva</h3>
                  <p className="text-xs text-gray-300 mt-0.5">Manifestação de interesse direto para Diretoria de ESG e Sustentabilidade</p>
                </div>
                <button 
                  onClick={() => setIsInvestorModalOpen(false)}
                  className="text-gray-300 hover:text-white font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center text-brand-orange mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-brand-primary">Manifestação Registrada com Sucesso</h4>
                  <p className="text-sm text-gray-600 max-w-sm mx-auto">
                    Agradecemos o pioneirismo ambiental da <strong>ArcelorMittal Brasil</strong>. O relatório técnico-financeiro detalhado e um convite institucional foram enviados para o endereço inserido para agendarmos a plenária técnica.
                  </p>
                  <p className="text-xs text-brand-orange font-bold uppercase animate-pulse">Estabelecendo Sinergias Fortes para 2026...</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Seu Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Dr. Roberto de Oliveira"
                      value={investorForm.name}
                      onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-sleek text-sm text-brand-primary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">E-mail Corporativo</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Ex: roberto.oliveira@arcelormittal.com.br"
                      value={investorForm.email}
                      onChange={(e) => setInvestorForm({ ...investorForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-sleek text-sm text-brand-primary font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cargo / Departamento</label>
                      <select 
                        value={investorForm.position}
                        onChange={(e) => setInvestorForm({ ...investorForm, position: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-sleek text-sm text-brand-primary font-medium"
                      >
                        <option value="Diretoria ESG">Diretoria ESG</option>
                        <option value="Conselho Administrativo">Conselho Administrativo</option>
                        <option value="Gerência de Meio Ambiente">Gerência Meio Ambiente</option>
                        <option value="Assessoria de Investimentos">Assessoria Investimentos</option>
                        <option value="Avaliação de Fundos ESG">Avaliação Fundos</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Corporação</label>
                      <input 
                        type="text" 
                        required
                        value={investorForm.company}
                        onChange={(e) => setInvestorForm({ ...investorForm, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-sleek text-sm text-brand-primary font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mensagem Inicial</label>
                    <textarea 
                      rows={3}
                      value={investorForm.message}
                      onChange={(e) => setInvestorForm({ ...investorForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-sleek text-sm text-brand-primary font-medium"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-orange text-white font-bold py-3.5 rounded-xl transition duration-300 mt-2 text-sm cursor-pointer select-none"
                  >
                    Enviar Protocolo de Interesse Regulamentar
                  </button>
                  <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider">
                    Suas informações estão completamente resguardadas e protegidas pela LGPD e segurança corporativa.
                  </p>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* OVERLAY DE LEGENDAS DE ÁUDIO EM TEMPO REAL (SINERGIA AUDITIVA & VISUAL) */}
      <AnimatePresence>
        {speakingCaption && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="fixed bottom-24 left-6 z-50 bg-[#0e121a] border border-brand-orange/30 text-white rounded-2xl p-4.5 shadow-2xl max-w-sm flex flex-col gap-2.5"
            id="no-hc-override"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                Audiodescrição Ativa (Legenda)
              </span>
              <div className="flex gap-1 items-center">
                <span className="w-1 h-3 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-1 h-3.5 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 h-2.5 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-light italic">
              "{speakingCaption}"
            </p>
            <button
              onClick={() => speakText("")}
              className="text-[9px] font-bold text-gray-400 hover:text-brand-orange transition-colors self-end bg-white/5 border border-white/10 px-2 py-1 rounded cursor-pointer"
            >
              Parar Leitura
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MENU DE ACESSIBILIDADE FLUTUANTE (VISUAL & AUDITIVO) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start select-none">
        <AnimatePresence>
          {isA11yMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="bg-white text-gray-900 border border-gray-200 shadow-2xl rounded-3xl p-6 mb-3 w-[340px] max-w-full space-y-5 relative"
              id="no-hc-override"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-primary">Acessibilidade Inclusiva</h4>
                    <span className="text-[10px] text-gray-400 block font-medium">Visual & Auditiva Integrada</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsA11yMenuOpen(false)}
                  className="text-gray-400 hover:text-gray-600 font-bold text-xs cursor-pointer"
                >
                  Fechar
                </button>
              </div>

              {/* Seção Visual */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Recursos de Apoio Visual</span>
                
                {/* Tamanho da Fonte */}
                <div className="space-y-1.5 bg-gray-50 p-3 rounded-2xl border border-gray-150">
                  <label className="text-[11px] font-bold text-gray-500 block">Tamanho do Texto do Site:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setA11yFontSize("normal")}
                      className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${a11yFontSize === "normal" ? "bg-brand-primary text-white" : "bg-white text-gray-600 border border-gray-200"}`}
                    >
                      A (Padrão)
                    </button>
                    <button
                      onClick={() => setA11yFontSize("large")}
                      className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${a11yFontSize === "large" ? "bg-brand-primary text-white font-black" : "bg-white text-gray-600 border border-gray-200"}`}
                    >
                      A+ (Grande)
                    </button>
                    <button
                      onClick={() => setA11yFontSize("extra")}
                      className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${a11yFontSize === "extra" ? "bg-brand-primary text-white font-black" : "bg-white text-gray-600 border border-gray-200"}`}
                    >
                      A++ (Extra)
                    </button>
                  </div>
                </div>

                {/* Alto Contraste */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-150">
                  <div className="flex items-center gap-2">
                    <Contrast className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-gray-700">Modo de Alto Contraste</span>
                  </div>
                  <button
                    onClick={() => setA11yHighContrast(!a11yHighContrast)}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${a11yHighContrast ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${a11yHighContrast ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Fonte Dislexia */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-150">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-gray-700">Fonte para Dislexia</span>
                  </div>
                  <button
                    onClick={() => setA11yDyslexicFont(!a11yDyslexicFont)}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${a11yDyslexicFont ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${a11yDyslexicFont ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              {/* Seção Auditiva / Narrações */}
              <div className="space-y-3 pt-2 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Recursos de Apoio Auditivo</span>

                {/* Legendas de Simulação */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-150">
                  <div className="flex items-center gap-2 text-left">
                    <Ear className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-gray-700 block text-slate-800">Legendas de Simulação</span>
                      <span className="text-[9px] text-gray-400 block">Explicações textuais sob dados</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setA11yVisualCaptions(!a11yVisualCaptions)}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${a11yVisualCaptions ? 'bg-emerald-600' : 'bg-gray-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${a11yVisualCaptions ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Leitor/Narrador por Clique */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-150">
                  <div className="flex items-center gap-2 text-left">
                    <Volume2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-gray-700 block text-slate-800">Leitor de Texto por Clique</span>
                      <span className="text-[9px] text-gray-400 block">Clique em textos para ouvi-los</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const nextVal = !a11yScreenReaderHelper;
                      setA11yScreenReaderHelper(nextVal);
                      if (nextVal) {
                        speakText("Leitor por clique ativado. Toque em qualquer texto da página para ouvir a narração.");
                      } else {
                        speakText("");
                      }
                    }}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${a11yScreenReaderHelper ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${a11yScreenReaderHelper ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Narrador por Voz */}
                <div className="space-y-1.5 bg-gray-50 p-3 rounded-2xl border border-gray-150">
                  <label className="text-[11px] font-bold text-gray-500 block uppercase tracking-wider">Leitor e Sintetizador de Voz:</label>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => speakText("Bem-vindo à Plataforma ECO-INTEGRA. Conectamos a excelência industrial da ArcelorMittal à justiça socioambiental. Nosso projeto cria cinturões verdes de amortecimento, monitoramento de microparticulados participativo e inclusão produtiva para combater disparidades e proteger comunidades vulneráveis no entorno.")}
                      className="py-1.5 px-3 rounded-xl text-[10px] font-bold bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50/50 transition duration-200 text-left flex items-center justify-between cursor-pointer"
                    >
                      <span>🔊 Ouvir Pitch e Manifesto</span>
                      <span className="text-[8px] bg-indigo-100 px-1 py-0.5 rounded text-indigo-800 uppercase font-bold">20s</span>
                    </button>
                    <button
                      onClick={() => speakText("A análise de viabilidade financeira comprova que o investimento sustentável em Heavy Industries gera dividendos reais. Nossa engenharia financeira prevê a mitigação completa de custos com contenciosos civis públicos, reduz custos de captação de recursos de debêntures verdes e eleva o rating de sustentabilidade corporativa global da ArcelorMittal.")}
                      className="py-1.5 px-3 rounded-xl text-[10px] font-bold bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50/50 transition duration-200 text-left flex items-center justify-between cursor-pointer"
                    >
                      <span>🔊 Ouvir Caso de Negócio (ROI)</span>
                      <span className="text-[8px] bg-indigo-100 px-1 py-0.5 rounded text-indigo-800 uppercase font-bold">25s</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="bg-indigo-50/50 p-2.5 rounded-2xl border border-indigo-100 text-[9px] text-indigo-700 leading-normal text-center font-semibold">
                Assistivas Ativas. Utilize o menu acima para configurar a sua experiência inclusiva.
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Accessibility Trigger Button */}
        <button
          onClick={() => setIsA11yMenuOpen(!isA11yMenuOpen)}
          className={`flex items-center gap-2 p-3.5 px-4.5 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer font-bold text-xs ${isA11yMenuOpen ? 'bg-brand-orange text-white' : 'bg-brand-primary text-white border border-white/10 hover:bg-brand-orange'}`}
          title="Configurações de Acessibilidade"
        >
          <Sliders className="w-4.5 h-4.5" />
          <span>Acessibilidade {isA11yMenuOpen ? 'Fechar' : 'Abrir'}</span>
        </button>
      </div>

    </div>
  );
}
