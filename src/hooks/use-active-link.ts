import { matchPath, useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

type ReturnType = boolean;

// This hook checks if the current path is active (the current path is the same as the URL path)
export function useActiveLink(path: string, deep = true): ReturnType {
  const { pathname, hash } = useLocation();

  if (!path) {
    return false;
  }

  const normalActive = !!matchPath({ path, end: true }, pathname) || !!matchPath({ path, end: false }, `/${hash}`);// i add the hash because in landing page we have a link to /# and we need to match that with hash not with the pathname
  const deepActive = !!matchPath({ path, end: false }, pathname) || !!matchPath({ path, end: true }, `/${hash}`);

  return deep ? deepActive : normalActive;
}
