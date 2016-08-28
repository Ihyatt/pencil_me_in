
"use strict";
////////////////// ADD ATTRACTION to database///////////////////////////
$(document).ready(function(){


console.log("JS Connected");


// ##############################################

function makePastModal(results){
  console.log("user past event info");
  var attendees = results;
  console.log(attendees);
  for (var key in attendees) {
    $("#attend" + attendees[key][0]).append('<li>' + attendees[key][1] + ' ' + attendees[key][2] + '<br>' + 
      '<img src="/static/images/' + attendees[key][3] + '" class="img-thumbnail img-responsive" width="100">' + 
      '<li>')

  };
}

function populatePastModal(evt){
  var eventId = $(this).data('eventId');
  var modalToModalize = $('#pastModal'+eventId);
  modalToModalize.on('shown.bs.modal', makePastModal).modal('show');
  //map things
  var past_info = {
    "event_id": eventId
  }
  console.log(past_info);
  $.get("/view_past_attendees", past_info, makePastModal);
   $("#attend" + eventId).html("")
  
}

$('.triggerPastModal').on('click', populatePastModal);


// ##############################################

function makeRequestModal(results){
  console.log("user request event info")
   var attendees = results;
  console.log("here");
  for (var key in attendees) {
    $("#att" + attendees[key][0]).append('<li>' + attendees[key][1] + ' ' + attendees[key][2] + '<br>' + 
      '<img src="/static/images/' + attendees[key][3] + '" class="img-thumbnail img-responsive" width="100">' + 
      '<li>')
  };
}

function populateRequestModal(evt){
  var eventId = $(this).data('eventId');
  var modalToModalize = $('#requestModal'+eventId);
  modalToModalize.on('shown.bs.modal', makeRequestModal).modal('show');
    var request_info = {
    "event_id": eventId
  }
  console.log(request_info);
  $.get("/view_request_attendees", request_info, makeRequestModal);
   $("#att" + eventId).html("")
  //map things
}

$('.triggerRequestModal').on('click', populateRequestModal);


// ##############################################

function makeUserModal(results){
  console.log("user event info")
  var attendees = results;
  console.log("here");
  for (var key in attendees) {
    $("#attendees" + attendees[key][0]).append('<li>' + attendees[key][1] + ' ' + attendees[key][2] + '<br>' + 
      '<img src="/static/images/' + attendees[key][3] + '" class="img-thumbnail img-responsive" width="100">' + 
      '<li>')
  };
}

function populateUserModal(evt){
  var eventId = $(this).data('eventId');
  var modalToModalize = $('#userModal'+eventId);
  modalToModalize.on('shown.bs.modal', makeUserModal).modal('show');
  var info = {
    "event_id": eventId
  }
  $.get("/view_attendees", info, makeUserModal);
  $("#attendees" + eventId).html("")
  
}

$('.triggerUserModal').on('click', populateUserModal);


// ##############################################

function showFriends(results) {

  var attendees = results;
  console.log("attendees");
  for (var key in attendees) {
    $("#a" + attendees[key][0]).append('<li>' + attendees[key][1] + ' ' + attendees[key][2] + '<br>' + 
      '<img src="/static/images/' + attendees[key][3] + '" class="img-thumbnail img-responsive" width="100">' + 
      '<li>')
  };

}

function getFriends(evt){
  var eventId = $(this).data('eventId');
  //map things
  var info = {
    "event_id": eventId
  }
  $.get("/view_event_attendees", info, showFriends);
  $("#a" + eventId).html("")

}

$(".view").click(getFriends);

// ##############################################




function makeEvModalMap(evt){
  var eventId = $(this).data('eventId');
  console.log(eventId);
  initMaps[eventId]();
}

function populateEvModal(evt){
  var eventId = $(this).data('eventId');
  var modalToModalize = $('#eventModal'+eventId);
  modalToModalize.on('shown.bs.modal', makeEvModalMap).modal('show');
  //map things
}

$('.triggerEvModal').on('click', populateEvModal);


});
