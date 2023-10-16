const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const router = Router();

//카테고리 조회 라우터
router.get('/', categoryController.allCategory);

//카테고리 생성 라우터
router.post('/', categoryController.createCategory);

//카테고리 수정 라우터
router.patch('/:category_id', categoryController.updateCategory);

//카테고리 삭제 라우터
router.delete('/:category_id', categoryController.deleteCategory);
module.exports = router;
