const mongoose = require('mongoose');
const workerquerySchema = new mongoose.Schema({
    userid:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    queryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserQuery'
    },
    workerid:{
        type:String,
        required:true
    }
});
const WorkerQuery = mongoose.model('WorkerQuery', workerquerySchema);

module.exports = WorkerQuery;