const {name, version, author, repository} = require('./../../package.json');
const axios = require('axios');
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${name} ${version} by ${author} | ${repository.url}`
  }
});

exports.dog = function() {
  return new Promise((resolve, reject) => {
    const url = "https://random.dog/woof.json";

    request.get(url)
      .then(response => {
        resolve([response["data"]["url"], ""]);
      })

      .catch(error => {
        resolve([null, error.message]);
      });
  })

};
