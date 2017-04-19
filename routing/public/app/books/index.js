module.exports = function (app) {
  require('./AddBookController')(app);
  require('./BooksController')(app);
  require('./EditBookController')(app);
};