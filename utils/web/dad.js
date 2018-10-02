const {name, version, author, repository} = require('./../../package.json');
const axios = require('axios');
const request = axios.create({
  headers: {
    'Accept': 'application/json',
    'User-Agent': `${name} ${version} by ${author} | ${repository.url}`
  }
});

exports.dad = function() {
  return new Promise((resolve, reject) => {
    const url = `https://icanhazdadjoke.com`;

    request.get(url)
      .then(response => {
        resolve([response["data"]["joke"], ""]);
      })

      .catch(error => {
        resolve([null, error.message]);
      });
  })

};
