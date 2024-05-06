import { v4 as uuidV4 } from "uuid";

type Task = {
   id: string,
   title: string,
   isCompleted: boolean,
   created: Date,
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks:Task[] = loadTasks();

tasks.forEach(addListItem);

form?.addEventListener("submit", evt => {
   evt.preventDefault();

   if (input?.value === "" || input?.value == null) return

   const newTask: Task = {
      id: uuidV4(),
      title: input.value,
      isCompleted: false,
      created: new Date(),
   }
   
   tasks.push(newTask);
   console.log(tasks);
   saveTasks();

   addListItem(newTask);
   input.value = "";
})

function addListItem(task: Task) {
   const item = document.createElement("li");
   const label = document.createElement("label");
   const checkbox = document.createElement("input");
   const time = document.createElement("p");
   const status = document.createElement("p");
   const deleteBtn = document.createElement("button")

   let msg: string = "task is not completed";
   status.innerText = msg;

   checkbox.type = "checkbox";
  
   checkbox.addEventListener("change", () => {
      task.isCompleted = checkbox.checked;
      console.log(task.isCompleted);
      updatedMessages(task);
      status.innerText = msg;
      saveTasks();
   })

   function updatedMessages(task: Task): string | undefined {
      if(task.isCompleted) {
         label.style.textDecoration = "line-through";
         return msg = "task is completed";
      } else if (!task.isCompleted) {
         label.style.textDecoration = "none";
         return msg = "task is not completed";
      }
   }

   let createDate:string = task.created.toString();
   console.log(createDate);
   time.innerText =  createDate;

   deleteBtn.innerText = "löschen";
   deleteBtn.addEventListener("click", () => {
      item.remove();
   })

   label.append(checkbox, task.title);
   item.append(label, time, status, deleteBtn);
   list?.append(item);
}

function saveTasks(){
   localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[]{
   const myTasksJSON = localStorage.getItem("TASKS")
   if(myTasksJSON == null) return []
   return JSON.parse(myTasksJSON)
}
