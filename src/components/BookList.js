import React, {useRef} from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";


const BookList = (props) => {
  console.log(props);

  const inputEl = useRef("");
  const deleteConactHandler = (id) => {
    props.getBookId(id);
  };

  const renderBookList = props.books.map((book) => {
    return (
      <BookCard
        book={book}
        clickHander={deleteConactHandler}
        key={book.id}
      />
    );
  });

  const getSearchTerm = () => {

    //console.log(inputEl.current.value);
    props.searchKeyword(inputEl.current.value);

  };


  return (
    <div className="main">
      <h2>
        Book List
        <Link to="/add">
          <button className="ui button blue right">Add Book</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input ref= {inputEl} type="text" placeholder="type a word" className="promt" value={props.term} onChange={getSearchTerm}/>
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderBookList}</div>
    </div>
  );
};

export default BookList;
