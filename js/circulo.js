var posicionScroll = 0;
const $cmorado = document.getElementById('cmorado');
const $cverde = document.getElementById('cverde');
const $gris2 = document.getElementById('gris2');
const $gris1 = document.getElementById('gris1');
const $esmeralda = document.getElementById('esmeralda');
const $azul = document.getElementById('azul');
const $crypto = document.getElementById('ganancias-crypto');
const $forex = document.getElementById('ganancias-forex');	


window.addEventListener('scroll', (event) => {
    // console.log(document.body.scrollTop);
    // console.log(document.documentElement.scrollTop);
    if (document.body.scrollTop > 1700 || document.documentElement.scrollTop > 1700) {
        
        $cmorado.classList.add('cmorado-animado');
        $cverde.classList.add('cverde-animado');
        $gris2.classList.add('gris2-animado');
        $gris1.classList.add('gris1-animado');
        $esmeralda.classList.add('esmeralda-animado');
        $azul.classList.add('azul-animado');
        $crypto.classList.add('ganancias-crypto-animado');
        $forex.classList.add('ganancias-forex-animado');

    }

    if (document.body.scrollTop > 0 || document.documentElement.scrollTop  < 0 && document.body.scrollTop < 720 || document.documentElement.scrollTop  < 720)  {
        $cmorado.classList.remove('cmorado-animado' , 'cmorado-hover');
        $cverde.classList.remove('cverde-animado');
        $gris2.classList.remove('gris2-animado');
        $gris1.classList.remove('gris1-animado');
        $esmeralda.classList.remove('esmeralda-animado' , 'esmeralda-hover' , 'esmeralda-fin');
        $azul.classList.remove('azul-animado' , 'azul-hover' , 'azul-fin');
        $crypto.classList.remove('ganancias-crypto-animado');
        $forex.classList.remove('ganancias-forex-animado');
    }
    
    
    
    
    
    
});


//seccion hover cuadro mining--------------
$cmorado.addEventListener('mouseover', (event) => {
    $cmorado.classList.add('cmorado-hover');
    
    $azul.classList.add('azul-hover'); 
    $esmeralda.classList.add('esmeralda-hover'); 
    
});

$cmorado.addEventListener('mouseout', (event) => {
    $cmorado.classList.remove('cmorado-hover' , 'cmorado-animado'); 
    $cmorado.classList.add('cmorado-fin');
    
    $azul.classList.remove('azul-hover' , 'azul-animado'); 
    $azul.classList.add('azul-fin'); 

    $esmeralda.classList.remove('esmeralda-hover' , 'esmeralda-animado'); 
    $esmeralda.classList.add('esmeralda-fin'); 


});

//---azul

