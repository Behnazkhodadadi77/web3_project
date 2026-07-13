
let arr_basket = JSON.parse(localStorage.getItem('my_basket_data')) || [];

// برو توی حافظه مرورگر، اگه سبد خریدی ذخیره شده بود، بیارش و تبدیلش کن به آرایه. اگه هم چیزی نبود، یه آرایه خالی بساز تا کد خطا نده
// وقتی چیزی رو به سبد اضافه میکنیم و پوش میشه تو آرایه و بعد به صورت رشته ذخیره ش میکنیم تو لوکال استوریج ،وقتی روی آیکون سبد خرید کلیک کنیم به صفحه ی دیگه ای میریم و چون اون صفحه ی اچ تی ام ال لینک فایل های جی اس رو داره دوباره فایلای جی اس اجرا میشن و همین خط بالا خونده میشه و میاد داده ی ذخیره شده توی لوکال استوریج رو که رشته س میخونه و تبدیل به آرایه میکنه و روش فور ایچ میزنه و و لیست سبد خرید رو نشون میده


let selectedColor = null;
let selectedSize = null;

let colorBoxes = document.querySelectorAll('.product_colors');
const sizeBoxes = document.querySelectorAll('.size_box');

colorBoxes.forEach(box => {
    box.addEventListener("click", () => {
        colorBoxes.forEach(b => b.classList.remove("selected"));
        box.classList.add("selected");

        selectedColor = box.dataset.color;


    });
});

// اینجا میایم روی کالر باکسز یه حلقه ی فور ایچ میزنم و داخلش  میگم روی هر باکس که کلیک شد  تو یه سری کار انجام بده.کارشم اینه که اول اون کلاس سلکتد رو از همشون برمیداره تا هیچ کدوم هیچ خطی زیرشون نباشه و بعد میگم فقط اونی که کلیک شده رو کلاس سلکتد رو بهش اضافه کن 
// باکس اسم متغیره

sizeBoxes.forEach(box => {
    box.addEventListener('click', () => {
        sizeBoxes.forEach(b => b.classList.remove('selected2'));
        box.classList.add('selected2');

        selectedSize = box.dataset.size;
    });
});


const plus = (t) => {

    const ch = t.parentNode.children;
    let count = ch[1].value

    if (count >= 10) {
        count = 10
    }

    else if (count < 0) {
        count = 0
    }

    else
        count++

    ch[1].value = count


}


// اگه شرط الس ایف رو کوپکتر مساوی صفر بذاریم  و بعد کانت مثلا صفر بشود و ما دوباره روی علامت مثبت کلیک کنیم مقدار افزایش پیدا نمیکند چون وارد تابع میشویم و شرط ایف اول برقرار نیست وارد الس ایف میشود و صفر کوچکتر مساوی صفر هست و شرط برقراره و دوباره کانت صفر میشه و دیگر افزایش نمی یابد

const mines = (t) => {

    const ch = t.parentNode.children;
    let count = ch[1].value

    if (count <= 0) {

        count = 0
    }


    else
        count--

    ch[1].value = count


}

// اگر اینجا ایف اول را کوچکتر از صفر بذاریم ومثلا کانت صفر بشود بار دوم که روی علامت تفریق کلیک شود و تابع اجرا بشود حالا کانت صفر است و شرط ایف برقرار نیست و وارد الس میشود و مقدار کانت میشود منفی یک و اگر دوباره کلیک کنیم و تابع اجرا شود  حالا منفی یک کوچکتر از صفر هست و شرط ایف برقرار است و  کانت دوباره صفر میشود

