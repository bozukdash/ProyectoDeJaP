//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    showSpinner();
    for(let i = 0; i < array.length; i++){
        let prod = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + prod.imgSrc + `" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ prod.name +`</h4>
                        <small class="text-muted">` + prod.cost + ` USD</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">`+ prod.description +`</p>
                </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;


    }
    setTimeout(hideSpinner(),50000);
    
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            
            //Muestro las categorías ordenadas
           showCategoriesList(categoriesArray);
        }
    });
});