import React from "react";
import axios from "../axios";
import getHtmlContent from "../Helpers/CustomHtml";

let CurStoryContext = React.createContext(null);

const base_url = process.env.REACT_APP_BASE_URL;

export function CurStoryProvider({ children }) {
  let [bookInfo, setBookInfo] = React.useState(null);
  let [pages, setPages] = React.useState({})
  const setCurStoryNull = () => setBookInfo(null);
  const setCurBookInfo = (info) => {
    if (Object.keys(info).length == 0) {
      setBookInfo(null);
      return;
    }

    setBookInfo({
      title: info.title,
      image: info.image,
      description: info.description,
      id: info.id
    })
  }
  const getAllPages  = async ()=>{
    let  initialPages ;
    await axios()
    .get(`${base_url}/stories/${bookInfo.id}/pages`)
    .then((res) => {
      
        initialPages = res.data.reduce((acc, curr) => {
        acc[curr.pageNumber] = curr;
        return acc;
        
      }, {});
      setPages(initialPages);  

      })
    .catch((error) => {
      alert(error.response.data.message);
    });

  }
  const getBookInfo = React.useCallback(async (book_id) => {
    if (Object.keys(bookInfo).length > 0 && bookInfo.id == book_id) {
      return
    }

    await axios()
      .get(`${base_url}/stories/${book_id}`)
      .then((res) => {
        setBookInfo({
          ...res.data,
          title: res.data.title,
          image: res.data.image,
          description: res.data.description,
          id: res.data.id,
          author_name: res.data.author_name,
          author_age: res.data.age
        })
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, [])
  const createPage = async (book_id) => {
    const content = sessionStorage.getItem("content")
    const jcontent = JSON.parse(content)
    const html_content = getHtmlContent(jcontent)

    // await axios()
    //   .post(`${base_url}/stories/${book_id}/pages`, { content: content, html_content: html_content })
    //   .then((res) => {
    //     setPage({
    //       ...res.data,
    //       id: res.data.id,
    //       content: res.data.content,
    //       html_content: res.data.html_content,
    //       page_number: res.data.pageNumber
    //     })
          //  pageNumber  = res.data.pageNumber
    //     setPages({...pages, pageNumber: page})
    //   })
    //   .catch((error) => {

    //     alert(error.response.data.message);
    //   });
  }
  const updatePage = async () => {
    const content = sessionStorage.getItem("content")
    const jcontent = JSON.parse(content)
    const html_content = getHtmlContent(jcontent)
    // await axios()
    //   .put(`${base_url}/pages/${page.id}`, { content: content, html_content: html_content })
    //   .then((res) => {
    //     setPage({
    //       ...res.data,
    //       id: res.data.id,
    //       content: res.data.content,
    //       html_content: res.data.html_content,
    //       page_number: res.data.pageNumber
    //     })
    //     pageNumber = res.data.pageNumber
    //     setPages({...pages, pageNumber: page})
    //   })
    //   .catch((error) => {

    //     alert(error.response.data.message);
    //   });
  }

  const value = React.useMemo(() => ({
    bookInfo,
    getBookInfo,
    setCurBookInfo,
    setCurStoryNull,
    pages,
    createPage,
    updatePage,
    getAllPages
  }), [bookInfo, getBookInfo, setCurBookInfo, setCurStoryNull, pages, createPage, updatePage, getAllPages]);

  return <CurStoryContext.Provider value={value}>{children}</CurStoryContext.Provider>;
}
export function useCurStory() {
  return React.useContext(CurStoryContext);
}
