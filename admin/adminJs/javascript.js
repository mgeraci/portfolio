// Load these functions when the document is ready:
$(function(){
  adminSQL();
});

// ==============
// = Admin Page =
// ==============

function adminSQL(){
  // if we're on the admin page
  if ($('h1#adminPage').length != 0) {
    // add color to the table
    $('.adminPictureRow:odd:not(.inQueue)').css('background', '#abc189');

    // edit functions
    $('a.edit').click(function(){
      // add the row with inputs
      table = $('#adminTable').html();

      if (table == 'blog'){
        $(this).parent().parent().after('\
          <tr id="admin">\
            <td id="adminNumber" style="padding-left: 10px;"></td>\
            <td><input id="adminID"></input></td>\
            <td><input id="adminTitle"></input></td>\
            <td><input id="adminYear"></input></td>\
            <td><input id="adminWidth"></input></td>\
            <td><input id="adminHeight"></input></td>\
            <td></td>\
            <td><input id="adminVisible"></input></td>\
            <td><input id="adminSubmit" type="submit" value="submit"></input></td>\
            <td><input id="adminCancel" type="submit" value="cancel"></input></td>\
          </tr>\
        ');
      } else {
        $(this).parent().parent().after('\
          <tr id="admin">\
            <td id="adminNumber" style="padding-left: 10px;"></td>\
            <td><input id="adminID"></input></td>\
            <td><input id="adminTitle"></input></td>\
            <td><input id="adminInfo"></input></td>\
            <td><input id="adminYear"></input></td>\
            <td><input id="adminWidth"></input></td>\
            <td><input id="adminHeight"></input></td>\
            <td><input id="adminSubmit" type="submit" value="submit"></input></td>\
            <td><input id="adminCancel" type="submit" value="cancel"></input></td>\
          </tr>\
        ');
      }

      // make the old row vanish
      $('tr#admin').prev().css('display', 'none');

      // populate the inputs
      $('td#adminNumber').html($(this).parent().prevAll('td.number').html());
      $('input#adminID').val($(this).parent().prevAll('td.id').html());
      $('input#adminTitle').val($(this).parent().prevAll('td.title').html());
      if ((table == 'graphic') || (table == 'graphicTest')) {
        $('input#adminInfo').val($(this).parent().prevAll('td.info').html());
      }
      $('input#adminYear').val($(this).parent().prevAll('td.year').html());
      $('input#adminWidth').val($(this).parent().prevAll('td.width').html());
      $('input#adminHeight').val($(this).parent().prevAll('td.height').html());
      $('input#adminHeight').val($(this).parent().prevAll('td.height').html());

      if ((table == 'blog') || (table == 'photoTest')) {
        $('input#adminVisible').val($(this).parent().prevAll('td.visible').html());
      }

      // give the first field focus
      $('input#adminID').focus();

      // set the submit click functions
      adminTD();
    });

    // delete a row
    $('a.delete').click(function(){
      var answer = confirm("delete?")
      if (answer){
        data = 'number=' + $(this).parent().prevAll('td.number').html();
        data += '&table=' + $('#adminTable').html();

        $.ajax({
          url: "./api/delete.php",
          type: 'post',
          data: data,
          success: function(data){
            window.location.reload(true);
          }
        });
      }
      else{}
    });

    // when you click 'add a picture'
    $('a#adminAdd').click(function(){
      // clear/populate the table
      $('#adminAddID, #adminAddTitle').val('');
      // $('input#adminAddYear').val((new Date).getFullYear()); // add current year
      $('input#adminAddYear').val('2010');

      // make the table appear
      $('#adminAddDiv').slideDown('fast', function(){
        $('#adminAddID').focus();
      });

      // add cancel
      $('#adminAddCancel').click(function(){
        $('#adminAddDiv').slideUp('fast');
      })
    });

    // preview a picture when you hover on 'hover'
    $('td.anImage').mouseover(function(){
      table = $('#adminTable').html();

      tempID = $(this).prevAll('td.id').html();
      tempWidth = $(this).prevAll('td.width').html();
      tempHeight = $(this).prevAll('td.height').html();
      $('#picturePreview').html('');
      if (table == 'blog'){
        $('#picturePreview').append('<img src="/media/photography/blog/' + tempID + '.jpg" width="' + tempWidth + '" height="' + tempHeight + '" style="float: left;"><img src="/media/photography/blog/thumbs/' + tempID + '.jpg" style="float: left;">');
      } else if ((table == 'graphic') || (table == 'graphicTest')){
        $('#picturePreview').append('<img src="/media/graphic/' + tempID + '.jpg" width="' + tempWidth + '" height="' + tempHeight + '" style="float: left;"><img src="/media/graphic/thumbs/' + tempID + '.jpg" style="float: left;">');
      }
      $('#picturePreview').css('display', 'block');
    }).mouseout(function(){
      $('#picturePreview').css('display', 'none');
    });
    
    // truncate the tags table
    $('#truncateTags').click(function(){
      var answer = confirm("delete all tags?")
      if (answer){
        $.ajax({
          url: './api/truncateTags.php',
          success: function(data) {
            // alert(data);
            if (data == 1) {
              // alert('no more tags');
            } else {
              // alert(data)
            }
          }
        });
      }
    });
  }
}

