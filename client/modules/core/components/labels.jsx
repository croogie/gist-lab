import React, {Component} from 'react';
import classnames from 'classnames';

export default class Labels extends Component {
  header() {
    const {
      onAddLabelClick = () => null,
      onSettingsClick = () => null
    } = this.props;

    return (
      <div className="header item">
        <i className="plus icon circle link" title="Add new label" onClick={() => onAddLabelClick()}/>
        <i className="setting icon link" title="Manage labels" onClick={() => onSettingsClick()}/>
        Labels
      </div>
    );
  }

  labels() {
    const {
      labels, active = [], editMode = false,
      onLabelClick = () => null, onLabelDelete = () => null
    } = this.props;

    return (
      <div>
        {labels.map(label => (
          <a key={label.title}
               onClick={() => !editMode ? onLabelClick(label._id) : onLabelDelete(label)}
               className={classnames('item', {active: active.indexOf(label._id) !== -1})}>
            <i className={classnames('icon', label.color, {tag: !editMode, trash: editMode})}/>
            {label.title}
          </a>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="ui secondary inverted vertical small fluid pointing menu">
        {this.header()}
        {this.labels()}
      </div>
    );
  }
};
