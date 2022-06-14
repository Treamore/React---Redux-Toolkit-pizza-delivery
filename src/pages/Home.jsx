import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setCategory, setSortID } from '../redux/slices/filterSlice';

let Home = () => {
  const { category, sortID } = useSelector((state) => state.filter);
  const searchValue = useSelector((state) => state.search.searchValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [limit, setLimit] = React.useState(12);
  const [page, setPage] = React.useState(1);
  const [allPizzas, setAllPizzas] = React.useState([]);
  const pagesArray = [1, 2, 3];
  const firstLoad = React.useRef(true);
  const loadByUrl = React.useRef(false);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      setPage(params.page);
      dispatch(setCategory(params.category));
      dispatch(setSortID(params.sort));
      loadByUrl.current = true;
    }
  }, []);

  const fetchPizzas = async (limit, page) => {
    const sortMock = ['-rating', '-price', 'price', 'title'];
    const sortTag = sortMock[sortID];
    const sortOrder = sortTag.includes('-') ? 'desc' : 'asc';
    const categoryChosen = category ? `category=${category}` : ``;
    const tagChosen = sortTag ? `sortBy=${sortTag.replace('-', '')}&order=${sortOrder}` : ``;
    setIsLoading(true);
    const response = await axios.get(
      `https://6294b3e6a7203b3ed06f152c.mockapi.io/items?${categoryChosen}&${tagChosen}&limit=${limit}&page=${page}`,
    );
    setPizzas(response.data);
    setIsLoading(false);
  };

  const fetchAll = async () => {
    const all = await axios.get(`https://6294b3e6a7203b3ed06f152c.mockapi.io/items`);
    setAllPizzas(all.data);
  };

  React.useEffect(() => {
    if (!firstLoad.current) {
      const queryString = qs.stringify({
        sort: sortID,
        category,
        page,
      });
      navigate(`?${queryString}`);
    }
    firstLoad.current = false;
  }, [sortID, category, page]);

  React.useEffect(() => {
    fetchAll();
  }, []);

  React.useEffect(() => {
    if (!loadByUrl.current) fetchPizzas(limit, page);
    loadByUrl.current = false;
  }, [sortID, category, page]);

  React.useEffect(() => {
    setPage(1);
  }, [sortID, category]);

  const chosePizzas = () => {
    return searchValue === '' ? pizzas : allPizzas;
  };

  const filteredPizzas = chosePizzas()
    .filter((pizzaObj) => {
      if (
        pizzaObj.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        pizzaObj.description.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .map((pizzaObj) => <PizzaBlock {...pizzaObj} key={pizzaObj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title"> All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(12)].map(() => <PizzaSkeleton key={Math.random()} />)
          : filteredPizzas}
      </div>
      <Pagination filteredPizzas={pizzas} pagesArray={pagesArray} page={page} setPage={setPage} />
    </div>
  );
};

export default Home;
