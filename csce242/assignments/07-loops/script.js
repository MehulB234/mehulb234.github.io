document.addEventListener("DOMContentLoaded", function () {

  const water = document.getElementById("water");
  const bubbleCount = 20;

  for (let i = 0; i < bubbleCount; i++) {

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 17 + 8;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.left = Math.random() * 80 + 10 + "%";

    const startBottom = Math.random() * 20 + 8;
    bubble.style.setProperty("--b-start", startBottom + "%");

    const speed = Math.random() * 5 + 5;

    const delay = -Math.random() * speed;

    bubble.style.animation =
      "floatUp " + speed + "s linear " + delay + "s infinite, " +
      "drift 4s ease-in-out " + delay + "s infinite";

    water.appendChild(bubble);
  }

});
