// Utility functions for the Spin Wheel application

// Local storage manager
const StorageManager = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    },

    get: (key) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.warn('LocalStorage not available:', e);
            return null;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    },

    clear: () => {
        try {
            localStorage.clear();
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    }
};

// Analytics helper
const Analytics = {
    trackEvent: (eventName, data = {}) => {
        try {
            if (window.gtag) {
                gtag('event', eventName, data);
            }
        } catch (e) {
            console.log('Analytics not available');
        }
    },

    trackSpinCompleted: (name, prizeIndex) => {
        Analytics.trackEvent('spin_completed', {
            user_name: name,
            prize_index: prizeIndex,
            timestamp: new Date().toISOString()
        });
    }
};

// Validation helper
const Validator = {
    isValidName: (name) => {
        const trimmed = name.trim();
        return trimmed.length >= CONFIG.validation.minNameLength &&
               trimmed.length <= CONFIG.validation.maxNameLength &&
               /^[\u0600-\u06FFa-zA-Z\s]+$/.test(trimmed);
    },

    isFarsiName: (name) => {
        return /[\u0600-\u06FF]/.test(name);
    },

    isEnglishName: (name) => {
        return /[a-zA-Z]/.test(name);
    }
};

// Theme manager
const ThemeManager = {
    applyTheme: (themeName) => {
        const root = document.documentElement;
        const colors = CONFIG.colors;

        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
        });
    },

    getCurrentTheme: () => {
        return {
            colors: CONFIG.colors,
            name: 'default'
        };
    }
};

// Animation utilities
const AnimationUtils = {
    shake: (element, duration = 500) => {
        element.style.animation = `none`;
        setTimeout(() => {
            element.style.animation = `shake ${duration}ms ease-in-out`;
        }, 10);
    },

    pulse: (element, duration = 600) => {
        element.style.animation = `pulse ${duration}ms ease-in-out`;
    },

    bounce: (element, duration = 800) => {
        element.style.animation = `bounce ${duration}ms ease-in-out`;
    }
};

// Performance utilities
const PerformanceUtils = {
    debounce: (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    throttle: (func, delay) => {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    },

    measurePerformance: (label, fn) => {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${label}: ${end - start}ms`);
        return result;
    }
};

// Notification queue manager
class NotificationQueue {
    constructor() {
        this.queue = [];
        this.isShowing = false;
    }

    add(message, type = 'info', duration = 3000) {
        this.queue.push({ message, type, duration });
        this.processQueue();
    }

    processQueue() {
        if (this.isShowing || this.queue.length === 0) return;

        this.isShowing = true;
        const { message, type, duration } = this.queue.shift();

        showNotification(message, type);

        setTimeout(() => {
            this.isShowing = false;
            this.processQueue();
        }, duration);
    }
}

// Initialize notification queue
const notificationQueue = new NotificationQueue();

// Accessibility utilities
const A11y = {
    announceResult: (message) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.style.position = 'absolute';
        announcement.style.left = '-9999px';
        announcement.textContent = message;
        document.body.appendChild(announcement);

        setTimeout(() => announcement.remove(), 1000);
    },

    setTabIndex: (element, index = 0) => {
        element.setAttribute('tabindex', index);
    }
};

// URL utilities
const URLUtils = {
    getQueryParam: (param) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    },

    setQueryParam: (param, value) => {
        const url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.replaceState({}, document.title, url);
    }
};

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        StorageManager,
        Analytics,
        Validator,
        ThemeManager,
        AnimationUtils,
        PerformanceUtils,
        NotificationQueue,
        A11y,
        URLUtils
    };
}
