import { useState, useEffect } from 'react';

function useFetch(fetchObject) {
  const [data, setData] = useState();
  const [statusCode, setStatusCode] = useState();

  useEffect(() => {
    // console.log('useFetch: fetchObject: ', fetchObject);
    if (fetchObject.url) {
      const requestOptions = {
        method: fetchObject.method || 'GET',
        headers: fetchObject.headers,
      };
      if (fetchObject.body !== undefined) {
        //requestOptions.method = 'POST';
        requestOptions.body = JSON.stringify(fetchObject.body);
      }
      fetch(fetchObject.url, requestOptions)
        .then((res) => {
          setStatusCode(res.status);
          return res.json();
        })
        .then((json) => {
          console.log('useFetch - json response: ', json);
          setData(json);
        })
        .catch((err) => {
          console.log('catch - fetch failed');
          setData(err);
        });
    }
  }, [fetchObject]);
  return { data, statusCode };
}

export default useFetch;
