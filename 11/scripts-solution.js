// Elementlerimizi alalım
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const toggleFullscreeen = document.querySelector(".toggle-fullscreen");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Fonksiyonlarımızı oluşturalım
function togglePlay() {
  // Video duraklatıldıysa oynatır oynuyorsa duraklatır.
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  // Oynatma/duraklatma butonunun içindeki ikonu günceller
  const icon = this.paused ? "⏵" : "⏸";
  toggle.textContent = icon;
}

function skip() {
  // Butonun sahip olduğu "data-skip" özelliği kadar ileri/geri alır. 
  const skipAmount = parseFloat(this.dataset.skip);
  video.currentTime += skipAmount;
}

function handleRangeUpdate() {
  // Ses ve oynatma hızını günceller
  video[this.name] = this.value;
}

function handleProgress() {
  // Video ilerleme çubuğunu günceller
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  // İlerleme çubuğuna tıklanıldığında videoyu ilgili yere alır
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Olay dinleyicilerini ekleyelim
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);

skipButtons.forEach((skipButton) => skipButton.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

toggleFullscreeen.addEventListener("click", () => {
  // Tam ekran modunu açar/kapatır
  if (!video.fullscreenElement) {
    video.requestFullscreen();
  } else if (video.exitFullscreen) {
    video.exitFullscreen();
  }
});

