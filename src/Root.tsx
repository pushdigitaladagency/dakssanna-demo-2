import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';

export default function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-full flex flex-col bg-[#071A33]">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
