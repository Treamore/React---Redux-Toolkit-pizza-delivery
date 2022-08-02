import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../assets/img/pizza-logo.jpg';
import Search from './search/search';
import { useSelector } from 'react-redux';
import CartSvg from '../assets/img/CartSvg';
import { RootState } from '../redux/store';

const Header: React.FC = () => {
  const { totalPrice, totalPizzas, pizzas } = useSelector((state: RootState) => state.cart);
  const firstLoad = React.useRef(true);

  React.useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      const json = JSON.stringify(pizzas);
      window.localStorage.setItem('pizzas', json);
    }
  }, [pizzas]);

  return (
    <div className="header">
      <div className="container adapt-container">
        <Link to="/">
          <div className="header__logo">
            <img width="55" src={headerLogo} alt="Pizza logo" />
            <div>
              <h1>Mama Italia</h1>
              <p>Real italian taste! </p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} $</span>
            <div className="button__delimiter"></div>
            <CartSvg />
            <span>{totalPizzas}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
