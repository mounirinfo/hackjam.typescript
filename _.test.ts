import { expect } from "chai";
import * as sinon from "sinon";
import * as _ from "./_";

describe("_", function () {
  describe("identity", function () {
    it("should return the first argument it receives", function () {
      expect(_.identity<number>(1)).to.be.equal(1);
    });

    context("when called without arguments", function () {
      it("should return undefined ", function () {
        expect(_.identity()).to.be.equal(undefined);
      });
    });
  });

  describe("attempt", function () {
    context("when function throws an error", function () {
      it("should return error", function () {
        const err = new Error();
        const func = sinon.stub().throws(err);
        expect(_.attempt(func)).to.be.equal(err);
      });
    });

    context("when function does not throw an error", function () {
      it("should return result", function () {
        const result = 123;
        const func = sinon.stub().returns(result);
        expect(_.attempt(func)).to.be.equal(result);
      });
    });

    it("should apply function with passed in arguments", function () {
      const func = sinon.spy();
      _.attempt(func, 1, 2, 3);
      sinon.assert.calledWithExactly(func, 1, 2, 3);
    });
  });

  describe("noop", function () {
    it("should return undefined", function () {
      expect(_.noop()).to.be.equal(undefined);
    });

    context("when called with arguments", function () {
      it("should return undefined", function () {
        expect(_.noop(1, 2, 3)).to.be.equal(undefined);
      });
    });
  });

  describe("constant", function () {
    it("should return a function that returns the supplied value", function () {
      expect(_.constant<number>(1)()).to.be.equal(1);
      expect(_.constant<string>("hello")()).to.be.equal("hello");
    });
  });

  describe("chunk", function () {
    it("should split array into groups of size", function () {
      expect(_.chunk(["a", "b", "c", "d"], 2)).to.deep.equal([["a", "b"], ["c", "d"]]);
      expect(_.chunk(["a", "b", "c", "d"], 3)).to.deep.equal([["a", "b", "c"], ["d"]]);
    });

    it("should default to size 1", function () {
      expect(_.chunk(["a", "b", "c"])).to.deep.equal([["a"], ["b"], ["c"]]);
    });
  });

  describe("compact", function () {
    it("should return array with undefined removed", function () {
      expect(_.compact([1, undefined, 2, undefined, 3])).to.deep.equal([1, 2, 3]);
    });

    it("should return array with NaN removed", function () {
      expect(_.compact([1, NaN, 2, NaN, 3])).to.deep.equal([1, 2, 3]);
    });

    it("should return array with null removed", function () {
      expect(_.compact([1, null, 2, null, 3])).to.deep.equal([1, 2, 3]);
    });

    it("should return array with 0 removed", function () {
      expect(_.compact([1, 0, 2, 0, 3])).to.deep.equal([1, 2, 3]);
    });

    it("should return array with undefined, NaN, null, 0 removed", function () {
      expect(_.compact([1, undefined, NaN, null, 0, 2, 3])).to.deep.equal([1, 2, 3]);
    });
  });

  describe("head", function () {
    it("should return the first element of an array", function () {
      expect(_.head([1, 2, 3])).to.be.equal(1);
    });

    it("should return undefined if the array is empty", function () {
      expect(_.head([])).to.be.equal(undefined);
    });
  });

  describe("initial", function () {
    it("should return a slice of array without its last item", function () {
      expect(_.initial<number>([1, 2, 3])).to.deep.equal([1, 2]);
    });
  });

  describe("last", function () {
    it("should return the first element of an array", function () {
      expect(_.last([1, 2, 3])).to.be.equal(3);
    });

    it("should return undefined if the array is empty", function () {
      expect(_.last([])).to.be.equal(undefined);
    });
  });

  describe("drop", function () {
    it("should remove count items from the beginning of passed in array", function () {
      expect(_.drop([1, 2, 3, 4], 2)).to.deep.equal([3, 4]);
    });

    it("should default to one item", function () {
      expect(_.drop([1, 2, 3, 4])).to.deep.equal([2, 3, 4]);
    });
  });

  describe("dropRight", function () {
    it("should remove count items from the end of passed in array", function () {
      expect(_.dropRight([1, 2, 3, 4], 2)).to.deep.equal([1, 2]);
    });

    it("should default to one item", function () {
      expect(_.dropRight([1, 2, 3, 4])).to.deep.equal([1, 2, 3]);
    });
  });

  describe("dropWhile", function () {
    it("should ignore items until predicate returns true", function () {
      expect(_.dropWhile([ 1, 2, 3, 4, 5, 1 ], value => value < 3)).to.deep.equal([ 3, 4, 5, 1 ]);
    });
  });

  describe("dropRightWhile", function () {
    it("should ignore items until predicate returns true in reversed order", function () {
      expect(_.dropRightWhile([ 5, 4, 3, 2, 1 ], value => value < 3)).to.deep.equal([ 5, 4, 3 ]);
    });
  });

  describe("fill", function () {
    it("should fill array slots between start and end with value", function () {
      expect(_.fill<any>([ 4, 6, 8, 10 ], "*", 1, 3)).to.deep.equal([ 4, "*", "*", 10 ]);
    });
  });

  describe("findIndex", function () {
    context("when predicate always returns false", function () {
      it("should return -1", function () {
        expect(_.findIndex([ 4, 6, 8, 10 ], () => false)).to.be.equal(-1);
      });
    });

    context("when predicate returns true", function () {
      it("should return index", function () {
        expect(_.findIndex([ 4, 6, 8, 10 ], value => value === 6)).to.be.equal(1);
      });
    });

    context("when startIndex > index of first match", function () {
      it("should return index of second match", function () {
        expect(_.findIndex([ 4, 6, 6, 8, 10 ], value => value === 6, 2)).to.be.equal(2);
      });
    });
  });

  describe("findLastIndex", function () {
    context("when predicate always returns false", function () {
      it("should return -1", function () {
        expect(_.findLastIndex([ 4, 6, 8, 10 ], () => false)).to.be.equal(-1);
      });
    });

    context("when predicate returns true", function () {
      it("should return index", function () {
        expect(_.findLastIndex([ 4, 6, 8, 10 ], value => value === 6)).to.be.equal(1);
      });
    });

    context("when startIndex > index of first match", function () {
      it("should return index of second match", function () {
        expect(_.findLastIndex([ 4, 6, 6, 8, 10 ], value => value === 6, 1)).to.be.equal(1);
      });
    });
  });

  describe("nth", function () {
    it("should return nth item", function () {
      expect(_.nth<number>([1, 2, 3], 0)).to.be.equal(1);
      expect(_.nth<number>([1, 2, 3], 1)).to.be.equal(2);
      expect(_.nth<number>([1, 2, 3], 2)).to.be.equal(3);
    });

    it("should default to first item", function () {
      expect(_.nth<number>([1, 2, 3])).to.be.equal(1);
    });
  });

  describe("zip", function () {
    it("should group array items", function () {
      // We can also use something called "union types" here.
      expect(_.zip<string | number | boolean>(["a", "b"], [1, 2], [true, false])).to.deep.equal([["a", 1, true], ["b", 2, false]]);
    });
  });

  describe("forEach", function () {
    context("when collection is an array", function () {
      it("should iterate over all items of array", function () {
        const collection = ["first", "second", "third"];
        const iteratee = sinon.spy();
        _.forEach(collection, iteratee);
        sinon.assert.calledWithExactly(iteratee, "first", 0, collection);
        sinon.assert.calledWithExactly(iteratee, "second", 1, collection);
        sinon.assert.calledWithExactly(iteratee, "third", 2, collection);
      });
    });

    context("when collection is an object", function () {
      it("should iterate over all items of object", function () {
        const collection: _.Dictionary<string> = {
          "0": "first",
          "1": "second",
          "2": "third"
        };
        const iteratee = sinon.spy();
        _.forEach(collection, iteratee);
        sinon.assert.calledWithExactly(iteratee, "first", "0", collection);
        sinon.assert.calledWithExactly(iteratee, "second", "1", collection);
        sinon.assert.calledWithExactly(iteratee, "third", "2", collection);
      });
    });
  });
});