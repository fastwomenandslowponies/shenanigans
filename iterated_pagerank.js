var iterated_pagerank = function(A, d, iterations){
  var p = [], L = [], m = A.length; for(var i = 0; i < m; i++){
    p[i] = 0.5, L[i] = 0; for(var j = 0; j < m; j++) if(i != j && A[i][j] > 0) L[i]++;
  }
  
  for(var k = 0; k < iterations; k++){
    var p_new = []; for(var i = 0; i < m; i++){
      p_new[i] = 0.5*(1 - d); for(var j = 0; j < m; j++) if(i != j && A[i][j] > 0) p_new[i] += d*p[j]/L[j];
    }
  
    p = p_new;
  }
  
  return p;
};
