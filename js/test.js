document.write(position.coords.longitude);
document.write(position.coords.latitude);

/* text size counter EN + KR */
var getTextLength = function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
            len++;
        }
        len++;
    }
    return len;
}

// document.write(getTextLength('123123'));          // 출력
// document.write('<br>');
// document.write(getTextLength('english test'));       // 12 출력
// document.write('<br>');
// document.write(getTextLength('한글테스트'));   // 10 출력
// document.write('<br>');
// document.write(getTextLength('ああ'));         // 4 출력
