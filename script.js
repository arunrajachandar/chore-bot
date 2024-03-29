let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath ="https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let numClosedDoors  = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let closedDoorPath  = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
let startButton = document.getElementById('start');
let currentStreak = document.getElementById('currentStreakVal');
let bestStreak = document.getElementById('bestStreakVal');
let currentStreakVal=0;
let bestStreakVal=0;
let contWinningRounds=0;
let currentlyPlaying = true;
const isBot=(door)=>{
    if(door.src === botDoorPath){
        return true;
    }return false;
}

const isClicked =(door)=>{
    if(door.src ===closedDoorPath){
        return false;
    }return true;
}
const playDoor=(door)=>{
    numClosedDoors--;
    if(numClosedDoors===0){
        gameOver('win');

    }
    else if(isBot(door)){
        gameOver();
    }
}
const randomChoreDoorGenerator =()=>{
    const choreDoor = Math.floor(Math.random()*numClosedDoors);
    if(choreDoor===0){
        openDoor1=botDoorPath; openDoor2=beachDoorPath; openDoor3=spaceDoorPath;
    }
    else if(choreDoor===1){

     openDoor2=botDoorPath; openDoor1=beachDoorPath; openDoor3=spaceDoorPath;
    }
     else if(choreDoor===2){

      openDoor3=botDoorPath; openDoor2=beachDoorPath; openDoor1=spaceDoorPath; 
     }
           }


doorImage1.onclick =()=>{
    if(currentlyPlaying && !isClicked(doorImage1)){
        doorImage1.src= openDoor1 ;
        playDoor(doorImage1);
    }
};

doorImage2.onclick =()=>{
    if(currentlyPlaying  && !isClicked(doorImage2)){
        doorImage2.src= openDoor2 ;
        playDoor(doorImage2);
    }
};

doorImage3.onclick =()=>{
    if(currentlyPlaying  && !isClicked(doorImage3)){
        doorImage3.src= openDoor3 ;
        playDoor(doorImage3);
    }
};

const bestStreakCal = (currentStreakVal,contWinningRounds)=>{
    if(bestStreakVal===0){
        bestStreakVal = currentStreakVal;
    }else if(contWinningRounds>bestStreakVal){
        bestStreakVal = contWinningRounds;
    }
    return bestStreakVal;
}


startButton.onclick = () =>{
    startRound();
    randomChoreDoorGenerator();

}


const gameOver = ( status)=>{
    if(status ==='win'){
        startButton.innerHTML = 'You win! Play again?';
        currentStreakVal++;
        contWinningRounds += currentStreakVal;         
    }else{
        startButton.innerHTML ='Game Over! Play again?';
        contWinningRounds =0;
    }
    currentlyPlaying = false;
    currentStreak.innerHTML = currentStreakVal;
    bestStreak.innerHTML = bestStreakCal(currentStreakVal,contWinningRounds);

};
randomChoreDoorGenerator();

const startRound= ()=>{
    if(!currentlyPlaying){
        numClosedDoors =3;
        doorImage1.src =closedDoorPath;
        doorImage2.src = closedDoorPath;
        doorImage3.src =closedDoorPath;
        currentlyPlaying=true;
        startButton.innerHTML ='Good Luck!';
        currentStreakVal=0;
    }
}
