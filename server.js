var connect = require('connect');
    serveStatic = require('serve-static');
    network = require('network');
	port = process.env.PORT || 3000;
    project = require('./package.json');
    winston = require('winston');
    liveReload = require('livereload');

connect().use(serveStatic(__dirname)).listen(port);

var liveReloadServer = liveReload.createServer();
liveReloadServer.watch(__dirname);

winston.info("Running:");
winston.info("\t"+project.name)
winston.info("LiveReload Server is watching:")
winston.info("\t"+__dirname)

network.get_active_interface(function(err, obj) {
	winston.info("The magic happens at");
    winston.info('\t http://localhost:' + port+"/"+project.name);
    winston.info('\t ' + obj.ip_address+":" + port+"/"+project.name);
});
