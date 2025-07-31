import QuoteForm from './components/QuoteForm/QuoteForm';
import QuotesList from './components/QuotesList/QuotesList';
import QuotesFilter from './components/QuotesFilter/QuotesFilter';
import Error from './components/Error/Error';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1 className="app-header">Quote Book</h1>
      </header>
      <main className="app-main">
        <div className="app-main__left-column">
          <QuoteForm />
        </div>
        <div className="app-main__right-column">
          <QuotesFilter />
          <QuotesList />
        </div>
      </main>
      <Error />
    </div>
  );
}

export default App;
