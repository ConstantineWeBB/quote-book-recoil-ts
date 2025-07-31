import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import createQuoteWithID from '../../utils/createQuoteWithID';
import { setError } from './errorSlice';

const initialState = {
  quotes: JSON.parse(localStorage.getItem('quotes'))?.allQuotes || [],
  isLoadingViaAPI: false,
};

export const fetchQuote = createAsyncThunk(
  'quotes/fetchQuote',
  async (url, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(url);
      const newData = createQuoteWithID(res.data, 'API')

      const savedData = JSON.parse(localStorage.getItem('quotes')) || {};

      if (newData.quote) {
        savedData.lastRandomQuote = newData;
        if (!savedData.allQuotes) savedData.allQuotes = [];
        savedData.allQuotes.push(newData);
      } 

      localStorage.setItem('quotes', JSON.stringify(savedData));
      return newData;
    } catch (error) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

function updateLocalStorage(quotes) {
  const savedData = JSON.parse(localStorage.getItem('quotes')) || {};
  savedData.allQuotes = quotes;
  localStorage.setItem('quotes', JSON.stringify(savedData));
}

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    addQuote: (state, action) => {
      const newQuote = {
        id: uuidv4(),
        quote: action.payload.quote,
        author: action.payload.author || 'Anonymous',
        source: action.payload.source,
      };
      state.quotes.push(newQuote);
      updateLocalStorage(state.quotes);
    },

    delQuote: (state, action) => {
      state.quotes = state.quotes.filter(
        (quote) => quote.id !== action.payload
      );
      updateLocalStorage(state.quotes);
    },
    clearAllQuotes: (state) => {
      state.quotes = [];
      updateLocalStorage(state.quotes);
    },
    toggleFavoriteQuote: (state, action) => {
      const quote = state.quotes.find((quote) => quote.id === action.payload);
      if (quote) {
        quote.isFavorite = !quote.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuote.pending, (state, action) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchQuote.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      state.quotes.push(action.payload);
    });
    builder.addCase(fetchQuote.rejected, (state, action) => {
      state.isLoadingViaAPI = false;
    });
  },
});

export const { addQuote, delQuote, toggleFavoriteQuote, clearAllQuotes } =
  quotesSlice.actions;
export const selectQuotes = (state) => state.quotes.quotes || [];
export const selectIsLoadingViaAPI = (state) => state.quotes.isLoadingViaAPI;
export default quotesSlice.reducer;
