
import React, { useState, useEffect, useRef } from 'react'

const projectsData = [
  {
    id:'evidence',
    title:'Evidence — Document-Grounded Knowledge Layer',
    period:'Sept 2026',
    status:'Completed',
    tech:['Node.js','Express.js','MongoDB','OpenAI API','Jest','pdf-parse'],
    desc:'PDF parsing pipeline extracting facts with regex + OpenAI, normalizing units/dates/metrics, grounding every fact in verbatim quotes + page numbers for traceability.',
    github:'https://github.com/Skc-VitInProjects/Evidence',
    caseStudy:'Problem: facts across PDFs are difficult to trust when units, dates, and wording differ. Solution: a PDF pipeline extracts and normalizes claims, then labels them corroborated, contradicted, or reconciled. Key decisions: deterministic regex first, optional OpenAI enrichment, and MongoDB normalization. Impact: every result keeps its verbatim quote and page number so it can be audited.'
  },
  {
    id:'divyam',
    title:'Divyam — API Inspector & Bug Reproduction',
    period:'July 2026',
    status:'Live',
    tech:['Manifest V3','React','TypeScript','IndexedDB','Zod','Vitest'],
    desc:'Local-first Chrome DevTools extension capturing REST/GraphQL traffic with IndexedDB persistence, diff engine for failing vs successful requests, Zod credential redaction.',
    github:'https://github.com/Skc-VitInProjects/Divyam',
    live:'',
    caseStudy:'Problem: reproducing API bugs means manually comparing Network requests and sanitizing credentials. Solution: a local-first Manifest V3 extension captures REST/GraphQL traffic, stores sessions in IndexedDB, diffs failing versus successful requests, and exports redacted cURL/fetch snippets. Key decisions: pure diff functions, Zod-validated redaction, and Vitest coverage. Impact: safer, faster bug reports without sending captured traffic to a server.'
  },
  {
    id:'hangout',
    title:'HangOut — Full-Stack Social Platform',
    period:'Dec 2025',
    status:'Live',
    tech:['React','Node.js','MongoDB','Redux Toolkit','Clerk','Inngest','SSE'],
    desc:'MERN social with chronological feeds, mutual requests, 24h stories, real-time private messaging via SSE + in-memory registry, durable workflows via Inngest, media via ImageKit/Multer.',
    github:'https://github.com/Skc-VitInProjects/HangOut',
    live:'https://hang-out-teal.vercel.app/',
    caseStudy:'Problem: a social product must coordinate feeds, private chat, expiring stories, privacy, media, and background work. Solution: a MERN platform with chronological feeds, mutual connections, 24-hour stories, private messaging, and background media/workflow processing. Key decisions: SSE plus an in-memory registry for server-to-client chat updates, Inngest for durable expiry and email workflows, Clerk for auth, and ImageKit/Multer for uploads. Impact: a deployed, working app with a responsive main experience.'
  }
]

const skills = {
  Languages: ['JavaScript (ES6+)','TypeScript','Java','SQL'],
  Frontend: ['React.js','Tailwind CSS','Bootstrap','HTML5','CSS3'],
  Backend: ['Node.js','Express.js','RESTful API'],
  Databases: ['MongoDB','MySQL'],
  Tools: ['Git','GitHub','Hoppscotch']
}

function Icon({type}){
  if(type==='github') return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.02C6.43 21.31 5.64 19.3 5.64 19.3c-.68-1.73-1.66-2.19-1.66-2.19-1.36-.93.1-.91.1-.91 1.5.11 2.29 1.54 2.29 1.54 1.34 2.29 3.51 1.63 4.36 1.25.14-.97.52-1.63.95-2-3.32-.38-6.8-1.66-6.8-7.38 0-1.63.58-2.96 1.53-4.01-.15-.38-.66-1.9.15-3.96 0 0 1.25-.4 4.1 1.53a14.2 14.2 0 0 1 7.46 0C17.3 6.02 18.55 6.42 18.55 6.42c.81 2.06.3 3.58.15 3.96.95 1.05 1.53 2.38 1.53 4.01 0 5.74-3.49 7-6.82 7.37.54.47 1.02 1.39 1.02 2.81v4.16c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
  if(type==='linkedin') return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  if(type==='gmail') return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.691 2.28 24 3.434 24 5.457z"/></svg>
  if(type==='codolio') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 7h8M8 12h8M8 17h5"/></svg>
  if(type==='phone') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.07 8.81 19.79 19.79 0 0 1 2 0.18 2 2 0 0 1 4 0h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  return null
}

