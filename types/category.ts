export type Category = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  order?: number;
  price?: number;
  createdAt: Date;
};

export type CategoryWithCreator = Category & {
  creator: {
    name?: string;
  };
};