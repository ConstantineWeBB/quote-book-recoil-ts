import { useState, useEffect, FormEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { FaSpinner } from 'react-icons/fa';
import createQuoteWithID from '../../utils/createQuoteWithID';
import { useQuoteQuery } from '../../hooks/useQuoteQuery';
import styles from './QuoteForm.module.scss';

import { quotesState } from '../../recoil/quotesAtom';
import { errorState } from '../../recoil/errorAtom';
import { Quote } from '../../types/Quote';

function QuoteForm() {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [, setQuotes] = useRecoilState(quotesState);
  const setError = useSetRecoilState(errorState);

  const {
    data: randomQuote,
    isFetching,
    error,
    refetch,
  } = useQuoteQuery('https://dummyjson.com/quotes/random');

  // добавляем случайную цитату
  useEffect(() => {
    if (randomQuote) {
      setQuotes((prevQuotes: Quote[]) => [...prevQuotes, randomQuote]);
    }
  }, [randomQuote, setQuotes]);

  // сохраняем ошибку
  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error, setError]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (quote.trim()) {
      const newQuote = createQuoteWithID({ quote, author }, 'manual');
      setQuotes((prevQuotes: Quote[]) => [...prevQuotes, newQuote]);
      setAuthor('');
      setQuote('');
    } else {
      setError("You didn't include a quote.");
    }
  };

  const handleAddRandomQuote = () => {
    refetch();
  };

  return (
    <div className={`${['app-block']} ${styles['block-form']}`}>
      <h2>Add a new quote</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          placeholder="Enter the author's name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="quote">Quote:</label>
        <textarea
          id="quote"
          placeholder="Enter a quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <div>
          <button className="buttons" type="submit">
            Add
          </button>
          <button
            className={`${['buttons']} ${styles['button-form']}`}
            type="button"
            disabled={isFetching}
            onClick={handleAddRandomQuote}
          >
            Get a random
            {isFetching && (
              <span
                style={{
                  paddingLeft: '5px',
                  position: 'absolute',
                  fontSize: '18px',
                }}
              >
                <FaSpinner />
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuoteForm;
