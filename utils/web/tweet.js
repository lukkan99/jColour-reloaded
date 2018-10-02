const {name, version, author, repository} = require('./../../package.json');
const axios = require('axios');
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${name} ${version} by ${author} | ${repository.url}`
  }
});

exports.bird = function() {
  return new Promise((resolve, reject) => {
    const url = "http://random.birb.pw/tweet.json/";

    request.get(url)
      .then(response => {
        resolve(["http://random.birb.pw/img/" + response["data"]["file"], ""]);
      })

      .catch(error => {
        resolve([null, error.message]);
      });
  })

};
