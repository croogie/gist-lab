import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './containers/main_layout';
import GistsList from './containers/gists_list';

import Home from './components/home.jsx';
import Gist from './containers/gist';

import {version} from '/package.json';

export default function (injectDeps, {FlowRouter, LocalState}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home version={version} />),
        list: () => (<GistsList />)
      });
    }
  });

  FlowRouter.route('/gist/:id', {
    name: 'gist',
    action(params) {
      LocalState.set('GIST', String(params.id));
      mount(MainLayoutCtx, {
        content: () => (<Gist id={params.id}/>),
        list: () => (<GistsList />)
      });
    }
  });
}
