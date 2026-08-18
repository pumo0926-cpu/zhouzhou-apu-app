import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Bell, BookOpen, BrainCircuit, CalendarDays, Camera, ChartNoAxesColumnIncreasing,
  Check, ChevronDown, ChevronLeft, ChevronRight, CircleUserRound, Clock3,
  FileCheck2, FileText, Flame, GraduationCap, House, Lightbulb, LockKeyhole,
  Medal, Menu, MessageCircleQuestion, NotebookPen, PenLine, Play, RotateCcw,
  ScanLine, Search, Settings, Sparkles, Star, Target, Trophy, UserRound,
  UsersRound, WandSparkles, X, Zap, ThumbsUp, Shirt, Crown
} from 'lucide-react';
import './styles.css';

const mascotAssets = {
  left: `${import.meta.env.BASE_URL}assets/dong-gaofen.webp`,
  center: `${import.meta.env.BASE_URL}assets/qin-lianxi.webp`,
  right: `${import.meta.env.BASE_URL}assets/ai-gaicuo.webp`
};

const memberOutfits = {
  daily: { label: '日常装', src: `${import.meta.env.BASE_URL}assets/qin-lianxi.webp` },
  scholar: { label: '学霸装', src: `${import.meta.env.BASE_URL}assets/qin-scholar.webp` },
  champion: { label: '冠军装', src: `${import.meta.env.BASE_URL}assets/qin-champion.webp` }
};

const modes = {
  visitor: { label: '游客', short: '游客', chip: '未注册', color: '#168b80' },
  registered: { label: '注册用户', short: '已注册', chip: '待领课', color: '#3b7fd8' },
  claimed: { label: '初级会员', short: '已领课', chip: '体验课', color: '#f07342' },
  apu: { label: '阿朴年会员', short: '阿朴年会员', chip: '正价课', color: '#7359c8' }
};

