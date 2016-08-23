"use strict";
////////////////// ADD ATTRACTION to database///////////////////////////
$(document).ready(function(){

	function makeAttModalMap(evt){
  var resultId = $(this).data('attractionId');
  console.log(resultId);
  initMaps[resultId]();
}

function populateAttModal(evt){
  var attractionId = $(this).data('attractionId');
  var modalToModalize = $('#attractionModal'+attractionId);
  modalToModalize.on('shown.bs.modal', makeAttModalMap).modal('show');
  //map things
}

$('.triggerAttModal').on('click', populateAttModal);


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
