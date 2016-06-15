# Actions

Here we have some grouping of actions which could be called by user. There are groupped to:

*   `github` - Actions related to interaction with GitHub like:
    * Fetching gists from Github API
    * Toggling filter statuses (eg. public, ownership, starred)
    * Starring gist (with Github API)
*   `labels` - Actions related to Labels
    * Adding/Removing labels
    * Updating gist labels
    * Toggling label filters
*   `user` - Logging in / out user
*   `navigate_to` - Moving user to different section of app / state
    * Sets specific filters setting (eg. Starred from menu)
    * Move user to Gist page / Home page
     
In most cases Actions are calling Meteor methods or changes LocalState stored values.

