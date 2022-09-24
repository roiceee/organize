import { useCallback, useEffect, useRef, useState } from "react";
import data from "../../data/quotes.json";
import styles from "../../styles/modules/transitions.module.scss";
interface QuoteStateInterface {
  author: string;
  quote: string;
}

function Quotes() {
  const [quote, setQuote] = useState<QuoteStateInterface>({
    author: "",
    quote: "",
  });
  let [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  const INTERVALMS: number = 12000;
  const FadeOutBeforeQuoteRefresh: number = INTERVALMS - 1000;

  const fadeOutHandler = useCallback(() => {
    const quoteElement = quoteRef.current;
    if (quoteElement === null) {
      return;
    }
    if (quoteElement.classList.contains(styles.fadeIn)) {
      quoteElement.classList.remove(styles.fadeIn);
    }
    quoteElement.classList.add(styles.fadeOut);
  }, []);

  const fadeInHandler = useCallback(() => {
    const quoteElement = quoteRef.current;
    if (quoteElement === null) {
      return;
    }
    if (quoteElement.classList.contains(styles.fadeOut)) {
      quoteElement.classList.remove(styles.fadeOut);
    }
    quoteElement.classList.add(styles.fadeIn);
  }, []);

  const loadQuote = useCallback(() => {
    const RANDOMNUMBER = Math.floor(Math.random() * data.quotes.length);
    setQuote(data.quotes[RANDOMNUMBER]);
  }, []);

  const loadQuoteWithEffects = useCallback(() => {
    fadeInHandler();
    loadQuote();
    setTimeout(() => {
      fadeOutHandler();
    }, FadeOutBeforeQuoteRefresh);
  }, [fadeInHandler, fadeOutHandler, loadQuote, FadeOutBeforeQuoteRefresh]);

  useEffect(() => {
    if (!hasLoaded) {
      loadQuoteWithEffects();
      setHasLoaded(true);
      return;
    }
    setInterval(() => {
      loadQuoteWithEffects();
    }, INTERVALMS);
  }, [loadQuoteWithEffects, hasLoaded]);

  return (
    <div
      className="d-flex flex-column"
      style={{ fontSize: "0.9rem" }}
      ref={quoteRef}
    >
      <p>&quot;{quote.quote}&quot;</p>
      <p className="align-self-end">- {quote.author}</p>
    </div>
  );
}

export default Quotes;
