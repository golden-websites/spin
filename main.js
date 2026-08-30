// Prizes array - now using CONFIG
const prizes = CONFIG.prizes;

// Get DOM elements
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const nameInput = document.getElementById('nameInput');
const resultDisplay = document.getElementById('resultDisplay');
const resultMessage = document.getElementById('resultMessage');
const specialMessage = document.getElementById('specialMessage');

// Adjust canvas size for mobile devices
function adjustCanvasSize() {
    const container = canvas.parentElement;
    const containerSize = container.offsetWidth;
    const maxSize = Math.min(containerSize, window.innerHeight * 0.6);
    
    canvas.width = maxSize;
    canvas.height = maxSize;
    
    // Redraw wheel after resize
    drawWheel();
}

// Call on load and resize
window.addEventListener('load', adjustCanvasSize);
window.addEventListener('resize', adjustCanvasSize);

// Wheel state
let isSpinning = false;
let wheelRotation = 0;
let wheelRadius = canvas.width / 2;
let sliceAngle = (Math.PI * 2) / prizes.length;

// Update radius and angle after canvas resize
function updateWheelMetrics() {
    wheelRadius = canvas.width / 2;
    sliceAngle = (Math.PI * 2) / prizes.length;
}

// Maximum spins per user (3 times)
const MAX_SPINS = 3;

// Check if name is Asena
function isAsenaName(name) {
    const lowerName = name.toLowerCase().trim();
    return CONFIG.specialNames.includes(lowerName);
}

// Get user spin count from localStorage
function getUserSpinCount(name) {
    const key = `spin_count_${name.toLowerCase().trim()}`;
    const count = StorageManager.get(key) || 0;
    return count;
}

// Increment user spin count
function incrementUserSpinCount(name) {
    const key = `spin_count_${name.toLowerCase().trim()}`;
    const currentCount = getUserSpinCount(name);
    const newCount = currentCount + 1;
    StorageManager.set(key, newCount);
    return newCount;
}

// Check if user can spin
function canUserSpin(name) {
    return getUserSpinCount(name) < MAX_SPINS;
}

// Update spin counter display
function updateSpinCounter(name) {
    const spinCounter = document.getElementById('spinCounter');
    
    if (!name) {
        spinCounter.textContent = 'لطفاً نام خود را وارد کنید';
        spinCounter.style.color = 'var(--text-light)';
        return;
    }
    
    const currentCount = getUserSpinCount(name);
    const remainingSpins = MAX_SPINS - currentCount;
    
    if (remainingSpins > 0) {
        spinCounter.textContent = `چرخش‌های باقی: ${remainingSpins}/3`;
        spinCounter.style.color = 'var(--warning)';
    } else {
        spinCounter.textContent = 'متأسفانه تمام چرخش‌ها مصرف شده‌اند!';
        spinCounter.style.color = '#ff6b6b';
    }
}

// Draw the wheel
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update metrics if needed
    updateWheelMetrics();
    
    // Save the current state
    ctx.save();
    
    // Translate to center
    ctx.translate(wheelRadius, wheelRadius);
    
    // Rotate the wheel
    ctx.rotate(wheelRotation);
    
    // Draw each prize slice
    prizes.forEach((prize, index) => {
        const startAngle = index * sliceAngle;
        const endAngle = startAngle + sliceAngle;
        
        // Draw the slice
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, wheelRadius - 8, startAngle, endAngle);
        ctx.closePath();
        
        // Fill with gradient
        const gradient = ctx.createLinearGradient(
            Math.cos(startAngle) * wheelRadius, Math.sin(startAngle) * wheelRadius,
            Math.cos(endAngle) * wheelRadius, Math.sin(endAngle) * wheelRadius
        );
        gradient.addColorStop(0, prize.color);
        gradient.addColorStop(1, adjustColor(prize.color, -30));
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw border with shadow effect
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Add inner shadow
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw text with better positioning
        ctx.save();
        ctx.rotate(startAngle + sliceAngle / 2);
        
        // Draw text
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = prize.color.includes('FFE66D') ? '#333' : 'white';
        
        // Use Farsi-compatible font
        const fontSize = Math.max(12, wheelRadius / 25);
        ctx.font = `bold ${fontSize}px "Vazirmatn", Arial`;
        
        const lines = prize.text.split('\n');
        const lineHeight = fontSize * 1.2;
        const totalHeight = (lines.length - 1) * lineHeight;
        
        lines.forEach((line, i) => {
            ctx.fillText(line, wheelRadius - 50, (i - (lines.length - 1) / 2) * lineHeight + 5);
        });
        
        ctx.restore();
    });
    
    // Draw center circle with gradient
    const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
    centerGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    centerGradient.addColorStop(1, 'rgba(102, 126, 234, 0.3)');
    
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fillStyle = centerGradient;
    ctx.fill();
    
    // Center circle border
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#667eea';
    ctx.fill();
    
    ctx.restore();
}

// Helper function to adjust color brightness
function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

