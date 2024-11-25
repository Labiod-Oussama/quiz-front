import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

// this hook is used to get the current pathname
export function usePathname() {
  const { pathname } = useLocation();

  return useMemo(() => pathname, [pathname]);
}
