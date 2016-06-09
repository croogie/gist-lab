import {Gists} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {getInstance, getNextPage} from '../lib/github';

export default function () {
  Meteor.methods({
    'github.gists.request'(type = 'my') {
      console.log(type); // XXX
      const possibleTypes = ['my', 'starred'];
      check(type, String);

      if (possibleTypes.indexOf(type) === -1) {
        throw new Meteor.Error('github.gists.request.wrongType', 'Wrong type provided', `'${type}' is not supported`);
      }

      console.log('here'); // XXX

      try {
        var github = getInstance();
      } catch (e) {
        throw new Meteor.Error('github.gists.request.unauthorized', e.message, 'You have to be authenticated');
      }

      const userId = Meteor.userId();
      const methodMapper = {
        my: 'getAll',
        starred: 'getStarred'
      };

      function getGists(method = 'getAll', page = 1) {
        console.log('requesting page ', page); // XXX
        let gists = Meteor.wrapAsync(github.gists[method])({page, per_page: 50});
        let nextPage = getNextPage(gists.meta.link);

        let allGists = gists.map(gist => {
          gist.userId = userId;

          // due to the fact that MongoDB won't accept keys with dot in it - we have to stringify `files` key
          gist.files = JSON.stringify(gist.files);

          return gist;
        });

        if (nextPage) {
          allGists = allGists.concat(getGists(method, nextPage));
        }

        return allGists;
      }

      let gists = getGists(methodMapper[type]);

      console.log(gists.length); // XXX

      return gists;

      // github.gists.getAll(
      //   {page, per_page: 200},
      //   Meteor.bindEnvironment((err, requestedGists) => {
      //     if (err) {
      //       throw new Meteor.Error('github.gist.request.error', err.message,
      //         'There were some problems with retrieving data from github');
      //     }
      //
      //     if (requestedGists.length) {
      //       let notImported = 0;
      //
      //       // if user requested first page - remove all stored gists.
      //       if (page === 1) {
      //         Gists.remove({userId});
      //       }
      //
      //       requestedGists.forEach(gist => {
      //         gist.userId = userId;
      //
      //         // have to escape because of possible dots in keys (!)
      //         gist.files = JSON.stringify(gist.files);
      //
      //         Gists.upsert(
      //           {id: gist.id, userId},
      //           {$set: gist},
      //           (upsertError) => {
      //             if (upsertError) {
      //               notImported++;
      //               console.log(upsertError, gist.id);
      //             }
      //           }
      //         );
      //       });
      //     }
      //   })
      // );
    },
    'github.gists.starred'() {

    }
  });
}
