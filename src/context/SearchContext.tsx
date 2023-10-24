import { SetStateAction, createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

interface SearchContextProps {
  searchTerm: string,
  setSearchTerm: (term: SetStateAction<string>) => void
}

const SearchContext = createContext<SearchContextProps>({
  searchTerm: '',
  setSearchTerm: () => {}
});

export function SearchContextProvider({ children }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
    }} >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext);