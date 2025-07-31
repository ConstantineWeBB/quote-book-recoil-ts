import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { fetchQuote, addQuote, selectIsLoadingViaAPI } from '../../redux/slices/quotesSlice';
import { setError } from '../../redux/slices/errorSlice';
import createQuoteWithID from '../../utils/createQuoteWithID';
import styles from './QuoteForm.module.scss';

function QuoteForm() {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const dispatch = useDispatch();
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quote) {
      dispatch(addQuote(createQuoteWithID({ author, quote }, 'manual')));
      setAuthor('');
      setQuote('');
    } else {
      dispatch(setError("You didn't include a quote."));
    }
  };

  const handleAddRandomQuote = () => {
    dispatch(fetchQuote('https://dummyjson.com/quotes/random'));
  }
  

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
        ></input>
        <label htmlFor="quote">Quote:</label>
        <textarea
          type="text"
          id="quote"
          placeholder="Enter a quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        ></textarea>
        <div>
          <button className="buttons" type="submit">
            Add
          </button>
          <button
            className={`${['buttons']} ${styles['button-form']}`}
            type="button"
            disabled={isLoadingViaAPI}
            onClick={handleAddRandomQuote}
          >
            Get a random
            {isLoadingViaAPI && (
              <span
                style={{
                  paddingLeft: '5px',
                  position: 'absolute',
                  fontSize:'18px'
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
