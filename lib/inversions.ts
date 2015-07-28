/**
 * Created by vincent on 7/27/15.
 */

module Algorithms {

    /*
     Sorts a list of numbers and returns the number of inversions
     */
    export function countInversions (full:Array<number>):number {
        "use strict";
        var leftInversions:number  = 0,
            rightInversions:number = 0,
            splitInversions:number = 0,
            halfCount:number       = Math.floor(full.length / 2);

        // base case
        if (full.length <= 1) {
            return 0;
        }

        // sort left half of array and get inversions on that half
        var left:Array<number> = [];
        for (var i:number = 0; i < halfCount; i++) {
            left.push(full[i]);
        }
        leftInversions = countInversions(left);

        // sort right half of array and get inversions on that half
        var right:Array<number> = [];
        for (var j:number = 0; j < halfCount; j++) {
            right.push(full[halfCount + j]);
        }
        rightInversions = countInversions(right);

        // merge both half arrays and get split inversions
        splitInversions = mergeAndCountSplitInversions(full, left, right);

        return leftInversions + rightInversions + splitInversions;
    }

    /*
     Merge two half-arrays into full array and returns the number of split inversions
     */
    function mergeAndCountSplitInversions (full:Array<number>, left:Array<number>, right:Array<number>):number {
        "use strict";
        var splitInversions:number = 0,
            i:number               = 0,
            j:number               = 0,
            fc:number              = full.length,
            lc:number              = left.length,
            rc:number              = right.length;


        for (var k:number = 0; k < fc; k++) {

            // left array is exhausted
            if (i === lc) {
                // add remainder of right array onto full array
                for (var n:number = j; n < rc || k < fc; n++, k++) {
                    full[k] = right[n];
                }
                break;
            }

            // right array is exhausted
            if (j === rc) {
                // add remainder of left array onto full array
                for (var m:number = i; m < lc || k < fc; m++, k++) {
                    full[k] = left[m];
                }
                break;
            }

            if (left[i] < right[j]) {
                full[k] = left[i];
                i++;
            } else {
                full[k] = right[j];

                // increment number of split inversions by the number of remaining numbers in the left array
                splitInversions += left.length - i;

                j++;
            }
        }

        return splitInversions;
    }
}