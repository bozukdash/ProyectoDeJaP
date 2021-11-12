





  if(pais === "Selecciona tu país:"){
    document.getElementById("paises").className ="form-control invalida"
  }
  else{
    document.getElementById("paises").className ="form-control valida"
    
  }
  if(tC){
    let targetaC = document.getElementById("NumT").value.trim();
    let fecha = document.getElementById("FechaV").value.trim();
    let codigo = document.getElementById("CodS").value.trim();

    if(targetaC === "" || fecha === "" || codigo === ""){
      document.getElementById("comprasTarjeta").className ="btn btn-dark invalida"
    pasaCompras = false;
    }
    else{
    document.getElementById("comprasTarjeta").className ="btn btn-dark valida"
    
    }
    
  }
  
  if(tB){
    let tarjetaB = document.getElementById("NumC").value.trim();
    if(tarjetaB === ""){
      document.getElementById("comprasTarjeta").className ="btn btn-dark invalida"
    pasaCompras = false;
    }
    else{
    document.getElementById("comprasTarjeta").className ="btn btn-dark valida"
    
    }
  }

  if (pasaCompras){
    swal({
      title: "Muchas gracias por comprar en este lugar!!",
      text: "Tu compra ha sido realizada con exito",
      icon: 'https://img.wattpad.com/ace776a765e5b5b1202e511a73b19bbabee729ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f455f497346586c6a726c435845513d3d2d3632303138303736372e313534633162393330646131376237633631393030373933353737362e676966'
    });
  }
  else{
    swal({
      title: "Parece que te faltaron completar campos",
      text: "Completa los que estan marcados en rojo para finalizar la compra",
      icon: 'https://i.pinimg.com/originals/59/b9/74/59b9740822441ef2689c7f2676d6755b.gif'
    });
  }

  var combo = document.getElementById("paises");
  var pais = combo.options[combo.selectedIndex].text;