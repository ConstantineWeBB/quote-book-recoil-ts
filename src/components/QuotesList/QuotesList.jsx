import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { MdOutlineDeleteSweep } from 'react-icons/md';

import { quotesState } from '../../recoil/quotesAtom.ts';
import {
  authorFilterState,
  quoteFilterState,
  onlyFavoriteFilterState,
} from '../../recoil/filterAtoms.ts';

import QuoteModal from '../QuoteModal/QuoteModal';
import styles from './QuotesList.module.scss';

function QuoteList() {
  const [quotes, setQuotes] = useRecoilState(quotesState);
  const authorFilter = useRecoilValue(authorFilterState);
  const quoteFilter = useRecoilValue(quoteFilterState);
  const onlyFavoriteFilter = useRecoilValue(onlyFavoriteFilterState);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleDeleteQuote = (id) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  const handleToggleQuote = (id) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isFavorite: !q.isFavorite } : q))
    );
  };

  const handleClearAllQuotes = () => {
    setQuotes([]);
  };

  const filtredQuotes = quotes.filter((quote) => {
    const matchesAuthor = quote.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());

    const matchesQuote = quote.quote
      .toLowerCase()
      .includes(quoteFilter.toLowerCase());

    const matchesFavorite = onlyFavoriteFilter ? quote.isFavorite : true;

    return matchesAuthor && matchesQuote && matchesFavorite;
  });

  const highLightMatch = (text, filter) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, 'gi');
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span className={styles['highLight']} key={i}>
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className={`${['app-block']} ${styles['block-quotes-list']}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ margin: '0 auto' }}>QuoteList</h2>
        {quotes.length !== 0 && (
          <div className={styles['quote-actions']}>
            <button
              className={styles['quote-actions__buttons']}
              type="button"
              onClick={handleClearAllQuotes}
              style={{ fontSize: '30px', borderRadius: '10px' }}
            >
              <MdOutlineDeleteSweep />
            </button>
          </div>
        )}
      </div>
      <ul>
        {quotes.length !== 0 ? (
          filtredQuotes.map((quote, i) => (
            <li key={quote.id}>
              <div
                className={styles['quote-info']}
                onClick={() => setSelectedQuote(quote)}
              >
                <div className={styles['quote-content']}>
                  {++i}. "{highLightMatch(quote.quote, quoteFilter)}"
                </div>
                <div className={styles['author-source']}>
                  by{' '}
                  <strong>{highLightMatch(quote.author, authorFilter)}</strong>{' '}
                  ({quote.source})
                </div>
              </div>

              <span onClick={() => handleToggleQuote(quote.id)}>
                {quote.isFavorite ? (
                  <BsBookmarkStarFill className={styles['favorite-icon']} />
                ) : (
                  <BsBookmarkStar className={styles['favorite-icon']} />
                )}
              </span>
              <div className={styles['quote-actions']}>
                <button
                  className={styles['quote-actions__buttons']}
                  onClick={() => handleDeleteQuote(quote.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No quotes available</p>
        )}
      </ul>
      <QuoteModal
        isOpen={!!selectedQuote}
        quote={selectedQuote}
        onClose={() => setSelectedQuote(null)}
      />
    </div>
  );
}

export default QuoteList;
