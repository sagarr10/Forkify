import View from './CLass_View';
import icons from 'url:../../img/icons.svg';

class AddRecipie extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _Message = 'Recipe added successfully!';
  constructor() {
    super();
    this._addHandlerModelOpen();
    this._addHandlerModelClose();
    this.addHandlerUpload();
  }
  toogleClass() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerModelOpen() {
    this._btnOpen.addEventListener('click', this.toogleClass.bind(this));
  }
  _addHandlerModelClose() {
    this._btnClose.addEventListener('click', this.toogleClass.bind(this));
    this._overlay.addEventListener('click', this.toogleClass.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // FormData API and converted it to array then from array to Object
      const dataArr = [...new FormData(this)];
      // array to object
      const data = Object.fromEntries(dataArr);
      // console.log(data);
      handler(data);
    });
    this.toogleClass();
  }
}

export default new AddRecipie();
