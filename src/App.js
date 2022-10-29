import { useState, useContext, lazy, Suspense } from 'react';
import useToggle from './custom-hooks/use-toggle'
import { Route, Routes } from 'react-router-dom'

import Nav from './components/Layout/NavBar/Nav'
import Home from './pages/Home'
import Footer from './components/Layout/Footer'
import Cart from './components/Cart/Cart';
import Reservation from './components/UI/Reservation';
import Loading from './components/UI/Loading'
import AuthForm from './components/Auth/AuthForm';
import AuthContext from './store/auth-context';

import './App.css';

/* Lazy loading the components. */
const Products = lazy(() => import('./pages/Products'))
const Profile = lazy(() => import('./pages/Profile'))
const AllNews = lazy(() => import('./components/Layout/news/AllNews'))
const News = lazy(() => import('./components/Layout/news/News'))
const AddNews = lazy(() => import('./components/Layout/news/AddNews'))
const AddProduct = lazy(() => import('./components/Layout/AddProduct'))
const NotFound = lazy(() => import('./pages/NotFound'))


function App() {
  const [reservationIsShown, setReservationIsShown] = useToggle();
  const [CartIsShown, setCartIsShown] = useToggle();
  const [AuthIsShown, setAuthIsShown] = useToggle();
  const [theme, setTheme] = useState('light');

  const authCtx = useContext(AuthContext);

  /**
   * If the current theme is light, set the theme to dark. Otherwise, set the theme to light
   */
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  }

  return (
    <div id={theme}>
      <Suspense fallback={<div className='loading'><Loading /></div>}>
        {reservationIsShown && <Reservation onClose={setReservationIsShown} />}
        {CartIsShown && <Cart onClose={setCartIsShown} />}
        {AuthIsShown && <AuthForm onClose={setAuthIsShown} />}
        {<Nav onShowReservation={setReservationIsShown} onShowCart={setCartIsShown} onShowAuth={setAuthIsShown} onToggle={toggleTheme} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Products />} />
          <Route path='/news' element={<AllNews />} />
          <Route path='/news/:id' element={<News />} />
          <Route path='/addnewproduct' element={<AddProduct />} />
          <Route path='/addnews' element={<AddNews />} />
          {authCtx.isLoggedIn && <Route path='/profile' element={<Profile />} />}
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
