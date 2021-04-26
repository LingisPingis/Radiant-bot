function withCommas(number) {
    var parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  
  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  
  module.exports = {
    withCommas,
    capitalize
  };