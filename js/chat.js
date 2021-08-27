/**
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 * chat.js
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 * All things that have to do with running the Simple Chat client side
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 */

/**
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 * global variables part
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 */

const usernm = document.getElementById('usernm');
const prev = document.getElementById('prev');
const desturl = document.getElementById('desturl');
const submitnm = document.getElementById('submitnm');
const usermsg = document.getElementById('usermsg');
const submitmsg = document.getElementById('submitmsg');
// const xportlog = document.getElementById('xportlog');
const logtest = document.getElementById('logtest');
const cbstyle = document.getElementById('cbstyle'); // chatbox styling

let url = '';
// let request = new Request();
let roomid = 0;
let userid = 0;

/**
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 * event setup part
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 */

usernm.onkeypress = function () {
  if (event.keyCode == 13) {
    getName();
  }
}
prev.onkeypress = function () {
  if (event.keyCode == 13) {
    getName();
  }
}
desturl.onkeypress = function () {
  if (event.keyCode == 13) {
    getName();
  }
}
submitnm.onclick = getName;

// the problem child; seems to not work, unlike usernm
// fixed using textarea instead of input
usermsg.onkeypress = function () {
  if (event.keyCode == 13) {
    sendMessage();
    // https://stackoverflow.com/questions/31245808
    if(event.preventDefault) event.preventDefault();
    usermsg.value = "";
  }
}
submitmsg.onclick = sendMessage;

// xportlog.onclick = exportLog;

// logtest.onclick = testLog;

/**
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 * function defining part
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 */

function getName() {
  // get timestamp for room ID
  let now = new Date();
  // catch inside text in the name (and room ID) entry
  let prepper = document.getElementById('prep');
  let namevalue = usernm.value;
  if (prev.value === '') {
    roomid = now.valueOf();
  } else {
    // roomid = 404;
    if (typeof prev.value === 'number') { // not happening, as it's a 'string'
      roomid = prev.value;
    } else {
      roomid = parseInt(prev.value); // or maybe keep it as string
    }
  }
  userid = roomid; // temporary; should be DIFFERENT for non-room-openers
  url += desturl.value;
  console.log("server is on", url);
  // clear input (might be unnecessary)
  usernm.value = "";
  prev.value = "";
  desturl.value = "";
  // record name and room ID on screen
  document.getElementById('yourname').textContent = namevalue;
  document.getElementById('roomid').textContent = roomid;
  // create styling for user ID in chatbox (note: this is different per user)
  cbstyle.innerHTML += `<style>.usr${userid} {color: gold;}</style>`;
  // show app screen
  let appscreen = document.getElementById('app');
  if (appscreen.style.display === 'none') {
    appscreen.style.display = '';
    prepper.style.display = 'none';
  } else {
    // appscreen.style.display = 'none';
  }
}

function sendMessage() {
  const now = new Date();
  let namevalue = document.getElementById('yourname').textContent;
  let message = usermsg.value;
  usermsg.value = "";
  if (message === '') {
    return;
  } else {
    // let procdate = now.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
    let procdate = actime(now);
    const packedMessage = packMessage(userid, namevalue, procdate, message);
    if (isJsonString(packMessage)) {
      console.log("is JSON string");
    } else {
      console.log("is " + typeof(packedMessage));
    }
    let endpoint = url + `/chatlog/${roomid}`;
    console.log("preparing export to: " + endpoint);
    exportMessage(endpoint, packedMessage);
    // scrollDownChatbox();
  }
}

function actime(date) {
  let result = "";
  let year = date.getUTCFullYear().toString();
  let month = appendzero("", date.getUTCMonth(), 1);
  let day = appendzero("", date.getUTCDate(), 0);
  let hour = appendzero("", date.getUTCHours(), 0);
  let minute = appendzero("", date.getUTCMinutes(), 0);
  let second = appendzero("", date.getUTCSeconds(), 0);
  result += `${year}/${month}/${day}, ${hour}:${minute}:${second}`;
  return result;
}

function appendzero(str, num, offset) {
  let result = str;
  if (num + offset < 10) {
    result += "0";
  }
  result += num.toString();
  return result;
}

/**
 * REST API POST example
 * 
 * POST /echo/post/json HTTP/1.1
 * Host: reqbin.com
 * Accept: application/json
 * Content-Type: application/json
 * Content-Length: 81
 * 
 * {
 *   "Id": 78912,
 *   "Customer": "Jason Sweet",
 *   "Quantity": 1,
 *   "Price": 18.00
 * }
 */

function packMessage(id, name, date, content) {
  const result = {
    "id": id,
    "name": name,
    "date": date,
    "content": content
  };
  console.log("packed message: " + JSON.stringify(result));
  return JSON.stringify(result);
}

function exportMessage(myEndpoint, myMessage) {
  if (typeof(myMessage) === 'string') {
    console.log("exporting message to: " + myEndpoint);
    console.log("message: " + myMessage);
    console.log("body: ", JSON.stringify(myMessage));
    const request = new Request(myEndpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: myMessage //JSON.stringify(myMessage)
    });
    console.log("body: ", request.body);
    fetch(request).then(response => {
      console.log("answered");
      console.log(response);
      return response.json();
    }).then(data => {
      console.log(data);
      document.getElementById('chatbox').innerHTML = data.msg;
    }).then(() => {
      scrollDownChatbox();
    });
  } else {
    return;
  }
}

function isJsonString(str) {
  try {
    let json = JSON.parse(str);
    console.log("is JSON")
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

function scrollDownChatbox() {
  // scroll chatbox automatically
  let cbsh = document.getElementById('chatbox').scrollHeight;
  document.getElementById('chatbox').scrollTo(0, cbsh);
}

// function exportLog(myEndpoint) {
//   // get current log
//   let currentLog = document.getElementById('chatbox').innerHTML;
//   // duplicate log
//   if (currentLog === '') {
//     return;
//   } else {
//     // export current log unto outer file
//     const exportdata = {
//       "id": roomid, "content": currentLog
//     };
//     console.log(JSON.stringify(exportdata));
//     const request = new Request(myEndpoint, {
//       method: 'POST',
//       body: JSON.stringify(exportdata)
//     });
//     console.log(request.body);
//     request.json().then(function(data) {
//       /**
//        * do something with the data sent in the request...
//        * ...like replacing currentLog with res.content
//        */
//     });
//     // clear log (omit?)
//     // document.getElementById('chatbox').innerHTML = '';
//   }
// }

// function testLog() {
//   // get current log
//   let log = document.getElementById('chatbox').innerHTML;
//   // duplicate log
//   if (log === '') {
//     return;
//   } else {
//     document.getElementById('chatbox').innerHTML += log;
//     // scroll chatbox automatically
//     scrollDownChatbox();
//   }
// }

/**
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 * EOF
 * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- * -=-|-=- *
 */
