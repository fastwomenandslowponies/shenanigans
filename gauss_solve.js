 var gauss_solve = function(A){
  var x = [], m = A.length, n = A[0].length;
	for(var k = 0; k < m; k++){
		var i_max = Number.NEGATIVE_INFINITY, i_max_val = Number.NEGATIVE_INFINITY; for(var i = k; i < m; i++)
			if(Math.abs(A[i][k]) > i_max_val) i_max = i, i_max_val = Math.abs(A[i][k]);
		var k_row = A[k]; A[k] = A[i_max]; A[i_max] = k_row;
		for(var i = k + 1; i < m; i++){
			var coeff = (A[i][k]/A[k][k]);
			for(var j = k; j < n; j++) A[i][j] -= coeff*A[k][j];
			A[i][k] = 0;
		}
	}

	for(var i = m - 1; i >= 0; i--){
		x[i] = A[i][m]; for(var j = i + 1; j < m; j++) x[i] -= A[i][j]*x[j];
		x[i] /= A[i][i];
	}

	return x;
 };
 
