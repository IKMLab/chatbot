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
      dataType: 'json',
      success: function(result) {
        $('#has-sentiment-ratio').html(result["has_sentiment_prob"]);
        $('#sentiment-ratio').html(result["subsentiment_prob"]);
        $('#sentiment-term').html(result["subsentiment"]);
        appendNewMessage(result["sentence"], "bot-message");
        autoScrollDown();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.status);
      }
  });
}

function appendNewMessage(msg, type){
  str = "<div class='message " + type + "'>";
  str += "<p>" + msg +"</p>";
  str += "</div>";
  $('#console').append(str);
}

function autoScrollDown(){
  console_item = $('#console');
  console_item.scrollTop(console_item.height());
}

//this runs each time enter is pressed.
function newEntry() {
  query = $('#chatbox').val();
  $('#chatbox').val(''); // clean the input
  if (query !== "") {
    appendNewMessage(query, "user-message");
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
