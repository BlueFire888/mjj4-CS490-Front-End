// Filename - App.js

// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState({
      TopMovies : [],
      TopActors:  [],
  	});
	useEffect(() => {
		fetch("/home").then((res) =>
			res.json().then((data) => {
				setdata({
					TopMovies: data.TopMovies,
          TopActors: data.TopActors
				});
			})
		);
	}, []);

  function Item(props) {
    return <li onClick={() => Displaymoviedata(props.message)}>{props.message}</li>;
  }

  const [movie_data, setmovie_data] = useState({
    MovieDetails : [],
    TopActors:  [],
  }); 

  async function Displaymoviedata(string){
    //const movie = { string };
    
    const response = await fetch("/ret_movie_details", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(string)
    })
    if (response.ok){
      console.log(response.json())
      setmovie_data({
        MovieDetails : response.data,
        TopActors:  [],
      });
    } 
  }

/*  useEffect(() => {
    fetch("/ret_movie_details").then((res) =>
      res.json().then((movie_data) => {
        setmovie_data({
          MovieDetails: movie_data.MovieDetails,
          TopActors: movie_data.TopActors
        });
      })
    );
    }, []);
*/


	return (
		<div className="App">
			<header className="App-header">
        <div className = "Top-Movies">
				  <p>Top 5 Rented Movies</p>
          <ul>
            {data.TopMovies.map((message) => <Item key={message} message={message} />)}
          </ul>
          <br/>
				  <p>Top 5 Actors</p>
          <ul>
            {data.TopActors.map((message) => <Item key={message} message={message} />)}
          </ul>
        </div>
        <div className="Movie-Data"> 
          <p>Movie details</p>
          <ul>
            {movie_data.MovieDetails}
          </ul>
        </div>
			</header>
		</div>
	);
}

export default App;
