// Hardcoded questions by category
const QUESTIONS = {
    science: [
        {
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: 1
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["O2", "H2O", "CO2", "NaCl"],
            answer: 1
        },
        {
            question: "What gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            answer: 2
        }
    ],
    history: [
        {
            question: "Who was the first President of the United States?",
            options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
            answer: 1
        },
        {
            question: "In which year did World War II end?",
            options: ["1945", "1939", "1918", "1963"],
            answer: 0
        },
        {
            question: "Which ancient civilization built the pyramids?",
            options: ["Romans", "Greeks", "Egyptians", "Mayans"],
            answer: 2
        }
    ],
    sports: [
        {
            question: "How many players are there in a soccer team?",
            options: ["9", "10", "11", "12"],
            answer: 2
        },
        {
            question: "Which country hosted the 2016 Summer Olympics?",
            options: ["China", "Brazil", "UK", "Russia"],
            answer: 1
        },
        {
            question: "What sport is Serena Williams famous for?",
            options: ["Tennis", "Soccer", "Basketball", "Golf"],
            answer: 0
        }
    ]
};

// Category icons
const CATEGORY_ICONS = {};

// DOM Elements
const setupDiv = document.getElementById('setup');
const quizDiv = document.getElementById('quiz');
const resultDiv = document.getElementById('result');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const categorySelect = document.getElementById('category');
const numQuestionsInput = document.getElementById('numQuestions');
const timeLimitInput = document.getElementById('timeLimit');
const questionText = document.getElementById('questionText');
const optionsDiv = document.getElementById('options');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const categoryDisplay = document.getElementById('categoryDisplay');
const hud = document.getElementById('hud');
const progressBar = document.getElementById('progressBar');
const darkModeToggle = document.getElementById('darkModeToggle');
const quitBtn = document.getElementById('quitBtn');

// Game State
let questions = [];
let currentQuestion = 0;
let score = 0;
let timer = null;
let timeLeft = 0;
let timeLimit = 0;
let answers = [];
let darkMode = false;
let quitEarly = false;

// Helper: Map category to Open Trivia DB category ID
const TRIVIA_CATEGORY_IDS = {
    general: 9, // General Knowledge
    science: 17, // Science & Nature
    history: 23, // History
    sports: 21,  // Sports
    entertainment: 11, // Entertainment: Film
    geography: 22, // Geography
    computers: 18, // Science: Computers
    math: 19, // Science: Mathematics
    politics: 24, // Politics
    art: 25, // Art
    animals: 27, // Animals
    vehicles: 28 // Vehicles
};

// Helper: Decode HTML entities from API
function decodeHTMLEntities(text) {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getQuestions(category, num) {
    let pool = [];
    if (category === 'random') {
        Object.values(QUESTIONS).forEach(arr => pool.push(...arr));
    } else {
        pool = [...QUESTIONS[category]];
    }
    shuffle(pool);
    return pool.slice(0, num);
}

function animateCardTransition(hideDiv, showDiv) {
    if (hideDiv) {
        hideDiv.classList.remove('fadeInUp');
        hideDiv.classList.add('fadeOutDown');
        setTimeout(() => {
            hideDiv.style.display = 'none';
            hideDiv.classList.remove('fadeOutDown');
            if (showDiv) {
                showDiv.style.display = 'block';
                showDiv.classList.add('fadeInUp');
                setTimeout(() => showDiv.classList.remove('fadeInUp'), 800);
            }
        }, 500);
    } else if (showDiv) {
        showDiv.style.display = 'block';
        showDiv.classList.add('fadeInUp');
        setTimeout(() => showDiv.classList.remove('fadeInUp'), 800);
    }
}

function showMainHeading(show) {
    const heading = document.getElementById('mainHeading');
    if (heading) heading.style.display = show ? '' : 'none';
}

function updateQuizHeader() {
    const cat = categorySelect.value;
    // Modern, stylish, centered header row
    categoryDisplay.innerHTML = `<span style='font-size:2.2rem;font-weight:900;color:var(--accent);background:rgba(255,255,255,0.07);border-radius:1em;padding:0.2em 1em;box-shadow:0 2px 8px #f4d35e22;'>${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>`;
    scoreDisplay.innerHTML = `<span style='font-size:2.5rem;font-weight:900;color:var(--secondary);background:rgba(255,255,255,0.07);border-radius:1em;padding:0.2em 1.2em;box-shadow:0 2px 8px #6c63ff22;'>Score: <span id='scoreNum'>${score}</span></span>`;
    // timerDisplay is handled in showQuestion
    // Center the header row
    const quizHeader = document.getElementById('quizHeader');
    if (quizHeader) quizHeader.style.justifyContent = 'center';
    if (quizHeader) quizHeader.style.gap = '32px';
}

function updateQuizProgressBar() {
    const bar = document.getElementById('quizProgressBar');
    if (!bar || !questions.length) return;
    const percent = ((currentQuestion) / questions.length) * 100;
    bar.style.width = percent + '%';
}

function animateScore(isCorrect) {
    const scoreNum = document.getElementById('scoreNum');
    if (!scoreNum) return;
    scoreNum.style.transition = 'color 0.2s, transform 0.2s';
    scoreNum.style.color = isCorrect ? 'var(--success)' : 'var(--danger)';
    scoreNum.style.transform = 'scale(1.3)';
    setTimeout(() => {
        scoreNum.style.color = '';
        scoreNum.style.transform = '';
    }, 400);
}

function showConfetti() {}

function toggleDarkMode() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.remove('light-mode');
        darkModeToggle.textContent = '☀️';
    } else {
        document.body.classList.add('light-mode');
        darkModeToggle.textContent = '🌙';
    }
}

