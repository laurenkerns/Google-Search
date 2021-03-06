import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import SaveBtn from "../components/SaveBtn";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";



class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data.books, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };


  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.search({
        book: this.state.book,
        // title: this.state.title,
        // author: this.state.author,
        // synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  renderBooks = () => {
    if (this.state.books.length <= 0) {
      return (
        <List>
          {this.state.books.map(book => (
            <ListItem key={book._id}>
              <Link to={"/books/" + book._id}>
                <strong>
                  {book.title} by {book.author}
                </strong>
              </Link>
              <DeleteBtn onClick={() => this.deleteBook(book._id)} />
            </ListItem>
          ))}
        </List>
      )
    } else return <h3>No Results to Display</h3> 
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Book Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.renderBooks}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;