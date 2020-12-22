
import { getToken } from './token';
const token = getToken('jwt');
const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так! :( ${res.status}`);
}


class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getHeaders() {
    const token = getToken('jwt');
    return {
      ...this._headers,
      'Authorization': `Bearer ${token}`,
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
      
    }).then(handleResponse);
  }

  updateUserInfo(formData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(formData),
    }).then(handleResponse);
  }

  updateUserImage(formData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(formData),
    }).then(handleResponse);
  }

  getItems() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then(handleResponse);
  }

  deleteItem(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(handleResponse);
  }

  // rateItem(cardId, isLiked) {
  //   let methodValue;
  //   isLiked ? (methodValue = "DELETE") : (methodValue = "PUT");
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: methodValue,
  //     headers: this._headers,
  //   }).then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка при добавлении лайка :( ${res.status}`);
  //   });
  // }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(handleResponse);
  }

  createItem(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(item),
    }).then(handleResponse);
  }
}

// Создание экземпляра класс API для взаимодействия с сервером
const api = new Api({
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  baseUrl: "https://api.eremeev.students.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

