async function changeBackgroudColor() {
    let randomNum = random(1000, 5000);
    console.log(`waiting ${randomNum} ms...`)
    await sleep(randomNum);
    if (!document.getElementById("start-stop-btn").checked) {
        return
    }
    console.log("change color");
    document.getElementById("click_space").style.backgroundColor = "red";
    let changedTime = performance.now();

    let clickedTime = await clickWaiter();

    let score = clickedTime - changedTime;
    showTime(score);
    saveTime(score);
}

function showTime(time) {
    const pastTime = JSON.parse(localStorage.getItem("score"));
    if (pastTime == null) {
        let text = `${time}ms`;
        document.getElementById("time").innerHTML =text;
        console.log(`time: ${text}`);
    } else {
        let lastTime = pastTime[pastTime.length - 1].score;
        let diffTime = time - lastTime;
        let diffTimeText = diffTime >= 0 ? `+${diffTime}` : `${diffTime}`;
        let text = `${time}ms (${diffTimeText}ms)`;
        document.getElementById("time").innerHTML =text;
        console.log(`time: ${text}`);
    }
}

function saveTime(time) {
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

function refreshChart() {
    let json_score = JSON.parse(localStorage.getItem("score"));
    if (json_score == null) {
        return
    }

    let labels = [];
    let data = [];

    json_score.forEach(element => {
        labels.push(new Date(element.timestamp).toLocaleTimeString());
        data.push(element.score);
    });

    let ctx = document.getElementById("chart");
    let chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "reaction speed",
                    data: data,
                    borderColor: "rgba(255,0,0,1)",
                    backgroundColor: "rgba(0,0,0,0)"
                }
            ]
        }
    }
    )
    chart.canvas.parentNode.style.width = "90%";
}

window.onload = function () {
    refreshChart();

    let startStopBtn = document.querySelector("#start-stop-btn");
    startStopBtn.addEventListener("click", async function () {
        console.log("toggle");
        // for (let i = 0; i < 10; i++) {
        while (true) {
            if (startStopBtn.checked === false) {
                console.log("break");
                break
            }
            await changeBackgroudColor();
            refreshChart();
        }
    })
}

document.getElementById("storageClear").addEventListener("click", function(){
	localStorage.clear();
	refreshChart();
})

document.addEventListener("touchmove", function (e) {
    e.preventDefault();
}, { passive: false });
