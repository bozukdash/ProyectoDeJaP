var compras = [];
let total = 0;
var paises = [];
let precioEnvio = 0;
let tC= true;
let tB= true;
let pasaCompras = true;
let validoEmail=false;
let autoExtra ="";




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARRITO_PRO).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          compras = resultObj.data;
          if(localStorage.getItem("estaCompra")){
            autoExtra=JSON.parse(localStorage.getItem("estaCompra"));
            compras.articles[2]=autoExtra;
            
          }
          
          

          //pasar todo a dolar del comienzo
          for(let l=0; l<compras.articles.length; l++){
            if(compras.articles[l].currency !=="USD"){
                compras.articles[l].unitCost /=40;
                compras.articles[l].currency = "USD";
            }
          cargarCarrito()
          precioEnvio = total * 0.05;
          document.getElementById("productCostText").innerHTML = compras.articles[0].currency+"   "+ precioEnvio;
          document.getElementById("totalCompras").innerHTML = "   "+compras.articles[0].currency+" "+ parseFloat(total + precioEnvio);
     
        }
        
      }
    }); 

    getJSONData(PAISES).then(function(resultObj){
      if (resultObj.status === "ok")
      {
         paises = resultObj.data;
         let paisesArray="";
         for(let ñ=0;ñ<paises.countries.length;ñ++){
            paisesArray += `<option value="`+ ñ +`">`+ paises.countries[ñ].name_es +`</option>`;
         }

         document.getElementById("paises").innerHTML += paisesArray;
 
      }

      //subtotal
      
      document.getElementById("comboEnvios").addEventListener("click", function(){
        var envio1 = document.getElementById("envio1").checked;
        var envio2 = document.getElementById("envio2").checked;
        var envio3 = document.getElementById("envio3").checked;
        if(envio1){
          precioEnvio = total * 0.15;
        }
        else if(envio2){
          precioEnvio = parseFloat((total * 0.07).toFixed(2));
        }
        else{
          precioEnvio = total * 0.05;
        }

        document.getElementById("productCostText").innerHTML = compras.articles[0].currency+"   "+ precioEnvio;
        document.getElementById("totalCompras").innerHTML = "   "+compras.articles[0].currency+" "+ parseFloat(total + precioEnvio);
    });
      
    }); 


    document.getElementById("moneda").addEventListener("change", function(){
        let moneda = document.getElementById("moneda").value;
        if(moneda === "UYU"){//pasar a pesos uruguayos
            for(let j=0; j<compras.articles.length; j++){
                if(compras.articles[j].currency !=="UYU"){
                    compras.articles[j].unitCost *=40;
                    compras.articles[j].currency = "UYU";
                }
                
            }
        }

        else{
            for(let k=0; k<compras.articles.length; k++){
                if(compras.articles[k].currency !=="USD"){
                    compras.articles[k].unitCost /=40;
                    compras.articles[k].currency = "USD";
                }
                
            }
    }
     cargarCarrito();
    });

  
  
  });


function cargarCarrito(){

    if(compras.articles.length !== 0)
    {llenarCarrito =`<table id="carrito_tabla" class="table table-striped table-dark">
    <thead>
      <tr>
        <th scope="col">Producto</th>
        <th scope="col">Nombre</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Costo por unidad</th>
        <th scope="col">Subtotal</th>
        <th>#</th>
      </tr>
    </thead>
    <tbody>`;
    total =0;
    for(let i=0; i<compras.articles.length; i++){
        total += parseFloat(compras.articles[i].unitCost)*compras.articles[i].count;
       
        llenarCarrito +=`
        <tr id="dot`+ i +`">
        <th scope="row"><img src="`+ compras.articles[i].src +`" alt="" class="img-thumbnail"></th>
        <td>`+ compras.articles[i].name +`</td>
        <td><input type="number" id="tentacles`+ i +`" name="tentacles" onchange="actualizarPrecio(`+ i +`);" value=`+ compras.articles[i].count +`
        min="1"></td>
        <td>`+compras.articles[i].currency+ "  " + compras.articles[i].unitCost +`</td>
        <td id="prod`+ i +`">`+compras.articles[i].currency+ "  " + parseFloat(compras.articles[i].unitCost)*compras.articles[i].count +`</td>
        <td><button  onclick="eliminarLista(`+ i +`);" type="button" class="btn btn-secondary" data-toggle="tooltip" data-html="true" title="Borrar el producto">
        <img id="eliminar"src="img/borrar.gif" alt="" class="img-thumbnail">
        </button></td>
        </tr>`;

    }
      
    llenarCarrito +=`
    </tbody>
  </table>`;}

  document.getElementById("info-carrito").innerHTML = llenarCarrito;

  let finalCompras =`
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed fin">
                  <div>
                    <h6 class="my-0">Precio de Envio</h6>
                    <small class="text-muted">En base a la compra</small>
                  </div>
                  <span class="text-muted" id="productCostText">-</span>
                </li>
                <li class="list-group-item d-flex justify-content-between bg-dark fin">
                  <span class="">Total($):   </span>
                  <strong id="totalCompras">    `+"   "+compras.articles[0].currency+" "+ parseFloat(total + precioEnvio) +`</strong>
                </li>
            </ul>`;

document.getElementById("info-Final").innerHTML = finalCompras;
document.getElementById("tarjetaCredito").style.display = "none";
document.getElementById("targetaB").style.display = "none";
}

