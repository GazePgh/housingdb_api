const Joi = require('joi');

module.exports = {
  db: (sequelize, Sequelize) => {
    const ExternalHousingAvailable = sequelize.define('ExternalHousingAvailable', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      title: Sequelize.STRING,
      address: Sequelize.STRING,
      bedrooms: Sequelize.INTEGER,
      bathrooms: Sequelize.DECIMAL,
      contact: Sequelize.STRING,
      body: Sequelize.TEXT,
      status: Sequelize.STRING,
      url: Sequelize.TEXT,
      price: Sequelize.DECIMAL,
      details: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
    });

    ExternalHousingAvailable.associate = function (models) {
      models.ExternalHousingAvailable.belongsTo(models.Account, {as: 'Author'});
      models.ExternalHousingAvailable.belongsTo(models.Location);
      models.ExternalHousingAvailable.belongsTo(models.Property);
    };

    return ExternalHousingAvailable;
  },
  id: Joi.object().keys({
    id: Joi.string().guid()
  }),
  
  api: Joi.object().keys({
    AuthorId: Joi.string().guid(),
    title: Joi.string(),
    address: Joi.string(),
    bedrooms: Joi.number().integer().min(0).max(10),
    bathrooms: Joi.number().precision(2).min(1).max(9),
    contact: Joi.string(),
    body: Joi.string(),
    status: Joi.string().valid('active', 'pending', 'inactive'),
    url: Joi.string().required().uri({scheme: ['https','http']}),
    price: Joi.number().precision(2).min(0.00),
  }),
  apiFilterQuery: Joi.object().keys({
    title: Joi.string().optional(),
    address: Joi.string().optional(),
    bedrooms: Joi.number().integer().min(0).max(10).optional(),
    bathrooms: Joi.number().precision(2).min(1).max(9).optional(),
    status: Joi.string().optional(),
    price: Joi.number().precision(2).min(0.00).optional(),
    locations: [
      Joi.string().guid(),
      Joi.array().items(Joi.string().guid())
    ],
  }),
};