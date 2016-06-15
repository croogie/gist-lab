# Core Containers

Here are stored Container Components used in core module. Tests for them are stored in `tests` directory.

In most cases Containers are used to subscribe data from publications or other external data sources. They also map actions into properties and pass them to Component. 

## Most interesting components

* [`auth_button`](https://github.com/croogie/gist-lab/blob/develop/client/modules/core/containers/auth_button.js) - Simple but tricky use of `authComposer`
* [`gist_file`](https://github.com/croogie/gist-lab/blob/develop/client/modules/core/containers/gist_file.js) - Fetches content of single file within gist. Stores it in `localStorage` just to serve it next time much faster.
* [`gists_list`](https://github.com/croogie/gist-lab/blob/develop/client/modules/core/containers/gists_list.js) - Pretty simple. Passes all actions and data which gists list may be interested in.
