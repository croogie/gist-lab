export default {
  requestMyGists({Meteor, LocalState}) {
    const fetching = 'FETCHING_MY_GISTS';
    if (LocalState.get(fetching) === true) {
      console.log('Already fetching user\'s gists. Please wait...'); // XXX
      return;
    }

    LocalState.set(fetching, true);
    Meteor.call('github.gists.request', 'my', (err, result) => {
      LocalState.set(fetching, false);
      if (!err) {
        console.log('SUCCESS', result); // XXX
      }
    });
  },

  requestStarredGists({Meteor, LocalState}) {
    const fetching = 'FETCHING_STARRED_GISTS';

    if (LocalState.get(fetching) === true) {
      console.log('Already fetching starred gists. Please wait...'); // XXX
      return;
    }

    LocalState.set(fetching, true);
    Meteor.call('github.gists.request', 'starred', (err, result) => {
      LocalState.set(fetching, false);
      if (!err) {
        console.log('SUCCESS', result); // XXX
      }
    });
  }
};
