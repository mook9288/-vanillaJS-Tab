(() => {  

  const thisImgArray = [];
  // const thisImgSrcArray = [];
  let imgIdx = 0;
  // let imgArrIdx = 0;
  const canvas = document.querySelector('.canvas-img');
  const ctx = canvas.getContext('2d');
  const currentImg = [];

  const imageWidth = 1440;
  const imageHeight = 810;
  const kvHeightPer = imageHeight / imageWidth;

  const canvasWidth = canvas.offsetWidth;
  const canvasHeight = (canvas.offsetWidth * kvHeightPer).toFixed();

  document.querySelector('.canvas-img').setAttribute('width', canvasWidth);
  document.querySelector('.canvas-img').setAttribute('height', canvasHeight);

  for (let i = 1; i <= 65; i++){
    currentImg[i] = new Image();
    currentImg[i].src = './images/test-'+i+'.jpg';
    thisImgArray.push(currentImg[i]);
  }

  const firstPlay = function () {
    const firstPlaySet = setInterval(() => {
      const thisJPImg = thisImgArray[imgIdx];
      ctx.drawImage(thisJPImg, 0, 0, canvasWidth, canvasHeight );
      imgIdx++;

      if(imgIdx >= 65) {
        // clearInterval(firstPlaySet);
        imgIdx = 0;
      }
    }, 80);

    // clearInterval(firstPlaySet);
  }

  firstPlay();
})();
 