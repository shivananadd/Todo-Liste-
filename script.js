const mainTodoElem = document.querySelector(".todo-lists-elem");

const inputValue = document.querySelector("#inputValue");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("youtubeTodoLists"));
};

const addTodoListLocalStorage = (localTodoLists) => {
  return localStorage.setItem(
    "youtubeTodoLists",
    JSON.stringify(localTodoLists)
  );
};

let localTodoLists = getTodoListFromLocal() || [];

addTodoDynamicElement = (curElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = ` <li>${curElem}</li>
          <button class="deleteBtn">Delete</button>`;

  mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();

  const todoListValue = inputValue.value.trim();
  inputValue.value = "";

  if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    console.log(localTodoLists);

    localStorage.setItem("youtubeTodoLists", JSON.stringify(localTodoLists));

    addTodoDynamicElement(todoListValue);
  }
};

const showTodoList = () => {
  console.log(localTodoLists);

  localTodoLists.forEach((curElem) => {
    addTodoDynamicElement(curElem);
  });
};

showTodoList();

const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  let parentElem = todoToRemove.parentElement;
  console.log(todoListContent);

  localTodoLists = localTodoLists.filter((curTodo) => {
    return curTodo !== todoListContent.toLowerCase();
  });

  addTodoListLocalStorage(localTodoLists)
  parentElem.remove();
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();

  console.log(e.target.classList.contains("deleteBtn"))
  if(e.target.classList.contains("deleteBtn")){

      removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
    
    addTodoList(e);
});
