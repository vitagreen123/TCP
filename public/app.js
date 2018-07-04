const net = require('net')
const path = require('path')
const fs = require('fs');

const {PORT = 4000} = process.env

const pack = (body) => {
  return [
    'HTTP/1.1 200 OK',
    'Date: ' + (new Date()).toUTCString(),
    'Content-Type: text/html',
    'Content-Length: ' + body.length,
  ].join('\r\n') + '\r\n\r\n'
}

const parseRequest = (buffer) => {
  const str = buffer.toString()
  const [head, body] = str.split('\r\n\r\n')
  const lines = head.split('\r\n')
  const [method, url, httpVersion] = lines[0].split(' ')
}

const server = net.createServer((socket)=>{
  console.log('connect from ' + socket.remoteAddress)

  socket.on('data', (data)=>{
    console.log('data', data.toString())

    const req = parseRequest(data);



    let filePath = path.join(__dirname, 'index.html');

    let indexStr = fs.readFileSync(filePath, 'utf8');
    //let aboutStr = fs.readFileSync(filePath, 'utf8');

    socket.write(pack(indexStr))
    socket.write(indexStr)
  })
})

server.listen(PORT, () => {
  console.log('Server listening: ' + server.address().port)
})