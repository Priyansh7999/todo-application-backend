const tasks = Map();

const saveTask = (task) =>{
    tasks.set(task.id,task);
    return task;
}
const findTaskById = (id)=>{
    return tasks.get(id);
}
module.exports = {
    saveTask,
    findTaskById
}