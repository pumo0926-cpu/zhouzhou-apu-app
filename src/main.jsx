import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Bell, BookOpen, BrainCircuit, CalendarDays, Camera, ChartNoAxesColumnIncreasing,
  Check, ChevronDown, ChevronLeft, ChevronRight, CircleUserRound, Clock3,
  FileCheck2, FileText, Flame, GraduationCap, House, Lightbulb, LockKeyhole,
  Medal, Menu, MessageCircleQuestion, NotebookPen, PenLine, Play, RotateCcw,
  ScanLine, Search, Settings, Sparkles, Star, Target, Trophy, UserRound,
  UsersRound, WandSparkles, X, Zap
} from 'lucide-react';
import './styles.css';

const mascotAssets = {
  left: `${import.meta.env.BASE_URL}assets/dong-gaofen.webp`,
  center: `${import.meta.env.BASE_URL}assets/qin-lianxi.webp`,
  right: `${import.meta.env.BASE_URL}assets/ai-gaicuo.webp`
};

const modes = {
  visitor: { label: '游客体验', short: '游客', chip: '免费体验', color: '#168b80' },
  camp: { label: '7天训练营', short: '训练营', chip: 'DAY 3', color: '#f07342' },
  vip: { label: '年课 VIP', short: 'VIP', chip: 'VIP', color: '#7359c8' }
};

const modeCopy = {
  visitor: {
    eyebrow: '3分钟认识全新学习方法',
    title: '今天先把一个知识点\n真正学明白',
    desc: '从“会听”到“会做”，体验完整学练改闭环',
    button: '开始免费体验',
    meta: '· 无需注册 · 约12分钟'
  },
  camp: {
    eyebrow: '7天提分训练营 · DAY 3',
    title: '连续学习第 3 天\n比昨天更进一步',
    desc: '今天完成 3 个任务，解锁专属学情报告',
    button: '继续今日训练',
    meta: '今日已学 18 分钟 · 还剩 2 项'
  },
  vip: {
    eyebrow: '八年级 · 秋季第 4 周',
    title: '上午好，林小满\n今天按节奏稳稳学',
    desc: '为你智能安排 5 项任务，预计 45 分钟完成',
    button: '开始今日学习',
    meta: '本周已坚持 4 天 · 超过 82% 同学'
  }
};

const characters = [
  { name: '董高分', role: '知识讲透', tag: '学', pos: 'left', copy: '找准关键，把难点讲明白' },
  { name: '秦练习', role: '分层训练', tag: '练', pos: 'center', copy: '由浅入深，把方法练熟练' },
  { name: '艾改错', role: '错因诊断', tag: '改', pos: 'right', copy: '找到错因，把漏洞真正补上' }
];

const navItems = [
  { id: 'home', label: 'UP页', icon: House },
  { id: 'study', label: '开启学', icon: Play, primary: true },
  { id: 'profile', label: '我的', icon: CircleUserRound }
];

function Avatar({ pos = 'left', size = 'md' }) {
  return <div className={`avatar avatar-${pos} avatar-${size}`} style={{ backgroundImage: `url(${mascotAssets[pos]})` }} role="img" aria-label="周周阿朴IP角色" />;
}

