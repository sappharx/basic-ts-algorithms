/**
 * Created by vincent on 7/27/15.
 */
var Algorithms;
(function (Algorithms) {
    /**
     * Sorts a list of numbers and returns the number of inversions
     * @param {Array<number>} full - The array to count the inversions on
     * @returns {number} The number of inversions in full
     */
    function countInversions(full) {
        "use strict";
        var leftInversions = 0, rightInversions = 0, splitInversions = 0, halfCount = Math.floor(full.length / 2);
        // base case
        if (full.length <= 1) {
            return 0;
        }
        // sort left half of array and get inversions on that half
        var left = [];
        for (var i = 0; i < halfCount; i++) {
            left.push(full[i]);
        }
        leftInversions = countInversions(left);
        // sort right half of array and get inversions on that half
        var right = [];
        for (var j = 0; j < halfCount; j++) {
            right.push(full[halfCount + j]);
        }
        rightInversions = countInversions(right);
        // merge both half arrays and get split inversions
        splitInversions = mergeAndCountSplitInversions(full, left, right);
        return leftInversions + rightInversions + splitInversions;
    }
    Algorithms.countInversions = countInversions;
    /**
     * Merges two half-arrays into full array and returns the number of split inversions
     * @param {Array<number>} full - The full array to count inversions on
     * @param {Array<number>} left - The sorted left portion of the original full array
     * @param {Array<number>} right - The sorted right portion of the original full array
     * @returns {number} The number of split inversions encountered by merging the left and right arrays
     */
    function mergeAndCountSplitInversions(full, left, right) {
        "use strict";
        var splitInversions = 0, i = 0, j = 0, fc = full.length, lc = left.length, rc = right.length;
        for (var k = 0; k < fc; k++) {
            // left array is exhausted
            if (i === lc) {
                // add remainder of right array onto full array
                for (var n = j; n < rc || k < fc; n++, k++) {
                    full[k] = right[n];
                }
                break;
            }
            // right array is exhausted
            if (j === rc) {
                // add remainder of left array onto full array
                for (var m = i; m < lc || k < fc; m++, k++) {
                    full[k] = left[m];
                }
                break;
            }
            if (left[i] < right[j]) {
                full[k] = left[i];
                i++;
            }
            else {
                full[k] = right[j];
                // increment number of split inversions by the number of remaining numbers in the left array
                splitInversions += left.length - i;
                j++;
            }
        }
        return splitInversions;
    }
})(Algorithms || (Algorithms = {}));
