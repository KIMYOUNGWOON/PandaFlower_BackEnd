const { model, Schema } = require('mongoose');

const subCategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const SubCategory = model('SubCategory', subCategorySchema);
module.exports = SubCategory;
