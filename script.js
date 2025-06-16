// ================================
// GUIA RÁPIDO - ADMINISTRAÇÃO PÚBLICA UFRN
// JavaScript para funcionalidades interativas
// ================================

// ============= CONFIGURAÇÕES GLOBAIS =============
const CONFIG = {
    ANIMATION_DURATION: 300,
    SCROLL_OFFSET: 80,
    QUIZ_TOTAL_QUESTIONS: 10
};

// ============= DADOS DO QUIZ =============
const QUIZ_QUESTIONS = [
    {
        question: "Qual é a frequência mínima exigida para aprovação em uma disciplina?",
        options: ["70%", "75%", "80%", "85%"],
        correct: 1,
        explanation: "A frequência mínima exigida é de 75% conforme estabelecido no RCG da UFRN."
    },    {
        question: "Qual é a nota mínima para aprovação direta em uma disciplina?",
        options: ["4,0", "5,0", "6,0", "7,0"],
        correct: 2,
        explanation: "A partir de 2024, a nota mínima para aprovação é 6,0 + rendimento mínimo de 4,0 em todas as unidades. Antes era 5,0 + rendimento 3,0."
    },
    {
        question: "Quantos semestres dura o curso de Administração Pública da UFRN?",
        options: ["6 semestres", "8 semestres", "10 semestres", "12 semestres"],
        correct: 1,
        explanation: "O curso tem duração de 8 semestres (4 anos) conforme estabelecido no PPC."
    },
    {
        question: "Qual é a carga horária total do curso?",
        options: ["2.000 horas", "2.430 horas", "2.800 horas", "3.000 horas"],
        correct: 1,
        explanation: "A carga horária total do curso é de 2.430 horas, incluindo disciplinas e atividades complementares."
    },
    {
        question: "Quantas horas de atividades complementares são exigidas?",
        options: ["150 horas", "200 horas", "250 horas", "300 horas"],
        correct: 1,
        explanation: "São exigidas 200 horas de atividades complementares para a conclusão do curso."
    },
    {
        question: "O estágio é obrigatório no curso de Administração Pública da UFRN?",
        options: ["Sim, é obrigatório", "Não, é optativo", "Sim, apenas no último período", "Depende da escolha do aluno"],
        correct: 1,
        explanation: "O estágio NÃO é obrigatório no curso, mas é altamente recomendado e pode ser aproveitado como atividade complementar."
    },
    {
        question: "Qual é o tempo máximo para conclusão do curso?",
        options: ["8 semestres", "10 semestres", "12 semestres", "14 semestres"],
        correct: 2,
        explanation: "O tempo máximo para conclusão é de 12 semestres (6 anos), podendo haver prorrogação excepcional."
    },
    {
        question: "Quantos semestres de trancamento total são permitidos?",
        options: ["2 semestres", "3 semestres", "4 semestres", "6 semestres"],
        correct: 2,
        explanation: "São permitidos até 4 semestres de trancamento total durante todo o curso."
    },    {
        question: "Para fazer prova final, a nota deve estar em qual faixa?",
        options: ["3,0 a 4,9", "4,0 a 5,9", "4,0 a 4,9", "2,0 a 4,9"],
        correct: 1,
        explanation: "A partir de 2024, a prova final é para notas entre 4,0 e 5,9. A média final será (Nota + Prova Final) / 2, e você precisa de 6,0 para aprovação."
    },
    {
        question: "Quantas horas de estágio podem ser aproveitadas como atividade complementar?",
        options: ["Até 100 horas", "Até 120 horas", "Até 150 horas", "Até 200 horas"],
        correct: 1,
        explanation: "Podem ser aproveitadas até 120 horas de estágio como atividade complementar das 200 horas exigidas."
    },
    {
        question: "A partir de quando entraram em vigor as regras atuais de aprovação da UFRN?",
        options: ["2023.2", "2024.1", "2024.2", "2025.1"],
        correct: 1,
        explanation: "As regras atuais de aprovação (média ≥ 6,0 + rendimento ≥ 4,0) entraram em vigor a partir do período letivo 2024.1, aprovadas pelo Consepe."
    }
];

// ============= ESTADO GLOBAL =============
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let quizCompleted = false;

