//select container class
const container = document.querySelector(".container");
//select all the seat which are not occupied
const availableSeats = document.querySelectorAll(".row .seat:not(.occupied)");
//select number of tickets
const ticketCount = document.getElementById("count");
//select total price
const totalPrice = document.getElementById("total");
//select movie
const selectedMovie = document.getElementById("movie");
//selected movie price
let moviePrice = +selectedMovie.value;

populateUI();
//save movie data to localStorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("SelectedMovieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
}

// update ticket count and total price
function updateCoutAndPrice() {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");

  //seve to local storage
  //copy selectedSeat into a new array and return a new array with selected list index
  // const seatsIndex = [...selectedSeat].map(seat => [...availableSeats].indexOf(seat)); shortcut way
  const seatsIndex = [...selectedSeat].map((seat) => {
    //get index of selected list from available seat
    return [...availableSeats].indexOf(seat);
  });

  //now save this seatIndex array to localstorage with a key of seatIndex
  localStorage.setItem("seatIndex", JSON.stringify(seatsIndex));

  let selectedSeatsCount = selectedSeat.length;
  //set the ticket count
  ticketCount.innerText = selectedSeatsCount;
  //set the total price
  totalPrice.innerText = selectedSeatsCount * moviePrice;
}

//movie select event
selectedMovie.addEventListener("change", (event) => {
  //chnage movie when change movie
  moviePrice = +event.target.value;
  //save selected movie and total price to local storage
  setMovieData(event.target.selectedIndex, event.target.value);
  //update total movie seat and price
  updateCoutAndPrice();
});

//change the color of availavle seats when click one of them
container.addEventListener("click", (event) => {
  //select only available seat when click on any seat(occupied and availabe both )
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    //now add selected class on that selected list
    //toggle means add and remove both
    event.target.classList.toggle("selected");
    //now update ticket count and total price
    updateCoutAndPrice();
  }
});

function populateUI() {
  //get all selected seat list index from localstorage
  const selectedListIndex = JSON.parse(localStorage.getItem("seatIndex"));
  //now check if selectedListIndex not null and length is not 0 and set it
  if (selectedListIndex !== null && selectedListIndex.length > 0) {
    availableSeats.forEach((seat, index) => {
      if (selectedListIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  //get movie index from localstorage;
  const getMovieIndex = localStorage.getItem("SelectedMovieIndex");
  if (getMovieIndex !== null) selectedMovie.selectedIndex = getMovieIndex;
}

updateCoutAndPrice();
