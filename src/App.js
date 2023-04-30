import { useState, useEffect } from "react";

const App = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setCurrentTitle(null);
    setValue(null);
    setMessage(null);
  }

  const getMessage = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        //Value is being set by the input field.
        message: value
      })
    };
    try {
      const response = await fetch('http://localhost:8000/completion', options);
      const data = await response.json();
      console.log(data);
      //message is an obj role & content.
      setMessage(data.choices[0].message);
    } catch(err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((previousChats) => [
        ...previousChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  console.log(previousChats);

  const currentChats = previousChats.filter(previousChat => previousChat.title === currentTitle);

  return (
    <div className="app">
          <section className="side-bar">
        <button onClick={createNewChat} className="chat-button">+ New Chat</button>
        <ul className="history">
          <li className="active">Chat 1</li>
        </ul>
        <nav>
          <p>Built by Stu</p>
        </nav>
    </section>
    <section className="main">
        {!currentTitle && <h1>STU's GPT</h1>}
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessage}>✒</div>
          </div>
          <p className="info">Chat GPT Mar 23 Version.</p>
        </div>
    </section>
    </div>  
  );
}

export default App;
