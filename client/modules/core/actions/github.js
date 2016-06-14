export default {
  fetchGists({Meteor, LocalState, Msg}) {
    if (!Meteor.user()) {
      return;
    }

    const fetching = 'FETCHING_GISTS';

    if (LocalState.get(fetching)) {
      Msg.alert('We\'re already working on this. Please wait!', 'warning');
      return;
    }

    LocalState.set(fetching, true);

    Meteor.call('github.gists.fetch', (err, result) => {
      LocalState.set(fetching, false);

      if (err) {
        Msg.alert('There were some problems with fetching your gists.', 'error');
      } else {
        Msg.alert(`Your gists database has been refreshed. Contains ${result} Gists`, 'success');
      }
    });
  },

  togglePublicFilter({LocalState}) {
    LocalState.set('GISTS_FILTER_PUBLIC', !LocalState.get('GISTS_FILTER_PUBLIC'));
  },

  togglePrivateFilter({LocalState}) {
    LocalState.set('GISTS_FILTER_PRIVATE', !LocalState.get('GISTS_FILTER_PRIVATE'));
  },

  toggleStarredFilter({LocalState}) {
    LocalState.set('GISTS_FILTER_STARRED', !LocalState.get('GISTS_FILTER_STARRED'));
  },

  toggleOwnedFilter({LocalState, Meteor, _}) {
    let username = _.property('services.github.username')(Meteor.user());
    LocalState.set('GISTS_FILTER_OWNED', !LocalState.get('GISTS_FILTER_OWNED') ? username : false);
  },

  toggleStar({LocalState, Meteor, Msg}, gist) {
    if (Meteor.user() && typeof gist.starred !== 'undefined') {
      LocalState.set('STARRING', true);
      Meteor.call(
        `github.gists.${gist.starred ? 'unstar' : 'star'}`,
        gist.id,
        (err) => {
          LocalState.set('STARRING', false);
          if (!err) {
            Msg.alert({
              title: `Gist has been ${gist.starred ? 'unstarred' : 'starred'} successfully`,
              type: 'success',
              icon: `star icon fitted ${gist.starred ? 'empty' : ''}`
            });
          } else {
            Msg.alert({title: 'There were some problems with starring gist.', type: 'error'});
          }
        });
    }
  },

  editGist({LocalState, Msg}) {
    Msg.alert('You can edit your GIST', 'success', 'growl-top-right');
    LocalState.set('EDIT_MODE', true);
  },

  saveGist({LocalState, Msg}) {
    Msg.alert('Your changes has been saved', 'success', 'growl-top-right');
    LocalState.set('EDIT_MODE', false);
  },

  togglePublic({Msg}) {
    Msg.alert('Not implemented', 'warning');
  },

  deleteGist({Msg}) {
    Msg.alert('Not implemented', 'warning');
  }

};
