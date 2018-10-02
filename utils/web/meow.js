const {name, version, author, repository} = require('./../../package.json');
const axios = require('axios');
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${name} ${version} by ${author} | ${repository.url}`
  }
});

exports.cat = function() {
  return new Promise((resolve, reject) => {
    const url = "https://random.cat/meow";

    request.get(url)
      .then(response => {
        resolve([response["data"]["file"], ""]);
      })

      .catch(error => {
        resolve([null, error.message]);
      });
  })

};
