var source = require('vinyl-source-stream');
var vfs = require('vinyl-fs');
var Stack = require('writable-stream-stack');
var path = require('path');

module.exports = function (filename, dest, cb) {
    if (typeof dest === 'function') {
        cb = dest;
        dest = '';
    }
    filename = path.resolve(dest || '', filename);
    var ws = Stack(
        source(path.basename(filename)),
        vfs.dest(path.dirname(filename))
    );
    if (cb) {
        ws.on('done', cb);
    }
    return ws;
};
