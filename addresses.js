let addresses = JSON.parse(localStorage.getItem('user_addresses')) || [];

const addressModalElement = new bootstrap.Modal(document.getElementById('addressModal'));

// وقتی از کلمه کلیدی new و bootstrap.Modal استفاده میشود داری به مرورگر دستور می‌دهی:
// این المنت ساده‌ی اچ تی ام ال را بردار و به آن توانایی‌های یک مودال اضافه کن 

const addressForm = document.getElementById('addressForm');
const saveAddressBtn = document.getElementById('saveAddressBtn');
const addressInputIndex = document.getElementById('addressIndex');

// ۲. تابع اصلی نمایش لیست آدرس‌ها در صفحه
const renderAddresses = () => {
    const addressContainer = document.getElementById('addresses');
    if (!addressContainer) return;

    // اگر هیچ آدرسی وجود نداشت، یک پیام و دکمه اضافه کردن نشان بده
    if (addresses.length == 0) {
        addressContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-geo-alt text-muted fs-1"></i>
                <p class="text-muted mt-2">هیچ آدرسی ثبت نشده است.</p>
                <button class="btn custom_btn btn-sm" onclick="openAddressModal(null)">
                 
                    اولین آدرس خود را اضافه کنید
                    <i class="bi bi-plus-lg "></i>
                </button>
            </div>
        `;
        return;
    }

    // ساختن ظاهر هر آدرس در لیست
    let htmlContent = '';
    addresses.forEach((addr, index) => {
        htmlContent += `
            <div class="address-item border rounded p-3 mb-3 shadow-sm">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="fw-bold mb-1">${addr.title}</h6>
                        <p class="small text-muted mb-0">
                            ${addr.city}, ${addr.street}, ${addr.details}
                        </p>
                        <span class="badge bg-light text-dark border mt-2">${addr.phone}</span>
                    </div>
                    <div class="btn-group">
                        <!-- دکمه ویرایش: شماره ایندکس را به تابع می‌فرستد -->
                        <button class="btn btn-sm btn-outline-primary" onclick="openAddressModal(${index})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <!-- دکمه حذف -->
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteAddress(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // اضافه کردن دکمه "افزودن آدرس جدید" به پایین لیست
    htmlContent += `
        <div class="w-50 text-center mt-4 m-auto">
            <button class=" btn custom_btn w-100" onclick="openAddressModal(null)">
                <i class="bi bi-plus-lg me-2"></i> افزودن آدرس جدید
            </button>
        </div>
    `;

    addressContainer.innerHTML = htmlContent;
}

// ۳. تابع باز کردن مودال (هم برای افزودن جدید، هم برای ویرایش)
// اگر ایندکس برابر با نال  باشد -> حالت افزودن
// اگر ایندکس یک عدد باشد -> حالت ویرایش
const openAddressModal = (index) => {


    if (index !== null) {
        // حالت ویرایش: اطلاعات آدرس مورد نظر را از آرایه بردار و در فرم بریز
        // برای اینکه وقتی کاربر داره ویرایش میکنه اطلاعاتش وجود داشته باشن تو فرم
        const addr = addresses[index];

        
        document.getElementById('addressTitle').value = addr.title;

        // ینی مثلا ایندکس ما صفره و ائلین آدرس توی آرایه س و حالا اون ادر ینی اطلاعات ایندکس اول که شامل تایتل و و شهر و ... هست وحالا خط بالا ینی برو اون اینپوتی که آیدیش آدرس تایتل هست رو پیداش کن و مقدارش رو برابر addr.title قرار بده اینطوری اون اینپوت پر میشه وقتی کاربر میخواد ویرایش کنه
        document.getElementById('addressPhone').value = addr.phone;
        document.getElementById('addressCity').value = addr.city;
        document.getElementById('addressStreet').value = addr.street;
        document.getElementById('addressDetails').value = addr.details;

        addressInputIndex.value = index; // شماره آدرس را در فیلد مخفی نگه می‌داریم
        document.getElementById('addressModalLabel').textContent = 'ویرایش آدرس';
    } else {
        
        addressForm.reset(); // ابتدا فرم را کاملاً خالی می‌کنیم

        // خط بالا برای یه موقعیت خاص نیازه .وقتی مثلا  یه آدرس رو داریم ویرایش میکنیم و بعد اطلاعات رو ویرایش کردیم و بعد بدون ذخیره مودال رو بستیم.حالا وقتی روی افزودن آدرس جدید کلیک کنم اطلاعات فرم قبلی هنوز هست


        // حالت افزودن: عنوان مودال را عوض کن
        document.getElementById('addressModalLabel').textContent = 'افزودن آدرس جدید';

    }

    addressModalElement.show(); // در نهایت مودال را نمایش بده
}

// ۴. تابع ذخیره کردن (وقتی کاربر روی دکمه "ذخیره" در مودال کلیک می‌کند)
saveAddressBtn.addEventListener('click', () => {
    const title = document.getElementById('addressTitle').value;
    const phone = document.getElementById('addressPhone').value;
    const city = document.getElementById('addressCity').value;
    const street = document.getElementById('addressStreet').value;
    const details = document.getElementById('addressDetails').value;
    const index = addressInputIndex.value; // مقدار اینپوت مخفی (یا خالی است یا عدد)
    // ما در تابع مودال ایندکس رو در اینپوت مخفی نگه داشتم  و حالا مقدارش رو برابر ایندکس قرار میدم تا بتونم استفاده کنم 

    // چک کردن اینکه فیلدها خالی نباشند
    if (!title || !phone || !city || !street) {
        alert("لطفا فیلدهای اصلی را پر کنید");
        return;
    }

    const addressData = { title, phone, city, street, details };

    if (index == '') {
        // اگر ایندکس خالی بود -> یعنی کاربر آدرس جدید ساخته
        // اینجا اون مقدار ایندکس به دردم میخوره و برای اینه که بفهمم کاربر داره ویرایش میکنه یا آدرس جدید داره وارد میکنه
        addresses.push(addressData);
    } else {
        // اگر ایندکس عدد بود -> یعنی کاربر داشت آدرس قبلی را ویرایش می‌کرد
        // پس بیا آدرس دیتای جدید رو بریز توی ایندکس مورد نظر 
        addresses[index] = addressData;
    }

    // ذخیره کردن آرایه به‌روز شده در حافظه مرورگر
    localStorage.setItem('user_addresses', JSON.stringify(addresses));

    renderAddresses(); // لیست را در صفحه آپدیت کن
    addressModalElement.hide(); // مودال را ببند
});

// ۵. تابع حذف آدرس
const deleteAddress = (index) => {
    if (confirm('آیا از حذف این آدرس مطمئن هستید؟')) {
        addresses.splice(index, 1); // حذف از آرایه
        localStorage.setItem('user_addresses', JSON.stringify(addresses)); // ذخیره در حافظه
        renderAddresses(); // آپدیت صفحه
    }
}

// ۶. اجرای اولیه: وقتی صفحه لود شد، لیست آدرس‌ها را نمایش بده
document.addEventListener('DOMContentLoaded', () => {
    renderAddresses();
});



// =========================================================

const check_address_title = (e) => {
    const allowedChars = /^[\u0600-\u06FF0-9 ]$/;

    // جلوگیری از اسپیس اول
    if (e.key === " " && e.target.value.length === 0) {
        e.preventDefault();
        return false;
    }


    //   ۱. e.key === " "
    // یعنی کاربر کلید اسپیس رو زده؟
    // اگر بله، شرط اول برقرار میشه.
    // e.target.value.length === 0
    // e.target همون اینپوتیه که روش تایپ میشه.
    // e.target.value یعنی متن داخل اینپوت
    // اگر اینپوت خالی باشه:طولش میشه:صفر. یعنی هنوز هیچ چیزی تایپ نشده.
    // اما اگر کاربر مثلا وارد کرده باشه محل و بعد فاصله گذاشته باشه میپذیره چون شرط اول برقراره ولی شرط دوم برقرار نیست و طول اون اینپوت وارد شده صفر نیس پس میره پایین و چون اسپیس جزو کاراکتر های مجاز  ریجکس هست قبول میکنه

    if (allowedChars.test(e.key)) {
        return true;
    }

    e.preventDefault();
    return false;

    //  این قسمت زمانی اجرا میشه که هیچ‌کدوم از شرط‌های بالا برقرار نباشن
    // e.preventDefault()
    // یعنی رفتار پیش‌ فرض مرورگر رو لغو کن.

    // رفتار پیش‌ فرض رویداد کی داون اینه که کلیدی که زدی داخل اینپوت نوشته بشه.  
}




const check_mobile_address = (e) => {
    const addressPhone = document.getElementById('addressPhone').value;


    // ^9 یعنی حتما با 9 شروع شود
    // \d{9}$ یعنی بعد از آن دقیقاً 9 رقم دیگر بیاید و تمام شود (مجموعاً 10 رقم)

    if (/^09\d{9}$/.test(addressPhone)) {
        return true;
    }
}


const check_city = (e) => {

    const allowedChars = /^[\u0600-\u06FF0-9 ]$/;

    // جلوگیری از اسپیس اول
    if (e.key === " " && e.target.value.length === 0) {
        e.preventDefault();
        return false;
    }


    if (allowedChars.test(e.key)) {
        return true;
    }

    e.preventDefault();
    return false;
}


const check_street = (e) => {

    const allowedChars = /^[\u0600-\u06FF0-9_، ]$/;

    // جلوگیری از اسپیس اول
    if (e.key === " " && e.target.value.length === 0) {
        e.preventDefault();
        return false;
    }


    if (allowedChars.test(e.key)) {
        return true;
    }

    e.preventDefault();
    return false;

}


const check_details = (e) => {

    const allowedChars = /^[\u0600-\u06FF0-9_، ]$/;

    // جلوگیری از اسپیس اول
    if (e.key === " " && e.target.value.length === 0) {
        e.preventDefault();
        return false;
    }


    if (allowedChars.test(e.key)) {
        return true;
    }

    e.preventDefault();
    return false;

}