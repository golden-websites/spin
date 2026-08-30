# 📚 راهنمای فنی چرخه شانس

## 📁 ساختار فایل‌ها

```
spin/
├── index.html           # صفحه اصلی (HTML)
├── style.css            # استایل‌ها (CSS)
├── main.js              # منطق اصلی (JavaScript)
├── config.js            # تنظیمات و پیکربندی
├── utils.js             # توابع کمکی و ابزارها
├── README.md            # دستورالعمل عمومی
├── CUSTOMIZATION.md     # راهنمای سفارشی‌سازی
└── TECHNICAL.md         # این فایل

```

## 🏗️ معماری و مفاهیم

### معماری سی‌تو‌سی (Component-to-Component)

سایت از چند قسمت اصلی تشکیل شده‌است:

1. **چرخه (Wheel)**
   - Canvas API برای رسم
   - انیمیشن‌های صاف
   - گرادینت‌های رنگی

2. **کنترل‌ها (Controls)**
   - ورودی نام
   - دکمه چرخش
   - بخش نتایج

3. **اطلاعات (Information)**
   - پیام خوش‌آمدگویی
   - لیست جوایز
   - نکات مهم
   - اطلاعات تماس

### جریان داده (Data Flow)

```
کاربر → ورود نام → تصحیح → چرخش → نتیجه → نمایش
  ↓
  ├─→ Asena؟ → پیام خاص
  └─→ نام عادی → جایزه خالی
```

## 🎨 سیستم رنگی

- **CSS Custom Properties**: برای مدیریت‌های رنگی
- **Gradients**: برای اثرات بصری
- **Opacity**: برای شفافیت

```css
:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --accent: #ff6b6b;
    --success: #4ecdc4;
    --warning: #ffe66d;
}
```

## ⚙️ نحوه کار چرخه

### رسم چرخه (drawWheel)

1. پاک کردن Canvas
2. ترجمه به مرکز
3. چرخش بر اساس `wheelRotation`
4. رسم هر بخش:
   - مسیر Arc
   - رنگ Gradient
   - متن فارسی
5. رسم دایره مرکزی

### انیمیشن چرخش

```javascript
// الگو:
// 1. شروع: rotationStart
// 2. محاسبه: progress (0 → 1)
// 3. تطبیق: easeProgress (cubic ease-out)
// 4. به‌روزرسانی: wheelRotation
// 5. رسم: drawWheel()
// 6. تکرار: requestAnimationFrame
```

### محاسبه نقطه فرود

```javascript
targetAngle = -(prizeIndex * sliceAngle + sliceAngle / 2)
finalRotation = targetAngle + (Math.PI * 2 * fullRotations)
```

## 🔊 اثرات صوتی

### صدای چرخش
- فرکانس: 800 Hz → 400 Hz
- مدت: 100 ms
- سطح صوت: 0.1

### صدای برنده
```
261.63 Hz (دو) → 100 ms
329.63 Hz (می) → 100 ms
392.00 Hz (سل) → 100 ms
523.25 Hz (دو بالا) → 150 ms
```

## 🎊 اثرات بصری

### Confetti
- مکتبه: confetti-js
- تعداد ذرات: 100
- پراکندگی: 70 درجه

### انیمیشن‌های CSS

```css
@keyframes pulse { /* نوسان } 
@keyframes bounce { /* جهش */ }
@keyframes float { /* شناور */ }
@keyframes slideInUp { /* لغزش از پایین */ }
```

## 📱 طراحی پاسخگو

### نقاط تغییر

- **1200px**: تغییر گرید (دو ستون → یک ستون)
- **768px**: تنظیم فونت‌ها و تورفتگی
- **500px**: کاهش اندازه‌ها و تنظیمات موبایل

## ♿ دسترسی‌پذیری

### ARIA Attributes
```html
<div role="status" aria-live="polite">
    اعلام پویا برای صفحه‌خوان‌ها
</div>
```

### Keyboard Navigation
- `Tab`: حرکت بین عناصر
- `Enter`: فعال کردن دکمه
- `R`: صفر‌گذاری

## 🚀 بهینه‌سازی عملکرد

### تکنیک‌های استفاده‌شده

1. **Debounce/Throttle**: برای رویدادهای فراوان
2. **RequestAnimationFrame**: برای انیمیشن‌ها
3. **LocalStorage**: برای ذخیره‌سازی
4. **Lazy Loading**: برای اسکریپت‌های خارجی

## 🔐 امنیت

### رشته‌های ورودی
- تصحیح فاصلاهای خالی
- تصحیح حروف بزرگ/کوچک
- اعتبارسنجی Farsi/English

### XSS Prevention
```javascript
// استفاده از textContent به جای innerHTML
element.textContent = userInput;
```

## 📊 تحلیل‌گری

### رویدادهای ردیابی‌شده

1. `spin_completed` - هنگام تکمیل چرخش
2. `special_name_triggered` - نام خاص وارد شد
3. `error_occurred` - هنگام خطا

```javascript
Analytics.trackEvent('event_name', {
    user_name: name,
    prize_index: index,
    timestamp: timestamp
});
```

## 🐛 رفع‌اشکال

### Console Logging

```javascript
console.log('Event triggered:', eventData);
console.warn('Warning message');
console.error('Error message');
```

### Performance Monitoring

```javascript
PerformanceUtils.measurePerformance('label', () => {
    // کد برای اندازه‌گیری
});
```

## 🔄 به‌روزرسانی و نگهداری

### اضافه کردن جایزه جدید

```javascript
// config.js میں:
CONFIG.prizes.push({
    text: 'جایزه جدید',
    color: '#NEWCOLOR',
    displayName: 'جایزه جدید - توضیحات'
});
```

### تغییر نام خاص

```javascript
// config.js میں:
CONFIG.specialNames.push('نام جدید');
```

### تغییر رنگ

```javascript
// config.js میں:
CONFIG.colors.primary = '#NEWCOLOR';
ThemeManager.applyTheme('default');
```

## 📈 موارد پیشرفتی

### Local Storage Integration

```javascript
// ذخیره نام شرکت‌کننده
StorageManager.set('lastSpinner', {
    name: nameValue,
    timestamp: Date.now()
});

// دریافت
const lastSpinner = StorageManager.get('lastSpinner');
```

### Custom Notifications

```javascript
notificationQueue.add('پیام', 'info', 3000);
notificationQueue.add('هشدار', 'warning', 5000);
```

### Animation Utilities

```javascript
AnimationUtils.shake(element);
AnimationUtils.pulse(element);
AnimationUtils.bounce(element);
```

## 🎯 خطوط کد مهم

### نقطه ورود
```javascript
// main.js - line 1
// config.js وارد شود
// utils.js وارد شود
```

### حلقه رسم
```javascript
drawWheel(); // هر انیمیشن
```

### حلقه چرخش
```javascript
animateSpin(); // requestAnimationFrame
```

## 📞 پشتیبانی و مشاوره

برای سوالات فنی:
1. بررسی console برای خطاها
2. بررسی Network tab برای مشکلات لود
3. استفاده از DevTools برای debugging

---

**آخرین به‌روزرسانی**: 1403/05/09
**نسخه**: 2.0
**وضعیت**: فعال و پشتیبانی‌شده ✓
