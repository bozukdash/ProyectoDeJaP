var compras = [];
let total = 0;


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARRITO_PRO).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          compras = resultObj.data;
          

          //pasar todo a dolar del comienzo
          for(let l=0; l<compras.articles.length; l++){
            if(compras.articles[l].currency !=="USD"){
                compras.articles[l].unitCost /=40;
                compras.articles[l].currency = "USD";
            }
          cargarCarrito()
        }
        
      }
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
    <tr>
    
    <td></td>
    <td></td>
    <td></td>
    <th scope="row">Total:</th>
    <td id="totalCompras">`+compras.articles[0].currency+" "+ total +`</td>
    <td></td>
    </tr>
    </tbody>
  </table>`;}

  document.getElementById("info-carrito").innerHTML = llenarCarrito;
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
    cargarCarrito();
}