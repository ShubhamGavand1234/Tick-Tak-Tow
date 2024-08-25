import { useState } from "react";

function Player({ name, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEditClick() {
    // isEditing ? setIsEditing(false) : setIsEditing(true);
    // setIsEditing(!isEditing);
    setIsEditing((prevValue) => !prevValue);
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {isEditing ? (
            <input
              onChange={handleChange}
              type="text"
              value={playerName}
            ></input>
          ) : (
            <span className="player-name">{playerName}</span>
          )}
          <span className="player-symbol">{symbol}</span>
        </span>

        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}

export default Player;
