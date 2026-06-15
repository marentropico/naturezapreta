/**
 * EcoVoz - Script Principal e Injetor de Componentes Comuns
 * 
 * Este script é carregado em todas as páginas do portal. Ele faz:
 * 1. Injeção dinâmica do Cabeçalho (Header) e Rodapé (Footer) comuns.
 * 2. Injeção dinâmica do modal de Autenticação (AuthModal).
 * 3. Gerenciamento do estado da sessão do usuário ativo (Login / Logout).
 * 4. Ativação automática da classe 'ativo' no menu de navegação baseada no arquivo atual.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa a injeção do Header, Footer e Modal
  renderHeader();
  renderFooter();
  injectAuthModal();
  setActiveMenuItem();

  // Verifica se o usuário já está logado
  updateHeaderAuthUI();
});

/**
 * Determina qual página está ativa na URL e adiciona classe ativa no menu
 */
function setActiveMenuItem() {
  const path = window.location.pathname;
  const pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  
  const menuLinks = document.querySelectorAll('.menu-navegacao a, header nav a');
  menuLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === pageName) {
      link.classList.add('ativo');
    } else {
      link.classList.remove('ativo');
    }
  });
}

/**
 * Desenha o cabeçalho institucional EcoVoz
 */
function renderHeader() {
  const headerContainer = document.getElementById('header-compartilhado') || document.querySelector('header');
  if (!headerContainer) return;

  // Cria a estrutura HTML interna do Header
  headerContainer.innerHTML = `
    <div class="header-container">
      <div class="logo-area">
        <span class="logo-icon" role="img" aria-label="Folha com engrenagem">🌿</span>
        <a href="index.html" class="logo-text">EcoVoz <span class="logo-sub">Natureza Preta</span></a>
      </div>
      
      <nav class="menu-navegacao" role="navigation" aria-label="Menu Principal">
        <a href="index.html">Início</a>
        <a href="dores.html">Diagnóstico</a>
        <a href="mapa.html">Mapa</a>
        <a href="relatar.html">Relatar</a>
        <a href="solucoes.html">Soluções</a>
        <a href="dashboard.html">Painel ESG</a>
        <a href="sobre.html">Sobre</a>
        <a href="restrito.html" class="nav-restrita">Área Restrita</a>
      </nav>

      <div class="auth-control-area">
        <button type="button" id="btn-auth-trigger" class="btn-primary-header">
          Entrar
        </button>
      </div>
    </div>
  `;
}

/**
 * Desenha o rodapé institucional comum
 */
