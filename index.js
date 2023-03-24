const pointbox = document.querySelector("#score"); // pointtavle
const dragFoodBox = document.querySelectorAll(".food article"); // mad
const targetAnimal = document.querySelectorAll(".animal"); // dyrene
const foodBox = document.querySelector(".food"); //  madkassen
const cleanCage = document.querySelector(".btn_clean"); // rengøring

// EVENTS på elementerne
dragFoodBox.forEach(function (element) {
  element.addEventListener("dragstart", startDrag);
});

targetAnimal.forEach(function (element) {
  element.addEventListener("dragover", cancelDefault);
  element.addEventListener("drop", dropMad);
  // console.log("test lytter");
});

cleanCage.addEventListener("dragstart", clean);

// FUNKTIONER

function startDrag(event) {
  // console.log(this.dataset.food);
  event.dataTransfer.setData("foodId", this.id);
  event.dataTransfer.setData("foodName", this.dataset.food);
  //    console.log("Den kan hives!")
}

function cancelDefault(event) {
  event.preventDefault();
  // kan bruges til at "aflyse" eventet
}

function dropMad(event) {
  //  console.log("Der er droppet mad");

  let madId = event.dataTransfer.getData("foodId");
  let madType = event.dataTransfer.getData("foodName");

  let cleancage = event.dataTransfer.getData("clean");

  if (cleancage == "x") {
    this.innerHTML = this.innerHTML.replace("❤", "");
  } else {
    if (madType == this.dataset.food) {
      //tester for antal hjerter når der gives mad
       if  (this.innerHTML.includes('❤❤❤')) {
        alert("Nej tak, jeg er mæt 💩 ")
      } 
      let heart = document.createTextNode("❤");
      this.appendChild(heart);

      pointbox.innerHTML = parseInt(pointbox.innerHTML) + 100;

      // animateCSS(this, 'heartbeat'); 
    } else {
      alert("BVARD!!! *host host");
      pointbox.innerHTML = parseInt(pointbox.innerHTML) - 100;
      foodBox.removeChild(document.querySelector("#" + madId));
    }
  }
  
}

// funktion til animationerne
const animateCSS = (element, animation, prefix = 'animate__') =>
  
new Promise((resolve, reject) => {
  const animationName = `${prefix}${animation}`;
  const node = document.querySelector(element);

  node.classList.add(`${prefix}animated`, animationName);

  function handleAnimationEnd(event) {
    event.stopPropagation();
    node.classList.remove(`${prefix}animated`, animationName);
    resolve('Animation ended');
  }

  node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

//rengør bur
function clean(event) {
  // console.log("test");
  event.dataTransfer.setData("clean", this.dataset.clean);
}

// pop up funktion
let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}
function closePopup() {
  popup.classList.remove("open-popup");
}
