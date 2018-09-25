jQuery.axpost = function(type, url, data, contentType, successfn) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	
	$.ajax({
		type: type,
		data: data,
		url: url
		contentType: contentType,
		dataType: "json",
		success: function(d) {
			
		},
		error: function(error) {
			
		}
	});
};