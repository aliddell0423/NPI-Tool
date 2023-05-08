export function findMostSimilarString(target, arr) {
  let minDistance = Infinity;
  let mostSimilar = null;
  arr.forEach(str => {
    let distance = levenshteinDistance(target, str);
    if (distance < minDistance) {
      minDistance = distance;
      mostSimilar = str;
    }
  });
  return mostSimilar;
}

function levenshteinDistance(a, b) {
  const m = a.length;
  const n = b.length;

  // Create a matrix to store the length of the LCS of the prefixes
  // of a and b
  const lcsMatrix = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

  // Fill the matrix using the LCS algorithm
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1;
      } else {
        lcsMatrix[i][j] = Math.max(lcsMatrix[i - 1][j], lcsMatrix[i][j - 1]);
      }
    }
  }

  // Calculate the distance using the formula:
  // distance = (length of a) + (length of b) - 2 * (length of LCS of a and b)
  return m + n - 2 * lcsMatrix[m][n];
}
