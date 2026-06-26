const addresses = JSON.parse(localStorage.getItem('user_addresses')) || [];

const renderAddresses = () => {

    const addressContainer = document.getElementById('addresses');



    if (addresses.length == 0) {
        addressContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-geo-alt text-muted fs-1" ></i>
                <p class="text-muted mt-2">هیچ آدرسی ثبت نشده است.</p>
                
                <button class="btn custom_btn btn-sm" onclick="addNewAddress()"> اولین آدرس خود را اضافه کنید <i class="bi-plus-square ms-2"></i></button>
            </div>
        `;
        return;
    }

    // ساختن HTML برای هر آدرس
    let htmlContent = '';
    addresses.forEach((addr, index) => {
        htmlContent += `
            <div class="address-item border rounded p-3 mb-3 shadow-sm position-relative">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="fw-bold mb-1">${addr.title || 'آدرس بدون عنوان'}</h6>
                        <p class="small text-muted mb-0">
                            ${addr.city}, ${addr.street}, ${addr.details}
                        </p>
                        <span class="badge bg-light text-dark border mt-2">${addr.phone}</span>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-primary" >
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteAddress(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // اضافه کردن دکمه افزودن در انتها
    htmlContent += `
        <div class="text-center mt-4">
            <button class="btn btn-outline-success w-100" onclick="addNewAddress()">
                <i class="bi bi-plus-lg me-2"></i> افزودن آدرس جدید
            </button>
        </div>
    `;

    addressContainer.innerHTML = htmlContent;
}

// ۲. تابع حذف آدرس
const deleteAddress = (index) => {
    if (confirm('آیا از حذف این آدرس مطمئن هستید؟')) {

        addresses.splice(index, 1); // حذف از آرایه
        localStorage.setItem('user_addresses', JSON.stringify(addresses)); // ذخیره مجدد
        renderAddresses(); // آپدیت ظاهر
    }
}

// فراخوانی تابع در هنگام لود شدن صفحه
document.addEventListener('DOMContentLoaded', renderAddresses);


