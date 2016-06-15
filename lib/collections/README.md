# Collections

*   `gists` - here we're storing all users' gists. Also we're providing methods for filtering list of gists (eg. [`findFiltered`](https://github.com/croogie/gist-lab/blob/develop/lib/collections/gists.js#L4))
    
    All user's gists are stored in one, the same collection. User's gists are distinguished by `userId` property.
    
    Every document can contain property `labels` which can be array of label ids.
    
*   `labels` - Contains definitions of labels for specific user. 
