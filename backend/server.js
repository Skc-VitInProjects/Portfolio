
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const contactRoute = require('./routes/contact');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: process.env.FRONTEND_URL || '*', optionsSuccessStatus: 204 }));
app.use(express.json());
app.get('/api/health', (req,res)=> res.json({
  status: mongoose.connection.readyState === 1 ? 'ok' : 'degraded',
  time: new Date(),
  features: ['contact', 'projects', 'responsive', 'horizontal-scroll']
}));
app.get('/api/projects', (req,res)=>{
  res.json([
    { id:'evidence', title:'Evidence — Document-Grounded Knowledge Layer', status:'Completed', period:'Sept 2026', tech:['Node.js','Express.js','MongoDB','OpenAI API','Jest','pdf-parse'], desc:'PDF parsing pipeline', github:'https://github.com/Skc-VitInProjects', caseStudy:'Problem: facts across PDFs are difficult to trust when units, dates, and wording differ. Solution: a PDF pipeline extracts and normalizes claims, then labels them corroborated, contradicted, or reconciled. Key decisions: deterministic regex first, optional OpenAI enrichment, and MongoDB normalization. Impact: every result keeps its verbatim quote and page number so it can be audited.' },
    { id:'divyam', title:'Divyam — API Inspector', status:'Live', period:'July 2026', tech:['Manifest V3','React','TypeScript','IndexedDB','Zod','Vitest'], desc:'Chrome DevTools extension', github:'https://github.com/Skc-VitInProjects', caseStudy:'Problem: reproducing API bugs means manually comparing Network requests and sanitizing credentials. Solution: a local-first Manifest V3 extension captures REST/GraphQL traffic, stores sessions in IndexedDB, diffs failing versus successful requests, and exports redacted cURL/fetch snippets. Key decisions: pure diff functions, Zod-validated redaction, and Vitest coverage. Impact: safer, faster bug reports without sending captured traffic to a server.' },
    { id:'hangout', title:'HangOut — Social Media Platform', status:'Live', period:'Dec 2025', tech:['React','Node.js','MongoDB','Redux Toolkit','Clerk','Inngest','SSE'], desc:'MERN social platform', github:'https://github.com/Skc-VitInProjects', caseStudy:'Problem: a social product must coordinate feeds, private chat, expiring stories, privacy, media, and background work. Solution: a MERN platform with chronological feeds, mutual connections, 24-hour stories, private messaging, and background media/workflow processing. Key decisions: SSE plus an in-memory registry for server-to-client chat updates, Inngest for durable expiry and email workflows, Clerk for auth, and ImageKit/Multer for uploads. Impact: a deployed, working app with a responsive main experience.' }
  ]);
});
app.use('/api/contact', contactRoute);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req,res)=> res.sendFile(path.join(__dirname, '../frontend/dist/index.html')));
}
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(mongoUri).then(()=>{
  console.log('MongoDB connected');
  app.listen(PORT, ()=> console.log(`Server running on ${PORT} — features tested`));
}).catch(err=>{
  console.error('Mongo error', err);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
  app.listen(PORT, ()=> console.log(`Server running on ${PORT} without MongoDB (development only)`));
});
