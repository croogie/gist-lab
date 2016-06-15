import React, {Component, PropTypes} from 'react';
import style from './gists_list_item.scss';
import moment from 'moment';
import classnames from 'classnames';

export default class GistsListItem extends Component {
  loadingOverlay() {
    if (this.props.loading) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate loader"/>
        </div>
      );
    }

    return null;
  }

  contentColumn() {
    const {created_at, description, files, owner: {login}} = this.props.gist;

    const createdAt = moment(created_at);
    const fileCount = Object.keys(files).length;

    return (
      <div className={style.content}>
        <h5 className="ui header">
          <div>{Object.keys(files)[0]}</div>
          <div className="sub header">
            <small>
              <abbr title={createdAt.format('LL')}>{createdAt.fromNow()}</abbr>
              <span> {login} has added </span>
              <abbr title={Object.keys(files).join(', ')}>
                    {fileCount > 1 ? `${fileCount} files` : 'one file'}
              </abbr>
            </small>
          </div>
        </h5>
        <div className={style.description}>{description}</div>
        {this.tagsRow()}
      </div>
    );
  }

  tagsRow() {
    const {labelDefs, gist: {labels}} = this.props;

    if (!labels || !labels.length) {
      return null;
    }

    return (
      <div>
        {labels.map((label, i) => (
          <i key={i}
             title={labelDefs[label].title}
             className={classnames('icon tag', labelDefs[label].color)}/>
        ))}
      </div>
    );
  }

  render() {
    const {
      selected,
      onClick,
      gist: {owner: {avatar_url}}
    } = this.props;

    return (
      <div className={selected ? style.selected : style.container}
           onClick={onClick}>
           {this.loadingOverlay()}
             <div className={style.avatar}>
               <img src={avatar_url} className="ui mini rounded image"/>
             </div>
           {this.contentColumn()}
           {this.iconsColumn()}
      </div>
    );
  }

  iconsColumn() {
    const {public: pub, starred} = this.props.gist;

    let icons = [{
      className: classnames(pub ? 'world' : 'lock', style.icon, 'icon item'),
      title: `${pub ? 'Public' : 'Private'} gist`
    }];

    if (starred) {
      icons.push({
        className: `star icon yellow item ${style.icon}`,
        title: 'Starred gist'
      });
    }

    return (
      <div className={style.icons}>
        {icons.map((icon, key) => (<i key={key} {...icon} />))}
      </div>
    );
  }
}

GistsListItem.propTypes = {
  loading: PropTypes.bool,
  selected: PropTypes.bool,
  labelDefs: PropTypes.object,
  gist: PropTypes.shape({ // GIST with shape received from Github API
    owner: PropTypes.object,
    description: PropTypes.string,
    public: PropTypes.bool,
    created_at: PropTypes.string,
    files: PropTypes.object,
    starred: PropTypes.bool
  }),
  onClick: PropTypes.func
};

GistsListItem.defaultProps = {
  loading: false,
  selected: false,
  onClick: () => null,
  labelDefs: {loading: {title: '', color: 'grey'}},
  gist: { // by default gist is filled with loading data.
    owner: {
      avatar_url: '/img/octocat.png',
      login: 'Unknown'
    },
    description: 'Loading data. Please wait...',
    public: true,
    created_at: new Date().toISOString(),
    files: {
      'Loading...': {
        language: 'unknown'
      }
    },
    labels: ['loading', 'loading', 'loading'],
    starred: false
  }
};

export default GistsListItem;
