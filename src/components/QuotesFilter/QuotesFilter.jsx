import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthorFilter,
  setQuoteFilter,
  setOnlyFavoriteToggle,
  selectAuthorFilter,
  selectQuoteFilter,
  selectOnlyFavoriteToggle,
  resetFilter,
} from '../../redux/slices/filterSlice';
import styles from './QuotesFilter.module.scss';

export const QuotesFilter = () => {
  const dispatch = useDispatch();
  const authorFilter = useSelector(selectAuthorFilter);
  const quoteFilter = useSelector(selectQuoteFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteToggle);

  const handleAuthorFilter = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleQuoteFilter = (e) => {
    dispatch(setQuoteFilter(e.target.value));
  };

  const handleFavoriteToggle = () => {
    dispatch(setOnlyFavoriteToggle());
  };

  const handleResetFilter = () => {
    dispatch(resetFilter());
  };

  return (
    <div className={`${['app-block']} ${styles['block-quotes-filter']}`}>
      <div className={styles['filter-group']}>
        <input
          type="text"
          placeholder="Filter by author..."
          onChange={handleAuthorFilter}
          value={authorFilter}
        ></input>
      </div>
      <div className={styles['filter-group']}>
        <input
          type="text"
          placeholder="Filter by quote..."
          onChange={handleQuoteFilter}
          value={quoteFilter}
        ></input>
      </div>
      <div className={styles['filter-group']}>
        <label>
          <input
            type="checkbox"
            onChange={handleFavoriteToggle}
            checked={onlyFavoriteFilter}
          ></input>
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
