function updateResponse(query){

  url = "https://ikmchatbot.com:9487/forward";
  query_data = {
    "query": query
  };

  response = "";
  $.ajax({
      type: 'get',
      url: url,
      data: query_data,
      dataType: 'text',
      success: function(result) {
        str = "<div class='message bot-message'>";
        str += "<p>" + result +"</p>";
        str += "</div>";
        $('#console').append(str);
        autoScrollDown();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
      }
  });
}

function autoScrollDown(){
  console = $('#console');
  console.scrollTop(console.height());
}

//this runs each time enter is pressed.
function newEntry() {
  query = $('#chatbox').val();
  $('#chatbox').val(''); // clean the input
  if (query !== "") {
    str = "<div class='message user-message'>";
    str += "<p>" + query +"</p>";
    str += "</div>";
    $('#console').append(str);
    autoScrollDown();
    updateResponse(query);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}
