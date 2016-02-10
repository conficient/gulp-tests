/// <reference path="../typings/main.d.ts" />

import myLib = require("../src/myFile");
import mocha = require('mocha');
import {expect } from 'chai';

describe("Simple test", ()=>{
    it("returns correct response", ()=>{
        var c = new myLib.MyTest();
        
        expect(c.SayHello("test")).to.equal("Hello test");
    })
})