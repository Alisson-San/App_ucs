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
                window.location.href = '/HTML/home.html';
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


    /* =========================================
       Lógica do Menu Lateral (Drawer de Perfil)
       ========================================= */
    const btnPerfil = document.getElementById('btnPerfil');
    const profileDrawer = document.getElementById('profileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');

    // Função para abrir o menu
    function openDrawer(e) {
        if(e) e.preventDefault(); // Evita recarregar a tela
        profileDrawer.classList.add('active');
        drawerOverlay.classList.add('active');
    }

    // Função para fechar o menu
    function closeDrawer() {
        profileDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
    }

    // Eventos de clique
    if(btnPerfil) btnPerfil.addEventListener('click', openDrawer);
    if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if(drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer); // Fecha ao clicar no fundo escuro

    /* =========================================
       Lógica da Caixa de Notificações
       ========================================= */
    const msgTriggers = document.querySelectorAll('.msg-trigger');
    const readMsgModal = document.getElementById('readMsgModal');
    
    // Elementos dentro do Modal que vão receber o texto
    const modalSender = document.getElementById('modalMsgSender');
    const modalDate = document.getElementById('modalMsgDate');
    const modalSubject = document.getElementById('modalMsgSubject');
    const modalBody = document.getElementById('modalMsgBody');

    const closeMsgBtns = document.querySelectorAll('.close-msg-btn');

    if(msgTriggers.length > 0 && readMsgModal) {
        msgTriggers.forEach(card => {
            card.addEventListener('click', function() {
                // 1. Pega os dados escondidos no HTML da mensagem clicada
                const sender = this.getAttribute('data-sender');
                const date = this.getAttribute('data-date');
                const subject = this.getAttribute('data-subject');
                const body = this.getAttribute('data-body');

                // 2. Preenche o Modal com esses dados
                modalSender.textContent = sender;
                modalDate.textContent = date;
                modalSubject.textContent = subject;
                modalBody.textContent = body;

                // 3. Marca a mensagem como lida visualmente (tira o negrito)
                this.classList.remove('unread');

                // 4. Abre o Modal
                readMsgModal.classList.add('active');
            });
        });

        // Eventos para fechar o modal de leitura
        closeMsgBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                readMsgModal.classList.remove('active');
            });
        });

        // Fecha se clicar fora da caixa do modal
        readMsgModal.addEventListener('click', (e) => {
            if(e.target === readMsgModal) {
                readMsgModal.classList.remove('active');
            }
        });
    }

    /* =========================================
       Lógica do Mapa Interativo
       ========================================= */
    const campusBtns = document.querySelectorAll('.campus-btn');
    const mapImage = document.getElementById('mapImage');
    
    // Variáveis de controle de Zoom
    let currentZoom = 1;
    const zoomStep = 0.3; // O quanto aumenta por clique
    const maxZoom = 3;    // Zoom máximo (3x)
    const minZoom = 1;    // Zoom mínimo (Tamanho original)

    // 1. Troca de Campus
    if(campusBtns.length > 0 && mapImage) {
        campusBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Atualiza visual dos botões
                campusBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Troca a imagem do mapa com base no data-map
                const newSrc = this.getAttribute('data-map');
                mapImage.src = newSrc;
                
                // Reseta o zoom ao trocar de mapa
                resetZoom();
            });
        });
    }

    // 2. Controles de Zoom
    const btnZoomIn = document.getElementById('btnZoomIn');
    const btnZoomOut = document.getElementById('btnZoomOut');
    const btnZoomReset = document.getElementById('btnZoomReset');

    function applyZoom() {
        if(mapImage) {
            // Aplica a transformação CSS para aumentar a imagem
            mapImage.style.transform = `scale(${currentZoom})`;
            
            // Se o zoom for maior que 1, garantimos que a imagem cresça do topo/esquerda 
            // para gerar a barra de rolagem corretamente
            if(currentZoom > 1) {
                mapImage.style.transformOrigin = "top left";
                mapImage.style.maxWidth = "none"; // Libera a largura para expandir
            } else {
                mapImage.style.transformOrigin = "center center";
                mapImage.style.maxWidth = "100%"; // Volta a caber na tela
            }
        }
    }

    function resetZoom() {
        currentZoom = 1;
        applyZoom();
    }

    if(btnZoomIn) {
        btnZoomIn.addEventListener('click', () => {
            if(currentZoom < maxZoom) {
                currentZoom += zoomStep;
                applyZoom();
            }
        });
    }

    if(btnZoomOut) {
        btnZoomOut.addEventListener('click', () => {
            if(currentZoom > minZoom) {
                currentZoom -= zoomStep;
                applyZoom();
            }
        });
    }

    if(btnZoomReset) {
        btnZoomReset.addEventListener('click', resetZoom);
    }

    document.addEventListener('DOMContentLoaded', () => {
            /* Mágica do Botão de Chamada */
            const btnChamada = document.getElementById('btnChamada');
            const containerChamada = document.getElementById('containerChamada');
            const myModal = document.getElementById('myModal');
            const closeModals = document.querySelectorAll('.close-modal');

            if(btnChamada && containerChamada) {
                btnChamada.addEventListener('click', () => {
                    // 1. Abre o modal de sucesso
                    if(myModal) myModal.classList.add('active');
                    
                    // 2. Substitui o botão pelo texto verde de sucesso
                    containerChamada.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; background-color: rgba(255, 255, 255, 0.1); color: #10B981; padding: 14px; border-radius: 100px; font-weight: 700; font-size: 16px;">
                            <span class="material-symbols-outlined" style="font-size: 22px;">check_circle</span>
                            Chamada Respondida
                        </div>
                    `;
                });
            }

            // Fechar o Modal
            if(closeModals) {
                closeModals.forEach(btn => {
                    btn.addEventListener('click', () => {
                        if(myModal) myModal.classList.remove('active');
                    });
                });
            }

            /* Mágica do Menu Lateral de Perfil */
            const btnPerfil = document.getElementById('btnPerfil');
            const profileDrawer = document.getElementById('profileDrawer');
            const drawerOverlay = document.getElementById('drawerOverlay');
            const closeDrawerBtn = document.getElementById('closeDrawerBtn');

            function openDrawer(e) {
                if(e) e.preventDefault();
                if(profileDrawer && drawerOverlay) {
                    profileDrawer.classList.add('active');
                    drawerOverlay.classList.add('active');
                }
            }

            function closeDrawer() {
                if(profileDrawer && drawerOverlay) {
                    profileDrawer.classList.remove('active');
                    drawerOverlay.classList.remove('active');
                }
            }

            if(btnPerfil) btnPerfil.addEventListener('click', openDrawer);
            if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
            if(drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
        });