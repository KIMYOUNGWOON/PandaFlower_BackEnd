const Category = require('../models/category/categorySchema');
const Item = require('../models/item/itemSchema');

//전체 카테고리 조회
async function allCategory(req, res, next) {
  console.log('전체 카테고리 조회 라우터!');
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      msg: '전체 카테고리 조회',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

//카테고리 생성
async function createCategory(req, res, next) {
  console.log('카테고리 추가 라우터!');
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({
      msg: '이름이 없습니다.',
    });
  }

  try {
    const checkName = await Category.findOne({ name });
    if (checkName) {
      throw new Error('이미 존재하는 카테고리 이름입니다.');
    }

    //새로운 카테고리 생성하는데 위에서 만든 arr를 카테고리 안의 items로 담는다
    const newCategory = await Category.create({
      name,
      // items: arr,
    });

    //추가 성공시 응답
    res.status(201).json({ status: 'success', msg: '새로운 카테고리가 추가되었습니다.', data: newCategory });
  } catch (error) {
    res.status(500).json({
      msg: '카테고리 추가 중 에러가 발생했습니다.',
      error: error.message,
    });
  }
}

//카테고리 수정
async function updateCategory(req, res, next) {
  console.log('카테고리 수정 라우터!');
  try {
    const { category_id } = req.params;

    const updateData = req.body;

    //바꿀 카테고리 이름
    const currentCategory = await Category.findOne({ _id: category_id });

    //바꿀 카테고리 이름을 가진 상품을 찾아서 업데이트
    const itemCategoryUpdateResult = await Item.updateMany({ category: currentCategory.name }, { category: updateData.name });

    //카테고리 업데이트
    const updateCategory = await Category.findByIdAndUpdate(category_id, updateData, { new: true });

    if (!updateCategory) {
      res.status(404).json({ msg: '카테고리를 찾을 수 없습니다.' });
    }

    res.status(200).json({ msg: '카테고리 수정 성공!', data: { category: updateCategory, itemCategoryUpdateResult } });
  } catch (error) {
    return res.status(500).json({ msg: '카테고리 수정 중 에러가 발생했습니다.', error: error.message });
  }
}

//카테고리 삭제
async function deleteCategory(req, res, next) {
  console.log('카테고리 삭제 라우터!');

  try {
    const { category_id } = req.params;

    const deleteCategory = await Category.findOneAndDelete({ _id: category_id });

    if (!deleteCategory) {
      return res.status(404).json({ msg: '해당 카테고리가 없습니다!' });
    }

    res.status(200).json({ msg: '카테고리 삭제 성공!', data: deleteCategory });
  } catch (error) {
    return res.status(500).json({ msg: '카테고리 삭제 중 에러가 발생했습니다.', error: error.message });
  }
}

module.exports = {
  allCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
