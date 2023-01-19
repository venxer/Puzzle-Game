const COORDINATES = [["00", "01", "02", "03"],
                     ["10", "11", "12", "13"],
                     ["20", "21", "22", "23"],
                     ["30", "31", "32", "33"]];
let start = false;
let movesMade = 0;
let win = false;
if(document.URL.includes("puzzle"))
{
    for (let row = 0; row < COORDINATES.length; row++) 
    {
        for (let col = 0; col < COORDINATES[row].length; col++) 
        {
            document.getElementById(COORDINATES[row][col]).addEventListener("click", function(){
                clicked(COORDINATES[row][col]);
            });
        }  
    }
    document.title = localStorage.getItem("img") + " puzzle"
    document.getElementById("score").innerHTML = movesMade;
    document.getElementById("shuffle").addEventListener("click", shuffle);
    document.getElementById("back").addEventListener("click", () => location.href='index.html');
    displayImage();
} 
function swap(firstCoord, secondCoord)
{    
    if(start)
    {
        if(isFirst)
        {
            movesMade++;
            document.getElementById("score").innerHTML = movesMade;
        }
        A = document.getElementById(firstCoord);
        B = document.getElementById(secondCoord);
    
        contentA = A.innerText; 
        contentB = B.innerText;
    
        temp = contentA;
        contentA = contentB;
        contentB = temp;

        A.innerHTML = contentA;
        B.innerHTML = contentB;
        console.log(A.innerText + " SWAPPED WITH " + B.innerHTML);
        displayImage();

        checkWin();
        console.log("status: " + win);
        if(win)
        {
            start = false;
            console.log("WIN!");
            document.getElementById("status").innerHTML = "WINNER!";
        }
    }
}
let isFirst = true;
let firstCoord = null;
let secondCoord = null;
function clicked(coord)
{
    if(start)
    {
        if(isFirst)
        {
            let img = document.getElementById(coord);
            img.style.opacity = "0.5";
            firstCoord = coord;
            isFirst = false;
        }
        else
        {
            let img = document.getElementById(firstCoord);
            img.style.opacity = "1";
            secondCoord = coord;
            isFirst = true;
            swap(firstCoord, secondCoord);
        }

    }
}
function setPlayImage(image) 
{
    localStorage.setItem("img", image);
}
function displayImage()
{
    
    let imageSet = localStorage.getItem("img");
    for (let row = 0; row < COORDINATES.length; row++) 
    {
        for (let col = 0; col < COORDINATES[row].length; col++) 
        {
            document.getElementById(COORDINATES[row][col]).style.backgroundImage = `url(ImageSets/${imageSet}/${document.getElementById(COORDINATES[row][col]).innerHTML}.jpg)`;
            document.getElementById(COORDINATES[row][col]).style.backgroundSize = "cover";

        }  
    }
}
function shuffle()
{
    start = true;
    movesMade = 0;
    document.querySelector("#status").innerHTML="";
    document.getElementById("score").innerHTML = movesMade;
    let arr = ["00", "01", "02", "03",
               "10", "11", "12", "13",
               "20", "21", "22", "23",
               "30", "31", "32", "33"];
    let curLength = arr.length;
    while(0 != curLength)
    {
        ran = Math.floor(Math.random() * curLength);
        curLength -= 1;
        temp = arr[curLength];
        arr[curLength] = arr[ran];
        arr[ran] = temp;
    }
    //changes value of each cell
    let pos = 0;
    for (let row = 0; row < COORDINATES.length; row++) 
    {
        for (let col = 0; col < COORDINATES[row].length; col++) 
        {
            document.getElementById(COORDINATES[row][col]).innerHTML = arr[pos]
            pos++
        }  
    }
    displayImage();
}
let checkWin = () => 
{
    let count = 0;
    for (let row = 0; row < COORDINATES.length; row++) 
    {
        for (let col = 0; col < COORDINATES[row].length; col++) 
        {
            if(document.getElementById(COORDINATES[row][col]).innerHTML === COORDINATES[row][col])
            {
                count++;         
            }   
        }  
    }
    count === 16 ? win = true: win = false;
}