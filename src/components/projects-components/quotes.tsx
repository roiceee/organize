import { useEffect, useState } from "react";
import data from "../../data/quotes.json";

interface QuoteStateInterface {
  author: string;
  quote: string;
}

function Quotes() {
  const [quote, setQuote] = useState<QuoteStateInterface>({
    author: "",
    quote: "",
  });

  useEffect(() => {
    const RANDOMNUMBER = Math.floor(Math.random() * data.quotes.length);
    setQuote(data.quotes[RANDOMNUMBER]);
  }, []);

  return (
    <div className="d-flex flex-column" style={{fontSize: "0.9rem"}}>
      <p>&quot;{quote.quote}&quot;</p>
      <p className="align-self-end">- {quote.author}</p>
    </div>
  );
}

export default Quotes;
