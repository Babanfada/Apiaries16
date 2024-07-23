const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hives', {
    hive_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    assigned_hunter: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'swarm_hunters',
        key: 'hunter_id'
      }
    },
    hive_type: {
      type: DataTypes.ENUM('langstroth','top bar','local'),
      allowNull: true,
      defaultValue: "langstroth"
    },
    num_of_frames: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    colonized: {
      type: DataTypes.ENUM('pending','confirmed','installed'),
      allowNull: true,
      defaultValue: "pending"
    },
    status: {
      type: DataTypes.ENUM('unuse','inuse','empty'),
      allowNull: true
    },
    use_condition: {
      type: DataTypes.ENUM('need repair','used','new'),
      allowNull: true
    },
    first_installation: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    current_location: {
      type: DataTypes.ENUM('swarm field','station','warehouse'),
      allowNull: true
    },
    last_inspection_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hives',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hive_id" },
        ]
      },
      {
        name: "assigned_hunter",
        using: "BTREE",
        fields: [
          { name: "assigned_hunter" },
        ]
      },
    ]
  });
};
