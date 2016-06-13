import React, {Component} from 'react';
import GistFiles from '../containers/gist_files';
import classnames from 'classnames';
import moment from 'moment';
import style from './gist.scss';
import {Dropdown} from 'react-semantify';
import _ from 'lodash';

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
    const {created_at, updated_at, description, owner, public: pub, files, id, labels: selected} = this.props.gist;
    const {labels, onChangeLabels = () => null} = this.props;
    const file = Object.keys(files)[0];
    const created = moment(created_at);
    const updated = moment(updated_at);

    const onChangeLabelsDebounced = _.debounce(onChangeLabels, 1500);

    let dropdownOptions = {
      onChange(value) {
        if (!value) {
          return onChangeLabelsDebounced(id, []);
        }

        onChangeLabelsDebounced(id, value.split(','));
      }
    };

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
        <div>
          <label>Labels: <Dropdown className="multiple inline icon" init={dropdownOptions}>
            <input type="hidden" ref="labels" defaultValue={selected} name="labels"/>
            <span className="text"><i className="icon tags"/> choose</span>
            <i className="dropdown icon"/>
            <div className="menu">
              <div className="scrolling menu">
                   {labels.map(label => (
                     <div key={label._id}
                          className="item"
                          data-value={label._id}>
                       <i className={classnames('tag icon', label.color)}/>
                          {label.title}
                     </div>
                   ))}
              </div>
            </div>
          </Dropdown></label>
        </div>
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
                    <i className={classnames('star icon', {
                      empty: !starred,
                      yellow: starred
                    })}/> {starred ? 'Starred' : 'Not starred'}
                  </div>
                  <div className="hidden content">{starred ? 'Unstar' : 'Make it shine!'}</div>
                </div>

                <button className={classnames('ui icon button', {disabled})}
                        onClick={() => onDeleteClick(id)}>
                  <i className="trash icon"/>
                </button>

      </footer>
    );
  }
}

/**
 <button className={classnames('ui button', {disabled})} onClick={() => onPublicityClick(id)}>
 <i className={classnames('icon', {world: !pub, lock: pub})}/>
 {pub ? 'Make private' : 'Make public'}
 </button>
 */

export default Gist;
