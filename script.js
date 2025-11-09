let currentQuestionIndex = 0;
// تحديد جميع شاشات العرض (مقدمة + 20 سؤال + نتائج)
const screens = document.querySelectorAll('.screen');
// تحديد جميع أسئلة الاختبار فقط (20 سؤال)
const questions = document.querySelectorAll('.question'); 
let totalScore = 0;
let maxPossibleScore = 0;

// ******************************************************
// ** 1. تحديد الإجابات الصحيحة لـ 20 سؤالاً (يجب التعديل هنا) **
// ******************************************************
const correctAnswers = { 
    'q1': 'a', 'q2': 'c', 'q3': 'b', 'q4': 'a', 'q5': 'c', 
    'q6': 'd', 'q7': 'b', 'q8': 'a', 'q9': 'c', 'q10': 'b',
    'q11': 'b', 'q12': 'd', 'q13': 'c', 'q14': 'd', 'q15': 'b', 
    'q16': 'a', 'q17': 'c', 'q18': 'c', 'q19': 'd', 'q20': 'a'
    // مثال: إذا كانت الإجابة الصحيحة للسؤال 1 هي الخيار "ج"، عدّل 'q1': 'c'
};
// ******************************************************

// حساب إجمالي الدرجات الممكنة (بناءً على data-score في HTML)
questions.forEach(q => {
    maxPossibleScore += parseInt(q.dataset.score);
});
// عرض إجمالي الدرجات الممكنة في شاشة النتائج
document.getElementById('max-score').textContent = maxPossibleScore;


function nextQuestion() {
    // إخفاء الشاشة الحالية
    screens[currentQuestionIndex].classList.remove('active');

    // التقدم إلى الشاشة التالية
    currentQuestionIndex++;
    
    // إذا كان مؤشر الشاشة الحالي يتجاوز عدد الأسئلة بالإضافة إلى شاشة المقدمة، اعرض النتائج.
    if (currentQuestionIndex >= questions.length + 1) { 
        showResults();
        return;
    }

    // عرض الشاشة التالية
    screens[currentQuestionIndex].classList.add('active');

    // تعديل نص الزر في آخر سؤال ليعرض النتائج بدلاً من "السؤال التالي"
    if (currentQuestionIndex === questions.length) {
        // يتم تطبيق هذا على السؤال q-20
        const lastQuestionButton = document.querySelector(`#q-20 .next-btn`);
        if (lastQuestionButton) {
            lastQuestionButton.textContent = "عرض النتيجة";
        }
    }
}

function showResults() {
    // حساب الدرجات النهائية بناءً على إجابات المستخدم
    totalScore = 0;
    
    questions.forEach(q => {
        const questionId = q.id; // مثال: 'q-1'
        const inputName = questionId.replace('q-', 'q'); // مثال: 'q1'
        // تحديد الخيار الذي اختاره المستخدم لهذا السؤال
        const selectedInput = document.querySelector(`input[name='${inputName}']:checked`);
        
        // التحقق مما إذا كان المستخدم قد اختار إجابة وأنها مطابقة للإجابة الصحيحة المبرمجة
        if (selectedInput && selectedInput.value === correctAnswers[inputName]) {
            totalScore += parseInt(q.dataset.score); // إضافة درجة السؤال
        }
    });

    // عرض النتيجة النهائية
    document.getElementById('final-score').textContent = totalScore;
    // تفعيل شاشة النتائج
    screens[screens.length - 1].classList.add('active');

    // رسائل تحفيزية بناءً على النسبة المئوية
    const messageElement = document.querySelector('.final-message');
    const percentage = (totalScore / maxPossibleScore) * 100;
    
    if (percentage > 90) {
        messageElement.textContent = "أداء خرافي! أنت عبقري في التفكير الحاسوبي! 🥇";
    } else if (percentage > 70) {
        messageElement.textContent = "أداء ممتاز! لديك مهارات عالية في حل المشكلات. ✨";
    } else if (percentage > 50) {
        messageElement.textContent = "نتائج جيدة! استمر في التدرب لتطوير مهاراتك. 📚";
    } else {
        messageElement.textContent = "بداية موفقة! راجع الأسئلة الصعبة وحاول مرة أخرى. 💪";
    }
}