// ============= UTILITÁRIOS =============
const Utils = {
    // Smooth scroll para um elemento
    scrollToElement(selector, offset = CONFIG.SCROLL_OFFSET) {
        const element = document.querySelector(selector);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },

    // Adiciona animação a um elemento
    animateElement(element, animationClass, duration = 1000) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    },

    // Debounce para funções
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Mostra notificação toast
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        // Define cor baseada no tipo
        const typeColors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-black',
            info: 'bg-blue-500 text-white'
        };
        
        toast.className += ` ${typeColors[type] || typeColors.info}`;
        toast.innerHTML = `
            <div class="flex items-center">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-current opacity-70 hover:opacity-100">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Anima entrada
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);
        
        // Remove automaticamente
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    }
};

// ============= NAVEGAÇÃO =============
const Navigation = {
    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupActiveLinks();
    },

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                }
            });

            // Fecha menu ao clicar em um link
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                });
            });
        }
    },

    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    Utils.scrollToElement(targetId);
                }
            });
        });
    },

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: `-${CONFIG.SCROLL_OFFSET}px 0px -50% 0px`
        });        sections.forEach(section => {
            observer.observe(section);
        });
    }
};

// ============= QUIZ =============
const Quiz = {
    init() {
        this.setupQuiz();
        this.setupEventListeners();
    },

    setupQuiz() {
        this.renderQuestion();
        this.updateUI();
    },

    setupEventListeners() {
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const restartBtn = document.getElementById('restart-btn');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevQuestion());
        }

        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartQuiz());
        }
    },

    renderQuestion() {
        const question = QUIZ_QUESTIONS[currentQuestionIndex];
        if (!question) return;

        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');

        if (questionText) {
            questionText.textContent = question.question;
        }

        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'quiz-option';
                button.textContent = option;
                button.addEventListener('click', () => this.selectAnswer(index));
                
                // Marca resposta já selecionada
                if (selectedAnswers[currentQuestionIndex] === index) {
                    button.classList.add('selected');
                }
                
                optionsContainer.appendChild(button);
            });
        }
    },

    selectAnswer(answerIndex) {
        const question = QUIZ_QUESTIONS[currentQuestionIndex];
        const options = document.querySelectorAll('.quiz-option');
        
        // Remove seleção anterior
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Marca resposta selecionada
        selectedAnswers[currentQuestionIndex] = answerIndex;
        options[answerIndex].classList.add('selected');
        
        // Mostra feedback visual
        setTimeout(() => {
            options.forEach((option, index) => {
                if (index === question.correct) {
                    option.classList.add('correct');
                } else if (index === answerIndex && answerIndex !== question.correct) {
                    option.classList.add('incorrect');
                }
            });
            
            // Mostra explicação
            this.showExplanation(question.explanation, answerIndex === question.correct);
            
            // Habilita botão próxima
            const nextBtn = document.getElementById('next-btn');
            if (nextBtn) {
                nextBtn.disabled = false;
            }
        }, 500);
    },

    showExplanation(explanation, isCorrect) {
        // Remove explicação anterior se existir
        const existingExplanation = document.querySelector('.quiz-explanation');
        if (existingExplanation) {
            existingExplanation.remove();
        }

        const explanationDiv = document.createElement('div');
        explanationDiv.className = `quiz-explanation mt-4 p-4 rounded-lg border-l-4 ${
            isCorrect ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'
        }`;
        
        explanationDiv.innerHTML = `
            <div class="flex items-start">
                <i class="fas ${isCorrect ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} mt-1 mr-3"></i>
                <div>
                    <p class="font-semibold mb-1">${isCorrect ? 'Correto!' : 'Incorreto!'}</p>
                    <p class="text-sm">${explanation}</p>
                </div>
            </div>
        `;

        const questionContainer = document.getElementById('question-container');
        if (questionContainer) {
            questionContainer.appendChild(explanationDiv);
        }
    },

    nextQuestion() {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            currentQuestionIndex++;
            this.updateScore();
            this.renderQuestion();
            this.updateUI();
            
            // Remove explicação
            const explanation = document.querySelector('.quiz-explanation');
            if (explanation) {
                explanation.remove();
            }
        } else {
            this.finishQuiz();
        }
    },

    prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            this.renderQuestion();
            this.updateUI();
            
            // Remove explicação
            const explanation = document.querySelector('.quiz-explanation');
            if (explanation) {
                explanation.remove();
            }
        }
    },

    updateScore() {
        const question = QUIZ_QUESTIONS[currentQuestionIndex - 1];
        if (question && selectedAnswers[currentQuestionIndex - 1] === question.correct) {
            score++;
        }
        
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    },

    updateUI() {
        // Atualiza contador de perguntas
        const questionCounter = document.getElementById('question-counter');
        if (questionCounter) {
            questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${QUIZ_QUESTIONS.length}`;
        }

        // Atualiza barra de progresso
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Atualiza botões
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        
        if (nextBtn) {
            nextBtn.disabled = selectedAnswers[currentQuestionIndex] === undefined;
            nextBtn.textContent = currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Finalizar' : 'Próxima';
        }
        
        if (prevBtn) {
            prevBtn.disabled = currentQuestionIndex === 0;
        }
    },

    finishQuiz() {
        // Calcula pontuação final
        this.updateScore();
        
        const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
        
        // Esconde quiz e mostra resultados
        const questionContainer = document.getElementById('question-container');
        const resultsContainer = document.getElementById('results-container');
        const quizControls = document.querySelector('#quiz-container .flex.justify-between');
        
        if (questionContainer) questionContainer.style.display = 'none';
        if (quizControls) quizControls.style.display = 'none';
        if (resultsContainer) resultsContainer.classList.remove('hidden');
        
        // Define ícone e mensagem baseados na pontuação
        let icon, title, message, color;
        
        if (percentage >= 80) {
            icon = '🎉';
            title = 'Parabéns! Excelente resultado!';
            message = 'Você demonstra um ótimo conhecimento das normas do curso.';
            color = 'text-green-600';
        } else if (percentage >= 60) {
            icon = '👍';
            title = 'Bom trabalho!';
            message = 'Você tem um bom conhecimento, mas pode revisar alguns pontos.';
            color = 'text-blue-600';
        } else {
            icon = '📚';
            title = 'Continue estudando!';
            message = 'É importante revisar as normas do curso com mais atenção.';
            color = 'text-yellow-600';
        }
        
        // Atualiza elementos do resultado
        const resultIcon = document.getElementById('result-icon');
        const resultTitle = document.getElementById('result-title');
        const resultMessage = document.getElementById('result-message');
        const finalScore = document.getElementById('final-score');
        
        if (resultIcon) resultIcon.textContent = icon;
        if (resultTitle) {
            resultTitle.textContent = title;
            resultTitle.className = `text-2xl font-bold mb-2 ${color}`;
        }
        if (resultMessage) resultMessage.textContent = message;
        if (finalScore) finalScore.textContent = `${score}/${QUIZ_QUESTIONS.length} (${percentage}%)`;
        
        // Mostra toast de conclusão
        Utils.showToast('Quiz finalizado! Confira seu resultado.', 'success');
        
        quizCompleted = true;
    },

    restartQuiz() {
        // Reset das variáveis globais
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswers = [];
        quizCompleted = false;
        
        // Mostra quiz e esconde resultados
        const questionContainer = document.getElementById('question-container');
        const resultsContainer = document.getElementById('results-container');
        const quizControls = document.querySelector('#quiz-container .flex.justify-between');
        
        if (questionContainer) questionContainer.style.display = 'block';
        if (quizControls) quizControls.style.display = 'flex';
        if (resultsContainer) resultsContainer.classList.add('hidden');
        
        // Reinicia quiz
        this.setupQuiz();
        
        Utils.showToast('Quiz reiniciado! Boa sorte!', 'info');
    }
};

