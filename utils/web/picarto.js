const {name, version, author, repository} = require('./../../package.json');
const axios = require('axios');
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `${name} ${version} by ${author} | ${repository.url}`
  }
});

exports.picarto = function(streamer) {
  return new Promise((resolve, reject) => {
    const url = `https://api.picarto.tv/v1/channel/name/${streamer}`;

    request.get(url)
      .then(response => {
        resolve([response["data"], ""]);
      })

      .catch(error => {
        if (error.response.status === 404) {
          error.message = "Streamer not found.";
        };
        resolve([null, error.message]);
      });
  })

};
