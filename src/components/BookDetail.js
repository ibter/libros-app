import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";

const BookDetail = (props) => {
  const { name, category } = props.location.state.book;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{category}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Book List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookDetail;
