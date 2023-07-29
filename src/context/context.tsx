import React, { createContext, useReducer, Reducer, Dispatch } from 'react';
import type { Book, BookFormValues } from './schema';

interface BookState {
  books: Book[];
  modal: boolean;
  modalState: Partial<Book>;
}

const initialData = [
  {
    id: '1',
    name: 'Book 1',
    price: 10,
    category: 'Category 1',
    description: 'Description 1'
  },
  {
    id: '2',
    name: 'Book 2',
    price: 15,
    category: 'Category 2',
    description: 'Description 2'
  },
  {
    id: '3',
    name: 'Book 3',
    price: 20,
    category: 'Category 3',
    description: 'Description 3'
  }
];

const initialState: BookState = {
  books: [...initialData],
  modal: false,
  modalState: {} as Partial<Book>
};

type Action =
  | { type: 'ADD_BOOK'; payload: BookFormValues }
  | { type: 'EDIT_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: string }
  | { type: 'EDIT_MODAL'; payload: Book }
  | { type: 'CREATE_MODAL' }
  | { type: 'CLOSE_MODAL' };


const bookReducer: Reducer<BookState, Action> = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      const newBook: Book = {
        id: Date.now().toString(),
        ...action.payload
      };
      return { ...state, books: [...state.books, newBook] };
    case 'EDIT_BOOK':
      const updatedBooks = state.books.map((book) =>
        book.id === action.payload?.id ? { ...book, ...action.payload } : book
      );
      return { ...state, books: updatedBooks };
    case 'DELETE_BOOK':
      const filteredBooks = state.books.filter(
        (book) => book.id !== action.payload
      );
      return { ...state, books: filteredBooks };
    case 'EDIT_MODAL':
      return { ...state, modal: true, modalState: action.payload };
    case 'CREATE_MODAL':
      return { ...state, modal: true };
    case 'CLOSE_MODAL':
      return { ...state, modal: false, modalState: {} };
    default:
      return state;
  }
};

const BookContext = createContext<{
  state: BookState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});

type ProviderProps = {
  children?: React.ReactNode;
};

const BookProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
