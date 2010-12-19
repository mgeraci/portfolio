// Load these functions when the document is ready:
$(function(){
  admin();
  adminEdit();
  adminDelete();
  adminAdd();
});

// general admin js
function admin(){
  // add color to the table
  $('.adminPictureRow:odd:not(.inQueue)').css('background', '#abc189');

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

// click on row edit
function adminEdit(){
  $('a.edit').click(function(){
    // get the current table
    table = $('#adminTable').html();

    form = '\
      <tr id="admin">\
        <form id="edit" action="./api/update.php" method="post">\
          <td style="padding-left: 10px;">\
            <input name="number" id="adminNumber" type="text"></input>\
          </td>\
          <td>\
            <input name="id" id="adminID"></input>\
            <input name="table" style="display: none;" type="text" value="' + table + '"></input>\
          </td>\
          <td><input name="title" id="adminTitle"></input></td>';

          if (table == 'graphic') {
            form += '<td><input name="info" id="adminInfo"></input></td>';
          }

          form += '<td><input name="year" id="adminYear"></input></td>\
          <td><input name="width" id="adminWidth"></input></td>\
          <td><input name="height" id="adminHeight"></input></td>'

          if (table == 'blog') {
            form += '<td></td>\
            <td><input name="visible" id="adminVisible"></input></td>';
          }

          form += '<td><input id="adminSubmit" type="submit" value="submit"></input></td>\
          <td><input id="adminCancel" type="submit" value="cancel"></input></td>\
        </form>\
      </tr>\
    ';

    // add the form to the dom
    $(this).parent().parent().after(form);

    // make the old row vanish
    $('tr#admin').prev().hide();

    // populate the inputs
    $('input#adminNumber').val($(this).parent().prevAll('td.number').html());
    $('input#adminID').val($(this).parent().prevAll('td.id').html());
    $('input#adminTitle').val($(this).parent().prevAll('td.title').html());

    if ((table == 'graphic')) {
      $('input#adminInfo').val($(this).parent().prevAll('td.info').html());
    }

    $('input#adminYear').val($(this).parent().prevAll('td.year').html());
    $('input#adminWidth').val($(this).parent().prevAll('td.width').html());
    $('input#adminHeight').val($(this).parent().prevAll('td.height').html());
    $('input#adminHeight').val($(this).parent().prevAll('td.height').html());

    if ((table == 'blog')) {
      $('input#adminVisible').val($(this).parent().prevAll('td.visible').html());
    }

    // give the first field focus
    $('input#adminID').focus();

    // set the cancel handlers (button and escape)
    updateCancel();
  });
}

// delete a row
function adminDelete(){
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
  });
}

// add an image
function adminAdd(){
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
}

// functions for editing a row
function updateCancel(){
  // edit cancel
  $('input#adminCancel').click(function(){
    oldRow = $('tr#admin').prev();
    $('tr#admin').remove();
    oldRow.css('display', 'table-row');

    return false;
  });

  // hitting esc in any field cancels
  $('input#adminNumber, input#adminID, input#adminTitle, input#adminInfo, input#adminYear, input#adminWidth, input#adminHeight, input#adminVisible').bind('keydown', 'esc', function(){
    oldRow = $('tr#admin').prev();
    $('tr#admin').remove();
    oldRow.css('display', 'table-row');
  });
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