function actualizarPrecio(pos){
    let modificado ="prod" + pos;
    let combo ="tentacles" + pos;
    let cant = parseInt(document.getElementById(combo).value);
    compras.articles[pos].count = document.getElementById(combo).value;
    document.getElementById(modificado).innerHTML =compras.articles[pos].currency +"  "  + cant * parseFloat(compras.articles[pos].unitCost)
    let nuevoP =0;
    for(let n=0; n<compras.articles.length; n++){
        let id = "tentacles" + n;
        let porq = parseInt(document.getElementById(id).value);
        nuevoP+= porq * parseFloat(compras.articles[n].unitCost) 
    }
    document.getElementById("totalCompras").innerHTML = compras.articles[pos].currency +"  "+ nuevoP;
}

function eliminarLista(pos){
    compras.articles.splice(pos, 1);
    if(compras.articles.length === 0){
      document.getElementById("info-carrito").innerHTML =`<img id="nohaynada" src="img/Nada.gif" class="img-fluid" alt="Responsive image">
      <h2>NO HAY PRODUCTOS EN EL CARRITO</h2>`;
      document.getElementById("myaudio").src = "music/vacio.mp3";
      document.getElementById("envioForm").style.display = "none";
      document.getElementById("carritoFinal").style.display = "none";
      document.getElementById("moneda").style.display = "none";
      document.getElementById("titulo").style.display = "none";
      document.getElementById("comprasTarjeta").style.display = "none";
     
    }
    else{
      precioEnvio =0;
      cargarCarrito();}
    
}

function mostrarTarjetaC(){

  document.getElementById("tarjetaCredito").style.display = "block";
  document.getElementById("targetaB").style.display = "none";
  tC = true;
  tB = false;
}

function mostrarTarjetaB(){
  document.getElementById("tarjetaCredito").style.display = "none";
  document.getElementById("targetaB").style.display = "block";
  tC = false;
  tB = true;
}

document.getElementById('emailCompras').addEventListener('input', function() {
  campo = event.target;
  valido = document.getElementById('emailOK');
      
  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  //Se muestra un texto a modo de ejemplo, luego va a ser un icono
  if (emailRegex.test(campo.value)) {
    valido.innerText = "Correo válido";
    valido.style.color= "green";
    validoEmail = true;
    
  } else {
    valido.innerText = "Correo incorrecto";
    valido.style.color= "red";
    validoEmail = false;
  }
  console.log(valido.innerText)
});


function comprobarCampos(){
  // Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
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
    pasaCompras =true;
    
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
    pasaCompras =true;
    }
  }
  
 
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()|| !pasaCompras) {
          event.preventDefault()
          event.stopPropagation()
          swal({
            title: "Parece que te faltaron completar campos",
            text: "Completa los que estan marcados en rojo para finalizar la compra",
            icon: 'https://i.pinimg.com/originals/59/b9/74/59b9740822441ef2689c7f2676d6755b.gif'
          });
        }

        else{
          swal({
            title: "Muchas gracias por comprar en este lugar!!",
            text: "Tu compra ha sido realizada con exito",
            icon: 'https://img.wattpad.com/ace776a765e5b5b1202e511a73b19bbabee729ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f455f497346586c6a726c435845513d3d2d3632303138303736372e313534633162393330646131376237633631393030373933353737362e676966',
            button: "Continuar"
          });
          document.getElementById("myaudio").src = "";
          document.getElementById("myaudio2").src = "music/compras.mp3";
          event.preventDefault();
        }

        form.classList.add('was-validated')
      },)
    })
})()
}

