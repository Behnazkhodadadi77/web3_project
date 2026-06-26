// ===================تابع نام ===============

const check_name = (e) => {
    const error_element = document.getElementById('error_name');

    // جلوگیری از Space
    if (e.key == ' ') {
        e.preventDefault();
        error_element.innerHTML = '*';
        return;
    }

    // فقط حروف انگلیسی مجاز باشد (A-Z)
    const isLetter =
        (e.key >= 'a' && e.key <= 'z') ||
        (e.key >= 'A' && e.key <= 'Z');

    if (!isLetter) {
        error_element.innerHTML = '*';
        e.preventDefault();
    }
    else {
        error_element.innerHTML = '';
    }
};

// ===================تابع نام خانوادگی=================
const check_lastname = (e) => {
    const error_element = document.getElementById('error_lastname');

    // جلوگیری از Space
    if (e.key == ' ') {
        e.preventDefault();
        error_element.innerHTML = '*';
        return;
    }

    // فقط حروف انگلیسی مجاز باشد (A-Z)
    const isLetter =
        (e.key >= 'a' && e.key <= 'z') ||
        (e.key >= 'A' && e.key <= 'Z');

    if (!isLetter) {
        error_element.innerHTML = '*';
        e.preventDefault();
    }
    else {
        error_element.innerHTML = '';
    }
};


// ===================تابع کد ملی ==================

const block_nationalcode = (e) => {


    const allowedChars = /^[0-9]$/;

    if (!allowedChars.test(e.key)) {

        e.preventDefault();
        return false;
    }

    return true;

}



const check_national_code = (e) => {
    const national_code = document.getElementById('national_code').value;
    const error_national_code = document.getElementById('error_national_code');
    const allDigitEqual = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"];

    // ۱. فیلترهای اولیه
    if (allDigitEqual.indexOf(national_code) !== -1 || !/^[0-9]{10}$/.test(national_code)) {
        error_national_code.innerHTML = '*';
        return; // اینجا متوقف می‌شود و دیگر ادامه نمی‌دهد
    }


    const chArray = Array.from(national_code);


    let b = 0;
    for (let i = 0; i < 9; i++) {
        b += parseInt(chArray[i]) * (10 - i);
    }

    const c = b % 11;
    const a = parseInt(chArray[9]);

    // ۳. بررسی شرط نهایی (رقم کنترلی)
    const isValid = ((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a));

    // ۴. نمایش نتیجه نهایی در صفحه
    if (isValid) {
        error_national_code.innerHTML = '';
    }

    else {
        error_national_code.innerHTML = '*';
    }
}


// ===========کد اشتباه=======================

// const check_email = (e) => {

//     const email = document.getElementById('email').value
//     const error_element = document.getElementById('error_email');
//     if (/^[a-zA-Z]+\.[a-zA-Z]+@(gmail|yahoo)\.com$/.test(email)) {
//         error_element.innerHTML = ''

//     }
//     else
//         e.preventDefault();
//     error_element.innerHTML = '*'

// }

// کد بالا اشتباس چون من با رویداد کی پرس نوشته بودمش و داشتم سعی میکردم کل آدرس ایمیل رو اعتبار سنجی کنم در صورتی که نمیشه و این رویداد مناسب این کار نیست چون مثلا من یه حرف انگلیسی وارد میکنم و بعد رویداد میگه که توش اون چیزایی که تو شرطم گفتم وجود نداره مثل جیمیل یاهو و... و میگه شرط غلطه و میره توی الس و نمیذاره هیچی وارد کنم

// ======================تابع ایمیل======================

const blockchar = (e) => {


    const allowedChars = /^[a-zA-Z0-9@\.]$/;

    if (!allowedChars.test(e.key)) {

        e.preventDefault();
        return false;
    }

    return true;

}

// در کد بالا نمیتونم مثل پسورد عمل کنم چون پسورد بازه گسترده تری داشت ولی اینجا اگر بیام فرمت ایمیل رو کامل تعریف کنم هیچ وقت درست نمیشه چون موقع تایپ هنوز فرمت ایمیل تکمیل نشده

const checkemail = (e) => {
    const email = document.getElementById('email').value
    const error_email = document.getElementById('error_email');


    if (/^[a-zA-Z]+[a-zA-Z0-9\.]+@(gmail|yahoo)\.com$/.test(email)) {

        error_email.innerHTML = ''
    }

    else
        error_email.innerHTML = '*'


}


