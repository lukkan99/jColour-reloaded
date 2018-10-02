const {furryDir, furryWWW} = require('./../../config/config.json');
const fs = require('fs');

exports.furry = function() {

  return new Promise((resolve, reject) => {
    if (furryDir) {
      fs.readdir(furryDir, function(err, items) {
        const image = items[Math.floor(Math.random() * items.length)];
        const furryUrl = furryWWW + image;
        resolve([furryUrl, ""]);
      });
    } else {
      resolve(["", "Fursuit functionality not set up."]);
    };
  })
};
