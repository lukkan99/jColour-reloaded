const {name, version, author, repository} = require('./../../package.json');
const axios = require('axios');
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${name} ${version} by ${author} | ${repository.url}`
  }
});

exports.shibe = function() {
  return new Promise((resolve, reject) => {
    const url = "http://shibe.online/api/shibes?count=1&urls=true";

    request.get(url)
      .then(response => {
        resolve([response["data"][0], ""]);
      })

      .catch(error => {
        resolve([null, error.message]);
      });
  })

};
