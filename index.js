"use strict";

var _ = require('underscore');
var type_dispatch = require('type_dispatch');
module.exports = type_catch;

function type_catch(args){
	/*jshint validthis:true*/
	if( ! (this instanceof type_catch)){
		return new type_catch(arguments);
	}
	this.fn = args[0];
	this.catch = defineCatch;
	this.catcher = null;
	this.finally = defineFinally;
	this.finallyer = null;
	this.trier = trier;
}

function trier(){
	/*jshint validthis:true*/
	var tryRetval;
	try{
		tryRetval = this.fn.apply(arguments);
	}
	catch(e){
		if(this.catcher){
			this.catcher([typeof(e)]);
		}
	}
	if(this.finallyer){
		return _.reduce(this.finallyer,function(memo,fn){
			return fn(memo);
		},tryRetval);
	}
	return this;
}

function defineCatch(type,fn){
	/*jshint validthis:true*/
	if(this.catcher === null){
		this.catcher = type_dispatch();
	} 
	this.catcher.when([type],fn);
	return this;
}

function defineFinally(fn){
	/*jshint validthis:true*/
	if(this.finallyer === null){
		this.finallyer = [];
	} 
	this.finallyer.push(fn);
	return this;
}