// ============= ANIMAÇÕES E EFEITOS =============
const Animations = {
    init() {
        this.setupScrollAnimations();
    },

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observa cards e elementos que devem animar
        const animatedElements = document.querySelectorAll('.card-hover, .bg-gray-50, .bg-white');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
};

// ============= MAPA INTERATIVO =============
const MapInteraction = {
    init() {
        this.setupMapFeatures();
        this.addMobileOptimizations();
    },

    setupMapFeatures() {
        const mapImg = document.querySelector('#mapa img');
        if (!mapImg) return;

        // Adiciona funcionalidade de zoom no mapa
        mapImg.addEventListener('click', () => {
            this.toggleMapZoom(mapImg);
        });

        // Melhora a acessibilidade
        mapImg.setAttribute('tabindex', '0');
        mapImg.setAttribute('role', 'button');
        mapImg.setAttribute('aria-label', 'Clique para ampliar o mapa do campus');
        
        // Adiciona cursor pointer para indicar interatividade
        mapImg.style.cursor = 'pointer';
    },

    toggleMapZoom(img) {
        const isZoomed = img.classList.contains('map-zoomed');
        
        if (isZoomed) {
            // Remove zoom
            img.classList.remove('map-zoomed');
            img.style.transform = 'scale(1)';
            img.style.zIndex = 'auto';
            img.style.position = 'relative';
            document.body.style.overflow = 'auto';
        } else {
            // Adiciona zoom
            img.classList.add('map-zoomed');
            img.style.transform = 'scale(1.5)';
            img.style.zIndex = '1000';
            img.style.position = 'fixed';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%) scale(1.5)';
            img.style.backgroundColor = 'white';
            img.style.padding = '20px';
            img.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            document.body.style.overflow = 'hidden';
        }
    },

    addMobileOptimizations() {
        // Adiciona gestos de pinch-to-zoom em dispositivos touch
        const mapContainer = document.querySelector('#mapa .relative');
        if (!mapContainer) return;

        let scale = 1;
        let panning = false;
        let pointX = 0;
        let pointY = 0;
        let start = { x: 0, y: 0 };

        mapContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                // Início do pinch
                this.handlePinchStart(e);
            } else if (e.touches.length === 1) {
                // Início do pan
                panning = true;
                start.x = e.touches[0].clientX;
                start.y = e.touches[0].clientY;
            }
        });

        mapContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length === 2) {
                // Pinch zoom
                this.handlePinchMove(e, mapContainer);
            } else if (panning && e.touches.length === 1) {
                // Pan
                this.handlePan(e, mapContainer, start);
            }
        });

        mapContainer.addEventListener('touchend', () => {
            panning = false;
        });
    },

    handlePinchStart(e) {
        // Implementação básica de pinch-to-zoom
        console.log('Pinch gesture detected');
    },

    handlePinchMove(e, container) {
        // Implementação básica de zoom
        const img = container.querySelector('img');
        if (img) {
            img.style.transition = 'transform 0.1s ease';
        }
    },

    handlePan(e, container, start) {
        // Implementação básica de pan
        const deltaX = e.touches[0].clientX - start.x;
        const deltaY = e.touches[0].clientY - start.y;
        // Aqui você pode implementar a lógica de pan se necessário
    }
};

