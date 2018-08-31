


//OAUTH
console.log(localStorage)

function fetchGroups(url, cb, data) {
	if(!data) data = [];
	
	$.ajax({
		dataType:'json',
		method:'get',
        url:meetupEndpoint,
        contentType: 'application/json',
		success:function(result) {
			console.log('back with ' + result.data.length +' results');
			console.dir(result);
			
		}
	});		
}