function renderFooter() {
  const footerContainer = document.getElementById('footer-compartilhado') || document.querySelector('footer');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col-info">
          <h3>EcoVoz &bull; Natureza Preta</h3>
          <p>Plataforma socioambiental de escuta ativa, georreferenciamento e governança contra o racismo ambiental.</p>
        </div>
        <div class="footer-col-links">
          <h4>Navegação</h4>
          <div class="links-grid">
            <a href="index.html">Início</a>
            <a href="dores.html">Diagnóstico</a>
            <a href="mapa.html">Mapa de Impactos</a>
            <a href="relatar.html">Registrar Ocorrência</a>
            <a href="solucoes.html">Banco de Soluções</a>
            <a href="dashboard.html">Painel ESG</a>
            <a href="sobre.html">Sobre</a>
          </div>
        </div>
        <div class="footer-col-legal">
          <h4>Selo ESG Corporativo</h4>
          <p>Projeto integrado em conformidade com a LGPD e a Agenda 2030 da ONU.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Projeto Integrador &bull; Liga STEAM / ArcelorMittal &bull; 2026</p>
      </div>
    </div>
  `;
}

/**
 * Atualiza o botão de login no Header com o nome do usuário logado ou "Entrar"
 */
function updateHeaderAuthUI() {
  const btnAuth = document.getElementById('btn-auth-trigger');
  if (!btnAuth) return;

  const activeUser = window.AppDB ? window.AppDB.getActiveUser() : null;

  if (activeUser) {
    btnAuth.innerHTML = `
      <span class="user-welcome">Olá, ${activeUser.name.split(' ')[0]}</span>
      <span class="logout-icon" title="Sair do Perfil">🚪 Sair</span>
    `;
    btnAuth.classList.add('btn-auth-logged');
    btnAuth.onclick = handleLogout;
  } else {
    btnAuth.innerHTML = 'Entrar';
    btnAuth.classList.remove('btn-auth-logged');
    btnAuth.onclick = openAuthModal;
  }
}

/**
 * Lógica do botão de logout
 */
function handleLogout() {
  if (confirm("Deseja realmente sair da plataforma?")) {
    if (window.AppDB) {
      window.AppDB.logoutUser();
    }
    updateHeaderAuthUI();
    
    // Se estiver na página restrita, redireciona para a Home
    if (window.location.pathname.includes('restrito.html')) {
      window.location.href = 'index.html';
    } else {
      window.location.reload();
    }
  }
}

/**
 * Abre o Modal de Autenticação
 */
function openAuthModal() {
  const modal = document.getElementById('auth-modal-overlay');
  if (modal) {
    modal.classList.add('modal-visible');
    // Reset para modo de login
    toggleAuthMode(true);
  }
}

/**
 * Fecha o Modal de Autenticação
 */
function closeAuthModal() {
  const modal = document.getElementById('auth-modal-overlay');
  if (modal) {
    modal.classList.remove('modal-visible');
  }
}

/**
 * Injeta dinamicamente o HTML do AuthModal no final da página
 */
function injectAuthModal() {
  if (document.getElementById('auth-modal-overlay')) return;

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'auth-modal-overlay';
  modalOverlay.className = 'modal-overlay';
  
  modalOverlay.innerHTML = `
    <div class="modal-card animate-scale-up" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <button type="button" class="modal-close-btn" id="btn-close-auth-modal" aria-label="Fechar modal">&times;</button>
      
      <div class="modal-content-wrapper">
        <div class="modal-header-text">
          <span class="modal-eyebrow">Acesso à Plataforma ESG</span>
          <h3 id="auth-modal-title">Entrar na Plataforma</h3>
          <p id="auth-modal-subtitle">Monitore e gerencie seus relatos e propostas socioambientais enviadas.</p>
        </div>

        <div id="auth-error-box" class="error-box" style="display: none;"></div>

        <!-- Formulário de Recuperação de Senha (inicialmente oculto) -->
        <form id="form-forgot-password" style="display: none;" class="modal-form">
          <div class="form-group">
            <label for="forgot-email">E-mail Cadastrado *</label>
            <input type="email" id="forgot-email" required placeholder="exemplo@email.com">
          </div>
          <button type="submit" class="btn-submit-form">Enviar Link de Recuperação</button>
          <button type="button" id="btn-back-to-login" class="btn-link-secundario">Voltar para o Login</button>
        </form>

        <!-- Formulário de Sucesso na Recuperação (inicialmente oculto) -->
        <div id="forgot-success-box" style="display: none;" class="success-box">
          <span>✔️</span>
          <h4>Link Enviado!</h4>
          <p>Instruções para redefinição foram enviadas para seu e-mail.</p>
          <button type="button" id="btn-forgot-done" class="btn-submit-form">Voltar ao Login</button>
        </div>

        <!-- Formulário Principal: Login / Cadastro -->
        <form id="form-auth-principal" class="modal-form">
          <div class="form-group" id="group-signup-name" style="display: none;">
            <label for="auth-name">Seu Nome Completo *</label>
            <input type="text" id="auth-name" placeholder="Ex: Maria Santos">
          </div>

          <div class="form-group">
            <label for="auth-email">E-mail *</label>
            <input type="email" id="auth-email" required placeholder="exemplo@email.com">
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="auth-password">Senha de acesso *</label>
              <button type="button" id="btn-forgot-trigger" class="btn-link-secundario">Esqueci a senha?</button>
            </div>
            <div class="password-input-wrapper">
              <input type="password" id="auth-password" required placeholder="Mínimo 6 caracteres">
              <button type="button" id="btn-toggle-password" class="btn-password-eye" aria-label="Mostrar senha">👁️</button>
            </div>
          </div>

          <div class="form-group lgpd-group" id="group-signup-lgpd" style="display: none;">
            <input type="checkbox" id="auth-lgpd-checkbox">
            <label for="auth-lgpd-checkbox">
              Aceito os termos de consentimento da <strong>LGPD</strong>. Autorizo o armazenamento do meu nome e e-mail para autenticação de relatos.
            </label>
          </div>

          <button type="submit" id="btn-auth-submit" class="btn-submit-form">Efetuar Login</button>
        </form>

        <div class="modal-toggle-footer">
          <p id="toggle-auth-prompt">
            Não possui uma conta corporativa? 
            <button type="button" id="btn-toggle-auth-mode">Cadastre-se agora mesmo</button>
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  // Bind dos eventos
  document.getElementById('btn-close-auth-modal').onclick = closeAuthModal;
  document.getElementById('btn-toggle-password').onclick = togglePasswordVisibility;
  document.getElementById('btn-toggle-auth-mode').onclick = () => toggleAuthMode(false);
  document.getElementById('btn-forgot-trigger').onclick = () => showForgotPasswordForm(true);
  document.getElementById('btn-back-to-login').onclick = () => showForgotPasswordForm(false);
  document.getElementById('btn-forgot-done').onclick = () => {
    showForgotPasswordForm(false);
    document.getElementById('forgot-success-box').style.display = 'none';
  };

  // Submit do formulário esqueci senha
  document.getElementById('form-forgot-password').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    console.log(`Recuperação enviada para: ${email}`);
    document.getElementById('form-forgot-password').style.display = 'none';
    document.getElementById('forgot-success-box').style.display = 'block';
  };

  // Submit do formulário principal (Login/Cadastro)
  document.getElementById('form-auth-principal').onsubmit = handleAuthFormSubmit;
}

/**
 * Alterna a visualização da senha
 */
