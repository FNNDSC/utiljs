/**
 * This module implements frequently used JavaScript utility functions.
 */

// define a new module
define([], function() {

  /**
   * Provide a namespace for the utility module
   *
   * @namespace
   */
  var utiljs = utiljs || {};

    /**
     * Convert ArrayBuffer to String
     *
     * @function
     * @param {Array} input ArrayBuffer.
     * @return {string} the resulting string.
     */
     utiljs.ab2str = function(buf) {
       var bytes = new Uint8Array(buf);
       var str = String.fromCharCode(bytes[0]);

       for (var i=1; i<bytes.byteLength; i++) {
           str += String.fromCharCode(bytes[i]);
       }
       return str;
     };

    /**
     * Convert String to ArrayBuffer
     *
     * @function
     * @param {String} input string.
     * @return {Array} the resulting array.
     */
     utiljs.str2ab = function(str) {
      // 1 byte for each char
      var buf = new ArrayBuffer(str.length);
      var bufView = new Uint8Array(buf);

      for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    };

    /**
     * Create a Blob object containing a JPG image from a data URI.
     *
     * @function
     * @param {String} a data URI such as the one returned by the toDataURL() of
     * a canvas element
     * @return {Object} Blob object containing the JPG image
     */
     utiljs.dataURItoJPGBlob = function(dataURI) {
       var binary = atob(dataURI.split(',')[1]);
       var array = [];

       for(var i = 0; i < binary.length; i++) {
         array.push(binary.charCodeAt(i));
       }
       return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
     };

    /**
     * Make an Ajax request to get a Blob from a url.
     *
     * @function
     * @param {String} a url
     * @param {Function} callback whose argument is the Blob object
     */
     utiljs.urlToBlob = function(url, callback) {
       var xhr = new XMLHttpRequest();

       xhr.open('GET', url);
       xhr.responseType = 'blob';//force the HTTP response, response-type header to be blob
       xhr.onload = function() {
           callback(xhr.response);//xhr.response is now a blob object
       };
       xhr.send();
     };

    /**
     * Repaint the document
     * @function
     */
     utiljs.documentRepaint = function() {
      var ev = document.createEvent('Event');
      ev.initEvent('resize', true, true);
      window.dispatchEvent(ev);
    };

    /**
     * Return true if the string str ends with any of the
     * specified suffixes in arrayOfStr otherwise return false.
     *
     * @function
     * @param {String} input string
     * @param {Array} array of string suffixes
     * @return {boolean}
     */
     utiljs.strEndsWith = function(str, arrayOfStr) {
      var index;

      for (var i=0; i<arrayOfStr.length; i++) {
        index = str.lastIndexOf(arrayOfStr[i]);
        if ((index !== -1) && ((str.length-index) === arrayOfStr[i].length)) {
          return true;
        }
      }
      return false;
    };

    /**
     * Sort an array of objects with a string property prop.
     * The ordering is based on that property.
     *
     * @function
     * @param {Array} array of string suffixes
     * @param {String} the objects' ordering property
     * @return {Array} Sorted array
     */
     utiljs.sortObjArr = function(objArr, prop) {

       return objArr.sort(function(o1, o2) {
         var values = [o1[prop], o2[prop]].sort();

         if (values[0] === values[1]) {
           return 0;
         } else if (values[0] === o1[prop]) {
           return -1;
         } else {
           return 1;
         }
       });
     };

    /**
     * Split a file or folder path into an array
     *
     * @function
     * @param {String} input path.
     * @return {Array} the resulting array.
     */
     utiljs.path2array = function(path) {
      var entries = path.split('/');
      // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
      if (entries[0] === '.' || entries[0] === '') {
        entries = entries.slice(1);
      }
      return entries;
    };

  return utiljs;
});
