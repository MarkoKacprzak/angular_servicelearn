module.exports = function (app) {
  require('./badgeService')(app);
  require('./constantService')(app);
  require('./dataService')(app);
  require('./loggerService')(app);
};
