/**
 * EcoVoz - Módulo de Acessibilidade e Inclusão e-MAG v1.5
 * 
 * Este arquivo injeta o botão flutuante e o painel de acessibilidade.
 * Ele gerencia o estado das preferências do usuário no localStorage para persistência entre páginas.
 * 
 * Recursos suportados:
 * - Alto Contraste (Cores invertidas / Amarelo e Preto)
 * - Escala de cinzas (Grayscale)
 * - Escala de tamanho de fonte dinâmica (Zoom)
 * - Régua de leitura que acompanha a posição Y do cursor do mouse
 * - Legibilidade simples (Fonte de dislexia com espaçamento estendido)
 * - Destaque visual (Sublinhado de links e botões)
 * - Síntese de voz em português (Lê textos selecionados, focados ou sob o mouse)
 * - Atalhos e-MAG de teclado com Alt + Números (1 a 9)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa preferências guardadas no localStorage
  loadAccessibilityPreferences();
  
  // Injeta a estrutura do botão flutuante e painel na página
  injectAccessibilityUI();
  
  // Registra atalhos de teclado globais
  initKeyboardShortcuts();
});

// Variáveis de Estado Local
let accessState = {
  contrast: 'normal', // normal | high-contrast | grayscale
  fontScale: 1.0,     // 0.85 a 1.3
  speechSynthesis: false,
  underlineLinks: false,
  dyslexiaFont: false,
  readingGuide: false
};

// Posição vertical para a régua visual
let mouseY = 0;

/**
 * Carrega e aplica as preferências de acessibilidade armazenadas
 */
