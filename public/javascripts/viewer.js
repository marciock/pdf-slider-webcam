const myPDFViewer=(url)=>{

    //  let pageIndex=1;
      pdfjsLib.getDocument(url).then(doc=>{
    
      
        const countPages=doc.numPages;
        console.log(`paginas - ${countPages}`)
    
          render(doc,this.pageIndex)
    
    
          btnForward.addEventListener('click',()=>{
            if(pageIndex !==countPages){
              pageIndex ++;
            }
            render(doc,this.pageIndex);
          })
          btnBack.addEventListener('click',()=>{
            if(pageIndex !==1 ){
              pageIndex --;
            }
             render(doc,this.pageIndex);
          })
          maximize.addEventListener('click',()=>{
            renderMaximize(doc,this.pageIndex)
          })
          camera.addEventListener('click',()=>{


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
                        this.pageIndex --;
                        render(doc,this.pageIndex);
                        
                      }
                      if(midval<300){
                        
                        this.pageIndex ++;

                        render(doc,this.pageIndex);
                      //  console.log('direita',pageIndex)
                        //return this.pageIndex;
                       
                      }
                    } 
                     
            
            
                    }
            
            
                  })
              }
            
            const getPageIndex=(id)=>{
              let myId=id;
              return myId;
            }

            handTrack.load(modelParams)
            .then(lmodel=>{
          
              console.log(lmodel)
              model=lmodel;
            })
          
            
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







                startVideo();
            
            
             
          })
    
          document.querySelector('body').addEventListener('keydown',(e)=>{
            let key=e.keyCode;
            if(key===37){
              if(this.pageIndex !==1 ){
                this.pageIndex --;
              }
               render(doc,this.pageIndex);
              
            }
            if(key===39){
    
              if(this.pageIndex !==countPages){
                this.pageIndex ++;
              }
              render(doc,this.pageIndex);
            }
            
          })
    
      })

    
    
    }


    
    
    const renderMaximize=(doc,index)=>{
      doc.getPage(index).then(page=>{
        const canvasPDF=document.getElementById('canvas-pdf');
        const context=canvasPDF.getContext('2d');
        let viewport=page.getViewport(2);
        canvasPDF.width=viewport.width;
        canvasPDF.height=viewport.height;
        canvasPDF.requestFullscreen()
        page.render({
          canvasContext:context,
          viewport:viewport
        })
      })
    }

    const render=(doc,index)=>{
      doc.getPage(index).then(page=>{
      const canvasPDF=document.getElementById('canvas-pdf');
      const context=canvasPDF.getContext('2d');
      let viewport=page.getViewport(1);
      canvasPDF.width=viewport.width;
      canvasPDF.height=viewport.height;
     // canvasPDF.requestFullscreen()
      page.render({
        canvasContext:context,
        viewport:viewport
      })
    })
    }
    
    
    