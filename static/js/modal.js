
"use strict";

$(document).ready(function(){




// Populates past event modal
// ##############################################

function makePastModal(results){

  var attendees = results;

  for (var key in attendees) {
    $("#attend" + attendees[key][0]).append(
      '<div id="wrapper" style="display:inline-block">' + '<img src="/static/images/' + attendees[key][3] + '" class="hover" id="wrapper" width="150">' + 
      '<p class="text">' + attendees[key][1] + ' ' + attendees[key][2] + '</p>' + '</div>')

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

  $.get("/view_past_attendees", past_info, makePastModal);
   $("#attend" + eventId).html("")
  
}

$('.triggerPastModal').on('click', populatePastModal);

// Populates user request's modal
// ##############################################

function makeRequestModal(results){

   var attendees = results;
 
  for (var key in attendees) {
    $("#att" +  + attendees[key][0]).append(
      '<div id="wrapper" style="display:inline-block">' + '<img src="/static/images/' + attendees[key][3] + '" class="hover" id="wrapper" width="150">' + 
      '<p class="text">' + attendees[key][1] + ' ' + attendees[key][2] + '</p>' + '</div>')

  };
}

function populateRequestModal(evt){
  var eventId = $(this).data('eventId');
  var modalToModalize = $('#requestModal'+eventId);
  modalToModalize.on('shown.bs.modal', makeRequestModal).modal('show');
    var request_info = {
    "event_id": eventId
  }
  
  $.get("/view_request_attendees", request_info, makeRequestModal);
   $("#att" + eventId).html("")
  //map things
}

$('.triggerRequestModal').on('click', populateRequestModal);

// populates user's created events
// ##############################################

function makeUserModal(results){
  
  var attendees = results;
  
  for (var key in attendees) {
    $("#attendees"  + attendees[key][0]).append(
      '<div id="wrapper" style="display:inline-block">' + '<img src="/static/images/' + attendees[key][3] + '" class="hover" id="wrapper" width="150">' + 
      '<p class="text">' + attendees[key][1] + ' ' + attendees[key][2] + '</p>' + '</div>')

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


// populates friends of upcoming events
// ##############################################

function showFriends(results) {

  var attendees = results;
 
  for (var key in attendees) {
    $("#a" +  + attendees[key][0]).append(
      '<div id="wrapper" style="display:inline-block">' + '<img src="/static/images/' + attendees[key][3] + '" class="hover" id="wrapper" width="150">' + 
      '<p class="text">' + attendees[key][1] + ' ' + attendees[key][2] + '</p>' + '</div>')

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


// populates user's event modal with a map
// ##############################################

function makeEvModalMap(evt){
  var eventId = $(this).data('eventId');
 
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
