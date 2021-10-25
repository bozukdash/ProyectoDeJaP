var usuario ="";
var datosU  = {};
datosU.nombre = "";
datosU.apellido = "";
datosU.edad = "";
datosU.email = "";
datosU.cel = "";


document.addEventListener("DOMContentLoaded", function (e) {
    let genero = JSON.parse(localStorage.getItem("genero"));
    if (genero === null) {
        location.href = "genero.html";
    }

    let perfil = JSON.parse(localStorage.getItem("datosPerfil"));
    if (perfil !== null) {
        datosU = perfil;
    }

    let imgenGuardada = localStorage.getItem("imagenP");
    if (imgenGuardada) {
        document.querySelector("#fotoPerfil").setAttribute("src", imgenGuardada);
    }

    cargarUsuario();

    if(genero ==="femenino"){
        document.getElementById("perfil").style.backgroundImage = "url(https://i.ibb.co/RQ7Nx2r/women.png)"
   }
    else{
        document.getElementById("perfil").style.backgroundImage = "url(https://i.ibb.co/cNGFZB9/men.png)"
  }
    let infoPerfil=`
    <h2 id="tituloPerfil">Este es el perfil del usuario:<em>`+usuario+`</em></h2>
    <button id="editar" type="button" class="btn btn-outline-success" onclick="modoEditarON();">Editar Perfil</button>
    <div class="datos">
        <label class="TextoA">Nombre:</label>
        <input value ="`+datosU.nombre +`" id="name" type="text" class="form-control bg-dark text-white" aria-describedby="emailHelp" placeholder="">
    </div>
    <div class="datos">
         <label class="TextoA">Apellido:</label>
         <input value ="`+datosU.apellido +`" id="otroname" type="text" class="form-control bg-dark text-white" aria-describedby="emailHelp" placeholder="">
    </div>
    <div class="datos">
         <label class="TextoA">Edad:</label>
            <input value ="`+ datosU.edad +`" id="edad" type="number" min=0 class="form-control bg-dark text-white" aria-describedby="emailHelp" placeholder="">
    </div>
    <div class="datos parteA">
        <label class="TextoA derecha">Correo electronico:</label>
        <input value ="`+datosU.email +`" id="email" type="email" class="form-control derecha bg-dark text-white" aria-describedby="emailHelp" placeholder="">
    </div>
    <div class="datos parte">
        <label class="TextoA derecha">Telefono:</label>
        <input value ="`+datosU.cel +`" id="cel" type="number" class="form-control derecha bg-dark text-white"aria-describedby="emailHelp" placeholder="">
    </div>
   <br><br><br><br><br><br>
   <div id="botonesE">
    <button onclick="guardarDatos('x');" id="mal" type="button" class="btn btn-danger btn-circle btn-lg" data-toggle="tooltip" data-html="true" title="Cancelar"><i class="fa fa-times"></i></button>
    <button onclick="guardarDatos('b');" id="bien" type="button" class="btn btn-success btn-circle btn-xl"data-toggle="tooltip" data-html="true" title="Actualizar"><i class="far fa-check-circle 3x"></i></button>
   </div>
   <br><br><br>
    `;

    document.getElementById("info-persona").innerHTML =infoPerfil;
    document.getElementById("name").disabled = true;
    document.getElementById("otroname").disabled = true;
    document.getElementById("edad").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("cel").disabled = true;
    document.getElementById("editar").style.display = "block";
    document.getElementById("mal").style.display = "none";
    document.getElementById("bien").style.display = "none";

});


function cargarUsuario() {
    let userNo = JSON.parse(localStorage.getItem("usuario"));
    let userPermanece = JSON.parse(sessionStorage.getItem("usuario"));
    if (userNo === null && userPermanece ===null) {
      location.href = "login.html";
    }
    else if(userNo === null){
      usuario = userPermanece.nombre;
      localStorage.setItem("usuario", JSON.stringify(userPermanece));
       }
       else{
          usuario = userNo.nombre;
       }
    }

function modoEditarON(){//habilita el modo edición del perfil
    document.getElementById("editar").style.display = "none";
    document.getElementById("bien").style.display = "block";
    document.getElementById("mal").style.display = "block";

    document.getElementById("name").disabled = false;
    document.getElementById("otroname").disabled = false;
    document.getElementById("edad").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("cel").disabled = false;
    document.getElementById("myaudio").src = "music/editar.mp3";
}


function guardarDatos(opcion){//guarda los datos en session
    if(opcion === "x"){
        location.href = "my-profile.html"
    }

    else{
        datosU.nombre = document.getElementById("name").value;
        datosU.apellido = document.getElementById("otroname").value;
        datosU.edad = document.getElementById("edad").value;
        datosU.email = document.getElementById("email").value;
        datosU.cel = document.getElementById("cel").value;

        localStorage.setItem("datosPerfil", JSON.stringify(datosU));
        location.href = "my-profile.html"
      
    }
}