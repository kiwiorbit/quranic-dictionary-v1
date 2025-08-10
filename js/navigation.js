// Navigation menu functionality
class NavigationManager {
    constructor() {
        this.menuBtn = null;
        this.navMenu = null;
        this.menuOverlay = null;
        this.isMenuOpen = false;
    }

    init() {
        this.createMenuElements();
        this.setupEventListeners();
    }

    createMenuElements() {
        // Create navigation menu
        const navMenu = document.createElement('nav');
        navMenu.className = 'nav-menu';
        navMenu.id = 'navMenu';
        navMenu.innerHTML = `
            <ul>
                <li><a href="#" id="aboutLink">About Dictionary</a></li>
                <li><a href="#" id="fourHuroofNavLink">Words with 4 Huroof</a></li>
                <li><a href="#" id="notesNavLink">Important Notes</a></li>
                <li><a href="#" id="videoNavLink">Educational Video</a></li>
                <li><a href="https://khuddam.co.nz/" target="_blank">Visit Khuddam NZ</a></li>
                <li><a href="mailto:khudaamulqurannz@gmail.com">Contact Us</a></li>
            </ul>
        `;

        // Create menu overlay
        const menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        menuOverlay.id = 'menuOverlay';

        // Add to document
        document.body.appendChild(navMenu);
        document.body.appendChild(menuOverlay);

        this.navMenu = navMenu;
        this.menuOverlay = menuOverlay;
    }

    setupEventListeners() {
        this.menuBtn = document.getElementById('menuBtn');
        
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking overlay
        this.menuOverlay.addEventListener('click', () => this.closeMenu());

        // Close menu when clicking menu links
        const menuLinks = this.navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close for external links
                if (!link.hasAttribute('target')) {
                    this.closeMenu();
                }
            });
        });

        // Setup navigation link handlers
        this.setupNavigationLinks();

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    setupNavigationLinks() {
        // About link - opens info modal
        document.getElementById('aboutLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.modalManager) {
                window.modalManager.openInfo();
            }
        });

        // Four Huroof link
        document.getElementById('fourHuroofNavLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.modalManager) {
                window.modalManager.openFourHuroof();
            }
        });

        // Notes link
        document.getElementById('notesNavLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.modalManager) {
                window.modalManager.openNotes();
            }
        });

        // Video link
        document.getElementById('videoNavLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.modalManager) {
                window.modalManager.openVideo();
            }
        });
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.navMenu.classList.add('active');
        this.menuOverlay.classList.add('active');
        this.isMenuOpen = true;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.menuOverlay.classList.remove('active');
        this.isMenuOpen = false;
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Export for use in other modules
window.NavigationManager = NavigationManager;
