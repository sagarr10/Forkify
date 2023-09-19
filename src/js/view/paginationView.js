import View from './CLass_View';
import icons from 'url:../../img/icons.svg';
// import { RES_PER_PAGE } from './config';
// import { state } from '../model';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateHTML() {
    console.log(this._data);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // We are in page-1 and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      // return `page 1 and other`;
      return `
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }

    // Other pages
    if (this._data.page < numPages) {
      // return `other pages`;

      return `
      <button  data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-left"></use>
         </svg>
         <span>Page ${this._data.page - 1}</span>
       </button>

      <button  data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }
    // We are on the last page and no other page
    if (this._data.page === numPages && numPages > 1) {
      return `<button  data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-left"></use>
         </svg>
         <span>Page ${this._data.page - 1}</span>
       </button> `;
    }

    // Page-1 and there are no other page -- so return nothing
    // return `No other page `;
    return '';

    // console.log(numPages);
    // return numPages;
    // return this._data.map(this._geneateMarkUp).join(' ');
  }

  pageEventHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoBtn = +btn.dataset.goto;
      handler(gotoBtn);

      // return gotoBtn;
    });
  }
}

export default new PaginationView();