export default function App(){
  const [projects,setProjects]=useState(projectsData)
  const [form,setForm]=useState({name:'',email:'',message:''})
  const [sending,setSending]=useState(false)
  const [sent,setSent]=useState(false)
  const [submitError,setSubmitError]=useState('')
  const projectsRef = useRef(null)

  useEffect(()=>{
    fetch('/api/projects').then(r=>r.json()).then(d=>{ if(Array.isArray(d)&&d.length) setProjects(d)}).catch(()=>{})
  },[])

  const submitContact = async (e)=>{
    e.preventDefault()
    setSending(true)
    setSubmitError('')
    setSent(false)
    try{
      const res = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      if(!res.ok){
        const data = await res.json().catch(()=>({}))
        throw new Error(data.error || 'Unable to send your message')
      }
      setSent(true)
      setForm({name:'',email:'',message:''})
    }catch(error){
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your message')
    }
    setSending(false)
    setTimeout(()=>setSent(false),4000)
  }

  return (
    <div style={{background:'#0a0a0c', minHeight:'100vh'}}>
      <style>{`
        .nav{position:sticky;top:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:18px 5.5vw;background:rgba(10,10,12,0.92);backdrop-filter:blur(16px);border-bottom:1px solid #1c1c22}
        .logo{font-family:Syne;font-weight:800;font-size:22px;letter-spacing:1px}
        .logo span{color:#ff3f0f}
        .nav-links{display:flex;gap:28px;min-width:0;overflow-x:auto;font-size:11px;letter-spacing:1.6px;color:#9a9aa3;scrollbar-width:none}
        .nav-links::-webkit-scrollbar{display:none}
        .nav-links a{flex-shrink:0}
        .nav-links a:hover{color:#fff; text-decoration:none !important}
        .cta{display:flex;align-items:center;gap:0;border:1px solid #2a2a30;border-radius:8px;overflow:hidden;transition:.2s}
        .cta:hover{border-color:#ff3f0f}
        .cta b{background:#ff3f0f;padding:10px 14px;color:#fff}
        .hero{display:grid;grid-template-columns:1.15fr 0.85fr;min-height:88vh;position:relative;overflow:visible;padding:0 5.5vw 36px;gap:40px}
        .hero > div:first-child{padding-top:5vh !important}
        .kicker{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:2.4px;color:#9a9aa3;margin-bottom:18px}
        .kicker i{width:8px;height:8px;background:#ff3f0f;display:inline-block}
        .headline{font-size:clamp(28px,4.3vw,52px);line-height:0.92;font-weight:800;font-family:Syne}
        .headline .white,.headline .ghost{display:block;max-width:100%;overflow-wrap:anywhere}
        .headline .white{color:#fff}
        .headline .ghost{color:rgba(255,255,255,0.12)}
        .hero-circle-wrap{position:relative;width:min(68vh,520px);height:min(68vh,520px);margin:3vh auto 0;background:radial-gradient(70% 70% at 50% 28%, #ff5e2b 0%, #e83e0e 48%, #1a0f0d 88%);border-radius:50%;display:flex;align-items:end;justify-content:center;overflow:visible;box-shadow:0 24px 80px rgba(0,0,0,0.65)}
        .hero-circle-wrap img{width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 20px 40px rgba(0,0,0,0.5))}
        .hire-badge{position:absolute;left:-10%;top:62%;width:96px;height:96px;background:#ff3f0f;color:#fff;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;letter-spacing:0.8px;line-height:1.15;text-align:center;text-decoration:none;z-index:15;box-shadow:0 8px 24px rgba(255,63,15,0.35);transform:rotate(-12deg);transition:transform .2s,background .2s}
        .hire-badge:hover{background:#ff5e2b;transform:rotate(-12deg) scale(1.05)}
        .big-name{grid-column:1 / -1;position:relative;width:100%;max-width:none;margin:0;padding:0 0 8px;font-family:Syne;font-weight:800;font-size:clamp(30px,5.5vw,64px);line-height:0.95;letter-spacing:-0.04em;color:#fff;white-space:normal;text-wrap:balance;text-align:center;z-index:20;overflow-wrap:anywhere;overflow:visible;display:block}
        .spacer{height:48px;background:transparent}
        .section{padding:90px 5.5vw;border-top:1px solid #15151a}
        .eyebrow{font-size:10px;letter-spacing:2.8px;color:#ff3f0f;margin-bottom:12px}
        .card{background:#131316;border:1px solid #232328;border-radius:14px;padding:22px;transition:.25s}
        .card:hover{border-color:rgba(255,63,15,0.3);transform:translateY(-2px)}
        .pill{font-size:12px;padding:7px 12px;border:1px solid #2a2a30;border-radius:999px;color:#c2c2cc;background:#0a0a0c;display:inline-flex;align-items:center;gap:6px}
        .pill:hover{border-color:#ff3f0f33;color:#fff}
        .projects-outer{padding:0 5.5vw;margin:0 -5.5vw;width:calc(100% + 11vw);overflow:hidden}
        .projects-container{display:flex;gap:20px;overflow-x:auto;overflow-y:hidden;padding:8px 5.5vw 24px 5.5vw;scroll-padding-left:5.5vw;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
        .project-card{min-width:380px;max-width:420px;flex-shrink:0;scroll-snap-align:start;background:#131316;border:1px solid #232328;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:14px;transition:.25s}
        .project-card:hover{border-color:rgba(255,63,15,0.35);transform:translateY(-2px)}
        .icon-link{display:flex;align-items:center;gap:8px;font-size:13px;color:#9a9aa3;transition:.2s}
        .icon-link:hover{color:#fff; text-decoration:none !important}
        /* Responsive */
        @media (max-width: 480px){
          .nav{gap:12px}
          .nav-links{gap:12px;font-size:10px;justify-content:flex-start}
          .cta{flex-shrink:0}
          .hero > *, .section > *{min-width:0}
          .section[style*="grid-template-columns"],
          .section .card[style*="grid-template-columns"]{grid-template-columns:1fr !important}
          .nav{padding:14px 5vw}
          .hero{grid-template-columns:1fr;padding:0 5vw 90px;min-height:auto;gap:24px}
          .hero > div:first-child{padding-top:9vh !important}
          .hero-circle-wrap{width:78vw;height:78vw;max-width:360px;max-height:360px;margin:20px auto 0}
          .headline{font-size:clamp(28px,9vw,40px)}
          .big-name{font-size:clamp(28px,8.5vw,46px);white-space:normal;line-height:0.92;padding:0 5vw 8px;text-align:left}
          .section{padding:56px 5vw}
          .card{padding:18px}
          .projects-outer{padding:0 5vw;margin:0 -5vw;width:calc(100% + 10vw)}
          .projects-container{padding:8px 5vw 20px 5vw;scroll-padding-left:5vw;gap:14px}
          .project-card{min-width:84vw;max-width:84vw}
          .hire-badge{width:76px;height:76px;font-size:8px;left:-6%;top:58%}
        }
        @media (min-width: 481px) and (max-width: 768px){
          .hero > *, .section > *{min-width:0}
          .section[style*="grid-template-columns"],
          .section .card[style*="grid-template-columns"]{grid-template-columns:1fr !important}
          .hero{grid-template-columns:1fr;gap:28px;padding:0 5.5vw 100px}
          .hero > div:first-child{padding-top:9vh !important}
          .hero-circle-wrap{width:68vw;height:68vw;max-width:420px;margin:24px auto 0}
          .section{padding:64px 5.5vw}
          .projects-outer{padding:0 5.5vw;margin:0 -5.5vw;width:calc(100% + 11vw)}
          .project-card{min-width:340px}
        }
        @media (min-width: 769px) and (max-width: 1024px){
          .hero{grid-template-columns:1fr 0.9fr;gap:32px;padding-bottom:36px}
          .hero > div:first-child{padding-top:5vh !important}
          .hero-circle-wrap{width:440px;height:440px}
          .headline{font-size:48px}
        }
        @media (min-width: 1441px){
          .hero,.section,.nav{max-width:1440px;margin-left:auto;margin-right:auto}
        }
      `}</style>

      <nav className="nav">
        <div className="logo">S<span>K</span>AND</div>
        <div className="nav-links">
          <a href="#profile">PROFILE</a>
          <a href="#skills">SKILLS</a>
          <a href="#projects">PROJECTS</a>
          <a href="#internship">INTERNSHIP</a>
          <a href="#academics">ACADEMICS</a>
          <a href="#contact">CONTACT</a>
        </div>
        <a href="#contact" className="cta"><b>→</b><span style={{padding:'10px 14px',fontSize:'12px'}}>LET'S TALK</span></a>
      </nav>

      <section className="hero">
        <div style={{paddingTop:'9vh'}}>
          <div className="kicker"><i></i>PRODUCT SPEC / ENGINEER / BATCH 2027</div>
          <h1 className="headline">
            <span className="white">FULL STACK ENGINEER</span><br/>
            <span className="white">BUILT FOR PRODUCTION</span><br/>
            <span className="ghost">SCALES BEYOND FEATURES</span>
          </h1>
          <p style={{marginTop:'22px',color:'#9a9aa3',maxWidth:'460px',lineHeight:1.7,fontSize:'15px'}}>
            B.Tech CSE at VIT Bhopal — CGPA 9.15/10. I architect RESTful APIs and MERN systems that served 1000+ active users at amasQIS.ai. Obsessed with RBAC, aggregation pipelines, and shipping traceable, tested code.
          </p>
          <div style={{marginTop:'26px',display:'flex',flexWrap:'wrap',gap:'16px'}}>
            <a href="https://github.com/Skc-VitInProjects" target="_blank" rel="noreferrer" className="icon-link"><Icon type="github"/> GitHub</a>
            <a href="https://linkedin.com/in/Skandkc" target="_blank" rel="noreferrer" className="icon-link"><Icon type="linkedin"/> LinkedIn</a>
            <a href="mailto:iskc9838@gmail.com" className="icon-link"><Icon type="gmail"/> iskc9838@gmail.com</a>
            <a href="https://codolio.com/profile/Skand_KC" target="_blank" rel="noreferrer" className="icon-link"><Icon type="codolio"/> Codolio</a>
          </div>
        </div>
        <div style={{position:'relative'}}>
          <div className="hero-circle-wrap">
            <img src="/skand_arms.png" alt="Skand from head to chest" />
            <a href="#contact" className="hire-badge" aria-label="Available for hire — go to contact form">AVAILABLE<br/>FOR<br/>HIRE</a>
          </div>
        </div>
        <div className="big-name">SKAND KUMAR CHOUBEY</div>
      </section>
      <div className="spacer"></div>

      <section id="profile" className="section" style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:'36px'}}>
        <div>
          <div className="eyebrow">02 — PROFILE</div>
          <h2 className="display" style={{fontSize:'38px',marginBottom:'16px'}}>Engineered like a product, not a resume.</h2>
          <p style={{color:'#9a9aa3',lineHeight:1.8,fontSize:'15px'}}>
            Product mindset: build for real users, measure, iterate. At ManageRTC I built Employee Lifecycle, Recruitment, CRM APIs on Node/Express/Mongo with RBAC and aggregation pipelines, cutting latency with real-time state sync. Automated HR/payroll/attendance reports with ExcelJS/PDFKit background workers, removing manual admin effort.
            Built Divyam — local-first DevTools extension for REST/GraphQL inspection with IndexedDB persistence and Zod redaction. Built HangOut — MERN social with SSE messaging (avoided WebSocket handshake overhead) and Inngest durable workflows.
          </p>
          <p style={{color:'#7a7a85',lineHeight:1.7,marginTop:'14px',fontSize:'14px'}}>Outside code: gardening patience, bringing humor to interactions, swimming and cricket for competitive calm. I socialize, listen, ship.</p>
        </div>
        <div className="card">
          <div style={{fontSize:'10px',letterSpacing:'2px',color:'#ff3f0f',marginBottom:'14px'}}>PRODUCT SPEC</div>
          <div style={{display:'grid',gap:'10px',fontSize:'13px'}}>
            <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #232328',paddingBottom:'8px'}}><span style={{color:'#7a7a85'}}>Role</span><b>Full Stack Engineer</b></div>
            <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #232328',paddingBottom:'8px'}}><span style={{color:'#7a7a85'}}>Stack</span><b>MERN + TypeScript</b></div>
            <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #232328',paddingBottom:'8px'}}><span style={{color:'#7a7a85'}}>Users Served</span><b>1000+</b></div>
            <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #232328',paddingBottom:'8px'}}><span style={{color:'#7a7a85'}}>CGPA</span><b>9.15/10</b></div>
            <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #232328',paddingBottom:'8px'}}><span style={{color:'#7a7a85'}}>OSS</span><b>4 PRs merged</b></div>
            <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #232328',paddingBottom:'8px'}}><span style={{color:'#7a7a85'}}>Hometown</span><b>Gorakhpur, UP</b></div>
            <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'#7a7a85'}}>Target</span><b>SDE / Full-Stack / Intern</b></div>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="eyebrow">03 — TECHNICAL ARSENAL</div>
        <h2 className="display" style={{fontSize:'32px',marginBottom:'26px'}}>Tools I ship with — no fluff</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px'}}>
          {Object.entries(skills).map(([cat,list])=>(
            <div key={cat} className="card">
              <div style={{fontSize:'10px',letterSpacing:'2px',color:'#ff3f0f',marginBottom:'12px'}}>{cat.toUpperCase()}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                {list.map(s=><span key={s} className="pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <div className="eyebrow">04 — SELECTED BUILDS</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',flexWrap:'wrap',gap:'12px',marginBottom:'18px'}}>
          <h2 className="display" style={{fontSize:'32px'}}>Each build tells its own story</h2>
          <div style={{fontSize:'12px',color:'#7a7a85'}}>Scroll → to see more • Add new projects to the right</div>
        </div>
        <div className="projects-outer">
          <div className="projects-container" ref={projectsRef}>
            {projects.map(p=>(
              <div key={p.id} className="project-card">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:'10px',padding:'4px 10px',borderRadius:'999px',background:p.status==='Live'?'#ff3f0f':'#232328',color:'#fff'}}>{p.status}</span>
                  <span style={{fontSize:'11px',color:'#7a7a85'}}>{p.period}</span>
                </div>
                <h3 style={{fontFamily:'Syne',fontSize:'19px',lineHeight:1.25}}>{p.title}</h3>
                <p style={{fontSize:'13px',color:'#9a9aa3',lineHeight:1.6}}>{p.desc}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>{p.tech.map(t=><span key={t} className="pill" style={{fontSize:'11px'}}>{t}</span>)}</div>
                <div style={{marginTop:'auto',display:'flex',gap:'14px',paddingTop:'12px',borderTop:'1px solid #232328'}}>
                  <a href={p.github} target="_blank" rel="noreferrer" className="icon-link" style={{fontSize:'12px'}}><Icon type="github"/> Repo</a>
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="icon-link" style={{fontSize:'12px',color:'#ff3f0f'}}>Live →</a>}
                </div>
                <div style={{fontSize:'11px',color:'#5a5a65'}}>Case: {p.caseStudy}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="internship" className="section">
        <div className="eyebrow">05 — EXPERIENCE</div>
        <div className="card" style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:'28px'}}>
          <div>
            <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
              <div>
                <div style={{fontWeight:700,fontSize:'18px'}}>Full Stack Development Intern</div>
                <div style={{fontSize:'13px',color:'#ff3f0f',marginTop:'4px'}}>amasQIS.ai — ManageRTC | Muscat, Oman (Remote)</div>
              </div>
              <div style={{fontSize:'11px',color:'#7a7a85',background:'#0a0a0c',border:'1px solid #232328',padding:'6px 10px',borderRadius:'999px',height:'fit-content'}}>May - Oct 2025</div>
            </div>
            <div style={{marginTop:'18px',display:'grid',gridTemplateColumns:'auto 1fr',gap:'12px 16px',fontSize:'13px',color:'#9a9aa3',lineHeight:1.6}}>
              <span style={{color:'#ff3f0f'}}>01</span><span>Engineered RESTful APIs for Employee Lifecycle, Recruitment, CRM modules — supporting React UIs for 1000+ users in Agile team.</span>
              <span style={{color:'#ff3f0f'}}>02</span><span>Optimized Mongoose aggregation pipelines for subscription & workforce metrics — real-time sync reduced latency.</span>
              <span style={{color:'#ff3f0f'}}>03</span><span>Built background workers with ExcelJS & PDFKit for HR/payroll/attendance auto-reports — cut manual effort.</span>
              <span style={{color:'#ff3f0f'}}>04</span><span>Implemented granular RBAC + Hoppscotch schema verification for secure payloads.</span>
            </div>
          </div>
          <div style={{background:'#0a0a0c',border:'1px solid #232328',borderRadius:'12px',padding:'18px'}}>
            <div style={{fontSize:'10px',letterSpacing:'2px',color:'#7a7a85',marginBottom:'10px'}}>IMPACT METRICS</div>
            <div style={{display:'grid',gap:'12px'}}>
              <div><div style={{fontSize:'24px',fontWeight:800}}>1000+</div><div style={{fontSize:'11px',color:'#7a7a85'}}>Active users supported</div></div>
              <div><div style={{fontSize:'24px',fontWeight:800}}>3</div><div style={{fontSize:'11px',color:'#7a7a85'}}>Core modules shipped</div></div>
              <div><div style={{fontSize:'24px',fontWeight:800}}>RBAC</div><div style={{fontSize:'11px',color:'#7a7a85'}}>Granular access control</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="academics" className="section" style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'32px'}}>
        <div>
          <div className="eyebrow">06 — ACADEMIC JOURNEY</div>
          <div style={{position:'relative',paddingLeft:'24px',borderLeft:'1px solid #232328',display:'grid',gap:'20px'}}>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute',left:'-29px',top:'4px',width:'10px',height:'10px',background:'#ff3f0f',borderRadius:'50%'}}></div>
              <div className="card">
                <div style={{fontWeight:700}}>Vellore Institute of Technology, Bhopal</div>
                <div style={{fontSize:'13px',color:'#9a9aa3',marginTop:'4px'}}>B.Tech CSE — CGPA 9.15/10.0 — Expected May 2027</div>
                <div style={{fontSize:'11px',color:'#7a7a85',marginTop:'4px'}}>Madhya Pradesh</div>
              </div>
            </div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute',left:'-29px',top:'4px',width:'10px',height:'10px',background:'#2a2a30',borderRadius:'50%'}}></div>
              <div className="card">
                <div style={{fontWeight:600}}>R.P.M. Academy, Gorakhpur, UP</div>
                <div style={{fontSize:'13px',color:'#9a9aa3',marginTop:'4px'}}>Class XII CBSE — 90.6% • May 2022</div>
                <div style={{fontSize:'13px',color:'#9a9aa3',marginTop:'4px'}}>Class X CBSE — 96.6% • May 2020</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{background:'rgba(255,63,15,0.06)',borderColor:'rgba(255,63,15,0.2)'}}>
          <div style={{fontSize:'10px',letterSpacing:'2px',color:'#ff3f0f',marginBottom:'14px'}}>ACHIEVEMENTS</div>
          <div style={{display:'grid',gap:'14px'}}>
            <div>
              <div style={{fontWeight:600,fontSize:'14px'}}>Hacktoberfest — Open Source</div>
              <div style={{fontSize:'13px',color:'#9a9aa3',marginTop:'4px'}}>4+ PRs merged across public repos — bug fixes + feature enhancements.</div>
            </div>
            <div style={{borderTop:'1px solid rgba(255,63,15,0.15)',paddingTop:'14px'}}>
              <div style={{fontWeight:600,fontSize:'14px'}}>Academic Merit Scholarship — INR 42,000</div>
              <div style={{fontSize:'13px',color:'#9a9aa3',marginTop:'4px'}}>Awarded for 96.6% in Class X Board Examinations — top performance.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section" style={{display:'grid',gridTemplateColumns:'0.9fr 1.1fr',gap:'40px'}}>
        <div>
          <div className="eyebrow">07 — CONTACT</div>
          <h2 className="display" style={{fontSize:'40px',lineHeight:0.95,marginBottom:'18px'}}>Why this product wins?</h2>
          <div style={{display:'grid',gap:'18px',marginTop:'8px'}}>
            <div style={{display:'flex',gap:'14px'}}>
              <div style={{minWidth:'28px',height:'28px',borderRadius:'50%',background:'#ff3f0f',display:'grid',placeItems:'center',fontSize:'12px',fontWeight:800}}>01</div>
              <div><div style={{fontWeight:600}}>Ships for 1000+ users</div><div style={{fontSize:'13px',color:'#9a9aa3',marginTop:'4px'}}>Not toy projects — real RBAC, pipelines, background workers in production.</div></div>
            </div>
            <div style={{display:'flex',gap:'14px'}}>
              <div style={{minWidth:'28px',height:'28px',borderRadius:'50%',background:'#232328',display:'grid',placeItems:'center',fontSize:'12px',fontWeight:800}}>02</div>
              <div><div style={{fontWeight:600}}>Tests & Traceability</div><div style={{fontSize:'13px',color:'#9a9aa3',marginTop:'4px'}}>Jest/Vitest, Zod redaction, grounded quotes + page numbers.</div></div>
            </div>
            <div style={{display:'flex',gap:'14px'}}>
              <div style={{minWidth:'28px',height:'28px',borderRadius:'50%',background:'#232328',display:'grid',placeItems:'center',fontSize:'12px',fontWeight:800}}>03</div>
              <div><div style={{fontWeight:600}}>Product Thinking</div><div style={{fontSize:'13px',color:'#9a9aa3',marginTop:'4px'}}>Automation that cuts manual work, SSE vs WebSocket tradeoffs, durable Inngest workflows.</div></div>
            </div>
          </div>
          <div style={{marginTop:'24px',paddingTop:'20px',borderTop:'1px solid #1c1c22',display:'grid',gap:'10px',fontSize:'13px'}}>
            <a href="mailto:iskc9838@gmail.com" className="icon-link"><Icon type="gmail"/> iskc9838@gmail.com</a>
            <a href="tel:+919555196905" className="icon-link"><Icon type="phone"/> +91 9555196905</a>
            <div style={{fontSize:'12px',color:'#7a7a85',marginTop:'8px'}}>Gorakhpur, UP • VIT Bhopal • Remote • Onsite • Targeting SDE / Full-Stack</div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginTop:'8px'}}>
              <span className="pill">Gardening</span><span className="pill">Socializing + Humor</span><span className="pill">Swimming</span><span className="pill">Cricket</span>
            </div>
          </div>
        </div>
        <form onSubmit={submitContact} className="card" style={{display:'grid',gap:'14px',height:'fit-content'}}>
          <div style={{fontSize:'10px',letterSpacing:'2px',color:'#ff3f0f'}}>SEND INQUIRY — CONNECTED TO NODE/EXPRESS/MONGO</div>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" required style={{background:'#0a0a0c',border:'1px solid #232328',padding:'14px',borderRadius:'10px',color:'#fff',outline:'none'}} />
          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" required type="email" style={{background:'#0a0a0c',border:'1px solid #232328',padding:'14px',borderRadius:'10px',color:'#fff',outline:'none'}} />
          <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Role / project details..." required rows={4} style={{background:'#0a0a0c',border:'1px solid #232328',padding:'14px',borderRadius:'10px',color:'#fff',outline:'none',resize:'vertical'}} />
          <button disabled={sending} style={{background:'#ff3f0f',border:'none',padding:'14px',borderRadius:'10px',color:'#fff',fontWeight:700,letterSpacing:'0.5px',cursor:'pointer',transition:'.2s'}}>{sending?'SENDING...': sent ? 'SENT ✓ — Saved to MongoDB' : 'SEND INQUIRY'}</button>
          {submitError && <div role="alert" style={{fontSize:'12px',color:'#ff8a70'}}>{submitError}</div>}
          <div style={{fontSize:'11px',color:'#5a5a65'}}>POST /api/contact → Express → MongoDB (portfolio DB). Form tested and wired.</div>
        </form>
      </section>

      <footer style={{padding:'28px 5.5vw',borderTop:'1px solid #15151a',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px',color:'#7a7a85',fontSize:'11px',letterSpacing:'0.5px'}}>
        <div>© 2026 SKAND KUMAR CHOUBEY — PRODUCT ENGINEER • React • Node • Express • MongoDB</div>
        <div style={{display:'flex',gap:'20px'}}>
          <a href="https://github.com/Skc-VitInProjects" target="_blank" rel="noreferrer" className="icon-link"><Icon type="github"/> GitHub</a>
          <a href="https://linkedin.com/in/Skandkc" target="_blank" rel="noreferrer" className="icon-link"><Icon type="linkedin"/> LinkedIn</a>
          <a href="mailto:iskc9838@gmail.com" className="icon-link"><Icon type="gmail"/> Gmail</a>
        </div>
      </footer>
    </div>
  )
}
