// setInterval'ın referansını saklayacağımız değişken
let countdownInterval = null;
// DOM elementlerimiz
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
const audio = document.querySelector('audio')
// <form name="customForm" id="custom">
// form elementimiz "customForm name attribute'una sahip olduğu için 
// document.querySelector('#custom" yerine 
// aşağıdaki şekilde seçebiliriz
// üstelik bu form içinde yer alan inputumuza da form.minutes ile erişebiliriz
const form = document.customForm


function countdown(seconds) {
  // varolan bir sayaç varsa onu silelim 
  // aksi takdirde birden fazla sayaç olacaktır
  clearInterval(countdownInterval)

  //fonksiyon başladığı andaki tarihi ve bitmesi gereken tarihi tanımlayalım
  const now = Date.now()
  const then = now + seconds * 1000

  // kalan zamanı göstermeye yarayan fonksiyonu çağıralım
  displayTimeLeft(seconds);
  // bitiş tarihini göstermeye yarayan fonksiyonu çağıralım
  displayEndTime(then)

  countdownInterval = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    // saniye 0'dan küçük olduğunda sayacı durduralım
    // ve sesi oynatalım
    if (secondsLeft < 0) {
      audio.play()
      clearInterval(countdownInterval)
      return
    }
    // her saniye kalan zamanı güncelleyelim
    displayTimeLeft(secondsLeft);

  }, 1000)
}

//kalan zamanı gösteren fonksiyon
function displayTimeLeft(seconds) {
  // Math.floor ile artık saniyeleri dikkate almadan tam dakikaları bulalım
  const minutes = Math.floor(seconds / 60);
  // artık saniyeleri saklayalım
  const remainderSeconds = seconds % 60;

  // kalan sürenin gösterileceği formatı ayarlayalım
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`

  //sayfanın başlığını ve zamanı gösterdiğimiz elementin içeriğini güncelleyelim
  document.title = display
  timerDisplay.textContent = display
}

// bitiş zamanını gösteren fonksiyon
function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`
}


// butonlara tıklandığında sayaç başlatacak fonksiyon
function startTimer() {
  const seconds = parseInt(this.dataset.time)
  countdown(seconds)
}


buttons.forEach(button => button.addEventListener('click', startTimer))

form.addEventListener('submit', function(e) {
  // formun varsayılan davranışı url'ye parametre ekleyip sayfayı yenilemek olacaktır bunu engelleyelim
  e.preventDefault()
  // 'minutes' name'ine sahip inputtan girilen değeri alalım
  const mins = this.minutes.value
  // sayacı başlatalım
  countdown(mins * 60)
  // sayaç başlatıldıktan sonra form verilerini silelim
  this.reset()
})
