//Initial array of video game characters
let topics = ["Zelda", "Mario", "Aeris", "Sephiroth", "Sora", "Master Chief", "Pikachu", "Spyro", "Sonic", "Donkey Kong"];

//This function renders the buttons for the game characters you can select gifs for
function renderButtons() {
    
    $("#buttons-view").empty();
    for (let i=0; i<topics.length; i++) {
        const a = $("<button>");
        a.addClass("game-character");

        a.val(topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
    
}
//Initial character buttons
renderButtons();

//This function handles when the submit button is clicked
$("#add-character").on("click", function(event) {
    event.preventDefault();

    let person = $("#new-character").val().trim();
    topics.push(person);
    renderButtons();
})

//This function displays the desired character gifs
function displayCharGifs() {
    //clears the gif button div every time a new search button is clicked
    document.getElementById("gif-buttons").innerHTML = "";
    const gifChar = $(this).val();
    console.log(gifChar);
    //runs the API giphy search for the game character that was clicked
    const apiKey = "vz7Y8pRS78sIakq0OvKYZ6UeiByUJ6DV";
    var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + gifChar + "&api_key=" + apiKey + "&limit=10");
    xhr.done(function(response) { 
    
    console.log("success got response", response); 

    var gifs = response.data;
    
    //posts 10 gifs and their rating for the chosen game character
    for (i in gifs) {

        var ratings = $("<p>").text("Rating: " + response.data[i].rating);
        $("#gif-buttons").prepend(ratings);
        var stillImgURL = response.data[i].images.original_still.url;
        var animatedImgURL = response.data[i].images.original.url;
        var stillImg = $("<img>").attr("src", stillImgURL);
        $("#gif-buttons").prepend(
            `
            <button><img src=${stillImgURL}></button>
            `
        );
    };
    //currently not able to switch between still and moving gifs
    
});
}
//on click event that waits for a game character button to be clicked
$(document).on("click", ".game-character", displayCharGifs);
