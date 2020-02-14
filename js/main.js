$(document).ready(
  () => {
    $('#searchForm').on('submit',
      (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
      }
    );
});

let getMovies = (searchText) => {
  $.get(`http://www.omdbapi.com/?i=tt3896198&apikey=226baf80&s=${searchText}`)
    .then(function(response){
        //console.log(response)
        let movies = response.Search;
        let output = '';

        $.each(movies,
          (index, movie) => {
            output += 
              `
                <div class="col-md-3">
                  <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a href="#" onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Movie Details</a>
                  </div>
                </div>
              `;
          }
        );

        //outputing the output
        $('#movies').html(output);
      })
    .catch(function(err){
        console.log(err)
      });
}

let movieSelected = (id) => {
  //To set a session storage of movieId with the parsed in id
  sessionStorage.setItem('movieId', id);
  //To change the page
  window.location = 'movie.html';
  return false;
}

let getMovie = () => {
  //getting the movie id from session storage
  let movieId = sessionStorage.getItem('movieId');

  $.get(`http://www.omdbapi.com/?apikey=226baf80&i=${movieId}`)
    .then(function(response){
        //console.log(response)
        let movie = response;
        let output = 
          `
            <div class="row">
              <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
              </div>
              <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                  <li class="list-group-items"><strong>Genre:</strong> ${movie.Genre}</li>
                  <li class="list-group-items"><strong>Released:</strong> ${movie.Released}</li>
                  <li class="list-group-items"><strong>Rated:</strong> ${movie.Rated}</li>
                  <li class="list-group-items"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                  <li class="list-group-items"><strong>Director:</strong> ${movie.Director}</li>
                  <li class="list-group-items"><strong>Writer:</strong> ${movie.Writer}</li>
                  <li class="list-group-items"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
              </div>
            </div>

            <div class="row">
              <div class="well">
                <h3>Plot:</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" class="btn btn-primary" target="_blank">View iMDB </a>
                <a href="index.html" class="btn btn-default">Go Back To Search Page</a>
              </div>
            </div>
          `;

      $('#movie').html(output);
      })
      .catch(function(err){
          console.log(err)
        });

  }
