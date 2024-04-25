import axios from "../axios";
const base_url = process.env.REACT_APP_BASE_URL;
export const prepareHtml = async (bookId)=>{
    let count = 0
    let d ={}
    console.log({bookId})
    await axios()
      .get(`${base_url}/stories/${bookId}`)
      .then((res) => {
        d[count] = res.data.html_content
        count += 1
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
      await axios()
      .get(`${base_url}/stories/${bookId}/pages`)
      .then((res) => {        
           
        for (let page of res.data){
            d[count]= page.html_content
            count += 1
        }
        })
      .catch((error) => {
        alert(error.response.data.message);
      });
    if (count % 2 == 0){
        d[count] = ''
        count += 1
        console.log('ran', d)
    }
    d[count] =  `<center style="margin: 120px auto; color: #fff;">&copy; 2024 StoryNasi</center>`
    const pages = count > 2 ? new Array(count - 1).fill('white') : [];
 
    pages.unshift( "#662e9b")
    pages.push( "#662e9b")
    return [d, pages]
}