// functions for editing a row
function adminTD(){
  // edit cancel
  $('input#adminCancel').click(function(){
    oldRow = $('tr#admin').prev();
    $('tr#admin').remove();
    oldRow.css('display', 'table-row');
  });

  // hitting esc in any field cancels
  $('input#adminNumber, input#adminID, input#adminTitle, input#adminInfo, input#adminYear, input#adminWidth, input#adminHeight').bind('keydown', 'esc', function(){
    oldRow = $('tr#admin').prev();
    $('tr#admin').remove();
    oldRow.css('display', 'table-row');
  });

  // edit submit
  $('input#adminSubmit').click(function(){
    adminSubmit();
  });

  // hitting enter in any field submits
  $('input#adminNumber, input#adminID, input#adminTitle, input#adminInfo, input#adminYear, input#adminWidth, input#adminHeight').bind('keydown', 'return', function(){
    adminSubmit();
  });
}

// on submit, concencate the variables and run the script
function adminSubmit(){
  table = $('#adminTable').html();

  data = '';

  data += 'number=' + $('td#adminNumber').html();
  data += '&id=' + $('input#adminID').val();
  data += '&title=' + $('input#adminTitle').val();
  data += '&year=' + $('input#adminYear').val();
  data += '&width=' + $('input#adminWidth').val();
  data += '&height=' + $('input#adminHeight').val();
  data += '&table=' + table;

  if ((table == 'graphic') || (table == 'graphicTest')) {
    data += '&info=' + $('input#adminInfo').val();
  }

  if ((table == 'blog') || (table == 'photoTest')) {
    data += '&visible=' + $('input#adminVisible').val();
  }

  data = encodeURI(data);

  $.ajax({
    url: './api/update.php',
    type: "POST",
    data: data,
    success: function(data) {
      window.location.reload(true);
    }
	})
}

// validate the form for adding a picture
function validateAddPicture(){
  var id = $('#adminAddID');
  var title = $('#adminAddTitle');
  var year = $('#adminAddYear');
  var photo = $('#adminAddPhoto');
  var thumbnail = $('#adminAddThumbnail');

    if (id.val() == "") {
        alert("Enter an ID.");
        id.focus();
        return false;
    }

  if (title.val() == "") {
        alert("Enter a title.");
        title.focus();
        return false;
    }

    if (year.val() == "") {
        alert("Enter a year.");
        year.focus();
        return false;
    }

    if (photo.val() == "") {
        alert("Select a picture.");
        year.focus();
        return false;
    }

  if (thumbnail.val() == "") {
        alert("Select a thumbnail.");
        year.focus();
        return false;
    }

    return true;
}