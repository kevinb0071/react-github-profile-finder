import { useEffect, useState } from "react";
import User from "./user";
import "./styles.css";
export default function GithubProfileFinder() {
  const [username, setUsername] = useState("kevinb0071");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchGithhubUserData() {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    if (data) {
      setUserData(data);
      setLoading(false);
      setUsername("");
    }
  }
  function handleSubmit() {
    fetchGithhubUserData();
  }

  useEffect(() => {
    fetchGithhubUserData();
  }, []);
  if (loading) {
    return <h1>Loading Profile data ! Please wait</h1>;
  }
  return (
    <div className="github-profile-container">
      <div className="input-wrapper">
        <input
          type="text"
          name="search-by-username"
          placeholder="Search Github Username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {userData !== null ? <User user={userData} /> : null}
    </div>
  );
}
