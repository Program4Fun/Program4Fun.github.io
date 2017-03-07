$(document).ready(function(){
	// get the right column's div.
	var timeDiv = $("#time");

	// get the left colum's div.
	var scheduleDiv = $("#schedule");

	// load time and schedule templates and create template for each time on the day.
	$.get('./templates/time_template.html', function(data){
		var timeTemplate = Handlebars.compile(data);
		$.get('./templates/schedule_template.html', function(data){
			var scheduleTemplate = Handlebars.compile(data);
			for (var i = 0; i < 24; i++) {
				var time = (i<10 ? "0" + i : i) + ":00";
				$(timeDiv).append(timeTemplate({time}));
				$(scheduleDiv).append(scheduleTemplate({header:'Nothing here', desc:'edit this', start:time, end:time}));
			}
		}, 'html');
	}, 'html');
});