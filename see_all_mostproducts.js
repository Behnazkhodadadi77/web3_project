const products = [
    {
        name: "جکت monco",
        code: 251,
        price: "1,998,000",
        carouselId: "jacket_monco_car",
        images: [
            "pics/jacket_monco1.png",
            "pics/jacket_monco2.png",
            "pics/jacket_monco3.png",
            "pics/jacket_monco_blue.png",
            "pics/jacket_monco_blue2.png",
            "pics/jacket_monco_milky.png",
            "pics/jacket_monco_nescafe.png"
        ],
        colors: [
            { class: "color_blue", slide: 3 },
            { class: "color_shiri", slide: 5 },
            { class: "color_nescafe", slide: 6 }
        ]
    }
    ,

    {
        name: "شومیز آنا ",
        code: 464,
        price: "1,398,000",
        carouselId: "ana_shomiz_car",
        images: [
            "pics/ana1.png",
            "pics/ana2.png",
            "pics/ana_blue.png",
            "pics/ana_pink.png",
            "pics/ana_shiri.png"

        ],
        colors: [
            { class: "color_blue", slide: 2 },
            { class: "color_pink", slide: 3 },
            { class: "color_shiri", slide: 4 }
        ]
    },
     {
        name: " بامبر کایلی ",
        code: 376,
        price: "1,998,000",
        carouselId: "kylie_car",
        images: [
            "pics/kaylie_white.png",
            "pics/kaylie_black.png",
            "pics/kaylie_surati.png",
            "pics/kaylie_blue.png"
            

        ],
        colors: [
            { class: "color_white", slide: 0 },
            { class: "color_black", slide: 1},
            { class: "color_pink", slide: 2 },
            { class: "color_blue", slide: 3 }
        ]
    },
     {
        name: " جکت کانر ",
        code: 289,
        price: "3,298,000",
        carouselId: "coner_car",
        images: [
            "pics/coner1.png",
            "pics/coner2.png",
            "pics/coner_white.png",
            "pics/coner_brown.png",
            "pics/coner_black.png"
            

        ],
        colors: [
            { class: "color_white", slide: 2 },
            { class: "color_black", slide: 4},
            { class: "color_brown", slide: 3 }
            
        ]
    },
    {
        name: " جکت بورفو ",
        code: 282,
        price: "3,298,000",
        carouselId: "borfo_car",
        images: [
            "pics/jacket_Borfo1.png",
            "pics/Borfo_brown.png",
            "pics/Borfo_nescafe.png"
            
        
        ],
        colors: [
          
            { class: "color_brown", slide: 1 },
            { class: "color_nescafe", slide: 2 },
            
        ]
    },
     {
        name: " جکت ولگا ",
        code: 273,
        price: "3,298,000",
        carouselId: "volga_car",
        images: [
            "pics/jacket_volga1.png",
            "pics/jacket_volga_white.png",
            "pics/jacket_volga_blue.png"
            
            

        ],
        colors: [
          
            { class: "color_white", slide: 1 },
            { class: "color_blue", slide: 2 },
            
        ]
    }
];

const see_all_mostselled_products = () => {
    const productsBox = document.getElementById("all_mostselled_products");



    productsBox.innerHTML = products.map(product => `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card productCard">
        <div id="${product.carouselId}" class="carousel slide position-relative ">
          <div class="carousel-inner">
            ${product.images.map((img, index) => `
              <div class="carousel-item ${index == 0 ? "active" : ""}">
                <img src="${img}" class="card-img-top">
              </div>
            `).join("")}
          </div>
           <button class="product_pic_show_prev carousel-control-prev product_pic_show_btn"
                                type="button" data-bs-target="#${product.carouselId}" data-bs-slide="prev">
                                <i class="bi bi-chevron-right"></i>
                            </button>

                            <button class="product_pic_show_next carousel-control-next product_pic_show_btn"
                                type="button" data-bs-target="#${product.carouselId}" data-bs-slide="next">
                                <i class="bi bi-chevron-left"></i>
                            </button>
        </div>

        <div class="card-body">
          <h5 class="text-center fw-bold mt-3">${product.name}</h5>
          <h5 class="text-center fw-bold mt-3">کد ${product.code}</h5>

          <div class="product_colors_box d-flex justify-content-center mt-3">
            ${product.colors.map(color => `
              <div
                class="product_colors ${color.class} rounded-5 me-2"
                data-bs-slide-to="${color.slide}"
                data-bs-target="#${product.carouselId}">
              </div>
            `).join("")}
          </div>

          <span class=" d-block text-center fw-bold fs-5 mt-3 product_price">${product.price} تومان</span>

          <a href="#" class="btn custom_btn mt-3 d-block m-auto">
                                جزئیات بیشتر
                            </a>
        </div>
      </div>
    </div>
  `).join("");
};

document.addEventListener("DOMContentLoaded", see_all_mostselled_products);
