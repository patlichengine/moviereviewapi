import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = parseInt(req.body.movieId)
            const user = req.body.user
            const review = req.body.review

            const reviewResponse = await 
                ReviewsDAO.addReview(
                    movieId,
                    user,
                    review
                )
            res.json({status: "success"})
        }
        catch (e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req, res, next) {
        try { 
            const reviewId = req.params.id
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await 
                ReviewsDAO.updateReview(
                    reviewId,
                    user,
                    review
                )

            // check error
            var {error} = reviewResponse
            if (error) {
                res.status(404).json({error})
            }

            // check if update was successful
            if(reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update review"
                )
            }

            res.json({status: "success"})
        }
        catch (e) {
            res.status(500).json({error: e.message})
        }

    }

    static async apiGetReview(req, res, next) {
        console.log(req.params.id)
        try {
            let id = req.params.id
            let reviews = await ReviewsDAO.getReview(id)
            if (!reviews) {
                res.status(404).json({error: "Not found"})
                return
            }

            res.json(reviews)
        } 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetReviews(req, res, next) {
        try {
            let movieId = req.params.id 
            let reviews = await ReviewsDAO.getReviewsByMovieId(movieId)
            if(!reviews) {
                res.status(404).json({error: "Not found"})
                return
            }

            res.json(reviews)
        }
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            let id = req.params.id 
            const deleteResponse = await 
                ReviewsDAO.deleteReview(id)

            const {error} = deleteResponse
            if(error) {
                res.status(404).json({error})
            }

            if (deleteResponse === 0) {
                throw new Error (
                    'Unable to delete the review'
                )
            }

            res.json({status: "success"})
        }
        catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}
