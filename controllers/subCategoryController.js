const subCategory = require('../models/category/subCategorySchema');
const Item = require('../models/item/itemSchema');
const Category = require('../models/category/categorySchema');
const SubCategory = require('../models/category/subCategorySchema');

//메인카테고리의 서브 카테고리 조회
async function getSubCategory(req, res, next) {
  const { categoryName } = req.params;

  try {
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ msg: '카테고리가 없습니다.' });
    }

    const subCategories = await SubCategory.find({ category: category.name });

    res.status(200).json({
      msg: `${categoryName}의 서브 카테고리 입니다.`,
      data: subCategories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//서브카테고리 생성
async function createSubCategory(req, res, next) {
  console.log('서브카테고리 추가 라우터!');
  const { category, name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({
      msg: '이름이 없습니다.',
    });
  }
  if (!category || category === '') {
    return res.status(400).json({
      msg: '메인 카테고리가 없습니다.',
    });
  }

  try {
    const checkName = await subCategory.findOne({ name });
    if (checkName) {
      throw new Error('이미 존재하는 서브 카테고리 이름입니다.');
    }

    const newSubCategory = await subCategory.create({ name, category });

    //추가 성공시 응답
    res.status(201).json({ status: 'success', msg: '새로운 서브 카테고리가 추가되었습니다.', data: newSubCategory });
  } catch (error) {
    res.status(500).json({
      msg: '서브 카테고리 추가 중 에러가 발생했습니다.',
      error: error.message,
    });
  }
}

//서브 카테고리 수정
async function updateSubCategory(req, res, next) {
  console.log('카테고리 수정 라우터!');
  try {
    const { subCategory_id } = req.params;

    const updateData = req.body;

    //바꿀 서브 카테고리 이름
    const currentSubCategory = await subCategory.findOne({ _id: subCategory_id });

    //바꿀 서브 카테고리 이름을 가진 상품을 찾아서 업데이트
    const itemSubCategoryUpdateResult = await Item.updateMany({ subCategory: currentSubCategory.name }, { subCategory: updateData.name });

    //서브 카테고리 업데이트
    const updateSubCategory = await subCategory.findByIdAndUpdate(subCategory_id, updateData, { new: true });

    if (!updateSubCategory) {
      res.status(404).json({ msg: '서브 카테고리를 찾을 수 없습니다.' });
    }

    res.status(200).json({ msg: '서브 카테고리 수정 성공!', data: { subCategory: updateSubCategory, itemSubCategoryUpdateResult } });
  } catch (error) {
    return res.status(500).json({ msg: '서브 카테고리 수정 중 에러가 발생했습니다.', error: error.message });
  }
}

//서브 카테고리 삭제
async function deleteSubCategory(req, res, next) {
  console.log('서브 카테고리 삭제 라우터!');

  try {
    const { subCategory_id } = req.params;

    const deleteSubCategory = await subCategory.findOneAndDelete({ _id: subCategory_id });

    if (!deleteSubCategory) {
      return res.status(404).json({ msg: '해당 카테고리가 없습니다!' });
    }

    res.status(200).json({ msg: '서브 카테고리 삭제 성공!', data: deleteSubCategory });
  } catch (error) {
    return res.status(500).json({ msg: '서브 카테고리 삭제 중 에러가 발생했습니다.', error: error.message });
  }
}

//서브 카테고리 전체조회
async function allSubCategory(req, res, next) {
  console.log('전체 서브카테고리 조회 라우터!');
  try {
    const subCategories = await subCategory.find({});
    return res.status(200).json({
      msg: '전체 서브카테고리 조회',
      data: subCategories,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  allSubCategory,
};
