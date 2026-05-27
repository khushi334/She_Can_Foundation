// --- 🔄 1. Synchronized "Our Stories" Slide Logic ---
const images = document.querySelectorAll('.story-img');
const texts = document.querySelectorAll('.story-text');
let currentIndex = 0;
const intervalTime = 3000; // 3 Seconds switch interval rate

function changeStory() {
    images[currentIndex].classList.remove('active');
    texts[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + 1) % images.length;

    images[currentIndex].classList.add('active');
    texts[currentIndex].classList.add('active');
}

setInterval(changeStory, intervalTime);


// --- 🎬 2. Scroll Reveal Animation Engine (Intersection Observer) ---
const revealElements = document.querySelectorAll('.scroll-reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 
});

revealElements.forEach(element => {
    scrollObserver.observe(element);
});


// --- 🚪 3. Volunteer Popup Modal Actions ---
// --- 🚪 3. Volunteer Popup Modal Actions & Custom Form Validation ---
const modalOverlay = document.getElementById('customModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const volunteerForm = document.getElementById('volunteerForm');
const successMsgText = document.getElementById('successMsg');

// Form Input Fields & Error Message Holders
const formName = document.getElementById('formName');
const formEmail = document.getElementById('formEmail');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

openModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    executeModalTeardown();
});

window.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        executeModalTeardown();
    }
});

// Form Submission Event Listener
volunteerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Stop default form submissions
    
    // Reset any existing error states before checking again
    let isFormValid = true;
    
    formName.classList.remove('invalid-field');
    nameError.style.display = 'none';
    formEmail.classList.remove('invalid-field');
    emailError.style.display = 'none';

    // 1. Validate Name Field (Must not be empty and must be >= 3 characters)
    if (formName.value.trim().length < 3) {
        formName.classList.add('invalid-field');
        nameError.style.display = 'block';
        isFormValid = false;
    }

    // 2. Validate Email Field using standard regex mapping
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formEmail.value.trim())) {
        formEmail.classList.add('invalid-field');
        emailError.style.display = 'block';
        isFormValid = false;
    }

    // 3. Execution on Perfect Validation
    if (isFormValid) {
        successMsgText.style.display = 'block';
        volunteerForm.reset(); 

        // Automatically close the modal after 2.2 seconds
        setTimeout(() => {
            executeModalTeardown();
        }, 2200);
    }
});

// Reset layout logic helper
function executeModalTeardown() {
    modalOverlay.classList.remove('active');
    
    // Clear validation error highlights when closing modal manually
    setTimeout(() => {
        successMsgText.style.display = 'none';
        formName.classList.remove('invalid-field');
        nameError.style.display = 'none';
        formEmail.classList.remove('invalid-field');
        emailError.style.display = 'none';
        volunteerForm.reset();
    }, 400);
}


function animateDataGraphs() {
    // We removed the radialCircle lines from here because CSS handles it smoothly now!

    const bars = document.querySelectorAll('.bar-fill');
    if (bars.length > 0) {
        bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth; 
        });
    }
}

// ==========================================================================
// --- 🤖 4. AI VOICE & TALK CHAT AGENT INTERACTION SERVICE ---
// ==========================================================================
const aiToggleBtn = document.getElementById('aiToggleBtn');
const aiCloseBtn = document.getElementById('aiCloseBtn');
const aiChatBox = document.getElementById('aiChatBox');
const aiSendBtn = document.getElementById('aiSendBtn');
const aiVoiceBtn = document.getElementById('aiVoiceBtn');
const aiTextInput = document.getElementById('aiTextInput');
const aiChatMessages = document.getElementById('aiChatMessages');

// 💡 Simple Local AI Knowledge Graph Matrix matching user metrics
const aiKnowledgeBase = {
    "hello": "Hello! Welcome to SheCan Foundation. How can I help you support women empowerment today?",
    "impact": "Our footprint is expanding rapidly! In 2026, we have successfully graduated over 4,200 women from vocational tracks and run on a 92% direct program efficiency rate.",
    "scholarship": "We offer dedicated digital literacy and skill orientation scholarships to vulnerable daughters and mothers. You can apply via our join form!",
    "founder": "She Can Foundation was established by Reeta Mishra. She actively serves as our current President to break down systemic gender barriers from the ground up.",
    "child": "We run aggressive child welfare rescue initiatives, removing vulnerable children from hard labor environments and shifting them safely into classrooms.",
    "help": "You can type or speak keywords like 'impact', 'scholarship', 'child' or 'founder' to learn instantly about our operation bounds!"
};

// Toggle Widget Interface Popup visibility map
if (aiToggleBtn && aiChatBox && aiCloseBtn) {
    aiToggleBtn.addEventListener('click', () => aiChatBox.classList.toggle('active'));
    aiCloseBtn.addEventListener('click', () => aiChatBox.classList.remove('active'));
}

// Stream execution handler
if (aiSendBtn && aiTextInput) {
    aiSendBtn.addEventListener('click', processUserQuery);
    aiTextInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processUserQuery();
    });
}