function togglePasswordVisibility() {
  const pwdInput = document.getElementById('auth-password');
  const eyeBtn = document.getElementById('btn-toggle-password');
  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    eyeBtn.textContent = '🙈';
  } else {
    pwdInput.type = 'password';
    eyeBtn.textContent = '👁️';
  }
}

/**
 * Alterna entre modo Login e modo Cadastro
 */
function toggleAuthMode(isLoginMode) {
  const title = document.getElementById('auth-modal-title');
  const subtitle = document.getElementById('auth-modal-subtitle');
  const nameGroup = document.getElementById('group-signup-name');
  const lgpdGroup = document.getElementById('group-signup-lgpd');
  const forgotBtn = document.getElementById('btn-forgot-trigger');
  const submitBtn = document.getElementById('btn-auth-submit');
  const togglePrompt = document.getElementById('toggle-auth-prompt');
  
  // Limpa erros anteriores
  const errorBox = document.getElementById('auth-error-box');
  errorBox.style.display = 'none';

  if (isLoginMode) {
    title.textContent = 'Entrar na Plataforma';
    subtitle.textContent = 'Monitore e gerencie seus relatos e propostas socioambientais enviadas.';
    nameGroup.style.display = 'none';
    lgpdGroup.style.display = 'none';
    forgotBtn.style.display = 'inline-block';
    submitBtn.textContent = 'Efetuar Login';
    togglePrompt.innerHTML = `
      Não possui uma conta corporativa? 
      <button type="button" id="btn-toggle-auth-mode-inner">Cadastre-se agora mesmo</button>
    `;
    document.getElementById('btn-toggle-auth-mode-inner').onclick = () => toggleAuthMode(false);
  } else {
    title.textContent = 'Criar Conta de Acesso';
    subtitle.textContent = 'Cadastre-se para gerenciar seus relatos territoriais e propostas.';
    nameGroup.style.display = 'block';
    lgpdGroup.style.display = 'flex';
    forgotBtn.style.display = 'none';
    submitBtn.textContent = 'Finalizar Cadastro';
    togglePrompt.innerHTML = `
      Já possui uma conta ativa? 
      <button type="button" id="btn-toggle-auth-mode-inner">Acesse o Painel</button>
    `;
    document.getElementById('btn-toggle-auth-mode-inner').onclick = () => toggleAuthMode(true);
  }
}

/**
 * Alterna para o formulário de Esqueci Senha
 */
function showForgotPasswordForm(showForgot) {
  const forgotForm = document.getElementById('form-forgot-password');
  const principalForm = document.getElementById('form-auth-principal');
  const toggleFooter = document.querySelector('.modal-toggle-footer');
  const title = document.getElementById('auth-modal-title');
  const subtitle = document.getElementById('auth-modal-subtitle');

  const errorBox = document.getElementById('auth-error-box');
  errorBox.style.display = 'none';

  if (showForgot) {
    title.textContent = 'Recuperar Senha';
    subtitle.textContent = 'Informe o e-mail cadastrado para redefinir as credenciais.';
    forgotForm.style.display = 'block';
    principalForm.style.display = 'none';
    toggleFooter.style.display = 'none';
  } else {
    forgotForm.style.display = 'none';
    principalForm.style.display = 'block';
    toggleFooter.style.display = 'block';
    toggleAuthMode(true);
  }
}

/**
 * Processamento do envio do formulário de autenticação
 */
function handleAuthFormSubmit(e) {
  e.preventDefault();
  const errorBox = document.getElementById('auth-error-box');
  errorBox.style.display = 'none';

  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  
  // Descobre se estamos no cadastro ou no login verificando se o campo nome está visível
  const isRegister = document.getElementById('group-signup-name').style.display === 'block';

  if (isRegister) {
    const name = document.getElementById('auth-name').value;
    const lgpdConsent = document.getElementById('auth-lgpd-checkbox').checked;

    if (!name.trim()) {
      errorBox.textContent = 'Por favor, preencha o seu nome completo.';
      errorBox.style.display = 'block';
      return;
    }

    if (!lgpdConsent) {
      errorBox.textContent = 'De acordo com a LGPD, você deve aceitar os termos de consentimento para efetuar seu cadastro.';
      errorBox.style.display = 'block';
      return;
    }

    if (password.length < 6) {
      errorBox.textContent = 'A senha deve ter pelo menos 6 caracteres.';
      errorBox.style.display = 'block';
      return;
    }

    // Registra via AppDB
    const result = window.AppDB.registerUser({
      id: 'user-' + Date.now(),
      name,
      email: email.toLowerCase(),
      password
    });

    if (!result.success) {
      errorBox.textContent = result.message;
      errorBox.style.display = 'block';
    } else {
      // Efetua login automático
      window.AppDB.loginUser(email, password);
      closeAuthModal();
      updateHeaderAuthUI();
      window.location.reload();
    }
  } else {
    // Modo Login
    const result = window.AppDB.loginUser(email, password);
    if (!result.success) {
      errorBox.textContent = result.message;
      errorBox.style.display = 'block';
    } else {
      closeAuthModal();
      updateHeaderAuthUI();
      window.location.reload();
    }
  }
}
