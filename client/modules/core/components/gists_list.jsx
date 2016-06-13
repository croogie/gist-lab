import React, {Component, PropTypes} from 'react';
import style from './gists_list.scss';
import Item from '../containers/gists_list_item';

import classnames from 'classnames';

export default class GistsList extends Component {
  items() {
    let {open, selectedId, items = [], loading} = this.props;

    if (loading) {
      return this.loading();
    }

    if (!items || !items.length) {
      return this.noItems();
    }

    return (
      <div className={style.listContainer}>
           {items.map((item) => (
             <Item key={item.id}
                   gist={item}
                   onClick={() => open(item.id)}
                   selected={item.id === selectedId}/>
           ))}
      </div>
    );
  }

  noItems() {
    const {refresh, fetching} = this.props;

    return (
      <div className={style.centered}>
        <h3 className="ui header relaxed">
          <i className="github alternate icon"/>
          <div className="content">
            There are no items to show
            <div className="sub header">Be sure that you:</div>
          </div>
        </h3>
        <ul>
          <li>Synced data with github,</li>
          <li>Didn't apply too many filters on results (eg. star, ownership or label filters)</li>
        </ul>
        <p>Otherwise you really don't have any gists.</p>
        <p><button className="ui button primary icon labeled">
          Add new gist<i className="plus circle icon"/>
        </button></p>
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

  editing() {
    if (!this.props.editing) {
      return null;
    }

    return (
      <div className="ui active inverted dimmer">
        <div className="ui indeterminate text loader">In edit mode.</div>
      </div>
    );
  }

  menu() {
    const {
      showStarred = false,
      showPublic = false,
      showPrivate = false,
      showOwned = false,
      fetching = false,

      refresh = () => null,
      togglePrivate = () => null,
      toggleStarred = () => null,
      togglePublic = () => null,
      toggleOwned = () => null,

      items = []
    } = this.props;

    return (
      <div className={style.menuContainer}>
        <strong>Gists list ({items.length})</strong>
        <div>
          <i className={classnames('user icon link', {disabled: !showOwned})}
             title="Show only owned by me"
             onClick={toggleOwned} />
          <i className={classnames('star icon link', {disabled: !showStarred})}
             title="Show only starred gists"
             onClick={toggleStarred}/>
          <i className={classnames('world icon link', {disabled: !showPublic})}
             title="Show only public gists"
             onClick={togglePublic}/>
          <i className={classnames('lock icon link', {disabled: !showPrivate})}
             title="Show only private gists"
             onClick={togglePrivate}/>
          <span> | &nbsp;</span>
          <i className={classnames('refresh link icon', {loading: fetching})}
             title="Update gists collection with GITHUB"
             onClick={refresh}/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={classnames(style.container)}>
        {this.editing()}
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
