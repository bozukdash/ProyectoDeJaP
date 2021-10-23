const POR_PRECIO_ASC = "Ascendente";
const POR_PRECIO_DESC = "Descendente";
const POR_RELEVANCIA = "Relevancia";
var arrayActual = [];
var criterioDeOrdenamiento = undefined;
var arrayCondicional = [];
var minCount = undefined;
var maxCount = undefined;
var listafiltrada = [];
var autoExtra = {cost: 17850,currency:"USD",description:"Pese a sus compactas dimensiones, la inteligente distribución del espacio interior en el Kia Stonic pretende maximizar el confort para todos sus ocupantes.",imgSrc:"img/car5.jpg",name:"Kia Stonic",soldCount:85};

function ordenarProductos(criterio, array){
    let result = [];
    if (criterio === POR_PRECIO_ASC)
    {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if (criterio === POR_PRECIO_DESC){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            
            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criterio === POR_RELEVANCIA){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function mostrarProductos(){
    let htmlContentToAppend = "";
   
    for(let i = 0; i < arrayActual.length; i++){
        let prod = arrayActual[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(prod.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(prod.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class = "fondito">
            <a href="product-info.html">
                <div class="responsive-container">
                    <div class="responsive-card">
                        <div class="cajita">
                            <div class="imgCard">
                                <img src="` + prod.imgSrc + `" alt="" class="img-thumbnail">
                            </div>
                            <div class="">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-6">`+ prod.name +`</h5>
                                    <small class="mb-6 text-muted">` + prod.soldCount + ` artículos</small>
                                </div>
                                <div class="d-flex w-200 justify-content-between">
                                    <h4 class="mb-6"></h4>
                                    <h6 id="precioC">` + prod.cost + ` USD</h6>
                                </div>
                                <div>
                                <p class="mb-6">`+ prod.description +`</p>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
        </a>
        </div>
        `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
    if(arrayActual.length === 0){
        document.getElementById("cat-list-container").innerHTML ="";
    }
}

function sortAndShowProducts(modoDeOrden, categoriesArray){
    criterioDeOrdenamiento = modoDeOrden;

    if(categoriesArray != undefined){
        arrayActual = categoriesArray.concat(autoExtra);
    }

    arrayActual = ordenarProductos(criterioDeOrdenamiento, arrayActual);
    arrayCondicional = arrayActual;
    //Muestro las categorías ordenadas
    mostrarProductos();
}

function verificacion() {
    var textoEscrito = document.getElementById("buscador").value;
    var listafiltrada = arrayActual.filter(function(name) { //filter devuelve un nuevo array conteniendo los coincidentes
        return name.name.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1; //si lo escrito está en el array devuelve su posición
        //si no lo está devuelve -1
    })

    var listafiltradaDescription = arrayActual.filter(function(description) { //filter devuelve un nuevo array conteniendo los coincidentes
        return description.description.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1; //si lo escrito está en el array devuelve su posición
        //si no lo está devuelve -1
    })
    arrayActual = listafiltrada; //aqui le asigno el valor a la lista global
    if (textoEscrito.trim() === ""){
        arrayActual = arrayCondicional; // esto es para no perder el valor del arreglo y cause conflictos
    }
    mostrarProductos(); // escribo la lista filtrada
  }

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(POR_PRECIO_ASC, resultObj.data);
        }
    });

    document.getElementById('buscador').addEventListener('keyup',()=>{

        verificacion();

    });

    document.getElementById("precioAscendente").addEventListener("click", function(){
        sortAndShowProducts(POR_PRECIO_ASC);
    });

    document.getElementById("precioDecreciente").addEventListener("click", function(){
        sortAndShowProducts(POR_PRECIO_DESC);
    });

    document.getElementById("porRelevancia").addEventListener("click", function(){
        sortAndShowProducts(POR_RELEVANCIA);
    });

    document.getElementById("limpiarFiltro").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        mostrarProductos();
    });

    document.getElementById("rangoFiltrado").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0 && (minCount >maxCount)){
                maxCount = undefined;
                document.getElementById("rangeFilterCountMax").value = "";
                alert("El maximo ingresado no debe ser menor que el minimo")
                
            }
        }
        else{
            maxCount = undefined;
        }

        mostrarProductos();
    });
});
document.getElementById("buscador").addEventListener("mouseout", verificacion);
