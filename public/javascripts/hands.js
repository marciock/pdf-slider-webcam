
/*const modelParams = {
  flipHorizontal: true, // flip e.g for video  
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
} */
const modelParams = {
  flipHorizontal: false,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}



const video=document.getElementById('video');
const canvas=document.getElementById('canvas');
const handContext=canvas.getContext('2d');

navigator.getUserMedia=navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ;

let model;



handTrack.load(modelParams)
  .then(lmodel=>{

    console.log(lmodel)
    model=lmodel;
  })


  const runDetection=()=>{
    model.detect(video)
      .then(predictions =>{

        console.log(predictions)

        if(predictions.length >0){
          
          console.log('passou a mão')
        }

        if(predictions[0]){
         let midval=predictions[0].bbox[0] + (predictions[0].bbox[0] /2);

          console.log(midval);
        if(midval !==0){
          if(midval>300){
            console.log('esquerda');
            
          }
          if(midval<300){
            
            this.pageIndex ++;
          //  console.log('direita',pageIndex)
            return this.pageIndex;
           
          }
        } 
         


        }


      })
  }

const getPageIndex=(id)=>{
  let myId=id;
  return myId;
}

  const startVideo=()=>{
    return handTrack.startVideo(video)
  .then(status =>{
    if(status){

      navigator.getUserMedia({video:{}},stream =>{
        video.srcObject=stream;
        setInterval(runDetection,1000)


      },
      err=>console.log(err)
      )
    }
  })

  }

 

  
 
/*camera.addEventListener('click',()=>{
  startVideo();
})*/

