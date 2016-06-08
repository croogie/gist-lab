import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.publish('userData', function () {
    return Meteor.users.find(
      {_id: this.userId},
      {
        fields: {
          profile: 1,
          createdAt: 1,
          'services.github.id': 1,
          'services.github.email': 1,
          'services.github.username': 1
        }
      }
    );
  });
}
