const bubbleCount = 20;

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  const size = Math.random() * 50 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${6 + Math.random() * 4}s`;
  document.body.appendChild(bubble); 

  bubble.addEventListener("animationend", () => {
    bubble.remove();
    createBubble();
  });
}

for (let i = 0; i < bubbleCount; i++) createBubble();

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    document.querySelectorAll(".bubble").forEach((bubble) => {
      const rect = bubble.getBoundingClientRect();
      const fragmentCount = 6 + Math.floor(Math.random() * 6);

      for (let i = 0; i < fragmentCount; i++) {
        const fragment = document.createElement("div");
        fragment.classList.add("fragment");
        fragment.style.left = `${rect.left + rect.width / 2}px`;
        fragment.style.top = `${rect.top + rect.height / 2}px`;
        document.body.appendChild(fragment);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 50;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        fragment.animate(
          [
            { transform: `translate(0, 0)`, opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
          ],
          { duration: 800, easing: "ease-out" }
        ).onfinish = () => fragment.remove();
      }

      bubble.remove();
      createBubble();
    });
  }
});

const audio = document.getElementById("bg-audio");
let audioCtx, analyser, dataArray, source;

function setupAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  source = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

audio.addEventListener("play", () => {
  if (!audioCtx) setupAudio();
});

function pulseBubblesWithBeat() {
  if (!analyser) return;
  analyser.getByteFrequencyData(dataArray);
  let avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

  bubbles.forEach(bubble => {
    bubble.size = bubble.baseSize + Math.sin(avg / 15) * 3;
  });

  requestAnimationFrame(pulseBubblesWithBeat);
}

pulseBubblesWithBeat();
audio.muted = false;



