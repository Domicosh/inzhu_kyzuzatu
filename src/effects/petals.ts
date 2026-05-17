export function startPetals() {
  if (typeof window === "undefined") return;

  const interval = setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "petal";

    const size = 6 + Math.random() * 14;
    petal.style.width = size + "px";
    petal.style.height = size + "px";

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (4 + Math.random() * 4) + "s";

    document.body.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 9000);
  }, 150);

  return interval;
}