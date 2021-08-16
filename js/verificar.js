let usuario = {};
function verificarDatos() {
  let dato = document.getElementById("nombreUser");
  let dato2 = document.getElementById("contra");
  usuario = {};
  var isChecked = document.getElementById("recordar").checked;

  if (isChecked) {//Recuerda el usuario
    if (dato.value.trim() === "" || dato2.value.trim() === "") {
     alert("Hay campos vacios porfavor completalos para seguir");
      } else {
        
        document.getElementById("feed").innerHTML ="login exitoso /n Rediriguiendo...";
        
        usuario.nombre = dato.value;
        usuario.estado = "conectado";
       
        localStorage.setItem("usuario", JSON.stringify(usuario));
        location.href ="index.html";
    
        
        
      }
    }
  else{//No recuerda el usuario
    if (dato.value.trim() === "" || dato2.value.trim() === "") {
        alert("Hay campos vacios porfavor completalos para seguir");
      } else {
        nombreUsuario = dato.value;
        document.getElementById("feed").innerHTML ="login exitoso /n Rediriguiendo...";
        
        usuario.nombre = dato.value;
        usuario.estado = "conectado";
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        location.href ="index.html";
    
        
      }
    }
    
  }
  
  
function desconectar() {
  localStorage.clear();
  sessionStorage.clear();
  location.href = "login.html";
}

function cargarDatos() {
  let userNo = JSON.parse(localStorage.getItem("usuario"));
  let userPermanece = JSON.parse(sessionStorage.getItem("usuario"));
  if (userNo === null && userPermanece ===null) {
    location.href = "login.html";
  }
  else if(userNo === null){
    document.getElementById("userLogeado").innerHTML = userPermanece.nombre;
     }
     else{
        document.getElementById("userLogeado").innerHTML = userNo.nombre;
     }
  }
