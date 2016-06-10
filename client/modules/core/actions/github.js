export default {
  getMyGists({Meteor, LocalState}) {
    const fetching = 'FETCHING_MY_GISTS';

    if (LocalState.get(fetching) === true) {
      console.log('Already fetching user\'s gists. Please wait...'); // XXX
      return;
    }

    LocalState.set(fetching, true);

    Meteor.call('github.gists.get', 'my', (err, result) => {
      LocalState.set(fetching, false);
      if (!err) {
        console.log('SUCCESS', result); // XXX
      }
    });
  },

  getStarredGists({Meteor, LocalState}) {
    const fetching = 'FETCHING_STARRED_GISTS';

    if (LocalState.get(fetching) === true) {
      console.log('Already fetching starred gists. Please wait...'); // XXX
      return;
    }

    LocalState.set(fetching, true);

    Meteor.call('github.gists.get', 'starred', (err, result) => {
      LocalState.set(fetching, false);
      if (!err) {
        console.log('SUCCESS', result); // XXX
      }
    });
  },

  fetchGists({Meteor, LocalState}) {
    const fStarred = 'FETCHING_STARRED_GISTS';
    const fMy = 'FETCHING_MY_GISTS';

    if (LocalState.get(fStarred) || LocalState.get(fMy)) {
      console.log('Already requesting GISTS. Please wait...'); // XXX
      return;
    }

    LocalState.set(fStarred, true);
    LocalState.set(fMy, true);

    Meteor.call('github.gists.fetch', (err, result) => {
      LocalState.set(fStarred, false);
      LocalState.set(fMy, false);

      if (err) {
        console.error(err); // XXX
      } else {
        console.log('SUCCESS', result); // XXX
      }
    });
  }
};