//// ===================تابع آیکون چشم پسورد========
const showpassword = (e) => {
    const password = document.getElementById('password')
    const show_password = document.getElementById('show_pass')

    if (password.type == 'password') {
        password.type = 'text'
        show_password.classList.remove('bi-eye')
        show_password.classList.add('bi-eye-slash')
    }

    else {
        password.type = 'password'
        show_password.classList.add('bi-eye')
        show_password.classList.remove('bi-eye-slash')

        // وقتی روی آیکون چشم کلیک میشود چون تایپ پسورد است آنرا به تکست تبدیل میکند و وقتی دوباره روی آیکون چشم کلیک شود چون تایپ آن تکست است آن را به پسورد تبدیل کرده و در نتیجه پسورد دیده نمیشود

    }
}

// ===================تابع پسورد============


const blockSpace = (e) => {


    if (
        e.key == 'Backspace' ||
        e.key == 'Delete' ||
        e.key == 'Tab' ||
        e.key == 'Enter' ||
        e.key == 'ArrowLeft' ||
        e.key == 'ArrowRight' ||
        e.key == 'ArrowUp' ||
        e.key == 'ArrowDown' ||
        e.key == 'Home' ||
        e.key == 'End'
    ) {
        return true;
    }


    if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}:"\|<>\/?~]$/.test(e.key)) {


        // اینجا علامت دلار رو میذاریم چون میخوایم یکی از این کاراکتر ها وجود   داشته باشه (حروف انگلیسی کوچک و بزرگ و عدد و کاراکترهای خاص )اگر ابتدا و انتها رو علامتشو نذاریم بازم درست کار میکنه ولی به این معنیه که مثلا اگر حرف انگلیسی کوچک وارد کرد دیگه بعدش مهم نیس چی وارد کرده

        e.preventDefault();
        return false;
    }

    // اگر همه موارد بالا نبود و کاراکتر مجاز بود
    return true;
};


const checkpassword = (e) => {


    const password = document.getElementById('password').value
    const error_password = document.getElementById('error_password');

    const error1 = document.getElementById('error1')
    const error2 = document.getElementById('error2')
    const error3 = document.getElementById('error3')
    const error1_icon = document.getElementById('error1_icon')
    const error2_icon = document.getElementById('error2_icon')
    const error3_icon = document.getElementById('error3_icon')

    error1.classList.add('red');
    error1.classList.remove('green');
    error1_icon.classList.add('bi-x')
    error1_icon.classList.remove('bi-check2-circle')


    error2.classList.add('red');
    error2.classList.remove('green');
    error2_icon.classList.add('bi-x')
    error2_icon.classList.remove('bi-check2-circle')


    error3.classList.add('red');
    error3.classList.remove('green');
    error3_icon.classList.add('bi-x')
    error3_icon.classList.remove('bi-check2-circle')

    // این چهار خط بالا برای این گذاشتم که اگر طول پسورد کمتر از 8 بود قرمز بشه 
    // و آیکون ضربدر هم داشته باشه 

    let allConditionsMet = true; // فرض می‌کنیم همه شرط‌ها درست هستند

    if (password.length >= 8) {

        error1.classList.add('green');
        error1.classList.remove('red');
        error1_icon.classList.remove('bi-x');
        error1_icon.classList.add('bi-check2-circle');

    }


    else {

        allConditionsMet = false; // شرط برقرار نشد
    }

    if (/[A-Z]/.test(password)) {

        //  اگر علامت ابتدا و انتهای ریجکس رو بذارم وقتی دو تا حرف بزرگ وارد کنم فقط اولی رو میپذیره و عبارت حداقل یک کاراکتر بزرگ دوباره قرمز میشه

        error2.classList.add('green');
        error2.classList.remove('red');
        error2_icon.classList.remove('bi-x');
        error2_icon.classList.add('bi-check2-circle');

    }


    // اون چیزی که داخل / ... / نوشته شده اسمش  ریجکس هست یا عبارت منظمه
    // یعنی هر کدوم از این کاراکتر ها
    // پس این عبارت می‌گوید اگر پسورد شامل حروف بزرگ انگلیسی بود، شرط اجرا شود

    else {

        allConditionsMet = false;
    }

    if (/[@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?~]/.test(password)) {

        error3.classList.add('green');
        error3.classList.remove('red');
        error3_icon.classList.remove('bi-x');
        error3_icon.classList.add('bi-check2-circle');

    }

    else {

        allConditionsMet = false;
    }

    if (allConditionsMet) {
        error_password.innerHTML = '';

    }

    else {
        error_password.innerHTML = '*';
    }
};
// ================= تابع چشم تایید پسورد==============




const showpassword_confirm = (e) => {
    const password_confirm = document.getElementById('password_confirm')
    const show_pass_confirm = document.getElementById('show_pass_confirm')

    if (password_confirm.type == 'password') {
        password_confirm.type = 'text'
        show_pass_confirm.classList.remove('bi-eye')
        show_pass_confirm.classList.add('bi-eye-slash')
    }

    else {
        password_confirm.type = 'password'
        show_pass_confirm.classList.add('bi-eye')
        show_pass_confirm.classList.remove('bi-eye-slash')



    }
}





