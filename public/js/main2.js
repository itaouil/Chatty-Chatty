// Socket.io instance
var socket = io();

// Socket.io incoming new lads message
socket.on('message', function(data){
  ladsMessage(data);
});

// Messages container
var $messages = $('.messages-content');

// Globals
var d, h, m = 0;

// ScrollBar instance
$(window).on('load', function() {
  $messages.mCustomScrollbar();
});

// Message inserting events
$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

// ScrollBar update
function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

// Timestamp
function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

// Message inserting routine
function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();

  // Send message to server to be broadcasted
  socket.emit('message', {name: name, msg: msg});
  console.log('Client sent message', msg);
}

function ladsMessage(data) {
  $('<div style="display: inline-block; position: relative;">' + data.name +'<div class="message new">' + data.msg + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  updateScrollbar();
}
