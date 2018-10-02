exports.calcLove = function (name1, name2) {

  /*
  Modified from https://scriptime.blogspot.com/2013/01/javascript-love-calculator.html
  Because Blogspot is a great source
  */

  let loveCount = 0; // Base value

  name1 = name1.toUpperCase();
  name2 = name2.toUpperCase();

  for (Count = 0; Count < name1.length; Count++) {
    const letter = name1.substring(Count, Count++);
    if (letter == 'A') loveCount ++;
    if (letter == 'C') loveCount += 2;
    if (letter == 'H') loveCount ++;
    if (letter == 'L') loveCount += 2;
    if (letter == 'Y') loveCount += 3;
    if (letter == 'I') loveCount ++;
    if (letter == 'U') loveCount += 3;
    if (letter == 'K') loveCount ++;
    if (letter == 'M') loveCount += 2;
    if (letter == 'E') loveCount += 2;
    if (letter == 'P') loveCount ++;
    if (letter == 'R') loveCount ++;
    if (letter == 'S') loveCount += 2;
  }; // Looping through all letters and adding to lovecount if it's a specific one

  for (Count = 0; Count < name2.length; Count++) {
    const letter = name2.substring(Count,Count+1);
    if (letter == 'A') loveCount ++;
    if (letter == 'C') loveCount += 2;
    if (letter == 'H') loveCount ++;
    if (letter == 'L') loveCount += 2;
    if (letter == 'Y') loveCount += 3;
    if (letter == 'I') loveCount ++;
    if (letter == 'U') loveCount += 3;
    if (letter == 'K') loveCount ++;
    if (letter == 'M') loveCount += 2;
    if (letter == 'E') loveCount += 2;
    if (letter == 'P') loveCount ++;
    if (letter == 'R') loveCount ++;
    if (letter == 'S') loveCount += 2;
  }; // Looping through all letters and adding to lovecount if it's a specific one

  let amount = 0; // We're converting loveCount into a %, amount

  if (loveCount >= 0) amount = 75 - ((name1.length + name2.length) / 2)
  if (loveCount >= 2) amount = 45 - ((name1.length + name2.length) / 2)
  if (loveCount >= 4) amount = 55 - ((name1.length + name2.length) / 2)
  if (loveCount >= 6) amount = 70 - ((name1.length + name2.length) / 2)
  if (loveCount >= 8) amount = 35 - ((name1.length + name2.length) / 2)
  if (loveCount >= 10) amount = 60 - ((name1.length + name2.length) / 2)
  if (loveCount >= 12) amount = 65 - ((name1.length + name2.length) / 2)
  if (loveCount >= 14) amount = 117 - ((name1.length + name2.length) / 2)
  if (loveCount >= 16) amount = 80 - ((name1.length + name2.length) / 2)
  if (loveCount >= 18) amount = 40 - ((name1.length + name2.length) / 2)
  if (loveCount >= 20) amount = 60 - ((name1.length + name2.length) / 2)
  if (loveCount >= 22) amount = 110 - ((name1.length + name2.length) / 2)

  if (name1.length == 0 || name2.length == 0) amount = "Err";
  if (amount < 0) amount = 0;
  if (amount >= 99) amount = 100;

  return amount;

};

exports.nameShip = function (name1, name2) {

  // Users need to be sorted so switching the order doesnt change the ship name
  const users = [name1, name2].sort(function(name1, name2) {
    // Ascending: first id less than the previous
    return name1.id - name2.id;
  });

  // Let's start making the string

  const ship1 = users[0].substr(0, (users[0].length / 2) + 1);
  const ship2 = users[1].substr(users[1].length / 2);
  const shipName = ship1 + ship2;
  return shipName;
}
