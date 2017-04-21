// calendar JS
// #################################################################


$('#datetimepicker6').datetimepicker();
            $('#datetimepicker7').datetimepicker({
                useCurrent: false //Important! See issue #1075
            });
            $("#datetimepicker6").on("dp.change", function (e) {
                $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
            });
            $("#datetimepicker7").on("dp.change", function (e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
            });

// add start date
// #################################################################

function startDateAdded() {
	// write a test to check success of function
}


function saveStartDate(evt) {
	var date = $("#start-date").val()

	var dateInfo = {
		"date": date, 
		"event_id": $(evt.target).data("event-id"),
	}

$.post("/save_start_date", dateInfo, startDateAdded);
$(evt.target).html("Saved!");

}


$(".start").click(saveStartDate);


// add end date
// #################################################################
function endDateAdded() {
	// write a test to check success of function
}


function saveEndDate(evt) {
	var date = $("#end-date").val()

	var dateInfo = {
		"date": date, 
		"event_id": $(evt.target).data("event-id"),
	}

$.post("/save_end_date", dateInfo, endDateAdded);
$(evt.target).html("Saved!");

}

$(".end").click(saveEndDate);


