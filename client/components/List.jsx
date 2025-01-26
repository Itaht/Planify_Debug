// List.js (React Component)
import React, { useState } from 'react';
import '/styles/list.css';


const List = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);

  const handleAddList = () => {
    if (newListName.trim() === '') {
      alert('List name cannot be empty.');
      return;
    }

    const newList = {
      id: Date.now(),
      name: newListName,
      tasks: [],
    };

    setLists([...lists, newList]);
    setNewListName('');
    setIsAddingList(false);
  };

  const handleDeleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const handleAddTask = (listId, taskName) => {
    if (taskName.trim() === '') {
      alert('Task name cannot be empty.');
      return;
    }

    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [...list.tasks, { id: Date.now(), name: taskName }],
            }
          : list
      )
    );
  };

  return (
    <div className="list-container">
      {lists.map((list) => (
        <div className="list" key={list.id}>
          <div className="list-header">
            <h3>{list.name}</h3>
            <button onClick={() => handleDeleteList(list.id)}>Delete List</button>
          </div>

          <div className="tasks">
            {list.tasks.map((task) => (
              <div key={task.id} className="task">
                {task.name}
              </div>
            ))}
          </div>

          <div className="add-task">
            <input
              type="text"
              placeholder="New Task Name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask(list.id, e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      ))}

      {isAddingList ? (
        <div className="add-list-form">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Enter list name"
          />
          <button onClick={handleAddList}>Add List</button>
          <button onClick={() => setIsAddingList(false)}>Cancel</button>
        </div>
      ) : (
        <button className="add-list-button" onClick={() => setIsAddingList(true)}>
          + Add List
        </button>
      )}
    </div>
  );
};

export default List;
