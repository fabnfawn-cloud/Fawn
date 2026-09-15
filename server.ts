import 'dotenv/config';
import express from 'express';
import path from 'path';
import { handleParentAiQuery, handleLessonPlanGeneration } from './src/server/geminiHandler';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Fawn & Fable API' });
  });

  // Parent AI Advice endpoint (proxies to Gemini with Fawn & Fable context)
  app.post('/api/parent-ai', async (req, res) => {
    try {
      const result = await handleParentAiQuery(req.body);
      res.json(result);
    } catch (err) {
      console.error('API Error:', err);
      res.status(500).json({ error: 'Failed to process AI request' });
    }
  });

  // Lesson plan generator endpoint
  app.post('/api/lesson-plan', async (req, res) => {
    try {
      const result = await handleLessonPlanGeneration(req.body);
      res.json(result);
    } catch (err) {
      console.error('API Error:', err);
      res.status(500).json({ error: 'Failed to generate lesson plan' });
    }
  });

  // Serve public/assets directly
  app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')));

  // Vite middleware for development / Static file serving for production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
