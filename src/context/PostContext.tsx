// context/PostContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { Post } from '../Post';


interface PostContextProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectedPost: Post | null;
  selectPost: (post: Post) => void;
  clearSelectedPost: () => void;
  addPost: (post: Post) => void;
  updatePostInContext: (updatedPost: Post) => void;
}

export const PostContext = createContext<PostContextProps>({
  posts: [],
  setPosts: () => {},
  selectedPost: null,
  selectPost: () => {},
  clearSelectedPost: () => {},
  addPost: () => {},
  updatePostInContext: () => {},
});

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const selectPost = (post: Post) => setSelectedPost(post);
  const clearSelectedPost = () => setSelectedPost(null);

 
  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  
  const updatePostInContext = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  return (
    <PostContext.Provider
      value={{ posts, setPosts, selectedPost, selectPost, clearSelectedPost, addPost, updatePostInContext }}
    >
      {children}
    </PostContext.Provider>
  );
};
