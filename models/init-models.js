var DataTypes = require("sequelize").DataTypes;
var _apiary stations = require("./apiary stations");
var _apiary_setup_components = require("./apiary_setup_components");
var _catch reports = require("./catch reports");
var _consultancy_items = require("./consultancy_items");
var _deliveryaddress = require("./deliveryaddress");
var _employee nok = require("./employee nok");
var _employees = require("./employees");
var _equipments/tools = require("./equipments/tools");
var _hives = require("./hives");
var _honey harvest = require("./honey harvest");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _pollination_services = require("./pollination_services");
var _product colors = require("./product colors");
var _product images = require("./product images");
var _products = require("./products");
var _review images = require("./review images");
var _reviews = require("./reviews");
var _services = require("./services");
var _supplies = require("./supplies");
var _supply_provision_items = require("./supply_provision_items");
var _swarm hunters = require("./swarm hunters");
var _token = require("./token");
var _user orders = require("./user orders");
var _users = require("./users");

function initModels(sequelize) {
  var apiary stations = _apiary stations(sequelize, DataTypes);
  var apiary_setup_components = _apiary_setup_components(sequelize, DataTypes);
  var catch reports = _catch reports(sequelize, DataTypes);
  var consultancy_items = _consultancy_items(sequelize, DataTypes);
  var deliveryaddress = _deliveryaddress(sequelize, DataTypes);
  var employee nok = _employee nok(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var equipments/tools = _equipments/tools(sequelize, DataTypes);
  var hives = _hives(sequelize, DataTypes);
  var honey harvest = _honey harvest(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var pollination_services = _pollination_services(sequelize, DataTypes);
  var product colors = _product colors(sequelize, DataTypes);
  var product images = _product images(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var review images = _review images(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var supplies = _supplies(sequelize, DataTypes);
  var supply_provision_items = _supply_provision_items(sequelize, DataTypes);
  var swarm hunters = _swarm hunters(sequelize, DataTypes);
  var token = _token(sequelize, DataTypes);
  var user orders = _user orders(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  honey harvest.belongsTo(apiary stations, { as: "station", foreignKey: "station_id"});
  apiary stations.hasMany(honey harvest, { as: "honey harvests", foreignKey: "station_id"});
  apiary stations.belongsTo(employees, { as: "supervisor(int)_employee", foreignKey: "supervisor(int)"});
  employees.hasMany(apiary stations, { as: "apiary stations", foreignKey: "supervisor(int)"});
  apiary stations.belongsTo(employees, { as: "supervisor(ext)_employee", foreignKey: "supervisor(ext)"});
  employees.hasMany(apiary stations, { as: "supervisor(ext)_apiary stations", foreignKey: "supervisor(ext)"});
  catch reports.belongsTo(employees, { as: "assigned_supervisor_employee", foreignKey: "assigned_supervisor"});
  employees.hasMany(catch reports, { as: "catch reports", foreignKey: "assigned_supervisor"});
  employee nok.belongsTo(employees, { as: "emp", foreignKey: "emp_id"});
  employees.hasMany(employee nok, { as: "employee noks", foreignKey: "emp_id"});
  swarm hunters.belongsTo(employees, { as: "assigned_supervisor_employee", foreignKey: "assigned_supervisor"});
  employees.hasMany(swarm hunters, { as: "swarm hunters", foreignKey: "assigned_supervisor"});
  deliveryaddress.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(deliveryaddress, { as: "deliveryaddresses", foreignKey: "order_id"});
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id"});
  user orders.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(user orders, { as: "user orders", foreignKey: "order_id"});
  product colors.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product colors, { as: "product colors", foreignKey: "product_id"});
  product images.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product images, { as: "product images", foreignKey: "product_id"});
  reviews.belongsTo(products, { as: "product_product", foreignKey: "product"});
  products.hasMany(reviews, { as: "reviews", foreignKey: "product"});
  review images.belongsTo(reviews, { as: "review", foreignKey: "review_id"});
  reviews.hasMany(review images, { as: "review images", foreignKey: "review_id"});
  apiary_setup_components.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(apiary_setup_components, { as: "apiary_setup_components", foreignKey: "service_id"});
  consultancy_items.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(consultancy_items, { as: "consultancy_items", foreignKey: "service_id"});
  pollination_services.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(pollination_services, { as: "pollination_services", foreignKey: "service_id"});
  supply_provision_items.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(supply_provision_items, { as: "supply_provision_items", foreignKey: "service_id"});
  catch reports.belongsTo(swarm hunters, { as: "hunter", foreignKey: "hunter_id"});
  swarm hunters.hasMany(catch reports, { as: "catch reports", foreignKey: "hunter_id"});
  hives.belongsTo(swarm hunters, { as: "assigned_hunter_swarm hunter", foreignKey: "assigned_hunter"});
  swarm hunters.hasMany(hives, { as: "hives", foreignKey: "assigned_hunter"});
  orders.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(orders, { as: "orders", foreignKey: "user"});
  products.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(products, { as: "products", foreignKey: "user"});
  reviews.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user"});
  token.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(token, { as: "tokens", foreignKey: "user"});

  return {
    apiary stations,
    apiary_setup_components,
    catch reports,
    consultancy_items,
    deliveryaddress,
    employee nok,
    employees,
    equipments/tools,
    hives,
    honey harvest,
    order_items,
    orders,
    pollination_services,
    product colors,
    product images,
    products,
    review images,
    reviews,
    services,
    supplies,
    supply_provision_items,
    swarm hunters,
    token,
    user orders,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
