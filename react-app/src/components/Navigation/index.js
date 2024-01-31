import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { findListingsThunk, getAllListingsThunk } from '../../store/listings';


function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
  const cart = useSelector(state => state.cart.cart);
  const cartLength = Object.values(cart).length;
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (search) {
      await dispatch(findListingsThunk(search))
      history.push('/search');
    }
    setSearch("");
  }
	return (
    <div className='nav-container'>
      <div className='nav-bar'>
        <div>
          <NavLink exact to="/"><div onClick={() => dispatch(getAllListingsThunk())} className='logo'></div></NavLink>
        </div>
        <div>
          <form>
            <label className='search-bar'>
              <input value={search} className="search-thing" onChange={e => setSearch(e.target.value)} type='search' placeholder='Search for anything'></input>
              <div className='search-icon'>
                <button onClick={handleSearch} value={search} className='search-btn' type='submit'><i className="fas fa-search fa-lg"></i></button>
              </div>
            </label>
          </form>
        </div>
        {isLoaded && (
          <div className='nav-right-side'>
            <div>
              {sessionUser && <button className='create-listing' onClick={() => history.push('/listings/new')}>Create Listing</button>}
            </div>
            <div className='favs' onClick={() => history.push("/likes")}>
            <i className="far fa-heart fa-lg"></i>
            </div>
            <div>
              <ProfileButton user={sessionUser} />
            </div>
            <div onClick={() => history.push('/cart')} className='cart-logo'>
              <i className="fas fa-shopping-cart fa-lg"></i>
              {cartLength > 0 ? <div className='cart-logo__amount'>{cartLength}</div> : null}
            </div>
          </div>
        )}
      </div>
    </div>
	);
}

export default Navigation;