// Set initial mode to dark mode
if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
}
darkModeToggle.textContent = '☀️';
darkMode = true;

darkModeToggle.style.display = 'inline-block';
darkModeToggle.onclick = toggleDarkMode;

// Show loading state
function showLoading() {
    questionText.textContent = 'Loading questions...';
    optionsDiv.innerHTML = '';
    nextBtn.style.display = 'none';
}

// Fetch questions from Open Trivia DB
async function fetchQuestions(category, num, difficulty) {
    let url = `https://opentdb.com/api.php?amount=${num}&type=multiple`;
    if (category !== 'random' && TRIVIA_CATEGORY_IDS[category]) {
        url += `&category=${TRIVIA_CATEGORY_IDS[category]}`;
    }
    if (difficulty && difficulty !== 'any') {
        url += `&difficulty=${difficulty}`;
    }
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.response_code !== 0) throw new Error('No questions found');
        // Parse questions
        return data.results.map(q => {
            const options = [...q.incorrect_answers.map(decodeHTMLEntities), decodeHTMLEntities(q.correct_answer)];
            shuffle(options);
            return {
                question: decodeHTMLEntities(q.question),
                options,
                answer: options.indexOf(decodeHTMLEntities(q.correct_answer))
            };
        });
    } catch (e) {
        return null;
    }
}

function getTimeLimit(difficulty) {
    if (difficulty === 'easy') return 30;
    if (difficulty === 'medium') return 20;
    if (difficulty === 'hard') return 12;
    return 20; // 'any' or fallback
}

function resetSetupForm() {
    categorySelect.value = 'random';
    document.getElementById('difficulty').value = 'any';
    numQuestionsInput.value = 5;
    // Remove focus from any input
    document.activeElement.blur();
}

function showError(message) {
    questionText.textContent = '';
    optionsDiv.innerHTML = `<div style='color:var(--accent3);font-size:1.3rem;font-weight:bold;margin-bottom:24px;'>${message}</div><button id='backToSetupBtn' style='margin-top:16px;'>Back to Setup</button>`;
    nextBtn.style.display = 'none';
    const backBtn = document.getElementById('backToSetupBtn');
    if (backBtn) backBtn.onclick = () => {
        resetSetupForm();
        animateCardTransition(quizDiv, setupDiv);
        resultDiv.style.display = 'none';
    };
}

async function startGame() {
    const category = categorySelect.value;
    const numQuestions = Math.max(1, Math.min(10, parseInt(numQuestionsInput.value)));
    const difficulty = document.getElementById('difficulty').value;
    timeLimit = getTimeLimit(difficulty);
    questions = [];
    currentQuestion = 0;
    score = 0;
    answers = [];
    animateCardTransition(setupDiv, quizDiv);
    resultDiv.style.display = 'none';
    showLoading();
    updateQuizProgressBar();
    updateQuizHeader();
    // Fetch from API
    let apiQuestions = await fetchQuestions(category, numQuestions, difficulty);
    if (!apiQuestions && category === 'random') {
        // Try to fetch a mix of categories if random fails
        apiQuestions = [];
        for (const cat of Object.keys(TRIVIA_CATEGORY_IDS)) {
            const q = await fetchQuestions(cat, Math.ceil(numQuestions / 3), difficulty);
            if (q) apiQuestions.push(...q);
        }
        apiQuestions = apiQuestions.slice(0, numQuestions);
    }
    if (apiQuestions && apiQuestions.length) {
        questions = apiQuestions;
        showQuestion();
    } else {
        showError('No questions found for your selection. Please try a different category or difficulty.');
    }
}

