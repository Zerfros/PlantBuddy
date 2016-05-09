$(function(){				
    $('#wateringbyUser').click(function(e){
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
	        contentType: 'application/json',
            url: 'http://localhost:3000/waterbyUser',						
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });