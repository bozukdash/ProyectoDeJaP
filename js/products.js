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
var qProducto = "";

function ordenarProductos(criterio, array){
    let result = [];
    console.log(array);
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
                        <div class="cajita responsive-container">
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
    arrayActual = categoriesArray;
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
    qProducto = localStorage.getItem("mostrarCategoria");

    if(qProducto === "Autos"){
        
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                arrayActual = resultObj.data.concat(autoExtra);
                sortAndShowProducts(POR_PRECIO_ASC, arrayActual);
            }
        });
    }
    if(qProducto === "Celulares"){
        document.body.style.backgroundImage = "url(https://norfipc.com/img/celulares/fondos-pantalla-arte-celular.jpeg)"
        getJSONData("https://raw.githubusercontent.com/juanmaferreira/ProyectoDeJaP/main/json/celulares.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(POR_PRECIO_ASC, resultObj.data);
            }
        });
    }
    if(qProducto === "Computadoras"){
        document.body.style.backgroundImage = "url(https://www.teahub.io/photos/full/139-1393655_computadoras-para-fondo-de-pantalla.jpg)"
        getJSONData("https://raw.githubusercontent.com/juanmaferreira/ProyectoDeJaP/main/json/compus.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(POR_PRECIO_ASC, resultObj.data);
            }
        });
    }
    if(qProducto === "Deporte"){
        document.body.style.backgroundImage = "url(https://www.mural-wallpaper.com/wp-content/uploads/2020/11/S-SP25.jpg)"
        getJSONData("https://raw.githubusercontent.com/juanmaferreira/ProyectoDeJaP/main/json/json/deporte.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(POR_PRECIO_ASC, resultObj.data);
            }
        });
    }
    if(qProducto === "Electrodomésticos"){
        document.body.style.backgroundImage = "url(https://media.istockphoto.com/photos/set-of-home-kitchen-appliances-in-the-room-on-the-wall-background-picture-id1196974664?k=20&m=1196974664&s=612x612&w=0&h=9PNuGOYbsj7J2DTPA8J6kTJUoRHKHLAyUmhRgCdYXVE=)"
        getJSONData("https://raw.githubusercontent.com/juanmaferreira/ProyectoDeJaP/main/json/electrodomesticos.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(POR_PRECIO_ASC, resultObj.data);
            }
        });
    }
    if(qProducto === "Herramientas"){
        document.body.style.backgroundImage = "url(https://www.callcentrehelper.com/images/stories/2020/07/tools-wallpaper-760.png)"
        getJSONData("https://raw.githubusercontent.com/juanmaferreira/ProyectoDeJaP/main/json/herramientas.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(POR_PRECIO_ASC, resultObj.data);
            }
        });
    }
    if(qProducto === "Juguetes"){
        document.body.style.backgroundImage = "url(https://previews.123rf.com/images/cristi180884/cristi1808841011/cristi180884101100033/8114965-toy-wallpaper.jpg)"
        getJSONData("https://raw.githubusercontent.com/juanmaferreira/ProyectoDeJaP/main/json/juguetes.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(POR_PRECIO_ASC, resultObj.data);
            }
        });
    }
    if(qProducto === "Muebles"){
        document.body.style.backgroundImage = "url(https://c4.wallpaperflare.com/wallpaper/75/719/692/escalera-hogar-interior-muebles-wallpaper-preview.jpg)"
        getJSONData("https://raw.githubusercontent.com/juanmaferreira/ProyectoDeJaP/main/json/muebles.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(POR_PRECIO_ASC, resultObj.data);
            }
        });
    }
    if(qProducto === "Vestimenta"){
        document.body.style.backgroundImage = "url(https://previews.123rf.com/images/tatianakost/tatianakost1608/tatianakost160800120/61468594-fashion-illustration-seamless-pattern-vector-hand-drawn-fashionable-women-clothes-and-accessories-sk.jpg)"
        getJSONData("https://raw.githubusercontent.com/juanmaferreira/ProyectoDeJaP/main/json/Vestimenta.json").then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(POR_PRECIO_ASC, resultObj.data);
            }
        });
    }

    document.getElementById('buscador').addEventListener('keyup',()=>{

        verificacion();

    });

    document.getElementById("precioAscendente").addEventListener("click", function(){
        sortAndShowProducts(POR_PRECIO_ASC,arrayActual);
    });

    document.getElementById("precioDecreciente").addEventListener("click", function(){
        sortAndShowProducts(POR_PRECIO_DESC,arrayActual);
    });

    document.getElementById("porRelevancia").addEventListener("click", function(){
        sortAndShowProducts(POR_RELEVANCIA,arrayActual);
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
