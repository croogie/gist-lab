# Core Components

Here are stored components used in core module. Tests for them are stored in `tests` directory.

## CSS Modules

If there is a need of some special styling for component it is defined in `SASS` file with the same name as component eg. `menu.scss` contains styles for Menu component (`menu.jsx`).

You can also use some shared SASS variables. They are defined in [variables.scss](https://github.com/croogie/gist-lab/blob/develop/client/modules/core/components/variables.scss) file.

## Most interesting components

* [`GistListItem`](https://github.com/croogie/gist-lab/blob/develop/client/modules/core/components/gists_list_item.jsx) - Item of gists list
* [`Menu`](https://github.com/croogie/gist-lab/blob/develop/client/modules/core/components/menu.jsx) - Renders left dark column's content which are menu elements, labels and login button
* [`MainLayout`](https://github.com/croogie/gist-lab/blob/develop/client/modules/core/components/main_layout.jsx) - Self explainatory. Populated with content when route is caught by router.
