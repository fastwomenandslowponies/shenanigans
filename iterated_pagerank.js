var iterated_pagerank = function(A, d, iterations){
  var p = [], L = [], m = A.length; for(var i = 0; i < m; i++){
		p[i] = 1.0, L[i] = 0; for(var j = 0; j < m; j++) if(A[i][j] > 0) L[i]++;
	}
	
	for(var k = 0; k < iterations; k++){
		var p_new = []; for(var i = 0; i < m; i++) p_new[i] = (1 - d);
		for(var i = 0; i < m; i++) for(var j = 0; j < m; j++) if(A[i][j] > 0) p_new[j] += d*p[i]/L[i];
		p = p_new;
	}

  return p;
};
