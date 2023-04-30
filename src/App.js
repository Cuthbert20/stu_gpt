import { useState, useEffect } from "react";

const App = () => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setCurrentTitle(null);
    setValue('');
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
      //message is an obj role & content.
      setMessage(data.choices[0].message);
    } catch(err) {
      console.error(err.message);
    }
  }

  const handleClick = (uniqueTitle) => {
    setMessage(null);
    setValue('')
    setCurrentTitle(uniqueTitle);
  }

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats(previousChats => (
        [...previousChats,
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
      ]));
    }
  }, [message, currentTitle]);

  // console.log(previousChats);

  const currentChats = previousChats.filter(previousChat => previousChat.title === currentTitle);
  //Slick way of creating any array of uniqueTitles. Breakdown:
  /**
   * 1. we map over previousChats so we just ahve the title.
   * 2. Create a new Set which of course sets are colleciton of unique values. (bye bye duplicates)
   * 3. Then we use Array.from to convert the set to an array.
   */
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));
  const foo = previousChats.map(previousChat => previousChat.title);
  console.log(foo, "foo");

  
  return (
    <div className="app">
          <section className="side-bar">
        <button onClick={createNewChat} className="chat-button">+ New Chat</button>
        <ul className="history">
          {/* {console.log("uniqueTitles", uniqueTitles)} */}
          {uniqueTitles?.map((title, key) => <li key={key} onClick={() => handleClick(title)} >{title}</li>)}
        </ul>
        <nav>
          <p>Built by Stu</p>
        </nav>
    </section>
    <section className="main">
        {!currentTitle && <h1>STU's GPT</h1>}
        <ul className="feed">
          {currentChats.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
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
