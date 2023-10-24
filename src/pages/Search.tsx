import React, { useEffect, useState } from 'react'
import ProductList from 'components/ProductList'
import SearchBar from 'components/SearchBar'
import { Products } from 'types';
import { api } from "services/api";
import Loading from 'components/Loading';
import { useLocation } from 'react-router-dom';

function Search() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Products>();
  const [searchParams, setSearchParams] = useState<URLSearchParams>();
  const location = useLocation();

  const fetchSearchResult = async () => {
    setLoading(true);

    try {
      if (!searchParams) {
        return
      }

      const { data } = await api.get(`/api/items?search=${searchParams?.get('search')}`)

      setProducts(data as Products);
    } catch (error) {
      // TODO: handle error
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchSearchResult();
    })();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(new URLSearchParams(location.search));
  }, [location.search]);

  return (
    <>
      <SearchBar />
      {loading ? (
        <Loading />
      ) : (
        <ProductList list={products} />
      )}
    </>
  )
}

export default Search