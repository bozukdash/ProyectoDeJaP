var infoAuto = [];
var comentarios = [];
var avatar = ["img/icono1.png","img/icono2.jpg","img/icono3.jpg","img/icono4.png"];
let extraComentarios = [];
let imgExtra = "img/perroN.png";
let relacionados =[];

function mostrarInfoDelAuto(infoAuto){

  showSpinner();
  extraComentarios = JSON.parse(localStorage.getItem("cuentanos"));
  if(extraComentarios === null){
    extraComentarios = [];
  }
  
    let htmlContentToAppend = "";
    htmlContentToAppend +=`<h2 class="mb-1 personalT"><span class="negrito">`+ infoAuto.name +`</span></h2><br>`;

    htmlContentToAppend +=`
    
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
    </ol>
    <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="` + infoAuto.images[0] + `" alt="First slide">
    </div>`

    for(let n=1; n < infoAuto.images.length; n++){

      htmlContentToAppend +=` 
    <div class="carousel-item">
        <img class="d-block w-100" src="` + infoAuto.images[n] + `" alt="">
      </div>
    `

    }
    htmlContentToAppend +=`  </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div><br> 

  <div class="row">
    <div class="col-sm-6">
      <div class="card text-white bg-dark mb-3" style="width: 50rem;">
        <div class="card-body">
          <h5 class="card-title">Descripción</h5>
          <h6 class="card-subtitle mb-2 text-muted"> `+ infoAuto.name +`</h6>
          <br>
          <p class="card-text">` + infoAuto.description + `</p>
          
        </div>
      </div>
    </div>

    <div class="col-sm-6">
      <div id="precioAuto" class="card text-white  mb-3" style="width: 20rem;">
        <div class="card-body">
          <h5 class="card-title">U$D `+ infoAuto.cost +`</h5>
          <small class="card-subtitle mb-2 text-muted">Este producto tiene Garantía de Entrega</small><br>
          <br>
          <span class="card-subtitle mb-2">Cantidad de vendidos:</span> <p class="card-text">`+ infoAuto.soldCount +`</p> 
        </div>
       </div>
       
</div><br>

<div class="container">
<h3><span class="negrito">Productos relacionados:</span></h3></div>

<div class="card-group">
  <div class="card" style="width: 20rem;">
    <img class="img-thumbnail" src="`+ relacionados[infoAuto.relatedProducts[0]].imgSrc +`" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">`+ relacionados[infoAuto.relatedProducts[0]].name +`</h5>
      <p class="card-text">`+ relacionados[infoAuto.relatedProducts[0]].description +`</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      <a href="product-info.html">Ir a Ver</a>
    </div>
  </div>
  <div id="card2" class="card" style="width: 20rem;">
    <img class="img-thumbnail" src="`+ relacionados[infoAuto.relatedProducts[1]].imgSrc +`" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">`+ relacionados[infoAuto.relatedProducts[1]].name +`</h5>
      <p class="card-text">`+ relacionados[infoAuto.relatedProducts[1]].description +`</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      <a href="product-info.html">Ir a Ver</a>
    </div>
  </div>
  </div>
</div>
</div>
<hr class="new5">
<div id="fondo-comentarios">

<div class="comments-container">
		<h1>Comentarios</h1>

		<ul id="comments-list" class="comments-list">
`;


for(let m=0; m < extraComentarios.length; m++){
  comentarios.push(extraComentarios[m]);
}

for(let i=0; i < comentarios.length; i++){
  let estrellas = 5;
  htmlContentToAppend +=`
  <li>
  <div class="comment-main-level">`
    
  if(i<4){
    htmlContentToAppend +=`<!-- Avatar -->
    <div class="comment-avatar"><img src="`+ avatar[i] +`" alt=""></div>`;
  }
  else{
    htmlContentToAppend +=`<!-- Avatar -->
    <div class="comment-avatar"><img src="`+ imgExtra +`" alt=""></div>`;
  }
   htmlContentToAppend +=` <!-- Contenedor del Comentario -->
    <div class="comment-box ">
      <div class="comment-head bg-dark">
      <div>
        <h6 class="comment-name by-author"><a href="https://www.instagram.com/?hl=es">`+ comentarios[i].user +`</a></h6>
        <div class="d-flex w-100 justify-content-between">
        <span>`+ comentarios[i].dateTime +`</span></div></div><div>`
        
        for (let j=0; j < comentarios[i].score; j++ ){//estrellas prendidas
          htmlContentToAppend +=` <span id="queBien" class="fa fa-car checked"> </span>`;
          estrellas--;
        }

        for (let k=0; k < estrellas; k++ ){//estrellas no prendidas
          htmlContentToAppend +=` <span class="fa fa-car"></span>`;
         
        }

        htmlContentToAppend += `</div></div>
      <div class="comment-content bg-dark text-white">
      `+ comentarios[i].description +`</div>
    </div>
  </div>
  
</li>`
  ;
}
htmlContentToAppend +=`</ul>
</div></div>

`

    document.getElementById("info-productos").innerHTML = htmlContentToAppend;

    hideSpinner();
}

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        comentarios = resultObj.data;
       
      
    }
  }); 

getJSONData(PRODUCTS_URL).then(function(resultObj){
  if (resultObj.status === "ok"){
      relacionados= resultObj.data;
  }
});
  
  getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoAuto = resultObj.data;
            //Muestro la info del auto
           
           mostrarInfoDelAuto(infoAuto);
        }
    });
});

