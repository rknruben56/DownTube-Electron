import * as React from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { homedir } from 'os';
import { youtubeControl } from '../youtube/youtube-control';
import LoadingOverlay from 'react-loading-overlay';

interface AppForm {
  url: string;
  title: string;
  directory: string;
}

const defaultDirectory = `${homedir}/Youtube`;
const defaultTitle = 'Download';
const urlValidation = {
  required: 'This field is required.', 
  pattern: { 
    value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//, 
    message: 'Please enter a valid YouTube URL.'
  } 
};

const App = () => {
  const [isActive, setActive] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('');

  const { register, handleSubmit, errors, getValues, setValue, setError, clearError, triggerValidation } = useForm();
  
  const onSubmit = (data: AppForm) => {
    let directory = data.directory || defaultDirectory;
    let title = data.title || defaultTitle;
    youtubeControl.download(data.url, directory, title);
  };

  const onUrlBlur = async () => {
    let values = getValues();
    let url = values.url;
    if (url) {
      await setTitle(url);
    }
  };

  const setTitle = async (url: string) => {
    let result = await triggerValidation('url');
    if (result) {
      clearError('url');
      startLoading('Loading title');
      youtubeControl.getTitle(url)
        .then(title => {
          setValue('title', title);
          stopLoading();
        });
    }
  };

  const startLoading = (text: string) => {
    setActive(true);
    setLoadingText(text);
  };

  const stopLoading = () => {
    setActive(false);
    setLoadingText('');
  }

  return (
    <LoadingOverlay active={isActive} spinner text={loadingText}>
      <div className='app container-fluid'>
        <h1>DownTube</h1>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <div className="form-group">
            <label htmlFor="url">YouTube URL</label>
            <input id="url" name="url" className="form-control" ref={register(urlValidation)} onBlur={onUrlBlur} />
            <ErrorMessage errors={errors} name="url" as="span"/>
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
      </div>
    </LoadingOverlay>
  )
}
export default App;