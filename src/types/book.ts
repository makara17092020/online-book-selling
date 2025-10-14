export interface IBook {
  _id?: string;
  title: string;
  author: string;
  category?: string;
  description?: string;
  image?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBookInput {
  title: string;
  author: string;
  category?: string;
  description?: string;
  image?: string;
  price?: number;
}
