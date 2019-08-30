
var express = require('express');
var app = express();
var path = require('path');

// 获取参数
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 上传文件 文件的获取加上传的配置
var multer = require('multer');
var storage = multer.diskStorage({// 设置上传后文件路径，路径文件夹需要自己创建
    destination: function (req, file, cb) {
        cb(null, './upload')
    }, 
    filename: function (req, file, cb) { // 给上传文件重命名，获取添加后缀名
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({storage}); // for parsing multipart/form-data  //添加配置文件到muler对象。


app.get('/', (req, res)=>{
    const htmlPath = path.join(__dirname, '/static/ajax.html');  // 显示静态文件要用绝对路径
    res.sendFile(htmlPath);
})

app.post('/submit', upload.array('uploadSingleFile', 2), (req, res)=>{
    // uploadSingleFile与接口参数名相对应 
    // upload.single获取单文件的上传用req.file={}获取即可  upload.array获取多个文件上传用req.files = [{},]
    var newName = req.params.newName;
    console.log(req.headers.token)
    console.log('其他字段：', req.body.mobile)

    var file =  req.files;    // 都用.file获取上传的文件
    console.log('文件', file);  // file的filename为服务器保存的文件名

    res.set({'Content-Type': "application/json"});
    res.status(200).send(
        JSON.stringify({
            code: 200,
            data: 'success',
            msg: '成功'
        })
    ).end();
})

app.listen(2019, ()=>{ console.log('http://localhost:2019') })


// var http = require('http');
// http.createServer(function(req, res){
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'token');
//     // res.setHeader('Access-Control-Allow-Methods', 'POST');

//     if(req.url==='/data'){
//         var content = ''
//         req.on('data', function(data){
//             content += data;
//         });
        
//         req.on('end', function(){
//             console.log('1111111', req.newName)
//             // destinationFile = fs.createWriteStream("destination.md");
//             // request.pipe(destinationFile);
//             res.writeHead(200, {"Content-Type": "application/json"})
//             res.write(JSON.stringify({
//                 code: 200,
//                 data: 'success',
//                 msg: '成功'
//             }));
//             res.end();
//         })

//     }

// }).listen(2019)

// console.log('Server is running at http://localhost:2019/');