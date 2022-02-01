interface article {
  router: string;
  title: string;
  type: string[];
  article: string;
  view_count: number;
  comment_count: number;
  time: Date;
  id: string ;
  author: string;
  introduce: string;
  image: string | false; //（博客分页展示的图片）不一定有
}
interface userData {
  sign: boolean;
  email: string;
  GitHub:string;
}
//处理结果，文字描述结果，返回数据（可选，手动设置类型）
interface response<T = void> {
  success: boolean;
  message: string;
  data: T;
}

interface articleType {
  type: string;
  time: Date;
  isShow: boolean;
  tag: string;
}


interface comment {
  id: string;
  commentator: string;
  articleId: string|null;
  content: string;
  time?: Date;
  superior?: string;
}



interface githubProjectTypes {
  id: string;
  name: string;
  image: string;
  url: string;
  languages: string[];
  description: string;
}

/** 文章作者类型*/
interface user {
  name: string;
  email: string;
  password: string;
  GitHub?: string;
}


interface api {
  id: string;
  name: string;
  content: string;
  time: Date;
}

interface articlePageTypes {
  router: string;
  time: Date;
  title: string;
  introduce: string;
  view_count: number;
  comment_count: number;
  image: false | string;
  author: string;
  type:string[]
}






export type {
  userData,
  article,
  response,
  articleType,
  githubProjectTypes,
  comment,
  user,
  api,
  articlePageTypes,
};
