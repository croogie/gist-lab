import React, {Component, PropTypes} from 'react';
import style from './gists_list.scss';
import Item from './gists_list_item.jsx';

import classnames from 'classnames';

export default class GistsList extends Component {
  items() {
    let {open, selectedId, items = [], loading} = this.props;

    if (loading) {
      return this.loading();
    }

    return (
      <div className={style.listContainer}>
           {items.map((item, key) => (
             <Item key={key}
                   gist={item}
                   onClick={() => open(item.id)}
                   selected={item.id === selectedId}/>
           ))}
      </div>
    );
  }

  loading() {
    return (
      <div className={style.centered}>
        <h3 className="ui header">
          <i className="refresh icon loading"/>
          <div className="content">
            Please wait...
            <div className="sub header">We're fetching data</div>
          </div>
        </h3>
      </div>
    );
  }

  menu() {
    const {refresh = () => null, fetching = false} = this.props;

    return (
      <div className={style.menuContainer}>
        <strong>Gists list</strong>
        <div>
          <i className="star icon link disabled"/>
          <i className="world icon link disabled"/>
          <i className="lock icon link disabled"/>
          <i className={classnames('refresh link icon', {loading: fetching})} onClick={refresh}/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={style.container}>
           {this.menu()}
           {this.items()}
      </div>
    );
  }
}

GistsList.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  fetching: PropTypes.bool,
  selectedId: PropTypes.string,
  open: PropTypes.func,
  refresh: PropTypes.func
};
