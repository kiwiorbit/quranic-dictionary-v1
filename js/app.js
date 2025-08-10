// Main application initialization and coordination
class App {
    constructor() {
        this.dictionaryManager = null;
        this.modalManager = null;
        this.navigationManager = null;
    }

    async init() {
        try {
            // Update loader progress
            if (window.appLoader) {
                window.appLoader.addStep('Initializing dictionary manager...', 20);
            }

            // Initialize dictionary manager first (it loads data)
            this.dictionaryManager = new DictionaryManager();
            await this.dictionaryManager.init();

            if (window.appLoader) {
                window.appLoader.addStep('Setting up modals...', 60);
            }

            // Initialize modal manager
            this.modalManager = new ModalManager();
            this.modalManager.init(this.dictionaryManager);

            if (window.appLoader) {
                window.appLoader.addStep('Configuring navigation...', 80);
            }

            // Initialize navigation manager
            this.navigationManager = new NavigationManager();
            this.navigationManager.init();

            // Make managers available globally for cross-module communication
            window.dictionaryManager = this.dictionaryManager;
            window.modalManager = this.modalManager;
            window.navigationManager = this.navigationManager;

            if (window.appLoader) {
                window.appLoader.addStep('Finalizing setup...', 95);
            }

            console.log('Arabic Dictionary App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
            if (window.appLoader) {
                window.appLoader.addStep('Error occurred during initialization', 100);
            }
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

// Also initialize on window load as fallback
window.addEventListener('load', () => {
    if (!window.dictionaryManager) {
        const app = new App();
        app.init();
    }
});
