// function myFunction() {
//   document.getElementsByClassName("ground-zero").innerHTML = "<p>JavaScript now working.</p>";
// }

// from; https://stackoverflow.com/questions/2485423/is-using-var-to-declare-variables-optional
var foo = "I'm global";
var bar = "So am I";

var func = function () { // function keyword cannot be used alone!
    var foo = "I'm local, the previous 'foo' didn't notice a thing";
    var baz = "I'm local, too";

    var fund = function () {
        var foo = "I'm even more local, all three 'foos' have different values";
        baz = "I just changed 'baz' one scope higher, but it's still not global";
        bar = "I just changed the global 'bar' variable";
        xyz = "I just created a new global variable";
    }
}

// objects clean up related variables and functions
// functions clean up reusable codes
var Body = {
  setBackgroundColor: function(color) {
    document.querySelector('body').style.backgroundColor = color;
  },
  setColor: function(color) {
    document.querySelector('body').style.color = color;
  }
};
var Tags = {
  setColor: function(tag, color) {
    var alist = document.querySelectorAll(tag);
    var i = 0;
    while(i < alist.length){
      alist[i].style.color = color;
      i = i + 1;
    }
  }
};
function nightDayHandler(self){
  var target = document.querySelector('body');
  if(self.value === 'night'){
    Body.setBackgroundColor('black');
    Body.setColor('white');
    self.value = 'day';
    Tags.setColor('h1', 'gold');
    // setColor('h2', 'gold');
  } else {
    Body.setBackgroundColor('white');
    Body.setColor('black');
    self.value = 'night';
    Tags.setColor('h1', 'brown');
    // setColor('h2', 'brown');
  }
}

function testLink() {
  alert('Remember, that .js files won\'t link properly if you have ANY syntax error in the file!');
}
