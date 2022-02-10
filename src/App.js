import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  getDocs,
  collection,
  serverTimestamp,
  addDoc,
  deleteDoc,
  doc,
  // onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteField,
} from "firebase/firestore";
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchTodos = async () => {
    const todosCols = query(
      collection(db, "todos"),
      orderBy("timeStamp", "desc")
    );
    const todosSnapShots = await getDocs(todosCols);
    const todoList = todosSnapShots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTodos(todoList);
    setLoading(false);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input !== "") {
      const status = await addDoc(collection(db, "todos"), {
        todo: input,
        timeStamp: serverTimestamp(),
      });
      if (status) {
        setInput("");
        fetchTodos();
      }
    }
  };

  const deleteTodo = (id) => {
    deleteDoc(doc(db, "todos", id))
      .then((res) => fetchTodos())
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-200 h-screen">
      <div className="w-10/12 md:w-7/12 lg:6/12 bg-white mx-auto p-3 pt-4">
        <h2 className="mb-6">Firebase Todo-List</h2>

        <form onSubmit={handleSubmit} className="p-2 flex">
          <input
            className="flex-1 p-2 text-sm border border-black"
            type="text"
            placeholder="Enter todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="submit"
            className="p-2 text-sm cursor-pointer bg-black text-white mx-1"
            value="Add"
          />
        </form>

        <ul className="px-4">
          {loading ? (
            <h2>Loading ...</h2>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center py-4 px-1 shadow-md rounded my-2"
              >
                <p className="flex-1">{todo.todo}</p>
                <button
                  className="bg-red-600 py-1 px-3 text-sm text-white"
                  onClick={() => deleteTodo(todo.id)}
                >
                  X
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
