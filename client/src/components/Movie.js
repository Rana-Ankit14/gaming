import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

export const Movie = ({ setIsLogin }) => {
  const movieURL = "https://www.omdbapi.com/?apikey=8aa625d4&page=1";
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("Avengers");
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    console.log("fetch data ");
    setLoading(true);
    axios
      .get(`${movieURL}&s=${search}`)
      .then((res) => {
        // console.log(res.data)
        console.log(res.data.Search);
        if (res.data.Response == "True") {
          setMovieList(res.data.Search);
          setLoading(false);
        } else {
          setMovieList([]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    // if(search.length >=3) {
    fetchData();
    // }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="col-12">
      <div className="col-12">
        <input
          type="text"
          name="search"
          value={search}
          required
          style={{ margin: 20 }}
          onChange={handleChange}
        />

        <button onClick={handleSearch} className="btn btn-primary btn-sm">
          Search
        </button>
        {search.length < 3 ? (
          <p style={{ color: "red", fontSize: 20 }}>Minimum 3 letters</p>
        ) : (
          <></>
        )}
      </div>
      {loading === true ? (
        <Loader type="Oval" color="#000" height={40} width={40} />
      ) : (
        <>
          {movieList.length === 0 ? (
            <h3> Movie Not Found</h3>
          ) : (
            <div className="row">
              {movieList.map((movie) => {
                return (
                  <div key={movie.imdbID} className="col-md-3 col-sm-6 col-12">
                    <img src={movie.Poster} style={{ width: "80%" }} />
                    <p>{movie.Title}</p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
