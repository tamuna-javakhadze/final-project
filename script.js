// "use strict"

// section 3
// slider 1

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


