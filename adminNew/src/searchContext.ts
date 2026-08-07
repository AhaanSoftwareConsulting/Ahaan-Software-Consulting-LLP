import { createContext } from "react";
import type {
  Dispatch,
  SetStateAction,
} from "react";

interface SearchContextType {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const SearchContext =
  createContext<SearchContextType>({
    query: "",
    setQuery: () => {},
  });