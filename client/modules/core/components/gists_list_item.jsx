import React, {Component, PropTypes} from 'react';
import style from './gists_list_item.scss';
import moment from 'moment';
import _ from 'lodash';
import classnames from 'classnames';

export default class GistsListItem extends Component {
  render() {
    const {
      selected,
      gist: {owner: {avatar_url, login}, description, public: pub, created_at, files, starred},
      onClick = () => null
    } = this.props;
    const createdAt = moment(created_at);
    const fileCount = Object.keys(files).length;

    return (
      <div className={selected ? style.selected : style.container} onClick={onClick}>
        <div className={style.avatar}>
          <img src={avatar_url} className="ui mini rounded image"/>
        </div>
        <div className={style.content}>
          <h5 className="ui header">
            <div>{Object.keys(files)[0]}</div>
            <div className="sub header">
              <small>
                <abbr title={createdAt.format('LL')}>{createdAt.fromNow()}</abbr>
                <span> {login} has added </span>
                <abbr title={_.values(files).map(file => file.language).join(', ')}>
                  {fileCount > 1 ? `${fileCount} files` : 'one file'}
                </abbr>
              </small>
            </div>
          </h5>
          <div className={style.description}>{description}</div>
          {this.tags()}
        </div>
           {this.icons(pub, starred)}
      </div>
    );
  }

  tags() {
    const {labels: labelDefs} = this.props;
    const {labels} = this.props.gist;

    if (!labels || !labels.length) {
      return null;
    }

    return (
      <div>
        {labels.map(label => (
          <i key={label}
             title={labelDefs[label].title}
             className={classnames('icon tag', labelDefs[label].color)} />
        ))}
      </div>
    );
  }

  icons(pub = true, starred = false) {
    let icons = [
      {
        className: classnames({
          world: pub,
          lock: !pub,
          'icon item': true,
          [style.icon]: true
        }),
        title: `${pub ? 'Public' : 'Private'} gist`
      }
    ];

    if (starred) {
      icons.push({className: `star icon item ${style.icon}`, title: 'Starred gist'});
    }

    return (
      <div className={style.icons}>
        {icons.map((icon, key) => (<i key={key} {...icon} />))}
      </div>
    );
  }
}

export default GistsListItem;
