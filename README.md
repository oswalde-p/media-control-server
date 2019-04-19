# media-control-server

A very simple express server to control media playback. Uses xdotool to simulate key presses in response to GET requests. Currently only Linux is supported due to the use of xdotool. Not secure at all, use at your own risk :)

## Running

```
git clone https://github.com/oswalde-p/media-control-server.git
cd media-control-server
npm install
npm start
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

Response eg:
```
{
  "command": "volumedown"
}
```

### GET /ping
Check that the server is running
