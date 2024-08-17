var DataTypes = require("sequelize").DataTypes;
// var _apiary stations = require("./apiary stations");
var _apiary_setup_components = require("./apiary_setup_components");
var _apiary_stations = require("./apiary_stations");
// var _catch reports = require("./catch reports");
var _catch_reports = require("./catch_reports");
var _consultancy_items = require("./consultancy_items");
var _delivery_address = require("./delivery_address");
// var _deliveryaddress = require("./deliveryaddress");
// var _employee nok = require("./employee nok");
var _employee_nok = require("./employee_nok");
var _employees = require("./employees");
var _equipments_tools = require("./equipments_tools");
var _hives = require("./hives");
// var _honey harvest = require("./honey harvest");
var _honey_harvest = require("./honey_harvest");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _pollination_services = require("./pollination_services");
// var _product colors = require("./product colors");
// var _product images = require("./product images");
var _product_colors = require("./product_colors");
var _product_images = require("./product_images");
var _products = require("./products");
// var _review images = require("./review images");
var _review_images = require("./review_images");
var _reviews = require("./reviews");
var _services = require("./services");
var _supplies = require("./supplies");
var _supply_provision_items = require("./supply_provision_items");
// var _swarm hunters = require("./swarm hunters");
var _swarm_hunters = require("./swarm_hunters");
var _token = require("./token");
// var _user orders = require("./user orders");
var _user_orders = require("./user_orders");
var _users = require("./users");

