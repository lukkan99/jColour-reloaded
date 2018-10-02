const {name, version, author, repository} = require('./../../package.json');
const axios = require('axios');
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${name} ${version} by ${author} | ${repository.url}`
  }
});

exports.e926 = function(search, order) {
  return new Promise((resolve, reject) => {
    const url = `https://e926.net/post/index.json?limit=50&tags=${search} order:${order} -flash -video`;

    request.get(url)
      .then(response => {

        let count = Math.floor((Math.random() * response["data"].length));
        resolve([response["data"][count]["file_url"], ""]);
      })

      .catch(error => {
        resolve([null, error.message]);
      });
  })

};
