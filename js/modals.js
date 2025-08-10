// Modal management functionality
class ModalManager {
    constructor() {
        this.dictionaryManager = null;
    }

    init(dictionaryManager) {
        this.dictionaryManager = dictionaryManager;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close modal buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Setup button event listeners
        const searchBtn = document.getElementById('searchBtn');
        const dictionaryBtn = document.getElementById('dictionaryBtn');
        const videoBtn = document.getElementById('videoBtn');
        const fourHuroofLink = document.getElementById('fourHuroofLink');
        const notesLink = document.getElementById('notesLink');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                if (this.dictionaryManager) {
                    this.dictionaryManager.searchVerb();
                }
            });
        }

        if (dictionaryBtn) {
            dictionaryBtn.addEventListener('click', () => this.openDictionary());
        }

        if (videoBtn) {
            videoBtn.addEventListener('click', () => this.openVideo());
        }

        if (fourHuroofLink) {
            fourHuroofLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openFourHuroof();
            });
        }

        if (notesLink) {
            notesLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openNotes();
            });
        }
    }

    async openDictionary() {
        if (!this.dictionaryManager) return;

        const rootWord = this.dictionaryManager.getCurrentRootWord();
        console.log(`Opening dictionary for: ${rootWord}`);
        const dictionaryModal = document.getElementById('dictionaryModal');
        const dictionaryModalHeader = document.getElementById('dictionaryModalHeader');
        const dictionaryModalBody = dictionaryModal?.querySelector('.modal-body');

        if (!dictionaryModal || !dictionaryModalHeader || !dictionaryModalBody) return;

        // Set the modal header to the current root word
        dictionaryModalHeader.innerHTML = `
            ${rootWord.split('').join(' - ')} 
            <button class="close-modal">&times;</button>
        `;
        
        // Apply styles to the dynamically created header text
        dictionaryModalHeader.style.fontFamily = "'Droid Arabic Naskh', 'Noto Sans Arabic', serif";
        dictionaryModalHeader.style.fontSize = "1.8rem";
        dictionaryModalHeader.style.fontWeight = "bold";
        dictionaryModalHeader.style.color = "white";
        dictionaryModalHeader.style.background = "black";
        dictionaryModalHeader.style.padding = "20px";

        // Check if we have specific content for this root word
        const content = await this.dictionaryManager.getDictionaryContent(rootWord);
        console.log('Received content:', content);
        if (content) {
            dictionaryModalBody.innerHTML = content;
        } else {
            console.log('No content found, showing fallback.');
            // Fallback to the generic placeholder page for other words
            dictionaryModalBody.innerHTML = `
                <p style="text-align: left; margin-bottom: 20px;">
                    Detailed content for this root word is not yet available.
                </p>
                <p style="text-align: left;">Please check back later or contribute to expand the dictionary!</p>
            `;
        }

        // Show the modal
        dictionaryModal.style.display = 'flex';

        // Re-attach close listener for the newly created close button in the header
        const closeBtn = dictionaryModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
    }

    openVideo() {
        const videoModal = document.getElementById('videoModal');
        const videoContainer = videoModal?.querySelector('.video-container');
        
        if (!videoModal || !videoContainer) return;

        // Embed the YouTube video iframe
        videoContainer.innerHTML = `
            <iframe src="https://www.youtube.com/embed/Io2f2PVz0UE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        videoModal.style.display = 'flex';
    }

    openInfo() {
        const infoModal = document.getElementById('infoModal');
        if (infoModal) {
            infoModal.style.display = 'flex';
        }
    }

    openFourHuroof() {
        const fourHuroofModal = document.getElementById('fourHuroofModal');
        if (fourHuroofModal) {
            fourHuroofModal.style.display = 'flex';
        }
    }

    openNotes() {
        const notesModal = document.getElementById('notesModal');
        if (notesModal) {
            notesModal.style.display = 'flex';
        }
    }

    closeModal() {
        // Close all modals
        const modals = [
            'dictionaryModal',
            'videoModal', 
            'infoModal',
            'fourHuroofModal',
            'notesModal'
        ];

        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        });

        // Stop YouTube video when modal closes
        const videoIframe = document.querySelector('#videoModal .video-container iframe');
        if (videoIframe) {
            videoIframe.src = videoIframe.src; // Reloads the iframe, effectively stopping the video
        }
    }
}

// Export for use in other modules
window.ModalManager = ModalManager;
