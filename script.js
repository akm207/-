// مصفوفة الوضعيات المختلفة للمساعد
const assistantStates = [
    { img: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png", txt: "يا هلا بك! جرب القهوة العربية بالزعفران، طعم أصيل!" },
    { img: "https://cdn-icons-png.flaticon.com/512/4140/4140040.png", txt: "قاعد أحضر لك كيكة سان سباستيان.. تذوب في الفم!" },
    { img: "https://cdn-icons-png.flaticon.com/512/4140/4140043.png", txt: "حران؟ آيس سبانش لاتيه هو الحل!" },
    { img: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png", txt: "تبغى فطور؟ جرب كرواسون الزبدة مع قهوة اليوم." }
];

let currentIndex = 0;

function rotateAssistant() {
    const bubble = document.getElementById('chatBubble');
    const img = document.getElementById('helperImg');
    
    // تغيير الحالة
    bubble.innerText = assistantStates[currentIndex].txt;
    img.src = assistantStates[currentIndex].img;
    
    // حركة بسيطة عند التغيير
    img.style.transform = "scale(1.1)";
    setTimeout(() => { img.style.transform = "scale(1)"; }, 500);

    currentIndex = (currentIndex + 1) % assistantStates.length;
}

// التغيير كل 15 ثانية بالضبط
setInterval(rotateAssistant, 15000);

// وظيفة التنقل السلس
function scrollToSection(id) {
    const element = document.getElementById(id);
    const yOffset = -80; // تعويض ارتفاع المنيو المثبت فوق
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
}