function removeEscapeCharacters(htmlString) {
    const parser = new DOMParser();
  

    const doc = parser.parseFromString(htmlString, "text/html");
 
    const body = doc.body;
  
    for (let i = 0; i < body.childNodes.length; i++) {
      const node = body.childNodes[i];
  
      if (node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = node.nodeValue.replace(/\\/g, ""); 
      }
    }
  
    return body.innerHTML;
  }
  
 
  
export default function getHtmlContent(content){
    let txt = ''
    
    for (let child of content ){

        let cnt =''
        if(child.type == "paragraph"){
            cnt += '<p>'
            for (let grandChild of child['children']){
                if(!grandChild.text){
                    continue
                }
                
                if (grandChild  && Object.keys(grandChild).includes('bold') && Object.keys(grandChild).includes('italic') && Object.keys(grandChild).includes('underline')){
                    if (grandChild.text){
                        cnt += `<span style="font-weight:bold; font-style: italic; text-decoration: underline;"}>${grandChild.text}</span>`
                    }
                    
                }
                if (grandChild && Object.keys(grandChild).includes('bold') && Object.keys(grandChild).includes('underline')){
                    if (grandChild.text){
                        cnt += `<span style="font-weight:bold; text-decoration: underline;">${grandChild.text}</span>`
                    }
                    
                }
                if ( grandChild  && Object.keys(grandChild).includes('bold') && Object.keys(grandChild).includes('italic')){
                    if (grandChild.text){
                        cnt += `<span style="font-weight:bold; font-style: italic;">${grandChild.text}</span>`
                    }
                    
                }
                if (grandChild && Object.keys(grandChild).includes('italic') && Object.keys(grandChild).includes('underline')){
                    if (grandChild.text){
                        cnt += `<span style="font-style: italic; text-decoration: underline;">${grandChild.text}</span>`
                    }
                    
                }
                if (grandChild && Object.keys(grandChild).includes('bold') ){
                    if (grandChild.text){
                        cnt += `<span style="font-weight:bold;">${grandChild.text}</span>`
                    }
                    
                }
                if (grandChild && Object.keys(grandChild).includes('italic') ){
                    if (grandChild.text){
                        cnt += `<span style="font-style: italic;">${grandChild.text}</span>`
                    }
                    
                }
                if ( grandChild && Object.keys(grandChild).includes('underline')){
                    if (grandChild.text){
                        cnt += `<span style="text-decoration: underline;">${grandChild.text}</span>`
                    }
                   
                }else{
                    if (grandChild.text){
                        cnt += `${grandChild.text}`
                    }
                    
                }
            }
            cnt +='</p>'
        }else if(child.type == "image"){
            cnt += `<img src="${child.url}" />`
        }
        txt += cnt

    }
    let res = removeEscapeCharacters(txt)
   
    return res
}