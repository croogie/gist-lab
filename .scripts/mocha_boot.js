var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

var mockCssModules = require("mock-css-modules");
mockCssModules.register(['.sass', '.scss']);

import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme()) // Note the invocation at the end

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