function processUserQuery() {
    const rawText = aiTextInput.value.trim();
    if (rawText === "") return;

    appendChatMessage(rawText, 'user-msg');
    aiTextInput.value = ""; // Clear active viewport buffer line

    // Generate responsive response string mapping
    let responseText = "I heard your query, but my training covers focus terms like 'impact', 'scholarships', 'child' or 'founder'. Try saying one of those!";
    const processedQuery = rawText.toLowerCase();

    for (const token in aiKnowledgeBase) {
        if (processedQuery.includes(token)) {
            responseText = aiKnowledgeBase[token];
            break;
        }
    }

    // Delay agent injection response line for standard fluid conversational look
    setTimeout(() => {
        appendChatMessage(responseText, 'ai-msg');
        speakResponseAloud(responseText);
    }, 600);
}

function appendChatMessage(text, className) {
    const bubbleElement = document.createElement('div');
    bubbleElement.classList.add('message', className);
    bubbleElement.textContent = text;
    aiChatMessages.appendChild(bubbleElement);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight; // Keep message base view aligned
}

// 🔊 Text-To-Speech Output Engine Layer
function speakResponseAloud(textString) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Halt background system voice cues
        const vocalUtterance = new SpeechSynthesisUtterance(textString);
        vocalUtterance.rate = 1.0;
        vocalUtterance.pitch = 1.0;
        window.speechSynthesis.speak(vocalUtterance);
    }
}

// 🎤 Microphone Speech Recognition Input Engine Layer
if (aiVoiceBtn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
        const structuralSpeechEngine = new SpeechRecognition();
        structuralSpeechEngine.continuous = false;
        structuralSpeechEngine.lang = 'en-IN'; // Tuned perfectly to standard Indian English pronunciation
        structuralSpeechEngine.interimResults = false;

        aiVoiceBtn.addEventListener('click', () => {
            try {
                structuralSpeechEngine.start();
            } catch (err) {
                structuralSpeechEngine.stop();
            }
        });

        structuralSpeechEngine.onstart = () => aiVoiceBtn.classList.add('listening');
        structuralSpeechEngine.onend = () => aiVoiceBtn.classList.remove('listening');
        
        structuralSpeechEngine.onresult = (event) => {
            const vocalResultText = event.results[0][0].transcript;
            if (aiTextInput) {
                aiTextInput.value = vocalResultText;
                processUserQuery(); // Auto-fire question stream instantly
            }
        };
    } else {
        aiVoiceBtn.style.display = 'none'; // Safe fallback hiding item if webview does not support microphone arrays
    }
}

// ==========================================================================
// --- 💌 5. INLINE QUICK NEWSLETTER INTERACTION MODULE ---
// ==========================================================================
const inlineNewsletterForm = document.getElementById('inlineNewsletterForm');
const newsletterEmailInput = document.getElementById('newsletterEmailInput');
const newsletterSuccessState = document.getElementById('newsletterSuccessState');

if (inlineNewsletterForm && newsletterEmailInput && newsletterSuccessState) {
    inlineNewsletterForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop native page reload sequence
        
        // Simple client-side validation logic
        if (newsletterEmailInput.value.trim() !== "") {
            // Trigger the clean micro-animated inline box entry via CSS
            newsletterSuccessState.classList.add('reveal-active');
            inlineNewsletterForm.reset(); // Wipe standard input data safely
            
            // Auto-collapse the banner back down smoothly after 4 seconds
            setTimeout(() => {
                newsletterSuccessState.classList.remove('reveal-active');
            }, 4000);
        }
    });
}

// ==========================================================================
// --- 💰 6. INTERACTIVE DONATION IMPACT CALCULATOR LOADER ---
// ==========================================================================
const impactSlider = document.getElementById('impactSlider');
const calcAmountLabel = document.getElementById('calcAmountLabel');
const suppliesCount = document.getElementById('suppliesCount');
const kitsCount = document.getElementById('kitsCount');
const certsCount = document.getElementById('certsCount');

if (impactSlider && calcAmountLabel && suppliesCount && kitsCount && certsCount) {
    
    // Function to run metric evaluation loops in real-time
    function updateCalculatedImpactValues() {
        const fundingValue = parseInt(impactSlider.value);
        
        // Format layout number output values dynamically with local comma delimiters
        calcAmountLabel.textContent = fundingValue.toLocaleString('en-IN');

        // Cost structure metrics calibration parameters (INR Equivalent mapping)
        // ₹500  = 1 Month School Supplies Pack for a young girl
        // ₹2,000 = 1 Vocational Training Toolkit for a mother
        // ₹5,000 = 1 Full Technical Literacy Course Track for a student
        
        const calculatedSupplies = Math.floor(fundingValue / 500);
        const calculatedKits = Math.floor(fundingValue / 2000);
        const calculatedCerts = Math.floor(fundingValue / 5000);

        // Update Text Nodes dynamically inside UI rows with custom logic formatting
        suppliesCount.textContent = calculatedSupplies === 12 ? "1 Full Year (12 Months)" : `${calculatedSupplies} Months`;
        kitsCount.textContent = calculatedKits === 1 ? "1 Complete Kit" : `${calculatedKits} Toolkits`;
        certsCount.textContent = calculatedCerts === 1 ? "1 Student Onboarded" : `${calculatedCerts} Students Certified`;
    }

    // Connect update handlers across standard input adjustment states
    impactSlider.addEventListener('input', updateCalculatedImpactValues);
    
    // Fire it once right on system script load to map initialization setup numbers correctly
    updateCalculatedImpactValues();
}