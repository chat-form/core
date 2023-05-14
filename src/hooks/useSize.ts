import { useEffect, useLayoutEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Size = { width: number; height: number };

function useSize(getTarget: () => HTMLDivElement | null) {
  const [target, setTarget] = useState(getTarget);

  useEffect(() => {
    setTarget(getTarget());
  })

  const [state, setState] = useState<Size | undefined>(
    () => {
      return target ? { width: target.clientWidth, height: target.clientHeight } : undefined
    },
  );

  useLayoutEffect(
    () => {
      if (!target) {
        return;
      }
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          setState({ width: clientWidth, height: clientHeight });
        });
      });
      resizeObserver.observe(target);
      return () => {
        resizeObserver.disconnect();
      };
    },
    [target],
  );

  return state;
}

export default useSize;