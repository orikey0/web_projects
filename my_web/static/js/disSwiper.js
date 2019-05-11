var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    // loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
} );
function sliderTo(index, speed = 1000, runCallBacks = false) {
    mySwiper.slideTo(index, speed, runCallBacks);
    console.log("sliderTO work!");
}