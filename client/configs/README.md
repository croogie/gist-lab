# Configs

Here are stored all files which share some configuration between all modules.

## `context.js`

Defines object which is passed in almost all objects within Mantra.

In this case we're defining:

`Meteor` - daah.. it's almost needed in every case ;)
`FlowRouter` - Routing library
`Collections` - Contains all defined collections in app
`LocalState` - `ReactiveDict` package instnce which is treated here as a one global store
`Tracker` - Meteor's reactive system
`_` - LoDash library instance
`Msg` - Bert package for user notifications

