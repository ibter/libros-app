import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "../api/books";
import "./App.css";
import Header from "./Header";
import AddBook from "./AddBook";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import EditBook from "./EditBook";

function App() {
  const LOCAL_STORAGE_KEY = "books";
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //RetrieveBooks
  const retrieveBooks = async () => {
    const response = await api.get("/books");
    return response.data;
  };

  const addBookHandler = async (book) => {
    console.log(book);
    const request = {
      id: uuid(),
      ...book,
    };

    const response = await api.post("/books", request);
    console.log(response);
    setBooks([...books, response.data]);
  };

  const updateBookHandler = async (book) => {
    const response = await api.put(`/books/${book.id}`, book);
    const { id, name, category } = response.data;
    setBooks(
      books.map((book) => {
        return book.id === id ? { ...response.data } : book;
      })
    );
  };

  const removeBookHandler = async (id) => {
    await api.delete(`/books/${id}`);
    const newBookList = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(newBookList);
  };

  useEffect(() => {
    // const retriveBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveBooks) setBooks(retriveBooks);
    const getAllCOntacts = async () => {
      const allBooks = await retrieveBooks();
      if (allBooks) setBooks(allBooks);
    };

    getAllCOntacts();
  }, []);
  
  const searchHandler = (searchTerm) => {

    //console.log(searchTerm);
    setSearchTerm(searchTerm);
     
    if (searchTerm !== "") {
      const newBookList = books.filter((book) => {

        //console.log(Object.values(book).join(" "));
        return Object.values(book)
        .join(" ")
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase());

      });
      setSearchResults(newBookList);
    }
    else{
      setSearchResults(books);

    }

  };

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <BookList
                {...props}
                books={searchTerm.length < 1 ? books : searchResults}
                getBookId={removeBookHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddBook {...props} addBookHandler={addBookHandler} />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditBook
                {...props}
                updateBookHandler={updateBookHandler}
              />
            )}
          />

          <Route path="/book/:id" component={BookDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
