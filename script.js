document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector("button");

  btn.addEventListener("click", function () {
    alert("Mock Test जल्द शुरू होगा!");
  });

  let time = 30 * 60;

  const timer = document.createElement("h3");
  timer.id = "timer";
  document.body.insertBefore(timer, btn);

  function updateTimer() {
    let min = Math.floor(time / 60);
    let sec = time % 60;

    timer.innerHTML =
      "⏱ Time Left: " +
      String(min).padStart(2, "0") +
      ":" +
      String(sec).padStart(2, "0");

    if (time > 0) {
      time--;
    } else {
      clearInterval(interval);
      alert("Time Over!");
    }
  }

  updateTimer();
  const interval = setInterval(updateTimer, 1000);
});
