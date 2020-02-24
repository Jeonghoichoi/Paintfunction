const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-colors");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;



canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = "#CANVAS_COLOR";
ctx.lineWidth = 2.5;
ctx.fillStyle = "CANVAS_COLOR";
 // ctx.fillRect(50, 50, 50, 50);



let filling = false;
let painting = false;



function StartPainting() {
    
    painting = true;
}


function StopPainting() {

    painting = false;
}


function onMouseMove(event) {

    const x = event.offsetX;
    const y = event.offsetY;

    if(painting === false) {

        ctx.beginPath();
        ctx.moveTo(x,y);
    }else {

       ctx.lineTo(x,y);
       ctx.stroke();
      
    }


}

function onMouseDown(event) {

   painting = true;
}

function handleColorClick(event) {

    const color = event.target.style.backgroundColor;
  
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleInputChange(event) {

    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;

}

function handleCanvasClick() {
    if (filling) {
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  }

function handleCM(event) {
// Method to prevent right clicking of the mouse -->> preventDefault();
 event.preventDefault();

}

function handleFillmode(event) {

    if (filling === true) {
        filling = false;
        fill.innerText = "채우기";
        fill.style.color = "#2c2c2c";
      } else {
        filling = true;
        fill.innerText = "채우기 취소";
        fill.style.color = "darkgray";
      }
}

function handleSaveClick() {

        // const image = canvas.toDataURL("image/jpeg");  It`s possible to save JPEG format!
        const image = canvas.toDataURL(""); // png save
        const link = document.createElement("a"); // < <a> anchor tage  
        link.href = image;
        link.download = "download";
        link.click();
      }

if(canvas) {

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", StartPainting);
    canvas.addEventListener("mouseup", StopPainting);
    canvas.addEventListener("mouseleave", StopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


if(range) {

    range.addEventListener("input", handleInputChange);
}


if(fill) {

    fill.addEventListener("click", handleFillmode);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }