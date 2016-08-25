"use strict";
////////////////// ADD ATTRACTION to database///////////////////////////
$(document).ready(function(){

	function makeAttModalMap(evt){
  var resultId = $(this).data('usereventId');
  console.log(resultId);
  initMaps[resultId]();
}

function populateUserEvModal(evt){
  var attractionId = $(this).data('usereventId');
  var modalToModalize = $('#usereventModal'+attractionId);
  modalToModalize.on('shown.bs.modal', makeAttModalMap).modal('show');
  //map things
}

$('.triggerAttModal').on('click', populateUserEvModal);


///////////////////Modal Details/Map Attraction /////////////////////////////

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

/////////////////// Change Heart Color for SAVE /////////////////////////////
});
