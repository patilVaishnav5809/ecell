// AI Mentor Chatbot
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const userMessageInput = document.getElementById('userMessage');
const sendMessageBtn = document.getElementById('sendMessage');

// Sample responses (in production, connect to OpenAI API)
const botResponses = {
    "hello": "Hi there! How can I help you with your startup journey today?",
    "funding": "RCPIT startups can access funding through: 1) College incubation grants 2) Government schemes like DST-NIDHI 3) Angel investor network",
    "mentorship": "We have industry mentors available every Thursday. You can book a session through our portal.",
    "events": "Our next event is 'Pitch Perfect' on 15th December. Register through our events page!",
    "default": "I'm still learning! For detailed queries, please contact ecell@rcpit.ac.in"
};

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
});

// Send message function
function sendMessage() {
    const message = userMessageInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, true);
    userMessageInput.value = '';

    // Bot response
    setTimeout(() => {
        let response = botResponses.default;
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = botResponses.hello;
        } else if (lowerMessage.includes('fund') || lowerMessage.includes('money')) {
            response = botResponses.funding;
        } else if (lowerMessage.includes('mentor') || lowerMessage.includes('guide')) {
            response = botResponses.mentorship;
        } else if (lowerMessage.includes('event') || lowerMessage.includes('workshop')) {
            response = botResponses.events;
        }

        addMessage(response);
    }, 1000);
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Event listeners
sendMessageBtn.addEventListener('click', sendMessage);
userMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Initial bot message
setTimeout(() => {
    addMessage("Hello! I'm your Startup Mentor AI. How can I help you today?");
}, 500);