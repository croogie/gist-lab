# Gist lab

![Sample](https://raw.githubusercontent.com/croogie/gist-lab/develop/github/app.gif)

Gist lab is an experimental Meteor application which uses Github API to manage your GISTs. Besides browsing and editing features it gives you ability to organize your Gist library with labels.

# TL;DR

To run project you have to:

1. Install NodeJS, if you already don't have (I'm using `v4.1.2`)
2. Install Meteor framework ([install docs](https://www.meteor.com/install)) (v1.3.2.4)
3. Install all npm dependencies (`npm install` in main directory of app)
4. Run project with `npm run dev`
 
# Details

## Technology stack

Project is build on top of [Meteor framework](https://www.meteor.com/) (v1.3.3). Adopted dir structure follows [Mantra specification](https://kadirahq.github.io/mantra/) which standardizes many aspects of maintaining complex Meteor applications. 

### Front-end stack

Libraries which are widely used within app:

* [React, ReactDOM](https://facebook.github.io/react/) and some React related libs (like `react-komposer`, `react-mounter`),
* [Semantic UI](http://semantic-ui.com/) as a core CSS framework used to style content,
* Building styles is covered by [SASS](http://sass-lang.com/) and [PostCSS](http://postcss.org/) (with [Autoprefixer](https://github.com/postcss/autoprefixer)) which enable developer to use CSS modules and provides styles for 2 most recent versions of popular browsers,
* [Flow-Router](https://github.com/kadirahq/flow-router) is used as routing library.

### Back-end stack

If you're familiar with Meteor you'll know that there sits MongoDB and all NodeJS stuff.

## Modules

### Core

This module provides core functionality for app like authentication, browsing gists, notification system etc. Also provides main layouts and default styling of app.

# Contribute

## Development

### Branching 

During development you should follow [GitFlow](http://danielkummer.github.io/git-flow-cheatsheet/) branching method. 

### Linting

To check if code written by you applies adopted coding standards please use ESLint package. 

## Testing

WOOPS! Something is not working as expected. In progress...
~~To run tests simply execute `npm test`~~

## Versioning

To version management of app please use npm's package `mversion`.

# Changelog

### 0.6.0
* Update of Meteor to `1.3.3`
* Better loading layout for list item.

### 0.5.1
* Unselecting active element while reaching home.
* Loading state of list item.
* Hide labels menu when user is not logged in.
* Better `no items` layout.
* Few other minor fixes.

### 0.5.0
* Labels functionality (managing and assigning to gists)
* Filtering list by labels

### 0.4.0
* Ability to review all files of shown GIST. 
* Some UX/UI fixes. 

### 0.3.1
* Fetching data on login and page load.

### 0.3.0
* Fetching data from Github
* Listing items, filtering them.
* Navigation

### 0.2.0
* Authentication with Github
* Auth Button 
* Displaying menu options

### 0.1.0
* Initial project structure based on [Mantra specification (0.2.0)](https://kadirahq.github.io/mantra/) 
