document.addEventListener("DOMContentLoaded", function () {
    let time = 30 * 60;

    const timer = document.createElement("h3");
    document.body.insertBefore(timer, document.querySelector("a"));

    function updateTimer() {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        timer.innerHTML = "⏱ Time Left: " +
            String(min).padStart(2, "0") + ":" +
            String(sec).padStart(2, "0");

        if (time > 0) time--;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
});
