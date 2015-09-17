(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
	var main = $('#main');
	var input = $('#input');
	var form = $('form');
	var conversation = $('#conversation');
	var deleteButton = $('.delete');
	var name = $('#name');
	var userName = $('#userName');
	var userSubmit = $('#userSubmit');

	main.hide();

	userSubmit.click(function () {
		userName.css({ display: 'none' });
		main.show();
	});

	form.submit(function (e) {
		e.preventDefault();
		var dat = new Date();
		var date = dat.toISOString();

		$.post('http://tiyfe.herokuapp.com/collections/bobs-chat-app', { message: input.val(), timeSince: date, person: name.val() }, function (response) {}, 'json');
		input.val('');
	});
	setInterval(function () {

		$.get('http://tiyfe.herokuapp.com/collections/bobs-chat-app', function (response) {
			conversation.html('');
			response.reverse();
			for (var i = 0; i < response.length; i++) {
				conversation.append('<div class="timeStamp">' + response[i].person + ' said' + '<br>' + moment(response[i].timeSince).fromNow() + '</div>' + '<div class="eMessage">' + response[i].message + '</div>');
			}
		}, 'json');
	}, 500);

	deleteButton.click(function () {
		$.get('http://tiyfe.herokuapp.com/collections/bobs-chat-app', function (response) {
			response.forEach(function (record) {
				$.ajax({
					url: 'http://tiyfe.herokuapp.com/collections/bobs-chat-app/' + record._id,
					method: 'DELETE'
				});
			});
		});
	});
	$('.comment').emoticonize({
		delay: 800,
		animate: false
		//exclude: 'pre, code, .no-emoticons'
	});
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map