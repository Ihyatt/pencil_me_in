function requestSent() {
  console.log("request sent");
}

function sendRequest(evt) {

 function getEventId() {
    var components = window.location.href.split("/");
    var lastSet = components[components.length - 1]
    var idx = lastSet.slice(0,-1);
    return idx
    }
  var requestItem = {
    "request": $(evt.target).data("friend-id"),
    "event_id": getEventId
  }

$.post("/send-request", requestItem, requestSent);

 $('.request').html("Added!");

}

$(".request").click(sendRequest);