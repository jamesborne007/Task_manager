
const Tasks = require('../model/task');
const asyncWrapper = require('../middleware/async')

//get all the tasks
const getAllTasks = asyncWrapper (async(req,res)=> {
    //res.send('get all tasks');    
        const tasks = await Tasks.find();
        res.status(200).json({numOfTasks:tasks.length, tasks});  
} )

// get a single task
const getTask = asyncWrapper(async(req,res) => {
    //res.send('get task');
    const {taskId} = req.params;  
        const task = await Tasks.findOne({ _id: taskId})
        if(!task){
            return res
            .status(404)
            .json({msg:`Task with the id: ${taskId} not found`}); 
        }res.status(200).json({task})
})

//create task
const createTask = asyncWrapper(async(req,res) => {
    //res.send('create task')
        const {title, priority} = req.body;
        if (!title || !priority){
            return res.status(400).json({msg:'please provide necessary information'})
        }
        const task = await Tasks.create(req.body)
        res.status(201).json({msg:'task created', task})

 
});

//update
const updateTask = asyncWrapper(async(req,res) => {
    //res.send('update task');
        const {taskId} = req.params;  
        const task = await Tasks.findByIdAndUpdate({_id: taskId}, req.body,{
            new:true,
            runValidators:true,
        })
        res.status(201).json({task});
  
});

//delete
const deleteTask = asyncWrapper(async(req,res) => {
    //res.send('delete task');
        const {taskId} = req.params
        const task = await Tasks.findByIdAndDelete(_id= taskId)
        res.status(201).json({msg:'Task deleted', task}); 
    
});

//exports
module.exports ={
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}

