"use strict"
//Userlist data array for filling in info box
var userListData = [];
// var tableContent;

// DOM ready
$(document).ready(function(){
  //populate the user table on init page load
  populateTable();

  //select user click handler
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

  //add user button click handler
  $('#btnAddUser').on('click', addUser);

  //select user click handler
  $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

});

// Worker functions

//delete user handler
function deleteUser(event){
  event.preventDefault();

  var confirmation = confirm('Nuke user record? Please confirm.');

  if (confirmation) {

    $.ajax({
      type: 'DELETE',
      url: 'users/deleteuser/' + $(this).attr('rel')
    }).done(function(res){
      if (res.msg === ''){
        console.debug('')
      } else {
        alert('ERROR: ' + res.msg);
      }
      populateTable();
    });

  } else {
    //do nothing if they select no, or if confirmation is falsy
    return false;
  }

}

//add new user from form
function addUser(event){
  //event.preventDefault();

  var errorCount = 0;
  $('#addUser input').each(function(index, value, array){
    if ($(this).val() === '') {errorCount = errorCount + 1}
  });

  if (errorCount === 0){

    var newUser = {
      'username' : $('#addUser fieldset input#inputUserName').val(),
      'email' : $('#addUser fieldset input#inputUserEmail').val(),
      'fullname' : $('#addUser fieldset input#inputUserFullname').val(),
      'age' : $('#addUser fieldset input#inputUserAge').val(),
      'location' : $('#addUser fieldset input#inputUserLocation').val(),
      'gender' : $('#addUser fieldset input#inputUserGender').val()
    };

    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function(response){

      //check for success and clear form and refresh list
      if (response.msg === ''){

        //clear entry fields
        $('#addUser fieldset input').val('');

        //refresh list
        populateTable();
      }
      else {
        alert('Error: ' + response.msg);
      }
    });
  }
  else {
    //all fields must be filled
    alert('Please fill in all fields');
    return false;
  }

}

//select single user for display in user information div
function showUserInfo(event){

  // Prevent Link from Firing...
  event.preventDefault();

  //Get username from rel attribute
  var thisUserName = $(this).attr('rel');

  //Get Index of object based on id value
  //this looks funky...I think there may be a way to not return *every* username.
  var arrayPosition = userListData.map(function(arrayItem, index, array){
    return arrayItem.username;
  }).indexOf(thisUserName);

  //get the user we want to work with
  var thisUserObject = userListData[arrayPosition];

  $('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);
}

// populate table with data
function populateTable() {

  //empty content string
  var tableContent = '';
  //console.log('running populateTable');

  $.getJSON( '/users/userlist', function(data){
    //console.log('in getJSON callback');
    userListData = data;
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
