class TypingEffect {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts.map(text => text.toUpperCase()); 
        this.options = {
            typeSpeed: 80,        
            deleteSpeed: 40,       
            delayBetweenTexts: 2000,  
            loop: true,
            ...options
        };
        this.currentTextIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typingTimeout = null;
        
        this.element.style.whiteSpace = 'nowrap';
        this.element.style.overflow = 'hidden';
        this.element.style.display = 'inline-block';
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.charIndex--;
            this.element.textContent = currentText.substring(0, this.charIndex);
        } else {
            this.charIndex++;
            this.element.textContent = currentText.substring(0, this.charIndex);
        }

        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.options.delayBetweenTexts;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex++;
            if (this.currentTextIndex >= this.texts.length) {
                if (this.options.loop) {
                    this.currentTextIndex = 0;
                } else {
                    return; 
                }
            }
        }

        const randomSpeed = Math.random() * 20;
        typeSpeed += randomSpeed;
        
        if (!this.isDeleting && this.charIndex === 0) {
            typeSpeed += 200; 
        }

        this.typingTimeout = requestAnimationFrame(() => this.type());
    }

    start() {
        this.type();
    }

    stop() {
        if (this.typingTimeout) {
            cancelAnimationFrame(this.typingTimeout);
            this.typingTimeout = null;
        }
    }
}

// Initialize the typing effect
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');
    
    if (typingElement) {
        const texts = [
            "I'M A FRONT-END DEVELOPER",
            "I'M A WEB DESIGNER",
            "I'M A UI/UX ENTHUSIAST"
        ];

        const typingEffect = new TypingEffect(typingElement, texts, {
            typeSpeed: 50,        
            deleteSpeed: 30,      
            delayBetweenTexts: 1500,  
            loop: true         
        });

        typingEffect.start();


        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                typingEffect.stop();
            } else {
                typingEffect.start();
            }
        });
    }
});
