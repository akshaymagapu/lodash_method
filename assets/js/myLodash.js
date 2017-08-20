 (function(window, document) {
     'use strict';

     // attach myLibrary as a property of window
     var myLodash = window.myLibrary || (window.myLodash = {});

     function sample(input) {
         if (input !== undefined && input !== null) {
             let isArray = Array.isArray(input) ? arrayRandom(input) : objectRandom(input);
             return isArray;
         } else {
             return undefined;
         }
     }

     function arrayRandom(input) {
         return input[Math.floor(Math.random() * input.length)];
     }

     function objectRandom(input) {
         if (typeof input === 'object' || typeof input === 'function') {
             let keys = Object.keys(input)
             return input[keys[keys.length * Math.random() << 0]];
         } else {
             return undefined;
         }
     }

     function sampleSize(input, number) {
         let sampleSizeData = [];
         if (input !== undefined && input !== null) {
             for (let i = 1; i <= number; i++) {
                 let isArray = Array.isArray(input) ? arrayRandom(input) : objectRandom(input);
                 sampleSizeData.push(isArray);
             }
             return sampleSizeData;
         } else {
             return undefined;
         }
     }

     function size(collection) {
         if (collection !== undefined && collection !== null) {
             let isArray = Array.isArray(collection) ? collection.length : getLength(collection);
             return isArray;
         } else {
             return undefined;
         }
     }

     function getLength(collection) {
         if (typeof collection === 'object' || typeof collection === 'function') {
             return Object.keys(collection).length;
         } else if (typeof collection === 'string') {
             return collection.length;
         } else {
             return undefined;
         }
     }

     function arrayShuffle(input) {
         var currentIndex = input.length,
             temporaryValue, randomIndex;

         // While there remain elements to shuffle...
         while (0 !== currentIndex) {

             // Pick a remaining element...
             randomIndex = Math.floor(Math.random() * currentIndex);
             currentIndex -= 1;

             // And swap it with the current element.
             temporaryValue = input[currentIndex];
             input[currentIndex] = input[randomIndex];
             input[randomIndex] = temporaryValue;
         }

         return input;
     }

     function objectShuffle(input) {
         if (typeof input === 'object') {
             let tempArray = [];
             Object.keys(input).forEach((key) => {
                 tempArray.push(input[key]);
             })
             return arrayShuffle(tempArray);
         } else {
             return undefined;
         }
     }

     function shuffle(input) {
         if (input !== undefined && input !== null) {
             let isArray = Array.isArray(input) ? arrayShuffle(input) : objectShuffle(input);
             return isArray;
         } else {
             return undefined;
         }
     }

     function arrayIncludes(input, value, index) {
         if (value !== undefined) {
             let found = false;
             for (let i = (index) ? index : 0; i < input.length; i++) {
                 if (input[i] === value) {
                     found = true;
                 }
             }
             return found;
         } else {
             return undefined;
         }
     }

     function objectIncludes(input, value, index) {
         if (typeof input === 'object') {
             let tempArray = [];
             Object.keys(input).forEach((key) => {
                 tempArray.push(input[key]);
             })
             return arrayIncludes(tempArray, value, index);
         } else if (typeof input === 'string') {
             return input.includes(value);
         } else {
             return undefined;
         }
     }

     function includes(input, value, index) {
         if (input !== undefined && input !== null) {
             let isArray = Array.isArray(input) ? arrayIncludes(input, value, index) : objectIncludes(input, value, index);
             return isArray;
         } else {
             return undefined;
         }
     }

     // END API

     // publish external API by extending myLibrary
     function publishExternalAPI(myLodash) {
         angular.extend(myLodash, {
             'Sample': sample,
             'Samplesize': sampleSize,
             'Size': size,
             'Shuffle': shuffle,
             'Includes': includes
         });
     }


     publishExternalAPI(myLodash);

 })(window, document);