import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

type Callback<T> = (value?: T) => void;
type DispatchWithCallback<T> = (value: T, callback?: Callback<T>) => void;

function useStateCallback<T>(initialState: T | (() => T)): [T, DispatchWithCallback<SetStateAction<T>>] {
  const [state, _setState] = useState(initialState);
  const [key, setKey] = useState(0);

  const callbackRef = useRef<Callback<T>>();

  const setState = useCallback((setStateAction: SetStateAction<T>, callback?: Callback<T>): void => {
    callbackRef.current = callback;
    _setState(setStateAction);
    setKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (key === 0) return;
    callbackRef.current?.(state);
  }, [key]);

  return [state, setState];
}

export default useStateCallback;