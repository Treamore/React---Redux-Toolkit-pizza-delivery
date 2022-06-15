import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { Route, Routes } from 'react-router-dom';
import ModalConfirm from './components/ModalConfirm';
import { useSelector } from 'react-redux';

function App() {
  const { modalVisibility } = useSelector((state) => state.modal);

  return (
    <div className="wrapper">
      <ModalConfirm />

      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
