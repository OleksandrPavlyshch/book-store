import React, { useContext } from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Typography,
  Chip
} from '@mui/material';
import { Delete, AutoStories } from '@mui/icons-material';
import { BookContext } from '@/context/context';
import type { Book } from '@/context/schema';

type BookProps = {
  book: Book;
};

const Book: React.FC<BookProps> = ({ book }) => {
  const { dispatch } = useContext(BookContext);
  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_BOOK', payload: id });
  };
  const handleEdit = (book: Book) => {
    dispatch({ type: 'EDIT_MODAL', payload: book });
  };
  return (
    <ListItem onClick={() => handleEdit(book)}>
      <ListItemAvatar>
        <Avatar>
          <AutoStories color="info" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="h6">{book.name}</Typography>
        <Typography variant="subtitle2" gutterBottom>
          {book.price}$
        </Typography>
        <Chip size="small" variant="outlined" label={book.category} />
      </ListItemText>
      <ListItemSecondaryAction onClick={() => handleDelete(book.id)}>
        <IconButton edge="end" aria-label="delete">
          <Delete color="error" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default Book;
