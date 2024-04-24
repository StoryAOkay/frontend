import React from "react";
import axios from "../axios";
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import getHtmlContent from "../Helpers/CustomHtml";
import { withImages } from "../Editor/ImageEditor";

let CurStoryContext = React.createContext(null);

const base_url = process.env.REACT_APP_BASE_URL;

export function CurStoryProvider({ children }) {
  let [bookInfo, setBookInfo] = React.useState(null);
  let [pages, setPages] = React.useState(null)
  let [pageContent, setPageContent] = React.useState('')
  let [content, setContent] = React.useState({})
  const editor = React.useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  )
   const setCurStoryNull = () => setBookInfo(null);
  const setCurBookInfo = (info) => {
    if ( info && Object.keys(info).length == 0) {
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
  const getPageContent =(pageNum)=>{
    if(pages && Object.keys(pages).length > 0 && pageNum in pages){
      setPageContent(pages[pageNum])
    }
    
  }
  const getAllPages  = React.useCallback(async (bookId)=>{
    let  initialPages ;
    await axios()
    .get(`${base_url}/stories/${bookId}/pages`)
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

  }, [bookInfo])
  const getBookInfo = React.useCallback(async (book_id) => {
    if (bookInfo && Object.keys(bookInfo).length > 0 && bookInfo.id == book_id) {
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
    const html_content = getHtmlContent(content, 1)
    let pageN;
    await axios()
      .post(`${base_url}/stories/${book_id}/pages`, { content: content, html_content: html_content })
      .then((res) => {
        setPageContent({
          id: res.data.id,
          content: res.data.content,
          html_content: res.data.html_content,
          page_number: res.data.pageNumber
        })
            pageN = res.data.pageNumber
        setPageContent({...pages, pageN: pageContent})
      })
      .catch((error) => {

        alert(error.response.data.message);
      });
  }
  const updatePage = async () => {
    const html_content = getHtmlContent(content, pageContent.pageNumber)
    let pageN;

    await axios()
      .put(`${base_url}/pages/${pageContent.id}`, {...pageContent, content: content, html_content: html_content })
      .then((res) => {
        setPageContent({
          id: res.data.id,
          content: res.data.content,
          html_content: res.data.html_content,
          page_number: res.data.pageNumber
        })
        pageN = res.data.pageNumber
        setPages({...pages, pageN: pageContent})
      })
      .catch((error) => {

        alert(error.response.data.message);
      });
  }
const finishStory = async()=>{
 
  await axios()
      .put(`${base_url}/pages/stories/${bookInfo.id}`, {isEnd: true })
      .then((res) => {
              })
      .catch((error) => {

        alert(error.response.data.message);
      });
}
  const value = React.useMemo(() => ({
    bookInfo,
    getBookInfo,
    setCurBookInfo,
    setCurStoryNull,
    pages,
    createPage,
    updatePage,
    getAllPages,
    pageContent,
    setPageContent,
    getPageContent,
    editor,
    content,
    setContent,
    finishStory,
    setPages

  }), [bookInfo, getBookInfo, setCurBookInfo, setCurStoryNull, pages, createPage, updatePage, getAllPages, setPageContent, pageContent, getPageContent, editor,content, setContent, finishStory,setPages]);

  return <CurStoryContext.Provider value={value}>{children}</CurStoryContext.Provider>;
}
export function useCurStory() {
  return React.useContext(CurStoryContext);
}