const modeCopy = {
  visitor: {
    eyebrow: '3分钟认识全新学习方法',
    title: '今天先把一个知识点\n真正学明白',
    desc: '从“会听”到“会做”，体验完整学练改闭环',
    button: '开始免费体验',
    meta: '· 无需注册 · 约12分钟'
  },
  registered: {
    eyebrow: '已注册 · 学习记录已开启',
    title: '欢迎回来\n领取适合你的课',
    desc: '完善年级和教材，免费开启学练改体验',
    button: '完善档案并领课',
    meta: '学习记录已云端保存 · 尚未领课'
  },
  claimed: {
    eyebrow: '初级会员 · 已领取体验课',
    title: '连续学习第 3 天\n把方法真正用起来',
    desc: '完成学练改任务，生成你的首份学情小结',
    button: '继续已领课程',
    meta: '体验权益还剩 5 天 · 今日已学 18 分钟'
  },
  apu: {
    eyebrow: '阿朴会员 · 八年级秋季第 4 周',
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
                  <span className={`menu-icon ${key}`}>{key === 'visitor' ? <UserRound /> : key === 'registered' ? <FileCheck2 /> : key === 'claimed' ? <Medal /> : <Trophy />}</span>
                  <span><b>{item.label}</b><small>{key === 'visitor' ? '未注册·基础体验' : key === 'registered' ? '已注册·等待领课' : key === 'claimed' ? '已领课·限时体验' : '已支付·年会员服务'}</small></span>
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

function MembershipStatus({ mode, setMode, onAction }) {
  const state = mode === 'visitor'
    ? { icon: UserRound, label: '当前为游客', detail: '注册后保留学习记录并解锁领课', action: '免费注册', next: 'registered' }
    : mode === 'registered'
      ? { icon: FileCheck2, label: '已注册·尚未领课', detail: '完善年级教材，即可领取 7 天体验课', action: '立即领课', next: 'claimed' }
      : mode === 'claimed'
        ? { icon: Medal, label: '已领课·体验权益生效中', detail: '还剩 5 天，支付后解锁全学年规划', action: '升级年会员', next: 'apu' }
        : { icon: Trophy, label: '阿朴年会员·正价课服务中', detail: '专属学习方案已更新，有效期至 2027.08', action: '查看权益', next: null };
  return <section className={`membership-status ${mode}`}>
    <span className="membership-icon"><state.icon size={19}/></span>
    <div><b>{state.label}</b><small>{state.detail}</small></div>
    <button onClick={() => state.next ? setMode(state.next) : onAction('阿朴会员权益')}>{state.action}<ChevronRight size={13}/></button>
  </section>;
}

const lifecycleStages = [
  { key: 'visitor', label: '游客' },
  { key: 'registered', label: '已注册' },
  { key: 'claimed', label: '已领课' },
  { key: 'apu', label: '年会员' }
];

function LifecyclePath({ mode }) {
  const activeIndex = lifecycleStages.findIndex(stage => stage.key === mode);
  return <section className="lifecycle-path" aria-label="用户权益路径">
    <div className="lifecycle-heading"><span>你的阿朴成长路径</span><b>{activeIndex + 1} / 4</b></div>
    <div className="lifecycle-steps">{lifecycleStages.map((stage, index) => <React.Fragment key={stage.key}>
      <div className={index < activeIndex ? 'completed' : index === activeIndex ? 'current' : ''}><span>{index < activeIndex ? <Check size={11}/> : index + 1}</span><small>{stage.label}</small></div>
      {index < lifecycleStages.length - 1 && <i className={index < activeIndex ? 'completed' : ''}/>}
    </React.Fragment>)}</div>
  </section>;
}

const stageAccess = {
  visitor: { current: ['学习方法介绍', '1 节同步体验'], next: '注册后可见', locked: ['云端学习记录', '个人学习档案', '体验课领取'] },
  registered: { current: ['云端学习记录', '年级教材设置', '个人学习档案'], next: '领课后可见', locked: ['7 天完整学练改', '笔记复习与错题复刷', '个人学情小结'] },
  claimed: { current: ['同步学练改', '笔记与错题复刷', '体验期学情小结'], next: '支付年会员后可见', locked: ['全学年个性化规划', '月考·期中·期末备考', 'IP 成长等级与衣橱'] }
};

function StageAccessCard({ mode }) {
  const data = stageAccess[mode];
  if (!data) return null;
  return <section className={`stage-access ${mode}`}>
    <div className="access-column"><b><Check size={13}/>当前可见</b>{data.current.map(item => <span key={item}>{item}</span>)}</div>
    <div className="access-column locked"><b><LockKeyhole size={13}/>{data.next}</b>{data.locked.map(item => <span key={item}>{item}</span>)}</div>
  </section>;
}

const memberFeatureGroups = [
  { title: '同步学', items: [
    { mark: '★', title: '同步畅学', wide: true }, { mark: '笔', title: '笔记复习' },
    { mark: '改', title: '错题复刷' }, { mark: '日', title: '真题天天练' }, { mark: '答', title: '主观题带练' }
  ]},
  { title: '节点突破练', items: [
    { mark: '月', title: '月考学练' }, { mark: '中', title: '期中学练' },
    { mark: '末', title: '期末学练' }, { mark: '播', title: '直播解读' }, { mark: '卷', title: '真题模拟卷', wide: true }
  ]},
  { title: '专属服务', items: [
    { mark: '计', title: '假期学习规划' }, { mark: '拍', title: '试卷拍照解读' }
  ]},
  { title: '家长必修', items: [
    { mark: '心', title: '青少年心理' }, { mark: '家', title: '亲子家长课堂' }
  ]}
];

function ApuMemberWorld({ onAction }) {
  const [outfit, setOutfit] = useState('scholar');
  const [points, setPoints] = useState(2680);
  const [likes, setLikes] = useState(128);
  const [liked, setLiked] = useState(false);
  const [reward, setReward] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const level = Math.floor(points / 500) + 1;
  const levelProgress = points % 500 / 5;
  const chooseFeature = (title) => {
    setPoints(value => value + 20);
    setReward(true);
    window.setTimeout(() => setReward(false), 900);
    onAction(`${title}·完成可得 20 成长值`);
  };
  const openFeature = (title) => {
    if (title === '同步畅学') {
      setPlanOpen(value => !value);
      return;
    }
    chooseFeature(title);
  };
  const cheer = () => {
    if (!liked) setLikes(value => value + 1);
    setLiked(true);
  };
  return <section className="apu-world">
    <div className="world-title">
      <span><Sparkles size={13}/>阿朴成长空间</span>
      <b>Lv.{level} 学习领航员</b>
    </div>
    <aside className="growth-rail">
      <div className="level-chip"><Crown size={13}/> LEVEL {level}</div>
      <div className="member-mascot">
        <img key={outfit} src={memberOutfits[outfit].src} alt={`秦练习${memberOutfits[outfit].label}`} />
        {reward && <i>+20</i>}
      </div>
      <div className="growth-stats">
        <span><Zap size={12}/><b>{points}</b><small>成长值</small></span>
        <button className={liked ? 'liked' : ''} onClick={cheer}><ThumbsUp size={12}/><b>{likes}</b><small>点赞</small></button>
      </div>
      <div className="level-progress"><span><i style={{width:`${levelProgress}%`}}/></span><small>距 Lv.{level + 1} 还差 {500 - points % 500}</small></div>
      <div className="wardrobe-title"><Shirt size={12}/>我的衣橱</div>
      <div className="wardrobe">
        {Object.entries(memberOutfits).map(([key, item], index) => <button key={key} className={outfit === key ? 'active' : ''} onClick={() => setOutfit(key)}>
          <span><img src={item.src} alt="" />{index === 2 && <Crown size={9}/>}</span><small>{item.label}</small>
        </button>)}
      </div>
      <p><Star size={11}/>完成学习任务获得成长值，解锁更多装扮</p>
    </aside>
    <div className="member-features">
      <div className="feature-intro"><b>阿朴会员学习中心</b><small>专属功能已全部开通</small></div>
      {memberFeatureGroups.map(group => <div className="feature-group" key={group.title}>
        <h3>{group.title}</h3>
        <div>{group.items.map(item => <React.Fragment key={item.title}>
          <button className={`${item.wide ? 'wide' : ''} ${item.title === '同步畅学' && planOpen ? 'plan-active' : ''}`.trim()} onClick={() => openFeature(item.title)} aria-expanded={item.title === '同步畅学' ? planOpen : undefined}><span>{item.mark}</span><b>{item.title}</b><ChevronRight size={11}/></button>
          {item.title === '同步畅学' && planOpen && <div className="inline-today-plan">
            <div className="inline-plan-head"><span><small>TODAY</small><b>今日学习计划</b></span><em><strong>2</strong> / 4 已完成</em></div>
            <div className="inline-plan-progress"><i /></div>
            <div className="inline-plan-list">{memberTasks.map((task, index) => <div className="inline-plan-task" key={task.title}>
              <span className={`inline-task-mark ${task.color}`}>{task.type}</span>
              <span><b>{task.title}</b><small>{task.sub}</small></span>
              {index < 2 ? <i className="inline-task-done"><Check size={10}/></i> : <em>{task.time}</em>}
            </div>)}</div>
          </div>}
        </React.Fragment>)}</div>
      </div>)}
    </div>
  </section>;
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

const memberTasks = [
  { type: '学', title: '一次函数：待定系数法', sub: '数学 · 同步新课', time: '12分钟', status: 'go', icon: Play, color: 'teal' },
  { type: '练', title: '函数图像分层练习', sub: '数学 · 8道精选题', time: '15分钟', status: 'go', icon: PenLine, color: 'orange' },
  { type: '背', title: 'Unit 3 核心词组', sub: '英语 · 20个待复习', time: '8分钟', status: 'go', icon: BrainCircuit, color: 'blue' },
  { type: '改', title: '昨日错题及时清', sub: '数学 2题 · 物理 1题', time: '10分钟', status: 'go', icon: RotateCcw, color: 'purple' }
];

function TaskList({ mode, onTask }) {
  const tasks = mode === 'visitor' ? visitorTasks : mode === 'registered' ? memberTasks.slice(0, 2) : mode === 'claimed' ? memberTasks.slice(0, 3) : memberTasks;
  const done = mode === 'visitor' || mode === 'registered' ? 0 : mode === 'claimed' ? 1 : 2;
  return (
    <section className="section-block tasks-section">
      <div className="section-heading">
        <div><span className="section-kicker">TODAY</span><h2>{mode === 'visitor' ? '一次完整体验' : mode === 'registered' ? '注册专享试学' : '今日学习计划'}</h2></div>
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
      <div><span>家长端</span><b>{mode === 'apu' ? '本周学习报告已更新' : '了解孩子真实学习情况'}</b><small>{mode === 'apu' ? '学习 4.2h · 掌握度提升 12%' : '不是只看分数，更要看方法和习惯'}</small></div>
      <button onClick={() => onAction('家长学习报告')}>{mode === 'apu' ? '查看报告' : '查看示例'}<ChevronRight size={15} /></button>
    </section>
  );
}

function HomePage({ mode, setMode, onTask, onAction, setPage }) {
  return <>
    <Hero mode={mode} onStart={() => setPage('study')} />
    <MembershipStatus mode={mode} setMode={setMode} onAction={onAction}/>
    <LifecyclePath mode={mode}/>
    <StageAccessCard mode={mode}/>
    {mode === 'apu' && <ApuMemberWorld onAction={onAction}/>}
    <JourneyStrip onJump={(c) => onAction(`${c.name}·${c.role}`)} />
    {mode !== 'apu' && <TaskList mode={mode} onTask={onTask} />}
    {(mode === 'claimed' || mode === 'apu') && <WeeklyPulse mode={mode} />}
    {mode === 'apu' && <ExamZone onAction={onAction} />}
    <ParentCard mode={mode} onAction={onAction} />
  </>;
}

function WeeklyPulse({ mode }) {
  return <section className="section-block pulse-card">
    <div className="section-heading"><div><span className="section-kicker">WEEKLY</span><h2>本周学习脉搏</h2></div><span className="trend"><ChartNoAxesColumnIncreasing size={15} /> 掌握度 +12%</span></div>
    <div className="week-days">{['一','二','三','四','五','六','日'].map((d,i)=><div key={d} className={i < (mode === 'apu' ? 4 : 3) ? 'done' : i === (mode === 'apu' ? 4 : 3) ? 'today' : ''}><span>{i < 4 ? <Check size={14}/> : i === 4 ? <Flame size={14}/> : ''}</span><small>{d}</small></div>)}</div>
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
      <div className="mastery"><div><span>章节掌握度</span><b>{mode==='visitor'||mode==='registered'?'--':'72'}<small>%</small></b></div><div className="mastery-ring" style={{'--p': mode==='visitor'||mode==='registered' ? 5 : 72}}><span>{mode==='visitor'||mode==='registered'?'?':'B'}</span></div></div>
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
      <button onClick={()=>onAction('我的笔记')}><span className="round-icon yellow"><NotebookPen/></span><small>我的笔记</small><b>{mode==='visitor'?'示例 3':mode==='registered'?0:mode==='claimed'?12:36}<em> 条</em></b><i>{mode==='registered'?'领课后开始积累':'本周新增 8 条'}</i></button>
      <button onClick={()=>onAction('错题本')}><span className="round-icon purple"><RotateCcw/></span><small>错题本</small><b>{mode==='visitor'?'示例 2':mode==='registered'?0:mode==='claimed'?8:21}<em> 题</em></b><i>{mode==='registered'?'领课后开始积累':'今日待复刷 3 题'}</i></button>
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
  const info = mode==='visitor'?['游客同学','未注册·学习记录仅本机保留','0']:mode==='registered'?['林小满','注册用户·尚未领课','0']:mode==='claimed'?['林小满','初级会员·体验课第 3 天','3']:['林小满','阿朴年会员·八年级正价课','28'];
  const upgrade = mode === 'visitor'
    ? { kicker: '注册后可见', title: '保留学习记录，开启个人档案', desc: '云端同步 · 解锁领课', action: '免费注册', next: 'registered' }
    : mode === 'registered'
      ? { kicker: '领课后可见', title: '免费领取 7 天学练改体验', desc: '同步课 · 错题复刷 · 学情小结', action: '立即领课', next: 'claimed' }
      : { kicker: '支付后可见', title: '升级阿朴年会员', desc: '完整学情 · 智能规划 · 全年备考', action: '了解年会员', next: 'apu' };
  return <div className="inner-page profile-page">
    <section className={`profile-head ${mode}`}><div className="profile-person"><div className="person-photo"><Avatar pos="center" size="sm"/></div><div><h2>{info[0]}<span>{modes[mode].chip}</span></h2><p>{info[1]}</p></div><button onClick={()=>onAction('个人资料')}><ChevronRight/></button></div>
      <div className="profile-stats"><div><b>{info[2]}</b><small>坚持天数</small></div><div><b>{mode==='visitor'||mode==='registered'?'--':'12.6'}<em>h</em></b><small>累计学习</small></div><div><b>{mode==='apu'?'82%':'--'}</b><small>同龄排名</small></div></div>
    </section>
    {mode!=='apu'&&<section className="upgrade-card"><span className="vip-gem"><Sparkles/></span><div><small>{upgrade.kicker}</small><b>{upgrade.title}</b><p>{upgrade.desc}</p></div><button onClick={()=>setMode(upgrade.next)}>{upgrade.action}</button></section>}
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
        <div className="sheet-symbol lock"><LockKeyhole/></div><span className="sheet-kicker">注册后继续解锁</span><h2>先完成“学”，再进入“{data.title?.charAt(0)}”</h2><p>阿朴会根据你的学习结果动态调整后面的练习，先注册保留学习记录，再领课解锁完整流程。</p><button className="sheet-primary" onClick={close}>去完成第一项 <ChevronRight size={17}/></button><button className="sheet-secondary" onClick={upgrade}>免费注册</button>
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
  const queryMode = new URLSearchParams(window.location.search).get('mode');
  const previewMode = queryMode === 'junior' ? 'claimed' : queryMode;
  const [mode, setMode] = useState(modes[previewMode] ? previewMode : 'apu');
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
    home: <HomePage mode={mode} setMode={setMode} onTask={taskAction} onAction={openAction} setPage={setPage}/>,
    study: <StudyPage mode={mode} onTask={taskAction} onAction={openAction}/>,
    review: <ReviewPage mode={mode} onAction={openAction}/>,
    exam: <ExamPage mode={mode} onAction={openAction}/>,
    profile: <ProfilePage mode={mode} setMode={setMode} onAction={openAction}/>
  })[page], [page,mode]);
  return <div className="app-shell" onClick={()=>openMode&&setOpenMode(false)}>
    <Header mode={mode} setMode={setMode} openMode={openMode} setOpenMode={setOpenMode} onBell={notify}/>
    <main>{content}</main>
    <BottomNav page={page} setPage={setPage}/>
    <ActionSheet data={sheet} close={()=>setSheet(null)} mode={mode} upgrade={()=>{setMode('registered');setSheet(null);notify();}}/>
    <Toast text={toast}/>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
