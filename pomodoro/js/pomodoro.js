let isStarted = false;
let isReset = false;
let firstStart = true;
let timerStatus
let initialTime = "00:04";
let currentTimeGlobal = [0, 0];
let insertTime;
let sound;

let minutes, seconds;

let circle, circleInitial;
let circleTime = 1;
// 210 = R * 2
const circleL = 210 * Math.PI;
let rootVariables;

window.onload = function(){
    insertTime = document.getElementById('clockLength');
    rootVariables = document.documentElement;
    insertTime.textContent = initialTime;
    circleInitial = +initialTime.split(':')[0]*60+ +initialTime.split(':')[1];
    circle = document.querySelector('.countdownCircle'); //SVG Cirle node
    circle.style.strokeDasharray = `${circleL} 0`; //sets CircleDash
    sound = document.getElementById('control').querySelector('audio');
}

//Changes appearence of buttons and calls other f
function timer(){
    timerStatus = isReset ? (isStarted ? 2 : 3) : (isStarted ? 0 : 1);
    switch(timerStatus){
    case 0:
        /*Clock stopped*/
        rootVariables.style.setProperty("--playContent", "\"\\f04b\"");
        rootVariables.style.setProperty("--playPadding", "4px");
        rootVariables.style.setProperty("--playMain", "#9ca5b5");
        rootVariables.style.setProperty("--playBackground", "transparent");
        isStarted = false;
        break;
    case 1:
        /*Clock is running*/
        rootVariables.style.setProperty("--playContent", "\"\\f04c\"");
        rootVariables.style.setProperty("--playPadding", "0px");
        rootVariables.style.setProperty("--playMain", "#fe4e4d");
        rootVariables.style.setProperty("--playBackground", "#ffffff25");
        timerStarter();
        isStarted = true;
        break;
    case 2:
        /*Clock ended and waiting for reset*/
        rootVariables.style.setProperty("--playContent", "\"\\f0e2\"");
        rootVariables.style.setProperty("--playPadding", "0px");
        rootVariables.style.setProperty("--playMain", "#fe4e4d");
        rootVariables.style.setProperty("--playBackground", "#ffffff25");
        isStarted = false;
        break;
    case 3:
        /*Clock is reset and ready for another countdown*/
        rootVariables.style.setProperty("--playContent", "\"\\f04b\"");
        rootVariables.style.setProperty("--playPadding", "4px");
        rootVariables.style.setProperty("--playMain", "#9ca5b5");
        rootVariables.style.setProperty("--playBackground", "transparent");
        isStarted = false;
        isReset = false;
        firstStart = true;
        circleTime = 1;
        circle.style.strokeDasharray = `${circleL} 0`;
        insertTime.innerHTML = initialTime;
        break;
}
}


function timerStarter(){

    let curentTime = insertTime.innerHTML.split(':');
    minutes = +curentTime[0];
    seconds = +curentTime[1];

    setTimeout(function tick(){
        if(isStarted && minutes+seconds != 0 && !isReset) {
            if(firstStart) {
                seconds++;
                firstStart = false;
            }
            circleProgress();
            countdown();
            setTimeout(tick, 1000);
            if(minutes+seconds == 0){
                isReset = true;
                let counter = false;
                let colorNow;
                let bgRing = document.getElementsByClassName('backgroundCircle')[0];
                let time = document.getElementById('clockLength');
                setTimeout(function blink(){
                    sound.play();
                    colorNow = counter & 1 ? '#fe4e4d' : '#0dc97f';
                    time.style.color = colorNow;
                    bgRing.style.setProperty('stroke', colorNow);
                    counter = !counter;
                    if(isReset == false) {
                        sound.pause();
                        document.getElementsByClassName('backgroundCircle')[0].style.setProperty('stroke', '#9ca5b5');
                        time.style.color = '#fe4e4d';
                        return;}
                    setTimeout(blink, 550);
                }, 0);
                isReset = true;
                
                timer();
            }
        }
    }, 0);
}
//Clock Countdown
function countdown(){
    if(seconds == 0) {
        minutes--;
        seconds = 59;
    }
    else seconds--;
    htmlView();
}
//Clock into HTML
function htmlView (){
    insertTime.textContent = `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
}

//Changes strokeDash of circle
function circleProgress(){
    circle.style.strokeDasharray = `${circleL*(1-circleTime/circleInitial)} ${circleL*circleTime/circleInitial}`;
    circleTime++;
}