// ================= تابع تایید پسورد=======================



const blockSpace_confirm = (e) => {


    if (
        e.key == 'Backspace' ||
        e.key == 'Delete' ||
        e.key == 'Tab' ||
        e.key == 'Enter' ||
        e.key == 'ArrowLeft' ||
        e.key == 'ArrowRight' ||
        e.key == 'ArrowUp' ||
        e.key == 'ArrowDown' ||
        e.key == 'Home' ||
        e.key == 'End'
    ) {
        return true;
    }


    if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}:"\|<>\/?~]$/.test(e.key)) {


        // اینجا علامت دلار رو میذاریم چون میخوایم یکی از این کاراکتر ها وجود   داشته باشه (حروف انگلیسی کوچک و بزرگ و عدد و کاراکترهای خاص )اگر ابتدا و انتها رو علامتشو نذاریم بازم درست کار میکنه ولی به این معنیه که مثلا اگر حرف انگلیسی کوچک وارد کرد دیگه بعدش مهم نیس چی وارد کرده

        e.preventDefault();
        return false;
    }

    // اگر همه موارد بالا نبود و کاراکتر مجاز بود
    return true;
};

const confirm_pass = (e) => {
    const pass1 = document.querySelector('#password').value;
    const pass2 = document.querySelector('#password_confirm').value;

    if (pass1 == pass2) {
        document.getElementById('error_password_confirm').innerHTML = '';

    } else {
        document.getElementById('error_password_confirm').innerHTML = '*';
    }
}
// ===================تابع موبایل===============

const check_mobile = (e) => {
    const mobile_number = document.getElementById('mobile_number').value;
    const error_mobile = document.getElementById('error_mobile');

    // ^9 یعنی حتما با 9 شروع شود
    // \d{9}$ یعنی بعد از آن دقیقاً 9 رقم دیگر بیاید و تمام شود (مجموعاً 10 رقم)

    if (/^9\d{9}$/.test(mobile_number)) {
        error_mobile.innerHTML = '';
    } else {
        error_mobile.innerHTML = '*';
    }
}

// empty
// for (let i = 0; i < document.querySelectorAll('input').length; i++) {

//     document.querySelectorAll('input')[i] = ''
// }

// document.querySelectorAll('input')[0].focus();

// ===================کد کپچا==========================



const block_captcha_char = (e) => {
    if (
        e.key == 'Backspace' ||
        e.key == 'Delete' ||
        e.key == 'Tab' ||
        e.key == 'Enter' ||
        e.key == 'ArrowLeft' ||
        e.key == 'ArrowRight' ||
        e.key == 'ArrowUp' ||
        e.key == 'ArrowDown' ||
        e.key == 'Home' ||
        e.key == 'End'
    ) {
        return true;
    }

    const allowedcaptchaChars = /^[A-za-z0-9]$/;

    if (!allowedcaptchaChars.test(e.key)) {

        e.preventDefault();
        return false;
    }

    return true;

}





let captcha;
let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
const error_captcha = document.getElementById('error_captcha');

const generate_captcha = () => {
    let first = alphabets[Math.floor(Math.random() * alphabets.length)];

    // alphabets.length: ببین کلاً چند تا حرف داریم؟» (مثلاً ۵۲ تا)
    // Math.random() * ... یک عدد تصادفی بین ۰ تا ۵۲ انتخاب کن
    // 52 طول آلفابت هست
    // Math.floor(...): اون عدد اعشاری رو گرد کن تا بشه یک عدد صحیح (مثلاً ۲۵).
    // alphabets[...]: حالا برو از توی اون حروف، حرفی که شماره‌اش ۲۵ هست رو برام بیار

    // در جاوا اسکریپت، رشته‌ها مثل یک لیست از کاراکترها هستند که هر کدام یک شماره جایگاه دارند:

    // alphabets[0] اولین حرف
    // alphabets[1] دومین حرف

    let second = Math.floor(Math.random() * 10);
    let third = Math.floor(Math.random() * 10);
    let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
    let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
    let sixth = Math.floor(Math.random() * 10);

    captcha = first.toString() + second.toString() + third.toString() + fourth.toString() + fifth.toString() + sixth.toString();

    document.getElementById('generated_captcha').innerHTML = captcha;
    document.getElementById('entered_captcha').value = '';
    status.innerHTML = '';
}

const check_captcha = () => {

    let entered_captcha = document.getElementById('entered_captcha').value;
    if (entered_captcha == captcha) {
        error_captcha.innerHTML = ''
    }

    else {


        error_captcha.innerHTML = '*'
        document.getElementById('entered_captcha').value = '';
    }
}

generate_captcha();


const signup_btn = document.querySelector('#signup_btn');

signup_btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";
});