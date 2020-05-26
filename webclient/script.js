//declare variables
var all, xbox, playstation, nintendo, pc;

//set variables
// xbox = document.getElementById("xbox");
// playstation = document.getElementById("playstation");
// nintendo = document.getElementById("nintendo");
// pc = document.getElementById("pc");



function changeFunc(){
  getData();
  var filter = document.getElementById("filterGames");
  
  //Code to test Filter Values
  var filterVal = filter.options[filter.selectedIndex].value;
  console.log("filterVal: " + filterVal);
//Filter statement
  // if (filterVal === "All"){
  //   getData(all);
  //   //pull all games
  // }else if (filterVal === "Xbox One"){
  //   //pull xbox one games
  
  //   getData(xbox);
  // }else if (filterVal === "PS4"){
  //   getData(ps4);
    
  //   //pull ps4games
  // }else if (filterVal === "Nintendo"){
  //   getData(nin);
    
  //   //pull nintendo games
  // }else if (filterVal === "PC"){
  //   getData(pc);
    
  //   //pull pc games
  // }
async function getData(){
  //Fetch data 
  // let response = await fetch('http://localhost:8070/products', {
  //   method: 'GET',
  //   mode:'cors',
  //   headers: {
  //     "Content-Type": "application/json"
  //     },
  // })
  // let data = await response.json();
  // console.log(data);
  // .then(response => response.json())//transform data into json
  // .then(data => console.log(data));
  
  fetch('http://localhost:8070/products',{
    method:'GET',
    mode:'no-cors'
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  //Sort data based on Cat.
  // if (param === "all"){

  //   }else if (param === "xbox"){

  //   }else if(param === "ps4"){

  //   }else if(param === "nin"){

  //   }
  //If console = x return x


  console.log("Data Returned");
}

}