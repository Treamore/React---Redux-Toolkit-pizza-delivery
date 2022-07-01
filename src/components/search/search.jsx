import React from 'react';
import styles from './search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/searchSlice';
import clear from '../../images/clearSearch.svg';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const sendRequest = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  return (
    <div className={styles.main}>
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          sendRequest(event.target.value);
        }}
        className={styles.input}
        placeholder="Search..."></input>
      {value ? (
        <img
          onClick={() => {
            setValue('');
            sendRequest('');
          }}
          src={clear}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
