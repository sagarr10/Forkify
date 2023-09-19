import View from './CLass_View';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recpie found for it. Please try another one!';
  _Message = '';
  _generateHTML() {
    // console.log(this._data);
    return this._data.map(this._geneateMarkUp).join(' ');
  }

  _geneateMarkUp(e) {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
        <a class="preview__link ${
          id === e.id ? 'preview__link--active' : ''
        }" href="#${e.id}">
          <figure class="preview__fig">
            <img src="${e.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${e.title}</h4>
            <p class="preview__publisher">${e.publisher}</p>
            <div class="preview__user-generated ${e.key ? '' : 'hidden'}">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
            </a>
      </li>
    `;
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(el => window.addEventListener(el, handler));
  }
}

export default new ResultView();
