$(document).ready(function() {
  app.init();
});

var app = {

  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  
  init: () => {
  	
	  app.fetch();

	  $('.sendMessage').on('click', function(event) {
	  	event.preventDefault();
	    var text = $('input[name=message]').val();
	    var message = {
	      username: undefined,
	      text: text,
	      room: undefined
	    }
	    app.send(message);
	    $('form')[0].reset();
	  })
  },
  
  send: message => {
	$.ajax({
	  url: app.server,
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to send message', data);
	  }
	});
  },

  fetch: () => {
	$.ajax({
	  url: app.server,
	  type: 'GET',
	  data: {order :'-createdAt'},
	  contentType: 'application/json',
	  success: function (data) {
	  	var messageArray = data.results;
	  	messageArray.forEach(function(x) {
	      //var sanitized = escape(x.text);
	  	  app.renderMessage(x);
	  	});
	    console.log('chatterbox: Message received');
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to load message', data);
	  }
	});  	
  },

  clearMessages: () => {
    $("#chats").children().remove();
  },

  renderMessage: message => {
  	var text = message.text;

  	var $message = $('<div class="message">'+ text +'</div>')
  	text = $message.text();
  	var $text = $('<div class="message">'+ text +'</div>');

    $('#chats').append($text);
    $('form')[0].reset();
  },

  renderRoom: () => {

  },

 //  escaple: (fetchedText) => {
 //  	//fetchedText.replace(/%20/g, ' ').replace(/%21/g,' ').replace(/%29/g,' ').replace(/%20/g, ' ').replace(/%21/g,' ').replace(/%29/g,' ')
 //  	var specialChars = {
 //  		'&': '&#38;',
	//     '<': '&#60;',
	//     '>': '&#62;',
	//     '\"': '&#34;',
	//     '\'': '&#39;',
	//     '`': '&#96;',
	//     ',': '&#44;',
	//     '!': '&#33;',
	//     '@': '&#64;',
	//     '$': '&#36;',
	//     '%': '&#37;',
	//     '(': '&#40;',
	//     ')': '&#41;',
	//     '=': '&#61;',
	//     '+': '&#43;',
	//     '{': '&#123;',
	//     '}': '&#125;',
	//     '[': '&#91;',
	//     ']': '&#93;'
	// }
 //  	for (var i = 0; i < fetchedText.length; i++) {
 //      if (fetchedText[i])

 //  	}
 //  }



};



