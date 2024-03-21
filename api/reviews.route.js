import express from "express";

//import a controller file
import ReviewsCtrl from '../controller/reviews.controller.js'

const router = express.Router()

router.route("/").get((req, res) => res.send('Welcome to reviews'));
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router;