class TaskManager {
private tasks: { id: number; name: string; status: string }[] = [];
private currentId: number = 1;
addTask(name: string): void {
    this.tasks.push({id: this.currentId, name, status:'Not Completed'});
    this.currentId++;
}
completeTask(id: number): void {
    for(let i = 0 ; i < this.tasks.length ; i ++){
        if( this.tasks[i].id === id){
            this.tasks[i].status = 'Completed';
            return;
        }
    }
}
displayTasks(): void {
    for(let i = 0 ; i < this.tasks.length ; i ++){
        console.log(`Task ID: ${this.tasks[i].id}, Name: "${this.tasks[i].name}", Status: ${this.tasks[i].status}`);
    }
}
}
const taskManager = new TaskManager();
taskManager.addTask("Learn TypeScript");
taskManager.completeTask(1);
taskManager.displayTasks(); //Task ID: 1, Name: "Learn TypeScript", Status:Completed