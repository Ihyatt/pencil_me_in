// add start date
// #################################################################

function startDateAdded() {
	console.log("start date added")
}


function saveStartDate(evt) {
	var date = $("#start-date").val()

	var dateInfo = {
		"date": date, 
		"event_id": $(evt.target).data("event-id"),
	}

$.post("/save_start_date", dateInfo, startDateAdded);

}


$(".start").click(saveStartDate);


// add end date
// #################################################################
function endDateAdded() {
	console.log("end date added")
}


function saveEndDate(evt) {
	var date = $("#end-date").val()

	var dateInfo = {
		"date": date, 
		"event_id": $(evt.target).data("event-id"),
	}

$.post("/save_end_date", dateInfo, endDateAdded);

}

$(".end").click(saveEndDate);


