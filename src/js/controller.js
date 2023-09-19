// import from model
import { async } from 'regenerator-runtime';
import * as model from './model.js';
// from the view
import recepieView from './view/recepieView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import BookMarkVIEW from './view/BookMarkVIEW.js';
//
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import addRecipe from './view/addRecipe.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}

export const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recepieView.renderSpinner();
    // Prob solved of update
    resultView.update(model.getSearchResultPage());

    // from the model
    await model.loadRecepir(id);

    // 2) Rendering the data starts here----------->
    // From the view
    recepieView.render(model.state.recipe);
    // ==========TEST============================================
    controlServings();

    // Bookmark update
    // THe prob was we are not loading the data first so solved
    BookMarkVIEW.render(model.state.bookmarks);

    BookMarkVIEW.update(model.state.bookmarks);
  } catch (error) {
    // alert(error);
    recepieView.renderError();
    console.log(error);
  }
};

const controlSearchResults = async function () {
  try {
    // getting query
    resultView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;
    // fetching the data here
    await model.loadSearchResults(query);
    // rendering the data

    resultView.render(model.getSearchResultPage());

    // 4) Render Pagination
    paginationView.render(model.state.search);
    // console.log(model.state.search.results);
  } catch (err) {
    console.log('search results error', err);
  }
};
const paginationControl = function (goToPage) {
  resultView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);

  console.log(`CLicked ho clicked`);
};

const controlServings = function (newServings = 1) {
  //  update the receoie in the state
  model.udpateServings(newServings);
  // Update the recipe view
  // recepieView.render(model.state.recipe);

  recepieView.update(model.state.recipe);
};
// control bookmark

const bookmarkFunction = function () {
  // add only when it is not bookmarked
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // delet
  else model.deletBookmark(model.state.recipe.id);
  // updat
  recepieView.update(model.state.recipe);
  // render
  BookMarkVIEW.render(model.state.bookmarks);

  // console.log(model.state.bookmarks);
};
// Loading bookmark
const loadBookMark = function () {
  BookMarkVIEW.render(model.state.bookmarks);
};

// Adding the recipe
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipe.renderSpinner();
    await model.addNewRecipe(newRecipe);
    // render the recipe
    recepieView.render(model.state.recipe);
    // success message
    addRecipe.renderMessage();
    // Rendering to the bookmark
    BookMarkVIEW.render(model.state.bookmarks);
    // updating the hash in the URL
    window.history.pushState(null, '', `${model.state.recipe.id}`);
    setTimeout(() => {
      //  Close the form
      addRecipe.toogleClass();
    }, 2500);
  } catch (err) {
    console.error(err);
    addRecipe.renderError(err.message);
  }
  // UPload recipe
};
const init = function () {
  // 1st loading the bookmark
  BookMarkVIEW.addBookMarkHandler(loadBookMark);
  recepieView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.pageEventHandler(paginationControl);
  recepieView.addHandlerUpdateServings(controlServings);
  recepieView.addBookMark(bookmarkFunction);
  // add new
  addRecipe.addHandlerUpload(controlAddRecipe);
};
init();
// showRecepie();
// window.addEventListener('hashchange', showRecepie);
// window.addEventListener('load', showRecepie);

// ['hashchange', 'load'].forEach(el =>
//   window.addEventListener(el, controlRecipe)
// );

// we should not do this❌❌❌❌❌❌❌❌❌
// import { call } from './view/recepieView.js';
// call();
