import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        console.log('y', data);
        setState({ data, loading: false });
      });
  }, [url, setState]);

  return state;
};
