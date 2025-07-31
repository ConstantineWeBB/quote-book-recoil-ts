import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from './slices/quotesSlice'
import filterReducer from './slices/filterSlice'
import errorReducer from './slices/errorSlice'

const store = configureStore({
    reducer: {
        quotes: quotesReducer,
        filter: filterReducer,
        error: errorReducer,
    }
})

export default store