import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface HideBottomBarContextData {
  shouldHide: boolean;
  setShouldHide: Dispatch<SetStateAction<boolean>>;
}

interface HideBottomBarContextProps {
  children: ReactNode;
}

export const HideBottomBarContext = createContext(
  {} as HideBottomBarContextData,
);

export function HideBottomBarContextProvider({
  children,
}: HideBottomBarContextProps) {
  const [shouldHide, setShouldHide] = useState(false);

  return (
    <HideBottomBarContext.Provider
      value={{
        shouldHide,
        setShouldHide,
      }}>
      {children}
    </HideBottomBarContext.Provider>
  );
}
