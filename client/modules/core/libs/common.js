export function resetState({LocalState}) {
  LocalState.set('LIST', 'my');                     // show my gists by default

  LocalState.set('FETCHING_MY_GISTS', false);       // indicate that we're not fetching gists list
  LocalState.set('FETCHING_STARRED_GISTS', false);  // indicate that we're not fetching favorite gists

  LocalState.set('GIST', null);                     // no gist is selected
}