function initModels(sequelize) {
  // var apiary stations = _apiary stations(sequelize, DataTypes);
  var apiary_setup_components = _apiary_setup_components(sequelize, DataTypes);
  var apiary_stations = _apiary_stations(sequelize, DataTypes);
  // var catch reports = _catch reports(sequelize, DataTypes);
  var catch_reports = _catch_reports(sequelize, DataTypes);
  var consultancy_items = _consultancy_items(sequelize, DataTypes);
  var delivery_address = _delivery_address(sequelize, DataTypes);
  // var deliveryaddress = _deliveryaddress(sequelize, DataTypes);
  // var employee nok = _employee nok(sequelize, DataTypes);
  var employee_nok = _employee_nok(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var equipments_tools = _equipments_tools(sequelize, DataTypes);
  var hives = _hives(sequelize, DataTypes);
  // var honey harvest = _honey harvest(sequelize, DataTypes);
  var honey_harvest = _honey_harvest(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var pollination_services = _pollination_services(sequelize, DataTypes);
  // var product colors = _product colors(sequelize, DataTypes);
  // var product images = _product images(sequelize, DataTypes);
  var product_colors = _product_colors(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  // var review images = _review images(sequelize, DataTypes);
  var review_images = _review_images(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var supplies = _supplies(sequelize, DataTypes);
  var supply_provision_items = _supply_provision_items(sequelize, DataTypes);
  // var swarm hunters = _swarm hunters(sequelize, DataTypes);
  var swarm_hunters = _swarm_hunters(sequelize, DataTypes);
  var token = _token(sequelize, DataTypes);
  // var user orders = _user orders(sequelize, DataTypes);
  var user_orders = _user_orders(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  // honey harvest.belongsTo(apiary stations, { as: "station", foreignKey: "station_id"});
  // apiary stations.hasMany(honey harvest, { as: "honey harvests", foreignKey: "station_id"});
  honey_harvest.belongsTo(apiary_stations, { as: "station", foreignKey: "station_id"});
  apiary_stations.hasMany(honey_harvest, { as: "honey_harvests", foreignKey: "station_id"});
  // apiary stations.belongsTo(employees, { as: "supervisor(int)_employee", foreignKey: "supervisor(int)"});
  // employees.hasMany(apiary stations, { as: "apiary stations", foreignKey: "supervisor(int)"});
  // apiary stations.belongsTo(employees, { as: "supervisor(ext)_employee", foreignKey: "supervisor(ext)"});
  // employees.hasMany(apiary stations, { as: "supervisor(ext)_apiary stations", foreignKey: "supervisor(ext)"});
  apiary_stations.belongsTo(employees, { as: "supervisor(int)_employee", foreignKey: "supervisor(int)"});
  employees.hasMany(apiary_stations, { as: "apiary_stations", foreignKey: "supervisor(int)"});
  apiary_stations.belongsTo(employees, { as: "supervisor(ext)_employee", foreignKey: "supervisor(ext)"});
  employees.hasMany(apiary_stations, { as: "supervisor(ext)_apiary_stations", foreignKey: "supervisor(ext)"});
  // catch reports.belongsTo(employees, { as: "assigned_supervisor_employee", foreignKey: "assigned_supervisor"});
  // employees.hasMany(catch reports, { as: "catch reports", foreignKey: "assigned_supervisor"});
  catch_reports.belongsTo(employees, { as: "assigned_supervisor_employee", foreignKey: "assigned_supervisor"});
  employees.hasMany(catch_reports, { as: "catch_reports", foreignKey: "assigned_supervisor"});
  // employee nok.belongsTo(employees, { as: "emp", foreignKey: "emp_id"});
  // employees.hasMany(employee nok, { as: "employee noks", foreignKey: "emp_id"});
  employee_nok.belongsTo(employees, { as: "emp", foreignKey: "emp_id"});
  employees.hasMany(employee_nok, { as: "employee_noks", foreignKey: "emp_id"});
  // swarm hunters.belongsTo(employees, { as: "assigned_supervisor_employee", foreignKey: "assigned_supervisor"});
  // employees.hasMany(swarm hunters, { as: "swarm hunters", foreignKey: "assigned_supervisor"});
  swarm_hunters.belongsTo(employees, { as: "assigned_supervisor_employee", foreignKey: "assigned_supervisor"});
  employees.hasMany(swarm_hunters, { as: "swarm_hunters", foreignKey: "assigned_supervisor"});
  delivery_address.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(delivery_address, { as: "delivery_addresses", foreignKey: "order_id"});
  // deliveryaddress.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  // orders.hasMany(deliveryaddress, { as: "deliveryaddresses", foreignKey: "order_id"});
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id"});
  // user orders.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  // orders.hasMany(user orders, { as: "user orders", foreignKey: "order_id"});
  user_orders.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(user_orders, { as: "user_orders", foreignKey: "order_id"});
  // product colors.belongsTo(products, { as: "product", foreignKey: "product_id"});
  // products.hasMany(product colors, { as: "product colors", foreignKey: "product_id"});
  // product images.belongsTo(products, { as: "product", foreignKey: "product_id"});
  // products.hasMany(product images, { as: "product images", foreignKey: "product_id"});
  product_colors.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_colors, { as: "product_colors", foreignKey: "product_id"});
  product_images.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_images, { as: "product_images", foreignKey: "product_id"});
  reviews.belongsTo(products, { as: "product_product", foreignKey: "product_id"});
  products.hasMany(reviews, { as: "reviews", foreignKey: "product_id"});
  // review images.belongsTo(reviews, { as: "review", foreignKey: "review_id"});
  // reviews.hasMany(review images, { as: "review images", foreignKey: "review_id"});
  review_images.belongsTo(reviews, { as: "review", foreignKey: "review_id"});
  reviews.hasMany(review_images, { as: "review_images", foreignKey: "review_id"});
  apiary_setup_components.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(apiary_setup_components, { as: "apiary_setup_components", foreignKey: "service_id"});
  consultancy_items.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(consultancy_items, { as: "consultancy_items", foreignKey: "service_id"});
  pollination_services.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(pollination_services, { as: "pollination_services", foreignKey: "service_id"});
  supply_provision_items.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(supply_provision_items, { as: "supply_provision_items", foreignKey: "service_id"});
  // catch reports.belongsTo(swarm hunters, { as: "hunter", foreignKey: "hunter_id"});
  // swarm hunters.hasMany(catch reports, { as: "catch reports", foreignKey: "hunter_id"});
  catch_reports.belongsTo(swarm_hunters, { as: "hunter", foreignKey: "hunter_id"});
  swarm_hunters.hasMany(catch_reports, { as: "catch_reports", foreignKey: "hunter_id"});
  hives.belongsTo(swarm_hunters, { as: "assigned_hunter_swarm_hunter", foreignKey: "assigned_hunter"});
  swarm_hunters.hasMany(hives, { as: "hives", foreignKey: "assigned_hunter"});
  orders.belongsTo(users, { as: "user_user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  // products.belongsTo(users, { as: "user_user", foreignKey: "user"});
  // users.hasMany(products, { as: "products", foreignKey: "user"});
  reviews.belongsTo(users, { as: "user_user", foreignKey: "user_id"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_id"});
  token.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(token, { as: "tokens", foreignKey: "user"});
  products.hasMany(order_items, { foreignKey: "product_id" });
  order_items.belongsTo(products, { foreignKey: "product_id" });


  return {
    // apiary stations,
    apiary_setup_components,
    apiary_stations,
    // catch reports,
    catch_reports,
    consultancy_items,
    delivery_address,
    // deliveryaddress,
    // employee nok,
    employee_nok,
    employees,
    equipments_tools,
    hives,
    // honey harvest,
    honey_harvest,
    order_items,
    orders,
    pollination_services,
    // product colors,
    // product images,
    product_colors,
    product_images,
    products,
    // review images,
    review_images,
    reviews,
    services,
    supplies,
    supply_provision_items,
    // swarm hunters,
    swarm_hunters,
    token,
    // user orders,
    user_orders,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
