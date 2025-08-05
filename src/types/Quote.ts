export interface Quote {
  id: string;
  quote: string;
  author: string;
  source: string;
  isFavorite: boolean;
}
export type QuoteInput = {
  quote: string;
  author: string;
};
