import React, {Component, PropTypes} from 'react';
import style from './gists_list.scss';
import Item from './gists_list_item.jsx';

import _ from 'lodash';

export default class GistsList extends Component {
  items() {
    let {open, selectedId} = this.props;
    let items = _.range(150);

    return items.map((item, key) => {
      return (
        <Item key={key} gist={item} onClick={() => open(item)} selected={item === selectedId}/>
      );
    });
  }

  menu() {
    return (
      <div className={style.menuContainer}>
        <div>Michał</div>
        <div><i className="refresh loading link icon"/></div>
      </div>
    );
  }

  render() {
    return (
      <div className={style.container}>
           {this.menu()}
             <div className={style.listContainer}>
                  {this.items()}
             </div>
      </div>
    );
  }
}

GistsList.propTypes = {
  selectedId: PropTypes.number,
  open: PropTypes.func
};
