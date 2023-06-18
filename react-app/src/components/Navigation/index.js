import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }){
  const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			<div>
				<NavLink exact to="/"><div className='logo'></div></NavLink>
			</div>
      <div>
        <form>
          <label>
            <input type='search'></input>
          </label>
        </form>
      </div>
			{isLoaded && (
        <div className='nav-right-side'>
          <div>
            {sessionUser && <button onClick={() => history.push('/listings/new')}>Create Listing</button>}
          </div>
          <div className='favs'>
          <i className="far fa-heart fa-lg"></i>
          </div>
          <div>
            <ProfileButton user={sessionUser} />
          </div>
          <div>
            <i className="fas fa-shopping-cart fa-lg"></i>
          </div>
        </div>
			)}
		</div>
	);
}

export default Navigation;
