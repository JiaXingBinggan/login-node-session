/**
 * Created by lijiaxing on 2017/6/10.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var config = require("../../config");
var userModel = require('../../model/user'); // 引入user的model
var RestMsg = require('../../middlewares/RestMsg');
var modelGenerator = require('../../model/common/modelGenerator'); // 引入model公共方法对象
var User = modelGenerator(userModel, '_id');

var storage = multer.diskStorage({
     //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
      cb(null, config.portrait)
    }, 
     //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
 });

//初始化multer
var mwMulter1 = multer({
    storage: storage
});

router.post('/portrait/:id', mwMulter1.single('file'), function(req, res, next) {
    if (!fs.existsSync(config.portrait)) {
      fs.mkdirSync(config.portrait);
    }

    var restmsg = new RestMsg();
    var file = req.file;
    var userid = req.params.id;
    var updateUser = {
        portrait: file.filename
    }

    User.update({_id: userid}, updateUser, function (err, obj) {
        if (err) {
            restmsg.errorMsg(err);
            res.send(restmsg);
            return;
        }
        restmsg.successMsg();
        restmsg.setResult(obj);
        res.send(restmsg);
    })
});

router.get('/portrait/:id', function(req, res, next) {
    var restmsg = new RestMsg();
    var userid = req.params.id;

    User.findOne({_id: userid}, function (err, obj) {
        if (err) {
            restmsg.errorMsg(err);
            res.send(restmsg);
            return;
        }
        var portraitUrl = config.portrait + '/' + obj.portrait
        fs.readFile(portraitUrl, function (err, data) {
           if (err) {
               restmsg.errorMsg(err);
               res.send(restmsg);
               return;
           }
           if (data) {
             restmsg.successMsg();
             restmsg.setResult(obj.portrait);
             res.send(restmsg);
           } else {
             restmsg.errorMsg('无此头像');
             res.send(restmsg);
           }
        });
    })
})

module.exports = router;
