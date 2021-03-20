import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useAPI = (url) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  const getUser = async () => {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.getItem('Token')}`,
        'X-CSRFToken': Cookies.get('csrftoken')
      }
    });
    const res = await response.json();
    setUser(res);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [url]);

  return { loading, user };
};
