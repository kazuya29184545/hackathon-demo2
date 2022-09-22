const loader = document.getElementById("loading");
const loader2 = document.getElementById("loading2");
const body = document.querySelector("body");

// showing loading
const displayLoading = () => {
    loader.classList.add('display');
    loader2.classList.add("display");
    body.classList.add('display');
    // stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
        loader.classList.remove("display");
        body.classList.remove("display");
    }, 10000);
}

// hide loading
const hideLoading = () => {
    loader.classList.remove("display");
    loader2.classList.remove("display");
    body.classList.remove("display");
}


const callTestApi = async() => {
    displayLoading();
    const res = await fetch("https://st7hlw7p7k.execute-api.us-west-2.amazonaws.com/test/");
    const resJson = await res.json();
    console.log(resJson);
    hideLoading();
    // const youtube = document.getElementById("recommendedTrailor");
    // const iframeSrc = 'https://www.youtube.com/embed/' + resJson.items[0].id.videoId;
    // document.getElementById("recommendedTitle").innerHTML = movieTitle2;
    // youtube.setAttribute('src', iframeSrc);
}

const btn = document.getElementById("button");
btn.addEventListener("click", () => {
    callTestApi()
})




