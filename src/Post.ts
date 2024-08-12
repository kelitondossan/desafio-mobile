// types.ts
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  PostScreen: undefined;
  Edit: undefined;
};

