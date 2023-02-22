class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _request(path, method, info) {
    const pattern = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }

    return fetch(
      `${this._baseUrl}/${path}`,
      info ? { ...pattern, body: JSON.stringify(info) } : pattern
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          Promise.reject(`ошибка: ${res.status}`)
        }
      })
  }

  getUserInfo() {
    return this._request('users/me', 'GET')
  }

  editUserInfo(userInfo) {
    return this._request('users/me', 'PATCH', userInfo)
  }

  editAvatar(avatarInfo) {
    return this._request('users/me/avatar', 'PATCH', avatarInfo)
  }

  getCards() {
    return this._request('cards', 'GET')
  }

  setNewCard(data) {
    return this._request('cards', 'POST', data)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`cards/${cardId}/likes`, isLiked? 'DELETE' : 'PUT') 
  }

  changeDeleteCardStatus(id) {
    return this._request(`cards/${id}`, 'DELETE')
  }
}
const newApi = new Api({
  baseUrl: 'https://api.mesto.boris.stan.nomoredomains.rocks',
  // baseUrl: 'http://localhost:3000',
})

export default newApi