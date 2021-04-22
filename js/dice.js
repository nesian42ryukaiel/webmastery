function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
  //The maximum is exclusive and the minimum is inclusive
}

function bell() {
  return getRandomInt(1, 6) + getRandomInt(1, 6) + getRandomInt(1, 6);
}

function check() {
  return getRandomInt(1, 20);
}
