files = [];

var form = $('#mainForm'),
	file = $('#exampleInputFile'),
	url  = $.trim(form.attr('action')),
	progress = $('#progress-bar'),
	table = $('#table');
	
	
	file.change(function(event) {
		files = event.currentTarget.files;			 
	});
	
	
	form.submit(function(event) {
		event.preventDefault();
		
		for (i = 0; i < files.length; i++) {
			
			var oData = new FormData();
			oData.append('file' + i, files[i]);
			
			
			var progressBar = '<div class="progress"><div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100" >0%</div></div>';
			
			table.append('<tr><td>'+files[i].name+'</td><td>'+progressBar+'</td></tr>');
			
			var tr = table.find('tr').last();
						
			$.ajaxUpload({
				url : url,		 
				data : oData,
				context : tr,
				uploadProgress: function (event, position, total, percent) {
					$(this.context).find('.progress-bar').width(percent + '%').text(percent + '%');
				}
			});
		
		}
	});