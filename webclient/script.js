//declare variables
var all, xbox, playstation, nintendo, pc;
var allProductsData;
var imgLink, imgAlt, imgSrc, Pname, Pprice, Ptype; 
//set variables
// xbox = document.getElementById("xbox");
// playstation = document.getElementById("playstation");
// nintendo = document.getElementById("nintendo");
// pc = document.getElementById("pc");



function changeFunc(){
  
  var filter = document.getElementById("filterGames");
  
  //Code to test Filter Values
  var filterVal = filter.options[filter.selectedIndex].value;
  console.log("filterVal: " + filterVal);
//Filter statement
  if (filterVal === "All"){
   //Grab data object

   console.log(allProductsData);
   filterConsole("");
   //run function to builds html structure for all products
  }else if (filterVal === "Xbox One"){
    //pull xbox one games
    
    console.log(allProductsData);
    filterConsole("xbox");
   //getData(xbox);
  }else if (filterVal === "PS4"){
    //getData(ps4);
    
    console.log(allProductsData);
    filterConsole("playstation");
    //pull ps4games
  }else if (filterVal === "Nintendo"){
    //getData(nin);

    console.log(allProductsData);
    filterConsole("nintendo");
    //pull nintendo games
  }else if (filterVal === "PC"){
    //getData(pc);
   
    console.log(allProductsData);
    filterConsole("pc");
    //pull pc games
  }
}
const data = new Request('http://localhost:8070/products',{
  method:'GET',
  mode:'cors'
})
async function getData(){
//Fetch data 
let response = await fetch(data);
let allProducts = await response.json();
//console.log(allProducts.length);
allProductsData = allProducts;



// fetch('http://localhost:8070/products', {
//     method: 'GET',
//     mode:'cors',
//     headers: {
//       "Content-Type": "application/json"
//       },
//   })
// .then(response => response.json())//transform data into json
// .then(data => console.log(data));


// .then(
//   function(response) {
//   console.log(response.status)
//     if (response.status !== 200) {
//       console.log('Looks like there was a problem. Status Code: ' +
//         response.status);
//       return;
//     }
//     // Examine the text in the response
//     response.json().then(function(data) {
//       console.log(data);
//     });

//   }
// )
// .catch(function(err) {
//   console.log('Fetch Error :-S', err);
// });

// function htmlbuilder(param){
//   const html = `
//     <div class="productcard">
//       <a href="${}">
//         <img alt="${}" src= "${}"
//         width=200" height="265">
//       </a>
//       <p id=Pname>${Pname}</p> <p id=Pprice>${}</p>  <p id= Ptype>${}</p>
//     </div>
//   `
// if (param === "all"){

//   }else if (param === "xbox"){

//   }else if(param === "ps4"){

//   }else if(param === "nin"){

//   }
//If console = x return x
//}

//Sort data based on Cat.



//console.log("Data Returned");
}

function filterConsole(selected){
  
  console.log(allProductsData.length);
  var results;
  for (i = 0; i < allProductsData.length; i++) {

    if (selected === "xbox"){
      for (i = 0; i < allProductsData.length; i++){
        if (allProductsData[i].console === "xbox"){
          results = allProductsData[i];
          console.log(results);
           return results;
        }
      }
      
    } else if (selected === "playstation"){
      for (i = 0; i < allProductsData.length; i++){
        if (allProductsData[i].console === "playstation"){
          results = allProductsData[i];
          console.log(results);
           return results;
        }
      }
    } else if (selected === "pc"){
      for (i = 0; i < allProductsData.length; i++){
        if (allProductsData[i].console === "pc"){
          results = allProductsData[i];
          console.log(results);
           return results;
        }
      }
    } else if (selected === "nintendo"){
      for (i = 0; i < allProductsData.length; i++){
        if (allProductsData[i].console === "nintendo"){
          results = allProductsData[i];
          console.log(results);
           return results;
        }
      }
    } else {
      for (i = 0; i < allProductsData.length; i++){
        results = allProductsData;
        console.log(results);
          return results;
      }
    }
  }

  return results;
}