const endpoint = (model, id, parentModels) =>  {
  if (parentModels){
    const extension = parentModels.reduce((total, currentValue) => {
      let newValue = total + "/" + currentValue[0];
      if(currentValue[1]) {
          newValue += `/${currentValue[1]}`;
      }
      return newValue;
    }, '')

    if (id) {
      return `/api/v1${extension}/${model}/${id}`
    } else {
      return `/api/v1${extension}/${model}`
    }
  } else if (id) {
    return `/api/v1/${model}/${id}`
  } 
  else {
    return `/api/v1/${model}`
  }
}

const _refreshToken = (accessToken, refreshToken, method) => {
  fetch("/users/tokens", {
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


export const fetchThing = async(model, id = null, parentModels = null) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireAt = parseInt(localStorage.getItem('expireAt'));
  const accessExpired = new Date() > new Date(expireAt);
  
  const _fetchMethod = async () => {
    try {
      const response = await fetch(endpoint(model, id, parentModels), {
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

export const postThing = async(values, model, parentModels = null) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireAt = parseInt(localStorage.getItem('expireAt'));
  const accessExpired = new Date() > new Date(expireAt);
  
  const _postMethod = async () => {
    try {
      const response = await fetch(endpoint(model, null, parentModels), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': '*',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(values)
      })
      const data = await response.json();
      return data;
    } catch(error) {
      console.log("error: ", error)
    }    
  }

  if (accessToken && !accessExpired) {
    const data = await _postMethod();
    return data;
  } else if (accessToken && accessExpired) {
    return await _refreshToken(accessToken, refreshToken, _postMethod)
  }
}

export const deleteThing = async(model, id = null, parentModels = null) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireAt = parseInt(localStorage.getItem('expireAt'));
  const accessExpired = new Date() > new Date(expireAt);
  
  const _destroyMethod = async () => {
    try {
      const response = await fetch(endpoint(model, id, parentModels), {
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