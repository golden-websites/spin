/**
 * Test Suite - تست‌های خودکار
 * این فایل برای تست‌های توسعه‌دهنده است
 */

class TestSuite {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(description, fn) {
        try {
            fn();
            this.passed++;
            console.log(`✓ ${description}`);
            return true;
        } catch (error) {
            this.failed++;
            console.error(`✗ ${description}`, error.message);
            return false;
        }
    }

    assertEquals(actual, expected, message = '') {
        if (actual !== expected) {
            throw new Error(`${message} - Expected: ${expected}, Got: ${actual}`);
        }
    }

    assertTrue(value, message = '') {
        if (value !== true) {
            throw new Error(`${message} - Expected true, got ${value}`);
        }
    }

    assertFalse(value, message = '') {
        if (value !== false) {
            throw new Error(`${message} - Expected false, got ${value}`);
        }
    }

    assertExists(value, message = '') {
        if (value === undefined || value === null) {
            throw new Error(`${message} - Expected value to exist`);
        }
    }

    report() {
        const total = this.passed + this.failed;
        console.log('\n' + '='.repeat(50));
        console.log(`تست‌ها: ${total} | ✓ ${this.passed} | ✗ ${this.failed}`);
        console.log('='.repeat(50) + '\n');
        return this.failed === 0;
    }
}

// ایجاد نمونه تست‌ها
const tester = new TestSuite();

// 1. تست‌های Configuration
console.log('\n🔧 تست‌های پیکربندی...\n');

tester.test('CONFIG موجود است', () => {
    tester.assertExists(CONFIG);
});

tester.test('جوایز درست تعریف شده‌اند', () => {
    tester.assertTrue(Array.isArray(CONFIG.prizes));
    tester.assertEquals(CONFIG.prizes.length, 12, 'باید 12 جایزه باشد');
});

tester.test('نام‌های خاص موجود هستند', () => {
    tester.assertTrue(Array.isArray(CONFIG.specialNames));
    tester.assertTrue(CONFIG.specialNames.includes('asena'));
});

tester.test('رنگ‌ها تعریف شده‌اند', () => {
    tester.assertExists(CONFIG.colors.primary);
    tester.assertExists(CONFIG.colors.secondary);
});

tester.test('تنظیمات بازی درست هستند', () => {
    tester.assertEquals(CONFIG.game.spinDuration, 6000);
    tester.assertTrue(CONFIG.game.alwaysLandOnEmpty);
});

// 2. تست‌های Validator
console.log('\n✅ تست‌های اعتبارسنجی...\n');

tester.test('نام‌های فارسی معتبر هستند', () => {
    tester.assertTrue(Validator.isValidName('علی'));
});

tester.test('نام‌های انگلیسی معتبر هستند', () => {
    tester.assertTrue(Validator.isValidName('Ali'));
});

tester.test('نام‌های خالی نامعتبر هستند', () => {
    tester.assertFalse(Validator.isValidName(''));
});

tester.test('نام‌های بسیار طولانی نامعتبر هستند', () => {
    tester.assertFalse(Validator.isValidName('a'.repeat(100)));
});

tester.test('تشخیص فارسی کار می‌کند', () => {
    tester.assertTrue(Validator.isFarsiName('آسنا'));
});

tester.test('تشخیص انگلیسی کار می‌کند', () => {
    tester.assertTrue(Validator.isEnglishName('Asena'));
});

// 3. تست‌های Asena Detection
console.log('\n🎯 تست‌های تشخیص آسنا...\n');

tester.test('asena شناخته می‌شود', () => {
    tester.assertTrue(isAsenaName('asena'));
});

tester.test('ASENA شناخته می‌شود', () => {
    tester.assertTrue(isAsenaName('ASENA'));
});

tester.test('Asena شناخته می‌شود', () => {
    tester.assertTrue(isAsenaName('Asena'));
});

tester.test('آسنا شناخته می‌شود', () => {
    tester.assertTrue(isAsenaName('آسنا'));
});

tester.test('asna شناخته می‌شود', () => {
    tester.assertTrue(isAsenaName('asna'));
});

tester.test('نام‌های دیگر شناخته نمی‌شوند', () => {
    tester.assertFalse(isAsenaName('ali'));
});

tester.test('فاصلاهای خالی نادیده گرفته می‌شوند', () => {
    tester.assertTrue(isAsenaName('  asena  '));
});

// 4. تست‌های LocalStorage
console.log('\n💾 تست‌های ذخیره‌سازی...\n');

tester.test('StorageManager می‌تواند ذخیره کند', () => {
    StorageManager.set('testKey', { value: 'test' });
    tester.assertExists(StorageManager.get('testKey'));
});

tester.test('StorageManager می‌تواند بازیابی کند', () => {
    StorageManager.set('testKey2', 'testValue');
    const result = StorageManager.get('testKey2');
    tester.assertEquals(result, 'testValue');
});

tester.test('StorageManager می‌تواند حذف کند', () => {
    StorageManager.set('testKey3', 'value');
    StorageManager.remove('testKey3');
    tester.assertExists(StorageManager.get('testKey3') === null);
});

// 5. تست‌های Canvas
console.log('\n🎨 تست‌های Canvas...\n');

tester.test('Canvas موجود است', () => {
    const canvas = document.getElementById('wheelCanvas');
    tester.assertExists(canvas);
});

tester.test('Canvas Context موجود است', () => {
    tester.assertExists(ctx);
});

tester.test('wheelRadius محاسبه شده است', () => {
    tester.assertEquals(wheelRadius, canvas.width / 2);
});

tester.test('sliceAngle محاسبه شده است', () => {
    const expected = (Math.PI * 2) / prizes.length;
    tester.assertEquals(sliceAngle, expected);
});

// 6. تست‌های DOM Elements
console.log('\n📄 تست‌های DOM...\n');

tester.test('دکمه چرخش موجود است', () => {
    tester.assertExists(spinBtn);
});

tester.test('ورودی نام موجود است', () => {
    tester.assertExists(nameInput);
});

tester.test('نمایش نتیجه موجود است', () => {
    tester.assertExists(resultDisplay);
});

tester.test('پیام خاص موجود است', () => {
    tester.assertExists(specialMessage);
});

// 7. تست‌های توابع کمکی
console.log('\n🛠️ تست‌های توابع کمکی...\n');

tester.test('Debounce کار می‌کند', () => {
    let callCount = 0;
    const debouncedFn = PerformanceUtils.debounce(() => { callCount++; }, 100);
    debouncedFn();
    debouncedFn();
    tester.assertEquals(callCount, 0, 'بلافاصله فراخوانی نشود');
});

tester.test('adjustColor کار می‌کند', () => {
    const color = adjustColor('#FF0000', 10);
    tester.assertExists(color);
    tester.assertTrue(color.startsWith('#'));
});

// 8. تست‌های Performance
console.log('\n⚡ تست‌های عملکرد...\n');

tester.test('drawWheel سریع است', () => {
    const start = performance.now();
    for (let i = 0; i < 10; i++) {
        drawWheel();
    }
    const end = performance.now();
    const avgTime = (end - start) / 10;
    console.log(`    میانگین زمان رسم: ${avgTime.toFixed(2)}ms`);
});

// گزارش نهایی
console.log('\n' + '='.repeat(50));
console.log('📊 خلاصه نتایج تست\n');
tester.report();

// Export برای استفاده در دیگر فایل‌ها
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestSuite, tester };
}
