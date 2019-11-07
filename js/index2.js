(function() {
    "use strict";
  
    const PROFILE_LIST = ["arsene", "kidd", "carmen", "zorro", "goemon",
                          "johanna", "necronomicon", "milady"];
    let timer = null;
  
    window.addEventListener("load", initialize);
  
    /**
     *  Start of main function, sets up the initial event listeners
     */
    function initialize() {
      
    }
  
    /* ------------------------------ Helper Functions  ------------------------------ */
  
    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} id - element ID
     * @returns {object} DOM object associated with id.
     */
    function $(id) {
      return document.getElementById(id);
    }
  
    /**
     * Returns the first element that matches the given CSS selector.
     * @param {string} query - CSS query selector.
     * @returns {object[]} array of DOM objects matching the query.
     */
    function qs(query) {
      return document.querySelector(query);
    }
  
    /**
     * Returns the array of elements that match the given CSS selector.
     * @param {string} query - CSS query selector
     * @returns {object[]} array of DOM objects matching the query.
     */
    function qsa(query) {
      return document.querySelectorAll(query);
    }
  
  })();