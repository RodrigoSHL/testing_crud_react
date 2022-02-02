import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

  const [task, setTask] = useState('');
  const [listTasks, setListTasks] = useState([]);
  const [editionMode, setEditionMode] = useState(false);

  const saveData = (e) => {
    e.preventDefault();
    if(!task.trim()){
      console.log('not add task')
      return
    }

    setListTasks([
      ...listTasks,
      {id, task}
    ])
    e.target.reset();

    setTask('');

  }

  const deleteData = idTask => {
    const arrayFilter = listTasks.filter(item => item.id !== idTask);
    setListTasks(arrayFilter);
  }

  const editData = item => {
    console.log(item)
    setEditionMode(true);
    setTask(item.task)
  }


  return (
    <div className="container">
      <h1 className="text-center">Task Report</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Tasks list</h4>
          <ul className="list-group">
            {
              listTasks.map((item) => (
                <li key={item.id} className="group-item mt-2">
                  <span className="lead">{item.task}</span>
                  <button className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => deleteData(item.id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-warning btn-sm float-end"
                    onClick={() => editData(item)}                  
                  >
                    Edit
                  </button>
                </li>
              ))
            }
            
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              (editionMode) ? "Form Edit" : 'Form Add' 
            }
          </h4>
          <form onSubmit={saveData} action="">
            <input
              type="text" 
              className="form-control mb-2" 
              placeholder="Write task"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            {
              editionMode ? (
                <button className="btn btn-warning w-100" type='submit'>Edit</button>
              ) :  (<button className="btn btn-dark w-100" type='submit'>Add</button>)
            }
           
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
