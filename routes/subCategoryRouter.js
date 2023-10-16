const { Router } = require('express');
const subCategoryController = require('../controllers/subCategoryController');

const router = Router();

//메인 카테고리의 서브 카테고리 조회 라우터
router.get('/:categoryName', subCategoryController.getSubCategory);

//서브 카테고리 전체 조회
router.get('/', subCategoryController.allSubCategory);

//카테고리 생성 라우터
router.post('/', subCategoryController.createSubCategory);

//카테고리 수정 라우터
router.patch('/:subCategory_id', subCategoryController.updateSubCategory);

//카테고리 삭제 라우터
router.delete('/:subCategory_id', subCategoryController.deleteSubCategory);

module.exports = router;
