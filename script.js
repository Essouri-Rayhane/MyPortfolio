// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations with staggered effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Staggered animation delay
        }
    });
}, observerOptions);

// Observe all project cards, skill categories, and activity cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .activity-card, .timeline-item, .interest-tag');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add floating animation to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Chatbot functionality
// Vérification de l'existence des éléments avant utilisation
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

// Vérifier que tous les éléments nécessaires existent
if (!chatbotToggle || !chatbotWindow || !chatbotClose || !chatbotInput || !chatbotSend || !chatbotMessages) {
    console.error('Chatbot: Certains éléments DOM sont manquants');
}

// Assistant vocal - Variables globales
let voiceEnabled = false;
let speechSynthesis = null;
let currentUtterance = null;

// Vérifier la compatibilité de la synthèse vocale
if ('speechSynthesis' in window) {
    speechSynthesis = window.speechSynthesis;
} else {
    console.warn('La synthèse vocale n\'est pas supportée par ce navigateur');
}

// Description vocale du chatbot (en anglais, ton très féminin, jeune et mignon)
const chatbotDescription = `Hi there! I'm Rayhane's cute little virtual assistant! I'm super excited to help you learn all about Rayhane Essouri. She's such an amazing Computer Science student who's totally passionate about Artificial Intelligence, Machine Learning, and Web Development! You can ask me anything about her awesome skills, her cool projects, her education, or how to reach out to her. Oh, and I can read everything out loud for you with my cute voice - just make sure the voice button is on!`;

// Knowledge base for the chatbot
const knowledgeBase = {
    greeting: [
        "Hello! 👋 Nice to meet you!",
        "Hi there! How can I help you today?",
        "Hey! Welcome! Feel free to ask me anything about Rayhane."
    ],
    about: [
        "Rayhane is a Computer Science student passionate about Artificial Intelligence, Machine Learning, and Web Development. She's experienced in developing web and desktop applications, data-driven models, and computer-vision projects.",
        "She's a 3rd year Computer Science student at the Higher Institute of Computer Science in Ariana (ISI), Tunisia. She's skilled in building practical solutions for healthcare, accessibility, and education."
    ],
    skills: [
        "Rayhane has expertise in:\n• Programming: Python (Advanced), Java, C, PHP, SQL, HTML, CSS\n• AI & ML: TensorFlow, Keras, scikit-learn, OpenCV, Hugging Face, Deep Learning (CNN, BERT), NLP, Computer Vision\n• Databases: MySQL, Oracle, PL/SQL\n• Data: Pandas, NumPy\n• Systems: Distributed Systems, SOA, REST APIs, Client-Server Models",
        "Her technical skills span across programming languages, AI/ML frameworks, databases, and system architectures. She's particularly strong in Python and AI technologies."
    ],
    projects: [
        "Rayhane has worked on several exciting projects:\n\n🤖 AI Projects:\n• AI Vocal Health Assistant (In Progress) - NLP-based health assistant\n• ASL Detection - Real-time sign language recognition\n• Drowsiness Detection - Driver fatigue monitoring\n• Diabetes Prediction Web App - ML-based health prediction\n\n💻 Development Projects:\n• Primary School Management System - JavaFX & MySQL\n• Florist E-Commerce Platform - PHP & MySQL\n• Healthcare Advice App - Android/Java",
        "She has 4 AI projects including ASL detection, drowsiness detection, diabetes prediction, and a vocal health assistant. She also has 3 development projects including a school management system, e-commerce platform, and mobile app."
    ],
    education: [
        "Rayhane is currently pursuing a Bachelor's Degree in Computer Science (3rd Year) at the Higher Institute of Computer Science – Ariana (ISI), starting September 2023. She previously completed her Baccalaureate in Natural Science at Chebbi Morneg High School in Tunis.",
        "She's a 3rd year Computer Science student at ISI Ariana, with coursework in AI, Databases, Web Technologies, OOP, Data Structures, Algorithms, BPMN, and UML Modeling."
    ],
    contact: [
        "You can reach Rayhane through:\n📧 Email: rayhaneessouri8@gmail.com\n📱 Phone: +216 26 174 057\n📍 Location: Tunis, Tunisia\n\nSocial Media:\n• GitHub: github.com/Essouri-Rayhane\n• LinkedIn: linkedin.com/in/essouri-rayhane",
        "Contact information:\n• Email: rayhaneessouri8@gmail.com\n• Phone: +216 26 174 057\n• Location: Tunis, Tunisia\n• GitHub and LinkedIn profiles are also available!"
    ],
    activities: [
        "Rayhane is actively involved in:\n• Enactus ISI Ariana - Social impact entrepreneurship\n• IEEE ISI Student Branch - Innovation workshops\n• AI Hackathons (Zindi, IEEE G.O.D.S) - Team competitions",
        "She's an active member of Enactus ISI Ariana, participates in IEEE activities, and has competed in AI hackathons."
    ],
    location: [
        "Rayhane is based in Tunis, Tunisia.",
        "She's located in Tunis, the capital city of Tunisia."
    ],
    default: [
        "I'm not sure about that specific detail. Could you ask about Rayhane's skills, projects, education, or contact information?",
        "That's an interesting question! I can help you learn about Rayhane's background, projects, skills, education, or how to contact her. What would you like to know?",
        "I don't have that information readily available. Try asking about her projects, skills, education, or experience!"
    ]
};

