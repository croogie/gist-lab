import {Mongo} from 'meteor/mongo';

class GistsCollection extends Mongo.Collection {
  findFiltered(query = {}, filters = {}, sort = {created_at: -1}) {
    if (filters.starred === true) {
      query.starred = true;
    }

    if (filters.private === true && !filters.public) {
      query.public = false;
    } else if (filters.public === true && !filters.private) {
      query.public = true;
    }

    if (filters.owned) {
      query['owner.login'] = filters.owned;
    }

    return this.find(query, {sort});
  }
}

const Gists = new GistsCollection('gists');

export default Gists;
