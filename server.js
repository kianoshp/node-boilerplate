//setup Dependencies
var express   = require('express')
    , port    = (process.env.PORT || 8082)
    , request = require('request')
    , fs      = require('fs')
    , pjson   = require('./package.json')
    , data    = require(__dirname + '/assets/js/data/data.js');

//Setup Express
var server = express();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(express.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(express.static(__dirname + '/assets'));
    server.use(server.router);
    server.use(function(err, req, res, next){
      if (err instanceof NotFound) {
          res.render('404.jade', { 
                    title : '404 - Not Found'
                   ,description: ''
                   ,author: ''
                   ,analyticssiteid: 'XXXXXXX' 
                   ,status: 404 });
      } else if (err) {
        console.log(err);
        console.log("I am going to show 500.jade");
          res.render('500.jade', { 
                    title : 'The Server Encountered an Error'
                   ,description: ''
                   ,author: ''
                   ,analyticssiteid: 'XXXXXXX'
                   ,error: err 
                   ,status: 500 });
      }
    });
});

server.listen(port);

//Setup Socket.IO
// var io = io.listen(server);
// io.sockets.on('connection', function(socket){
//   console.log('Client Connected');
//   socket.on('message', function(data){
//     socket.broadcast.emit('server_message',data);
//     socket.emit('server_message',data);
//   });
//   socket.on('disconnect', function(){
//     console.log('Client Disconnected.');
//   });
// });


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////
server.get('/', function(req,res){
  res.render('index.jade', 
    {
      title : 'Generic title will go here'
     ,description: 'Describe what you are doing'
     ,author: pjson.author
     ,analyticssiteid: 'XXXXXXX' 
    });
});

server.get('/initialPage', function(req,res){
  res.send(data.helloWorld);
});

server.get('/jasmineTest', function(req,res){
  fs.readFile(__dirname + '/static/test/SpecRunner.html', 'utf8', function(err, text){
    res.send(text);
  });
});

//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
    throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://localhost:' + port );
