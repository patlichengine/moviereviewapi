// import express from "express";
import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db("reviews").collection("reviews")
        }
        catch (e) {
            console.error(`Unable to establish collections handle in ReviewsDAO ${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
            //create the review document
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async getReview(reviewId) {
        // console.log('started here')
        // const idField = new ObjectId(reviewId)
        // console.log(idField)
        // return
        try {
            return await reviews.findOne({_id: new ObjectId(reviewId)})
        }
        catch (e) {
            console.error(`Unable to find review: ${e}`)
            return { error: e }
        }
    }

    static async listReviews() {
        try {
            return await reviews.find({});
        } catch (e) {
            console.error(`No reviews available to display: ${e}`)
            return { error: e }
        }
    }
    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                {_id: new ObjectId(reviewId)},
                { $set: { user: user, review: review }}
            )

            return updateResponse
        }
        catch (e) {
            console.error(`Unable to find review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete the review: ${e}`)
            return { error: e}
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({
                movieId: { $eq: parseInt(movieId) }
            })

            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get the movie reviews: ${e}`)
            return { error: e }
        }
    }
}