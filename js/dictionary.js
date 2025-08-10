// Dictionary functionality and data management
class DictionaryManager {
    constructor() {
        this.arabicLetters = [
            'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س',
            'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'
        ];
        
        this.selectedLetters = [19, 17, 22]; // Indexes for ف, ع, ل initially (فعل)
        this.verbDatabase = {};
        this.audioManager = null;
    }

    async init() {
        // Update loader progress
        if (window.appLoader) {
            window.appLoader.addStep('Loading verb database...', 25);
        }

        // Load data from external files
        await this.loadVerbDatabase();

        if (window.appLoader) {
            window.appLoader.addStep('Initializing audio system...', 50);
        }

        // Initialize audio manager
        this.audioManager = new AudioManager();

        if (window.appLoader) {
            window.appLoader.addStep('Setting up letter selectors...', 55);
        }

        // Initialize letter selectors
        this.initLetterSelectors();
    }

    async loadVerbDatabase() {
        try {
            const response = await fetch('./data/verbs.json');
            this.verbDatabase = await response.json();
        } catch (error) {
            console.warn('Could not load verb database, using fallback data');
            // Fallback data
            this.verbDatabase = {
                "فعل": {
                    past: "فَعَلَ",
                    present: "يَفْعَلُ",
                    imperative: "اِفْعَلْ",
                    masdar: "فَعْلًا"
                },
                "كتب": {
                    past: "كَتَبَ",
                    present: "يَكْتُبُ",
                    imperative: "اُكْتُبْ",
                    masdar: "كِتَابَةً"
                },
                "قرأ": {
                    past: "قَرَأَ",
                    present: "يَقْرَأُ",
                    imperative: "اِقْرَأْ",
                    masdar: "قِرَاءَةً"
                },
                "سمع": {
                    past: "سَمِعَ",
                    present: "يَسْمَعُ",
                    imperative: "اِسْمَعْ",
                    masdar: "سَمْعًا"
                }
            };
        }
    }

    // loadDictionaryContent is no longer needed as content is loaded on demand.

    initLetterSelectors() {
        for (let i = 1; i <= 3; i++) {
            this.updateLetterSelector(i);
            this.setupScrolling(i);
        }
        this.updateRootWord();
        this.searchVerb(); // Call searchVerb initially to display default verb forms
    }

    updateLetterSelector(position) {
        const container = document.getElementById(`letter${position}`);
        if (!container) return;
        
        container.innerHTML = '';

        const currentIndex = this.selectedLetters[position - 1];

        // Previous letter
        const prevIndex = (currentIndex - 1 + this.arabicLetters.length) % this.arabicLetters.length;
        const prevLetter = document.createElement('div');
        prevLetter.className = 'letter-option prev';
        prevLetter.textContent = this.arabicLetters[prevIndex];
        container.appendChild(prevLetter);

        // Selected letter
        const selectedLetter = document.createElement('div');
        selectedLetter.className = 'letter-option selected';
        selectedLetter.textContent = this.arabicLetters[currentIndex];
        container.appendChild(selectedLetter);

        // Next letter
        const nextIndex = (currentIndex + 1) % this.arabicLetters.length;
        const nextLetter = document.createElement('div');
        nextLetter.className = 'letter-option next';
        nextLetter.textContent = this.arabicLetters[nextIndex];
        container.appendChild(nextLetter);
    }

    setupScrolling(position) {
        const wheel = document.getElementById(`letter${position}`);
        if (!wheel) return;

        wheel.addEventListener('wheel', (e) => {
            e.preventDefault(); // Prevent page scroll
            const direction = e.deltaY > 0 ? 1 : -1; // Determine scroll direction
            this.changeLetter(position, direction); // Change one letter at a time
        });
        
        // Touch support for mobile
        let touchStartY = 0;
        let isSwiping = false; // Flag to track if a swipe is in progress

        wheel.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            isSwiping = true; // Set flag when touch starts
        });

        wheel.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent page scroll during touchmove
            if (!isSwiping) return; // Only process if a swipe might be happening
            const touchY = e.touches[0].clientY;
            const swipeDistance = touchY - touchStartY;
            
            // Trigger change if swipe distance is significant enough for one letter
            if (Math.abs(swipeDistance) > 30) { // Threshold for a significant swipe
                const direction = swipeDistance > 0 ? -1 : 1; // Invert direction for intuitive swipe
                this.changeLetter(position, direction);
                touchStartY = touchY; // Reset start for continuous swipe
            }
        });

        wheel.addEventListener('touchend', () => {
            isSwiping = false; // Reset flag when touch ends
        });
    }

    changeLetter(position, amount) {
        this.selectedLetters[position - 1] = (this.selectedLetters[position - 1] + amount + this.arabicLetters.length) % this.arabicLetters.length;
        this.updateLetterSelector(position);
        this.updateRootWord();
        if (this.audioManager) {
            this.audioManager.playClickSound(); // Play sound on letter change
        }
    }

    updateRootWord() {
        const rootWord = this.arabicLetters[this.selectedLetters[0]] +
                            this.arabicLetters[this.selectedLetters[1]] +
                            this.arabicLetters[this.selectedLetters[2]];
        const rootWordElement = document.getElementById('rootWord');
        if (rootWordElement) {
            rootWordElement.textContent = rootWord;
        }
    }

    searchVerb() {
        const rootWordElement = document.getElementById('rootWord');
        if (!rootWordElement) return;
        
        const rootWord = rootWordElement.textContent;
        
        if (this.verbDatabase[rootWord]) {
            const verb = this.verbDatabase[rootWord];
            this.updateElement('pastTense', verb.past);
            this.updateElement('presentTense', verb.present);
            this.updateElement('imperative', verb.imperative);
            this.updateElement('masdar', verb.masdar);
        } else {
            // Default values for unknown roots
            this.updateElement('pastTense', '---');
            this.updateElement('presentTense', '---');
            this.updateElement('imperative', '---');
            this.updateElement('masdar', '---');
        }
    }

    updateElement(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }

    getCurrentRootWord() {
        const rootWordElement = document.getElementById('rootWord');
        return rootWordElement ? rootWordElement.textContent : '';
    }

    async getDictionaryContent(rootWord) {
        console.log(`Fetching content for: ${rootWord}`);
        try {
            const response = await fetch(`./data/dictionary_entries/${rootWord}.html`);
            console.log(`Fetch response for ${rootWord}:`, response.status, response.statusText);
            if (!response.ok) {
                console.error(`Fetch failed for ${rootWord}`);
                return null;
            }
            const content = await response.text();
            console.log(`Content for ${rootWord} loaded successfully.`);
            return content;
        } catch (error) {
            console.error(`Could not load dictionary content for ${rootWord}`, error);
            return null;
        }
    }
}

// Export for use in other modules
window.DictionaryManager = DictionaryManager;
