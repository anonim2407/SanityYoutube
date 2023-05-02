export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  comments: Comment[];
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  price: {
    title: string;
  };
  category: {
    title: string;
    _id:string
  };
  link: string;
  body: [object];
}

export interface Categorys{
  _id: string;
  title: string;
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
