const tasks = Map();

const saveTask = (task) =>{
    tasks.set(task.id,task);
    return task;
}

module.exports = {
    saveTask,
}