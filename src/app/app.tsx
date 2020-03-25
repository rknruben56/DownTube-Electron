import * as React from 'react';
import { useForm } from 'react-hook-form';
import { homedir } from 'os';
import { youtubeControl } from '../youtube/youtube-control';

interface AppForm {
  url: string;
  title: string;
  directory: string;
}

const defaultDirectory = `${homedir}/Youtube`;
const defaultTitle = 'Download';

const App = () => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm();
  const onSubmit = (data: AppForm) => {
    console.log(data)
    let directory = data.directory || defaultDirectory;
    let title = data.title || defaultTitle;
    youtubeControl.download(data.url, directory, title);
  };

  const onUrlBlur = () => {
    let values = getValues();
    let url = values.url;
    if (url) {
      // TODO: Add loading spinner
      youtubeControl.getTitle(url)
        .then(title => {
          setValue('title', title);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <div className="form-group">
        <label htmlFor="url">YouTube URL</label>
        <input id="url" name="url" className="form-control" ref={register({ required: true })} onBlur={onUrlBlur} />
        {errors.url && <span className="error">This field is required.</span>}
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" className="form-control" ref={register} />
      </div>
      <div className="form-group">
        <label htmlFor="directory">Folder</label>
        <button type="button" id="directory" name="directory" className="btn btn-secondary form-control">Select Folder</button>
      </div>
      <div className="submit">
        <button id="download" className="btn btn-primary btn-lg btn-block">Download</button>
      </div>
    </form>
  )
}
export default App;