async function changeBackgroudColor() {
    let randomNum = random(1000, 5000);
    console.log(`waiting ${randomNum} ms...`)
    await sleep(randomNum);
    if (!document.getElementById("start-stop-btn").checked){
        return
    }
    console.log("change color");
    document.getElementById("click_space").style.backgroundColor = "red";
    let changedTime = performance.now();

    let clickedTime = await clickWaiter();

    let time = clickedTime - changedTime;
    saveTime(time);

    document.getElementById("time").innerHTML = `${time} ms`;
    console.log(`time: ${time} ms`);
}

function saveTime(time) {
    console.log("saving time!!!");

    let data = { timestamp: getTime(), score: time };
    let prevData = JSON.parse(localStorage.getItem("score"));
    if (prevData == null) {
        localStorage.setItem("score", JSON.stringify([data]));
    } else {
        prevData.push(data);
        localStorage.setItem("score", JSON.stringify(prevData));
    }
}

let clickWaiter = () => new Promise((resolve) => document.getElementById("click_space").onclick = function () {
    console.log("clicked");
    document.getElementById("click_space").style.backgroundColor = "white";
    let clickedTime = performance.now();
    resolve(clickedTime);
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getTime() {
    let d = new Date();
    return d.getTime();
}

window.onload = function () {
    let startStopBtn = document.querySelector("#start-stop-btn");
    startStopBtn.addEventListener("click", async function () {
        console.log("toggle");
        for (let i = 0; i < 10; i++) {
            if (startStopBtn.checked === false) {
                console.log("break");
                break
            }
            await changeBackgroudColor();
        }
    })
}