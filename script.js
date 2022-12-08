// "use strict"

// BMI calculator
let heightInput = document.querySelector(".height-input-field");
let weightInput = document.querySelector(".weight-input-field");
let calculateButton = document.querySelector(".calculate");
let result = document.querySelector(".result");
let statement = document.querySelector(".result-statement");
let BMI, round, height, weight;

calculateButton.addEventListener("click", ()=>{
    height = heightInput.value;
    weight = weightInput.value;
    BMI = weight/(height**2); 
    round = Math.round(BMI);
    result.innerText = `BMI = ${round}`;

    if(BMI < 18.5){
        statement.innerText = "Your BMI falls within the underweight range";    
    }else if((BMI > 18.5) && (BMI < 24.9)){
        statement.innerText = "Your BMI falls within the healthy weight range";
    }else if((BMI > 25) && (BMI < 29.9 )){
        statement.innerText = "Your BMI falls within the overweight range";
    }else if((BMI > 29.9 )){
        statement.innerText = "Your BMI falls within the obese range";
    }else{
        result.innerText = " ";
        statement.innerText = "You need to fill both the fields first";
    }
});

// slider
data = [
    {
        id: 1,
        url: "images/cardio.jpg",
        title: "Cardio"
    },
    {
        id: 2,
        url: "images/muscle-training.jpg",
        title: "Muscle Training"
    },
    {
        id: 3,
        url: "images/yoga.jpg",
        title: "Yoga"
    },
    {
        id: 4,
        url: "images/dance.jpg",
        title: "Dance"
    }
];

const arrowLeft = document.getElementById("arrow-left")
const arrowRight = document.getElementById("arrow-right")
const sliderContent = document.getElementById("slider-content");
let sliderIndex = 0;
let dotItem = document.getElementsByClassName("dot");

function createDiv(){
    const div = document.createElement("div");
    div.classList.add("slide")
    return div;
}

function createImg(item){
    const img = document.createElement("div");
    img.style.backgroundImage = `url(${item.url})`
    img.classList.add("bg-image-slider");

    img.classList.add("img-slider");
    return img;
}

function createTitle(item){
    const title = document.createElement("h3");
    title.classList.add("slider-img-title")
    title.textContent = item.title;
    return title;
}

function createDots(){
    const dotsParent = document.createElement("div");
    dotsParent.classList.add("dots-wraper");
    data.forEach(element => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.setAttribute("data-id", element.id);
        dotsParent.appendChild(dot);

        dot.addEventListener("click", function(event){
            let id = event.target.getAttribute("data-id");
            sliderIndex = id-1;
            slide();
        });
    })
    return dotsParent;
}

function slide(){
    sliderContent.innerHTML = " ";
    const slideItem = createDiv(data[sliderIndex]);
    const imgTag = createImg(data[sliderIndex]);
    const titleTag = createTitle(data[sliderIndex]);
    const dotsTag = createDots();

    slideItem.appendChild(imgTag);
    imgTag.appendChild(titleTag);
    sliderContent.appendChild(slideItem);
    sliderContent.appendChild(dotsTag);

    dotItem[sliderIndex].classList.add("active-dot");
}

function arrowLeftClick(){
    if(sliderIndex==0){
        sliderIndex = data.length - 1;
        slide();
        return;
    }
    sliderIndex--;
    slide();
}

function arrowRightClick(){
    if(sliderIndex==data.length-1){
        sliderIndex = 0;
        slide();
        return;
    }
    sliderIndex++;
    slide();
}


arrowLeft.addEventListener("click", arrowLeftClick);
arrowRight.addEventListener("click", arrowRightClick);

setInterval(()=> {
    arrowRightClick();
}, 5000); 

slide();

// fetch
let currentPage = 1;
let post = document.getElementById("post-wraper");

function getUsers(page){
    fetch("https://reqres.in/api/users?page=" + page, {
    METHOD: "GET"
})
.then(function(text){
    if (text.status !== 200){
        throw text.status;
    }
    return text.json();
})
.then(function(converted){
    converted.data.forEach((item) => {
        let user = document.createElement("p");
        user.classList.add("user-name");
        user.innerText = `${item.first_name} ${item.last_name}`;

        let avatar = document.createElement("img");
        avatar.src = item.avatar;
        avatar.setAttribute("alrt", "avatar");
        avatar.classList.add("avatar");

        let nameAvatar = document.createElement("div");

        nameAvatar.appendChild(user);
        nameAvatar.appendChild(avatar);
        post.appendChild(nameAvatar);
    });
})
.catch(function(error){
    if(error == 404){
        let p = document.createElement("p");
        p.textContent = "page not found";
        p.classList.add("text");
        post.appendChild(p);
    }
})
}

let loadMore = document.getElementById("loadmore");
loadMore.addEventListener("click", function(){
    currentPage++;
    getUsers(currentPage);
    loadMore.remove();
})

getUsers(currentPage);

//  form
let form = document.getElementById("form");

form.addEventListener("submit", function(event){
    event.preventDefault();
    let error = {};
// first name
    let firstNameVal = document.getElementById("first-name").value;
    if(firstNameVal == ""){
        error.firstname = "please fill out the field above";
    }
// last name
    let lastNameVal = document.getElementById("last-name").value;
    if(lastNameVal == ""){
        error.lastname = "please fill out the field above";
    }
// email
    let emailVal = document.getElementById("email").value;
    if(emailVal == ""){
        error.emailVal = "please fill out the field above";
    }
// phone
    let phoneVal = document.getElementById("phone").value;
    if(phoneVal == ""){
        error.phoneVal = "please fill out the field above";
    }
// password
    let passwordVal1 = document.getElementById("password1").value;
    let passwordVal2 = document.getElementById("password2").value;
    if(passwordVal1 == ""){
        error.password1 = "please fill out this field above";
    }
    if(passwordVal2 == ""){
        error.password2 = "please fill out this field above";
    }
    if(passwordVal1 != passwordVal2){
        error.password2 = "password doesn't match";
    }

    console.log(error);

// clear
    document.querySelectorAll(".error").forEach((item) => {
        item.innerText = "";
    });

// span 
    for(let key in error){
        let span = document.getElementById("error_" + key);
        if(span){
            span.innerText = error[key];
        }
    }

// submit
    if(Object.keys(error).length == 0){
        form.submit();
    }
});

// password show
let password = document.getElementById("password1");
let icon = document.getElementById("show-icon");

icon.addEventListener("click", function(){
    if(password.type == "password"){
        password.setAttribute("type", "text");
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }else{
        password.setAttribute("type", "password");
        icon.classList.add("fa-eye");
        icon.classList.remove("fa-eye-slash");
    }
});

// email validation
let emailField = document.getElementById("email");

emailField.addEventListener("keyup", function(){
    let emailVal = document.getElementById("email").value;
    let errorSpan = document.getElementById("error-mail");
    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(emailVal.match(emailPattern)){
        errorSpan.innerText = "email is valid";
        errorSpan.style.color = "green";
    }else{
        errorSpan.innerText = "email is not valid";
        errorSpan.style.color = "red";
    }
// clear
    if(emailVal == ""){
        errorSpan.innerHTML = " ";
    }
});