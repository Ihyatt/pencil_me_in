function requestSent() {
  console.log("request sent");
}

function sendRequest(evt) {


  var requestItem = {
    "request": $(evt.target).data("friend-id"),
    "event_id": $(evt.target).data("event-id")
  }

$.post("/send-request", requestItem, requestSent);

 $(evt.target).html("Added!");

}

$(".request").click(sendRequest);