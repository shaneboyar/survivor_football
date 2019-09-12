const endpoint = (model, id) =>  id ? `http://localhost:3001/api/v1/${model}/${id}` : `http://localhost:3001/api/v1/${model}`

const _refreshToken = (accessToken, refreshToken, method) => {
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
    return method();
  })
  .catch(error => console.log("error: ", error))
}


export const fetchThing = async(model, id = null) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireAt = parseInt(localStorage.getItem('expireAt'));
  const accessExpired = new Date() > new Date(expireAt);
  
  const _fetchMethod = async () => {
    try {
      const response = await fetch(endpoint(model, id), {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': '*',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const data = await response.json();
      return data;
    } catch(error) {
      console.log("error: ", error)
    }    
  }


  if (accessToken && !accessExpired) {
    const data = await _fetchMethod();
    return data;
  } else if (accessToken && accessExpired) {
    return await _refreshToken(accessToken, refreshToken, _fetchMethod)
  }
}

export const deleteThing = async(model, id) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireAt = parseInt(localStorage.getItem('expireAt'));
  const accessExpired = new Date() > new Date(expireAt);
  
  const _destroyMethod = async () => {
    try {
      const response = await fetch(endpoint(model, id), {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': '*',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const data = await response.json();
      return data;
    } catch(error) {
      console.log("error: ", error)
    }    
  }

  if (accessToken && !accessExpired) {
    const data = await _destroyMethod();
    return data;
  } else if (accessToken && accessExpired) {
    return await _refreshToken(accessToken, refreshToken, _destroyMethod)
  }
}