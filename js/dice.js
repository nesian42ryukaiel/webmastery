let Dice = {
  getRandomInt: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    //The maximum is exclusive and the minimum is inclusive
  },
  bell: function() {
    return Dice.getRandomInt(1, 6) + Dice.getRandomInt(1, 6) + Dice.getRandomInt(1, 6);
  },
  check: function() {
    return Dice.getRandomInt(1, 20);
  }
};
