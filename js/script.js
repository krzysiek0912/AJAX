const tweetLink = "https://twitter.com/intent/tweet?text=",
  quoteUrl =
    "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
  prefix = "https://cors-anywhere.herokuapp.com/";
function getQuote() {
  fetch(prefix + quoteUrl, { cache: "no-store" })
    .then(function(resp) {
      return resp.json();
    })
    .then(createTweet);
}

function createTweet(input) {
  let data = input[0];

  let dataElement = document.createElement("div");
  dataElement.innerHTML = data.content;
  let quoteText = dataElement.innerText.trim(),
    quoteAuthor = data.title,
    tweetText = "";

  if (!quoteAuthor.length) {
    quoteAuthor = "Unknown author";
    tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
  }

  if (tweetText.length > 140) {
    getQuote();
  } else {
    var tweet = tweetLink + encodeURIComponent(tweetText);
    document.querySelector(".quote").innerText = quoteText;
    document.querySelector(".author").innerText = "Author: " + quoteAuthor;
    document.querySelector(".tweet").setAttribute("href", tweet);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  getQuote();
  document.querySelector(".trigger").addEventListener("click", function() {
    console.log("trigger");
    getQuote();
  });
});
