var buttonsArray = ["Galaxies", "Black Holes", "Speed of Light", "Multiverse", "Universe", "Space", "Astonauts", "Sun", "Moon", "Solar System"];
var displayYet = false;
var queryURLBase = "http://api.giphy.com/v1/gifs/search";

//Creates the buttons at the top of the page for searching giphy
var createButtons = function(position) {
	var newButton = $("<button>");
	newButton.attr("id", "button-" + position);
    newButton.attr("data-button", position);
	newButton.addClass("gifButtons btn btn-primary");
	newButton.append(buttonsArray[position]);
	$("#buttonsDiv").append(newButton);
};

//Creates the inital buttons from the buttonsArray
var initialButtons = function() {
	for (var i = 0; i < buttonsArray.length; i++) {
		createButtons(i);
	}
};

//Creates a new button from the form
$("#addCategory").on("click", function(event) {
	buttonsArray.push($("#category").val().trim());
	createButtons(buttonsArray.length - 1);
});

//On click for the giphy search buttons
$(document.body).on("click", ".gifButtons", function() {
    var gifID = $(this).attr("data-button");
    var URL = queryURLBase + "?api_key=2b1744e57f8442f89add8eb7edb9ad11&q=" + buttonsArray[gifID] + "&limit=10";
    $.ajax({
	    url: URL,
	    method: 'GET'
   	}).done(function(response) {
   		displayGifs(response);
   	});
 });

//Creats the html for the gif displays from the search
var displayGifs = function(response) {
	if (displayYet === false){
		displayYet = true;
	}
	else if (displayYet === true){
		$("#displayDiv").empty();
	}

	for (var i = 0; i < 10; i++) {
	var div = $("<div class='display'>");
	div.attr("id", "displayDiv" + i);
	div.addClass("displayWrapper");
	var p = $("<p>").text("Rating: " + response.data[i].rating);
	p.attr("id", "rating-" + i);
	p.addClass("ratings");
	div.append(p);
	var img = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
	img.attr("id", "image-" + i);
	img.addClass("images");
	img.attr("data-image", i);
	img.attr("data-state", "still");
	img.attr("data-still", response.data[i].images.fixed_height_still.url);
	img.attr("data-animate", response.data[i].images.fixed_height_downsampled.url);
	console.log(img.attr("data-image"));
	div.append(img);
	$("#displayDiv").append(div);
	}
};

//On click waiting for gifs to animate and stop animation
$(document.body).on("click", ".images", function() {
	var state = $(this).attr("data-state");

	if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});

initialButtons();
