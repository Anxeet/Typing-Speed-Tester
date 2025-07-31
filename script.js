class TypingSpeedTester {
    constructor() {
        this.prompts = [
            "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
            "Programming is the art of telling another human being what one wants the computer to do. It requires logical thinking and creativity.",
            "Success is not final, failure is not fatal: it is the courage to continue that counts. Every day brings new opportunities.",
            "The only way to do great work is to love what you do. If you haven't found it yet, keep looking and don't settle.",
            "Technology is best when it brings people together. Innovation happens when diverse minds collaborate and share ideas.",
            "Learning is a treasure that will follow its owner everywhere. Knowledge empowers us to make better decisions.",
            "The future belongs to those who believe in the beauty of their dreams. Never stop pursuing what makes you passionate.",
            "Creativity is intelligence having fun. The best ideas often come from unexpected connections and playful exploration.",
            "Time is the most valuable coin in your life. You and you alone will determine how that coin will be spent.",
            "The journey of a thousand miles begins with one step. Every expert was once a beginner who kept practicing."
        ];
        
        this.currentPrompt = '';
        this.startTime = null;
        this.endTime = null;
        this.isTestActive = false;
        this.currentIndex = 0;
        this.errors = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.loadNewPrompt();
    }
    
    initializeElements() {
        this.promptText = document.getElementById('prompt-text');
        this.typingInput = document.getElementById('typing-input');
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.results = document.getElementById('results');
        this.wpmElement = document.getElementById('wpm');
        this.timeElement = document.getElementById('time-taken');
        this.accuracyElement = document.getElementById('accuracy');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startTest());
        this.restartBtn.addEventListener('click', () => this.restartTest());
        this.typingInput.addEventListener('input', (e) => this.handleInput(e));
        this.typingInput.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    loadNewPrompt() {
        this.currentPrompt = this.prompts[Math.floor(Math.random() * this.prompts.length)];
        this.displayPrompt();
    }
    
    displayPrompt() {
        this.promptText.innerHTML = '';
        this.currentPrompt.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.dataset.index = index;
            this.promptText.appendChild(span);
        });
    }
    
    startTest() {
        this.isTestActive = true;
        this.startTime = null;
        this.endTime = null;
        this.currentIndex = 0;
        this.errors = 0;
        
        this.typingInput.value = '';
        this.typingInput.disabled = false;
        this.typingInput.focus();
        
        this.startBtn.style.display = 'none';
        this.restartBtn.style.display = 'none';
        this.results.style.display = 'none';
        
        this.resetPromptDisplay();
    }
    
    resetPromptDisplay() {
        const spans = this.promptText.querySelectorAll('span');
        spans.forEach(span => {
            span.className = '';
        });
    }
    
    handleInput(e) {
        if (!this.isTestActive) return;
        
        const inputValue = e.target.value;
        
        if (this.startTime === null) {
            this.startTime = Date.now();
        }
        
        // Update the display based on current input
        this.updatePromptDisplay(inputValue);
        
        // Update current index
        this.currentIndex = inputValue.length;
        
        // Check if test is complete
        if (this.currentIndex >= this.currentPrompt.length) {
            this.completeTest();
        }
    }
    
    handleKeydown(e) {
        // Allow all key inputs for better user experience
        if (!this.isTestActive) return;
    }
    
    updatePromptDisplay(inputValue) {
        const spans = this.promptText.querySelectorAll('span');
        let totalErrors = 0;
        
        // Simple character-by-character comparison
        for (let i = 0; i < spans.length; i++) {
            const span = spans[i];
            const expectedChar = this.currentPrompt[i];
            const typedChar = inputValue[i];
            
            if (i < inputValue.length) {
                if (typedChar === expectedChar) {
                    span.className = 'correct';
                } else {
                    span.className = 'incorrect';
                    totalErrors++;
                }
            } else if (i === inputValue.length) {
                span.className = 'current';
            } else {
                span.className = '';
            }
        }
        
        this.errors = totalErrors;
    }
    
    completeTest() {
        this.endTime = Date.now();
        this.isTestActive = false;
        this.typingInput.disabled = true;
        
        this.restartBtn.style.display = 'inline-block';
        
        // Automatically show results when test is complete
        this.showResults();
        
        // Add a completion message
        setTimeout(() => {
            alert('Test completed! Check your results below.');
        }, 100);
    }
    
    showResults() {
        console.log('Show Results clicked!'); // Debug log
        
        // Use current time if test is still active
        const endTime = this.isTestActive ? Date.now() : this.endTime;
        const timeElapsed = (endTime - this.startTime) / 1000; // in seconds
        const wordsTyped = this.currentPrompt.split(' ').length;
        const wpm = Math.round((wordsTyped / timeElapsed) * 60);
        const accuracy = Math.round(((this.currentPrompt.length - this.errors) / this.currentPrompt.length) * 100);
        
        console.log('Time elapsed:', timeElapsed); // Debug log
        console.log('WPM:', wpm); // Debug log
        console.log('Accuracy:', accuracy); // Debug log
        
        this.wpmElement.textContent = wpm;
        this.timeElement.textContent = `${timeElapsed.toFixed(1)}s`;
        this.accuracyElement.textContent = `${accuracy}%`;
        
        this.results.style.display = 'block';
        console.log('Results should be visible now'); // Debug log
    }
    
    calculateAndDisplayResults() {
        const timeElapsed = (this.endTime - this.startTime) / 1000; // in seconds
        const wordsTyped = this.currentPrompt.split(' ').length;
        const wpm = Math.round((wordsTyped / timeElapsed) * 60);
        const accuracy = Math.round(((this.currentPrompt.length - this.errors) / this.currentPrompt.length) * 100);
        
        this.wpmElement.textContent = wpm;
        this.timeElement.textContent = `${timeElapsed.toFixed(1)}s`;
        this.accuracyElement.textContent = `${accuracy}%`;
        
        this.results.style.display = 'block';
        this.restartBtn.style.display = 'inline-block';
    }
    
    restartTest() {
        this.loadNewPrompt();
        this.startTest();
    }
}

// Initialize the typing speed tester when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TypingSpeedTester();
}); 