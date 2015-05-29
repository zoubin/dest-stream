# dest-stream
Wrapper for vinyl-source-stream and vinyl-fs to make a dest stream

The returned Writable is a [writable-stream-stack](https://www.npmjs.com/package/writable-stream-stack), and transforms can be added to make changes before pipe inot the dest.

## Usage

```javascript
var Dest = require('dest-stream');
```

### Dest(filename)
### Dest(filename[, basedir], cb)

* The dest file path will be `path.resolve(basedir, filename)`.
* `cb` will be called after all contents are piped into the dest.

