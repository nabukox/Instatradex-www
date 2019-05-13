function getBootstrapDeviceSize() {
    return $('#users-device-size').find('div:visible').first().attr('id');
}
console.log(getBootstrapDeviceSize());
$('#bootstrap-touch-slider').bsTouchSlider();
const options = {
    speed: 100,
    cursor: false,
    startDelay: 50,
};
let h1TypeInstances = new TypeIt('h1', options);
let pTypeInstances = new TypeIt('p', options);
let titleInstace = new TypeIt('#element',{
    strings: ['Welcome to the Sliders'],
    speed: 100,
    cursor: false,
    breakLines: false,
});
titleInstace.go();
h1TypeInstances.go();
pTypeInstances.go();
$('#bootstrap-touch-slider').on('slide.bs.carousel', function () {
    h1TypeInstances.reset().freeze();
    pTypeInstances.reset().freeze();
    titleInstace.reset().freeze();
    setTimeout(() => {
        h1TypeInstances.unfreeze();
        pTypeInstances.unfreeze();
        titleInstace.unfreeze();

    }, 900);
});