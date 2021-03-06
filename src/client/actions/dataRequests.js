/*global location*/

'use strict';

import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response !== undefined && error.response.status === 401) {
    location.reload();
  }
  return Promise.reject(error);
});

export function fetchData () {
  return axios({
    method: 'get',
    url: '/api/getData'
  });
}

export function fetchAPIData () {
  return axios.all([
    fetchData()
  ])
  .then(axios.spread(function (responseData) {
    // ... but this callback will be executed only when both requests are complete.
    return {
      data: responseData.data
    };
  }));
}
