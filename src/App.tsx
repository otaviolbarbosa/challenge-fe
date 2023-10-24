import React from 'react';
import router from 'router';
import { SearchContextProvider } from 'context/SearchContext';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <SearchContextProvider>
      <RouterProvider router={router} />
    </SearchContextProvider>
  );
}

export default App;
