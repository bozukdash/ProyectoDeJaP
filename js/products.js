const POR_PRECIO_ASC = "Ascendente";
const POR_PRECIO_DESC = "Descendente";
const POR_RELEVANCIA = "Relevancia";
var arrayActual = [];
var criterioDeOrdenamiento = undefined;
var arrayCondicional = [];
var minCount = undefined;
var maxCount = undefined;
var listafiltrada = [];

function sortCategories(criterio, array){
    let result = [];
    if (criterio === POR_PRECIO_ASC)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === POR_PRECIO_DESC){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
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

function showCategoriesList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < arrayActual.length; i++){
        let prod = arrayActual[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(prod.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(prod.cost) <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + prod.imgSrc + `" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ prod.name +`</h4>
                        <small class="text-muted">` + prod.soldCount + ` artículos</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">`+ prod.description +`</p>
                    <small class="text-muted">` + prod.cost + ` USD</small>
                </div>
                </div>
            </div>
        </a>
        `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    criterioDeOrdenamiento = sortCriteria;

    if(categoriesArray != undefined){
        arrayActual = categoriesArray;
    }

    arrayActual = sortCategories(criterioDeOrdenamiento, arrayActual);
    arrayCondicional = arrayActual;
    //Muestro las categorías ordenadas
    showCategoriesList();
}

function verificacion() {
    console.log(arrayActual);
    var textoEscrito = document.getElementById("buscador").value;
    var listafiltrada = arrayActual.filter(function(name) { //filter devuelve un nuevo array conteniendo los coincidentes
        return name.name.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1; //si lo escrito está en el array devuelve su posición
        //si no lo está devuelve -1
    })
    arrayActual = listafiltrada; //aqui le asigno el valor a la lista global
    if (textoEscrito.trim() === ""){
        arrayActual = arrayCondicional; // esto es para no perder el valor del arreglo y cause conflictos
    }
    showCategoriesList(); // escribo la lista filtrada
  }
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(POR_PRECIO_ASC, resultObj.data);
        }
    });

    document.getElementById('buscador').addEventListener('keyup',()=>{

        verificacion();

    });

    document.getElementById("precioAscendente").addEventListener("click", function(){
        sortAndShowCategories(POR_PRECIO_ASC);
    });

    document.getElementById("precioDecreciente").addEventListener("click", function(){
        sortAndShowCategories(POR_PRECIO_DESC);
    });

    document.getElementById("porRelevancia").addEventListener("click", function(){
        sortAndShowCategories(POR_RELEVANCIA);
    });

    document.getElementById("limpiarFiltro").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
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

        showCategoriesList();
    });
});

