const {name, version, author, repository} = require('./../../package.json');
const axios = require('axios');
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${name} ${version} by ${author} | ${repository.url}`
  }
});

exports.safebooru = function(search) {
  return new Promise((resolve, reject) => {
    const url = `https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=1&limit=500&json=1&tags=${search}`;

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
        resolve([null, error.message]);
      });
  })

};
