(() => {
  const imageWidth = 1440;
  const imageHeight = 810;
  const kvHeightPer = imageHeight / imageWidth;
  
  const canvas = document.querySelector('.canvas-img');
  const ctx = canvas.getContext('2d');
  const arrImage = [];
  
  const canvasWidth = canvas.offsetWidth;
  const canvasHeight = (canvas.offsetWidth * kvHeightPer).toFixed();
  
  document.querySelector('.canvas-img').setAttribute('width', canvasWidth);
  document.querySelector('.canvas-img').setAttribute('height', canvasHeight);

  const img = new Image();
  img.src = './images/test-1.jpg';
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  };

})();
