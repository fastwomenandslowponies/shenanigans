var iterated_pagerank = function(A, d, iterations){
  var p = [], L = [], m = A.length, N = 2.0; for(var i = 0; i < m; i++){
    p[i] = 1.0/N, L[i] = 0; for(var j = 0; j < m; j++) if(i != j && A[i][j] < 0) L[i]++;
  }
  
  for(var k = 0; k < iterations; k++) for(var i = 0; i < m; i++){
    p[i] = (1 - d)/N; for(var j = 0; j < m; j++) if(i != j && A[i][j] > 0) p[i] += d*p[j]/L[j];
  }
  
  return p;
};
