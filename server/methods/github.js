import {Gists} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';
import {getInstance, getNextPage} from '../lib/github';

export default function () {
  Meteor.methods({
    'github.gists.get'(type = 'my') {
      const possibleTypes = ['my', 'starred'];
      check(type, String);

      if (possibleTypes.indexOf(type) === -1) {
        throw new Meteor.Error('github.gists.request.wrongType', 'Wrong type provided', `'${type}' is not supported`);
      }

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
        let gists = Meteor.wrapAsync(github.gists[method])({page, per_page: 100});
        let nextPage = getNextPage(gists.meta.link);

        let allGists = gists.map(gist => {
          gist.userId = userId;

          // due to the fact that MongoDB won't accept keys with dot in it - we have to stringify `files` key
          gist.files = JSON.stringify(gist.files);

          // distinguish which one has been starred
          gist.starred = type === 'starred';

          return gist;
        });

        if (nextPage) {
          allGists = allGists.concat(getGists(method, nextPage));
        }

        return allGists;
      }

      let gists = getGists(methodMapper[type]);

      return gists;
    },
    'github.gists.fetch'() {
      const userId = Meteor.userId();
      const userGists = Meteor.call('github.gists.get');
      const starredGists = Meteor.call('github.gists.get', 'starred');

      const gistMapper = (gists, gist) => {
        gists[gist.id] = gist;
        return gists;
      };
      const gistsToAdd = _.values(starredGists.reduce(gistMapper, userGists.reduce(gistMapper, {})));

      const gistIds = gistsToAdd.map(gist => gist.id);

      Gists.remove({userId, id: {$nin: gistIds}}); // remove all documents which were not found on github

      gistsToAdd.forEach(gist => {
        Gists.upsert({userId, id: gist.id}, {$set: gist});
      });

      return gistsToAdd.length;
    },
    'github.gists.star'(id) {
      check(id, String);

      const github = getInstance();
      const userId = Meteor.userId();

      let result = Meteor.wrapAsync(github.gists.star)({id});

      Gists.update({userId, id}, {$set: {starred: true}});

      return result;
    },
    'github.gists.unstar'(id) {
      check(id, String);

      const github = getInstance();
      const userId = Meteor.userId();

      let result = Meteor.wrapAsync(github.gists.unstar)({id});
      Gists.update({userId, id}, {$set: {starred: false}});

      return result;
    }
  });
}
