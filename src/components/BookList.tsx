import React, { useContext } from 'react';
import { BookContext } from '@/context/context';
import { List, Card, CardContent, Divider } from '@mui/material';
import Book from './Book';
import { Typography } from '@mui/material';

const BookList: React.FC = () => {
  const { state } = useContext(BookContext);

  return (
    <Card>
      <CardContent>
        {state.books.length ? (
          <List>
            {state.books.map((book, index) => (
              <div key={book.id}>
                {index > 0 && <Divider variant="inset" />}
                <Book book={book} />
              </div>
            ))}
          </List>
        ) : (
          <Typography align="center" variant="h6">Books not added yet.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default BookList;
