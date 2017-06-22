/**
 * Created by lijiaxing on 2017/6/14.
 *
 * 公用配置文件
 */
var fs = require('fs');

var commonConfig = {
	email_receiver: "test@xxun.site",
	email_config: {
		host: 'xxun.site', //邮件服务器
        port: 25, //邮件服务器端口
        address: 'li@xxun.site', //邮箱地址
        user: 'li@xxun.site', //用户名
        pass: 'lijiaxing' //密码
	},
	web: {
		domain: 'localhost', //域名
        http_port: 3000, //http访问端口
        https_port: 3001 //https访问端口
	},
	image: __dirname + "/public/img", // 图片文件
	portrait: __dirname + "/public/img/portrait" // 用户头像存放地址
}

module.exports = commonConfig;