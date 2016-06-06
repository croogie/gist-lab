import {Meteor} from 'meteor/meteor';
import {ServiceConfiguration} from 'meteor/service-configuration';

const configureGithub = function (config) {
  ServiceConfiguration.configurations.upsert({service: 'github'}, {
    $set: {
      clientId: config.clientId,
      secret: config.secret
    }
  });
};

const configureFacebook = function (config) {
  ServiceConfiguration.configurations.upsert({service: 'facebook'}, {
    $set: {
      appId: config.clientId,
      secret: config.secret
    }
  });
};

// set the settings object with meteor --settings development.json
Meteor.startup(function () {
  var githubConfig = Meteor.settings.github;
  if (githubConfig) {
    console.log('Got service settings for GitHub.');
    configureGithub(githubConfig);
  }

  var facebookConfig = Meteor.settings.facebook;
  if (facebookConfig) {
    console.log('Got service settings for Facebook');
    configureFacebook(facebookConfig);
  }
});
