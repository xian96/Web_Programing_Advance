const express = require("express");
const router = express.Router();
const data = require("../data");
const tasksData = data.tasks;

router.get("/", async (req, res) => {
    try {
        //get the skip number
        var skip = 0;

        if (req.query.skip) {
            if (isNaN(req.query.skip))//it's the error check!!!
                throw `the query skip:(${req.query.skip}) is not an number. which type is ${typeof req.query.skip}`;
            skip = req.query.skip < 0 ? 0: req.query.skip;
        }
        skip = parseInt(skip);

        //get the take number
        var take = 20;
        if (req.query.take) {
            if (isNaN(req.query.take))////it's the error check!!!
                throw `the query take:(${req.query.take}) is not an number. which type is ${typeof req.query.take}`;
            take = req.query.take < 0? 0: req.query.take;
        }

        take = take > 100 ? 100 : take;
        take = parseInt(take);
        
        var tasks = await tasksData.getBySkipAndTake(skip, take);
        res.json(tasks);
    } catch (e) {
        res.json(`error : ${e}`);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || typeof id !== 'string')
            throw "You must provide a id for your post";
        const task = await tasksData.getTaskById(id);
        res.json(task);
    } catch (e) {
        res.json(`error : ${e}`);
    }
})

router.post("/", async (req, res) => {
    try {
        const postData = req.body;
        // "title": string,
        // "description": string,
        // "hoursEstimated": number,
        // "completed": boolean,
        const { title, description, hoursEstimated, completed } = postData;

        if (!title || typeof title !== 'string')
            throw "You must provide a title for your post";

        if (!description || typeof description !== 'string')
            throw "You must provide an description of post";

        if (!hoursEstimated || typeof hoursEstimated !== 'number')
            throw `You must provide an number type of hoursEstimated of post. what you provide:${hoursEstimated}`;

        if (typeof completed === undefined || typeof (completed) !== 'boolean')
            throw `You must provide an boolean type of completed of post. what you provide:${completed}`;

        const task = await tasksData.create(title, description, hoursEstimated, completed);

        res.json(task);
    } catch (e) {
        res.json(`error : ${e}`);
    }
})

router.put("/:id", async (req, res) => {
    try {
        // Updates the task with the supplied ID and returns the new task object;
        // task: PUT calls must provide all details of the new state of the object!
        // Note you cannot manipulate comments in this route!

        const id = req.params.id;
        if (!id || typeof id !== 'string')
            throw "You must provide a id for your post";

        const postData = req.body;
        // "title": string,
        // "description": string,
        // "hoursEstimated": number,
        // "completed": boolean,
        const { title, description, hoursEstimated, completed } = postData;

        if (!title || typeof title !== 'string')
            throw "You must provide a title for your post";

        if (!description || typeof description !== 'string')
            throw "You must provide an description of post";

        if (!hoursEstimated || typeof hoursEstimated !== 'number')
            throw `You must provide an number type of hoursEstimated of post. what you provide:${hoursEstimated}`;

        if (typeof completed === undefined || typeof (completed) !== 'boolean')
            throw `You must provide an boolean type of completed of post. what you provide:${completed}`;

        const updatedTask = await tasksData.updateTaskById(id, title, description, hoursEstimated, completed);

        res.json(updatedTask);
    } catch (e) {
        res.json(`error : ${e}`);
    }
})

router.patch("/:id", async (req, res) => {
    try {
        // Updates the task with the supplied ID and returns the new task object;
        //  task: PATCH calls only provide deltas of the value to update!
        //  Note you cannot manipulate comments in this route!
        const id = req.params.id;
        if (!id || typeof id !== 'string')
            throw "You must provide a id for your post update";

        const postData = req.body;
        // "title": string,
        // "description": string,
        // "hoursEstimated": number,
        // "completed": boolean,
        const { title, description, hoursEstimated, completed } = postData;

        if (typeof title !== "undefined") {
            if (typeof title !== 'string') {
                throw "You must provide a  string type title for your post";
            }
        }

        if (typeof description !== "undefined") {
            if (typeof description !== 'string') {
                throw "You must provide an string type description of post";
            }

        }

        if (typeof complhoursEstimatedeted !== "undefined") {
            if (typeof hoursEstimated !== 'number') {
                throw `You must provide an number type hoursEstimated of post. what you provide:${hoursEstimated}`;
            }
        }

        if (typeof completed !== "undefined") {
            console.log(completed);
            if (typeof (completed) !== 'boolean') {
                throw `You must provide an boolean type completed of post. what you provide:${completed}`;
            }
        }

        const updatedTask = await tasksData.updateTaskCertainFieldById(id, title, description, hoursEstimated, completed);

        res.json(updatedTask);
    } catch (e) {
        res.json(`error: ${e}`);
    }
})

router.post("/:id/comments", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || typeof id !== 'string')
            throw "You must provide a id for your post update";

        // "comments": comment[]
        const postData = req.body;
        const { name, comment } = postData;

        if (!name || typeof name !== 'string')
            throw "You must provide a name for your post";
        if (!comment || typeof comment !== 'string')
            throw "You must provide a comment for your post";

        const newComment = await tasksData.addComment(id, name, comment);

        res.json(newComment);
    } catch (e) {
        res.json(`error : ${e}`);
    }
})

router.delete("/:taskId/:commentId", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const commentId = req.params.commentId;

        if (!taskId || typeof taskId !== 'string')
            throw "You must provide a taskId for your task";

        if (!commentId || typeof commentId !== 'string')
            throw "You must provide a commentId for your comment";

        const deletedComment = await tasksData.deleteCommentByIdWithTaskId(taskId,commentId);

        res.json(deletedComment);
    } catch (e) {
        res.json(`error : ${e}`);
    }
})

module.exports = router;