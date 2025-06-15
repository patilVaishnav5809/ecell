// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Initialize Particle.js
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#00ffaa"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00ffaa",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Event Countdown Timer
function updateCountdown() {
    const nextEventDate = new Date('2023-12-15T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = nextEventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.querySelector('.countdown-timer').innerHTML = '<div class="event-live">Event is Live Now!</div>';
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// Load Events from JSON
fetch('data/events.json')
    .then(response => response.json())
    .then(data => {
        const eventCarousel = document.querySelector('.event-carousel');
        data.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-image" style="background-image: url('${event.image}')"></div>
                <div class="event-details">
                    <p class="event-date">${event.date}</p>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-desc">${event.description}</p>
                    <a href="${event.link}" class="event-cta">Register Now</a>
                </div>
            `;
            eventCarousel.appendChild(eventCard);
        });
    });

// Load Founder Videos
fetch('data/founders.json')
    .then(response => response.json())
    .then(data => {
        const videoCarousel = document.querySelector('.video-carousel');
        data.forEach(founder => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <div class="video-thumbnail" style="background-image: url('${founder.thumbnail}')">
                    <div class="play-icon">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${founder.title}</h3>
                    <p class="video-founder">${founder.name}</p>
                    <p class="video-desc">${founder.description}</p>
                </div>
            `;
            videoCarousel.appendChild(videoCard);
        });
    });

// Entrepreneur Quiz
const quizQuestions = [
    {
        question: "How do you handle failure?",
        options: [
            "Learn and pivot",
            "Blame external factors",
            "Give up immediately",
            "Analyze and try again"
        ],
        correct: 0
    },
    {
        question: "What's your approach to new ideas?",
        options: [
            "Validate quickly with customers",
            "Spend months perfecting before showing anyone",
            "Wait for someone else to try it first",
            "Only pursue ideas with guaranteed success"
        ],
        correct: 0
    },
    {
        question: "How do you make decisions?",
        options: [
            "Data-driven analysis",
            "Gut feeling",
            "Committee consensus",
            "Avoid making decisions"
        ],
        correct: 0
    }
];

const quizContainer = document.getElementById('entrepreneurQuiz');
const quizResult = document.getElementById('quizResult');
let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showResult();
        return;
    }

    const question = quizQuestions[currentQuestion];
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <p>${currentQuestion + 1}. ${question.question}</p>
            ${question.options.map((option, index) => `
                <button class="quiz-option" data-index="${index}">${option}</button>
            `).join('')}
        </div>
    `;

    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedIndex = parseInt(e.target.getAttribute('data-index'));
    if (selectedIndex === quizQuestions[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    displayQuestion();
}

function showResult() {
    let resultText = '';
    if (score === quizQuestions.length) {
        resultText = `
            <h3>You're a Natural Entrepreneur!</h3>
            <p>You have the mindset and skills to build successful ventures.</p>
        `;
    } else if (score >= quizQuestions.length / 2) {
        resultText = `
            <h3>You Have Potential!</h3>
            <p>With some guidance, you could become a great entrepreneur.</p>
        `;
    } else {
        resultText = `
            <h3>Keep Learning!</h3>
            <p>Entrepreneurship is a journey. Start with our resources.</p>
        `;
    }

    quizContainer.style.display = 'none';
    quizResult.innerHTML = `
        ${resultText}
        <p>Your score: ${score}/${quizQuestions.length}</p>
        <button id="retake-quiz" class="btn btn-primary">Retake Quiz</button>
        <button id="share-quiz" class="btn btn-secondary">Share Results</button>
    `;
    quizResult.style.display = 'block';

    document.getElementById('retake-quiz').addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        quizContainer.style.display = 'block';
        quizResult.style.display = 'none';
        displayQuestion();
    });

    document.getElementById('share-quiz').addEventListener('click', () => {
        alert('Share feature would link to social media APIs in production');
    });
}

displayQuestion();