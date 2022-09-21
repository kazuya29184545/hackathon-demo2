// async function callAPIGWforPersonalize() {
//     const res = await fetch("https://36w3uycmuj.execute-api.us-west-2.amazonaws.com/test");
//     const apigw = await res.json();
//     console.log(apigw);
    
  
// }
// async function titleToId() {
//     const res = await fetch("./movies-2.json");
//     const apigw = await res.json();
//     //console.log(apigw);
//     const found = apigw.find(e => e.TITLE === 'Catch Me If You Can (2002)');
//     console.log(found.ITEM_ID)
//     console.log(typeof(found))
//     // itemid = found[0].ITEM_ID
// }
// titleToId()

// async function idToTitle() {
//     const res = await fetch("./movies-2.json");
//     const resX = await res.json();
//     // console.log(resX);
//     const found = resX.find(e => e.ITEM_ID === "6333");
//     // console.log(found)
//     movieTitle = found.TITLE;
//     console.log(movieTitle)
// }
// idToTitle();

// let movieTitle = "";

// async function putMovieTitle() {
//     movieTitle = "Catch Me If You Can (2002)";
// }
// putMovieTitle();


// converting movieTitle to ItemID
// let movieTitle = "";
// async 

// async function titleToId() {
//     const res = await fetch("./movies-2.json");
//     const resX = await res.json();
//     //console.log(resX);
//     const found = resX.find(e => e.TITLE === movieTitle);
//     itemid = found.ITEM_ID;
//     console.log(itemid)
// }
// titleToId();


///////Problem code///////
let movieTitle = "";

async function callAPIGW() {
    movieTitle = "Scooby-Doo! and the Goblin King (2008)";
    
    console.log(movieTitle);
    // movieTitle = title.innerHTML;
    // console.log(movieTitle)

}
callAPIGW();

const callYtbApi = async() => {
    
    console.log(movieTitle);
    
}
callYtbApi();

const titleToId = async() => {
  
    const res = await fetch("./movies-2.json");
    const resX = await res.json();
    // console.log(resX);
    console.log(movieTitle);
    const found = resX.find(e => e.TITLE === movieTitle);///この列が怪しいいいいいいい！！！！！
    // const found = resX.find(({TITLE}) => TITLE === "Catch Me If You Can (2002)");  
    console.log(found);
    console.log(movieTitle)
    
    // itemid = found.ITEM_ID;
    // console.log(itemid);
}
titleToId();

const test2 = async() => {
  
    const res = await fetch("./movies-2.json");
    const resX = await res.json();
    // console.log(resX);
    console.log(movieTitle);
    resX.forEach(object =>{
        console.log(object);
      });
    // const found = resX.find(e => e.TITLE === movieTitle);///この列が怪しいいいいいいい！！！！！
    // // const found = resX.find(({TITLE}) => TITLE === "Catch Me If You Can (2002)");  
    // console.log(found);
    // console.log(movieTitle)
    
    // itemid = found.ITEM_ID;
    // console.log(itemid);
}