function spinWheel() {
    if (isSpinning) return;
    
    const nameValue = nameInput.value.trim();
    if (!nameValue && CONFIG.game.requireName) {
        showNotification(CONFIG.messages.noName, 'warning');
        nameInput.focus();
        return;
    }

    if (!canUserSpin(nameValue)) {
        showNotification(`متأسفانه شما 3 بار چرخش خود را مصرف کرده‌اید! 😢`, 'warning');
        spinBtn.disabled = true;
        nameInput.disabled = true;
        return;
    }
    
    const isAsena = isAsenaName(nameValue);
    
    // مخفی کردن نتایج قبلی
    resultDisplay.classList.add('hidden');
    specialMessage.classList.add('hidden');
    
    // اجرای چرخش برای همه (حتی آسنا)
    isSpinning = true;
    spinBtn.disabled = true;
    
    const emptyIndices = [];
    prizes.forEach((prize, index) => {
        if (prize.text === 'خالی') {
            emptyIndices.push(index);
        }
    });
    
    let randomEmptyIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    
    // جلوگیری از گیج شدن گردونه در چرخش‌های دوم و سوم با ریست کردن دورهای اضافه
    wheelRotation = wheelRotation % (Math.PI * 2);
    
    // تنظیم زاویه دقیق برای قرار گرفتن خونه زیر فلش بالا (-90 درجه)
    const targetAngle = -(randomEmptyIndex * sliceAngle + sliceAngle / 2) - (Math.PI / 2);
    const spinCount = Math.floor(CONFIG.game.minSpins + Math.random() * (CONFIG.game.maxSpins - CONFIG.game.minSpins));
    const finalRotation = targetAngle + Math.PI * 2 * spinCount;
    
    const startRotation = wheelRotation;
    const rotationDifference = finalRotation - startRotation;
    const duration = CONFIG.game.spinDuration;
    const startTime = Date.now();
    
    if (CONFIG.celebration.soundEffects) playSpinSound();
    
    function animateSpin() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        wheelRotation = startRotation + rotationDifference * easeProgress;
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            isSpinning = false;
            const remainingSpins = MAX_SPINS - incrementUserSpinCount(nameValue);
            updateSpinCounter(nameValue);
            
            if (CONFIG.celebration.soundEffects) playWinSound();
            
            setTimeout(() => {
                if (isAsena) {
                    // نمایش پیام ویژه آسنا بعد از چرخش و اسکرول خودکار
                    specialMessage.classList.remove('hidden');
                    specialMessage.scrollIntoView({ behavior: 'smooth', block: 'center' }); // اسکرول به پیام
                    
                    if (CONFIG.celebration.confetti) triggerConfetti();
                    A11y.announceResult(CONFIG.specialMessage);
                    Analytics.trackEvent('special_name_triggered', { name: nameValue });
                } else {
                    // نمایش نتیجه عادی
                    showResult(randomEmptyIndex, nameValue);
                    if (CONFIG.celebration.confetti) triggerConfetti();
                    A11y.announceResult(`جایزه شما: ${prizes[randomEmptyIndex].displayName}`);
                }
                
                Analytics.trackSpinCompleted(nameValue, randomEmptyIndex);
                
                if (remainingSpins > 0) {
                    spinBtn.disabled = false;
                    showNotification(`تعداد چرخش‌های باقی: ${remainingSpins}`, 'info');
                } else {
                    spinBtn.disabled = true;
                    nameInput.disabled = true;
                    showNotification('شما تمام چرخش‌های خود را مصرف کردید! 🎊', 'warning');
                }
            }, 500);
        }
    }
    animateSpin();
}
// Show result
function showResult(prizeIndex, userName = '') {
    const prize = prizes[prizeIndex];
    const displayText = prize.displayName || prize.text;
    resultMessage.textContent = `${CONFIG.messages.result}${displayText}`;
    resultDisplay.classList.remove('hidden');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'warning' ? '#ff6b6b' : '#4ecdc4'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Confetti effect
function triggerConfetti() {
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: CONFIG.celebration.particleCount,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Sound effects (using Web Audio API)
function playSpinSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not supported
    }
}

function playWinSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        
        const notes = [523.25, 659.25, 783.99, 1046.50];
        
        notes.forEach((note, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(note, now);
            gainNode.gain.setValueAtTime(0.1, now + index * 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.15);
            
            oscillator.start(now + index * 0.1);
            oscillator.stop(now + index * 0.1 + 0.15);
        });
    } catch (e) {
        // Audio not supported
    }
}

// Event listeners
spinBtn.addEventListener('click', spinWheel);

// Update spin counter when name changes
nameInput.addEventListener('input', () => {
    const nameValue = nameInput.value.trim();
    updateSpinCounter(nameValue);
    
    if (nameValue && canUserSpin(nameValue)) {
        spinBtn.disabled = false;
    } else {
        spinBtn.disabled = true;
    }
});

// Allow spinning by pressing Enter in name input
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isSpinning) {
        spinWheel();
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        nameInput.value = '';
        resultDisplay.classList.add('hidden');
        specialMessage.classList.add('hidden');
        nameInput.focus();
        // Trigger input event to update counter
        nameInput.dispatchEvent(new Event('input'));
    }
});

// Load confetti library for celebration
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/confetti-js@0.0.18/dist/index.min.js';
confettiScript.async = true;
document.head.appendChild(confettiScript);

// Initial draw
drawWheel();
adjustCanvasSize();

// Add touch-friendly improvements
window.addEventListener('load', () => {
    // Subtle animation on page load
    const canvas = document.getElementById('wheelCanvas');
    canvas.style.animation = 'wheelRotateStart 1s ease-out';
    
    // Initialize spin counter
    const spinCounter = document.getElementById('spinCounter');
    spinCounter.textContent = 'لطفاً نام خود را وارد کنید';
    
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Optimize for mobile performance
    if ('ontouchstart' in window) {
        // Remove hover effects on touch devices
        document.documentElement.style.setProperty('--webkit-tap-highlight-color', 'transparent');
        document.body.style.webkitTouchCallout = 'none';
        document.body.style.webkitUserSelect = 'none';
    }
});
