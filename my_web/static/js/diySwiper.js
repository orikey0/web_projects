var mySwiper = new Swiper('.swiper-container', {
    /*启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。*/
    observer: true,
    /*将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。*/
    observeParents: true,
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
});
function sliderTo(index, speed = 1000, runCallBacks = false) {
    mySwiper.slideTo(index, speed, runCallBacks);
    console.log("sliderTO work!");
}