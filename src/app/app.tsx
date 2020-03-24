import * as React from 'react';

export class App extends React.Component {
  render() {
    return <>
      <div className="form-group">
        <label htmlFor="url">YouTube URL</label>
        <input id="url" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input id="title" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="directory">Folder</label>
        <button type="button" id="directory" className="btn btn-secondary form-control">Select Folder</button>
      </div>
      <div>
        <button id="download" type="button" className="btn btn-primary">Download</button>
      </div>
    </>;
  }
}