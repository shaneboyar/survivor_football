export const fetchThing = (model, id = null) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireAt = parseInt(localStorage.getItem('expireAt'));
  const accessExpired = new Date() > new Date(expireAt);

  const _fetchMethod = () => {
    const endpoint = id ? `http://localhost:3001/api/v1/${model}/${id}` : `http://localhost:3001/api/v1/${model}`
    return fetch(endpoint, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log("error: ", error))
  }

  const _refreshToken = (accessToken, refreshToken) => {
    fetch("http://localhost:3001/users/tokens", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
      }
    })
    .then(response => {
      const accessToken = response.headers.get('Access-Token');
      const expireAt = response.headers.get('Expire-At');
      const refreshToken = response.headers.get('Refresh-Token')
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expireAt', expireAt * 1000);
      localStorage.setItem('refreshToken', refreshToken);
      return _fetchMethod();
    })
    .catch(error => console.log("error: ", error))
  }

  if (accessToken && !accessExpired) {
    const data = _fetchMethod();
    return data;
  } else if (accessToken && accessExpired) {
    return _refreshToken(accessToken, refreshToken)
  }
}