function showQuestion() {
    showMainHeading(false);
    clearInterval(timer);
    if (currentQuestion >= questions.length) {
        return endGame();
    }
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionText.classList.remove('fadeInUp');
    void questionText.offsetWidth; // trigger reflow
    questionText.classList.add('fadeInUp');
    optionsDiv.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(idx, btn);
        btn.style.opacity = 0;
        optionsDiv.appendChild(btn);
        setTimeout(() => {
            btn.style.transition = 'opacity 0.4s';
            btn.style.opacity = 1;
        }, 80 * idx);
    });
    updateQuizHeader();
    updateQuizProgressBar();
    nextBtn.style.display = 'none';
    if (timeLimit > 0) {
        timeLeft = timeLimit;
        timerDisplay.innerHTML = `<span style='font-size:2.5rem;font-weight:900;color:var(--accent3);background:rgba(255,255,255,0.07);border-radius:1em;padding:0.2em 0.7em;box-shadow:0 2px 8px #ff6b6b22;'><span style='vertical-align:middle;'>⏰</span> ${timeLeft}s</span>`;
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.innerHTML = `<span style='font-size:2.5rem;font-weight:900;color:var(--accent3);background:rgba(255,255,255,0.07);border-radius:1em;padding:0.2em 0.7em;box-shadow:0 2px 8px #ff6b6b22;'><span style='vertical-align:middle;'>⏰</span> ${timeLeft}s</span>`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                selectOption(-1, null, true);
            }
        }, 1000);
    } else {
        timerDisplay.innerHTML = '';
    }
}

function selectOption(idx, btn, timeout = false) {
    clearInterval(timer);
    const q = questions[currentQuestion];
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((b, i) => {
        b.disabled = true;
        if (i === q.answer) b.classList.add('correct');
        if (i === idx && idx !== q.answer) b.classList.add('incorrect');
    });
    let isCorrect = idx === q.answer;
    if (isCorrect) {
        score++;
        if (btn) btn.classList.add('selected');
    }
    animateScore(isCorrect);
    answers.push({
        question: q.question,
        options: q.options,
        correct: q.answer,
        chosen: idx,
        timeout: timeout
    });
    nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function endGame() {
    showMainHeading(true);
    animateCardTransition(quizDiv, resultDiv);
    updateQuizProgressBar();
    // Summary (always visible)
    let summary = '<h2>Game Over!</h2>';
    if (quitEarly) summary += `<p style='color:var(--accent3);font-weight:bold;'>You quit the quiz early.</p>`;
    summary += `<p>Your Score: <span style='color:var(--secondary)'>${score} / ${questions.length}</span></p>`;
    document.getElementById('resultSummary').innerHTML = summary;
    // Hide details by default
    const detailsDiv = document.getElementById('resultDetails');
    detailsDiv.style.display = 'none';
    // More Details button logic
    const moreBtn = document.getElementById('moreDetailsBtn');
    moreBtn.textContent = 'More Details';
    moreBtn.onclick = () => {
        if (detailsDiv.style.display === 'none') {
            let details = '';
            answers.forEach((a, i) => {
                details += `<div style='margin-bottom:10px;'><b>Q${i+1}:</b> ${a.question}<br>`;
                a.options.forEach((opt, idx) => {
                    let style = '';
                    if (idx === a.correct) style = 'color:var(--success);font-weight:bold;';
                    if (idx === a.chosen && idx !== a.correct) style = 'color:var(--danger);text-decoration:line-through;';
                    details += `<span style='${style}'>${opt}</span>${idx < a.options.length-1 ? ', ' : ''}`;
                });
                if (a.timeout) details += " <span style='color:var(--danger);'>(timeout)</span>";
                details += '</div>';
            });
            detailsDiv.innerHTML = details;
            detailsDiv.style.display = 'block';
            moreBtn.textContent = 'Hide Details';
        } else {
            detailsDiv.style.display = 'none';
            moreBtn.textContent = 'More Details';
        }
    };
    // Play Again button logic
    document.getElementById('playAgainBtn').onclick = restartGame;
    quitEarly = false;
}

function restartGame() {
    showMainHeading(true);
    window.location.reload();
}

quitBtn.onclick = function() {
    quitEarly = true;
    resetSetupForm();
    endGame();
};

startBtn.onclick = startGame;
nextBtn.onclick = nextQuestion; 