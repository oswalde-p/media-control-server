# media-control-server

A very simple express server to control media playback. Executes key presses in response to HTTP requests. Not secure at all use at your own risk :)

Supports Linux and macOS

## Installing + Running

0. Requires node and npm. Get them [here](https://nodejs.org/)
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/oswalde-p/media-control-server.git
cd media-control-server
npm install
```

2. Start the server:
```bash
npm start
```

3. Make sure your phone + computer are on the same wifi network
4. On your phone, visit the url shown in the terminal

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
