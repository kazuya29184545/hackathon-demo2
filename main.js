let fileName = "";
var movieTitle = "";
let itemid = "";
let movieTitle2 = "";
let itemid2 = "";

const bucketName = "rekognition-kazuya";
const bucketRegion = "us-west-2";
const IdentityPoolId = "us-west-2:b8fef739-6ccc-408c-9110-5e41b23eee55";

document.getElementById("fileBtn").addEventListener("click", () => {
  document.querySelector("input").click();
});

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName }
});

// Preview
function previewImage(obj) {
    console.log(preview)
	var fileReader = new FileReader();
	fileReader.onload = (function() {
		document.getElementById('preview').src = fileReader.result;
	});
	fileReader.readAsDataURL(obj.files[0]);
}

//User input photo
function addPhoto() {
    let files = document.getElementById("chooseFile").files;
  if (!files.length) {
    return alert("Please choose a file to upload first.");
  }
  
  var file = files[0];
  fileName = file.name;

  // Use S3 ManagedUpload class as it supports multipart uploads
  let upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: fileName,
      Body: file
    }
  });

  var promise = upload.promise();

  promise.then(
    function(data) {
      alert("Successfully uploaded photo.");
      
    },
    function(err) {
      return alert("There was an error uploading your photo: ", err.message);
    }
  );
}

// Delete the photo
// function deletePhoto(fileName) {
//     s3.deleteObject({ Bucket: bucketName, Key: fileName }, function(err, data) {
//       if (err) {
//         return alert("There was an error deleting your photo: ", err.message);
//       }
//       alert("Successfully deleted photo.");
//     });
//   }
  

const uploadButton = document.getElementById("uploadPhoto");
const deleteButton = document.getElementById("deletePhoto");

uploadButton.addEventListener('click', () => {
    addPhoto();
});




//preparing for loading animation
const loader = document.getElementById("loading");
const loader2 = document.getElementById("loading2");
const group = document.getElementById("loadingroup");

// showing loading
const displayLoading = () => {
    loader.classList.add('display');
    loader2.classList.add("display");
    group.classList.add('display');
    // stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
        loader2.classList.remove("display");
        group.classList.remove("display");
    }, 10000);
}

// hide loading
const hideLoading = () => {
    loader.classList.remove("display");
    loader2.classList.remove("display");
    group.classList.remove("display");
}

// Makihg function for calling APIGW
async function callAPIGW() {
    displayLoading();
    const res = await fetch("https://4jo70ixtdk.execute-api.us-west-2.amazonaws.com/prod/?s3key=" + fileName);
    const apigw = await res.json();
    console.log(apigw);
    const title = document.getElementById("result-title");
    const name = document.getElementById("result-name");
    hideLoading();
    // const image = document.getElementById("result-image");
    // for (i=0; i<3; i++) {
    //   title.innerHTML = JSON.stringify(apigw[i].description.split(/[,)]/)[2]);
    //   // image.src = JSON.stringify(apigw[i].image)
      
    // }
    name.innerHTML = JSON.stringify(apigw[0].title)
    title.innerHTML = JSON.stringify(apigw[0].description.split(/[,)]/)[2]);
    console.log(title.innerHTML + ")")
    movieTitle = title.innerHTML.slice(1, -1) + ")"
    title.innerHTML = movieTitle;
    console.log(movieTitle)
    // movieTitle = title.innerHTML;
    // console.log(movieTitle)

}


//Youtube API for trailors
const apikey = "AIzaSyDH66hDu98Sbi0W5BsUfIBS2k5uRo6ZOgg";

const callYtbApi = async() => {
    const res = await fetch("https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=" + movieTitle + "trailor&type=video&videoEmbeddable=true&regionCode=US&key=" + apikey);
    const resJson = await res.json();
    console.log(resJson);
    const youtube = document.getElementById("youtube");
    const iframeSrc = 'https://www.youtube.com/embed/' + resJson.items[0].id.videoId;
    youtube.setAttribute('src', iframeSrc);
}

// Make a trigger to call APIGW function
const APIGWButton = document.getElementById("callAPIGW")


async function fnAsync() {
  await callAPIGW();
  callYtbApi()
}
// Call the function
APIGWButton.addEventListener("click", () => {
    fnAsync();
})

//ここでconsole.log(movieTitle)をしても何も出ない
// console.log(movieTitle);

// converting movieTitle to ItemID
const titleToId = async() => {
  //"The Mortal Instruments: City of Bones (2013)"
  const res = await fetch("./movies-2.json");
  const resX = await res.json();
  console.log(typeof(resX));
  console.log(movieTitle);
  const found = resX.find(e => e.TITLE === movieTitle.trim());///この列が怪しいいいいいいい！！！！！
  // const found = resX.find(({TITLE}) => TITLE === "Catch Me If You Can (2002)");  
  console.log(found);
  console.log(movieTitle);
  // console.log(typeof(movieTitle))
  // console.log(typeof(resX[0].TITLE))
  // console.log(resX[0].TITLE === "Scooby-Doo! and the Goblin King (2008)")
  
  itemid = found.ITEM_ID;
  console.log(itemid);
}

// make a function to call APIGW for personalize
async function callAPIGWforPersonalize() {
  const res = await fetch("https://36w3uycmuj.execute-api.us-west-2.amazonaws.com/test/?item=" + itemid);
  const apigw = await res.json();
  console.log(apigw);

  // 全部itemidに入れるの怖いから新しいグローバル変数itemid2に代入しとく、以降は2を使う。お疲れ、1。
  itemid2 = apigw;
  console.log(itemid2);
}

// converting ItemID to movieTitle
async function idToTitle() {
  const res = await fetch("./movies-2.json");
  const resX = await res.json();
  // console.log(resX);
  const found = resX.find(e => e.ITEM_ID === itemid2.trim());
  console.log(found)

  //　ここも怖いから2を一応作っておく。以降は2を使う。
  movieTitle2 = found.TITLE;
  console.log(movieTitle2);
}

const callYtbApi2 = async() => {
  const res = await fetch("https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=" + movieTitle2 + "trailor&type=video&videoEmbeddable=true&regionCode=US&key=" + apikey);
  const resJson = await res.json();
  console.log(resJson);
  const youtube = document.getElementById("recommendTrailor");
  const iframeSrc = 'https://www.youtube.com/embed/' + resJson.items[0].id.videoId;
  document.getElementById("recommendTitle").innerHTML = movieTitle2;
  youtube.setAttribute('src', iframeSrc);
}

// Ordering the functions
async function fnAsyncPersonalize() {
  await titleToId();
  await callAPIGWforPersonalize();
  await idToTitle();
  callYtbApi2();
}

// call APIGW for personalize
document.getElementById('recommend').addEventListener("click", () => {
  fnAsyncPersonalize();
  // titleToId();
})






//Call DynamoDB API via SDK


