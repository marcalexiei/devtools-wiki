import type { JSX } from 'solid-js';
import { createContext, useContext } from 'solid-js';
import type { DevToolArticleCategory } from '../../models/DevToolArticleCategory.ts';

interface AppContextData {
  categories: Array<DevToolArticleCategory>;
}

const AppContext = createContext<AppContextData>();

interface AppContextProviderProps {
  categories: AppContextData['categories'];
  children: JSX.Element;
}

export function AppContextProvider(props: AppContextProviderProps) {
  return (
    <AppContext.Provider value={{ categories: props.categories }}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const value = useContext(AppContext);
  if (value === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return value;
}
