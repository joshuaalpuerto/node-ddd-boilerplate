
var Recur = require("./recur.js")
var Bull = require("bull")
var newQueue = new Bull('myJobs');
var { setQueues } = require('bull-board');
setQueues([newQueue])
module.exports = ({  repository: {

} }) => {

    const createUniqueJobWithRecurring = async (scheduleData) => {
        var getCronExpression = await Recur[scheduleData.repeatOption](scheduleData.time)
        scheduleData.cron = getCronExpression
        var job = await newQueue.add(scheduleData, {
            repeat: { cron: getCronExpression },
            uniqueId: scheduleData.uniqueId,
            removeOnComplete: true,
            removeOnFail: true
        });
        return { jobId: job.id, cron: getCronExpression }
    }
    const createUniqueJobWithoutRecurring = async (scheduleData) => {
        var time = new Date(scheduleData.time) - new Date()
        const myJob = await newQueue.add(scheduleData, {
            delay: time,
            removeOnComplete: true,
            removeOnFail: true
        });
        return { jobId: myJob.id, cron: "" }
    }
    const removeJob = async (query) => {
        return newQueue.getJob(query.jobId).then(async function (job) {
            if (job) {
                return job.remove();
            } else {
                return await newQueue.removeRepeatable({ uniqueId: query.uniqueId, cron: query.cron })
            }
        });
    }

    const updateJob = async (id, jobData) => {
        return newQueue.getJob(id).then(async function (job) {
            job.update(jobData)
        });
    }

    newQueue.process(async function (job, done) {
        await runScheduledJobs(job)
        done();

    });

    const runScheduledJobs = async (job) => {
        /*
        ------------
          Run Jobs
        ------------
        */
    }

    return {
        createUniqueJobWithRecurring,
        createUniqueJobWithoutRecurring,
        removeJob,
        updateJob
    }

}