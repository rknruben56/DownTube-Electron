import * as React from 'react';
import { useForm } from 'react-hook-form';

interface AppForm {
  url: string;
  title: string;
  directory?: string;
}

const App = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: AppForm) => { console.log(data) };

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <div className="form-group">
        <label htmlFor="url">YouTube URL</label>
        <input id="url" name="url" className="form-control" ref={register} />
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