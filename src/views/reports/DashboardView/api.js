/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAPI = (url) => {
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);

  const getIncidentNumbers = async () => {
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
    setIncidents(res);
    setLoading(false);
  };

  useEffect(() => {
    getIncidentNumbers();
  }, [url]);

  return { loading, incidents };
};
