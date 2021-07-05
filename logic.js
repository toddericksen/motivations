var cards = document.querySelectorAll('.card');
var buttons = document.querySelectorAll('button');
var backButtons = document.querySelectorAll('.back_button');

var selectedDriversDiv = document.getElementById("selected-drivers")
var selectedCards = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
}

var selectedDrivers = []


function randoRgb() {
  var string = "rgb(";
  string += Math.round(Math.random() * 200) + ",";
  string += Math.round(Math.random() * 200) + ",";
  string += Math.round(Math.random() * 200) + ")";
  return string;
}

function nextScene(e) {
  var nextScene = e.path[2].nextElementSibling
  // console.log("next scene", nextScene)
  nextScene.scrollIntoView({ behavior: 'smooth' });
}

function previousScene(e) {
  console.log(e.path)
  var previousScene = e.path[1].previousElementSibling
  // console.log("next scene", prevScene)
  previousScene.scrollIntoView({ behavior: 'smooth' });
}


function renderDrivers() {
  selectedDriversDiv.innerHTML = "";

  selectedDrivers.forEach(function(value, index){
    const cardDiv = document.createElement("div")
    cardDiv.className = "card";
    const frontDiv = document.createElement("div")
    frontDiv.className = "front";
    const backDiv = document.createElement("div")
    backDiv.className = "back";
    frontDiv.appendChild(document.createTextNode(value));
    backDiv.appendChild(document.createTextNode(value));
    cardDiv.appendChild(frontDiv)
    cardDiv.appendChild(backDiv)
    selectedDriversDiv.appendChild(cardDiv)
    cardDiv.addEventListener( "click", cardSelected)
  })
}

function cardSelected(e) {
  console.log(e.path)

  if (selectedCards[parseInt(e.path[2].dataset.group)] < parseInt(e.path[2].dataset.limit) || e.path[1].classList.contains("is_flipped")) {
    e.path[1].classList.toggle("is_flipped");

    if (e.path[1].classList.contains("is_flipped")) {
      selectedCards[parseInt(e.path[2].dataset.group)] ++;
      selectedDrivers.push(e.path[0].textContent);

      if (e.path[2].id != "selected-drivers") {
        renderDrivers()
      }

    } else {
      selectedDrivers.splice(selectedDrivers.indexOf(e.path[0].textContent), 1)
      // console.log(selectedDrivers)
      selectedCards[parseInt(e.path[2].dataset.group)] --;
      
      if (e.path[2].id != "selected-drivers") {
        renderDrivers()
      }
    }
    
  } else {
    e.path[1].classList.add("shake_it_up");
    setTimeout(removeShake, 500)
  }
  function removeShake(){
    e.path[1].classList.remove("shake_it_up")
  }
}

for(var i = 0; i < cards.length; i++) {
  cards[i].addEventListener( "click", cardSelected)
}

for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener( "click", nextScene)
}

for(var i = 0; i < backButtons.length; i++) {
  backButtons[i].addEventListener( "click", previousScene)
}