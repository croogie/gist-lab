import React from 'react';
import GistFile from '../containers/gist_file';

const GistFiles = ({files}) => (
  <div>
    {Object.keys(files).map(filename => (
      <GistFile file={files[filename]} key={filename}/>
    ))}
  </div>
);

export default GistFiles;
