import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import GistFile from '../components/gist_file.jsx';

export const composer = ({context, file}, onData) => {
  const {LocalState, Tracker} = context();
  let fileContent;

  function publishData() {
    onData(null, {
      editable: LocalState.get('EDIT_MODE'),
      content: fileContent,
      file
    });
  }

  if (localStorage.getItem(file.raw_url)) {
    fileContent = localStorage.getItem(file.raw_url);
  } else {
    onData(null);
  }

  // fetch content of the file
  fetch(file.raw_url, {method: 'get'})
    .then(response => response.text())
    .then(text => {
      localStorage.setItem(file.raw_url, text);
      fileContent = text;

      publishData();
    });

  Tracker.autorun(() => {
    publishData();
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(GistFile);
