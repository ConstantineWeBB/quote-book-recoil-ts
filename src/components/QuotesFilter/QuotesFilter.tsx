import { useRecoilState } from 'recoil';
import {
  authorFilterState,
  quoteFilterState,
  onlyFavoriteFilterState,
} from '../../recoil/filterAtoms';

import styles from './QuotesFilter.module.scss';

export const QuotesFilter = () => {
  const [authorFilter, setAuthorFilter] = useRecoilState(authorFilterState);
  const [quoteFilter, setQuoteFilter] = useRecoilState(quoteFilterState);
  const [onlyFavorite, setOnlyFavorite] = useRecoilState(
    onlyFavoriteFilterState
  );

  const handleAuthorFilter = (e) => {
    setAuthorFilter(e.target.value);
  };

  const handleQuoteFilter = (e) => {
    setQuoteFilter(e.target.value);
  };

  const handleFavoriteToggle = () => {
    setOnlyFavorite((prev) => !prev);
  };

  const handleResetFilter = () => {
    setAuthorFilter('');
    setQuoteFilter('');
    setOnlyFavorite(false);
  };

  return (
    <div className={`${['app-block']} ${styles['block-quotes-filter']}`}>
      <div className={styles['filter-group']}>
        <input
          type="text"
          placeholder="Filter by author..."
          onChange={handleAuthorFilter}
          value={authorFilter}
        />
      </div>
      <div className={styles['filter-group']}>
        <input
          type="text"
          placeholder="Filter by quote..."
          onChange={handleQuoteFilter}
          value={quoteFilter}
        />
      </div>
      <div className={styles['filter-group']}>
        <label>
          <input
            type="checkbox"
            onChange={handleFavoriteToggle}
            checked={onlyFavorite}
          />
          Only Favorite
        </label>
      </div>
      <button className="buttons" onClick={handleResetFilter}>
        Reset Filter
      </button>
    </div>
  );
};

export default QuotesFilter;
