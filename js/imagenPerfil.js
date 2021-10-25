function readURL(input) {
      if (input.files && input.files[0]) {
        
        var reader = new FileReader();

        reader.addEventListener("load", () => {
            localStorage.setItem("imagenP", reader.result);
        });

        reader.onload = function (e) {
          $('#fotoPerfil')
            .attr('src', e.target.result)
            .width(100)
            .height(100);
        };
        
        reader.readAsDataURL(input.files[0]);
      }
    
}
