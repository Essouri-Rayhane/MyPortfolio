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
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

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

// Function to get bot response
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Greeting patterns
    if (message.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)) {
        return knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)];
    }
    
    // About patterns
    if (message.match(/\b(who|about|tell me|introduce|background|her)\b/)) {
        return knowledgeBase.about[Math.floor(Math.random() * knowledgeBase.about.length)];
    }
    
    // Skills patterns
    if (message.match(/\b(skill|technology|tech|programming|language|framework|tool|expertise|know|can do)\b/)) {
        return knowledgeBase.skills[Math.floor(Math.random() * knowledgeBase.skills.length)];
    }
    
    // Projects patterns
    if (message.match(/\b(project|work|built|developed|created|portfolio|app|application)\b/)) {
        return knowledgeBase.projects[Math.floor(Math.random() * knowledgeBase.projects.length)];
    }
    
    // Education patterns
    if (message.match(/\b(education|study|university|college|school|degree|student|course)\b/)) {
        return knowledgeBase.education[Math.floor(Math.random() * knowledgeBase.education.length)];
    }
    
    // Contact patterns
    if (message.match(/\b(contact|email|phone|reach|connect|linkedin|github|social)\b/)) {
        return knowledgeBase.contact[Math.floor(Math.random() * knowledgeBase.contact.length)];
    }
    
    // Activities patterns
    if (message.match(/\b(activity|hackathon|enactus|ieee|extracurricular|member)\b/)) {
        return knowledgeBase.activities[Math.floor(Math.random() * knowledgeBase.activities.length)];
    }
    
    // Location patterns
    if (message.match(/\b(where|location|city|country|tunisia|tunis|live|based)\b/)) {
        return knowledgeBase.location[Math.floor(Math.random() * knowledgeBase.location.length)];
    }
    
    // Specific project queries
    if (message.match(/\b(asl|sign language)\b/)) {
        return "ASL Detection is a real-time American Sign Language gesture recognition system. It uses a webcam to capture hand movements and AI (OpenCV, CNN) to recognize gestures, converting them into text or speech to aid communication.";
    }
    
    if (message.match(/\b(drowsiness|sleep|fatigue|driver)\b/)) {
        return "The Drowsiness Detection project is an AI system that monitors drivers in real-time via webcam, detecting signs of drowsiness or inattention to improve road safety. It uses Python and Machine Learning.";
    }
    
    if (message.match(/\b(diabetes|diabetic|prediction|health)\b/)) {
        return "The Diabetes Prediction Web Application is a full-stack medical tracking web app that predicts diabetes risk based on physiological and biochemical parameters. It uses React, Flask, and scikit-learn, achieving 76% accuracy with Logistic Regression, Random Forest, and KNN models.";
    }
    
    if (message.match(/\b(vocal|voice|speech|assistant)\b/)) {
        return "The AI Vocal Health Assistant is currently in development. It's an intelligent vocal assistant that understands spoken health-related questions and provides general health advice using NLP and LLMs (Python, Hugging Face, spaCy, Google Speech API).";
    }
    
    // Default response
    return knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)];
}

// Function to add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (!isUser) {
        const avatar = document.createElement('img');
        avatar.src = 'avatar.jpeg';
        avatar.alt = 'Rayhane';
        avatar.className = 'chatbot-avatar-message';
        contentDiv.appendChild(avatar);
    }
    
    const textP = document.createElement('p');
    // Convert newlines to <br> tags for proper formatting
    textP.innerHTML = text.replace(/\n/g, '<br>');
    contentDiv.appendChild(textP);
    
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Simulate typing delay
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse, false);
    }, 500);
}

// Event listeners
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    chatbotToggle.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatbotToggle.classList.remove('active');
});

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

