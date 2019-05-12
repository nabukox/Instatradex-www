let lienzo;
let ctx;
//colores
let gris        = "#F2F2F2";
let cuaternary  = "#00A99D";
let terciary    = "#2E3192";
let secondary   = "#29ABE2";
let primary     = "#7051D3";

window.onload=function(){
    lienzo=document.querySelector("#circulos");
    ctx=lienzo.getContext("2d");
        
    cx=750/2;
    cy=750/2;
    r= 552/2;
    ai=0;
    af=Math.PI*2;

    //circulos estan organizados de afuera hacia dentro
    //circulo 1
    ctx.beginPath();
    ctx.arc(cx,cy,r,ai,af,false);
    ctx.lineWidth=5;
    ctx.strokeStyle=gris;
    ctx.stroke();
    //-----------------------------------

    //circulo linea azul
     ai4=(Math.PI / 180) * -80;
     af4=(Math.PI / 180) * 180;
    

    ctx.beginPath();
    ctx.arc(cx,cy,r,ai4,af4,true);
    ctx.lineWidth=70;
    ctx.strokeStyle = terciary;
    ctx.lineCap="round";
    ctx.stroke();
    //-----------------------------------

    //circulo 2
    r2= 422/2;							

    ctx.beginPath();
    ctx.arc(cx,cy,r2,ai,af,false);
    ctx.lineWidth=5;
    ctx.strokeStyle = gris;
    ctx.stroke();
    //-----------------------------------

    //circulo linea cuaternary							
    ai3=(Math.PI / 180) * 180;
    af3=(Math.PI / 180) * 80;
    

    ctx.beginPath();
    ctx.arc(cx,cy,r2,ai3,af3,true);
    ctx.lineWidth=55;
    ctx.strokeStyle=cuaternary;
    ctx.lineCap="round";
    ctx.stroke();
    //-----------------------------------
    
    //circulo "M" MINING
    //circulo primary
    cxM=145;
    cyM=750/2;
    rM= 194/2;
    aiM=0;
    afM=Math.PI*2;

    ctx.beginPath();
    ctx.arc(cxM,cyM,rM,aiM,afM,false);
    ctx.fillStyle=primary;
    ctx.fill();
    //--------------------------------------

    //circulo "C" CUSTOMER circulo
    //circulo AZUL GRANDE 
    cxC=(750/2)+(552/2);
    cyC=750/2;
    rC= 138/2;
    aiC=0;
    afC=Math.PI*2;

    ctx.beginPath();
    ctx.arc(cxC,cyC,rC,aiC,afC,false);
    ctx.fillStyle= secondary;
    ctx.fill();
    //-----------------------------------
       

    //-------------------------------------

    //circulo "C1" MINING
    //circulo primary
    cxC1=(750/2)+(422/2);
    cyC1=750/2 ;
    rC1= 113/2;
    aiC1=0;
    afC1=Math.PI*2;

    ctx.beginPath();
    ctx.arc(cxC1,cyC1,rC1,aiC1,afC1,false);
    ctx.fillStyle= secondary;
    ctx.fill();
    //-----------------------------------

     //MINING TEXT
    //  ctx.font = "italic small-caps bold 12px Catamaran";
    //  ctx.fillStyle = "#FFF";
    //  ctx.textAlign = "center";

    //  ctx.fillText(Mining,cxC,cyC,"77px");
     //-----------------------------------
     
    
    //IMAGEN boton     
    
    let fondo ={
        url: "../img/circleOfProfits-assets_/boton.svg",
        cargaOK: false
    }
    let btnX ={
        url: "../img/circleOfProfits-assets_/x.svg",
        cargaOK: false
    }
    
    fondo.objeto = new Image();
    fondo.objeto.src = fondo.url;
    fondo.objeto.addEventListener("load" , cargarfondo);
    
    btnX.objeto = new Image();
    btnX.objeto.src = btnX.url;
    btnX.objeto.addEventListener("load" , cargarbtnX);




   function cargarfondo() {
    fondo.cargaOK    = true;
    dibujar()
   }

   function cargarbtnX() {
    btnX.cargaOK        = true;
    dibujar()
   }

   function cargartforex(){
    tforex.cargaOK    = true;
    dibujar()
   }
    
  
    //---------------------
    function dibujar() {
        if(fondo.cargaOK) {
            ctx.drawImage(fondo.objeto, (cx/2)-5 , (cy/2)-16 );
        }

        if(btnX.cargaOK) {
            ctx.drawImage(btnX.objeto, cx-(30/2) , cy-(60/2) );
        }
    }  
    //-----------texto--------------------  

    function texto(){
        ctx.font = "22px Arial";
        ctx.fillStyle="white";
        ctx.fillText("Crypto Trading", cx/2+(110), 110); 
    }

    setTimeout(function(){ 
        texto()
     }, 100);
   
    //-------------------------------     
    
    
     //----------------funcion girar azul
     //llamamos el evento de cada uno de ellos
     lienzo.addEventListener("mouseover", hover , false);
     lienzo.addEventListener("mouseout", hoverOut , false);
     //--------------------------------

     //hover function
     function hover(e){
        let lienzo=document.querySelector("#circulos");
        let ctx=lienzo.getContext("2d");
        
        ai4=(Math.PI / 180) * 0;
        af4=(Math.PI / 180) * -60;

        ctx.beginPath();
        ctx.arc(cx,cy,r,ai4,af4,true);
        ctx.lineWidth=70;
        ctx.strokeStyle = terciary;
        ctx.lineCap="round";
        ctx.stroke();
    }

}