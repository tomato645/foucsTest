async function changeBackgroudColor(){
    let randomNum = random(1000, 5000);
    console.log(`waiting ${randomNum} ms...`)
    await sleep(randomNum);
    console.log("change color");
    document.getElementById("click_space").style.backgroundColor = "red";
    let changedTime = performance.now();
    
    let clickedTime = await clickWaiter();
    
    let time = clickedTime-changedTime;
    localStorage.setItem(getDate(), time);
    document.getElementById("time").innerHTML = `${time} ms`;
    console.log(`time: ${time} ms`);
}

let clickWaiter = () => new Promise((resolve) => document.getElementById("click_space").onclick = function(){
    console.log("clicked");
    document.getElementById("click_space").style.backgroundColor = "white";
    let clickedTime = performance.now();
    resolve(clickedTime);
})

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getDate(){
    let date = new Date();
    return date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' +('0' + date.getDate()).slice(-2) + '' +  ('0' + date.getHours()).slice(-2) + '' + ('0' + date.getMinutes()).slice(-2) + '' + ('0' + date.getSeconds()).slice(-2) + '' + date.getMilliseconds()
}

window.onload = function() {
    let startStopBtn = document.querySelector("#start-stop-btn");
    startStopBtn.addEventListener("click", async function() {
        console.log("toggle");
        for (let i = 0; i < 10; i++) {
            if (startStopBtn.checked === false){
                console.log("break");
                break
            }
            await changeBackgroudColor();
        }
    })
}