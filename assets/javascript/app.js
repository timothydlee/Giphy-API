$(document).ready(function(){
	//Initial array of shows to display on HTML
	var showsArray = ["archer", "saved by the bell", "breaking bad", "saturday night live", "family guy", "the simpsons", "bob's burgers"];
		
	//			Generate GIFS function via AJAX call
	// ========================================================
	function userShowInput(){
		//Every time this function is called, it empties grid so whatever is searched looks like it's replacing the grid
		$("#showGifs").empty();
		//Setting a variable to hold the "data-name" attribute of whatever is clicked. The data-name attribute is
		//set to the input, which is declared in $("#addShow").on("click" function(){})
		var userShow = $(this).attr("data-name");
		//Setting variable to hold the user input to dynamically generate URL to query in the AJAX call
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userShow + "&api_key=dc6zaTOxFJmzC";
		//AJAX call to return the JSON of the searched query
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);
			//For loop to return only 10 gifs
			for (var i = 0; i<10; i++){
				//Generating generic div to dynamically generate divs with the class "show"
				var showDiv = $("<div class='showGif'>");
				//Setting variable to shorthand drilling down into the API response's object
				var gif = response.data[i];
				//Setting variable that holds rating of the gif by drilling into the API response's object.
				var rated = gif.rating;
				//Setting variable to dynamically generate p elements that will disclose the rating of 
				//each gif
				var pOne = $("<p>").text("Rating: " + rated);
				//Setting variable to easily reference the still image of the gif being searched for
				var gifStill = gif.images.original_still.url;
				//Setting variable to easily reference the animated image of the gif being searched for
				var gifAnimated = gif.images.original.url;
				//Creating variable to hold the dynamically create img tag
				var gifURL = $("<img>");
				//Assigning attributes data-name, state of still and data animated and data still states and src and alt to the gifURL
				gifURL.attr(
				{
					"src": gifStill, 
					"data-still": gifStill, 
					"data-animate": gifAnimated, 
					"data-state": "still",
					"alt": "giphy " + i
				}).addClass("gif");
				console.log(gifURL);
				//Appending pOne to showDiv
				showDiv.append(pOne);
				//Sets the HTML of the variable showDiv to the gifURL which contains the running gif
				showDiv.append(gifURL);
				//ID showGifs in HTML appends complete showDiv variable, which contains the running gif
				//as well as the rating 
				$("#showGifs").append(showDiv);
			};
		});
	};

	//					Rendering Buttons Dynamically
	// ========================================================
	//Renders buttons dynamically with the info above.
	function renderButtons(){
		//Empties the show buttons div so when appending, it doesn't chain onto pre-existing buttons
		$("#showButtons").empty();
		
		for (var i = 0; i < showsArray.length; i++) {
			//Using jQuery call to create buttons
			var x = $("<button>");
			//Adding class "show", attribute data-name "name of the show in the array", and then text "name of the show in the array" to each new button 
			x.attr("data-name", showsArray[i]).addClass("show").text(showsArray[i]);
			//Appends each new button.
			$("#showButtons").append(x);
		};
	};

	//					Clicking Add Show
	// ========================================================
	//Handles click action of when Add Show button is clicked
	$("#addShow").on("click", function(){
		console.log("are we in here?");
		//Variable that holds the trimmed value of the form field input ("#showInput")
		var newShow = $("#showInput").val().trim();
		//Push newShow into the array
		showsArray.push(newShow);
		//Render button function renders new buttons, including the recently pushed index item
		renderButtons();
		//Allows the user to press enter as well as prevents "submit" button's default action of
		//refreshing the page.
		return false;
	});



	//			Generic Click Element with Class "show" 
	// ========================================================
	//In the document, whenever a click occurs on an element with class "show", it will run function userShowInput
	$(document).on("click", ".show", userShowInput);

	//		Click event handler to pause and unpause gifs
	// ========================================================
	//On click of element with the class "gif" in the document body
	$(document.body).on("click", ".gif", function() {
		//Creating variable to store the clicked element's data-state value, which is set to either still or animate
		var state = $(this).attr("data-state");
		//If that state is still
		if ( state == "still"){
			//Clicked element src URL will be switched from static image to animated gif URL, data-state will be changed to animate
			$(this).attr({"src": $(this).data("animate"), "data-state": "animate"});
		} else {
			//Reverse happens if state is animate
			$(this).attr({"src": $(this).data("still"), "data-state": "still"});
		};
	});

	//Renders buttons for the first page load.
	renderButtons();

}); //Ends overall document ready function