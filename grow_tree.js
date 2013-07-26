var WEATHER = [
	['outlook', 'temperature', 'humidity', 'wind', 'play'],
	['sunny', 'hot', 'high', 'false', 'no'],
	['sunny', 'hot', 'high', 'true', 'no'],
	['overcast', 'hot', 'high', 'false', 'yes'],
	['rainy', 'mild', 'high', 'false', 'yes'],
	['rainy', 'cool', 'normal', 'false', 'yes'],
	['rainy', 'cool', 'normal', 'true', 'no'],
	['overcast', 'cool', 'normal', 'true', 'yes'],
	['sunny', 'mild', 'high', 'false', 'no'],
	['sunny', 'cool', 'normal', 'false', 'yes'],
	['rainy', 'mild', 'normal', 'false', 'yes'],
	['sunny', 'mild', 'normal', 'true', 'yes'],
	['overcast', 'mild', 'high', 'true', 'yes'],
	['overcast', 'hot', 'normal', 'false', 'yes'],
	['rainy', 'mild', 'high', 'true', 'no']];

var attribute_frequency = function(data, index){
	var ret = {}, m = data.length; for(var i = 1; i < m; i++) if(ret[data[i][index]] == undefined)
		ret[data[i][index]] = 1; else ret[data[i][index]]++;
	return ret;
};

var attribute_entropy = function(data, index){
	var f = attribute_frequency(data, index), m = data.length - 1;
	var ret = 0; for(var key in f) ret += (-f[key]/m)*(Math.log(f[key]/m)/Math.LN2);
	return ret;
};

var gain_ratio = function(data, index, target){
	var f = attribute_frequency(data, index), m = data.length - 1;
	var split_entropy = 0; for(var key in f) split_entropy +=
		(f[key]/m)*attribute_entropy(data.filter(function(row) { return row[index] == key }), target);
	var intrinsic_information = 0; for(var key in f) intrinsic_information += (-f[key]/m)*(Math.log(f[key]/m)/Math.LN2);
	return (attribute_entropy(data, target) - split_entropy)/intrinsic_information;
};

var split_attribute = function(data, index){
	var ret = {}, f = attribute_frequency(data, index);
	for(var key in f) ret[key] = data.filter(function(row) { return row[index] == key });
	return ret;
}

var grow_tree = function(data, target){
	var m = data.length - 1, n = data[0].length;
	var r_max = 0, i_max = 0; for(var i = 0; i < n; i++) if(i != target){
		var r = gain_ratio(data, i, target);
		if(r > r_max) i_max = i, r_max = r;
	}
};
