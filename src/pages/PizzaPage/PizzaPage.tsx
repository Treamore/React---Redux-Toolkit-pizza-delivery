import React from 'react';
import MinusSvg from '../../assets/img/MinusSvg';
import PlusSvg from '../../assets/img/PlusSvg';
import s from './PizzaPage.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchById, PizzaByIdType } from '../../redux/slices/pizzaLoadSlice';
import { addPizza, CartType } from '../../redux/slices/cartSlice';
import { setModalVisibility, modalVisibilityTimeout } from '../../redux/slices/modalSlice';
import { clearArray, PizzaIngredientsType } from '../../redux/slices/pizzaLoadSlice';
import PizzaLoadingError from '../../components/PizzaLoadingError';
import { RootState, useAppDispatch } from '../../redux/store';

const PizzaPage: React.FC = () => {
  const [selectedSizeId, setSelectedSizeId] = React.useState<number>(0);
  const [selectedTypeId, setSelectedTypeId] = React.useState<number>(0);
  const [sortVisibility, setSortVisibility] = React.useState<boolean>(false);
  const [typeVisibility, setTypeVisibility] = React.useState<boolean>(false);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [falseTimeout, setFalseTimeout] = React.useState<boolean>(true);
  const { pizzaById, pageStatus } = useSelector((state: RootState) => state.pizzaLoad);

  const typesArray = ['Thin', 'Traditional'];
  const params = useParams();
  const id = params.id ? params.id : '';
  const dispatch = useAppDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const typeRef = React.useRef<HTMLDivElement>(null);

  if (!falseTimeout) {
    setTimeout(() => {
      dispatch(modalVisibilityTimeout());
    }, 1000);
    setFalseTimeout(true);
  }

  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const fetchPizzaObject = () => {
    dispatch(fetchById(id));
  };

  React.useEffect(() => {
    fetchPizzaObject();
    const nonSortClick = (event: MouseEvent) => {
      const sortEvent = event as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !sortEvent.path.includes(sortRef.current)) {
        setSortVisibility(false);
      }
    };
    document.body.addEventListener('click', nonSortClick);
    const nonTypeClick = (event: MouseEvent) => {
      const clickEvent = event as MouseEvent & {
        path: Node[];
      };
      if (typeRef.current && !clickEvent.path.includes(typeRef.current)) {
        setTypeVisibility(false);
      }
    };
    document.body.addEventListener('click', nonTypeClick);
    return () => {
      dispatch(clearArray());
      document.body.removeEventListener('click', nonSortClick);
      document.body.removeEventListener('click', nonTypeClick);
    };
  }, []);

  const { imageUrl, title, description, types, sizes, price, ingredients, value } =
    pizzaById as PizzaByIdType;

  console.log(ingredients);
  const onClickAdd = () => {
    const item: CartType = {
      id,
      title,
      price: price[selectedSizeId],
      imageUrl,
      type: typesArray[selectedTypeId],
      size: sizes[selectedSizeId],
      finder: id + typesArray[selectedTypeId] + sizes[selectedSizeId],
      quantity,
      count: 0,
    };
    dispatch(addPizza(item));
    dispatch(setModalVisibility());
    setFalseTimeout(false);
  };

  if (pageStatus === 'error') {
    return <PizzaLoadingError />;
  }

  if (pageStatus === 'loading') {
    return <div></div>;
  }

  return (
    <div className={s.pizzaPage}>
      <div className={s.imgAndDesc}>
        <img src={imageUrl} />
        <div>
          <h4>{title}</h4>
          <div>{description}</div>
          <ul>
            <li>
              <b>Weight:</b> {value[selectedSizeId].weight} g
            </li>
            <li>
              <b>Calories:</b> {value[selectedSizeId].calories} kcal
            </li>
            <li>
              <b>Proteins:</b> {value[selectedSizeId].proteins} g
            </li>
            <li>
              <b>Fat:</b> {value[selectedSizeId].fat} g
            </li>
            <li>
              <b>Carbohydrates:</b> {value[selectedSizeId].carbohydrates} g
            </li>
          </ul>
        </div>
      </div>
      <div className={s.ingredients}>
        {ingredients.map((element: PizzaIngredientsType, id: number) => {
          return (
            <div key={id}>
              <img src={element.img} />
              <span>{element.name}</span>
            </div>
          );
        })}
      </div>
      <div className={s.sizeAndType}>
        <div ref={sortRef} className={s.size}>
          <div onClick={() => setSortVisibility(!sortVisibility)} className={s.size__Label}>
            <b>Size:</b>
            <span> {sizes[selectedSizeId]} sm.</span>
          </div>
          {sortVisibility && (
            <div className={s.size__PopUp}>
              <ul>
                {sizes.map((element: number, index: number) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedSizeId(index);
                        setSortVisibility(false);
                      }}
                      className={selectedSizeId === index ? s.active : ''}>
                      {element} sm.
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div ref={typeRef} className={s.type}>
          <div onClick={() => setTypeVisibility(!typeVisibility)} className={s.type__Label}>
            <b>Type:</b>
            <span> {typesArray[selectedTypeId]} </span>
          </div>
          {typeVisibility && (
            <div className={s.type__PopUp}>
              <ul>
                {types.map((_: number, index: number) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedTypeId(index);
                        setTypeVisibility(false);
                      }}
                      className={selectedTypeId === index ? s.active : ''}>
                      {typesArray[index]}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={s.countAndPayment}>
        <div className={s.itemCount}>
          <div onClick={() => minusQuantity()} className={s.buttonMinus}>
            <MinusSvg />
          </div>
          <b>{quantity}</b>
          <div onClick={() => plusQuantity()} className={s.buttonPlus}>
            <PlusSvg />
          </div>
        </div>
        <span>
          <b>Price:</b> {price[selectedSizeId] * quantity} $
        </span>
        <button onClick={() => onClickAdd()} className={s.button}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default PizzaPage;
