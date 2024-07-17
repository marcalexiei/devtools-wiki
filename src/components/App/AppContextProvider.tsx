import { createContext, useContext, type JSX } from 'solid-js';
import type { DevToolCategory } from '../../models/DevToolCategory';

interface AppContextData {
  categories: Array<DevToolCategory>;
}

const AppContext = createContext<AppContextData>();

interface AppContextProviderProps {
  categories: AppContextData['categories'];
  children: JSX.Element;
}

export function AppContextProvider(props: AppContextProviderProps) {
  const { categories } = props;

  return (
    <AppContext.Provider value={{ categories }}>
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
