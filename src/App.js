

const App = () => {
  return (
    <div className="app">
          <section className="side-bar">
        <button className="chat-button">+ New Chat</button>
        <ul className="history">
          <li className="active">Chat 1</li>
        </ul>
        <nav>
          <p>Built by Stu</p>
        </nav>
    </section>
    <section className="main">
        <h1>STU's GPT</h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input/>
            <div id="submit" >✒</div>
          </div>
          <p className="info">Chat GPT Mar 23 Version.</p>
        </div>
    </section>
    </div>  
  );
}

export default App;
