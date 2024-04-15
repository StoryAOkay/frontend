import React from "react";
import axios from "../axios";
import { useAuth } from "./AuthContext";

let MyBooksContext = React.createContext(null);

const base_url = process.env.REACT_APP_BASE_URL;

export function MyBooksProvider({ children }) {
  let [myBooks, setBooks] = React.useState([]);
  const setMyBooks = (book) => {
    if (Object.keys(book).length == 0) {
      setBooks(null);
      return;
    }
    setBooks([...myBooks,
    book
    ])
  }
  const getMyBooks = React.useCallback(async()=>{
    await axios()
      .get(`${base_url}/stories/users`)
      .then((res) => {
        setBooks(res.data)
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, [])
  
  const value = React.useMemo(() => ({
    myBooks,
    getMyBooks,
    setMyBooks,
  }), [myBooks, getMyBooks,setMyBooks]);
  
  return <MyBooksContext.Provider value={value}>{children}</MyBooksContext.Provider>;
}
export function useMyBooks() {
  return React.useContext(MyBooksContext);
}
