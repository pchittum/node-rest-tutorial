"use strict"
//Userlist data array for filling in info box
var userListData = [];
var tableContent;

// DOM ready
$(document).ready(function(){
  //populate the user table on init page load
  populateTable();

});

// Worker functions

// populate table with data
function populateTable() {

  //empty content string
  tableContent = '';
  //console.log('running populateTable');

  $.getJSON( '/users/userlist', function(data){
    //console.log('in getJSON callback');

    //for each item in JSON add a tr with cells and content
    $.each(data, function(){
      //console.log('building table');
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">Delete</a></td>';
      tableContent += '</tr>';
    });
    //console.log(tableContent);

    // Inject the whole content into our DOM in the html table
    //console.log('updating table body');
    $('#userList table tbody').html(tableContent);
  });
}
