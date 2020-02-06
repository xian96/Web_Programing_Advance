const collection = require("../database/mongoCollections");
const tasks = collection.tasks;
const uuidv4 = require('uuid/v4');

async function getBySkipAndTake(skip, take) {
    const tasksCollection = await tasks();
    const Alltasks = await tasksCollection.find({}).toArray();
    let neededTasks = [];
    let start = skip;
    let end = skip+take;
    for(let i = start; i < end && i < Alltasks.length; i++){
        neededTasks[i - skip] = Alltasks[i];
    }
    return neededTasks;
}

async function getTaskById(id) {

    if (!id || typeof id !== 'string')
        throw "You must provide a id for your post";

    const tasksCollection = await tasks();
    const idTask = await tasksCollection.findOne({ id: id });
    if (idTask === null)
        throw "No task with that id";

    // {
    //     "id": uuid,
    //     "title": string,
    //     "description": string,
    //     "hoursEstimated": number,
    //     "completed": boolean,
    //     "comments": comment[]
    //   }
    const taskDetail = {
        "id": idTask.id,
        "title": idTask.title,
        "description": idTask.description,
        "hoursEstimated": idTask.hoursEstimated,
        "completed": idTask.completed,
        "comments": [],
    };
    // console.log(idTask);
    for (let comment of idTask.comments) {
        // console.log(comment);
        taskDetail.comments.push(comment);
    }

    return taskDetail;
}

async function create(title, description, hoursEstimated, completed) {
    // if (!title || typeof title !== 'string')
    //     throw "You must provide a title for your post";

    // if (!description || typeof description !== 'string')
    //     throw "You must provide an description for your post";

    // if (!hoursEstimated || typeof hoursEstimated !== 'number')
    //     throw `You must provide an number type of hoursEstimated for your post. what you provide:${hoursEstimated}`;

    // if (typeof completed === undefined || typeof (completed) !== 'boolean')
    //     throw `You must provide an boolean type of completed for your post. what you provide:${completed}`;

    const newPostTask = {
        "id": uuidv4(),
        "title": title,
        "description": description,
        "hoursEstimated": hoursEstimated,
        "completed": completed,
        "comments": [],
    };

    // console.log(newPostTask.id);
    const tasksCollection = await tasks();
    const insertedTask = await tasksCollection.insertOne(newPostTask);
    // return await tasksCollection.findOne({ id: newPostTask.id });
    return newPostTask;
}

async function updateTaskById(id, title, description, hoursEstimated, completed) {
    // if (!id || typeof id !== 'string')
    //     throw "You must provide a id for your post";

    // if (!title || typeof title !== 'string')
    //     throw "You must provide a title for your post";

    // if (!description || typeof description !== 'string')
    //     throw "You must provide an description for your post";

    // if (!hoursEstimated || typeof hoursEstimated !== 'number')
    //     throw `You must provide an number type of hoursEstimated for your post. what you provide:${hoursEstimated}`;

    // if (typeof completed === undefined || typeof (completed) !== 'boolean')
    //     throw `You must provide an boolean type of completed for your post. what you provide:${completed}`;
    const tasksCollection = await tasks();
    // console.log(await tasksCollection.findOne({ id: id }));
    const task = await tasksCollection.updateOne({ id: id }, {
        $set: {
            "title": title,
            "description": description,
            "hoursEstimated": hoursEstimated,
            "completed": completed,
        }
    });
    // console.log(task);
    // if (task.modifiedCount === 0) {
    //     throw `could not update task with id:${id} successfully`;
    // }

    return await tasksCollection.findOne({ id: id });
}

async function updateTaskCertainFieldById(id, title, description, hoursEstimated, completed) {
    // if (!id || typeof id !== 'string')
    //     throw "You must provide a id for your post";

    const tasksCollection = await tasks();
    if (typeof title !== "undefined") {
        if (typeof title !== 'string') {
            throw "You must provide a  string type title for your post";
        }
        else {
            await tasksCollection.updateOne({ id: id }, {
                $set: {
                    "title": title
                }
            });
        }
    }

    if (typeof description !== "undefined") {
        if (typeof description !== 'string') {
            throw "You must provide an string type description of post";
        }
        else {
            await tasksCollection.updateOne({ id: id }, {
                $set: {
                    "description": description,
                }
            });
        }

    }

    if (typeof hoursEstimated !== "undefined") {
        if (typeof hoursEstimated !== 'number') {
            throw `You must provide an number type hoursEstimated of post.`;
        }
        else {
            await tasksCollection.updateOne({ id: id }, {
                $set: {
                    "hoursEstimated": hoursEstimated,
                }
            });
        }
    }

    if (typeof completed !== "undefined") {
        if (typeof (completed) !== 'boolean') {
            throw `You must provide an boolean type completed of post.`;
        }
        else {
            await tasksCollection.updateOne({ id: id }, {
                $set: {
                    "completed": completed,
                }
            });
        }
    }

    return await tasksCollection.findOne({ id: id });
}

async function addComment(id, name, comment) {
    // if (!id || typeof id !== 'string')
    //     throw "You must provide a id for your post update";

    // if (!name || typeof name !== 'string')
    //     throw "You must provide a name for your post";

    // if (!comment || typeof comment !== 'string')
    //     throw "You must provide a comment for your post";

    // {
    //     "id": uuid,
    //     "name": string,
    //     "comment": string
    // }
    const newComment = {
        "id": uuidv4(),
        "name": name,
        "comment": comment
    }
    const tasksCollection = await tasks();
    const currentTask = await tasksCollection.updateOne({ id: id },{$push:{comments: newComment}});
    
    return newComment;
}

async function deleteCommentByIdWithTaskId(taskId, commentId){
    // if (!taskId || typeof taskId !== 'string')
    //     throw "You must provide a taskId for your task";

    // if (!commentId || typeof commentId !== 'string')
    //     throw "You must provide a commentId for your comment";
    const tasksCollection = await tasks();
    const deletedComment = await tasksCollection.updateOne({id: taskId},{ $pull: {comments:{id : commentId}}});
    return await tasksCollection.findOne({id: taskId});
}

module.exports = {
    getBySkipAndTake, getTaskById, create,
     updateTaskById, updateTaskCertainFieldById, addComment,
     deleteCommentByIdWithTaskId,
}