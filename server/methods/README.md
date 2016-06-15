# Methods

Core of operating on data. They fetches data from API and doing writes to MongoDB which is later sync with clients. Because it's server side keys used by API clients are not shared to user.

*   `github`
 
    * getting gists (my, starred)
    * fetching gists data `github.gists.fetch` and populate MongoDB with updated info
    * staring / unstaring gists (using API call)

*   `labels` - actually it's server side equivalent to actions on client side. These methods are called by `labels` actions.
