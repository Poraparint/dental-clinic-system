export type Category = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  price?: number;
  createdAt: Date;
};

export type CategoryWithCreator = Category & {
  creator: {
    name?: string;
  };
};