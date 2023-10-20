import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { TwitterShareButton } from "react-share";

function Card() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    fetchQuotes();
  }, []);
  const fetchQuotes = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setQuotes(data);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  const displayQuote = quotes[quoteIndex]?.text;
  const displayAuthor = quotes[quoteIndex]?.author;
  const shareUrl = "https://your-website-url.com"; // Replace with your website URL
  const title = displayQuote;

  function handleClick() {
    setQuoteIndex(Math.floor(quotes.length * Math.random()));
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
  }

  return (
    <div id="quote-box">
      <div id="text">"{displayQuote}"</div>

      <div id="author">-{displayAuthor}</div>

      <button id="new-quote" onClick={handleClick}>
        Generate a new quote
      </button>

      {/*TODO:ADD TWEET FUNCTIONALITY*/}
      <TwitterShareButton url={shareUrl} title={title}>
        <button id="tweet-quote">Tweet</button>
      </TwitterShareButton>
    </div>
  );
}

export default Card;
