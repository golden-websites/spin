// Configuration file for the Spin Wheel

const CONFIG = {
    // Celebration settings
    celebration: {
        enabled: true,
        soundEffects: true,
        confetti: true,
        particleCount: 100
    },

    // Special names (case-insensitive, Farsi and English supported)
    specialNames: [
        'میخوام گوشیتو نگه دارم'
    ],

    // Special message for Asena
    specialMessage: 'بیا یکم گوشیمو نگه دار',
    specialSubtitle: 'پیامی ویژه برای تو... 🌟',

    // Game settings
    game: {
        spinDuration: 6000, // milliseconds
        minSpins: 6,
        maxSpins: 10,
        alwaysLandOnEmpty: true, // Always land on empty spaces
        requireName: true // Require name input
    },

    // Colors theme
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#ff6b6b',
        success: '#4ecdc4',
        warning: '#ffe66d',
        bgLight: '#f8f9ff',
        textDark: '#2d3436',
        textLight: '#636e72'
    },

    // Messages
    messages: {
        noName: 'لطفاً نام خود را وارد کنید!',
        result: '🎉 جایزه شما:\n',
        contactUs: 'لطفاً برای ادامه با تیم پشتیبانی ما تماس بگیرید 📞',
        welcome: 'با وارد کردن نام خود و فشردن دکمه شرکت کنید و شانس خود را امتحان کنید!',
        rules: [
            'هر نفر فقط یکبار می‌تواند شرکت کند',
            'برای دریافت جایزه نام حقیقی خود را وارد کنید',
            'بعد از چرخش با تیم ما تماس بگیرید',
            'شانس برابر برای همه!'
        ]
    },

    // Contact information
    contact: {
        phone: '09123456789',
        phoneLink: '+989123456789',
        email: 'info@example.com',
        companyName: 'تیم خدمات'
    },

    // Prize settings
    prizes: [
        { text: 'CoD Mobile\nLevel 200', color: '#FF6B6B', displayName: 'Call of Duty Mobile - Level 200' },
        { text: 'خالی', color: '#FFE66D', displayName: 'جایزه خالی' },
        { text: 'CP 100', color: '#4ECDC4', displayName: 'CP - 100' },
        { text: 'خالی', color: '#FFE66D', displayName: 'جایزه خالی' },
        { text: 'CoD Mobile\nLevel 300', color: '#FF6B6B', displayName: 'Call of Duty Mobile - Level 300' },
        { text: 'CP 200', color: '#4ECDC4', displayName: 'CP - 200' },
        { text: 'خالی', color: '#FFE66D', displayName: 'جایزه خالی' },
        { text: 'CP 500', color: '#4ECDC4', displayName: 'CP - 500' },
        { text: 'خالی', color: '#FFE66D', displayName: 'جایزه خالی' },
        { text: 'CoD Mobile\nLevel 400', color: '#FF6B6B', displayName: 'Call of Duty Mobile - Level 400' },
        { text: 'خالی', color: '#FFE66D', displayName: 'جایزه خالی' },
        { text: 'خالی', color: '#FFE66D', displayName: 'جایزه خالی' }
    ],

    // Event settings
    events: {
        title: 'چرخه شانس جشن ولادت',
        subtitle: 'به مناسبت ولادت رسول اکرم و امام صادق (علیهم السلام)',
        year: '1403'
    },

    // Animation settings
    animations: {
        wheelRotateDuration: 2000, // Initial load animation
        cardSlideDelay: 0.2, // Stagger delay for cards
        transitionSpeed: 300 // General transition speed
    },

    // Validation
    validation: {
        minNameLength: 2,
        maxNameLength: 50
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
