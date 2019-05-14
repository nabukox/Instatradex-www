$('#bootstrap-touch-slider').bsTouchSlider();
const options = {
    speed: 100,
    cursor: false,
    startDelay: 50,
};
let h1TypeInstances = new TypeIt('h1.typeIt', options);
let pTypeInstances = new TypeIt('p.typeIt', options);

h1TypeInstances.go();
pTypeInstances.go();
$('#bootstrap-touch-slider').on('slide.bs.carousel', function () {
    h1TypeInstances.reset().freeze();
    pTypeInstances.reset().freeze();

    setTimeout(() => {
        h1TypeInstances.unfreeze();
        pTypeInstances.unfreeze();

    }, 900);
});