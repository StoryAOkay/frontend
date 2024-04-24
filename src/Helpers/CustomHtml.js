function removeEscapeCharacters(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const body = doc.body;
  
    // Replace backslashes
    for (let i = 0; i < body.childNodes.length; i++) {
      const node = body.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = node.nodeValue.replace(/\\/g, "");
      }
    }
  
    // Decode HTML entities
    const decodedHTML = body.innerHTML
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  
    return decodedHTML;
  }
  
 
  
export default function getHtmlContent(jsonString, pageNum){
    const content = JSON.parse(jsonString);
    let txt = ''
    
    for (let child of content ){

        let cnt =''
        if(child.type == "paragraph"){
            cnt += '<p class="tpadding">'
            for (let grandChild of child['children']){
                if(!grandChild.text){
                    continue
                }
                
                else if (grandChild  && Object.keys(grandChild).includes('bold') && Object.keys(grandChild).includes('italic') && Object.keys(grandChild).includes('underline')){
                    if (grandChild.text){
                        cnt += `<span class='tbold titalics tunderlined 'style="font-weight:bold; font-style: italic; text-decoration: underline;"}>${grandChild.text}</span>`
                    }
                    
                }
                else if (grandChild && Object.keys(grandChild).includes('bold') && Object.keys(grandChild).includes('underline')){
                    if (grandChild.text){
                        cnt += `<span class='tbold tunderlined'>${grandChild.text}</span>`
                    }
                    
                }
                else if ( grandChild  && Object.keys(grandChild).includes('bold') && Object.keys(grandChild).includes('italic')){
                    if (grandChild.text){
                        cnt += `<span class='tbold titalics'>${grandChild.text}</span>`
                    }
                    
                }
                else if (grandChild && Object.keys(grandChild).includes('italic') && Object.keys(grandChild).includes('underline')){
                    if (grandChild.text){
                        cnt += `<span class='titalics tunderlined'>${grandChild.text}</span>`
                    }
                    
                }
                else if (grandChild && Object.keys(grandChild).includes('bold') ){
                    if (grandChild.text){
                        cnt += `<span class='tbold'>${grandChild.text}</span>`
                    }
                    
                }
                else if (grandChild && Object.keys(grandChild).includes('italic') ){
                    if (grandChild.text){
                        cnt += `<span class='titalics'>${grandChild.text}</span>`
                    }
                    
                }
                else if ( grandChild && Object.keys(grandChild).includes('underline')){
                    if (grandChild.text){
                        cnt += `<span class='underlined'>${grandChild.text}</span>`
                    }
                   
                }else{
                    if (grandChild.text){
                        cnt += `${grandChild.text}`
                    }
                    
                }
            }
            cnt +='</p>'
        }else if(child.type == "image"){
            cnt += `<p><img src="${child.url}" /></p>`
        }
        
        txt += cnt

    }
    let res = removeEscapeCharacters(`<p class='number'>${pageNum}</p>` + txt)
   
    return res
}