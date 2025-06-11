let isLiked = false;
const ele = document.getElementById("clickHere");

ele.addEventListener("click", () => {
    if(isLiked){
        ele.classList.remove("fa-solid");
        ele.classList.add("fa-regular");
    }else{
        ele.classList.remove("fa-regular");
        ele.classList.add("fa-solid")
    }
    isLiked=!isLiked;
});