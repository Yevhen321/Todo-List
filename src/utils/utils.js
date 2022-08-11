export const addSubTaskToListRecursive = (todoList, task, parentId) => {
  return todoList.map((todoItem) => {
    if (todoItem.id === parentId) {
      return {
        ...todoItem,
        subList: [...todoItem.subList, task],
      };
    }
    return {
      ...todoItem,
      ...(todoItem.subList && {
        subList: addSubTaskToListRecursive(todoItem.subList, task, parentId),
      }),
    };
  });
};

export const updateInputedTextRecursive = (todoList, task, parentId) => {
  return todoList.map((todoItem) => {
    if (todoItem.id === parentId) {
      return {
        ...todoItem,
        title: task,
      };
    }
    return {
      ...todoItem,
      ...(todoItem.subList && {
        subList: updateInputedTextRecursive(todoItem.subList, task, parentId),
      }),
    };
  });
};

export const deleteTaskRecursive = (todoList, id, parentId) => {
  if (!parentId) {
    return todoList.filter((listItem) => listItem.id !== id);
  }
  return todoList.map((item) => {
    if (item.id === parentId) {
      const subList = item.subList.filter((listItem) => listItem.id !== id);
      return {
        ...item,
        subList,
      };
    }
    return {
      ...item,
      ...(item.subList && {
        subList: deleteTaskRecursive(item.subList, id, parentId),
      }),
    };
  });
};
