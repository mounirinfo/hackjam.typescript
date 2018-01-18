// # Lodash / Underscore in TypeScript
// Let's write our own version of Lodash in TypeScript!
// In this lesson we're going to learn about a couple of Typescript concepts (or
// type systems in general). Specifically, this is what you'll know as soon as
// all tests pass:

// 1. How to use interfaces.
// 2. How to use generic types (<T>).
// 3. How to use default and optional parameters.

// ### chunk
// chunk creates an array of elements split into groups the length of size. If
// array can't be split evenly, the final chunk will be the remaining elements.
// Two-dimensional arrays can be expressed using the T[][].
function chunk<T>(collection: Array<T>, size: number = 1): T[][] {

  // const result: T[][] = new Array(Math.ceil(collection.length / size));

  // for (let i = 0; i < result.length; i++) {
  //   console.log(i*size)
  //   result[i] = collection.slice(i * size, (i+1) *(size));
  //   console.log(result);
    
  // }
  // return result;
  return collection
    .reduce((acc, item, i)=>[...acc, (collection.slice(i * size, (i+1) *(size)))], [])
    .filter(item => item.length > 0);
}
const res = chunk([1, 0,2,3,4, 56, 57], 3).reduce((acc, item) => [...acc, item.length], [])
console.log(res);

const double = ([first, ...tail]:number[]) => {
  if(tail.length === 0) return [];
  return [first*2, ...double(tail)];
}

 const arr: number[] = [1,2,3, 12, 13,15];
 arr[1];
 const [first, ...tail] = arr;
 console.log(double(arr))
 
 const arr2: number[] = [...arr, ...arr]
 console.log(arr2);
 



// ### compact
// compact accepts an array as an argument and returns an array.
// The returned array does not contain falsey values (such as 0, null,
// undefined, NaN).
export function compact(collection: Array<any>): Array<any> {
  //return collection.filter(v => !!v);
  return collection.filter(Boolean);
}

// ### head
// head takes in an array and returns its first item.
export function head<T>([first]: T[]): T {
  return first
}


// ### initial
// initial returns a slice of the passed in array, excluding its last item.
export function initial<T>(collection: Array<T>): Array<T> {
  return collection.slice(0, -1);
}

// ### last
// last takes in an array and returns its last item.
export function last<T>(collection: Array<T>): T {
  return collection[collection.length - 1];
}

// ### drop
// drop takes in two arguments, an array and a count, and returns an array that
// has count items removed from the beginning.
// The count should be optional and default to 1.
export function drop<T>(collection: Array<T>, count: number = 1): Array<T> {
  return collection.slice(count);
}

// ### dropRight
// dropRight works like drop, except that it removes items from the end of the 
// passed in array.
export function dropRight<T>(collection: Array<T>, count: number = 1): Array<T> {
  return collection.slice(0, collection.length - count);
}

interface DropWhilePredicate<T> {
  (value?: T, index?: number, collection?: Array<T>): boolean;
}

// ### dropWhile
// dropWhile works similar to drop. It removes items from the beginning of the
// array until the predicate returns false.
export function dropWhile<T>(collection: Array<T>, predicate: DropWhilePredicate<T>): Array<T> {
  let index = 0;
  while (index < collection.length && predicate(collection[index], index, collection)) {
    index++;
  }
  return collection.slice(index);
}

// ### dropRightWhile
// dropRightWhile works similar to dropWhile, except that it iterates over the
// passed in array in reversed order.
export function dropRightWhile<T>(collection: Array<T>, predicate: DropWhilePredicate<T>): Array<T> {
  let index = collection.length - 1;
  while (index >= 0 && predicate(collection[index], index, collection)) {
    index--;
  }
  return collection.slice(0, index + 1);
}

// ### fill
// fill mutates the passed in array. It fills collection[start] up to
// collection[end] with a specified value.
export function fill<T>(collection: Array<T>, value: T, start: number = 0, end: number = collection.length): Array<T> {
  for (let i = start; i < end; i++) {
    collection[i] = value;
  }
  return collection;
}

// Here we define an interface for the predicate used in the findIndex function.
export interface FindIndexPredicate<T> {
  (value?: T, index?: number, collection?: Array<T>): boolean;
}

// ### findIndex
// findIndex accepts three arguments:
// 1. The array to be traversed.
// 2. An iteratee function.
// 3. The index from where we should start traversing the array.
export function findIndex<T>(collection: Array<T>, predicate: FindIndexPredicate<T>, fromIndex: number = 0): number {
  for (let i = fromIndex; i < collection.length; i++) {
    if (predicate(collection[i], i, collection)) {
      return i;
    }
  }
  return -1;
}
// ### findLastIndex
// findLastIndex works line findIndex, but traverses the collection backwards.
// The third argument is the index from where we start traversing the array.
export function findLastIndex<T>(collection: Array<T>, predicate: FindIndexPredicate<T>, fromIndex: number = collection.length - 1): number {
  for (let i = fromIndex; i > 0; i--) {
    if (predicate(collection[i], i, collection)) {
      return i;
    }
  }
  return -1;
}

// ### nth
// Given an array, should return the nth item of the passed in array.
export function nth<T>(array: Array<T>, n: number = 0): T {
  return array[n];
}

// ### zip
export function zip<T>(...arrays: Array<T>[]): T[][] {
  const lengths = arrays.map(({ length }) => length);
  const size = Math.max(...lengths);
  const results = [];

  for (let i = 0; i < size; i++) {
    results[i] = [];
    for (let j = 0; j < arrays.length; j++) {
      results[i].push(arrays[j][i]);
    }
  }

  return results;
}
