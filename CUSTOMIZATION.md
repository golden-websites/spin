/**
 * Custom Configuration Example
 * این فایل نمونه‌ای از نحوه سفارشی‌سازی تنظیمات است
 * 
 * برای استفاده:
 * 1. این فایل را به عنوان الگو استفاده کنید
 * 2. تنظیمات مورد نظر را تغییر دهید
 * 3. این فایل را جایگزین config.js کنید یا درون قبل از آن بارگذاری کنید
 */

// مثال 1: تغییر رنگ‌ها
CONFIG.colors = {
    primary: '#667eea',      // رنگ اصلی
    secondary: '#764ba2',    // رنگ ثانویه
    accent: '#ff6b6b',       // رنگ لهجه
    success: '#4ecdc4',      // رنگ موفقیت
    warning: '#ffe66d',      // رنگ هشدار
    bgLight: '#f8f9ff',      // رنگ پس‌زمینه روشن
    textDark: '#2d3436',     // رنگ متن تیره
    textLight: '#636e72'     // رنگ متن روشن
};

// مثال 2: اضافه کردن نام‌های خاص جدید
// CONFIG.specialNames.push('test', 'علی', 'فاطمه');

// مثال 3: تغییر پیام خاص
// CONFIG.specialMessage = 'یک پیام سفارشی برای شما';

// مثال 4: تغییر مدت زمان چرخش
// CONFIG.game.spinDuration = 8000; // 8 ثانیه

// مثال 5: تغییر تعداد دور
// CONFIG.game.minSpins = 8;
// CONFIG.game.maxSpins = 12;

// مثال 6: غیرفعال کردن اثرات صوتی
// CONFIG.celebration.soundEffects = false;

// مثال 7: غیرفعال کردن Confetti
// CONFIG.celebration.confetti = false;

// مثال 8: تعریف جوایز سفارشی
/*
CONFIG.prizes = [
    { text: 'جایزه 1', color: '#FF6B6B', displayName: 'اولین جایزه' },
    { text: 'جایزه 2', color: '#4ECDC4', displayName: 'دومین جایزه' },
    { text: 'جایزه 3', color: '#FFE66D', displayName: 'سومین جایزه' },
    // ... بیشتر جوایز
];
*/

// مثال 9: تغییر اطلاعات تماس
// CONFIG.contact.phone = '09991234567';
// CONFIG.contact.email = 'newemail@example.com';

// مثال 10: تنظیم پیام‌های سفارشی
/*
CONFIG.messages = {
    noName: 'لطفا نام خود را بنویسید!',
    result: '🎁 جایزه برنده:\n',
    contactUs: 'برای دریافت جایزه با ما تماس بگیرید',
    welcome: 'خوش آمدید به بازی!',
    rules: [
        'قانون 1',
        'قانون 2',
        'قانون 3'
    ]
};
*/

// مثال 11: فعال کردن ذخیره‌سازی نام‌های شرکت‌کنندگان
/*
function saveParticipant(name) {
    const participants = StorageManager.get('participants') || [];
    participants.push({
        name: name,
        timestamp: new Date().toISOString()
    });
    StorageManager.set('participants', participants);
}
*/

// مثال 12: گرفتن تمام شرکت‌کنندگان
/*
function getAllParticipants() {
    return StorageManager.get('participants') || [];
}
*/

// مثال 13: تنظیم موضوع سفارشی
/*
ThemeManager.applyTheme('dark'); // یا 'light'
*/

// مثال 14: ایجاد صدای سفارشی
/*
function playCustomSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // تنظیم فرکانس (نت موسیقی)
    oscillator.frequency.setValueAtTime(261.63, now); // دو
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    oscillator.start(now);
    oscillator.stop(now + 0.5);
}
*/

console.log('✓ Custom configuration loaded successfully!');
