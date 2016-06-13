export function resetState({LocalState}) {
  LocalState.set('LIST', 'all');                    // show my gists by default

  LocalState.set('FETCHING_MY_GISTS', false);       // indicate that we're not fetching gists list
  LocalState.set('FETCHING_STARRED_GISTS', false);  // indicate that we're not fetching favorite gists

  setFilters({LocalState});

  LocalState.set('GIST', null);                     // no gist is selected
  LocalState.set('EDIT_MODE', false);
}

export function setFilters({LocalState}, owned = false, starred = false, isPrivate = false, isPublic = false) {
  LocalState.set('GISTS_FILTER_OWNED', owned);       // filtering gists list
  LocalState.set('GISTS_FILTER_PUBLIC', isPublic);   // filtering gists list
  LocalState.set('GISTS_FILTER_PRIVATE', isPrivate); // filtering gists list
  LocalState.set('GISTS_FILTER_STARRED', starred);   // filtering gists list
}
