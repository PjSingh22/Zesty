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
				<NavLink exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
        <>
        <div>
          {sessionUser && <button onClick={() => history.push('/listings/new')}>Create Post</button>}
        </div>
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        </>
			)}
		</div>
	);
}

export default Navigation;
