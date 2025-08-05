import { useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { MdOutlineDeleteSweep } from 'react-icons/md';

import { quotesState } from '../../recoil/quotesAtom';
import {
  authorFilterState,
  quoteFilterState,
  onlyFavoriteState,
} from '../../recoil/filterAtoms';
import QuoteModal from '../QuoteModal/QuoteModal';
import styles from './QuotesList.module.scss';
import { Quote } from '../../types/Quote';

function QuotesList() {
  const [quotes, setQuotes] = useRecoilState(quotesState);
  const authorFilter = useRecoilValue(authorFilterState);
  const quoteFilter = useRecoilValue(quoteFilterState);
  const onlyFavoriteFilter = useRecoilValue(onlyFavoriteState);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const handleDeleteQuote = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  const handleToggleQuote = (id: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isFavorite: !q.isFavorite } : q))
    );
  };

  const handleClearAllQuotes = () => {
    setQuotes([]);
  };

  const highLightMatch = (text: string, filter: string) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, 'gi');
    return text.split(regex).map((substring, i) =>
      substring.toLowerCase() === filter.toLowerCase() ? (
        <span className={styles['highLight']} key={i}>
          {substring}
        </span>
      ) : (
        substring
      )
    );
  };

  const filteredQuotes = quotes.filter((quote) => {
    const matchesAuthor = quote.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesQuote = quote.quote
      .toLowerCase()
      .includes(quoteFilter.toLowerCase());
    const matchesFavorite = onlyFavoriteFilter ? quote.isFavorite : true;

    return matchesAuthor && matchesQuote && matchesFavorite;
  });

  return (
    <div className={`${['app-block']} ${styles['block-quotes-list']}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ margin: '0 auto' }}>QuoteList</h2>
        {quotes.length > 0 && (
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
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote, i) => (
            <li key={quote.id}>
              <div
                className={styles['quote-info']}
                onClick={() => setSelectedQuote(quote)}
              >
                <div className={styles['quote-content']}>
                  {i + 1}. "{highLightMatch(quote.quote, quoteFilter)}"
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

export default QuotesList;