function loadAccessibilityPreferences() {
  try {
    const saved = localStorage.getItem('esg_acessibilidade_preferencias');
    if (saved) {
      accessState = { ...accessState, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error("Falha ao recuperar preferências de acessibilidade", e);
  }

  // Aplica as classes e estilos ao documento imediatamente
  applyAccessibilityStyles();
}

/**
 * Salva as preferências correntes e as persiste
 */
function saveAccessibilityPreferences() {
  localStorage.setItem('esg_acessibilidade_preferencias', JSON.stringify(accessState));
  applyAccessibilityStyles();
}

/**
 * Aplica os estilos no document.documentElement e body baseados no estado ativo
 */
function applyAccessibilityStyles() {
  const root = document.documentElement;
  const body = document.body;

  // 1. Contraste
  root.classList.remove('high-contrast-root', 'grayscale-root');
  body.classList.remove('high-contrast-root', 'grayscale-root');
  if (accessState.contrast === 'high-contrast') {
    root.classList.add('high-contrast-root');
    body.classList.add('high-contrast-root');
  } else if (accessState.contrast === 'grayscale') {
    root.classList.add('grayscale-root');
    body.classList.add('grayscale-root');
  }

  // 2. Zoom da Fonte
  root.style.fontSize = `${accessState.fontScale}rem`;

  // 3. Sublinhar Links
  if (accessState.underlineLinks) {
    body.classList.add('underline-links-root');
  } else {
    body.classList.remove('underline-links-root');
  }

  // 4. Fonte de fácil leitura
  if (accessState.dyslexiaFont) {
    body.classList.add('dyslexia-font-root');
  } else {
    body.classList.remove('dyslexia-font-root');
  }

  // 5. Régua de Leitura
  toggleReadingGuideLine(accessState.readingGuide);

  // 6. Síntese de Voz
  toggleSpeechSynthesisListeners(accessState.speechSynthesis);
}

/**
 * Cria ou remove a régua visual horizontal
 */
function toggleReadingGuideLine(enable) {
  let guide = document.getElementById('reading-guide-bar');
  
  if (enable) {
    if (!guide) {
      guide = document.createElement('div');
      guide.id = 'reading-guide-bar';
      guide.style.position = 'fixed';
      guide.style.left = '0';
      guide.style.right = '0';
      guide.style.height = '14px';
      guide.style.backgroundColor = 'rgba(47, 107, 79, 0.2)';
      guide.style.borderTop = '1px solid rgba(47, 107, 79, 0.4)';
      guide.style.borderBottom = '1px solid rgba(47, 107, 79, 0.4)';
      guide.style.pointerEvents = 'none';
      guide.style.zIndex = '9999';
      guide.style.mixBlendMode = 'multiply';
      document.body.appendChild(guide);
    }
    
    // Atualiza a posição no mousemove
    window.addEventListener('mousemove', updateGuidePosition);
  } else {
    if (guide) {
      guide.remove();
    }
    window.removeEventListener('mousemove', updateGuidePosition);
  }
}

function updateGuidePosition(e) {
  const guide = document.getElementById('reading-guide-bar');
  if (guide) {
    guide.style.top = `${e.clientY - 7}px`;
  }
}

/**
 * Gerenciador da Síntese de Voz (TTS)
 */
function toggleSpeechSynthesisListeners(enable) {
  if (enable) {
    document.addEventListener('mouseover', handleTextHoverSpeech);
    document.addEventListener('focusin', handleTextFocusSpeech);
  } else {
    document.removeEventListener('mouseover', handleTextHoverSpeech);
    document.removeEventListener('focusin', handleTextFocusSpeech);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

function speakText(text) {
  if (!accessState.speechSynthesis || !window.speechSynthesis) return;
  
  // Limpa o som em andamento antes de falar
  window.speechSynthesis.cancel();

  // Limpa caracteres especiais/emojis
  const clean = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
  if (!clean) return;

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = 'pt-BR';
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
}

function handleTextHoverSpeech(e) {
  const target = e.target;
  if (!target) return;

  // Filtra elementos para leitura inteligível
  const matches = target.closest('h1, h2, h3, h4, h5, h6, p, button, label, select, input, textarea, strong, span, li');
  if (matches) {
    const text = matches.textContent || matches.getAttribute('placeholder') || '';
    if (text.trim()) {
      speakText(text);
    }
  }
}

function handleTextFocusSpeech(e) {
  const target = e.target;
  if (!target) return;
  const text = target.getAttribute('aria-label') || target.textContent || target.getAttribute('placeholder') || '';
  if (text.trim()) {
    speakText(text);
  }
}

/**
 * Cria a live-region invisível para leitores de tela nativos
 */
function announceToScreenReader(message) {
  let announcer = document.getElementById('sr-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('aria-live', 'assertive');
    announcer.style.position = 'absolute';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.padding = '0';
    announcer.style.overflow = 'hidden';
    announcer.style.clip = 'rect(0,0,0,0)';
    announcer.style.border = '0';
    document.body.appendChild(announcer);
  }
  announcer.textContent = '';
  setTimeout(() => {
    if (announcer) announcer.textContent = message;
  }, 100);
}

/**
 * Registra os atalhos de teclado Alt + Número para navegar entre as seções/páginas
 */
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (e.altKey) {
      let targetPage = '';
      if (e.key === '1') targetPage = 'index.html';
      else if (e.key === '2') targetPage = 'mapa.html';
      else if (e.key === '3') targetPage = 'relatar.html';
      else if (e.key === '4') targetPage = 'solucoes.html';
      else if (e.key === '5') targetPage = 'dashboard.html';
      else if (e.key === '6') targetPage = 'dores.html';
      else if (e.key === '7') targetPage = 'sobre.html';
      else if (e.key === '9') {
        e.preventDefault();
        toggleAccessibilityPanel();
        return;
      }

      if (targetPage) {
        e.preventDefault();
        announceToScreenReader(`Navegando via atalho de teclado para página: ${targetPage}`);
        setTimeout(() => {
          window.location.href = targetPage;
        }, 150);
      }
    }
  });
}

/**
 * Abre ou fecha o menu lateral de acessibilidade
 */
function toggleAccessibilityPanel() {
  const panel = document.getElementById('accessibility-panel');
  if (panel) {
    const isVisible = panel.classList.toggle('panel-visible');
    announceToScreenReader(isVisible ? "Painel de acessibilidade aberto" : "Painel de acessibilidade fechado");
  }
}

/**
 * Injeta o botão flutuante e o Painel de Acessibilidade
 */
function injectAccessibilityUI() {
  if (document.getElementById('accessibility-trigger-container')) return;

  // 1. Botão Flutuante (Bottom-Right)
  const container = document.createElement('div');
  container.id = 'accessibility-trigger-container';
  container.className = 'access-float-container';
  container.innerHTML = `
    <button type="button" id="btn-accessibility-trigger" class="access-trigger-btn" aria-haspopup="true" aria-label="Menu de Acessibilidade (Atalho Alt+9)">
      <svg xmlns="http://www.w3.org/2000/svg" class="access-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="5" r="1.5"></circle>
        <path d="m9 22 2-6H9l1-5h4l1 5h-2l2 6"></path>
        <path d="M6 12h12"></path>
      </svg>
      <span class="btn-text">Acessibilidade</span>
    </button>
  `;
  document.body.appendChild(container);

  // 2. Painel Lateral de Opções
  const panel = document.createElement('div');
  panel.id = 'accessibility-panel';
  panel.className = 'access-side-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'access-title');

  panel.innerHTML = `
    <div class="panel-header">
      <div class="panel-header-title">
        <span class="icon">♿</span>
        <h2 id="access-title">Menu de Acessibilidade</h2>
      </div>
      <button type="button" id="btn-close-accessibility" class="btn-close-panel" aria-label="Fechar">&times;</button>
    </div>

    <div class="panel-body">
      <p class="panel-intro">Personalize a renderização do portal corporativo para obter melhor legibilidade e conformidade inclusiva.</p>
      
      <!-- Contraste -->
      <div class="control-section">
        <span class="control-label">Estilo de Contraste</span>
        <div class="btn-group-contrast">
          <button type="button" id="btn-contrast-normal" class="btn-contrast">Padrão</button>
          <button type="button" id="btn-contrast-high" class="btn-contrast btn-contrast-black-yellow">Alto Contraste</button>
          <button type="button" id="btn-contrast-gray" class="btn-contrast btn-contrast-grayscale">Monocromático</button>
        </div>
      </div>

      <!-- Zoom Fonte -->
      <div class="control-section">
        <span class="control-label">Tamanho da Fonte</span>
        <div class="zoom-selector-wrapper">
          <span class="zoom-desc">Zoom atual: <strong id="lbl-zoom-pct" class="accent-text">100%</strong></span>
          <div class="zoom-btn-row">
            <button type="button" id="btn-zoom-out" title="Diminuir Fonte">A-</button>
            <button type="button" id="btn-zoom-reset" title="Tamanho Padrão">Reset</button>
            <button type="button" id="btn-zoom-in" title="Aumentar Fonte">A+</button>
          </div>
        </div>
      </div>

      <!-- Síntese de Voz (TTS) -->
      <div class="toggle-section">
        <div class="toggle-info">
          <span class="toggle-title">Leitor de Tela de Voz</span>
          <span class="toggle-sub">Sintetiza em áudio os textos ao focar/pairar o mouse</span>
        </div>
        <button type="button" id="chk-speech-synthesis" class="access-switch-btn" role="switch" aria-checked="false" aria-label="Ativar leitura por síntese de voz">
          <span class="switch-thumb"></span>
        </button>
      </div>

      <!-- Destacar Links -->
      <div class="toggle-section">
        <div class="toggle-info">
          <span class="toggle-title">Destacar Links do Portal</span>
          <span class="toggle-sub">Sublinha com clareza botões e links navegáveis</span>
        </div>
        <button type="button" id="chk-underline-links" class="access-switch-btn" role="switch" aria-checked="false" aria-label="Sublinhar links">
          <span class="switch-thumb"></span>
        </button>
      </div>

      <!-- Legibilidade Simples -->
      <div class="toggle-section">
        <div class="toggle-info">
          <span class="toggle-title">Legibilidade Simples</span>
          <span class="toggle-sub">Aumenta o espaçamento das letras e altera a fonte</span>
        </div>
        <button type="button" id="chk-dyslexia-font" class="access-switch-btn" role="switch" aria-checked="false" aria-label="Ativar fonte de fácil leitura">
          <span class="switch-thumb"></span>
        </button>
      </div>

      <!-- Régua de Leitura -->
      <div class="toggle-section">
        <div class="toggle-info">
          <span class="toggle-title">Guia Dinâmico de Leitura</span>
          <span class="toggle-sub">Régua horizontal de apoio visual</span>
        </div>
        <button type="button" id="chk-reading-guide" class="access-switch-btn" role="switch" aria-checked="false" aria-label="Ativar régua de leitura">
          <span class="switch-thumb"></span>
        </button>
      </div>

      <!-- Atalhos de Teclado -->
      <div class="shortcuts-helper">
        <button type="button" id="btn-toggle-shortcuts-info" class="btn-toggle-shortcuts">
          ⌨️ Teclado e Atalhos Rápidos
        </button>
        <div id="shortcuts-info-details" style="display: none;" class="shortcuts-list-details">
          <div class="shortcut-item"><kbd>Alt + 1</kbd> <span>Ir para Início / Principal</span></div>
          <div class="shortcut-item"><kbd>Alt + 2</kbd> <span>Ir para o Mapa de Ocorrências</span></div>
          <div class="shortcut-item"><kbd>Alt + 3</kbd> <span>Ir para Relatar Incidente</span></div>
          <div class="shortcut-item"><kbd>Alt + 4</kbd> <span>Ir para Banco de Soluções</span></div>
          <div class="shortcut-item"><kbd>Alt + 5</kbd> <span>Ir para Painel ESG</span></div>
          <div class="shortcut-item"><kbd>Alt + 6</kbd> <span>Ir para Diagnóstico e Dores</span></div>
          <div class="shortcut-item"><kbd>Alt + 7</kbd> <span>Ir para Sobre / ODS</span></div>
          <div class="shortcut-item"><kbd>Alt + 9</kbd> <span>Abrir / Fechar este menu</span></div>
          <div class="shortcut-item"><kbd>Tab</kbd> <span>Navegar sequencialmente nos botões</span></div>
          <div class="shortcut-item"><kbd>Enter / Espaço</kbd> <span>Ativar elementos focados</span></div>
        </div>
      </div>
    </div>
    
    <div class="panel-footer">
      <span>ESG COMPLIANCE PORTAL v1.5</span>
    </div>
  `;
  document.body.appendChild(panel);

  // Bind dos Eventos Visuais
  document.getElementById('btn-accessibility-trigger').onclick = toggleAccessibilityPanel;
  document.getElementById('btn-close-accessibility').onclick = toggleAccessibilityPanel;

  // Ações de Contraste
  document.getElementById('btn-contrast-normal').onclick = () => setContrast('normal');
  document.getElementById('btn-contrast-high').onclick = () => setContrast('high-contrast');
  document.getElementById('btn-contrast-gray').onclick = () => setContrast('grayscale');

  // Ações de Zoom
  document.getElementById('btn-zoom-out').onclick = () => adjustZoom('out');
  document.getElementById('btn-zoom-reset').onclick = () => adjustZoom('reset');
  document.getElementById('btn-zoom-in').onclick = () => adjustZoom('in');

  // Ações de Toggles (Switch buttons)
  document.getElementById('chk-speech-synthesis').onclick = () => toggleBooleanPreference('speechSynthesis', 'chk-speech-synthesis', 'Leitura por voz');
  document.getElementById('chk-underline-links').onclick = () => toggleBooleanPreference('underlineLinks', 'chk-underline-links', 'Sublinhar links');
  document.getElementById('chk-dyslexia-font').onclick = () => toggleBooleanPreference('dyslexiaFont', 'chk-dyslexia-font', 'Legibilidade simples');
  document.getElementById('chk-reading-guide').onclick = () => toggleBooleanPreference('readingGuide', 'chk-reading-guide', 'Régua de leitura');

  // Atalhos help
  document.getElementById('btn-toggle-shortcuts-info').onclick = () => {
    const details = document.getElementById('shortcuts-info-details');
    const isHidden = details.style.display === 'none';
    details.style.display = isHidden ? 'block' : 'none';
  };

  // Inicializa o estado dos botões de controle de acordo com accessState carregado
  updatePanelButtonsUI();
}

/**
 * Atualiza o estado visual dos controles dentro do painel lateral
 */
function updatePanelButtonsUI() {
  // 1. Contraste ativo
  document.querySelectorAll('.btn-contrast').forEach(btn => btn.classList.remove('active'));
  if (accessState.contrast === 'normal') document.getElementById('btn-contrast-normal').classList.add('active');
  else if (accessState.contrast === 'high-contrast') document.getElementById('btn-contrast-high').classList.add('active');
  else if (accessState.contrast === 'grayscale') document.getElementById('btn-contrast-gray').classList.add('active');

  // 2. Zoom pct
  document.getElementById('lbl-zoom-pct').textContent = `${Math.round(accessState.fontScale * 100)}%`;

  // 3. Switches
  updateSwitchButtonUI('chk-speech-synthesis', accessState.speechSynthesis);
  updateSwitchButtonUI('chk-underline-links', accessState.underlineLinks);
  updateSwitchButtonUI('chk-dyslexia-font', accessState.dyslexiaFont);
  updateSwitchButtonUI('chk-reading-guide', accessState.readingGuide);
}

function updateSwitchButtonUI(buttonId, value) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  btn.setAttribute('aria-checked', value ? 'true' : 'false');
  if (value) {
    btn.classList.add('switch-checked');
  } else {
    btn.classList.remove('switch-checked');
  }
}

