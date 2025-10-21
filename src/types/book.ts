export interface IBook {
  _id?: string;            // MongoDB automatically generates this
  title: string;           // Required
  author: string;          // Required
  category?: string;       // Optional
  description?: string;    // Optional
  image?: string;          // Optional (book cover image)
  price?: number;          // Optional
  createdAt?: Date;        // Auto from Mongoose
  updatedAt?: Date;        // Auto from Mongoose
}

export interface CreateBookInput {
  title: string;
  author: string;
  category?: string;
  description?: string;
  image?: string;
  price?: number;
}
