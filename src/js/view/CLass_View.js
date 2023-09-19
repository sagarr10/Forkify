import icons from 'url:../../img/icons.svg';
// import morphdom from '../../../node_modules/morphdom/dist/morphdom-esm.js';
import morphdom from '../../../node_modules/morphdom/dist/morphdom.js';
// console.log(morphdom);
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    // recipeContainer.textContent = '';

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateHTML());
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateHTML();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = [...newDOM.querySelectorAll('*')];
    const currElement = [...this._parentElement.querySelectorAll('*')];

    newElement.forEach((newEl, i) => {
      const currEl = currElement[i];
      if (newEl.innerHTML !== currEl.innerHTML) {
        morphdom(currEl, newEl);
      }
    });

    // newElement.forEach((newEl, i) => {
    //   const currEl = currElement[i];
    //   // console.log(currEl, newEl.isEqualNode(currEl));

    //   if (
    //     !newEl.isEqualNode(currEl) &&
    //     newEl.firstChild.nodeValue.trim() !== ''
    //   ) {
    //     currEl.textContent = newEl.textContent;
    //   }

    //   if (!newEl.isEqualNode(currEl)) {
    //     [...newEl.attributes].forEach(attr => {
    //       currEl.setAttribute(attr.name, attr.value);
    //     });
    //   }
    // });
    // console.log(newDOM, newElement);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markUp = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  // render the error
  renderError(message = this._errorMessage) {
    const markUp = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  // Success message
  renderMessage(message = this._Message) {
    const markUp = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
