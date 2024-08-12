import React from 'react';
import { PostProvider } from './src/context/PostContext';
import AppNavigator from './src/navegation/ApppNavigator';

const App: React.FC = () => {
  return (
    <PostProvider>
      <AppNavigator />
    </PostProvider>
  );
};

export default App;
