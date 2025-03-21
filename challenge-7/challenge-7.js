var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
        this.currentId = 1;
    }
    TaskManager.prototype.addTask = function (name) {
        this.tasks.push({ id: this.currentId, name: name, status: 'Not Completed' });
        this.currentId++;
    };
    TaskManager.prototype.completeTask = function (id) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === id) {
                this.tasks[i].status = 'Completed';
                return;
            }
        }
    };
    TaskManager.prototype.displayTasks = function () {
        for (var i = 0; i < this.tasks.length; i++) {
            console.log("Task ID:".concat(this.tasks[i].id, ", Name: \"").concat(this.tasks[i].name, "\", Status: ").concat(this.tasks[i].status));
        }
    };
    return TaskManager;
}());
var taskManager = new TaskManager();
taskManager.addTask("Learn TypeScript");
taskManager.completeTask(1);
taskManager.displayTasks(); //Task ID: 1, Name: "Learn TypeScript", Status:Completed
