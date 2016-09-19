// dao/userSqlMapping.js
// CRUD SQL语句
var sqlMapping = {
	//Account
	insertAccount:'insert into account(username, password) values(?,?)',
	selectAccount:'select id from account where username=? and password=?',
	selectServer:'select * from user where account_id=? and server_id=?',
	registerServer:'insert into user(account_id, server_id, nickname) values(?,?,?)',
	update:'update user set username=?, password=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
};
 
module.exports = sqlMapping;