# media-control-server

A very simple express server to control media playback. Executes key presses in response to HTTO requests. Not secure at
 all, use at your own risk :)

Supports Linux and macOS

## Using

0. Requires node and npm. Get them (here)[https://nodejs.org/]
1. First, clone the repo and install dependencies:

```
git clone https://github.com/oswalde-p/media-control-server.git
cd media-control-server
npm install
```

2. Start the server:
```
npm start
```

3. Make sure your phone + computer are on the same wifi network
4. On your phone, visit the url shown in the terminal


## Running

```
git clone https://github.com/oswalde-p/media-control-server.git
cd media-control-server
npm install
npm start
```

By default, the app will start listening on port 8675. You can specify another port with an env variable:
```
PORT=3000 node index.js
```

## API

### GET /:command
Execute the corresponding command. Options are:
- play
- pause
- volumeup
- volumedown
- mute
- skipbwd
- next
- previous
- space
- up
- down
- left
- right
- return
- backspace

e.g.
```
GET localhost:8675/volumedown
```
Response:
```
{
  "command": "volumedown"
}
```

### GET /ping
Check that the server is running
