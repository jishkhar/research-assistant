import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [youtube, setYoutube] = useState([]);
  const [github, setGithub] = useState([]);

  const search = async () => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setYoutube(data.youtube);
    setGithub(data.github);
  };

  // Utility function to truncate text
  const truncate = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6">
      <div className="max-w-7xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">🔍 Research Assistant</h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter keyword..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={search}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-start justify-center">
          {/* YouTube Section */}
          <div className="md:w-[1550px] w-full border border-gray-700 rounded-xl p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">🎥 YouTube Results</h2>
            {youtube.map((vid, i) => (
              <div
                key={i}
                className="bg-gray-900 p-4 mb-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-800"
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full sm:w-48 h-28 object-cover rounded"
                />
                <div className="flex flex-col justify-between">
                  <h3 className="text-lg font-semibold">{vid.title}</h3>
                  <p className="text-sm text-gray-400">Channel: {vid.channel}</p>
                  <p className="text-sm text-gray-400">Views: {vid.views}</p>
                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline mt-2"
                  >
                    ▶️ Watch
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Section */}
          <div className="md:w-[1550px] w-full border border-gray-700 rounded-xl p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">💻 GitHub Results</h2>
            {github.map((repo, i) => (
              <div
                key={i}
                className="bg-gray-900 p-4 mb-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-800 min-h-36"
              >


                <div className="flex flex-col justify-between flex-1">
                  <h3 className="text-lg font-semibold">{repo.name}</h3>
                  <p className="text-sm text-gray-400 mb-1">{truncate(repo.description, 120)}</p>
                  <p className="text-sm text-gray-400">⭐ {repo.stars}</p>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    🔗 Visit
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
