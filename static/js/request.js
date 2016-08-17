function requestSent() {
  console.log("request sent");
}

function sendRequest(evt) {

 function getEventId() {
    var components = window.location.href.split("/");
    var componenets = window.location.href.split("/")
    var idx = componenets.length - 1
    return componenets[idx]
    }
  var requestItem = {
    "request": $(evt.target).data("friend-id"),
    "event_id": getEventId
  }

$.post("/send-request", requestItem, requestSent);

 $('.request').html("Added!");

}

$(".request").click(sendRequest);