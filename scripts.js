
var grid = document.querySelector(".grid")

const score = document.querySelector(".prompt span")
const canvas = document.querySelector(".canvas")
const width = 3; 
const axe_img = document.querySelector("#axe")
var axe_down_img = document.querySelector("#axe_down")
const interval = 1500;
const delayed_interval = 3000;


var current_interval_time = interval;
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

function draw_axe(event, img) {
    let desired_w = 150;
    let desired_h = 150;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let x = event.clientX - canvas.offsetLeft - desired_h/2 
    let y = event.clientY - canvas.offsetTop - desired_w/2

    ctx.drawImage(img, x, y, desired_w, desired_h)
    
    console.log("axe witdh", img.width)
}

function axe_hit(event) {
    if (current_interval_time === delayed_interval) {
        return;
    }

    let id = this.getAttribute("data-id")
    // redraw the canvas
    draw_axe(event, axe_down_img)

    if (id == current_pos) {
        hit++;
        this.style.backgroundImage = "url(imgs/hole4.png)"
        current_interval_time = delayed_interval
        switch_interval_time()
        score.innerHTML = hit
    }
    // setTimeout(change_axe_img(axe_img),500)
}

function switch_interval_time() {
    clearInterval(loop)
    loop = setInterval(mole_out, current_interval_time)
    
}


function random_pos() {
    let random_pos;
    random_pos = Math.floor(Math.random() *  width*4);

    return random_pos;


}

function mole_out() {
    if (current_interval_time == delayed_interval) {
        current_interval_time = interval
        switch_interval_time() 
    }
    let ran_pos
    do {
        ran_pos = random_pos()
    }while (ran_pos === current_pos)

    let current_spot = grid.querySelector(`[data-id="${current_pos}"]`)
    let random_spot = grid.querySelector(`[data-id="${ran_pos}"]`)

    current_spot.style.backgroundImage = "url('imgs/hole.png')"
    random_spot.style.backgroundImage = "url('imgs/hole3.png')"

    current_pos = ran_pos


};

function trackMouse(event) {
//   ctx.globalCompositeOperation = "desination-over";
    draw_axe(event, axe_img)
};


function adjust_canvas_size() {
    let grid_rect = grid.getBoundingClientRect()
    console.log(grid_rect.top, grid_rect.left)
    canvas.width = grid_rect.width;
    canvas.height = grid_rect.height;
    canvas.style.left = grid_rect.left + "px"
    canvas.style.top = grid_rect.top + "px"

    
}


create_board(width);
var current_pos = random_pos();
var loop = setInterval(mole_out, interval)
adjust_canvas_size()

const ctx = canvas.getContext("2d")
window.addEventListener("resize",  adjust_canvas_size)