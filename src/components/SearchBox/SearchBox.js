import React, { Component } from "react";
import { addFilterMovies } from "../../redux/actions/actions";
import { connect } from "react-redux";

import "./SearchBox.css";
import axios from "axios";
import { baseUrl } from "../../redux/constants";

class SearchBox extends Component {
  state = {
    searchLine: "",
  };
  searchLineChangeHandler = (e) => {
    this.setState({ searchLine: e.target.value });
  };
  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
  };

  getMovieList = async () => {
    const apiKey = "23dbb244";
    const res = await axios.get(
      baseUrl + `?s=${this.state.searchLine}&apikey=${apiKey}`
    );
    const data = res.data.Search;
    if (!data) {
      throw console.log("Error");
    }
    return data;
  };

  render() {
    const { addFilterMovies } = this.props;
    const { searchLine } = this.state;
    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              type="text"
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            onClick={() =>
              this.getMovieList()
                .then((res) => {
                  addFilterMovies(res);
                })
                .catch((err) => {
                  addFilterMovies([]);
                  return err;
                })
            }
            disabled={!searchLine}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFilterMovies: (movies) => {
      dispatch(addFilterMovies(movies));
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchBox);
