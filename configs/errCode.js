//错误码
var errCode = {
	registerUserExist:					{code:100001, msg:"用户已存在"},
	loginUserOrPassworadError:			{code:100002, msg:"用户名或密码错误"},
	noUserAtTheServer:					{code:100003, msg:"本服没有该用户"},
	theServerUserHaved:					{code:100004, msg:"本服已有账号"},
	nicknameExist:						{code:100005, msg:"昵称已存在"},
	databaseError:						{code:200001, msg:"服务器数据库错误"}
}

module.exports = errCode;