<script>
  import {initializeApp} from 'firebase/app';
  import Router, {location, pop, push, querystring, replace} from 'svelte-spa-router';
  //Import Routes
  import HomePage from './routes/Home.svelte';

  //grab the location
  let currentLocation;
  const unsubscribeLocation = location.subscribe((value) => {
    currentLocation = value;
  });

  let currentQuerystring;
  const unsubscribeQueryString = querystring.subscribe((value) => {
    currentQuerystring = value;
  });

  const routes = {
    '/': HomePage,
  };

  if (window.location.pathname != '/') {
    //copy querystring to the new location
    push(window.location.pathname + window.location.search);
  }

  let currentRoute = '';

  window.spa = {
    push: async (url) => {
      await push(url);
      handleRouteChange();
    }, // The push(url) method navigates to another page, just like clicking on a link
    pop, // The pop() method is equivalent to hitting the back button in the browser
    replace, // The pop() method is equivalent to hitting the back button in the browser
    location: () => currentLocation,
    querystring: () => currentQuerystring,
  };

  function handleRouteChange() {
    window.scrollTo(0, 0);
  }

  import firebaseConfig from '../firebaseConfig.json';
  const app = initializeApp(firebaseConfig);
  window.app = app;
</script>

<div>
  <Router {routes} on:routeChanged={handleRouteChange} />
</div>
