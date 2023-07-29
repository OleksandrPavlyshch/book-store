export interface BookFormValues {
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface Book extends BookFormValues {
  id: string;
}
