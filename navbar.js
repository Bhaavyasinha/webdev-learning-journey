class FairyTerminal {
    constructor() {
        this.terminal = document.getElementById('fairyNav');
        this.activator = document.getElementById('fairyBtn');
        this.navInput = document.getElementById('fairyInput');
        this.options = document.querySelectorAll('.fairy-option');

        this.closeBtn = document.querySelector('.f-control.blossom');
        this.fullscreenBtn = document.querySelector('.f-control.leaf');

        this.isFullscreen = false;

        this.init();
    }

    init() {
        this.activator.addEventListener('click', () => this.openTerminal());
        this.navInput.addEventListener('keypress', (e) => this.handleInput(e));

        this.options.forEach(option => {
            option.addEventListener('click', () => {
                const target = option.getAttribute('data-target');
                this.navigateTo(target);
            });
        });

        this.closeBtn.addEventListener('click', () => this.closeTerminal());

        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        this.terminal.addEventListener('click', (e) => {
            if (e.target === this.terminal) {
                this.closeTerminal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.openTerminal();
            }
            if (e.key === 'Escape') {
                if (this.isFullscreen) {
                    this.toggleFullscreen(false);
                } else {
                    this.closeTerminal();
                }
            }
        });
    }

    openTerminal() {
        this.terminal.classList.add('active');
        this.navInput.focus();
        document.body.style.overflow = 'hidden';
    }

    closeTerminal() {
        this.terminal.classList.remove('active');
        this.terminal.classList.remove('fullscreen'); 
        this.isFullscreen = false;
        document.body.style.overflow = '';
        this.navInput.value = '';
    }

    toggleFullscreen(forceState = null) {
        if (forceState !== null) {
            this.isFullscreen = forceState;
        } else {
            this.isFullscreen = !this.isFullscreen;
        }

        if (this.isFullscreen) {
            this.terminal.classList.add('fullscreen');
        } else {
            this.terminal.classList.remove('fullscreen');
        }
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            const input = this.navInput.value.trim().toLowerCase();
            this.processCommand(input);
        }
    }

    processCommand(command) {
        switch (command) {
            case '1':
            case 'journey':
            case 'bloom':
                this.navigateTo('index.html');
                break;
            case '2':
            case 'projects':
            case 'garden':
                thisnavigateTo('projects.html');
                break;
            case '3':
            case 'about':
            case 'petals':
                this.navigateTo('about.html');
                break;
            case '4':
            case 'connect':
            case 'magic':
                this.navigateTo('connect.html');
                break;
            case 'help':
            case 'spells':
                this.showHelp();
                break;
            case 'clear':
            case 'refresh':
                this.navInput.value = '';
                break;
            case 'exit':
            case 'close':
            case 'vanish':
                this.closeTerminal();
                break;
            case 'full':
            case 'big':
            case 'expand':
                this.toggleFullscreen(true);
                break;
            default:
                this.showError(`Spell not recognized: ${command}`);
        }
    }

    navigateTo(url) {
        this.closeTerminal();
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    }

    showHelp() {
        const helpText = `
 Available Magic Spells 

[1] or "DNA Me"    - Home
[2] or "Projects"  - Coming soon 
[3] or "About Me"  - A Human
[4] or "Connect"   - Connect...

 Navigation
"help"  - Show this guide
"clear" or "refresh" - Clear input
"exit" or "vanish"  - Close nav


        `;
        alert(helpText);
    }

    showError(message) {
        this.navInput.style.color = '#ff69b4';
        this.navInput.style.textShadow = '0 0 10px #ff69b4';
        setTimeout(() => {
            this.navInput.style.color = '#9370db';
            this.navInput.style.textShadow = '0 0 5px #9370db';
        }, 1000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new FairyTerminal();
});
