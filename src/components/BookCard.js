import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const BookCard = (props) => {
  const { id, name, category } = props.book;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="book" />
      <div className="content">
        <Link
          to={{ pathname: `/book/${id}`, state: { book: props.book } }}
        >
          <div className="header">{name}</div>
          <div>{category}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHander(id)}
      ></i>
      <Link to={{ pathname: `/edit`, state: { book: props.book } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default BookCard;
