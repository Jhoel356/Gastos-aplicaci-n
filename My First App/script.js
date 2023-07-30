const form = document.getElementById("transaction_form");
 form.addEventListener("submit", function(event){
    event.preventDefault()
   
    let datos = new FormData(form);
    if (form.transaccion_monto.value > 0){       
   
    var transactionObjetc = ConvertDatos(datos)
    SaveDatatransaction(transactionObjetc);
    insertartablas(transactionObjetc); 
    form.reset();
    }
    else{
      alert("El monto ingresado es menor a cero")
    }   
 })
 function draw_category(){
  let allcategory=[
   "alquiler",
   "comida",
   "transporte"
  ]
  for(let index = 0; index < allcategory.length; index++){
   insertCategory(allcategory[index]);
  }
}
function insertCategory(categoryName){
  const selectElement = document.getElementById("transaccion_categoria")
  let htmlToInsert = `<option> ${categoryName}</option>`
  selectElement.insertAdjacentHTML("beforeend",htmlToInsert) 
  
} 
    document.addEventListener("DOMContentLoaded", function(event){
      //trae la informacion del local storage
      draw_category()
      let arraob = JSON.parse(localStorage.getItem("transactiondata"))
      //recorre cada una de las transacciones las imprime
      arraob.forEach(function(arrayElemnt){insertartablas(arrayElemnt)})
    })
  

   function getNewtransactionID(){
      let trascationID = localStorage.getItem("lastrasactionID") || "-1";
      let newtrasactionID = JSON.parse(trascationID) + 1;
      localStorage.setItem("lastrasactionID", JSON.stringify(newtrasactionID));
      return newtrasactionID;
   }
 function ConvertDatos(datos){
  let transaccion_seleccionob =  datos.get("transaccion_seleecion")
  let transaccion_descripcionob =  datos.get("trasaccion_descripcion")
  let transaccion_montoob =  datos.get("transaccion_monto")
  let transaccion_categoriaob =  datos.get("transaccion_categoria")
  let transaction_ID = getNewtransactionID();
  return{
   "transaccion_seleecion":transaccion_seleccionob,
   "trasaccion_descripcion":transaccion_descripcionob,
   "transaccion_monto":transaccion_montoob,
   "transaccion_categoria":transaccion_categoriaob,
   "trasaccionID":transaction_ID
  }

 }
 //insertar tablas
 function insertartablas(transactionObjetc){
   let datostabla = document.getElementById("transaction_table");
    let newdtaostransaction = datostabla.insertRow(-1);
    newdtaostransaction.setAttribute("data-transaction-id", transactionObjetc ["trasaccionID"]);

    let cell0 = newdtaostransaction.insertCell(0);
    cell0.textContent =  transactionObjetc["transaccion_seleecion"];

    let cell1 = newdtaostransaction.insertCell(1);
    cell1.textContent=  transactionObjetc["trasaccion_descripcion"];

    let cell2 = newdtaostransaction.insertCell(2);
    cell2.textContent =  transactionObjetc["transaccion_monto"];
    
    let cell3 = newdtaostransaction.insertCell(3);
    cell3.textContent =  transactionObjetc["transaccion_categoria"];

    let newcellButonDelete = newdtaostransaction.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent="Eliminar";
    newcellButonDelete.appendChild(deleteButton);

    deleteButton.addEventListener("click",(event)=>{
      let transactionRow = event.target.parentNode.parentNode;
      //agarra el atributo el elmeento
      let transactiID = transactionRow.getAttribute("data-transaction-id");
      transactionRow.remove();
      deletetransactionID(transactiID);
    })

 }
 //elemina un elemento del array desde el local storage, le paso como parametro el trasactionid para lo que lo elimine
 function deletetransactionID(transaction_ID){
   //obtnego lo que hay en base d edatos (desconvierto el objeto de json a objeto)
   let  transaccionobArray = JSON.parse(localStorage.getItem("transactiondata"));
   //busco el indice/ la poscion de la transaccion que quiero eliminar
   let transaccionindexInArray = transaccionobArray.findIndex( element => element.transaction_ID === transaction_ID);
   //elemino el elemento la transaccion
   transaccionobArray.splice(transaccionindexInArray, 1);
   //convierto de objeto a json
   let transactionOnArrayJSON = JSON.stringify(transaccionobArray );
   //guarda mi array de transaccion en formato json en el local storaje
     localStorage.setItem("transactiondata", transactionOnArrayJSON);
     
 }
 
 function SaveDatatransaction(transactionObjetc){
   
     let myArray=JSON.parse(localStorage.getItem("transactiondata"))||[];
     myArray.push(transactionObjetc);
     //conbierto mis transacciones en formato json
     let transactionOnArrayJSON = JSON.stringify(myArray);
     localStorage.setItem("transactiondata", transactionOnArrayJSON);
     //guarda mi array de transaccion en formato json en el local storaje
     
 }

 
