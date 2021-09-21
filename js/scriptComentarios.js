let arregloComentarios = [];

function campoComentarios(){
    let dato = document.getElementById("mensaje");
    let estrellas = 0;

    let comentarAutos = {};

    var est1 = document.getElementById("star1").checked;
    var est2 = document.getElementById("star2").checked;
    var est3 = document.getElementById("star3").checked;
    var est4 = document.getElementById("star4").checked;
    var est5 = document.getElementById("star5").checked;

    var ahora = new Date();
    var mes = ahora.getMonth() + 1;
    var dia = ahora.getDate();

    if(dia < 10){
      dia= "0" + dia;
    }

    if (mes < 10){
      mes= "0" + mes;
    }
    var fecha = ahora.getFullYear() + '-' + mes + '-' + dia;
    var hora = ahora.getHours() + ':' + ahora.getMinutes() + ':' + ahora.getSeconds();
    var fechaHora = fecha + '  ' + hora; 

    switch(true){
        case est1: estrellas=1;
                    break;
        case est2: estrellas=2;
                    break;
        case est3: estrellas=3;
                    break;
        case est4: estrellas=4;
                    break;
        case est5: estrellas=5;
                    break;
        default:    estrellas=0;
                    break;
            
    }
    
    if (dato.value.trim() === "") {
        //alert("Hay campos vacios porfavor completalos para seguir");
        swal({
         title: "Campos vacios!",
         text: "Intentalo denuevo",
         icon: "error",
         button: "Volver a Intentar",
       });
         } 
    else {
        
        arregloComentarios = JSON.parse(localStorage.getItem("cuentanos"));
        if(arregloComentarios === null){
            arregloComentarios = [];
        }

        comentarAutos.dateTime = fechaHora;
        comentarAutos.description =  organizarTexto(dato.value);
        comentarAutos.score = estrellas;
        comentarAutos.user = pedirNombre();

        arregloComentarios.push(comentarAutos);

        localStorage.setItem("cuentanos", JSON.stringify(arregloComentarios));
        location.href ="product-info.html";
         }
    }


document.addEventListener("DOMContentLoaded", function(e){
    let userNo = JSON.parse(localStorage.getItem("usuario"));
  let userPermanece = JSON.parse(sessionStorage.getItem("usuario"));
  if (userNo === null && userPermanece ===null) {
    location.href = "login.html";
  }
  else if(userNo === null){
    document.getElementById("nombreUsuarioC").innerHTML += userPermanece.nombre;
     }
     else{
        document.getElementById("nombreUsuarioC").innerHTML += userNo.nombre;
     }
});


function pedirNombre(){
    let userNo = JSON.parse(localStorage.getItem("usuario"));
    let userPermanece = JSON.parse(sessionStorage.getItem("usuario"));
    let autor ="";
    if (userNo === null && userPermanece ===null){}
    else if(userNo === null){
    autor = userPermanece.nombre;
     }
     else{
        autor = userNo.nombre;
     }

     return autor;
}

function organizarTexto(texto){
  let charla ="";
  for(let i=0; i<texto.length ; i+=72){

    charla += texto.slice(i, i+72)
    charla +="<br>"

  }
  return charla;
}
