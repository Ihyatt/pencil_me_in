// send request to other users for upcoming events
// #################################################################

function requestSent() {
  console.log("request sent");
}



function sendRequest(evt) {


  var requestItem = {
    "request": $(evt.target).data("friend-id"),
    "event_id": $(evt.target).data("event-id")
  }
  console.log(requestItem);

$.post("/send-request", requestItem, requestSent);

 $(evt.target).html("Request Sent");

 
 
}

$(".request").click(sendRequest);