const validateUrl = (url) => {
  const regex = /^https?:\/\/[^\s]+$/;
  return regex.test(url);
};

module.exports = { validateUrl };
