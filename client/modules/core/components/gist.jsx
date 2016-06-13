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
    const {created_at, updated_at, description, owner, public: pub, files} = this.props.gist;
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
      editable, editing, gist, starring,
      onStarClick, onPublicityClick, onSaveClick, onEditClick, onDeleteClick
    } = this.props;
    const {starred, id, public: pub} = gist;
    const disabled = !editable;
    const editClassName = classnames('ui button primary right floated', {disabled});

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

        <div className={classnames('ui animated fade button', {loading: starring})}
             onClick={() => starring ? null : onStarClick(gist)}>
          <div className="visible content">
            <i className={classnames('star icon', {empty: !starred, yellow: starred})}/> {starred ? 'Starred' : 'Not starred'}
          </div>
          <div className="hidden content">{starred ? 'Unstar' : 'Make it shine!'}</div>
        </div>

        <button className={classnames('ui button', {disabled})} onClick={() => onPublicityClick(id)}>
          <i className={classnames('icon', {world: !pub, lock: pub})}/>
                {pub ? 'Make private' : 'Make public'}
        </button>

        <button className={classnames('ui icon button', {disabled})}
                onClick={() => onDeleteClick(id)}>
          <i className="trash icon"/>
        </button>

      </footer>
    );
  }
}

export default Gist;
