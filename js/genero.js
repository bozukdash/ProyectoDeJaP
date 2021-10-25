function obtener(letra){
    let genero ="";
    if(letra==="A"){
       genero ="femenino";
       localStorage.setItem("genero", JSON.stringify(genero));
       location.href ="my-profile.html"; 
    }

    else{
        genero ="masculino";
        localStorage.setItem("genero", JSON.stringify(genero));
        location.href ="my-profile.html";
    }
    
}