export type BlogPost = {
  _id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: string;
  dateAdded: string;
  readTime: number;
  tags: Array<{ name: string; slug: string }>;
  views: number;
  reactions: number;
}; 