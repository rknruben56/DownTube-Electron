import * as React from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { homedir } from 'os';
import { youtubeService } from '../services/youtube-service';
import { AppForm } from './app-form';
import { DownloadParams } from '../services/download-params';
import { Button, Spinner } from 'react-bootstrap';

const defaultDirectory = `${homedir}\\Youtube`;
const defaultTitle = 'Download';
const requiredMessage = 'This field is required.';

const urlValidation = {
  required: requiredMessage,
  pattern: {
    value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//,
    message: 'Please enter a valid YouTube URL.'
  }
};

const App = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const [isDownloading, setDownloading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const { register, handleSubmit, errors, getValues, setValue, clearError, triggerValidation } = useForm();

  const onSubmit = (data: AppForm) => {
    let directory = data.directory || defaultDirectory;
    let title = data.title || defaultTitle;

    let downloadParams: DownloadParams = {
      url: data.url,
      directory: directory,
      title: title,
      onComplete: onDownloadComplete,
      onError: onError
    };

    setDownloading(true);
    youtubeService.download(downloadParams);
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
      setLoading(true);

      youtubeService.getTitle(url)
        .then(title => {
          setLoading(false);
          setValue('title', title);
        });
    }
  };

  const onError = (output: string) => {
    setDownloading(false);
    setError(true);
    setErrorMessage(output);
  }

  const onDownloadComplete = () => {
    setDownloading(false);
    setSuccess(true);
  };

  return (
    <div className='app container-fluid'>
      <h1>DownTube</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="url">YouTube URL</label>
          <input id="url" name="url" className="form-control" ref={register(urlValidation)} onBlur={onUrlBlur} />
          <ErrorMessage errors={errors} name="url" as="p" />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          {isLoading && <div className="spinner"><Spinner className="spinner" animation="border" as="span" /></div>}
          {!isLoading && <input id="title" name="title" className="form-control" ref={register} />}
        </div>
        <div className="form-group">
          <label htmlFor="directory">Folder</label>
          <input id="directory" className="form-control" name="directory" defaultValue={defaultDirectory} ref={register({ required: requiredMessage })} />
          <ErrorMessage errors={errors} name="directory" as="p" />
          <Button variant="secondary" type="button" size="lg" block>Select Folder</Button>
        </div>
        <div className="submit">
          <Button variant="primary" type="submit" size="lg" block disabled={isDownloading}>
            {!isDownloading && <span>Download</span>}
            {isDownloading && <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Downloading...</>}
          </Button>
        </div>
      </form>
      {isError && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      {isSuccess && <div className="alert alert-success" role="alert">Video Successfully downloaded!</div>}
    </div>
  )
}
export default App;