// Store last messages to detect repetition
let lastMessages = [];
const MAX_HISTORY = 3;

// Compteur de messages pour gérer les suggestions
let messageCount = 0;
const SUGGESTIONS_HIDE_AFTER = 3; // Cacher les suggestions après 3 messages

// Suggestions contextuelles basées sur le sujet
const contextualSuggestions = {
    default: [
        { text: "Skills", question: "What are your skills?" },
        { text: "Projects", question: "Tell me about your projects" },
        { text: "Education", question: "What is your education?" },
        { text: "Contact", question: "How can I contact you?" }
    ],
    skills: [
        { text: "Python", question: "Tell me about Python skills" },
        { text: "AI/ML", question: "What AI technologies do you know?" },
        { text: "Projects", question: "Tell me about your projects" },
        { text: "Experience", question: "What is your experience?" }
    ],
    projects: [
        { text: "ASL Detection", question: "Tell me about ASL Detection" },
        { text: "Diabetes App", question: "Tell me about diabetes prediction" },
        { text: "Skills", question: "What are your skills?" },
        { text: "GitHub", question: "What is your GitHub?" }
    ],
    education: [
        { text: "University", question: "Where do you study?" },
        { text: "Courses", question: "What courses have you taken?" },
        { text: "Skills", question: "What are your skills?" },
        { text: "Projects", question: "Tell me about your projects" }
    ],
    contact: [
        { text: "Email", question: "What is your email?" },
        { text: "LinkedIn", question: "What is your LinkedIn?" },
        { text: "GitHub", question: "What is your GitHub?" },
        { text: "Location", question: "Where are you located?" }
    ]
};

// Function to check if message is repetitive
function isRepetitive(message) {
    const normalizedMessage = message.toLowerCase().trim();
    return lastMessages.some(msg => msg.toLowerCase().trim() === normalizedMessage);
}

// Function to check if message matches a pattern (improved detection)
function matchesPattern(message, patterns) {
    // Nettoyer le message
    const cleanMessage = message.trim();
    
    // Vérifier les mots exacts d'abord (plus précis) - pour "skills", "skill", etc.
    for (const pattern of patterns) {
        // Correspondance exacte
        if (cleanMessage === pattern || cleanMessage === pattern + 's' || cleanMessage === pattern + 'es') {
            return true;
        }
        // Correspondance au début ou à la fin
        if (cleanMessage.startsWith(pattern) || cleanMessage.endsWith(pattern)) {
            return true;
        }
    }
    
    // Vérifier les mots avec word boundaries (pour les phrases)
    const wordPattern = new RegExp(`\\b(${patterns.join('|')})(s|es|ing)?\\b`, 'i');
    return wordPattern.test(message);
}

