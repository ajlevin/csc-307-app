import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) { // no job and no name - get all users
        promise = userModel.find();
    } else if (name && !job) { // name and no job - get users with name
        promise = findUserByName(name);
    } else if (job && !name) { // no name and job - get users with job
        promise = findUserByJob(job);
    } else { // name and job - get users with name and job
        promise = findUserByNameAndJob(name, job);
    }
    return promise;
}

function findUserById(id) {
    return userModel.findById(id);
}

function addUser(user) {
    console.log(user);
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function deleteUser(userID) {
    const promise = userModel.findByIdAndDelete(userID);
    return promise;
}

function findUserByName(name) {
    return userModel.find({ name: name });
}

function findUserByJob(job) {
    return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
    return userModel.find({ name: name, job: job});
}

export {
    addUser,
    deleteUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    findUserByNameAndJob,
};
