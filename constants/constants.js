const regularLinkRegExp = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;
const regularLatinLettersRegExp = /^[a-zA-Z0-9\s\S]+$/;
const regularCyrilicLettersRegExp = /^[а-яА-яёЁ0-9\s\S]+$/;
const regularEmailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
  regularLinkRegExp,
  regularLatinLettersRegExp,
  regularCyrilicLettersRegExp,
  regularEmailRegExp,
};
