function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    let usuario = {};
    var isChecked = document.getElementById("recordar").checked;

    if (isChecked) {//Recuerda el usuario
        
            
            usuario.nombre = profile.getName();
            usuario.estado = "conectado";
            usuario.conGoogle = true;
           
            localStorage.setItem("usuario", JSON.stringify(usuario));
            location.href ="index.html";
        }
      else{//No recuerda el usuario
            
            usuario.nombre = profile.getName();
            usuario.estado = "conectado";
            usuario.conGoogle = true;
            sessionStorage.setItem("usuario", JSON.stringify(usuario));
            location.href ="index.html";

        }
        
  }