import {Meteor} from 'meteor/meteor';
import GitHub from 'github';

let github;

export function getInstance() {
  if (!github) {
    const user = Meteor.user();

    if (!user) {
      throw Error('No user found.');
    }

    github = new GitHub({
      debug: Boolean(Meteor.settings.debug)
    });

    try {
      const token = user.services.github.accessToken;

      github.authenticate({
        type: 'oauth',
        token
      });
    } catch (e) {
      throw new Error('No github token found.');
    }
  }

  return github;
}

export function getNextPage(link) {
  let re = /page=(\d).*>; rel="next"/;
  let result = re.exec(link);

  if (result) {
    return parseInt(result[1], 10);
  }
}