// Function to get bot response with improved pattern matching
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Vérifier si le message est répétitif
    if (isRepetitive(userMessage)) {
        return "I've already answered that question. Could you ask something else? Or try rephrasing your question! 😊";
    }
    
    // Ajouter le message à l'historique
    lastMessages.push(userMessage);
    if (lastMessages.length > MAX_HISTORY) {
        lastMessages.shift();
    }
    
    // Greeting patterns (améliorés avec support multilingue) - PRIORITÉ HAUTE
    if (matchesPattern(message, ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'bonjour', 'salut', 'bonsoir'])) {
        return knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)];
    }
    
    // Skills patterns (AMÉLIORÉ - détection plus flexible) - PRIORITÉ HAUTE
    // Détecte même les mots seuls comme "skills", "skill", "python", etc.
    const skillsKeywords = ['skill', 'skills', 'competence', 'competences', 'savoir', 'savoirs', 'maitrise', 'expertise', 'technology', 'technologies', 'tech', 'programming', 'language', 'languages', 'framework', 'frameworks', 'tool', 'tools', 'python', 'java', 'tensorflow', 'keras', 'ai', 'ml', 'machine learning', 'deep learning', 'nlp', 'opencv', 'technologie', 'competences techniques', 'technical skills'];
    if (matchesPattern(message, skillsKeywords)) {
        return knowledgeBase.skills[Math.floor(Math.random() * knowledgeBase.skills.length)];
    }
    
    // Specific project queries (améliorés) - PRIORITÉ MOYENNE
    if (matchesPattern(message, ['asl', 'sign language', 'langue des signes', 'gesture'])) {
        return "ASL Detection is a real-time American Sign Language gesture recognition system. It uses a webcam to capture hand movements and AI (OpenCV, CNN) to recognize gestures, converting them into text or speech to aid communication.";
    }
    
    if (matchesPattern(message, ['drowsiness', 'sleep', 'fatigue', 'driver', 'somnolence', 'conducteur'])) {
        return "The Drowsiness Detection project is an AI system that monitors drivers in real-time via webcam, detecting signs of drowsiness or inattention to improve road safety. It uses Python and Machine Learning.";
    }
    
    if (matchesPattern(message, ['diabetes', 'diabetic', 'prediction', 'health', 'diabete', 'sante'])) {
        return "The Diabetes Prediction Web Application is a full-stack medical tracking web app that predicts diabetes risk based on physiological and biochemical parameters. It uses React, Flask, and scikit-learn, achieving 76% accuracy with Logistic Regression, Random Forest, and KNN models.";
    }
    
    if (matchesPattern(message, ['vocal', 'voice', 'speech', 'assistant', 'voix', 'assistant vocal'])) {
        return "The AI Vocal Health Assistant is currently in development. It's an intelligent vocal assistant that understands spoken health-related questions and provides general health advice using NLP and LLMs (Python, Hugging Face, spaCy, Google Speech API).";
    }
    
    // Projects patterns (améliorés)
    if (matchesPattern(message, ['project', 'projects', 'work', 'built', 'developed', 'created', 'portfolio', 'app', 'application', 'projet', 'travail', 'realise', 'developpe'])) {
        return knowledgeBase.projects[Math.floor(Math.random() * knowledgeBase.projects.length)];
    }
    
    // About patterns (améliorés)
    if (matchesPattern(message, ['who', 'about', 'tell me', 'introduce', 'background', 'her', 'qui', 'parle', 'connaitre', 'presenter', 'rayhane'])) {
        return knowledgeBase.about[Math.floor(Math.random() * knowledgeBase.about.length)];
    }
    
    // Education patterns (améliorés)
    if (matchesPattern(message, ['education', 'study', 'university', 'college', 'school', 'degree', 'student', 'course', 'etude', 'universite', 'diplome', 'formation', 'isi', 'bachelor'])) {
        return knowledgeBase.education[Math.floor(Math.random() * knowledgeBase.education.length)];
    }
    
    // Contact patterns (améliorés)
    if (matchesPattern(message, ['contact', 'email', 'phone', 'reach', 'connect', 'linkedin', 'github', 'social', 'contacter', 'joindre', 'telephone', 'mail', 'gmail'])) {
        return knowledgeBase.contact[Math.floor(Math.random() * knowledgeBase.contact.length)];
    }
    
    // Activities patterns (améliorés)
    if (matchesPattern(message, ['activity', 'activities', 'hackathon', 'enactus', 'ieee', 'extracurricular', 'member', 'activite', 'participation', 'membre'])) {
        return knowledgeBase.activities[Math.floor(Math.random() * knowledgeBase.activities.length)];
    }
    
    // Location patterns (améliorés)
    if (matchesPattern(message, ['where', 'location', 'city', 'country', 'tunisia', 'tunis', 'live', 'based', 'ou', 'localisation', 'ville', 'pays', 'habite'])) {
        return knowledgeBase.location[Math.floor(Math.random() * knowledgeBase.location.length)];
    }
    
    // Default response
    return knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)];
}

