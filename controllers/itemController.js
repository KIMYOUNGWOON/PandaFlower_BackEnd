const Category = require('../models/category/categorySchema');
const Item = require('../models/item/itemSchema');
const multer = require('multer');

async function searchItems(req, res, next) {
  console.log('검색 라우터!');
  //word 쿼리로 상품을 검색
  const { name } = req.query;

  //page랑 page당 상품 개수를 쿼리값으로 받고 정수로 변환한다.
  const perPage = 8;
  const { page } = req.query;
  const pageNumber = parseInt(page, 10);

  try {
    //쿼리값이 없으면 에러 메세지
    if (!name) {
      return res.status(200).json({
        msg: '검색어가 제공되지 않았습니다.',
        data: [],
      });
    }

    //한글 검색을 위해서 RegExp라는 생성자를 사용했다. i는 대소문자 구별하지 않게 하는 옵션이다.
    const regex = new RegExp(name, 'i');

    //데이터 베이스에서 해당 카테고리 항목 페이지 네이션 구현
    const allSearchItems = await Item.find({ name: { $regex: regex } });
    const startIndex = (pageNumber - 1) * perPage;
    const endIndex = Math.ceil(allSearchItems.length / perPage);

    const reward = await Item.find({ name: { $regex: regex } })
      .skip(startIndex)
      .limit(perPage);

    return res.status(200).json({
      msg: '아이템 검색',
      data: reward,
      endIndex,
    });
  } catch (error) {
    res.status(500).json({
      msg: '상품 조회 중 에러가 발생했습니다.',
      error: error.message,
    });
  }
}

async function findCategoryItems(req, res, next) {
  console.log('카테고리 내부 상품 조회 라우터!');

  try {
    //URL에서 파라미터 category_id 추출
    const { category_id } = req.params;
    //page랑 page당 상품 개수를 쿼리값으로 받고 정수로 변환한다.
    const perPage = 8;
    const { page } = req.query;
    const pageNumber = parseInt(page, 10);

    //데이터 베이스에서 해당 카테고리 항목 페이지 네이션 구현
    const allCategoryItems = await Item.find({ category: category_id });
    const startIndex = (pageNumber - 1) * perPage;
    const endIndex = Math.ceil(allCategoryItems.length / perPage);

    //category_id로 item의 카테고리 조회
    const categoryItems = await Item.find({ category: category_id }).skip(startIndex).limit(perPage);
    console.log(endIndex);

    if (!categoryItems || categoryItems.length === 0) {
      return res.status(404).json({
        msg: '해당 카테고리가 없습니다.',
      });
    }

    res.status(200).json({
      msg: `${category_id} 카테고리 상품 리스트 조회!`,
      data: categoryItems,
      endIndex,
    });
  } catch (error) {
    next(error);
  }
}

async function findSubCategoryItems(req, res, next) {
  console.log('서브 카테고리 내부 상품 조회 라우터!');

  try {
    //URL에서 파라미터 subCategory_id 추출
    const { subCategory_id } = req.params;
    //page랑 page당 상품 개수를 쿼리값으로 받고 정수로 변환한다.
    const perPage = 8;
    const { page } = req.query;
    const pageNumber = parseInt(page, 10);

    //데이터 베이스에서 해당 카테고리 항목 페이지 네이션 구현
    const allSubCategoryItems = await Item.find({ subCategory: subCategory_id });
    const startIndex = (pageNumber - 1) * perPage;
    const endIndex = Math.ceil(allSubCategoryItems.length / perPage);

    //category_id로 item의 카테고리 조회
    const subCategoryItems = await Item.find({ subCategory: subCategory_id }).skip(startIndex).limit(perPage);

    if (!subCategoryItems || subCategoryItems.length === 0) {
      return res.status(404).json({
        msg: '해당 서브 카테고리가 없습니다.',
      });
    }

    res.status(200).json({
      msg: `${subCategory_id} 서브 카테고리 상품 리스트 조회!`,
      data: subCategoryItems,
      endIndex,
    });
  } catch (error) {
    next(error);
  }
}

async function detailItem(req, res, next) {
  console.log('상품 정보 확인 라우터!');
  try {
    //URL에서 파라미터 item_id 추출
    const { item_id } = req.params;

    //해당 item_id를 가진 item 조회
    const item = await Item.findOne({ item_id });

    res.status(200).json({
      msg: '상세 아이템 조회 성공!',
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      msg: '상품 조회 중 에러가 발생했습니다.',
      error: error.message,
    });
  }
}

async function allItems(req, res, next) {
  console.log('전체 아이템 조회 라우터!');
  try {
    const items = await Item.find({});
    return res.status(200).json({
      msg: '전체 아이템 조회',
      data: items,
    });
  } catch (error) {
    next(error);
  }
}

async function createItem(req, res, next) {
  console.log('상품 추가 라우터!');
  const data = req.body;

  const image = req.file.path;
  console.log(req.file, image);

  if (image === undefined) {
    return res.status(400).json({ msg: '이미지가 없습니다.' });
  }

  try {
    //새로운 상품 생성
    const newItem = await Item.create({
      name: data.name,
      category: data.category,
      subCategory: data.subCategory,
      price: data.price,
      description: data.description,
      imageUrl: image,
    });

    //추가 성공시 응답
    res.status(201).json({ msg: '새로운 상품이 추가되었습니다.', data: newItem });
  } catch (error) {
    res.status(500).json({
      msg: '상품 추가 중 에러가 발생했습니다.',
      error: error.message,
    });
  }
}

async function updateItem(req, res, next) {
  console.log('상품 수정 라우터!');
  try {
    //item_id로 파라미터 설정
    const { item_id } = req.params;

    //body에서 받은 데이터를 updateDate라고 저장
    const updateData = req.body;
    const image = req.file.path;
    console.log(image);

    updateData.imageUrl = image;

    //findOne으로 item_id랑 같은 아이템 찾고, updateData를 업뎃하고 new:true로 업데이트 후의 아이템을 반환해서 바로 잘 됬는지 확인
    const updatedItem = await Item.findOneAndUpdate({ item_id }, updateData, { new: true });

    //찾았는데 안나오면 에러 반환
    if (!updatedItem) {
      return res.status(404).json({ msg: '아이템을 찾을 수 없습니다.' });
    }
    return res.status(200).json({ msg: '아이템이 성공적으로 수정되었습니다.', data: updatedItem });
  } catch (error) {
    return res.status(500).json({ msg: '아이템 수정 중 에러가 발생했습니다.', error: error.message });
  }
}

async function deleteItem(req, res, next) {
  console.log('상품 삭제 라우터!');

  try {
    //item_ids 배열로 받음
    const { item_ids } = req.body;

    //id가 없거나 배열이 아니거나 배열에 요소가 없으면 반환
    if (!item_ids || !Array.isArray(item_ids) || item_ids.length === 0) {
      return res.status(400).json({ msg: '유효하지 않은 요청입니다.' });
    }

    //$in으로 삭제
    const deleteItems = await Item.deleteMany({ item_id: { $in: item_ids } });

    if (deleteItems.deletedCount === 0) {
      return res.status(404).json({ msg: '아이템을 찾을 수 없습니다.' });
    }

    res.status(200).json({ msg: '선택한 상품 삭제 성공!', data: deleteItems });
  } catch (error) {
    return res.status(500).json({ msg: '상품 삭제 중 에러가 발생했습니다.', error: error.message });
  }
}

module.exports = {
  searchItems,
  findCategoryItems,
  findSubCategoryItems,
  detailItem,
  allItems,
  createItem,
  updateItem,
  deleteItem,
};
