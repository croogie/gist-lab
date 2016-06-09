import {Mongo} from 'meteor/mongo';


const Gists = new Mongo.Collection('gists');

export default Gists;
