import React from 'react';
import style from './gists_list_item.scss';

const GistsListItem = ({onClick = () => null, gist, selected = false}) => (
  <div className={selected ? style.selected : style.container} onClick={onClick}>
    GistsListItem {gist} {selected ? '(selected)' : null}
  </div>
);

export default GistsListItem;
