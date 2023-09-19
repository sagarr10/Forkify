import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON, sendJSON } from './helper';
import recepieView from './view/recepieView';
import { RES_PER_PAGE, KEY } from './config';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};
const createRecipe = function (data) {
  // -----> Changed the format from the API
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecepir = async function (id) {
  try {
    // 1) Loading the data here
    const data = await getJSON(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipe(data);
    // console.log(state.recipe);
    // Bookmark condition
    if (state.bookmarks.some(book => book.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    // alert(error);
    // console.error(error);
    throw error;
    // recepieView.renderError(error);
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(recipes => {
      return {
        id: recipes.id,
        image: recipes.image_url,
        publisher: recipes.publisher,
        title: recipes.title,
        ...(recipes.key && { key: recipes.key }),
      };
    });
    state.search.page = 1;

    // return data;
  } catch (err) {
    throw err;
  }
};
// loadSearchResults('pizza');

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
// getSearchResultPage(1);

// Update the servings
export const udpateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    //
  });

  state.recipe.servings = newServings;
};

// BOOKMARKS
const persistBookmar = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
// add
export const addBookmark = function (recepie) {
  //Adding the recepie to bookmarks array
  state.bookmarks.push(recepie);

  // If bookmark then it show show bookmarked symbol
  if (recepie.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmar();
};
// delet
export const deletBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => {
    return el.id === id;
  });

  state.bookmarks.splice(index, 1);
  // If bookmark then it show show bookmarked symbol
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmar();
};

// Inizilization func
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// Add the new recipe
export const addNewRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) throw new Error('Worng ingrieidents format');
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    console.log(Object.entries(newRecipe));
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      KEY,
      cooking_time: newRecipe.cookingTime,
      servings: newRecipe.servings,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipe(data);
    // state.recipe.key = KEY;
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
//my key== d7766536-60d1-41e2-8319-dadb079fd172
