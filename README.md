# media-control-server

A very simple express server to control media playback. Uses xdotool to simulate key presses in response to GET requests. Currently only Linux is supported due to the use of xdotool. Not secure at all, use at your own risk :)

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
