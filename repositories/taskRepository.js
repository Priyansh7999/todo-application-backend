const tasks = Map();

const saveTask = (task) =>{
    tasks.set(task.id,task);
    return task;
}
const findTaskById = (id)=>{
    return tasks.get(id);
}
const findTasksAll = () => Array.from(tasks.values());

const removeTask = (id) => {
    tasks.delete(id);
}
const existsByTitle = (title) =>
  Array.from(tasks.values())
    .some(t => t.title.toLowerCase() === title.toLowerCase());

module.exports = {
    saveTask,
    findTaskById,
    removeTask,
    existsByTitle,
    findTasksAll
}