// ============= MELHORIAS MOBILE =============
const MobileOptimizations = {
    init() {
        this.setupTouchOptimizations();
        this.setupViewportAdjustments();
        this.setupMobileAnimations();
    },

    setupTouchOptimizations() {
        // Melhora a responsividade do toque
        const touchElements = document.querySelectorAll('.mobile-optimized');
        touchElements.forEach(element => {
            element.style.touchAction = 'manipulation';
            element.style.webkitTapHighlightColor = 'transparent';
        });

        // Adiciona feedback visual melhor para touch
        const interactiveElements = document.querySelectorAll('button, .nav-link, .quiz-option');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
        });
    },

    setupViewportAdjustments() {
        // Ajusta altura da viewport em dispositivos móveis
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    },

    setupMobileAnimations() {
        // Desabilita animações em dispositivos com pouca bateria ou preferência reduzida
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition', 'none');
        }
    }
};

// ============= INICIALIZAÇÃO =============
class App {
    constructor() {
        this.init();
    }

    init() {
        // Aguarda DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Inicializa módulos
            Navigation.init();
            Quiz.init();
            Animations.init();
            MobileOptimizations.init();
            MapInteraction.init();
            
            console.log('🎓 Guia Rápido - Administração Pública UFRN inicializado com sucesso!');
            console.log('📱 Otimizações mobile ativadas');
            
        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error);
            Utils.showToast('Erro ao carregar a aplicação. Recarregue a página.', 'error');
        }
    }
}

// ============= INICIALIZAÇÃO DA APLICAÇÃO =============
new App();
