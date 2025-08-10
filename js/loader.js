// App Loader Management
class AppLoader {
    constructor() {
        this.loader = null;
        this.progressBar = null;
        this.progressText = null;
        this.loadingSteps = null;
        this.currentProgress = 0;
        this.loadingMessages = {
            ar: [
                'جاري تحميل الخطوط العربية...',
                'جاري تحضير قاعدة البيانات...',
                'جاري تهيئة محددات الحروف...',
                'جاري تحميل محتوى القاموس...',
                'جاري إعداد الواجهة...',
                'اكتمل التحميل!'
            ],
            en: [
                'Loading Arabic fonts...',
                'Preparing database...',
                'Initializing letter selectors...',
                'Loading dictionary content...',
                'Setting up interface...',
                'Loading complete!'
            ]
        };
        this.currentStep = 0;
    }

    init() {
        this.createLoader();
        this.startLoading();
    }

    createLoader() {
        // Create loader HTML structure
        const loaderHTML = `
            <div class="app-loader" id="appLoader">
                <div class="loader-content">
                    <div class="loader-logo">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <h1 class="loader-title">Digital Qur'anic Dictionary</h1>
                    <p class="loader-subtitle">By Late Lutfur Rahman Khan Sb</p>
                    <div class="loader-arabic-text">جاري التحميل...</div>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-text">
                            <span class="progress-percentage" id="progressPercentage">0%</span>
                            <span id="progressText">Initializing...</span>
                        </div>
                        <div class="loading-steps" id="loadingSteps">Starting up<span class="loading-dots"></span></div>
                    </div>
                </div>
            </div>
        `;

        // Insert loader at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);

        // Get references to loader elements
        this.loader = document.getElementById('appLoader');
        this.progressBar = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.progressPercentage = document.getElementById('progressPercentage');
        this.loadingSteps = document.getElementById('loadingSteps');
    }

    updateProgress(percentage, step = null) {
        this.currentProgress = Math.min(100, Math.max(0, percentage));
        
        if (this.progressBar) {
            this.progressBar.style.width = `${this.currentProgress}%`;
        }
        
        if (this.progressPercentage) {
            this.progressPercentage.textContent = `${Math.round(this.currentProgress)}%`;
        }

        if (step !== null && step < this.loadingMessages.en.length) {
            this.currentStep = step;
            if (this.loadingSteps) {
                this.loadingSteps.innerHTML = `${this.loadingMessages.en[step]}<span class="loading-dots"></span>`;
            }
        }
    }

    async startLoading() {
        const steps = [
            { progress: 15, delay: 300, step: 0 }, // Loading fonts
            { progress: 35, delay: 400, step: 1 }, // Preparing database
            { progress: 55, delay: 500, step: 2 }, // Initializing selectors
            { progress: 75, delay: 400, step: 3 }, // Loading dictionary
            { progress: 90, delay: 300, step: 4 }, // Setting up interface
            { progress: 100, delay: 200, step: 5 } // Complete
        ];

        for (const stepData of steps) {
            await this.simulateStep(stepData.progress, stepData.delay, stepData.step);
        }

        // Wait for actual app initialization
        await this.waitForAppReady();
        
        // Hide loader
        this.hide();
    }

    async simulateStep(targetProgress, delay, step) {
        return new Promise((resolve) => {
            this.updateProgress(targetProgress, step);
            setTimeout(resolve, delay);
        });
    }

    async waitForAppReady() {
        // Wait for fonts to load
        if (document.fonts) {
            try {
                await document.fonts.ready;
            } catch (error) {
                console.log('Font loading check failed:', error);
            }
        }

        // Wait for dictionary manager to be ready
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max
        
        while (attempts < maxAttempts) {
            if (window.dictionaryManager && 
                window.modalManager && 
                window.navigationManager) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        // Additional small delay to ensure everything is rendered
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    hide() {
        if (this.loader) {
            this.loader.classList.add('hidden');
            
            // Remove loader from DOM after transition
            setTimeout(() => {
                if (this.loader && this.loader.parentNode) {
                    this.loader.parentNode.removeChild(this.loader);
                }
            }, 500);
        }
    }

    // Method to manually set progress (useful for actual loading events)
    setProgress(percentage, message = null) {
        this.updateProgress(percentage);
        if (message && this.loadingSteps) {
            this.loadingSteps.innerHTML = `${message}<span class="loading-dots"></span>`;
        }
    }

    // Method to add custom loading step
    addStep(message, progress) {
        if (this.loadingSteps) {
            this.loadingSteps.innerHTML = `${message}<span class="loading-dots"></span>`;
        }
        this.updateProgress(progress);
    }
}

// Initialize loader immediately when script loads
const appLoader = new AppLoader();

// Start loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        appLoader.init();
    });
} else {
    appLoader.init();
}

// Export for use in other modules
window.AppLoader = AppLoader;
window.appLoader = appLoader;