// Function to escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to update suggestions based on context
function updateSuggestions(context = 'default') {
    const suggestionsContainer = document.getElementById('chatbotSuggestions');
    if (!suggestionsContainer) return;
    
    const suggestions = contextualSuggestions[context] || contextualSuggestions.default;
    const buttonsContainer = suggestionsContainer.querySelector('.suggestion-buttons');
    
    if (!buttonsContainer) return;
    
    buttonsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.textContent = suggestion.text;
        btn.setAttribute('data-question', suggestion.question);
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Empêcher la propagation de l'événement
            if (chatbotInput) {
                chatbotInput.value = suggestion.question;
                sendMessage();
            }
        });
        buttonsContainer.appendChild(btn);
    });
}

// Function to detect context from message
function detectContext(message) {
    const msg = message.toLowerCase();
    if (matchesPattern(msg, ['skill', 'skills', 'competence', 'python', 'java', 'technology', 'tech'])) {
        return 'skills';
    } else if (matchesPattern(msg, ['project', 'projects', 'app', 'application', 'asl', 'diabetes', 'drowsiness'])) {
        return 'projects';
    } else if (matchesPattern(msg, ['education', 'study', 'university', 'college', 'school', 'degree', 'student'])) {
        return 'education';
    } else if (matchesPattern(msg, ['contact', 'email', 'phone', 'linkedin', 'github', 'reach'])) {
        return 'contact';
    }
    return 'default';
}

// Function to get voices (with retry if not loaded)
function getVoices() {
    let voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
        // Les voix ne sont pas encore chargées, attendre un peu
        speechSynthesis.addEventListener('voiceschanged', function handler() {
            voices = speechSynthesis.getVoices();
            speechSynthesis.removeEventListener('voiceschanged', handler);
        }, { once: true });
    }
    return voices;
}

