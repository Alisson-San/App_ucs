document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Lógica da Tela de Login (index.html)
       ========================================= */
    const loginForm = document.getElementById('loginForm');
    const toggleBtn = document.getElementById('toggleBtn');
    const passwordInput = document.getElementById('password');

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Troca o ícone (olho cortado para olho normal)
            const iconSpan = this.querySelector('span');
            iconSpan.textContent = type === 'password' ? 'visibility_off' : 'visibility';
        });
    }

    // Redirecionamento ao enviar o login
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita recarregar a página
            const submitBtn = document.getElementById('submitBtn');
            
            submitBtn.textContent = 'Autenticando...';
            submitBtn.style.opacity = '0.8';

            // Simula um carregamento de 1 segundo e redireciona para a home
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        });
    }

    /* =========================================
       Lógica do Sistema de Modais (home.html)
       ========================================= */
    const modal = document.getElementById('myModal');
    const btnChamada = document.getElementById('btnChamada');
    const closeBtns = document.querySelectorAll('.close-modal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    // Função para abrir o modal alterando textos
    function openModal(title, message) {
        if (!modal) return;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        modal.classList.add('active');
    }

    // Função para fechar o modal
    function closeModal() {
        if (modal) modal.classList.remove('active');
    }

    // Evento: Botão Responder Chamada
    if (btnChamada) {
        btnChamada.addEventListener('click', () => {
            openModal("Presença Registrada!", "Sua presença foi computada no sistema. Boa aula!");
        });
    }

    // Evento: Botões do menu que ainda não tem página (Agenda, Perfil)
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Evita seguir o link vazio (#)
            openModal("Em Desenvolvimento", "Esta página será adicionada em breve usando este mesmo formato modular.");
        });
    });

    // Eventos para fechar o modal (Botão 'Entendi' ou clicando fora do card)
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(); // Fecha se clicar no fundo escuro
        });
    }

});

/* =========================================
       Sistema de Tradução Funcional (i18n)
       ========================================= */
    
    // 1. Dicionário de Idiomas
    const translations = {
        pt: {
            topbar_title: "Universidade de Caxias do Sul",
            subtitle: "Universidade de Caxias do Sul",
            user_ph: "Usuário",
            pass_ph: "Senha",
            remember: "Lembrar meu usuário",
            login_btn: "ENTRAR",
            forgot_pass: "Esqueci a minha senha",
            first_access: "Políticas de Privacidade",
            instructions: "* O 'Usuário' para acadêmicos com matrícula a partir de 2011 é o RA. Acadêmicos com matrícula anterior devem utilizar o número da matrícula. Outros usuários devem utilizar o CPF ou passaporte."
        },
        en: {
            topbar_title: "University of Caxias do Sul",
            subtitle: "University of Caxias do Sul",
            user_ph: "Username",
            pass_ph: "Password",
            remember: "Remember my username",
            login_btn: "LOGIN",
            forgot_pass: "Forgot my password",
            first_access: "First access? / Student without RA",
            instructions: "* The 'Username' for students enrolled from 2011 onwards is the RA. Students enrolled prior to that must use their enrollment number. Other users must use their CPF or passport."
        }
    };

    // 2. Função que aplica a tradução na tela
    function setLanguage(lang) {
        // Traduz os textos normais
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Traduz os placeholders (textos de fundo das caixas de input)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    // 3. Evento de clique nos botões de bandeira
    const langButtons = document.querySelectorAll('.lang-btn'); // <--- Aqui está o langButtons!
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe 'active' de todos
            langButtons.forEach(b => b.classList.remove('active'));
            // Adiciona a classe 'active' no botão clicado
            this.classList.add('active');
            
            // Pega o idioma selecionado (pt ou en) no data-lang do botão HTML
            const selectedLang = this.getAttribute('data-lang');
            
            // Chama a função de tradução
            setLanguage(selectedLang);
        });
    });