const add_to_basket = (t) => {

    const productCard = t.closest('.productCard');

    //  خط بالا یعنی از روی المانی که روی آن کلیک شده 
    // برو به سمت والدها تا اولین عنصری را پیدا کنی که کلاسش پروداکت کارد باشد

    const product_pic = productCard.querySelector('.product_pic').getAttribute('src');

    const product_name = productCard.querySelector('.product_name').innerText;

    const product_price = productCard.querySelector('.product_price').innerText;
    const productUrl = window.location.href;
    // این خط  بالا آدرس صفحه ای که توش هستیم رو میده

    const count = productCard.querySelector('.add_input').value;

    const temp = {
        product_pic: product_pic, product_name: product_name, product_price: product_price, url: productUrl,
        selectedColor: selectedColor,
        selectedSize: selectedSize, selectedcount: count
    }


    let b = false;


    for (let i = 0; i < arr_basket.length; i++) {
        if (arr_basket[i].product_name == product_name) {
            b = true;
            break;
        }
    }

    // 2. اگر محصول پیدا شد (b == true)
    if (b == true) {
        document.getElementById('demo').classList.remove('add_product_to_basket_notif');
        document.getElementById('demo').classList.remove('hide_notif');
        document.getElementById('demo').classList.add('error_exist_product_notif');
        document.getElementById('demo').innerHTML = "محصول در سبد خرید وجود دارد";
        setTimeout(() => {
            document.getElementById('demo').classList.add('hide_notif');
        }, 4000);

    }
    // 3. اگر محصول پیدا نشد (b == false)
    else {


        if (!selectedColor || !selectedSize) {
            alert('لطفا اطلاعات مورد نظر را کامل انتخاب کنید')
        }
        else {
            document.getElementById('demo').classList.remove('error_exist_product_notif');
            document.getElementById('demo').classList.remove('hide_notif');
            document.getElementById('demo').classList.add('add_product_to_basket_notif');
            document.getElementById('demo').innerHTML = "محصول به سبد خرید اضافه شد";
            setTimeout(() => {
                document.getElementById('demo').classList.add('hide_notif');
            }, 4000);

            arr_basket.push(temp); // محصول اضافه می‌شود

            localStorage.setItem('my_basket_data', JSON.stringify(arr_basket));

            // اینجا میگه کلید که مای بسکت دیتا هست رو مقدارش که ارر بسکت هست رو  توی لوکال استوریج ذخیره کن ولی آرایه ی ارر بسکت رو تبدیل به رشته متنی   کن چونکه مرورگر نمیتونه آرایه ذخیره کنه باید رشته متنی باشه


            render_basket();
            // اینجا تابع  رندر بسکت اجرا میشه تا لیست محصولات رو بنویسه و کاربر بدونه چی تو سبدش داره.
        }
    }


}



