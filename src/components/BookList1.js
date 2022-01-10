import React from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import reactPaginate from "react-paginate"

const BookList = (props) => {
  console.log(props);
  
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
  return (
    <div className="main">
      <h2>
        Book List
        <Link to="/add">
          <button className="ui button blue right">Add Book</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderBookList}</div>
    </div>
  );
};

export default BookList;
