import React from "react";

class AddBook extends React.Component {
  state = {
    name: "",
    category: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.category === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.addBookHandler(this.state);
    this.setState({ name: "", category: "" });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Book</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>category</label>
            <input
              type="text"
              name="category"
              placeholder="category"
              value={this.state.category}
              onChange={(e) => this.setState({ category: e.target.value })}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddBook;
