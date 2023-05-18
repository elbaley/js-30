const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  // tarayıcıdan kamera izni istiyoruz promise dönüyor olumlu olduğu durumda video elementimiz 
  // içerisinde gösterilmesini sağlıyoruz
  navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then(localMediaStream => {
      video.srcObject = localMediaStream
      video.play()
    }).catch(err => {
      console.log(err);
    })
}

function paintToCanvas(){

  // const width = video.videoWidth;
  // const height= video.videoHeight;
  // yukarıdaki işlemi es6 desctructuring assigment özelliği ile tek satırda yapabiliriz
  const {videoWidth:width,videoHeight:height} = video

  canvas.width = width;
  canvas.height= height;


return  setInterval(()=> {
    // resmi canvas'ta gösterelim
    ctx.drawImage(video,0,0,width,height)
    let pixels = ctx.getImageData(0,0,width,height)
    ctx.putImageData(pixels,0,0)
    

  },16)
}

function takePhoto(){
  // deklanşör sesini oynat
  snap.currentTime= 0;
  snap.play()

  // canvastaki resmi bir URL'e dönüştür
  const data = canvas.toDataURL('image/jpeg')

  // tıklanınca indirilebilecek bir a elementi yarat 
  const link = document.createElement('a')
  link.href = data
  // indirilecek dosya adını burada belirliyoruz
  link.setAttribute('download','photo')
  link.innerHTML = `<img  src=${data} alt="photo" />` 
  strip.insertBefore(link,strip.firstChild)
}



getVideo()

// Kamera izni alındıktan sonra ve kameradan görüntü alınabildiği sürece paintToCanvas fonksiyonumuz çalıştırılacaktır
video.addEventListener('canplay',paintToCanvas)


