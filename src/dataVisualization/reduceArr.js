import _ from 'lodash';
function reduceArr(arr, size) {
    if (arr.length < size + 1) {
        return arr
    } else {
        arr = _.map(_.chunk(arr, 2), (subArr) => {
            // subarr = [1,2]
            return _.reduce(subArr, (sum, n) => {
                return sum + n
            }, 0)
        })
        return reduceArr(arr, size);
    }
}

export default reduceArr;