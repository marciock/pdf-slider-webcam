const myPDFViewer=(url)=>{

//  let pageIndex=1;
  pdfjsLib.getDocument(url).then(doc=>{

  
    const countPages=doc.numPages;
    console.log(`paginas - ${countPages}`)

      render(doc,pageIndex)


      btnForward.addEventListener('click',()=>{
        if(pageIndex !==countPages){
          pageIndex ++;
        }
        render(doc,pageIndex);
      })
      btnBack.addEventListener('click',()=>{
        if(pageIndex !==1 ){
          pageIndex --;
        }
         render(doc,pageIndex);
      })
      maximize.addEventListener('click',()=>{
        renderMaximize(doc,pageIndex)
      })

      document.querySelector('body').addEventListener('keydown',(e)=>{
        let key=e.keyCode;
        if(key===37){
          if(pageIndex !==1 ){
            pageIndex --;
          }
           render(doc,pageIndex);
          
        }
        if(key===39){

          if(pageIndex !==countPages){
            pageIndex ++;
          }
          render(doc,pageIndex);
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


