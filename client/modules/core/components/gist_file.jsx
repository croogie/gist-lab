import React, {Component} from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/css/css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';

import style from './gist_file.scss';

export default class GistFile extends Component {
  render() {
    let {content, file, editable} = this.props;

    const typeToMode = {
      'text/html': 'xml',
      'application/javascript': 'javascript',
      'text/css': 'css',
      'text/plain': 'markdown'
    };

    let options = {
      lineNumbers: true,
      mode: typeToMode[file.type] || 'xml',
      lineWrapping: true,
      theme: 'eclipse',
      viewportMargin: Infinity,
      readOnly: false
    };

    return (
      <div className={style.container}>
        <header className={style.header}><i className="file icon"/> {file.filename} ({file.type})</header>
        <CodeMirror ref={file.filename} value={content} options={options}/>
      </div>
    );
  }
}

export default GistFile;
