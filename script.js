const baseQuestions = [
            // Extraversion (E)
            { text: "I very quiet one, don't really talk much.", trait: "E", reverse: true },
            { text: "I naturally take charge one, will become leader without planning.", trait: "E", reverse: false },
            { text: "I quite high energy, cannot sit still leh.", trait: "E", reverse: false },

            // Agreeableness (A)
            { text: "I very soft-hearted lah, always feel for people easily.", trait: "A", reverse: false },
            { text: "Sometimes I can be quite rude lah, but aiyah, I don't mean it one.", trait: "A", reverse: true },
            { text: "I always assume people got good intentions one.", trait: "A", reverse: false },

            // Conscientiousness (C)
            { text: "I quite messy; I anyhow organise things.", trait: "C", reverse: true },
            { text: "I got difficulty starting tasks, always drag first one.", trait: "C", reverse: true },
            { text: "I quite reliable lah, people can depend on me one.", trait: "C", reverse: false },

            // Emotionality/Neuroticism (N)
            { text: "I worry a lot sia, small small things also got stress.", trait: "N", reverse: false },
            { text: "I sometimes feel quite down or emo lah.", trait: "N", reverse: false },
            { text: "I quite steady lah, I not so easily upset one.", trait: "N", reverse: true },

            // Open-Mindedness (O)
            { text: "I quite into art, music and literature kind of stuff.", trait: "O", reverse: false },
            { text: "I not really into abstract or cheem ideas one.", trait: "O", reverse: true },
            { text: "I quite creative one, always got new ideas.", trait: "O", reverse: false }
        ];

        function getShuffledQuestions() {
            const allQuestions = [...baseQuestions];

            // Fisher-Yates shuffle
            for (let i = allQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
            }

            return allQuestions;
        }

        let questions = getShuffledQuestions();

        const options = [
            { text: "Definitely lah", value: 5 },
            { text: "Yeah lah, quite true", value: 4 },
            { text: "Aiyah, so-so only", value: 3 },
            { text: "Not really leh", value: 2 },
            { text: "Aiyo, no way liao", value: 1 }
        ];

        const traitColors = {
            E: { color: '#FF6B6B', colorLight: '#FF8E53' },
            A: { color: '#00B4DB', colorLight: '#0083B0' },
            C: { color: '#FFD89B', colorLight: '#FFC92A' },
            N: { color: '#C061F0', colorLight: '#E75480' },
            O: { color: '#11998E', colorLight: '#38EF7D' }
        };

        const healthScreeningQuestions = [
            {
                id: "age",
                question: "What is your age?",
                type: "radio",
                options: ["<18 years old", "18 to 24 years old", "25 to 34 years old", "35 to 44 years old", "45 to 54 years old", "55 to 64 years old", "≥65 years old"]
            },
            {
                id: "gender",
                question: "What is your gender?",
                type: "radio",
                options: ["Male", "Female"]
            },
            {
                id: "breast_cancer_importance",
                question: "How important is breast cancer screening to you personally?",
                type: "scale",
                scale: 5,
                scaleLabels: ["Not important", "Very important"],
                condition: (responses) => responses["gender"] === "Female"
            },
            {
                id: "breast_cancer_eligible",
                question: "To your knowledge, are you eligible to go for breast cancer screening?",
                type: "radio",
                options: ["Yes", "No"],
                condition: (responses) => responses["gender"] === "Female"
            },
            {
                id: "mammogram_before",
                question: "Have you ever had a mammogram before?",
                type: "radio",
                options: ["Yes", "No"],
                condition: (responses) => responses["gender"] === "Female"
            },
            {
                id: "mammogram_last_time",
                question: "When was the last time you had a mammogram?",
                type: "radio",
                options: ["Less than 1 year ago", "1 to 2 years ago", "2 to 5 years ago", "More than 5 years ago"],
                condition: (responses) => responses["gender"] === "Female" && responses["mammogram_before"] === "Yes"
            },
            {
                id: "mammogram_discomfort_rating",
                question: "How would you rate the discomfort experienced?",
                type: "scale",
                scale: 5,
                scaleLabels: ["Not uncomfortable", "Very uncomfortable"],
                condition: (responses) => responses["gender"] === "Female" && responses["mammogram_before"] === "Yes"
            },
            {
                id: "mammogram_discouraging_factors",
                question: "Which of the following factors may discourage you from going for mammography? Select all that apply.",
                type: "checkbox",
                options: ["Time inconvenience", "Monetary cost", "Pain/discomfort by the procedure", "Anxiety over a possible diagnosis", "Others"],
                condition: (responses) => responses["gender"] === "Female"
            },
            {
                id: "colorectal_cancer_importance",
                question: "How important is colorectal cancer screening to you personally?",
                type: "scale",
                scale: 5,
                scaleLabels: ["Not important", "Very important"],
                condition: (responses) => responses["gender"] === "Male"
            },
            {
                id: "colorectal_cancer_eligible",
                question: "To your knowledge, are you eligible to go for colorectal cancer screening?",
                type: "radio",
                options: ["Yes", "No"],
                condition: (responses) => responses["gender"] === "Male"
            },
            {
                id: "colonoscopy_before",
                question: "Have you ever had a colonoscopy before?",
                type: "radio",
                options: ["Yes", "No"],
                condition: (responses) => responses["gender"] === "Male"
            },
            {
                id: "colonoscopy_last_time",
                question: "When was the last time you had a colonoscopy?",
                type: "radio",
                options: ["Less than 1 year ago", "1 to 2 years ago", "2 to 5 years ago", "More than 5 years ago"],
                condition: (responses) => responses["gender"] === "Male" && responses["colonoscopy_before"] === "Yes"
            },
            {
                id: "colonoscopy_discomfort_rating",
                question: "How would you rate the discomfort experienced?",
                type: "scale",
                scale: 5,
                scaleLabels: ["Not uncomfortable", "Very uncomfortable"],
                condition: (responses) => responses["gender"] === "Male" && responses["colonoscopy_before"] === "Yes"
            },
            {
                id: "colonoscopy_discouraging_factors",
                question: "Which of the following factors may discourage you from going for colonoscopy? Select all that apply.",
                type: "checkbox",
                options: ["Time inconvenience", "Monetary cost", "Pain/discomfort by the procedure", "Anxiety over a possible diagnosis", "Others"],
                condition: (responses) => responses["gender"] === "Male"
            }
        ];

        function getVisibleQuestions() {
            return healthScreeningQuestions.filter(q => {
                if (!q.condition) return true;
                return q.condition(healthResponses);
            });
        }

        const themes = {
            disney_princesses: {
                name: 'Disney Princesses',
                characters: {
                    O: { name: 'Belle', description: "You very very curious! You got see the world through a unique lens one. You also very creative one, not afraid to be different from everyone else." },
                    C: { name: 'Mulan', description: "Any challenge, you tackle head-on one! Everything you do, you always see things through to the end. You never chao keng lah!" },
                    E: { name: 'Cinderella', description: "Wah, you very social! You also very enthu, any party without you incomplete liao. Your energy got draw lots of people to you one." },
                    A: { name: 'Snow White', description: "So kind! You very caring one. Anyone around you can feel the warmth you bring lah!" },
                    N: { name: 'Ariel', description: "You super introspective one! Emotions, you got feel intensely liao. A bit sensitive, but that’s okay lah." }
                }
            },
            animals: {
                name: 'Animals',
                characters: {
                    O: { name: 'Monkey', description: "Wah, you very curious one! Always got new ideas, never afraid to try new things liao." },
                    C: { name: 'Bee', description: "You very on one! Your work, you never anyhow do one; always chiong and on top of your things." },
                    E: { name: 'Lion', description: "Wah, you damn happening lah! Super shiok to hang out with you, you very outgoing and charismatic one." },
                    A: { name: 'Otter', description: "You really chill lah! You very very warm-hearted and never quarrel one." },
                    N: { name: 'Cat', description: "You a bit kiasu liao, but it's okay lah! You feel things very intensely one. Your peers you care very deeply for also." }
                }
            },
            nucleotide_bases: {
                name: 'Nucleotide Bases',
                characters: {
                    O: { name: 'Adenine', description: 'Wah, your brain always spinning with ideas lah! Cannot stop imagining new possibilities, always got some shiok chim thing going on in your head one.' },
                    C: { name: 'Guanine', description: 'So systematic lah you! Everything must plan properly, organize until shiok, then execute flawlessly. Your friends depend on you for this kind of discipline sia.' },
                    E: { name: 'Cytosine', description: 'Eh, you the life of the party lah! Any gathering got you, confirm more happening. People attracted to your energy like magnet one!' },
                    A: { name: 'Thymine', description: 'Your heart so soft sia! You always thinking about others first, never selfish. The world needs more people like you leh.' },
                    N: { name: 'Uracil', description: 'Aiyo, you carry a lot of feelings inside lah. Not easy to see from outside, but your emotions very deep. That why people feel comforted talking to you one.' }
                }
            },
            singapore_dishes: {
                name: 'Singaporean Dishes',
                characters: {
                    O: { name: 'Roti Prata', description: 'You can fold fold, change change, always got new flavor! Your creativity buay tahan, never get bored with you one.' },
                    C: { name: 'Chicken Rice', description: 'Simple, straightforward, but very satisfying. People know what they getting with you, \'cause you reliable, no nonsense, but very trustworthy one.' },
                    E: { name: 'Nasi Lemak', description: 'Wah lao, you bold and aromatic one, cannot ignore! You very prominent in any crowd, people always notice when you here or not.' },
                    A: { name: 'Ice Kacang', description: 'Very cooling and comforting when someone need one. You got ability to make people smile just by your presence, very shiok lah.' },
                    N: { name: 'Chili Crab', description: 'Look simple on outside, but inside got complex flavors and heat. Your emotions very nuanced, got many layers people don\'t always see one.' }
                }
            },
            vehicles: {
                name: 'Vehicles',
                characters: {
                    O: { name: 'Airplane', description: 'Soaring high with imagination lah you! Your mind always traveling to places others haven\'t thought of yet. Very chim ideas, very buay tahan to follow sometimes one.' },
                    C: { name: 'Truck', description: 'The workhorse type lah. Maybe not glamorous, but damn reliable sia. When people need something done properly, confirm they call you first.' },
                    E: { name: 'Motorbike', description: 'Zoooom! That\'s you lah - fast, exciting, cannot slow down! Your energy very infectious sia, everyone want to go on a ride with you one.' },
                    A: { name: 'Car', description: 'Like a comfy family car lah - safe, comfortable, everyone feel at home. Not trying to impress, just genuine nice person one.' },
                    N: { name: 'Train', description: 'On its tracks lah you - know where you going, very purposeful. You take time to speed up but very steady and aware of surroundings one, quite contemplative sia.' }
                }
            }
        };

        const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYZCGxB0OI7gao4bywVn3Cpak4yBa4HCnXaBOoLyEuwLFrHFKXURYpnVQi9GsFPpq3/exec";
        let currentQuestion = 0;
        let answers = new Array(15).fill(null);
        let lastResults = null;
        let lastDominantTrait = null;
        let confettiPlayed = false;
        let selectedTheme = null;
        let quizHistoryResponse = null;

        // Health Screening state
        let currentHealthQuestion = 0;
        let healthResponses = {
            age: "",
            gender: "",
            breast_cancer_importance: "",
            breast_cancer_eligible: "",
            mammogram_before: "",
            mammogram_discouraging_factors: [],
            mammogram_other_elaboration: "",
            mammogram_last_time: "",
            mammogram_discomfort_rating: "",
            colorectal_cancer_importance: "",
            colorectal_cancer_eligible: "",
            colonoscopy_before: "",
            colonoscopy_other_elaboration: "",
            colonoscopy_last_time: "",
            colonoscopy_discomfort_rating: "",
            colonoscopy_discouraging_factors: []
        };

        function startQuiz() {
            // Show the consent modal when the user clicks "Let's Go!"
            document.getElementById('consentModal').classList.add('active');
        }

        function acceptConsent() {
            // Hide the consent modal and show the theme selection screen
            document.getElementById('consentModal').classList.remove('active');
            showThemeSelection();
        }

        function showThemeSelection() {
            // Show the theme selection screen
            document.querySelector('.intro-screen').classList.remove('active');
            document.querySelector('.theme-screen').classList.add('active');
        }

        function selectTheme(theme) {
            // Store the selected theme
            selectedTheme = theme;
            console.log('Selected theme:', theme);
            
            // Also store in localStorage for access on results page
            try {
                localStorage.setItem('bfi_selectedTheme', theme);
            } catch (e) {
                console.warn('Could not persist theme to localStorage', e);
            }
            
            // Highlight the selected theme card
            document.querySelectorAll('.theme-card').forEach(card => {
                card.classList.remove('selected');
            });
            event.target.closest('.theme-card').classList.add('selected');
            
            // Check if both questions are answered
            checkCanProceed();
        }

        function setQuizHistory(response) {
            // Store the quiz history response
            quizHistoryResponse = response;
            console.log('Quiz history response:', response);
            
            // Also store in localStorage
            try {
                localStorage.setItem('bfi_quizHistory', response);
            } catch (e) {
                console.warn('Could not persist quiz history to localStorage', e);
            }
            
            // Check if both questions are answered
            checkCanProceed();
        }

        function checkCanProceed() {
            // Enable the button only if both theme and quiz history are selected
            const proceedBtn = document.getElementById('proceedBtn');
            if (selectedTheme && quizHistoryResponse) {
                proceedBtn.disabled = false;
            } else {
                proceedBtn.disabled = true;
            }
        }

        function proceedIfReady() {
            // Final check and proceed to quiz
            if (selectedTheme && quizHistoryResponse) {
                document.querySelector('.theme-screen').classList.remove('active');
                proceedWithQuiz();
            }
        }

        function declineConsent() {
            // Close the modal and return to intro screen
            document.getElementById('consentModal').classList.remove('active');
            alert('You must consent to continue with the study. If you change your mind, click "Let\'s Go!" again.');
        }

        function proceedWithQuiz() {
            // Initialize the quiz
            questions = getShuffledQuestions();
            answers = new Array(30).fill(null);
            currentQuestion = 0;
            document.querySelector('.intro-screen').classList.remove('active');
            document.querySelector('.quiz-screen').classList.add('active');
            updateProgress();
            displayQuestion();
        }

        function displayQuestion() {
            const q = questions[currentQuestion];
            document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1} of 15`;
            document.getElementById('questionText').textContent = q.text;

            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';

            options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = option.text;
                if (answers[currentQuestion] === option.value) {
                    btn.classList.add('selected');
                }
                btn.onclick = () => selectOption(option.value);
                optionsContainer.appendChild(btn);
            });

            updateButtons();
        }

        function selectOption(value) {
            answers[currentQuestion] = value;
            displayQuestion();
        }

        function updateProgress() {
            const answeredCount = answers.filter(answer => answer !== null).length;
            const progress = (answeredCount / 15) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressPercentage').textContent = Math.round(progress) + '%';
        }

        function updateHealthProgress() {
            const visibleQuestions = getVisibleQuestions();
            const totalVisible = visibleQuestions.length;
            const answeredCount = visibleQuestions.filter(q => {
                if (q.type === 'checkbox') {
                    return healthResponses[q.id].length > 0;
                } else {
                    return healthResponses[q.id] !== "";
                }
            }).length;
            const progress = (answeredCount / totalVisible) * 100;
            document.getElementById('healthProgressBar').style.width = progress + '%';
            document.getElementById('healthProgressPercentage').textContent = Math.round(progress) + '%';
        }

        function updateButtons() {
            document.getElementById('prevBtn').disabled = currentQuestion === 0;
            const nextBtn = document.getElementById('nextBtn');

            if (currentQuestion === 14) {
                nextBtn.textContent = 'See Results! 🎉';
                nextBtn.disabled = answers[currentQuestion] === null;
            } else {
                nextBtn.textContent = 'Next ➡️';
                nextBtn.disabled = answers[currentQuestion] === null;
            }
        }

        function nextQuestion() {
            if (answers[currentQuestion] === null) return;

            if (currentQuestion < 14) {
                currentQuestion++;
                updateProgress();
                displayQuestion();
            } else {
                // Show loading screen for 0.5 seconds before displaying health screening
                document.querySelector('.quiz-screen').classList.remove('active');
                document.querySelector('.loading-screen').classList.add('active');
                
                setTimeout(() => {
                    document.querySelector('.loading-screen').classList.remove('active');
                    document.querySelector('.health-screening-screen').classList.add('active');
                    // Initialize and display first health question
                    currentHealthQuestion = 0;
                    healthResponses = {
                        age: "",
                        gender: "",
                        breast_cancer_importance: "",
                        breast_cancer_eligible: "",
                        mammogram_before: "",
                        mammogram_discouraging_factors: [],
                        mammogram_other_elaboration: "",
                        mammogram_last_time: "",
                        mammogram_discomfort_rating: "",
                        colorectal_cancer_importance: "",
                        colorectal_cancer_eligible: "",
                        colonoscopy_before: "",
                        colonoscopy_other_elaboration: "",
                        colonoscopy_last_time: "",
                        colonoscopy_discomfort_rating: "",
                        colonoscopy_discouraging_factors: []
                    };
                    updateHealthProgress();
                    displayHealthQuestion();
                }, 500);
            }
        }

        function proceedToFinalResults() {
            // Post health screening data to Google Sheets
            postHealthScreeningToSheet();
            
            // Show loading screen for 0.5 seconds before displaying final results
            document.querySelector('.health-screening-screen').classList.remove('active');
            document.querySelector('.loading-screen').classList.add('active');
            
            setTimeout(() => {
                document.querySelector('.loading-screen').classList.remove('active');
                showResults();
            }, 500);
        }

        function displayHealthQuestion() {
            const visibleQuestions = getVisibleQuestions();
            const question = visibleQuestions[currentHealthQuestion];
            const totalVisible = visibleQuestions.length;
            
            document.getElementById('healthQuestionNumber').textContent = `Question ${currentHealthQuestion + 1} of ${totalVisible}`;
            document.getElementById('healthQuestionText').textContent = question.question;
            
            // Render options based on question type
            const optionsContainer = document.getElementById('healthOptionsContainer');
            optionsContainer.innerHTML = '';
            
            if (question.type === 'radio') {
                question.options.forEach((option, index) => {
                    const label = document.createElement('label');
                    label.className = 'health-option-label';
                    
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = `health-${question.id}`;
                    input.value = option;
                    input.checked = healthResponses[question.id] === option;
                    input.onchange = () => selectHealthOption(question.id, option);
                    
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(option));
                    optionsContainer.appendChild(label);
                });
            } else if (question.type === 'checkbox') {
                question.options.forEach((option, index) => {
                    const label = document.createElement('label');
                    label.className = 'health-option-label';
                    
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.name = `health-${question.id}`;
                    input.value = option;
                    input.checked = healthResponses[question.id].includes(option);
                    input.onchange = () => selectHealthCheckbox(question.id, option);
                    
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(option));
                    optionsContainer.appendChild(label);
                    
                    // Add text input for "Others" option
                    if (option === 'Others' && healthResponses[question.id].includes('Others')) {
                        const elaborationKey = question.id === 'mammogram_discouraging_factors' ? 'mammogram_other_elaboration' : 'colonoscopy_other_elaboration';
                        const textContainer = document.createElement('div');
                        textContainer.className = 'health-other-elaboration';
                        textContainer.style.marginTop = '10px';
                        textContainer.style.marginLeft = '40px';
                        
                        const textInput = document.createElement('textarea');
                        textInput.className = 'health-other-text';
                        textInput.placeholder = 'Please elaborate...';
                        textInput.value = healthResponses[elaborationKey];
                        textInput.style.width = '100%';
                        textInput.style.minHeight = '60px';
                        textInput.style.padding = '8px';
                        textInput.style.borderRadius = '6px';
                        textInput.style.border = '1px solid #ccc';
                        textInput.style.fontFamily = 'inherit';
                        textInput.onchange = (e) => {
                            healthResponses[elaborationKey] = e.target.value;
                            console.log('Elaboration text saved (onchange):', elaborationKey, e.target.value);
                        };
                        textInput.oninput = (e) => {
                            healthResponses[elaborationKey] = e.target.value;
                            console.log('Elaboration text updated (oninput):', elaborationKey, e.target.value);
                        };
                        
                        textContainer.appendChild(textInput);
                        optionsContainer.appendChild(textContainer);
                    }
                });
            } else if (question.type === 'scale') {
                const scaleContainer = document.createElement('div');
                scaleContainer.className = 'health-scale-container';
                
                const scaleLabelsDiv = document.createElement('div');
                scaleLabelsDiv.className = 'scale-labels';
                scaleLabelsDiv.innerHTML = `<span>${question.scaleLabels[0]}</span><span>${question.scaleLabels[1]}</span>`;
                scaleContainer.appendChild(scaleLabelsDiv);
                
                const scaleButtonsDiv = document.createElement('div');
                scaleButtonsDiv.className = 'health-scale-buttons';
                
                for (let i = 1; i <= question.scale; i++) {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'scale-btn';
                    if (healthResponses[question.id] === i) btn.classList.add('selected');
                    btn.textContent = i;
                    btn.onclick = () => selectHealthScale(question.id, i);
                    scaleButtonsDiv.appendChild(btn);
                }
                
                scaleContainer.appendChild(scaleButtonsDiv);
                optionsContainer.appendChild(scaleContainer);
            }
            
            // Update button states
            document.getElementById('healthPrevBtn').disabled = currentHealthQuestion === 0;
            
            let isAnswered = false;
            if (question.type === 'checkbox') {
                isAnswered = healthResponses[question.id].length > 0;
            } else {
                isAnswered = healthResponses[question.id] !== "";
            }
            document.getElementById('healthNextBtn').disabled = !isAnswered;
            
            // Change next button text if on last question
            if (currentHealthQuestion === totalVisible - 1) {
                document.getElementById('healthNextBtn').textContent = 'See Results ✨';
            } else {
                document.getElementById('healthNextBtn').textContent = 'Next ➡️';
            }
        }

        function selectHealthOption(questionId, option) {
            healthResponses[questionId] = option;
            document.getElementById('healthNextBtn').disabled = false;
        }

        function selectHealthCheckbox(questionId, option) {
            const index = healthResponses[questionId].indexOf(option);
            if (index > -1) {
                healthResponses[questionId].splice(index, 1);
            } else {
                healthResponses[questionId].push(option);
            }
            document.getElementById('healthNextBtn').disabled = healthResponses[questionId].length === 0;
            
            // Re-render the question to show/hide the elaboration text input when "Others" is toggled
            const visibleQuestions = getVisibleQuestions();
            const question = visibleQuestions[currentHealthQuestion];
            if (question.type === 'checkbox' && option === 'Others') {
                displayHealthQuestion();
            }
        }

        function selectHealthScale(questionId, value) {
            healthResponses[questionId] = value;
            // Update button UI
            document.querySelectorAll('.scale-btn').forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
            document.getElementById('healthNextBtn').disabled = false;
        }

        function nextHealthQuestion() {
            const visibleQuestions = getVisibleQuestions();
            const question = visibleQuestions[currentHealthQuestion];
            
            let isAnswered = false;
            if (question.type === 'checkbox') {
                isAnswered = healthResponses[question.id].length > 0;
            } else {
                isAnswered = healthResponses[question.id] !== "";
            }
            
            if (!isAnswered) return;
            
            if (currentHealthQuestion < visibleQuestions.length - 1) {
                currentHealthQuestion++;
                updateHealthProgress();
                displayHealthQuestion();
            } else {
                proceedToFinalResults();
            }
        }

        function prevHealthQuestion() {
            if (currentHealthQuestion > 0) {
                currentHealthQuestion--;
                displayHealthQuestion();
            }
        }

        function prevQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                displayQuestion();
            }
        }

        function calculateScores() {
            const traits = {
                E: { scores: [], name: 'Extraversion', emoji: '🎉' },
                A: { scores: [], name: 'Agreeableness', emoji: '🤝' },
                C: { scores: [], name: 'Conscientiousness', emoji: '📋' },
                N: { scores: [], name: 'Emotionality', emoji: '😰' },
                O: { scores: [], name: 'Open-Mindedness', emoji: '🌟' }
            };

            questions.forEach((q, index) => {
                let score = answers[index];
                if (q.reverse) {
                    score = 6 - score;
                }
                traits[q.trait].scores.push(score);
            });

            const results = {};
            Object.keys(traits).forEach(key => {
                const scores = traits[key].scores;
                const total = scores.reduce((a, b) => a + b, 0);
                results[key] = {
                    score: total,
                    percentage: ((total - 3) / 12) * 100,
                    name: traits[key].name,
                    emoji: traits[key].emoji,
                    color: traitColors[key].color,
                    colorLight: traitColors[key].colorLight
                };
            });
            return results;
        }

        function getAverageResults(results) {
            return results;
        }

        function getDescription(trait, score) {
            const descriptions = {
                E: {
                    high: "Wah you damn extroverted lah! Party animal type - confirm plus chop the life of every gathering. You love making new friends and sibeh vocal one. Probably your phone always got 99+ WhatsApp notifications.",
                    low: "You more introverted lah, prefer small gatherings or stay home shiok shiok. Not that you don't like people, but too much socializing makes you sian. Your ideal Friday night got Netflix at home, not Clarke Quay."
                },
                A: {
                    high: "Super agreeable! Always think of others first one, very accommodating and kind-hearted. When your friends need help, you drop everything to help them. Remember to take care of yourself also hor!",
                    low: "You quite straight-forward and direct lah. Tell things as it is, don't sugarcoat one. Not that you're mean liao, but you value honesty over making everyone happy. Some people might find you blunt, but at least you a real one leh!"
                },
                C: {
                    high: "Damn organized and responsible sia! Your life got structure, everything planned properly. You the type who color-code your calendar and actually stick to your to-do list. Boss sure like you one!",
                    low: "You more spontaneous and flexible lah. Planning not really your strong suit; you prefer to wing it and see how. Your room might be messy but somehow you function okay liao. YOLO mindset!"
                },
                N: {
                    high: "You quite sensitive to stress leh. Small things also can make you worried or anxious. Must learn to relax more hor! Maybe go exercise or meditation, cannot always stress until cannot sleep.",
                    low: "Sibeh steady pom pi pi! You very emotionally stable, not easily stressed or upset. Even when things go wrong, you can handle it calmly. This one good quality lah, but remember to still show emotions sometimes!"
                },
                O: {
                    high: "Very open-minded and creative! You always exploring and trying different things one. Confirm the type who will eat at new restaurant or travel to ulu places. Your Instagram probably very interesting!",
                    low: "You like what's familiar lah. Routine is good for you - same hawker stall, same coffee order, same route to work. Not boring one, just you know what you like! Why change when current one okay already?"
                }
            };

            return score >= 50 ? descriptions[trait].high : descriptions[trait].low;
        }

        function getDominantTrait(results) {
            const average = getAverageResults(results);
            let maxScore = -Infinity;
            let dominantTrait = null;

            Object.keys(average).forEach(key => {
                if (average[key].score > maxScore) {
                    maxScore = average[key].score;
                    dominantTrait = key;
                }
            });

            return dominantTrait;
        }

        function postResultsToSheet(results, dominantTrait) {
            const scores = {};

            Object.keys(results).forEach(key => {
                scores[key] = parseFloat(results[key].score.toFixed(2));
            });

            console.log('Posting to Google Sheets - Trait Scores:', scores);

            const exportData = {
                timestamp: new Date().toLocaleString(),
                dominant_trait: dominantTrait,
                extraversion: scores.E,
                agreeableness: scores.A,
                conscientiousness: scores.C,
                neuroticism: scores.N,
                open_mindedness: scores.O,
                quiz_history: quizHistoryResponse || 'not specified'
            };

            if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                console.log('Google Sheets integration not configured. Results data:', exportData);
                return;
            }

            const params = new URLSearchParams();
            Object.entries(exportData).forEach(([key, value]) => {
                params.append(key, value);
            });

            fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: params.toString()
            })
            .then(response => response.json())
            .then(data => {
                console.log('Results posted to Google Sheets');
            })
            .catch(error => {
                console.error('Error posting to Google Sheets:', error);
            });
        }

        function postHealthScreeningToSheet() {
            console.log('Posting health screening data to Google Sheets - Responses:', healthResponses);

            const exportData = {
                timestamp: new Date().toLocaleString(),
                age: healthResponses.age || 'not specified',
                gender: healthResponses.gender || 'not specified'
            };

            // Add gender-specific fields
            if (healthResponses.gender === "Female") {
                exportData.breast_cancer_importance = healthResponses.breast_cancer_importance || 'not specified';
                exportData.breast_cancer_eligible = healthResponses.breast_cancer_eligible || 'not specified';
                exportData.mammogram_before = healthResponses.mammogram_before || 'not specified';
                exportData.mammogram_last_time = healthResponses.mammogram_last_time || 'n/a';
                exportData.mammogram_discomfort_rating = healthResponses.mammogram_discomfort_rating || 'n/a';
                exportData.mammogram_discouraging_factors = (healthResponses.mammogram_discouraging_factors && healthResponses.mammogram_discouraging_factors.length > 0) ? healthResponses.mammogram_discouraging_factors.join('; ') : 'none';
                exportData.mammogram_other_elaboration = healthResponses.mammogram_other_elaboration || '';
                console.log('Female - mammogram_other_elaboration:', healthResponses.mammogram_other_elaboration);
            } else if (healthResponses.gender === "Male") {
                exportData.colorectal_cancer_importance = healthResponses.colorectal_cancer_importance || 'not specified';
                exportData.colorectal_cancer_eligible = healthResponses.colorectal_cancer_eligible || 'not specified';
                exportData.colonoscopy_before = healthResponses.colonoscopy_before || 'not specified';
                exportData.colonoscopy_last_time = healthResponses.colonoscopy_last_time || 'n/a';
                exportData.colonoscopy_discomfort_rating = healthResponses.colonoscopy_discomfort_rating || 'n/a';
                exportData.colonoscopy_discouraging_factors = (healthResponses.colonoscopy_discouraging_factors && healthResponses.colonoscopy_discouraging_factors.length > 0) ? healthResponses.colonoscopy_discouraging_factors.join('; ') : 'none';
                exportData.colonoscopy_other_elaboration = healthResponses.colonoscopy_other_elaboration || '';
                console.log('Male - colonoscopy_other_elaboration:', healthResponses.colonoscopy_other_elaboration);
            }
            
            console.log('Export data to be sent:', exportData);

            if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                console.log('Google Sheets integration not configured. Health screening data:', exportData);
                return;
            }

            const params = new URLSearchParams();
            params.append('action', 'health_screening');
            Object.entries(exportData).forEach(([key, value]) => {
                params.append(key, value);
            });
            
            console.log('Final params being sent:', params.toString());

            fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: params.toString()
            })
            .then(response => response.json())
            .then(data => {
                console.log('Health screening data posted to Google Sheets');
            })
            .catch(error => {
                console.error('Error posting health screening data to Google Sheets:', error);
            });
        }



        function showResults() {
            const results = calculateScores();
            const dominantTrait = getDominantTrait(results);

            // Store globally
            lastResults = results;
            lastDominantTrait = dominantTrait;

            // Post results to Google Sheet
            postResultsToSheet(results, dominantTrait);

            document.querySelector('.quiz-screen').classList.remove('active');
            document.querySelector('.results').classList.add('active');

            const container = document.getElementById('resultsContainer');
            container.innerHTML = '';

            // Check if a theme was selected
            const themedCharacter = selectedTheme && themes[selectedTheme] ? themes[selectedTheme].characters[dominantTrait] : null;

            // Main themed character section (if theme selected)
            if (themedCharacter && selectedTheme && themes[selectedTheme]) {
                const themedSection = document.createElement('div');
                themedSection.className = `themed-main-section highlighted highlighted-${dominantTrait}`;
                themedSection.style.background = `linear-gradient(135deg, ${traitColors[dominantTrait].color} 0%, ${traitColors[dominantTrait].colorLight} 100%)`;
                themedSection.innerHTML = `
                    <div class="themed-main">
                        <div class="themed-name-large">${themedCharacter.name}</div>
                        <div class="themed-description-large">${themedCharacter.description}</div>
                    </div>
                `;
                container.appendChild(themedSection);
            }

            // Trait scores
            const averageResults = getAverageResults(results);
            const averageTraitsSection = document.createElement('div');
            averageTraitsSection.className = 'traits-section';
            averageTraitsSection.innerHTML = '<h2>Your Trait Scores</h2>';

            Object.keys(averageResults).forEach(key => {
                const trait = averageResults[key];
                const card = document.createElement('div');
                card.className = 'trait-card';
                card.innerHTML = `
                    <div class="trait-header">
                        <div class="trait-name">
                            <span class="emoji">${trait.emoji}</span>
                            ${trait.name}
                        </div>
                        <div class="trait-score">${trait.percentage.toFixed(0)}%</div>
                    </div>
                    <div class="trait-bar">
                        <div class="trait-bar-fill" style="width: ${trait.percentage}%; background: linear-gradient(90deg, ${trait.color}, ${trait.colorLight});"></div>
                    </div>
                    <div class="trait-description">
                        ${getDescription(key, trait.percentage)}
                    </div>
                `;
                averageTraitsSection.appendChild(card);
            });
            container.appendChild(averageTraitsSection);

            // All traits section
            const allTraitsSection = document.createElement('div');
            allTraitsSection.className = 'all-traits-section';
            allTraitsSection.innerHTML = '<h2>All your friends leh!</h2>';

            const traitsGrid = document.createElement('div');
            traitsGrid.className = 'traits-grid';

            if (themedCharacter && selectedTheme && themes[selectedTheme]) {
                // Display theme-specific characters
                const themeData = themes[selectedTheme];
                Object.keys(themeData.characters).forEach(key => {
                    const char = themeData.characters[key];
                    const isUserCharacter = key === dominantTrait;
                    const charCard = document.createElement('div');
                    charCard.className = `trait-card-friends ${isUserCharacter ? `highlighted highlighted-${key}` : ''}`;
                    charCard.style.background = isUserCharacter ? `linear-gradient(135deg, ${traitColors[key].color} 0%, ${traitColors[key].colorLight} 100%)` : '#f8f9fa';
                    charCard.style.color = isUserCharacter ? 'white' : '#333';
                    charCard.innerHTML = `
                        <div class="trait-card-name">${char.name}</div>
                        <div class="trait-card-description">${char.description}</div>
                        ${isUserCharacter ? '<div class="user-trait-badge">IT\'S YOU!</div>' : ''}
                    `;
                    traitsGrid.appendChild(charCard);
                });
            } else {
                // Display trait cards with emojis
                Object.keys(averageResults).forEach(key => {
                    const trait = averageResults[key];
                    const isUserTrait = key === dominantTrait;
                    const traitCard = document.createElement('div');
                    traitCard.className = `trait-card-friends ${isUserTrait ? `highlighted highlighted-${key}` : ''}`;
                    traitCard.style.background = isUserTrait ? `linear-gradient(135deg, ${trait.color} 0%, ${trait.colorLight} 100%)` : '#f8f9fa';
                    traitCard.style.color = isUserTrait ? 'white' : '#333';
                    traitCard.innerHTML = `
                        <div class="trait-card-emoji">${trait.emoji}</div>
                        <div class="trait-card-name">${trait.name}</div>
                        <div class="trait-card-description">${getDescription(key, trait.percentage)}</div>
                        ${isUserTrait ? '<div class="user-trait-badge">IT\'S YOU!</div>' : ''}
                    `;
                    traitsGrid.appendChild(traitCard);
                });
            }

            allTraitsSection.appendChild(traitsGrid);
            container.appendChild(allTraitsSection);

            // Persist results so the separate results page can read them
            try {
                localStorage.setItem('bfi_lastResults', JSON.stringify({ results, dominantTrait, theme: selectedTheme, themedCharacter: themedCharacter }));
            } catch (e) {
                console.warn('Could not persist results to localStorage', e);
            }

            // Add a button to open the dedicated results page
            const viewPageWrapper = document.createElement('div');
            viewPageWrapper.className = 'view-results-page-wrapper';
            viewPageWrapper.innerHTML = `
                <a class="btn view-results-page-btn" href="live results.html" target="_self">📊 See Everyone's Results</a>
                <a class="btn" href="index.html">🔄 Take Quiz Again</a>
            `;
            container.appendChild(viewPageWrapper);

            // Launch confetti celebration once
            if (!confettiPlayed && typeof launchConfetti === 'function') {
                launchConfetti(100);
                confettiPlayed = true;
            }

            // Animate bars
            setTimeout(() => {
                document.querySelectorAll('.trait-bar-fill').forEach(bar => {
                    bar.style.width = bar.style.width;
                });
            }, 100);
        }

// --- Lightweight confetti engine ---
(function(){
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    let particles = [];
    const colors = ['#FF6B6B','#FF8E53','#00B4DB','#0083B0','#FFD89B','#FFC92A','#C061F0','#E75480','#11998E','#38EF7D'];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function rand(min, max){ return Math.random() * (max - min) + min; }

    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            vx: rand(-6,6),
            vy: rand(-10,-2),
            size: rand(6,12),
            color: colors[Math.floor(Math.random()*colors.length)],
            rot: rand(0,360),
            drag: 0.01 + Math.random()*0.02,
            gravity: 0.15 + Math.random()*0.12,
            ttl: 80 + Math.floor(Math.random()*40)
        };
    }

    let rafId = null;
    function render() {
        ctx.clearRect(0,0,W,H);
        for (let i = particles.length-1; i >= 0; i--) {
            const p = particles[i];
            p.vx *= (1 - p.drag);
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vx * 0.5;
            p.ttl--;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
            ctx.restore();

            if (p.ttl <= 0 || p.y > H + 50) particles.splice(i,1);
        }

        if (particles.length) rafId = requestAnimationFrame(render);
        else {
            cancelAnimationFrame(rafId);
            rafId = null;
            ctx.clearRect(0,0,W,H);
        }
    }

    // confetti!
    window.launchConfetti = function(duration){
        const end = Date.now() + (duration || 3000);
        const centreX = W/2;
        const centreY = H*0.18;

        function burst(){
            // spawn multiple particles each frame while time remains
            if (Date.now() < end) {
                for (let i=0;i<12;i++) particles.push(createParticle(centreX + rand(-120,120), centreY + rand(-20,40)));
                if (!rafId) render();
                requestAnimationFrame(burst);
            }
        }
        burst();
    };
})();

        function handleExport() {
            if (lastResults && lastDominantTrait) {
                const csvContent = [
                    ['Personality Quiz Results'],
                    ['Timestamp', new Date().toLocaleString()],
                    ['Dominant Trait', lastResults[lastDominantTrait].name],
                    [''],
                    ['Trait', 'Score', 'Percentage'],
                    ...Object.keys(lastResults).map(key => [
                        lastResults[key].name,
                        parseFloat(lastResults[key].score.toFixed(2)),
                        lastResults[key].percentage.toFixed(0) + '%'
                    ])
                ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n');

                downloadCSV(csvContent);
            }
        }

        // Initialize
        displayQuestion();