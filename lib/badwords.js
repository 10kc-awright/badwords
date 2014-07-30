var detector = (function() {
  function Filter(options) {
    options = options || {};
    this.list = require('./lang.json').words;
    this.placeHolder = options.placeholder || '*';
    this.Factory = Filter;
  }

  Filter.prototype.isProfane = function isProfane(string) {
    for (var i = 0; i < this.list.length; i++) {
      var words = string.split(' ');
      for (var j = 0; j < words.length; j++) {
        if (words[j].toLowerCase().replace(/\*|\+|\-|\./g, '') === this.list[i].toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  };

  Filter.prototype.replaceWord = function replaceWord(string) {
    return string.replace(/\*|\+|\-|\./g, '').replace(/\w/g, '*');
  };

  Filter.prototype.clean = function clean(string) {
    return string.split(' ').map(function(word) {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }.bind(this)).join(' ');
  };

  Filter.prototype.addWords = function addWords(words) {
    words = (words instanceof Array) ? words : [words];
    this.list = this.list.concat(words);
  };
  return Filter;
})();

String.prototype.clean = function clean() {
  var filter = new detector();
  return filter.clean(this);
};

module.exports = new detector();