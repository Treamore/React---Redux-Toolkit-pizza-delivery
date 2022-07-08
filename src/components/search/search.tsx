import React from 'react';
import styles from './search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/searchSlice';
import clear from '../../assets/img/clearSearch.svg';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>('');
  const sendRequest = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    sendRequest(event.target.value);
  };

  const clearClick = () => {
    setValue('');
    sendRequest('');
  };

  return (
    <div className={styles.main}>
      <input
        value={value}
        onChange={inputChange}
        className={styles.input}
        placeholder="Search..."></input>
      {value ? <img onClick={clearClick} src={clear} /> : <></>}
    </div>
  );
};

export default Search;
