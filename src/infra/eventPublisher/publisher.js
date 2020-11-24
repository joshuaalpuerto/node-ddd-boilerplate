var EventEmitter = require("events")
var myEmitter = new EventEmitter();


class Publisher extends EventEmitter {

    ///Publish an event ///
    publish(event, data) {
        myEmitter.emit(event, data)
    }

}

///subscribed Event///
myEmitter.on("dataRecieved",  (data) => {

    /// emit an event when execution is completed///
    myEmitter.emit("complete", true)

})

myEmitter.on("complete", function (el) {
    //some other things that will be perform on complete execution
})


module.exports = new Publisher()

