# 🔍 Research Assistant

A full-stack web application that helps researchers quickly find relevant content by searching both YouTube videos and GitHub repositories simultaneously. Perfect for discovering educational content, code examples, and research materials in one place.

## ✨ Features

- **Dual Search**: Search YouTube videos and GitHub repositories with a single query
- **YouTube Integration**: 
  - Displays video thumbnails, titles, channels, and view counts
  - Direct links to watch videos
  - Fetches top 5 most relevant results
- **GitHub Integration**:
  - Shows repository names, descriptions, and star counts
  - Sorted by popularity (stars)
  - Direct links to repositories
- **Modern UI**: Clean, responsive design with dark theme using Tailwind CSS
- **Real-time Results**: Fast API responses with organized display

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **YouTube Data API v3** for video search
- **GitHub REST API** for repository search
- **Axios** for HTTP requests
- **dotenv** for environment variable management

### Frontend
- **React 19** with hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **ESLint** for code quality

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- YouTube Data API key
- GitHub Personal Access Token (optional, but recommended for higher rate limits)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd research-help
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key_here
   GITHUB_TOKEN=your_github_token_here
   ```

### Getting API Keys

#### YouTube API Key:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

#### GitHub Token (Optional):
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate new token with `public_repo` scope
3. Copy the token to your `.env` file

## 🏃‍♂️ Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   node server.js
   ```
   The server will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will typically run on `http://localhost:5173`

3. **Open your browser** and navigate to the frontend URL

## 📁 Project Structure

```
research-help/
├── backend/
│   ├── package.json
│   ├── server.js          # Express server with API endpoints
│   └── .env              # Environment variables (create this)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── App.css       # Component styles
│   │   ├── main.jsx      # React entry point
│   │   └── index.css     # Global styles
│   ├── package.json
│   ├── vite.config.js    # Vite configuration
│   └── eslint.config.js  # ESLint configuration
└── README.md
```

## 🔧 API Endpoints

### GET `/api/search`

Search for content across YouTube and GitHub.

**Parameters:**
- `q` (required): Search query string

**Response:**
```json
{
  "youtube": [
    {
      "title": "Video Title",
      "channel": "Channel Name",
      "thumbnail": "https://...",
      "url": "https://youtube.com/watch?v=...",
      "views": "1000000"
    }
  ],
  "github": [
    {
      "name": "owner/repo-name",
      "stars": 5000,
      "description": "Repository description",
      "url": "https://github.com/owner/repo-name"
    }
  ]
}
```

## 🎨 Customization

- **Styling**: Modify Tailwind classes in `App.jsx` or add custom CSS in `App.css`
- **Search Results**: Adjust `maxResults` in `server.js` to change the number of results
- **API Integration**: Add more search sources by extending the `/api/search` endpoint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Jishnu Khargharia**

## 🙏 Acknowledgments

- YouTube Data API for video search functionality
- GitHub REST API for repository search
- React and Vite communities for excellent development tools
- Tailwind CSS for beautiful, responsive styling

---

Happy researching! 🎓✨
