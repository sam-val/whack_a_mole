
const grid = document.querySelector(".grid");
const width = 3; 
var hit = 0;

function create_board(width) {
    for( let i = 0; i < width*4;  i++) {
        // make a div:
         let div = document.createElement("div")
         div.classList.add("square")
         div.setAttribute("data-id", i)
        
         div.addEventListener('click', axe_hit)
         grid.appendChild(div)
    }
    
}

function axe_hit() {
    console.log(this.getAttribute("data-id"))
}


function random_pos() {
    let random_pos;
    random_pos = Math.floor(Math.random() *  width*4);

    return random_pos;


}

function mole_out() {
    let ran_pos
    do {
        ran_pos = random_pos()
    }while (ran_pos === current_pos)

    let current_spot = grid.querySelector(`[data-id="${current_pos}"]`)
    let random_spot = grid.querySelector(`[data-id="${ran_pos}"]`)

    current_spot.style.backgroundImage = "url('imgs/hole.png')"
    random_spot.style.backgroundImage = "url('imgs/hole3.png')"

    current_pos = ran_pos


}

create_board(width);
var current_pos = random_pos();
setInterval(mole_out, 2000)