/**
 * Define e aplica o contraste
 */
function setContrast(mode) {
  accessState.contrast = mode;
  saveAccessibilityPreferences();
  updatePanelButtonsUI();
  const msg = mode === 'high-contrast' ? 'Alto Contraste ativado' : mode === 'grayscale' ? 'Grayscale ativado' : 'Contraste Padrão ativado';
  announceToScreenReader(msg);
}

/**
 * Ajusta o zoom
 */
function adjustZoom(direction) {
  if (direction === 'in') {
    accessState.fontScale = Math.min(1.3, accessState.fontScale + 0.05);
  } else if (direction === 'out') {
    accessState.fontScale = Math.max(0.85, accessState.fontScale - 0.05);
  } else {
    accessState.fontScale = 1.0;
  }
  saveAccessibilityPreferences();
  updatePanelButtonsUI();
  announceToScreenReader(`Tamanho de letra ajustado para ${Math.round(accessState.fontScale * 100)}%`);
}

/**
 * Controla os switches booleanos genéricos
 */
function toggleBooleanPreference(propName, buttonId, labelMsg) {
  accessState[propName] = !accessState[propName];
  saveAccessibilityPreferences();
  updatePanelButtonsUI();
  announceToScreenReader(`${labelMsg} ${accessState[propName] ? 'ativado' : 'desativado'}`);
}
