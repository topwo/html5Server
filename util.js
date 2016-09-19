/**
 * Created by fujunou on 2015/3/6.
 */

module.exports = {
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
	// 向前台返回JSON方法的简单封装
	returnJson: function (response, return_json) {
		response.json(return_json);
	}
}