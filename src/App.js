import TodoComponent from "./components/Todo/TodoComponent";
import TodoContainer from "./Context/Todo/TodoContainer";

function App() {
  return (
    <div className="App">
      <TodoContainer>
        <TodoComponent />
      </TodoContainer>
    </div>
  );
}

export default App;
