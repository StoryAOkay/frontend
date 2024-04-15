import React from "react";
import axios from "../axios";

let CurStoryContext = React.createContext(null);

const base_url = process.env.REACT_APP_BASE_URL;

export function CurStoryProvider({ children }) {
  let [bookInfo, setBookInfo] = React.useState(null);
  let [pages, setPages] = React.useState(null)
  const setCurStoryNull = ()=>setBookInfo(null);
  const setCurBookInfo = (info) => {
    if (Object.keys(info).length == 0) {
      setBookInfo(null);
      return;
    }

    setBookInfo({...info,
        title: info.title,
        image: info.image,
        description: info.description,
        id: info.id
    })
  }
  const getBookInfo = React.useCallback(async(book_id)=>{
    if (Object.keys(bookInfo).length > 0 &&  bookInfo.id == book_id){
        return
    }

    await axios()
      .get(`${base_url}/stories/${book_id}`)
      .then((res) => {
        setBookInfo({...res.data,
            title: res.data.title,
            image: res.data.image,
            description: res.data.description,
            id: res.data.id
        })
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, [])
  
  const value = React.useMemo(() => ({
    bookInfo,
    getBookInfo,
    setCurBookInfo,
    setCurStoryNull
  }), [bookInfo, getBookInfo,setCurBookInfo, setCurStoryNull]);
  
  return <CurStoryContext.Provider value={value}>{children}</CurStoryContext.Provider>;
}
export function useCurStory() {
  return React.useContext(CurStoryContext);
}
