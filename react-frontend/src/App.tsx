import React from 'react';
import './App.css';
import Header from "./page-elements/header";
import {Outlet} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
