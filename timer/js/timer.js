let isStarted = false;
let isReset = false;
let firstStart = true;
let timerStatus
let currentTimeGlobal = [0, 0];
let currentTime = [];
let insertTime;
let sound, volume;

let minutes, seconds;
let inputMinutes,inputSeconds;
let circle, circleInitial;
let circleTime = 1;
// 210 = R * 2
const circleL = 210 * Math.PI;
let rootVariables;

window.onload = function(){
    insertTime = document.getElementById('clockLength');
    rootVariables = document.documentElement;
    inputMinutes = document.getElementById('minutes');
    inputSeconds = document.getElementById('seconds');
    currentTime = [+inputMinutes.value, +inputSeconds.value];
    let displayTime = ('0' + currentTime[0]).slice(-2) + ':' + ('0' + currentTime[1]).slice(-2);
    insertTime.textContent = displayTime;
    circleInitial = currentTime[0]*60+ +currentTime[1];
    circle = document.querySelector('.countdownCircle'); //SVG Cirle node
    circle.style.strokeDasharray = `${circleL} 0`; //sets CircleDash
    
    sound = document.getElementById('sound');
    volume = document.getElementById('volume');
    document.getElementById('sound-container').addEventListener('mouseover', function(event){
        document.getElementById('volume').style.display = 'block';
        document.getElementById('sound-container').style. height = '120px';
    });
    document.getElementById('sound-container').addEventListener('mouseout', (event) => {
        document.getElementById('volume').style.display = 'none';
        document.getElementById('sound-container').style. height = '30px';
    });
    volume.addEventListener('mouseup', changeVolume);
    sound.volume = 0.5;
    inputMinutes.addEventListener('change', setMinutes);
    inputSeconds.addEventListener('change', setSeconds);
    
    
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
        insertTime.innerHTML = ('0' + currentTime[0]).slice(-2) + ':' + ('0' + currentTime[1]).slice(-2);
        break;
}
}


function timerStarter(){
    minutes = +currentTime[0];
    seconds = +currentTime[1];

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
function changeVolume(){
    sound.volume = +volume.value;
}
function setMinutes(){
    let tempMinutes = +inputMinutes.value;
    if(isNaN(tempMinutes) || tempMinutes < 0 || tempMinutes >= 99 || tempMinutes + +inputSeconds == 0){
        tempSeconds = 0;
        currentTime[0] = 1;
        inputMinutes.value = '01';
        inputSeconds.value = '00';
    }
        isReset = false;
        isStarted = true;
        timer();
        currentTime[0] = tempMinutes;
        circleInitial = currentTime[0]*60+ +currentTime[1];
        isReset = true;
        isStarted = true;
        timer();
}
function setSeconds(){
    let tempSeconds = +inputSeconds.value;
    if(isNaN(tempSeconds) || tempSeconds <= 0 || tempSeconds >= 59){
        tempSeconds = 0;
        currentTime[0] = 1;
        inputMinutes.value = '01';
        inputSeconds.value = '00';
    }
        isReset = false;
        isStarted = true;
        timer();
        currentTime[1] = tempSeconds;
        circleInitial = currentTime[0]*60+ +currentTime[1];
        isReset = true;
        isStarted = true;
        timer();
    
}

//This makes numbers be always 2digits
function format(input){
    if(input.value.length === 1){
      input.value = "0" + input.value;
    }
  }