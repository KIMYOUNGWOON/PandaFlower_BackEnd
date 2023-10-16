const { Router } = require('express');
const { nanoid } = require('nanoid');
const itemController = require('../controllers/itemController');

const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      let mimeType = '';
      switch (file.mimetype) {
        case 'image/bmp':
          mimeType = 'png';
          break;
        case 'image/gif':
          mimeType = 'png';
          break;
        case 'image/jpeg':
          mimeType = 'png';
          break;
        case 'image/png':
          mimeType = 'png';
          break;
        case 'image/webp':
          mimeType = 'png';
          break;
        default:
          mimeType = 'png';
          break;
      }
      const randomName = nanoid();
      cb(null, `${randomName}.${mimeType}`);
    },
  }),
});

const router = Router();

//상품 검색 라우터 get
router.get('/search', itemController.searchItems);

//카테고리 상품 조회 라우터
router.get('/category/:category_id', itemController.findCategoryItems);

//서브 카테고리 상품 조회 라우터
router.get('/subCategory/:subCategory_id', itemController.findSubCategoryItems);

//상품 상세 조회 라우터
router.get('/:item_id', itemController.detailItem);

//아이템 조회 라우터
router.get('/', itemController.allItems);

//상품 생성 라우터
router.post('/', upload.single('image'), itemController.createItem);

// router.post('/mul', upload.single('image'));

//상품 수정 라우터
router.patch('/:item_id', upload.single('image'), itemController.updateItem);

//상품 삭제 라우터
router.delete('/delete', itemController.deleteItem);

module.exports = router;
