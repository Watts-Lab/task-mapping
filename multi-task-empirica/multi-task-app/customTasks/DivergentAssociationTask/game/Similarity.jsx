import React from "react";

export default function Similarity(words) {
  var uniques = [];
  const min = 7;
  for (var i = 0; i < words.length; i++) {
    valid = this.validate(words[i]);
    if (uniques.includes(valid)) {
      uniques.concat(uniques);
    }
  }
  if (uniques.length >= min) {
    subset = uniques.slice(0, min);
  } else {
    return None;
  }
  var distance = [];
  for (var x = 0; x < subset.length - 1; x++) {
    for (var y = 1; y < subset.length; y++) {
      dist = this.distance(subset[x], subset[y]);
      distances.concat(dist);
    }
  }
  var sum = 0;
  for (var i = 0; i < distance.length; i++) {
    sum += distance[i];
  }
  return (sum / distance.length) * 100;

  function distance(A, B) {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;
    for (i = 0; i < A.length; i++) {
      dotproduct += A[i] * B[i];
      mA += A[i] * A[i];
      mB += B[i] * B[i];
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = dotproduct / (mA * mB);
    return similarity;
  }

  function validate(word) {
    clean = word
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();
    if (clean.length <= 1) {
      return None;
    }
    candidates = [];
    if (clean.includes(" ")) {
      candidates.append.replace(/\s/g, "");
    } else {
      candidates.append(clean);
      if (clean.includes("-")) {
        clean.replace(/-/g, "");
        candidates.append(clean);
      }
    }
    for (var i = 0; i < candidates.length; i++) {
      if (candidates.contains(candidates.get(i))) {
        return candidates.get(i);
      }
    }
    return None;
  }
}
