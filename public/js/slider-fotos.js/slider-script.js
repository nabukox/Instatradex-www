// $('#bootstrap-touch-slider').bsTouchSlider();
const options = {
    speed: 50,
    cursor: false,
    startDelay: 20,
};
let Instances = new TypeIt('.TypeIt', options);
Instances.go();
// let h1TypeInstances = new TypeIt('h1.typeIt', options);
// let pTypeInstances = new TypeIt('p.typeIt', options);

// h1TypeInstances.go();
// pTypeInstances.go();

// $('#bootstrap-touch-slider').on('slide.bs.carousel', function () {
//     h1TypeInstances.reset().freeze();
//     pTypeInstances.reset().freeze();
//
//     setTimeout(() => {
//         h1TypeInstances.unfreeze();
//         pTypeInstances.unfreeze();
//
//     }, 900);
// });


// On before slide change
$('.start-screen__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    Instances.reset().freeze();
    setTimeout(() => {
        Instances.unfreeze();
    }, 100);
});

$('.start-screen__slider').on('swipe', function(event, slick, direction){
    Instances.reset().freeze();
    setTimeout(() => {
        Instances.unfreeze();
    }, 100);
});