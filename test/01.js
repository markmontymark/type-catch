"use strict";

/*global describe*/
/*global it*/

var type_catch = require('..');
var assert = require("assert");

var i = 0;
describe('type-catch', function(){
	describe('#finally()', function(){
		it('should call finally fn', function(){
			// synchronous
			var retval = type_catch( function(){
				return null.call();
			}).finally(function(tryRetval){
				assert(true);
				var retvalFromFinally = [tryRetval,"this is from finally"].join('');
				return retvalFromFinally;
			}).trier();
			assert.equal(retval,"this is from finally");
		});

		it("should call all finally's", function(){
			// asynchronous
			type_catch( function(){
				return 1/i;
			}).finally(function(){
				
			}).finally(function(){
				assert(true);
			}).
			trier();
		});
	});
});


