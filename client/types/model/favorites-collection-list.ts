export interface Favorites_data {
  user_id: number;
  name: string;
  description: string;
  is_private: number;
}

export interface Tag {
  name: string;
}

export interface Author_data {
  name: string;
}

export interface Article_list {
  tag: Tag[];
  cover_url?: any;
  id: number;
  title: string;
  description: string;
  view_count: number;
  update_time: string;
  create_time: string;
  comment_count: number;
  like_count: number;
  author_data: Author_data;
}

export interface Tag {
  name: string;
}

export interface Problem_list {
  tag: Tag[];
  id: number;
  title: string;
  content: string;
  view_count: number;
  create_time: string;
  update_time?: any;
  answer_count: number;
}

export interface Author_data {
  avatar_url: string;
  id: number;
  name: string;
  avatar_file_name: string;
}

export interface RootObject {
  favorites_data: Favorites_data;
  article_list: Article_list[];
  problem_list: Problem_list[];
  author_data: Author_data;
}
