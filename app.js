var fs = require('fs');
var path = require('path');

var sourceFile = path.join(__dirname, '/tpl');
// console.log(sourceFile);

process.stdin.setEncoding('utf8');


function copyDir(src, dist, cb) {
    fs.access(dist, function(err) {
        if(err) {
            fs.mkdirSync(dist);
        } else { //文件已经存在是否覆盖？
            console.log('yes or no');
            process.stdin.on('data', function(text) {
                
                var text = text.trim().toLowerCase();

                if(text == 'yes' || text == 'y') {
                    test();
                } else {
                    _test();
                }
                process.exit()
            })
            // _copy(null, src, dist, cb);
        }
    }); 
}

function _test() {
    console.log('------test-------');
}

function test() {
    console.log('--------if-------');
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
                    var _src = src + '/' + path;
                    var _dist = dist + '/' + path;
                    fs.stat(_src, function(err, stat) {
                        if(err) {
                            cb(err);
                        } else {
                            if(stat.isFile()) {
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

var distFile = process.argv[2] ? ('./' + process.argv[2]) : './po_fe';

copyDir(sourceFile, distFile, function(err) {
    console.log(err);
})