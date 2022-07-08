import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setCategory, setSortID } from '../redux/slices/filterSlice';
import { fetchItems, fetchAllItems } from '../redux/slices/pizzaLoadSlice';
import PizzaLoadingError from '../components/PizzaLoadingError';
import { RootState, useAppDispatch } from '../redux/store';

let Home: React.FC = () => {
  const { category, sortID } = useSelector((state: RootState) => state.filter);
  const { pizzas, allPizzas, status } = useSelector((state: RootState) => state.pizzaLoad);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [limit, setLimit] = React.useState<number>(12);
  const [page, setPage] = React.useState<number>(1);
  const firstLoad = React.useRef<boolean>(true);
  const loadByUrl = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      setPage(Number(params.page));
      dispatch(setCategory(Number(params.category)));
      dispatch(setSortID(Number(params.sort)));
      loadByUrl.current = true;
    }
  }, []);

  const fetchPizzas = async () => {
    const sortMock = ['-rating', '-price', 'price', 'title'];
    const sortTag = sortMock[sortID];
    const sortOrder = sortTag.includes('-') ? 'desc' : 'asc';
    const categoryChosen = category ? `category=${category}` : ``;
    const tagChosen = sortTag ? `sortBy=${sortTag.replace('-', '')}&order=${sortOrder}` : ``;
    dispatch(fetchItems({ categoryChosen, tagChosen, limit, page }));
  };

  const fetchAll = async () => {
    dispatch(fetchAllItems());
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
    if (!loadByUrl.current) fetchPizzas();
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
      {status === 'error' ? (
        <PizzaLoadingError />
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(12)].map((_, index) => <PizzaSkeleton key={index} />)
            : filteredPizzas}
        </div>
      )}
      <Pagination pizzasLength={pizzas.length} page={page} setPage={setPage} />
    </div>
  );
};

export default Home;
