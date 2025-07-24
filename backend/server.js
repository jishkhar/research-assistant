require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const maxResults = 5;

  try {
    // YouTube search
    const ytSearch = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        key: YOUTUBE_API_KEY,
        maxResults,
        type: 'video'
      }
    });

    const videoIds = ytSearch.data.items.map(item => item.id.videoId).join(',');
    const ytStats = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'statistics',
        id: videoIds,
        key: YOUTUBE_API_KEY
      }
    });

    const ytMap = {};
    ytStats.data.items.forEach(item => {
      ytMap[item.id] = item.statistics.viewCount;
    });

    const youtubeResults = ytSearch.data.items.map(item => ({
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      views: ytMap[item.id.videoId] || 'N/A'
    }));

    // GitHub search
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};
    const ghRes = await axios.get('https://api.github.com/search/repositories', {
      headers,
      params: {
        q: query,
        sort: 'stars',
        order: 'desc',
        per_page: maxResults
      }
    });

    const githubResults = ghRes.data.items.map(repo => ({
      name: repo.full_name,
      stars: repo.stargazers_count,
      description: repo.description,
      url: repo.html_url
    }));

    res.json({ youtube: youtubeResults, github: githubResults });

  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
