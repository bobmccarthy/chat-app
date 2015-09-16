'use strict';

$(document).ready(function(){
	var main=$('#main');
	var input=$('#input');
	var form=$('form');
	var conversation=$('#conversation');
	var deleteButton=$('.delete');
	var name=$('#name');
	var userName=$('#userName')
	var userSubmit=$('#userSubmit');
	


	main.hide();

	userSubmit.click(function(){
		userName.css({display: 'none'});
		main.show();
	})

	form.submit(function(e){
		e.preventDefault();
		var dat= new Date();
		var date=dat.toISOString();


		$.post(
			'http://tiyfe.herokuapp.com/collections/bobs-chat-app',
			{message: input.val(), timeSince: date, person: name.val()},
			function(response) {
			},
			'json'
		);
		input.val('');
	})
	setInterval(function() {

		$.get(
			'http://tiyfe.herokuapp.com/collections/bobs-chat-app',
			function(response) {
				conversation.html('');
				response.reverse();
				for(var i=0; i<response.length; i++) {
					conversation.append('<div class="timeStamp">'+response[i].person+' said'+'<br>'+moment(response[i].timeSince).fromNow()+'</div>'+'<div class="eMessage">'+response[i].message+'</div>');

				}
			},
			'json'
		);
	}, 500);

	deleteButton.click(function(){
		$.get(
			'http://tiyfe.herokuapp.com/collections/bobs-chat-app',
			function(response){
				response.forEach(function(record){
					$.ajax({
						url: 'http://tiyfe.herokuapp.com/collections/bobs-chat-app/'+record._id,
						method: 'DELETE'
					});
				});
			}
		);


	})

	
});



