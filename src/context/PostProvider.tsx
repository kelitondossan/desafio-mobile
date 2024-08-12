import React, { createContext, useState, ReactNode } from 'react';
import { Post } from '../Post';
import { createPost as apiCreatePost } from '../servicos/api';

interface PostContextProps {
  posts: Post[];
  selectedPost: Post | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectPost: (post: Post) => void;
  clearSelectedPost: () => void;
  addPost: (post: Post) => void;
  updatePostInContext: (updatedPost: Post) => void; // Adicionei essa função
}

export const PostContext = createContext<PostContextProps>({} as PostContextProps);

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const selectPost = (post: Post) => setSelectedPost(post);
  const clearSelectedPost = () => setSelectedPost(null);

  const addPost = async (post: Post) => {
    try {
      const response = await apiCreatePost(post);
      setPosts(prevPosts => [response.data, ...prevPosts]);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para atualizar um post existente
  const updatePostInContext = (updatedPost: Post) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
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
