// DAO.js
// 实现与MySQL交互
var mysql = require('mysql');
var db = require('./configs/db');
var errCode = require('./configs/errCode');
var util = require('./util');
var sqlMapping = require('./sqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool(util.extend({}, db.mysql));

module.exports = {
	//注册<增>
    register: function (request, response, next) {
        pool.getConnection(function(err, connection) {
            // 建立连接，向表中插入值
            connection.query(sqlMapping.insertAccount, [request.body.username, request.body.password], function(err, result) {
				if(err) console.log(err);
                if(result && result.affectedRows > 0) {
                    util.returnJson(response, {code:'0',msg:'注册成功'});
                }
				else{
                    util.returnJson(response, errCode.registerUserExist);
				}
                // 释放连接
                connection.release();
            });
        });
    },
	//登陆<查>
    login: function (request, response, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sqlMapping.selectAccount, [request.body.username, request.body.password], function(err, result) {
                if(err) console.log(err);
				if(result && result.length > 0) {
                    util.returnJson(response, {code:'0', msg:'登陆成功', data:result[0].id});
                }
				else{
                    util.returnJson(response, errCode.loginUserOrPassworadError);
				}
                // 释放连接
                connection.release();
            });
        });
    },
	//选区<查>
    selectServer: function (request, response, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sqlMapping.selectServer, [request.body.account_id, request.body.server_id], function(err, result) {
                if(err) console.log(err);
				if(result && result.length > 0) {
					var data = '{"id":'+result[0].id
								+',"serverid":'+result[0].server_id
								+',"nickname":"'+result[0].nickname
								+'","level":'+result[0].level
								+',"bubing":'+result[0].bubing
								+',"qibing":'+result[0].qibing
								+',"nubing":'+result[0].nubing
								+'}';
                    util.returnJson(response, {code:'0', msg:'选区成功', data:data});
                }
				else{
                    util.returnJson(response, errCode.noUserAtTheServer);
				}
                // 释放连接
                connection.release();
            });
        });
    },
	//注册区<查、增>
    registerServer: function (request, response, next) {
        pool.getConnection(function(err, connection) {
			connection.query(sqlMapping.selectServer, [request.body.account_id, request.body.server_id], function(err, result) {
                if(err) console.log(err);
				if(result && result.length > 0) {
                    util.returnJson(response, errCode.theServerUserHaved);
					// 释放连接
					connection.release();
                }
				else{
                    connection.query(sqlMapping.registerServer, [request.body.account_id, request.body.server_id, request.body.nickname], function(err, result) {
						if(err) console.log(err);
						if(result && result.affectedRows > 0) {
							console.log(result);
							util.returnJson(response, {code:'0', msg:'成功注册新服'});
						}
						else{
							if(err && err.code == "ER_DUP_ENTRY"){
								util.returnJson(response, errCode.nicknameExist);
								console.log(errCode.nicknameExist);
							}
							else{
								util.returnJson(response, errCode.databaseError);
								console.log(errCode.databaseError);
							}
						}
						// 释放连接
						connection.release();
					});
				}
            });
        });
    }
};
