var test = require('tape');
var Dest = require('..');
var path = require('path');
var Readable = require('stream').Readable;
var fs = require('fs');
var exists = require('file-exists');

test('Dest(filename)', function(t) {
    t.plan(1);
    var rs = createReadStream();
    var dest = fixtures('dest/hello');
    if (exists(dest)) {
        fs.unlinkSync(dest);
    }
    rs.pipe(Dest(dest, function () {
        t.equal(
            fs.readFileSync(dest).toString('utf8').replace(/\s+/g, ''),
            'hello,world!'
        );
    }));
});

test('Dest(filename, basedir)', function(t) {
    t.plan(1);
    var rs = createReadStream();
    var dir = fixtures('dest/say');
    var dest = path.join(dir, 'hello');
    if (exists(dest)) {
        fs.unlinkSync(dest);
    }
    rs.pipe(Dest('hello', dir, function () {
        t.equal(
            fs.readFileSync(dest).toString('utf8').replace(/\s+/g, ''),
            'hello,world!'
        );
    }));
});

function fixtures() {
    return path.resolve.bind(path, __dirname, 'fixtures').apply(path, arguments);
}

function createReadStream() {
    var rs = Readable({ objectMode: true });
    rs.push('hello,');
    rs.push(' world!');
    rs.push(null);
    return rs;
}

