// Get the mongoose object
import { query } from 'express';
import mongoose from 'mongoose';

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Tell mongoose to create indexes, which help with faster querying
//mongoose.set("useCreateIndex", true);

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create a exercise
 * @param {String} title
 * @param {Number} year
 * @param {String} language
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

/**
 * Retrieve exercise based on the filter, projection and limit parameters
 * @param {Object} filter
 * @param {String} projection
 * @param {Number} limit
 * @returns
 */
const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
    .select(projection)
    .limit(limit);
    return query.exec();
}

/**
 * find the exercise with the given ID value
 * @param {String} _id
 * @returns
 */
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

/**
 * delete the exercise with the given ID value
 * @param {String} _id
 * @returns
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}

/**
 * Replace the nname, reps, weight, unit, and date properties of the exercise with the id value provided
 * @param {String} _id 
 * @param {String} name 
 * @param {Number} age 
 * @param {String} email
 * @param {Number} phoneNumber 
 * @returns A promise. Resolves to the number of documents modified
 */
 const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const filter = { "_id": _id};
    let update = {
        "name": name,
        "reps": reps,
        "weight": weight,
        "unit": unit,
        "date": date
    }
    const query = Exercise.findOneAndUpdate(filter, update);
    query.exec();
    return 1;
}

 export { createExercise, findExercises, findExerciseById, deleteById, replaceExercise };