// Function to speak text using Web Speech API
function speakText(text, onEnd = null, force = false) {
    if (!speechSynthesis) {
        console.warn('La synthèse vocale n\'est pas disponible');
        return;
    }
    
    // Si force est true, ignorer la vérification de voiceEnabled
    if (!force && !voiceEnabled && !onEnd) {
        // Si la voix n'est pas activée et qu'on n'a pas de callback, ne pas lire
        return;
    }
    
    // Arrêter toute parole en cours
    if (currentUtterance) {
        speechSynthesis.cancel();
    }
    
    // Créer une nouvelle utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Fonction pour configurer et lire
    const setupAndSpeak = () => {
        // Configurer la voix
        const voices = getVoices();
        
        if (voices.length > 0) {
            // Liste des mots-clés masculins à EXCLURE
            const maleKeywords = ['male', 'david', 'daniel', 'james', 'mark', 'richard', 'thomas', 'paul', 'john', 'michael', 'peter', 'robert', 'william', 'george', 'alex', 'alexander', 'benjamin', 'charles', 'edward', 'henry', 'jack', 'jason', 'kevin', 'matthew', 'nicholas', 'ryan', 'stephen', 'steven'];
            
            // Liste des voix préférées (anglaises, très féminines, jeunes et mignonnes)
            const preferredVoiceNames = [
                'samantha', // Mac - très féminine et jeune
                'karen', // Mac - voix douce
                'tessa', // Mac - voix jeune
                'fiona', // Mac - voix douce
                'victoria', // Mac - voix féminine
                'susan', // Mac - voix douce
                'google uk english female', // Google - voix féminine
                'microsoft zira', // Windows - voix féminine
                'zira', // Windows - voix féminine
                'hazel', // Windows - voix douce
                'sarah', // Voix douce
                'uk english female',
                'us english female',
                'english female'
            ];
            
            // Fonction pour vérifier si une voix est féminine
            const isFemaleVoice = (voice) => {
                const voiceName = voice.name.toLowerCase();
                // Exclure explicitement les voix masculines
                if (maleKeywords.some(male => voiceName.includes(male))) {
                    return false;
                }
                // Inclure si c'est explicitement féminin ou dans la liste préférée
                return voiceName.includes('female') || 
                       preferredVoiceNames.some(pref => voiceName.includes(pref)) ||
                       voiceName.includes('zira') ||
                       voiceName.includes('hazel') ||
                       voiceName.includes('samantha') ||
                       voiceName.includes('karen') ||
                       voiceName.includes('fiona') ||
                       voiceName.includes('tessa') ||
                       voiceName.includes('victoria') ||
                       voiceName.includes('susan') ||
                       voiceName.includes('sarah');
            };
            
            // Chercher d'abord les voix préférées par nom (priorité aux voix anglaises féminines)
            let preferredVoice = voices.find(voice => {
                const voiceName = voice.name.toLowerCase();
                return voice.lang.startsWith('en') && 
                       isFemaleVoice(voice) &&
                       preferredVoiceNames.some(pref => voiceName.includes(pref));
            });
            
            // Si pas trouvé, chercher n'importe quelle voix anglaise féminine (en excluant les masculines)
            if (!preferredVoice) {
                preferredVoice = voices.find(voice => 
                    voice.lang.startsWith('en') && 
                    isFemaleVoice(voice)
                );
            }
            
            // Si toujours pas trouvé, chercher une voix anglaise qui n'est PAS masculine
            if (!preferredVoice) {
                preferredVoice = voices.find(voice => {
                    const voiceName = voice.name.toLowerCase();
                    return voice.lang.startsWith('en') && 
                           !maleKeywords.some(male => voiceName.includes(male));
                });
            }
            
            // Dernier recours : chercher une voix qui n'est pas masculine (peu importe la langue)
            if (!preferredVoice) {
                preferredVoice = voices.find(voice => {
                    const voiceName = voice.name.toLowerCase();
                    return !maleKeywords.some(male => voiceName.includes(male));
                });
            }
            
            if (preferredVoice) {
                currentUtterance.voice = preferredVoice;
                console.log('Voix féminine sélectionnée:', preferredVoice.name, preferredVoice.lang);
            } else {
                console.warn('Aucune voix féminine trouvée, utilisation de la voix par défaut');
            }
        }
        
        // Configuration de la voix pour un son très féminin, jeune et mignon (girly & cute)
        currentUtterance.rate = 0.92; // Un peu plus lent pour un son plus doux et mignon
        currentUtterance.pitch = 1.25; // Pitch plus élevé pour un son plus aigu et féminin (girly)
        currentUtterance.volume = 0.92; // Volume légèrement réduit pour un son plus doux et délicat
        
        // Gérer la fin de la lecture
        if (onEnd) {
            currentUtterance.onend = onEnd;
        }
        
        // Gérer les erreurs
        currentUtterance.onerror = (event) => {
            console.error('Erreur de synthèse vocale:', event);
        };
        
        // Lire le texte
        speechSynthesis.speak(currentUtterance);
    };
    
    // Si les voix ne sont pas encore chargées, attendre
    const voices = getVoices();
    if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', setupAndSpeak, { once: true });
    } else {
        setupAndSpeak();
    }
}

// Function to stop speaking
function stopSpeaking() {
    if (speechSynthesis) {
        speechSynthesis.cancel();
        currentUtterance = null;
    }
}

// Function to toggle voice assistant
function toggleVoiceAssistant() {
    console.log('toggleVoiceAssistant appelé');
    
    if (!speechSynthesis) {
        alert('La synthèse vocale n\'est pas supportée par votre navigateur. Veuillez utiliser Chrome, Edge, ou Safari.');
        return;
    }
    
    voiceEnabled = !voiceEnabled;
    const voiceBtn = document.getElementById('chatbotVoice');
    
    if (!voiceBtn) {
        console.error('Bouton vocal non trouvé dans le DOM');
        alert('Erreur: Le bouton vocal n\'a pas été trouvé. Veuillez recharger la page.');
        return;
    }
    
    console.log('Voice enabled:', voiceEnabled);
    
    if (voiceEnabled) {
        voiceBtn.classList.add('active');
        voiceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        voiceBtn.title = 'Disable voice assistant';
        
        // Lire la description du chatbot
        // Utiliser un petit délai pour s'assurer que tout est prêt
        setTimeout(() => {
            console.log('Lecture de la description du chatbot');
            // Forcer la lecture même si voiceEnabled vient d'être activé
            speakText(chatbotDescription, () => {
                console.log('Description lue avec succès');
            }, true); // force = true pour forcer la lecture
        }, 100);
    } else {
        voiceBtn.classList.remove('active');
        voiceBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        voiceBtn.title = 'Enable voice assistant';
        stopSpeaking();
        console.log('Voice assistant désactivé');
    }
}

