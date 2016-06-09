import React, {Component, PropTypes} from 'react';
import style from './gists_list_item.scss';
import moment from 'moment';

export default class GistsListItem extends Component {
  render() {
    const {selected, gist, onClick = () => null} = this.props;

    return (
      <div className={selected ? style.selected : style.container} onClick={onClick}>
        <div className={style.avatar}>
          <img src="https://avatars1.githubusercontent.com/u/33229?v=3&s=60"
               alt=""
               className="ui mini rounded image"/>
        </div>
        <div className={style.description}>
          <h5 className="ui header">
            <div>GistsListItem {gist} asdfasdf sdf asdf asdf asdf asdf dsf</div>
            <div className="sub header">
              <small>
                <abbr title="pdf, doc">2 files</abbr> added <abbr title="20th of May, 2015">yesterday</abbr>
              </small>
            </div>
          </h5>
          <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis consectetur distinctio, eveniet id.
          </small>
        </div>
        <div className={style.icons}>
          <i className="world icon" title="Public GIST"/>
        </div>
      </div>
    );
  }
}

export default GistsListItem;
