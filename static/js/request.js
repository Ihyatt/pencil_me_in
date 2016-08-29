function requestSent() {
  console.log("request sent");
}


function messageChange(evt) {
    if ($(".request").innerText !== "send request") {
        $(".request").innerText = "goodbye";
  } else {
        $(".request").innerText = "send request";
    }
  }


function sendRequest(evt) {


  var requestItem = {
    "request": $(evt.target).data("friend-id"),
    "event_id": $(evt.target).data("event-id")
  }
  console.log(requestItem);

$.post("/send-request", requestItem, requestSent);

 $(evt.target).html("remove request");

 
 
}

$(".request").click(sendRequest);