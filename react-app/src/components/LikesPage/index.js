import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ListingCard from "../ListingCard";
import { useEffect } from "react";
import { getLikesThunk } from "../../store/likes";

function LikesPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const likes = useSelector(state => state.likes);
  const likesArr = Object.values(likes);

  useEffect(() => {
    dispatch(getLikesThunk())
  }, [dispatch])

  if (!likesArr.length) return (
    <div className="empty-msg">
      <h1>Likes seem to be empty...</h1>
    <button onClick={() => history.push("/")} className="create-listing">Back To Home</button>
    </div>
  )
  return (
    <div className="home-page">
      <div className="home-page__listings">
        {likesArr?.map(like => <ListingCard listing={like} key={like.id} />)}
      </div>
    </div>
  )
}

export default LikesPage;
