var fs = require('fs');
var path = require('path');

var sourceFile = path.join(__dirname, '/tpl');
// console.log(sourceFile);

// var 

function copyDir(src, dist, cb) {
    console.log(src);
    console.log(dist);
    fs.access(dist, function(err) {
        if(err) {
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist, cb);
    }); 
}

function _copy(err, src, dist, cb) {
    if(err) {
        cb(err);
    } else {
        fs.readdir(src, function(err, paths) {
            if(err) {
                cb(err);
            } else {
                paths.forEach(function(path) {
                    console.log(path);
                    console.log('-------------')
                    var _src = src + '/' + path;
                    var _dist = dist + '/' + path;
                    fs.stat(_src, function(err, stat) {
                        if(err) {
                            cb(err);
                        } else {
                            if(stat.isFile()) {
                                console.log(_dist);
                                fs.writeFileSync(_dist, fs.readFileSync(_src));
                            } else if(stat.isDirectory() ) {
                                copyDir(_src, _dist, cb);
                            }
                        }
                    })
                })
            }
        })
    }
}

copyDir(sourceFile, './test', function(err) {
    console.log(err);
})