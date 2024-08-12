import axios, { AxiosResponse } from 'axios';

// Tipos para as respostas da API
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',  // Base URL da API
  timeout: 5000, // Tempo de espera para as requisições
});

// Função para buscar posts com limite e paginação
export const getPosts = (limit: number = 10, page: number = 1): Promise<AxiosResponse<Post[]>> => {
  return api.get('/posts', {
    params: {
      _limit: limit,
      _page: page,
    },
  });
};

// Função para buscar comentários de um post
export const getPostComments = (postId: number): Promise<AxiosResponse<Comment[]>> => {
  console.log(`Requesting comments for post ID: ${postId}`);
  return api.get(`/posts/${postId}/comments`)
    .then(response => {
      console.log(`Response data for post ID ${postId}:`, response.data);
      return response;
    })
    .catch(error => {
      console.error(`Error fetching comments for post ID ${postId}:`, error);
      throw error;
    });
};

// Função para criar um post
export const createPost = (post: { userId: number; title: string; body: string }): Promise<AxiosResponse<Post>> => {
  return api.post('/posts', post);
};

// Função para atualizar um post
export const updatePost = (postId: number, post: { title?: string; body?: string }): Promise<AxiosResponse<Post>> => {
  return api.patch(`/posts/${postId}`, post);
};

export const deletePost = (id: number): Promise<AxiosResponse<void>> => {
  return api.delete(`/posts/${id}`);
};

// Adiciona interceptador para lidar com erros
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default api;
