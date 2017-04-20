// deletes user created event
// #################################################################


function eventDeleted() {
 
  location.reload(true);
}


function deleteEvent(evt) {

var deleteItem = {
event_id: $(evt.target).data("event-id")
}

$.post("/delete_event", deleteItem, eventDeleted);

}


$(".delete").click(deleteEvent);


// declines event request
// #################################################################


function eventDeclined(){
 
  location.reload(true);
}

function declineEvent(evt){
var rejection = {
  event_id: $(evt.target).data("event-id")
}

$.post("/decline_event", rejection, eventDeclined);
}

$(".decline_request").click(declineEvent);

// toggles event info
// #################################################################


$("#user-toggle").hide();
$("#user-events-div").click(function() {
  $( "#user-toggle" ).toggle( "slow" );
});

$("#requests-toggle").hide();
$("#requests-div").click(function() {
  $( "#requests-toggle" ).toggle( "slow" );
});


$( "#past-toggle" ).hide();
$("#past-div").click(function() {
  $( "#past-toggle" ).toggle( "slow" );
});


