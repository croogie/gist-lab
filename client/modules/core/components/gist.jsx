import React, {Component} from 'react';
import GistFiles from '../containers/gist_files';
import classnames from 'classnames';
import moment from 'moment';
import style from './gist.scss';

export default class Gist extends Component {
  render() {
    const {gist} = this.props;

    return (
      <div className={style.container}>
           {this.header()}
             <article className={style.files}>
               <GistFiles gist={gist}/>
             </article>
           {this.footer()}
      </div>
    );
  }

  header() {
    const {created_at, updated_at, description, owner, public: pub, starred, url, files} = this.props.gist;
    const file = Object.keys(files)[0];
    const created = moment(created_at);
    const updated = moment(updated_at);

    return (
      <header className={style.header}>
        <h4 className="ui header">
          <i className={classnames(pub ? 'world' : 'lock', 'icon')}/>
          <div className="content">
               {file}
                 <div className="sub header">
                   <small>
                     Created by <strong>{owner.login}</strong> on {created.format('LLL')}.
                                                                  {updated.isAfter(created) ? '' : ` Updated on ${updated.format('LLL')}`}
                   </small>
                 </div>
          </div>
        </h4>
        <p>{description}</p>
      </header>
    );
  }

  footer() {
    const {
      editable, editing, gist,
      onStarClick, onPublicityClick, onSaveClick, onEditClick, onDeleteClick
    } = this.props;
    const {starred, id, public: pub} = gist;
    const editClassName = classnames('ui button primary right floated', {disabled: !editable});

    return (
      <footer className={style.footer}>
        {(editing) ? (
          <button className={editClassName} onClick={() => onSaveClick(gist)}>
            <i className="save icon"/>Save changes
          </button>
        ) : (
          <button className={editClassName} onClick={() => onEditClick(gist)}>
            <i className="pencil icon"/>Edit gist
          </button>
        )}

        <button className="ui icon button" onClick={() => onStarClick(id)}>
          <i className={classnames('star icon', {empty: !starred})}/>
        </button>

        <button className="ui button" onClick={() => onPublicityClick(id)}>
          <i className={classnames('icon', {world: !pub, lock: pub})}/>
                {pub ? 'Make private' : 'Make public'}
        </button>

        <button className={classnames('ui icon button', {disabled: !editable})}
                onClick={() => onDeleteClick(id)}>
          <i className="trash icon"/>
        </button>

      </footer>
    );
  }
}

export default Gist;
