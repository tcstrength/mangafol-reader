export const urlify = (text) => {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  var regX = /(<([^>]+)>)/ig;
  text = text.replace(regX, "");

  return text.replace(urlRegex, function (url) {
    return '<a target="_blank" href="' + url + '">' + url + '</a>';
  })
}