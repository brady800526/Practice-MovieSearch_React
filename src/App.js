import React, {Component} from "react";
import "./App.css";
import MovieRow from "./MovieRow.js";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("This is my initializer");
    this.state = {};

    this.performSearch("avengers");
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb");
    const api_key = "783bf1ea447bb62fbc20506d87e7a9b6";
    const urlString = `https://api.themoviedb.org/3/search/movie?query=marvel&api_key=${api_key}&query=${searchTerm}`;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully");
        const results = searchResults.results;
        console.log(results[0]);

        var movieRows = [];

        results.forEach((movie) => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          // console.log(movie.poster_path);
          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });

        this.setState({rows: movieRows});
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObjet = this;
    const searchTerm = event.target.value;
    boundObjet.performSearch(searchTerm);
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="green_app_icon.svg" />
              </td>
              <td width="8" />
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "99%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Enter search term"
        />

        {this.state.rows}
      </div>
    );
  }
}

export default App;
