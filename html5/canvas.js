(() => {  

  const thisImgJPGSrcArray = [];
  
  let imgIdx = 0;
  let imgArrIdx = 0;
  const canvas = document.querySelector('.canvas-img');
  const ctx = canvas.getContext('2d');
  const imageWidth = 1440;
  const imageHeight = 810;
  const kvHeightPer = imageHeight / imageWidth;

  const canvasWidth = canvas.offsetWidth;
  const canvasHeight = (canvas.offsetWidth * kvHeightPer).toFixed();

  document.querySelector('.canvas-img').setAttribute('width', canvasWidth);
  document.querySelector('.canvas-img').setAttribute('height', canvasHeight);

  const load = function () {
    
    const forLoad = function () {
      const currentImgJPG = new Image();
      const frameNum = 65;
      const frameNumArrSize = frameNum - 1;
      const imageFileName = './images/test-numbering0.jpg';
      
      // const fileNumber = imageFileName.replace(/[^-]/g, "");
      const fileSrc = imageFileName.split("numbering0")[0];
      const fileType = imageFileName.split("numbering0")[1];
      
      // for (let frameIdx = 1; frameIdx <= frameNum; frameIdx++) {
      //   console.log(frameNum[frameIdx]);
      //   currentImgJPG.src = fileSrc + frameNum[frameIdx] + fileType;
      //   thisImgJPGSrcArray.push(currentImgJPG.src[1]);
      // }

      [...Array(frameNum)].forEach(() => {
        imgIdx++;
        currentImgJPG.src = fileSrc + imgIdx + fileType;
        thisImgJPGSrcArray.push(currentImgJPG);
        // console.log(currentImgJPG.src);
      });
      console.log(thisImgJPGSrcArray[0]);

      [...Array(frameNumArrSize)].forEach(() => {
        imgArrIdx++;
        thisImgJPGSrcArray[imgArrIdx].onload = function () {
          ctx.drawImage(thisImgJPGSrcArray[0], 0, 0, canvasWidth, canvasHeight);
        }
      });

      // thisImgJPGSrcArray[4].onload = function () {
      //   ctx.drawImage(thisImgJPGSrcArray[4], 0, 0, canvasWidth, canvasHeight);
      // };
    }
		forLoad();
  }
  load();
})();