// ۲. تابع نمایش سبد خرید
const render_basket = () => {

    const emptyBox = document.getElementById('empty_shop_basket_pic_box');
    const emptyText = document.getElementById('empty_shop_basket_text');
    const productsItems = document.getElementById('products_list_items');

    // آپدیت تعداد در nav
    const countElements = [document.getElementById('count_delivery'), document.getElementById('count_delivery2')];
    countElements.forEach(el => {
        el.innerHTML = arr_basket.length;
    });


    if (arr_basket.length == 0) {
        // --- حالت خالی ---
        emptyBox.innerHTML = '<img src="pics/empty_shop_basket_pic.png">';
        emptyText.innerHTML = 'سبد خرید شما خالی است.';
        productsItems.innerHTML = '';

    } else {
        // --- حالت پر ---
        if (emptyBox) emptyBox.innerHTML = "";
        if (emptyText) emptyText.innerHTML = "";


        let html = `

    <div class="cart-header d-none  d-lg-flex">
  
        <span class="col-img">تصویر</span>
        <span class="col-name">نام محصول</span>
        <span class="col-price">قیمت</span>
        <span class="col-color">رنگ</span>
        <span class="col-size">سایز</span>
        <span class="col-qty">تعداد</span>
     
 
    </div>
    <div class="cart-items ">
    </div>
<div class="container "></div>

`;

        let summarylist = '';
        let finaltotal = 0
        arr_basket.forEach((item, index) => {

            const productLink = item.url
            const numericPrice = item.product_price.replace(/[^0-9]/g, ''); // حذف غیر عددی‌ها و تبدیل به عدد

            // اون صفر تا 9 یعنی کاراکترهایی رو که عدد نیستن با '  ' جایگزین کن.ینی در واقع با هیچی جایگزین کن ینی در واقع متغیر های غیر عددی رو برام حذف کن.اون حرف جی هم ینی گلوبال یعنی تضمین میکنه تمام کاراکترای غیر عددی با هیچی جایگزین شدن


            //  محاسبه مجموع برای هر آیتم

            const itemTotal = numericPrice * item.selectedcount;
            finaltotal += itemTotal


            summarylist += `
        <div class="d-flex justify-content-between  ">
            <span>${item.product_name} -
            <span class="fw-bold count_item">${item.selectedcount} تا</span></span>
            
            <span class="total_price_each_item"> ${itemTotal} تومان</span>
             
        </div>
        <hr>
        `

            html += `
    <!-- لیست محصولات -->


        <div class=" row align-items-center  d-none d-lg-flex">
            
            <!-- ستون تصویر -->
            <div class=" col-lg-2 text-center mb-2 ">
           <a href="${productLink}" title="برای مشاهده محصول کلیک کنید">
                <img src="${item.product_pic}" alt="${item.product_name}"  class="product_pic"></a>
            </div>

            <!-- ستون نام -->
            <div class=" col-lg-2 mb-2  ">
                <span class="product-name ">${item.product_name}</span>
            </div>

            <!-- ستون قیمت -->
            <div class=" col-lg-2 mb-2 ">
                <span class="product-price">${item.product_price}</span>
            </div>

            <!-- ستون رنگ (در موبایل مخفی یا کوچک) -->
            <div class=" col-lg-2 mb-2 ">
                <span class="product-color ">${item.selectedColor}</span>
              
            </div>

            <!-- ستون سایز -->
            <div class=" col-lg-1 mb-2 ">
                <span class="product-size">${item.selectedSize}</span>
             
            </div>

            <!-- ستون تعداد -->
            <div class=" col-lg-1 mb-2 ">
                <div class="btn-group add_box ">
                    <button class="btn btn-outline-secondary bg-success text-white" onclick="plus(this)"><i class="bi-plus"></i></button>
                    <input type="text" class="form-control add_input text-center" value="${item.selectedcount}">
                    <button class="btn btn-outline-secondary bg-danger text-white" onclick="mines(this)"><i class="bi bi-dash"></i></button>
                </div>
            </div>

 

    <i class="bi-trash trash_can_icon text-end d-lg-block" onclick="remove_from_basket(${index})"></i>


        </div>

<hr class="d-none d-lg-flex">

     



   

        <div class="row d-lg-none">

            <div class="col-4">
                  <a href="${productLink}" title="برای مشاهده محصول کلیک کنید">
                <img src="${item.product_pic}" alt="${item.product_name}"  class="product_pic"></a>

            </div>

            <div class="col-8">
                <span class="d-block ">
                ${item.product_name}
                   </span>
                <div class="justify-content-between d-flex mt-3"><span class="">قیمت :</span>
                    <span>${item.product_price}</span>
                </div>
                <hr class="bg-dark">
                <div class="justify-content-between d-flex "><span>رنگ :</span>
                <span>  ${item.selectedColor}  </span></div>
                 <hr class="bg-dark">
                   <div class="justify-content-between d-flex "><span>سایز :</span>
                <span>${item.selectedSize} </span></div>
                 <hr class="bg-dark">
              
                  
                       <div class="btn-group add_box "> <button class="btn btn-outline-secondary bg-success text-white" onclick="plus(this)"><i
                                class="bi-plus"></i></button>
                        <input type="text" class="form-control add_input text-center" value="${item.selectedcount}">
                        <button class="btn btn-outline-secondary bg-danger text-white" onclick="mines(this)"><i
                                class="bi bi-dash"></i></button></div>
                  
            </div>
       <i class="bi-trash trash_can_icon2 d-lg-none text-end " onclick="remove_from_basket(${index})"></i>
           
        </div>
  
       <hr class="d-lg-none">
  
            `;
        });


        html += `
   

  <div class="card mt-3 pb-4">
                                <div class="card-body">
                                 <div class=" d-flex justify-content-between">
        <span>نام محصول</span>
        <span> مجموع</span>
      
    </div>
      <hr>
                                    ${summarylist}
                                    <span class="d-block mt-3">مجموع سبد خرید  :${finaltotal} تومان</span>
                                    <button class="btn custom_btn mt-4 d-block m-auto">تایید و تکمیل سفارش</button>
                                </div>
                            </div>
`;


        productsItems.innerHTML = html;

    }
}

// ۳. تابع حذف محصول
const remove_from_basket = (index) => {


    // حذف از آرایه اصلی
    arr_basket.splice(index, 1);

    // ذخیره در حافظه
    localStorage.setItem('my_basket_data', JSON.stringify(arr_basket));


    // نمایش مجدد
    render_basket();
}

// اجرای تابع هنگام لود شدن صفحه
window.onload = render_basket;



// ===========توضیح برای خودم ===============

// این خطوط باعث میشن تعداد سبد خرید در هر صفحه آپدیت باشه

// و ما میایم محتویات ویندو که تو لوکال استوریج ذخیره شده رو میریزیم توی بسکت دیتا تا توی این فایل باهاش کار کنیم و با خط زیر
//  const countElements = [document.getElementById('count_delivery'), document.getElementById('count_delivery2')];
// countElements.forEach(el => {
//     el.innerHTML = basketData.length;
// });
// و میگه طول آرایه رو  مقدارشو بذار توی اینر اچ تی ام ال اون آیدی های کانت دلیوری و بعد مقدار آپدیت میشه و در ضمن اون آیدی های کانت دلیوری باید وجود داشته باشن در صفحه اچ تی ام ال و
// window.onload = render_basket;   و در نهایت این خط میگه صفحه که لود شد تابع رندر بسکت رو اجرا کن و اینم باعث میشه تعداد سبد خرید آپدیت بشن.