// Function to add message to chat
function addMessage(text, isUser = false) {
    if (!chatbotMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (!isUser) {
        const avatar = document.createElement('img');
        avatar.src = 'avatar.jpeg';
        avatar.alt = 'Rayhane';
        avatar.className = 'chatbot-avatar-message';
        avatar.onerror = function() {
            this.style.display = 'none';
        };
        contentDiv.appendChild(avatar);
    }
    
    const textP = document.createElement('p');
    // Sécuriser le texte et convertir les sauts de ligne en <br>
    const escapedText = escapeHtml(text);
    textP.innerHTML = escapedText.replace(/\n/g, '<br>');
    contentDiv.appendChild(textP);
    
    // Ajouter un bouton de copie pour les messages du bot
    if (!isUser) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'message-copy-btn';
        copyBtn.title = 'Copy message';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Empêcher la propagation
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyBtn.style.color = '#10b981';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    copyBtn.style.color = '';
                }, 2000);
            });
        });
        contentDiv.appendChild(copyBtn);
    }
    
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);
    
    // Animation d'apparition
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = isUser ? 'translateX(20px)' : 'translateX(-20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(0)';
    }, 10);
    
    // Scroll to bottom avec animation smooth
    setTimeout(() => {
        chatbotMessages.scrollTo({
            top: chatbotMessages.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

// Function to show typing indicator
function showTypingIndicator() {
    if (!chatbotMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const avatar = document.createElement('img');
    avatar.src = 'avatar.jpeg';
    avatar.alt = 'Rayhane';
    avatar.className = 'chatbot-avatar-message';
    avatar.onerror = function() {
        this.style.display = 'none';
    };
    contentDiv.appendChild(avatar);
    
    const typingDots = document.createElement('div');
    typingDots.className = 'typing-dots';
    typingDots.innerHTML = '<span></span><span></span><span></span>';
    contentDiv.appendChild(typingDots);
    
    typingDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(typingDiv);
    
    setTimeout(() => {
        chatbotMessages.scrollTo({
            top: chatbotMessages.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Function to send message
function sendMessage() {
    if (!chatbotInput || !chatbotSend) return;
    
    const message = chatbotInput.value.trim();
    
    // Vérifier que le message n'est pas vide
    if (!message) {
        chatbotInput.focus();
        return;
    }
    
    // Désactiver le bouton d'envoi pendant le traitement
    chatbotSend.disabled = true;
    chatbotInput.disabled = true;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Incrémenter le compteur de messages
    messageCount++;
    
    // Cacher les suggestions après quelques messages
    if (messageCount >= SUGGESTIONS_HIDE_AFTER) {
        const suggestionsContainer = document.getElementById('chatbotSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }
    
    // Détecter le contexte et mettre à jour les suggestions
    const context = detectContext(message);
    if (messageCount < SUGGESTIONS_HIDE_AFTER) {
        updateSuggestions(context);
    }
    
    // Vibration haptique sur mobile (si supporté)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Afficher l'indicateur de frappe
    showTypingIndicator();
    
    // Simulate typing delay avec gestion d'erreur
    setTimeout(() => {
        try {
            removeTypingIndicator();
            const botResponse = getBotResponse(message);
            addMessage(botResponse, false);
            
            // Lire la réponse à voix haute si activé
            if (voiceEnabled && speechSynthesis) {
                // Nettoyer le texte pour la lecture (enlever les emojis et formater pour un son plus naturel)
                const cleanText = botResponse
                    .replace(/[👋🤖💻📧📱📍•🌟💫✨]/g, '') // Enlever les emojis et puces
                    .replace(/\n\n/g, '. ') // Remplacer les doubles sauts de ligne
                    .replace(/\n/g, ', ') // Remplacer les simples sauts de ligne par des virgules
                    .replace(/\s+/g, ' ') // Normaliser les espaces
                    .replace(/\.\s*\./g, '.') // Enlever les points multiples
                    .trim();
                
                if (cleanText) {
                    speakText(cleanText);
                }
            }
            
            // Mettre à jour les suggestions après la réponse du bot
            if (messageCount < SUGGESTIONS_HIDE_AFTER) {
                const responseContext = detectContext(botResponse);
                updateSuggestions(responseContext);
            }
        } catch (error) {
            console.error('Erreur lors de la génération de la réponse:', error);
            removeTypingIndicator();
            addMessage("I'm sorry, I encountered an error. Please try again!", false);
        } finally {
            // Réactiver le bouton et l'input
            chatbotSend.disabled = false;
            chatbotInput.disabled = false;
            chatbotInput.focus();
        }
    }, 800 + Math.random() * 400); // Délai variable entre 800ms et 1200ms pour plus de réalisme
}

// Function to clear conversation
function clearConversation() {
    if (!chatbotMessages) return;
    
    // Garder seulement le message de bienvenue
    const welcomeMessage = chatbotMessages.querySelector('.bot-message');
    chatbotMessages.innerHTML = '';
    if (welcomeMessage) {
        chatbotMessages.appendChild(welcomeMessage);
    }
    
    // Réinitialiser le compteur
    messageCount = 0;
    
    // Réafficher les suggestions
    const suggestionsContainer = document.getElementById('chatbotSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'flex';
        updateSuggestions('default');
    }
    
    // Réinitialiser l'historique
    lastMessages = [];
}

// Gestion du bouton vocal
const chatbotVoice = document.getElementById('chatbotVoice');
if (chatbotVoice) {
    chatbotVoice.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleVoiceAssistant();
    });
}

// Gestion du bouton de nettoyage
const chatbotClear = document.getElementById('chatbotClear');
if (chatbotClear) {
    chatbotClear.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to clear the conversation?')) {
            clearConversation();
            // Arrêter la lecture si active
            if (voiceEnabled) {
                stopSpeaking();
            }
        }
    });
}

// Initialiser les suggestions au chargement
document.addEventListener('DOMContentLoaded', () => {
    updateSuggestions('default');
    
    // Charger les voix disponibles (nécessaire pour certains navigateurs)
    if (speechSynthesis) {
        // Forcer le chargement des voix
        const loadVoices = () => {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                console.log('Voix disponibles:', voices.length);
            }
        };
        
        // Les voix peuvent ne pas être disponibles immédiatement
        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.addEventListener('voiceschanged', loadVoices, { once: true });
        } else {
            loadVoices();
        }
        
        // Vérifier que le bouton vocal existe
        const voiceBtn = document.getElementById('chatbotVoice');
        if (!voiceBtn) {
            console.error('Le bouton vocal n\'a pas été trouvé dans le DOM');
        } else {
            console.log('Bouton vocal trouvé et prêt');
        }
    } else {
        console.warn('La synthèse vocale n\'est pas disponible');
    }
});

// Event listeners avec vérifications d'existence
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        if (!chatbotWindow) return;
        const isOpening = !chatbotWindow.classList.contains('active');
        chatbotWindow.classList.toggle('active');
        chatbotToggle.classList.toggle('active');
        
        if (isOpening) {
            // Réafficher les suggestions si on ouvre le chatbot
            const suggestionsContainer = document.getElementById('chatbotSuggestions');
            if (suggestionsContainer && messageCount < SUGGESTIONS_HIDE_AFTER) {
                suggestionsContainer.style.display = 'flex';
                updateSuggestions('default');
            }
            
            // Focus sur l'input
            if (chatbotInput) {
                setTimeout(() => chatbotInput.focus(), 300);
            }
            
            // Vibration légère sur mobile
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        if (!chatbotWindow || !chatbotToggle) return;
        chatbotWindow.classList.remove('active');
        chatbotToggle.classList.remove('active');
        // Arrêter la lecture si active
        stopSpeaking();
    });
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Empêcher l'envoi de messages vides
    chatbotInput.addEventListener('input', () => {
        if (chatbotSend) {
            chatbotSend.disabled = !chatbotInput.value.trim();
        }
    });
}

// Fermer le chatbot en cliquant à l'extérieur (optionnel)
document.addEventListener('click', (e) => {
    if (chatbotWindow && chatbotToggle && chatbotWindow.classList.contains('active')) {
        // Vérifier si le clic est sur un bouton de suggestion
        const isSuggestionBtn = e.target.closest('.suggestion-btn');
        // Vérifier si le clic est à l'intérieur du chatbot
        const isClickInsideChatbot = chatbotWindow.contains(e.target) || chatbotToggle.contains(e.target);
        
        // Ne fermer que si le clic est vraiment à l'extérieur et pas sur une suggestion
        if (!isClickInsideChatbot && !isSuggestionBtn) {
            chatbotWindow.classList.remove('active');
            chatbotToggle.classList.remove('active');
        }
    }
});

