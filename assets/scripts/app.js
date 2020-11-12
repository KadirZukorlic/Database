const addMovieModalElement = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];

// = document.querySelector('header').lastElementChild; not good
const startAddMovieButton = document.querySelector('header button');
//const backdropElement = document.body.firstElementChild;
const backdropElement = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModalElement.querySelector(
  '.btn--passive'
);
const confirmAddMovieButtonElement = cancelAddMovieButton.nextElementSibling;
const inputsElements = addMovieModalElement.querySelectorAll('input');
// const inputsElements = addMovieModalElement.getElementsByTagName('input',);
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
  if (movies.lenght === 0) {
  } else {
    entryTextSection.style.display = 'none';
  }
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  //   listRoot.removeChild(listRoot.children[movieIndex]);
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  // deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element_info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdropElement.classList.toggle('visible');
};

const closeMovieModal = () => {
  addMovieModalElement.classList.remove('visible');
};

const clearMovieInputs = () => {
  // inputsElements[0].value = '';
  for (const userInputsEl of inputsElements) {
    userInputsEl.value = '';
  }
};

const showMovieModal = () => {
  //funciton(showMovieModal) {};
  addMovieModalElement.classList.add('visible');
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = inputsElements[0].value;
  const imageValue = inputsElements[1].value;
  const ratingValue = inputsElements[2].value;

  if (
    titleValue.trim() === '' ||
    imageValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5)');
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  updateUI();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInputs();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdropElement.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButtonElement.addEventListener('click', addMovieHandler);
