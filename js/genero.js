function obtener(letra){
    let genero ="";
    if(letra==="A"){
       genero ="femenino";
       sessionStorage.setItem("genero", JSON.stringify(genero));
       location.href ="my-profile.html"; 
    }

    else{
        genero ="masculino";
        sessionStorage.setItem("genero", JSON.stringify(genero));
        location.href ="my-profile.html";
    }
    
}