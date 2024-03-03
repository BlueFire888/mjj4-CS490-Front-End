// Filename - App.js

// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

function Item(props) {
  return <li>{props.message}</li>;
}


function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState({
      TopMovies : [],
      TopActors:  [],
      MovieDetails: [],
      ActorDetails: [],
      ActorMovies: []
  
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
			</header>
		</div>
	);
}

export default App;
