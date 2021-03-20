/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';

export const useAPI = (url, data) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  const getUser = async () => {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
