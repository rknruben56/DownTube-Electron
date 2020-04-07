# DownTube
Electron app that downloads YouTube videos as MP3s.

# Instructions To Run
Clone the repo
```
git clone https://github.com/rknruben56/DownTube.git
```

Install necessary packages (post install script will install the youtube-dl.exe)
```
npm install
```

Run the dev server
```
npm run dev
```

Start the app
```
npm start
```

# Instructions to package
After installing the dependencies, run the electron-builder to build the app for the specific os
```
npm run build:win
```

# Tech
The code under 
```
src\youtube-dl
```
was mostly taken from https://github.com/przemyslawpluta/node-youtube-dl but modified to get it working in a packaged windows installer

App built upon the Electron-React-TypeScript-Webpack-Boilerplate https://github.com/Devtography/electron-react-typescript-webpack-boilerplate 
