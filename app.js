var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var moment = require('moment');
var tempEmitter = require('./tempEmitter');

var routes = require('./routes/index');

var app = express();
var http = require('http');

var server = http.createServer(app);
var io = require('socket.io');
var PORT = 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Crate an HTTP server
server = http.createServer(app);
//register socket.io as a listener
io = io.listen(server);

//set socket.io to listen
io.sockets.on('connection', function (socket) {
    tempEmitter.on("temp:loaded", function (temp) {
        var timeStamp = moment().format("ddd, h:mm:ss a");
        socket.emit('tempReading', { temp: temp, timeStamp: timeStamp});
    });
});

//set server to listen
server.listen(PORT, function () {
    console.log('Server listening on port %d', 
        server.address().port);
});

module.exports = app;
