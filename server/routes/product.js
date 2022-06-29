const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  //가져온 이미지를 저장 : multer이용
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  //받아온 정보들을 DB에 넣어준다
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  //product collection(DB)에 있는 모든 상품 정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      //category= price
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0], //Greater Than Equal
          $lte: req.body.filters[key][1], //Less Than Equal
        };
      } else {
        //category=continents
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    console.log("1111111");
    console.log("term", term);

    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productsInfo) => {
        if (err) return res.status(400).json({ success: false });
        return res
          .status(200)
          .json({ success: true, productsInfo, postSize: productsInfo.length });
      });
  } else {
    console.log("2222222222");

    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productsInfo) => {
        if (err) return res.status(400).json({ success: false });
        return res
          .status(200)
          .json({ success: true, productsInfo, postSize: productsInfo.length });
      });
  }
});

module.exports = router;
