export function isPublicPath(pathname: string): boolean {
  if (!pathname) return true;
  return !(
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/api')
  );
}
