# Giphy-API
Assignment 6 - Giphy API webapp

This app use a jQuery AJAX call to the giphy API to populate top 10 searches for whatever the user inputs. The user's input is generated into a button, and when that button is clicked, the AJAX makes a call back to the API and I used the response to generate the images.

I finished the entire program except for the pause/unpause function very early on. I am really confused as to why the click event handler is not working for an image with the class "gif" when the image is dynamically generated, but when it is hard coded into the HTML, it works fine. I literally copy pasted one of the links that gets created from the dynamically generated images into an  line in the HTML and the handler works. I CANNOT see why it shouldn't work for the dynamically generated div.