function Header({ mode, setMode, openMode, setOpenMode, onBell }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="brand-mark">周</span>
        <span><b>周周阿朴</b><small>初中学练改</small></span>
      </button>
      <div className="top-actions">
        <div className="mode-wrap">
          <button className={`mode-chip ${mode}`} onClick={() => setOpenMode(!openMode)}>
            <span className="mode-dot" />{modes[mode].short}<ChevronDown size={13} />
          </button>
          {openMode && (
            <div className="mode-menu">
              <div className="menu-title">切换体验身份</div>
              {Object.entries(modes).map(([key, item]) => (
                <button key={key} className={mode === key ? 'active' : ''} onClick={() => { setMode(key); setOpenMode(false); }}>
                  <span className={`menu-icon ${key}`}>{key === 'visitor' ? <UserRound /> : key === 'camp' ? <Flame /> : <Trophy />}</span>
                  <span><b>{item.label}</b><small>{key === 'visitor' ? '基础功能体验' : key === 'camp' ? '产品深度体验' : '完整个性化服务'}</small></span>
                  {mode === key && <Check size={17} />}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="icon-button" onClick={onBell} aria-label="消息"><Bell size={20} /><i /></button>
      </div>
    </header>
  );
}

function Hero({ mode, onStart }) {
  const copy = modeCopy[mode];
  return (
    <section className={`hero hero-${mode}`}>
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={14} />{copy.eyebrow}</div>
        <h1>{copy.title.split('\n').map((s, i) => <React.Fragment key={s}>{s}{i === 0 && <br />}</React.Fragment>)}</h1>
        <p>{copy.desc}</p>
        <button className="primary-button" onClick={onStart}>{copy.button}<ChevronRight size={18} /></button>
        <small className="hero-meta">{copy.meta}</small>
      </div>
      <div className="hero-art">
        <img className="hero-character hero-dong" src={mascotAssets.left} alt="董高分" />
        <img className="hero-character hero-qin" src={mascotAssets.center} alt="秦练习" />
        <img className="hero-character hero-ai" src={mascotAssets.right} alt="艾改错" />
        <span className="art-bubble bubble-a">学会方法</span>
        <span className="art-bubble bubble-b">解决问题</span>
      </div>
    </section>
  );
}

function JourneyStrip({ onJump }) {
  return (
    <section className="journey-strip">
      <div className="journey-title"><span>阿朴学习法</span><b>每一道题，都走完“学 · 练 · 改”</b></div>
      <div className="journey-steps">
        {characters.map((c, index) => (
          <React.Fragment key={c.name}>
            <button className={`journey-step step-${index}`} onClick={() => onJump(c)}>
              <Avatar pos={c.pos} size="sm" />
              <span className="step-tag">{c.tag}</span>
              <span><b>{c.role}</b><small>{c.copy}</small></span>
            </button>
            {index < 2 && <ChevronRight className="journey-arrow" size={18} />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

const visitorTasks = [
  { type: '学', title: '一次函数：看懂图像变化', sub: '董高分 · 动画精讲 5分钟', time: '05:00', status: 'go', icon: Play, color: 'teal' },
  { type: '练', title: '3道题练会核心方法', sub: '秦练习 · 难度循序渐进', time: '3题', status: 'lock', icon: PenLine, color: 'orange' },
  { type: '改', title: '看懂错因，举一反三', sub: '艾改错 · 个性化讲解', time: '1题', status: 'lock', icon: RotateCcw, color: 'purple' }
];

const vipTasks = [
  { type: '学', title: '一次函数：待定系数法', sub: '数学 · 同步新课', time: '12分钟', status: 'go', icon: Play, color: 'teal' },
  { type: '练', title: '函数图像分层练习', sub: '数学 · 8道精选题', time: '15分钟', status: 'go', icon: PenLine, color: 'orange' },
  { type: '背', title: 'Unit 3 核心词组', sub: '英语 · 20个待复习', time: '8分钟', status: 'go', icon: BrainCircuit, color: 'blue' },
  { type: '改', title: '昨日错题及时清', sub: '数学 2题 · 物理 1题', time: '10分钟', status: 'go', icon: RotateCcw, color: 'purple' }
];

function TaskList({ mode, onTask }) {
  const tasks = mode === 'visitor' ? visitorTasks : mode === 'camp' ? vipTasks.slice(0, 3) : vipTasks;
  const done = mode === 'visitor' ? 0 : mode === 'camp' ? 1 : 2;
  return (
    <section className="section-block tasks-section">
      <div className="section-heading">
        <div><span className="section-kicker">TODAY</span><h2>{mode === 'visitor' ? '一次完整体验' : '今日学习计划'}</h2></div>
        <div className="progress-label"><b>{done}</b> / {tasks.length} 已完成</div>
      </div>
      <div className="progress-track"><span style={{ width: `${Math.max(5, done / tasks.length * 100)}%` }} /></div>
      <div className="task-list">
        {tasks.map((task, index) => {
          const locked = mode === 'visitor' && index > 0;
          const completed = index < done;
          return (
            <button key={task.title} className={`task-item ${locked ? 'locked' : ''}`} onClick={() => onTask(task, locked)}>
              <span className={`task-icon ${task.color}`}><task.icon size={21} /></span>
              <span className="task-copy"><span className={`mini-badge ${task.color}`}>{task.type}</span><b>{task.title}</b><small>{task.sub}</small></span>
              <span className="task-tail">{completed ? <span className="done-icon"><Check size={15} /></span> : locked ? <LockKeyhole size={17} /> : <><small>{task.time}</small><ChevronRight size={18} /></>}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ExamZone({ onAction }) {
  const zones = [
    { title: '期中备考', sub: '距考试 18 天', icon: Target, tone: 'coral', status: '正在进行' },
    { title: '月考复盘', sub: '薄弱点 3 个', icon: ChartNoAxesColumnIncreasing, tone: 'purple', status: '查看建议' },
    { title: '试卷诊断', sub: '拍照生成报告', icon: ScanLine, tone: 'teal', status: '立即诊断' },
    { title: '假期规划', sub: '查漏补缺方案', icon: CalendarDays, tone: 'yellow', status: '智能规划' }
  ];
  return (
    <section className="section-block">
      <div className="section-heading">
        <div><span className="section-kicker">EXAM</span><h2>学习节点专区</h2></div>
        <button className="text-button" onClick={() => onAction('全部备考专区')}>全部 <ChevronRight size={15} /></button>
      </div>
      <div className="zone-grid">
        {zones.map(z => <button className={`zone-card ${z.tone}`} key={z.title} onClick={() => onAction(z.title)}>
          <span className="zone-icon"><z.icon size={22} /></span>
          <b>{z.title}</b><small>{z.sub}</small><em>{z.status} <ChevronRight size={13} /></em>
        </button>)}
      </div>
    </section>
  );
}

function ParentCard({ mode, onAction }) {
  return (
    <section className="parent-card">
      <div className="parent-icon"><UsersRound size={24} /></div>
      <div><span>家长端</span><b>{mode === 'vip' ? '本周学习报告已更新' : '了解孩子真实学习情况'}</b><small>{mode === 'vip' ? '学习 4.2h · 掌握度提升 12%' : '不是只看分数，更要看方法和习惯'}</small></div>
      <button onClick={() => onAction('家长学习报告')}>{mode === 'vip' ? '查看报告' : '查看示例'}<ChevronRight size={15} /></button>
    </section>
  );
}

function HomePage({ mode, onTask, onAction, setPage }) {
  return <>
    <Hero mode={mode} onStart={() => setPage('study')} />
    <JourneyStrip onJump={(c) => onAction(`${c.name}·${c.role}`)} />
    <TaskList mode={mode} onTask={onTask} />
    {mode !== 'visitor' && <WeeklyPulse mode={mode} />}
    <ExamZone onAction={onAction} />
    <ParentCard mode={mode} onAction={onAction} />
  </>;
}

function WeeklyPulse({ mode }) {
  return <section className="section-block pulse-card">
    <div className="section-heading"><div><span className="section-kicker">WEEKLY</span><h2>本周学习脉搏</h2></div><span className="trend"><ChartNoAxesColumnIncreasing size={15} /> 掌握度 +12%</span></div>
    <div className="week-days">{['一','二','三','四','五','六','日'].map((d,i)=><div key={d} className={i < (mode === 'vip' ? 4 : 3) ? 'done' : i === (mode === 'vip' ? 4 : 3) ? 'today' : ''}><span>{i < 4 ? <Check size={14}/> : i === 4 ? <Flame size={14}/> : ''}</span><small>{d}</small></div>)}</div>
    <div className="pulse-advice"><Avatar pos="left" size="xs" /><span><b>董高分建议</b>函数图像读得越来越准了，周末再巩固一次易错点。</span><ChevronRight size={18}/></div>
  </section>;
}

function StudyPage({ mode, onTask, onAction }) {
  const subjects = ['数学', '英语', '物理', '语文'];
  const [subject, setSubject] = useState('数学');
  return <div className="inner-page">
    <PageTitle eyebrow="LEARN WITH APU" title="同步学练改" desc="跟着校内进度，把每一个知识点学扎实" />
    <div className="subject-tabs">{subjects.map(s=><button className={subject===s?'active':''} onClick={()=>setSubject(s)} key={s}>{s}</button>)}</div>
    <section className="chapter-card">
      <div className="chapter-top"><span><small>当前章节</small><b>第十四章 · 一次函数</b></span><button onClick={()=>onAction('切换教材章节')}>切换章节 <ChevronRight size={14}/></button></div>
      <div className="mastery"><div><span>章节掌握度</span><b>{mode==='visitor'?'--':'72'}<small>%</small></b></div><div className="mastery-ring" style={{'--p': mode==='visitor' ? 5 : 72}}><span>{mode==='visitor'?'?':'B'}</span></div></div>
    </section>
    <TaskList mode={mode} onTask={onTask} />
    <section className="knowledge-map section-block">
      <div className="section-heading"><div><span className="section-kicker">MAP</span><h2>知识掌握地图</h2></div><button className="text-button" onClick={()=>onAction('知识图谱')}>查看全图 <ChevronRight size={14}/></button></div>
      {[['正比例函数','已掌握',92],['一次函数的图像','学习中',68],['一次函数的性质','待加强',46],['待定系数法','未开始',8]].map(([n,s,p])=><button key={n} onClick={()=>onAction(n)}><span className="map-dot" style={{opacity:.35+p/150}}/><span><b>{n}</b><small>{s}</small></span><div><i style={{width:`${p}%`}}/><em>{p}%</em></div><ChevronRight size={16}/></button>)}
    </section>
  </div>;
}

function ReviewPage({ mode, onAction }) {
  return <div className="inner-page">
    <PageTitle eyebrow="REVIEW" title="复习本" desc="笔记随时复习，错题定时重做" />
    <div className="review-overview">
      <button onClick={()=>onAction('我的笔记')}><span className="round-icon yellow"><NotebookPen/></span><small>我的笔记</small><b>{mode==='visitor'?'示例 3':36}<em> 条</em></b><i>本周新增 8 条</i></button>
      <button onClick={()=>onAction('错题本')}><span className="round-icon purple"><RotateCcw/></span><small>错题本</small><b>{mode==='visitor'?'示例 2':21}<em> 题</em></b><i>今日待复刷 3 题</i></button>
    </div>
    <section className="section-block review-plan">
      <div className="section-heading"><div><span className="section-kicker">SMART REVIEW</span><h2>今日智能复习</h2></div><span className="count-badge">约 12 分钟</span></div>
      <div className="review-hero"><Avatar pos="right" size="md"/><div><span><WandSparkles size={14}/> 艾改错已为你整理</span><h3>趁还没忘，再巩固一下吧</h3><p>根据遗忘曲线和近期错题生成</p><button onClick={()=>onAction('开始智能复习')}>开始复习 <ChevronRight size={16}/></button></div></div>
      {['一次函数图像辨析','英语 Unit 3 重点词组','物理密度计算易错题'].map((t,i)=><button className="simple-row" key={t} onClick={()=>onAction(t)}><span>{i+1}</span><b>{t}</b><small>{[3,5,2][i]} 项</small><ChevronRight size={16}/></button>)}
    </section>
  </div>;
}

function ExamPage({ mode, onAction }) {
  return <div className="inner-page">
    <PageTitle eyebrow="EXAM READY" title="节点备考" desc="不同考试节点，给你刚刚好的复习安排" />
    <section className="exam-hero">
      <div><span><Clock3 size={14}/> 距期中考试还有</span><h2>18 <small>天</small></h2><p>已完成第一阶段：知识漏洞扫描</p><div className="exam-progress"><i/></div><button onClick={()=>onAction(mode==='visitor'?'解锁备考方案':'继续备考计划')}>{mode==='visitor'?'查看示例方案':'继续今日计划'}<ChevronRight size={16}/></button></div>
      <div className="calendar-visual"><span>10月</span><b>28</b><small>期中考试</small></div>
    </section>
    <section className="section-block"><div className="section-heading"><div><span className="section-kicker">TOOLS</span><h2>备考工具箱</h2></div></div>
      <div className="tool-list">
        {[['试卷智能诊断','上传试卷，5分钟找到失分原因',Camera,'teal'],['个性化备考建议','基于学情，安排每日复习重点',Lightbulb,'yellow'],['考前易错清单','只复习最容易丢分的关键题',FileCheck2,'purple'],['考后复盘报告','看清进步，也看清下一步',ChartNoAxesColumnIncreasing,'coral']].map(([t,s,I,c])=><button key={t} onClick={()=>onAction(t)}><span className={`round-icon ${c}`}><I/></span><span><b>{t}</b><small>{s}</small></span><ChevronRight size={17}/></button>)}
      </div>
    </section>
    <ExamZone onAction={onAction}/>
  </div>;
}

function ProfilePage({ mode, setMode, onAction }) {
  const info = mode==='visitor'?['游客同学','注册后同步学习记录','0']:mode==='camp'?['林小满','7天提分训练营 · 第3天','3']:['林小满','八年级 · 年课VIP','28'];
  return <div className="inner-page profile-page">
    <section className={`profile-head ${mode}`}><div className="profile-person"><div className="person-photo"><Avatar pos="center" size="sm"/></div><div><h2>{info[0]}<span>{modes[mode].chip}</span></h2><p>{info[1]}</p></div><button onClick={()=>onAction('个人资料')}><ChevronRight/></button></div>
      <div className="profile-stats"><div><b>{info[2]}</b><small>坚持天数</small></div><div><b>{mode==='visitor'?'--':'12.6'}<em>h</em></b><small>累计学习</small></div><div><b>{mode==='vip'?'82%':'--'}</b><small>同龄排名</small></div></div>
    </section>
    {mode!=='vip'&&<section className="upgrade-card"><span className="vip-gem"><Sparkles/></span><div><small>周周阿朴年课</small><b>让每一天，都学得刚刚好</b><p>完整学情 · 智能规划 · 全年备考</p></div><button onClick={()=>setMode('vip')}>了解年课</button></section>}
    <section className="section-block family-section"><div className="section-heading"><div><span className="section-kicker">FAMILY</span><h2>家长服务</h2></div></div>
      <div className="profile-menu">{[[UsersRound,'家长学习报告','每周掌握孩子学习情况'],[MessageCircleQuestion,'学习顾问','随时解答学习规划问题'],[CalendarDays,'学习计划','查看本周安排与完成情况']].map(([I,t,s])=><button key={t} onClick={()=>onAction(t)}><I/><span><b>{t}</b><small>{s}</small></span><ChevronRight/></button>)}</div>
    </section>
    <section className="section-block settings-block"><div className="profile-menu">{[[FileText,'订单与课程'],[Settings,'设置与帮助']].map(([I,t])=><button key={t} onClick={()=>onAction(t)}><I/><span><b>{t}</b></span><ChevronRight/></button>)}</div></section>
  </div>;
}

function PageTitle({ eyebrow, title, desc }) { return <div className="page-title"><span>{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div>; }

function BottomNav({ page, setPage }) {
  return <nav className="bottom-nav" aria-label="主导航">{navItems.map(item=><button key={item.id} aria-current={page===item.id?'page':undefined} className={`${page===item.id?'active':''} ${item.primary?'primary-tab':''}`} onClick={()=>{setPage(item.id);window.scrollTo({top:0,behavior:'smooth'})}}><span><item.icon size={item.primary?24:21}/></span><small>{item.label}</small></button>)}</nav>;
}

function ActionSheet({ data, close, mode, upgrade }) {
  if (!data) return null;
  const locked = data.locked;
  return <div className="sheet-backdrop" onMouseDown={(e)=>{if(e.target===e.currentTarget)close()}}>
    <div className="action-sheet">
      <button className="sheet-close" onClick={close}><X size={19}/></button>
      {data.type === 'diagnosis' ? <DiagnosisContent close={close}/> : locked ? <>
        <div className="sheet-symbol lock"><LockKeyhole/></div><span className="sheet-kicker">完整体验继续解锁</span><h2>先完成“学”，再进入“{data.title?.charAt(0)}”</h2><p>阿朴会根据你的学习结果动态调整后面的练习，完成第一步后即可解锁。</p><button className="sheet-primary" onClick={close}>去完成第一项 <ChevronRight size={17}/></button><button className="sheet-secondary" onClick={upgrade}>了解训练营</button>
      </> : <>
        <div className="sheet-symbol"><Sparkles/></div><span className="sheet-kicker">{mode==='visitor'?'功能预览':'为你准备好了'}</span><h2>{data.title}</h2><p>{data.subtitle || '基于你的最新学情生成个性化内容，学习记录会自动同步到成长报告。'}</p>
        <div className="sheet-feature"><Check/> 智能匹配当前学习进度</div><div className="sheet-feature"><Check/> 完成后即时反馈掌握情况</div>
        <button className="sheet-primary" onClick={close}>{mode==='visitor'?'查看体验内容':'立即开始'} <ChevronRight size={17}/></button>
      </>}
    </div>
  </div>;
}

function DiagnosisContent({ close }) {
  return <><div className="sheet-symbol scan"><ScanLine/></div><span className="sheet-kicker">AI 试卷诊断</span><h2>拍下试卷，找到真正失分点</h2><p>请将整张试卷平铺在光线充足的桌面，确保四角完整、文字清晰。</p><div className="upload-zone"><Camera size={30}/><b>拍照或从相册上传</b><small>支持单张 / 多张试卷</small></div><button className="sheet-primary" onClick={close}>模拟上传试卷 <ChevronRight size={17}/></button></>;
}

function Toast({ text }) { return text ? <div className="toast"><Check size={16}/>{text}</div> : null; }

function App() {
  const [mode, setMode] = useState('vip');
  const [page, setPage] = useState('home');
  const [openMode, setOpenMode] = useState(false);
  const [sheet, setSheet] = useState(null);
  const [toast, setToast] = useState('');
  const openAction = (title) => {
    if (title === '试卷诊断' || title === '试卷智能诊断') setSheet({type:'diagnosis', title});
    else setSheet({title, subtitle: title.includes('报告') ? '报告汇总了学习时长、知识掌握、学习习惯和下周建议。' : undefined});
  };
  const taskAction = (task, locked) => setSheet({title:task.title, locked, subtitle:task.sub});
  const notify = () => { setToast('暂无新消息，今日计划已更新'); setTimeout(()=>setToast(''),2400); };
  const content = useMemo(() => ({
    home: <HomePage mode={mode} onTask={taskAction} onAction={openAction} setPage={setPage}/>,
    study: <StudyPage mode={mode} onTask={taskAction} onAction={openAction}/>,
    review: <ReviewPage mode={mode} onAction={openAction}/>,
    exam: <ExamPage mode={mode} onAction={openAction}/>,
    profile: <ProfilePage mode={mode} setMode={setMode} onAction={openAction}/>
  })[page], [page,mode]);
  return <div className="app-shell" onClick={()=>openMode&&setOpenMode(false)}>
    <Header mode={mode} setMode={setMode} openMode={openMode} setOpenMode={setOpenMode} onBell={notify}/>
    <main>{content}</main>
    <BottomNav page={page} setPage={setPage}/>
    <ActionSheet data={sheet} close={()=>setSheet(null)} mode={mode} upgrade={()=>{setMode('camp');setSheet(null);notify();}}/>
    <Toast text={toast}/>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
