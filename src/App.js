import { useState, useEffect, useRef } from "react";
import axios from "axios";
function App() {
  const [title, setTitle] = useState("title");
  const [body, setBody] = useState("body");
  const [userId, setUserId] = useState(0);
  const [condition, setCondition] = useState(false);
  const [state, setState] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  let rindex = useRef(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState([]);
  const setTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const setBodyHandler = (event) => {
    setBody(event.target.value);
  };
  const setUserIdHandler = (event) => {
    setUserId(event.target.value);
  };

  const firstSubmitHandler = (event) => {
    event.preventDefault();
    setState(state + 1);
  };

  const secondSubmitHandler = (event) => {
    event.preventDefault();
    setTitle(titleInput);
    setBody(bodyInput);
    setUserId(userIdInput);
    setState(state + 1);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    setIsUpdate(true);
  };
  const postAPI = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: title,
        body: body,
        userId: userId,
      })
      .then((response) => {
        console.log(response);
        if (!isUpdate) {
          setData([...data, response.data]);
          setCondition(true);
        } else {
          data.splice(rindex - 1, 1, response.data);
          setData(data);
          setCondition(true);
          setIsUpdate(false);
        }
      })
      .then(() => {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    postAPI();
  }, [state]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {!isUpdate ? (
        <form
          onSubmit={firstSubmitHandler}
          style={{ display: "flex", flexDirection: "column", width: "25%" }}
        >
          <label>Title:</label>
          <input type="text" onChange={setTitleHandler} />
          <label>Body:</label>
          <input type="text" onChange={setBodyHandler} />
          <label>UserID:</label>
          <input type="number" onChange={setUserIdHandler} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form
          onSubmit={secondSubmitHandler}
          style={{ display: "flex", flexDirection: "column", width: "25%" }}
        >
          <label>Title:</label>
          <input value={titleInput} type="text" />
          <label>Body:</label>
          <input value={bodyInput} type="text" />
          <label>UserID:</label>
          <input value={userIdInput} type="number" />
          <button type="submit">Update</button>
        </form>
      )}

      {condition &&
        data.map((item, index) => (
          <div key={index}>
            <form onSubmit={changeHandler}>
              {(rindex = index)}.
              <input
                type="text"
                placeholder={item.title}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder={item.body}
                onChange={(e) => {
                  setBodyInput(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder={item.userId}
                onChange={(e) => {
                  setUserIdInput(e.target.value);
                }}
              />
              <button Stype="submit">Change</button>
            </form>
          </div>
        ))}
    </div>
  );
}

export default App;
