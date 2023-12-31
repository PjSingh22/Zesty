import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import NewListingForm from "./components/NewListingForm";
import EditListing from "./components/EditListing";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ViewListing from "./components/ViewListing";
import { populateCartThunk } from "./store/cart";
import CheckoutPage from "./components/CheckoutPage";
import ThankYouPage from "./components/ThankYouPage";
import LikesPage from "./components/LikesPage";
import ErrorPage from "./components/404Page";
import SearchResult from "./components/SearchResult";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchResult />
          </Route>
          <Route path="/thanks">
            <ThankYouPage />
          </Route>
          <Route path='/cart'>
            <CheckoutPage />
          </Route>
          <ProtectedRoute path="/likes">
            <LikesPage />
          </ProtectedRoute>
          <ProtectedRoute path="/listings/new">
            <NewListingForm />
          </ProtectedRoute>
          <Route path="/listings/view/:id">
            <ViewListing />
          </Route>
          <Route path="/listings/:id">
            <EditListing />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <h1>Use the modal, that's what it's there for.</h1>
          </Route>
          <ErrorPage />
        </Switch>
      )}
    </div>
  );
}

export default App;
