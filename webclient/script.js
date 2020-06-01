//declare variables
var all, xbox, playstation, nintendo, pc;
var allProductsData;
var results = [];
//var imgLink, imgSrc, Pname, Pprice, Ptype, Pcon;

function changeFunc() {

  //get filter value in variable
  var filter = document.getElementById("filterGames");
  //Code to test Filter Values
  var filterVal = filter.options[filter.selectedIndex].value;
  console.log("filterVal: ", filterVal);
  //Filter statement
  if (filterVal === "All") {
    //Grab data object
    //console.log("allProducts Data(pre-filterconsole): " , allProductsData);
    //console.log("results(pre-filterconsole): " , results);
    //filterConsole("all");
    htmlbuilder("all");
    //console.log("allProducts Data(post-htmlbuilder): " , allProductsData);
    //console.log("allProducts Data[0](post-htmlbuilder): " , allProductsData[0]);
    //console.log("allProducts Data[0].console(post-htmlbuilder): " , allProductsData[0].console);
    //console.log("results(post-htmlbulder): " , results);
    //run function to builds html structure for all products
  } else if (filterVal === "Xbox One") {
    //pull xbox one games
    //console.log("allProducts Data: " , allProductsData);
    filterConsole("xbox");
    //console.log("allProducts Data: " , allProductsData);
    //console.log("results: " , results);
    htmlbuilder("xbox");

    //getData(xbox);
  } else if (filterVal === "PS4") {
    //getData(ps4);
    //console.log("allProducts Data: " , allProductsData);
    filterConsole("playstation");
    htmlbuilder("ps4");
    //pull ps4games
  } else if (filterVal === "Nintendo") {
    //getData(nin)
    //console.log(allProductsData);
    filterConsole("nintendo");
    htmlbuilder("nintendo");
    //pull nintendo games
  } else if (filterVal === "PC") {
    //getData(pc);
    //console.log(allProductsData);
    filterConsole("pc");
    htmlbuilder("pc");
    //pull pc games
  }
}
const data = new Request("http://localhost:8070/products", {
  method: "GET",
  mode: "cors",
});
async function getData() {
  //Fetch data
  let response = await fetch(data);
  let allProducts = await response.json();
  //console.log(allProducts.length);
  allProductsData = allProducts;
}

function htmlbuilder(x) {
  if (x === "all") {
    console.log("all html builder");
    let html = "";
    for (i = 0; i < allProductsData.length; i++) {
      html += `
    <div id=${allProductsData[i].product_id} class="productcard">
      <a href="${allProductsData[i].img_link}">
        <img alt="${allProductsData[i].img_alt}" src= "${allProductsData[i].img_src}"
        width=200" height="265">
      </a>
      <p id=Pname>${allProductsData[i].name}</p> <p id=Pprice>${allProductsData[i].price}</p>  <p id= Ptype>${allProductsData[i].description}</p>  <p id= Pcon>${allProductsData[i].console}</p>
    </div>
  `;
    }
    //return html;
    document.getElementById("content").innerHTML = html;
  } else if (x === "xbox") {
    console.log("else html builder");
    let html = "";
    for (i = 0; i < results.length; i++) {
      html = `
    <div class="productcard">
      <a href="${results[i].img_link}">
        <img alt="${results[i].img_alt}" src= "${results[i].img_src}"
        width=200" height="265">
      </a>
      <p id=Pname>${results[i].name}</p> <p id=Pprice>${results[i].price}</p>  <p id= Ptype>${results[i].description}</p>  <p id= Pcon>${results[i].console}</p>
    </div>
  `;
    }
    document.getElementById("content").innerHTML = html;
  } else if (x === "ps4") {
    console.log("else html builder");
    let html = "";
    for (i = 0; i < results.length; i++) {
      html = `
      <div class="productcard">
        <a href="${results[i].img_link}">
          <img alt="${results[i].img_alt}" src= "${results[i].img_src}"
          width=200" height="265">
        </a>
        <p id=Pname>${results[i].name}</p> <p id=Pprice>${results[i].price}</p>  <p id= Ptype>${results[i].description}</p>  <p id= Pcon>${results[i].console}</p>
      </div>
    `;
    }
    document.getElementById("content").innerHTML = html;
  } else if (x === "pc") {
    console.log("else html builder");
    let html = "";
    for (i = 0; i < results.length; i++) {
      html = `
        <div class="productcard">
          <a href="${results[i].img_link}">
            <img alt="${results[i].img_alt}" src= "${results[i].img_src}"
            width=200" height="265">
          </a>
          <p id=Pname>${results[i].name}</p> <p id=Pprice>${results[i].price}</p>  <p id= Ptype>${results[i].description}</p>  <p id= Pcon>${results[i].console}</p>
        </div>
      `;
    }
    document.getElementById("content").innerHTML = html;
  } else if (x === "nintendo") {
    console.log("else html builder");
    let html = "";
    for (i = 0; i < results.length; i++) {
      html = `
          <div class="productcard">
            <a href="${results[i].img_link}">
              <img alt="${results[i].img_alt}" src= "${results[i].img_src}"
              width=200" height="265">
            </a>
            <p id=Pname>${results[i].name}</p> <p id=Pprice>${results[i].price}</p>  <p id= Ptype>${results[i].description}</p>  <p id= Pcon>${results[i].console}</p>
          </div>
        `;
    }
    document.getElementById("content").innerHTML = html;
  }
}

function filterConsole(selected) {
  for (i = 0; i < allProductsData.length; i++) {
    if (selected === "xbox") {
      for (i = 0; i < allProductsData.length; i++) {
        if (allProductsData[i].console === "xbox") {
          result = allProductsData[i];
          results.push(result);
          //console.log("results: ", results);
          return results;
        }
      }
    } else if (selected === "playstation") {
      for (i = 0; i < allProductsData.length; i++) {
        if (allProductsData[i].console === "playstation") {
          result = allProductsData[i];
          results.push(result);
          //console.log("results: ", results);
          return results;
        }
      }
    } else if (selected === "pc") {
      for (i = 0; i < allProductsData.length; i++) {
        if (allProductsData[i].console === "pc") {
          result = allProductsData[i];
          results.push(result);
          //console.log("results: ", results);
          return results;
        }
      }
    } else if (selected === "nintendo") {
      for (i = 0; i < allProductsData.length; i++) {
        if (allProductsData[i].console === "nintendo") {
          result = allProductsData[i];
          results.push(result);
          //console.log("results: ", results);
          return results;
        }
      }
    }
  }

  //return results;
}
