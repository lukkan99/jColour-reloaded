const {name, version, author, repository} = require('./../../package.json');
const axios = require('axios');
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${name} ${version} by ${author} | ${repository.url}`
  }
});

exports.e926 = function(search) {
  return new Promise((resolve, reject) => {
    const url = `https://e926.net/post/index.json?limit=200&tags=${search}`;

    request.get(url)
      .then(response => {
        if (response["data"].length < 1) {
          resolve([null, "No results found"])
        } else {
          const count = Math.floor((Math.random() * response["data"].length));
          resolve([response["data"][count], ""]);
        }
      })

      .catch(error => {
        if (error.response.status === 422) {
          error.message = "You supplied too many tags.";
        };
        resolve([null, error.message]);
      });
  })

};
