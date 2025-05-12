const choose=document.getElementById("choose");
const profilepic=document.getElementById("profile-pic");


choose.onchange=function(){
    profilepic.src=URL.createObjectURL(choose.files[0]);
}

