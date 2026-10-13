// ==UserScript==
// @name         StarCraft: Ashfall — 实时修改器 (DSH Trainer)
// @namespace    dsh.trainer.ashfall
// @version      1.2.0
// @description  实时修改《StarCraft: Ashfall》游戏数据：全体免伤、锁定满血、伤害倍率、一键清场、击杀数、等级/研究/武器、满编部队、BOSS、跳层、0.1x~100x 时间倍率、一键解锁。基于游戏内置调试通道实现，非内存猜测。
// @author       DSH
// @match        https://starcraft-shooter-2026.pages.dev/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  if (window.__dshAshfallTrainer) return;
  window.__dshAshfallTrainer = true;

  const TICK_MS = 120;

  /* ==========================================================================
   * 1) 门禁旁路
   *
   * 游戏内部：
   *   Pu = /^(localhost|127\.\d+\.\d+\.\d+|\[?::1\]?|192\.168\..|10\..|172\.(1[6-9]|2\d|3[01])\..)$/
   *   Fu = () => Pu.test(location.hostname)          // 导出为 Bt()
   *
   * 只有它是真，才会放出 window.__debugBattle / __debugScene / __debugSound、
   * 开发者预设条 (.dev-presets)、以及 Artanis + Swann 指挥官。
   *
   * 这里只在该正则检测 location.hostname 的那一次调用上旁路，
   * 其余 RegExp.prototype.test 调用原样透传，零副作用。
   * ========================================================================== */
  const _test = RegExp.prototype.test;
  let gateHits = 0;

  RegExp.prototype.test = function (s) {
    try {
      if (
        typeof s === 'string' &&
        s === location.hostname &&
        this.source &&
        this.source.indexOf('localhost') !== -1 &&
        this.source.indexOf('192') !== -1
      ) {
        gateHits++;
        return true;
      }
    } catch (_) {}
    return _test.call(this, s);
  };

  /* ==========================================================================
   * 2) 补 ?debug —— 让游戏额外放出 __debugScene / __debugSound 与性能面板。
   *    module 脚本是 deferred，此处改 URL 无需重新加载。
   * ========================================================================== */
  try {
    if (!new URLSearchParams(location.search).has('debug')) {
      const u = new URL(location.href);
      u.searchParams.set('debug', '');
      history.replaceState(null, '', u.pathname + u.search + u.hash);
    }
  } catch (_) {}

  /* ==========================================================================
   * 3) 时间倍率（0.10x ~ 100x）
   *
   * 主循环：
   *   function sa(e){ let t = Math.max(.001, (e - na) / 1e3); na = e;
   *                   let i = Math.min(.05, t);              // ← 单帧 50ms 硬钳
   *                   ... for (Tt += i * en() * Gt; Tt >= 1/60;)
   *                         { Tt -= 1/60; L.step(1/60) } }
   * e 是 rAF 时间戳，缩放它即可整体变速；但那个 .05 钳制把加速锁死在
   * 60fps 下的 50/16.7 ≈ 3x —— 想把倍率开到 100x，必须同时让 i 拿到全量。
   *
   * 两手配合：
   *   a. wrapRaf() 给每个 rAF 回调单独累加虚拟时间戳，并对单帧增量设上限 CAP_MS，
   *      免得长帧（切标签页回来等）让引擎的步进循环一次炸出上千步；
   *   b. rate > 1 时把 Math.min 换成只认 Math.min(0.05, x>0.05) 这一个签名的
   *      版本并放行全量，其它调用一律原样透传；rate <= 1 时立刻还原原生
   *      Math.min，不留任何全局开销。
   *
   * 注意实测环境：headless 软渲染只有个位数帧率，单帧虚拟增量会顶到 CAP，
   * 因此测出的实得倍率低于标称值 —— 那是帧率上限，不是脚本没生效。
   * ========================================================================== */
  const _raf = window.requestAnimationFrame.bind(window);
  const wrapped = new WeakMap();
  const _min = Math.min;

  const CAP_MS = 2500; // 单帧虚拟时间增量上限 → 最多 150 步/帧
  let rate = 1;
  let unclampHits = 0;
  let patched = false;

  /* 每个 rAF 回调各自持有一份计时基准。
   * 若把 lastReal/virt 提到外层共享，同一帧里游戏的 oa 与其它回调会互相吃增量：
   * 只有第一个拿到 dt，其余全被算成 0 —— 游戏会莫名其妙变慢一半。 */
  function wrapRaf(cb) {
    let lastReal = null;
    let virt = 0;
    return function (ts) {
      if (lastReal === null) {
        // 首帧用真实量级初始化，避免给出一个远小于 performance.now() 的绝对时间戳
        lastReal = ts;
        virt = ts;
        cb(virt);
        return;
      }
      let dt = ts - lastReal;
      lastReal = ts;
      if (!(dt > 0)) dt = 0;
      let vdt = dt * rate;
      if (vdt > CAP_MS) vdt = CAP_MS;
      virt += vdt;
      cb(virt);
    };
  }

  window.requestAnimationFrame = function (cb) {
    let w = wrapped.get(cb);
    if (!w) {
      w = wrapRaf(cb);
      wrapped.set(cb, w);
    }
    return _raf(w);
  };

  function patchedMin(a, b) {
    if (a === 0.05 && arguments.length === 2 && typeof b === 'number' && b > 0.05) {
      unclampHits++;
      return b;
    }
    return _min.apply(Math, arguments);
  }

  function setUnclamp(on) {
    if (on === patched) return;
    Math.min = on ? patchedMin : _min;
    patched = on;
  }

  function setRate(r) {
    rate = r;
    setUnclamp(r > 1);
  }

  // 滑块 0..1000 指数映射到 0.10x..100x，低倍率区间照样有足够行程
  const RATE_MIN = 0.1;
  const RATE_MAX = 100;
  const RATE_SPAN = Math.log(RATE_MAX / RATE_MIN);
  const toRate = (v) => RATE_MIN * Math.exp((RATE_SPAN * v) / 1000);
  const toSlider = (r) => Math.round((1000 * Math.log(r / RATE_MIN)) / RATE_SPAN);

  /* ==========================================================================
   * 4) 输入隔离
   *
   * 游戏只在 window 捕获阶段监听全局输入：keydown / keyup / pointerdown
   * （pointerdown 仅用于记录输入方式），其余鼠标交互都是元素级监听。
   * 面板挂在 Shadow DOM 中，元素级事件本来就传不到游戏元素。
   *
   * 所以只需隔离这三类 window 级事件。click / mousedown / mousemove 必须放行 ——
   * window 捕获阶段的 stopImmediatePropagation 会连带切断面板自身的处理器
   * （面板的最初版本就是这么哑掉的）。
   * ========================================================================== */
  let hostEl = null;
  const GUARDED = ['keydown', 'keyup', 'keypress', 'pointerdown', 'touchstart'];

  for (const type of GUARDED) {
    window.addEventListener(
      type,
      function (e) {
        if (!hostEl) return;
        const path = e.composedPath ? e.composedPath() : [];
        // 不 preventDefault：面板输入框仍靠默认行为正常录入字符
        if (path.indexOf(hostEl) !== -1) e.stopImmediatePropagation();
      },
      true
    );
  }

  /* ==========================================================================
   * 5) 修改器内核
   * ========================================================================== */
  const battle = () => (window.__debugBattle && window.__debugBattle.marines ? window.__debugBattle : null);
  const protoOf = (L) => Object.getPrototypeOf(L);

  const state = {
    invincible: false, // 覆盖 L.damageUnit
    lockHp: false, // 每 tick 把友军 hp 拉满
    lockLine: false, // leakDamage 锁定 0
    damageMult: 1, // 敌人受击倍率
    bossMult: 1, // BOSS 受击倍率
  };

  // ---- 免伤：实例级遮蔽原型方法，关闭时 delete 还原 ----
  function applyInvincible(on) {
    const L = battle();
    if (!L) return false;
    if (on) {
      const proto = protoOf(L);
      L.__dshOrigDamageUnit = proto.damageUnit;
      L.damageUnit = function () {
        return false;
      };
    } else {
      try {
        delete L.damageUnit;
      } catch (_) {
        if (L.__dshOrigDamageUnit) L.damageUnit = L.__dshOrigDamageUnit;
      }
    }
    return true;
  }

  // ---- 伤害倍率：包一层，转调原型 ----
  function applyDamageMult() {
    const L = battle();
    if (!L) return false;
    const proto = protoOf(L);
    if (!L.__dshOrigDamageEnemy) L.__dshOrigDamageEnemy = proto.damageEnemy;
    if (!L.__dshOrigDamageBoss) L.__dshOrigDamageBoss = proto.damageBoss;

    const em = state.damageMult;
    const bm = state.bossMult;

    if (em === 1) {
      delete L.damageEnemy;
    } else {
      L.damageEnemy = function (e, t, n, r) {
        return proto.damageEnemy.call(this, e, (t || 0) * em, n, r);
      };
    }
    if (bm === 1) {
      delete L.damageBoss;
    } else {
      L.damageBoss = function (t, n) {
        return proto.damageBoss.call(this, (t || 0) * bm, n);
      };
    }
    return true;
  }

  function tick() {
    const L = battle();
    if (!L) return;

    if (state.invincible && !L.damageUnit) applyInvincible(true);

    if (state.lockHp) {
      const allies = L.allies;
      for (let i = 0; i < allies.length; i++) {
        const u = allies[i];
        if (u && u.maxHp) u.hp = u.maxHp;
      }
    }
    if (state.lockLine) {
      L.leakDamage = 0;
    }
  }

  /* ---- 部队投放：等价于内部 Tu(e, kind, n) ----
   * 内部按 $l[kind] / tank|reaver / addSupport 三分支派发，而 $l（特殊单位表）
   * 在模块闭包里不可达，因此这里以 allies.length 是否增长为准逐个回退，
   * 不依赖任何兵种名表。
   */
  function addUnits(L, kind, n) {
    if (typeof kind !== 'string' || !kind || kind === 'laserdrill') return 0;
    let added = 0;
    for (let i = 0; i < n; i++) {
      const before = L.allies.length;
      try { L.addMarines(4, kind); } catch (_) {}
      if (L.allies.length > before) { added++; continue; }
      try { L.addTank(kind); } catch (_) {}
      if (L.allies.length > before) { added++; continue; }
      try { L.addSupport(kind, { force: true }); } catch (_) {}
      if (L.allies.length > before) added++;
    }
    return added;
  }

  /* ---- 模块满级 ----
   * 内部 bu(e, t, n) 把等级钳到 G[t].cap，而 cap 表不可达。
   * 官方工具台每个单位的 data-max 按钮正是 Su(e, unit) ＝ 该单位全部模块拉满，
   * 且 #sandbox 自己的点击处理器**没有**预设条的 start() 前置。
   * 每次点击都会重渲染面板，所以每轮重新查询，不能一次性缓存按钮引用。
   */
  function maxModules() {
    let box = document.getElementById('sandbox');
    const wasHidden = box ? box.classList.contains('hidden') : true;
    if (!box) {
      const opener = document.querySelector('.dev-strip button[data-act="panel"]');
      if (!opener) return 0;
      opener.click();
      box = document.getElementById('sandbox');
    }
    if (!box) return 0;

    const hit = new Set();
    for (let r = 0; r < 80; r++) {
      const b = [...box.querySelectorAll('button[data-max]')].find((x) => !hit.has(x.dataset.max));
      if (!b) break;
      hit.add(b.dataset.max);
      b.click();
    }
    // 兜底：data-max 覆盖不到的模块，直接点卡片上的 + 直到 disabled
    for (let r = 0; r < 60; r++) {
      const p = box.querySelectorAll('button[data-card][data-step="1"]:not([disabled])');
      if (!p.length) break;
      p[0].click();
    }
    if (wasHidden) box.classList.add('hidden');
    return hit.size;
  }

  /* ---- 一次性动作 ---- */
  const actions = {
    /* 生存 */
    toggleInvincible: (on) => {
      state.invincible = on;
      applyInvincible(on);
    },
    killLine: () => {
      const L = battle();
      if (!L) return '未进入战斗';
      L.leakDamage = 0;
      L.losses = 0;
      L.escaped = 0;
      return '防线伤害已清零';
    },

    /* 输出 */
    purge: () => {
      const L = battle();
      if (!L) return '未进入战斗';
      let n = 0;
      for (const e of L.enemies) {
        if (!e.dead) {
          e.hp = 0;
          n++;
        }
      }
      return '清场 ' + n + ' 只';
    },

    /* 成长 */
    setKills: (v) => {
      const L = battle();
      if (!L) return '未进入战斗';
      L.kills = v;
      L.recentKills = 0;
      L.peakKillRate = Math.max(L.peakKillRate || 0, 0);
      return '击杀数 = ' + L.kills;
    },
    setResearch: (v) => {
      const L = battle();
      if (!L) return '未进入战斗';
      L.researchLevel = v;
      return '研究等级 = ' + L.researchLevel;
    },
    /* 等级 = researchLevel（游戏 HUD 的 Lv.N）。
     * 调高时按差额补发升级卡，交给游戏自己的 openLevelUp 结算。 */
    setLevel: (v) => {
      const L = battle();
      if (!L) return '未进入战斗';
      const old = L.researchLevel || 0;
      L.tampered = true;
      L.researchLevel = v;
      const d = v - old;
      let bonus = '';
      if (d > 0) {
        L.pendingLevelUps = Math.min(50, (L.pendingLevelUps || 0) + d);
        bonus = ' · 补发 ' + L.pendingLevelUps + ' 张升级卡';
      }
      return '等级 Lv.' + old + ' → Lv.' + L.researchLevel + bonus;
    },
    levelUp: () => {
      // 官方 dev-strip 的 level 按钮：researchLevel++ / pendingLevelUps++，无重开局
      const btn = document.querySelector('.dev-strip button[data-act="level"]');
      if (btn) {
        btn.click();
        return '等级 +1';
      }
      const L = battle();
      if (!L) return '未进入战斗';
      L.tampered = true;
      L.researchLevel++;
      L.pendingLevelUps++;
      return '等级 +1 → Lv.' + L.researchLevel;
    },
    addXp: (v) => {
      const L = battle();
      if (!L) return '未进入战斗';
      L.gainXp(v);
      // gainXp 只累加 xp，等级由它自己的阈值结算，别谎报等级变化
      return 'XP +' + v + '（当前 Lv.' + L.researchLevel + '）';
    },
    maxWeapon: () => {
      const L = battle();
      if (!L) return '未进入战斗';
      L.weaponLevel = 9;
      L.piercing = 5;
      L.armor = 40;
      return '武器 ' + L.weaponLevel + ' / 穿透 ' + L.piercing + ' / 护甲 ' + L.armor;
    },
    reinforce: () => {
      const L = battle();
      if (!L) return '未进入战斗';
      const r = L.roster || {};
      let n = 0;
      n += addUnits(L, r.mainKind, 6);
      n += addUnits(L, r.frontKind, 2);
      n += addUnits(L, r.artilleryKind, 2);
      try {
        L.refreshSynergies();
      } catch (_) {}
      return '补兵 +' + n + '（共 ' + L.allies.length + '）';
    },

    /* 流程 */
    victory: () => {
      const L = battle();
      if (!L) return '未进入战斗';
      L.state = 'victory';
      return '已判定胜利';
    },
    endless: () => {
      const L = battle();
      if (!L) return '未进入战斗';
      if (L.state !== 'victory') L.state = 'victory';
      const ok = L.continueEndless();
      return ok ? '已进入无尽' : '无尽已在运行（layer ' + (L.endless ? L.endless.layer : '?') + '）';
    },
    jumpLayer: (n) => {
      const L = battle();
      if (!L) return '未进入战斗';
      if (!L.endless) L.continueEndless();
      if (!L.endless) return '无尽未开启';
      L.endless.layer = n;
      L.endless.nextLayerAt = L.time + 1;
      return '跳至第 ' + n + ' 层';
    },
    boss: () => {
      const L = battle();
      if (!L) return '未进入战斗';
      // 等价于内部 Ou(e, 4400) —— 官方预设条那个按钮会先重开局，不能用
      L.tampered = true;
      L.bossSpawned = true;
      L.boss = { x: 0, z: -6, hp: 4400, maxHp: 4400, hit: 0, dead: false, phase: 0, attack: 1.3 };
      return 'BOSS 已投放（4400 HP）';
    },
    pet: () => {
      // dev-strip 的 pet 走 Nu(e)：其处理器没有预设条的 start() 前置
      const btn = document.querySelector('.dev-strip button[data-act="pet"]');
      if (btn) {
        btn.click();
        return '伙伴已召唤';
      }
      return '官方入口未就绪';
    },
    squadPreset: () => {
      const L = battle();
      if (!L) return '未进入战斗';
      const r = L.roster || {};
      let n = 0;
      n += addUnits(L, r.mainKind, 6);
      n += addUnits(L, r.frontKind, 2);
      n += addUnits(L, r.artilleryKind, 2);
      // 其余可部署单位各补 1（对应内部 for (kind of pu(commander))）。
      // roster.supports 就是那份名单；不要遍历 baseRoster —— 它是个同构配置对象，
      // 值里混着数组和 'terran' 这类非兵种字符串，喂进 addUnits 会造出畸形单位。
      if (Array.isArray(r.supports)) for (const k of r.supports) n += addUnits(L, k, 1);
      const mods = maxModules();
      try {
        L.refreshSynergies();
      } catch (_) {}
      return '部队 +' + n + '（共 ' + L.allies.length + '）· 模块满级（' + mods + ' 个单位）';
    },
    panel: () => {
      const btn = document.querySelector('.dev-strip button[data-act="panel"]');
      if (btn) {
        btn.click();
        return '';
      }
      return '未找到官方工具面板';
    },

    /* 存档 */
    unlock: () => {
      const set = (k, v) => {
        try {
          localStorage.setItem(k, v);
        } catch (_) {}
      };
      set('sc-shooter-unlocked', '1');
      set('sc-shooter-endless-played', '1');
      set('sc-shooter-tutored', '1');
      set('sc-shooter-best', '99999');
      set('sc-shooter-runs', '99');
      if (!localStorage.getItem('sc-shooter-commander')) set('sc-shooter-commander', 'artanis');
      return '存档已解锁（刷新后生效：指挥官/最高记录/无尽）';
    },
  };

  /* ==========================================================================
   * 6) 面板 UI
   * ========================================================================== */
  const CSS = `
:host{all:initial}
*{box-sizing:border-box;font-family:"Segoe UI",system-ui,-apple-system,"Microsoft YaHei",sans-serif}
.panel{position:fixed;right:18px;bottom:18px;width:326px;z-index:2147483647;
  background:linear-gradient(180deg,rgba(14,20,26,.97),rgba(9,13,18,.98));
  border:1px solid rgba(120,190,255,.28);border-radius:10px;
  box-shadow:0 18px 50px rgba(0,0,0,.66),inset 0 1px 0 rgba(255,255,255,.05);
  color:#cfe4f5;font-size:12px;overflow:hidden;user-select:none;
  backdrop-filter:blur(8px)}
.panel.collapsed .body{display:none}
.head{display:flex;align-items:center;gap:8px;padding:9px 11px;cursor:move;
  background:linear-gradient(90deg,rgba(30,60,90,.85),rgba(18,34,50,.7));
  border-bottom:1px solid rgba(120,190,255,.2)}
.head b{font-size:12px;letter-spacing:.09em;color:#8fd0ff;font-weight:700;flex:1}
.dot{width:7px;height:7px;border-radius:50%;background:#c0392b;box-shadow:0 0 8px #c0392b}
.dot.on{background:#39d353;box-shadow:0 0 8px #39d353}
.hbtn{background:rgba(255,255,255,.06);border:1px solid rgba(140,200,255,.22);color:#9dc6e6;
  border-radius:5px;cursor:pointer;font-size:11px;line-height:1;padding:3px 6px}
.hbtn:hover{background:rgba(120,190,255,.2);color:#dff1ff}
.body{padding:9px 11px 11px;max-height:74vh;overflow-y:auto}
.body::-webkit-scrollbar{width:7px}
.body::-webkit-scrollbar-thumb{background:rgba(120,190,255,.25);border-radius:4px}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:3px 10px;padding:6px 8px;margin-bottom:8px;
  background:rgba(0,0,0,.32);border:1px solid rgba(120,190,255,.14);border-radius:6px;
  font-family:Consolas,monospace;font-size:11px;color:#8fb4cf}
.stats i{font-style:normal;color:#e8f4ff;float:right}
.warn{color:#e8b23a!important}
.sec{margin-top:9px}
.sec>h4{margin:0 0 5px;font-size:10px;letter-spacing:.16em;color:#6f93ad;font-weight:600;text-transform:uppercase}
.row{display:flex;gap:5px;flex-wrap:wrap}
button.act{flex:1 1 auto;min-width:66px;padding:6px 8px;border-radius:5px;cursor:pointer;
  background:rgba(46,86,120,.42);border:1px solid rgba(120,190,255,.26);color:#cde5f8;
  font-size:11.5px;transition:.12s;white-space:nowrap}
button.act:hover{background:rgba(70,130,180,.6);border-color:rgba(150,215,255,.55);color:#fff}
button.act:active{transform:translateY(1px)}
button.act.danger{background:rgba(120,42,36,.5);border-color:rgba(230,110,90,.4);color:#f3cfc6}
button.act.danger:hover{background:rgba(165,55,44,.72);border-color:rgba(255,140,110,.7)}
button.act.gold{background:rgba(130,96,30,.42);border-color:rgba(230,190,90,.4);color:#f5e0b0}
button.act.gold:hover{background:rgba(170,125,35,.68);border-color:rgba(255,215,120,.75)}
button.act.on{background:rgba(40,140,80,.62);border-color:rgba(90,235,150,.75);color:#e6fff0}
input[type=number]{width:60px;padding:5px 6px;border-radius:5px;background:rgba(0,0,0,.45);
  border:1px solid rgba(120,190,255,.25);color:#dfefff;font-family:Consolas,monospace;font-size:11.5px}
input[type=number]#i-kills{width:82px}   /* 7 位数不能被宽度裁掉 */
input[type=number]:focus{outline:none;border-color:rgba(150,215,255,.7)}
input[type=range]{flex:1;accent-color:#4c9ede;height:16px}
.rate{min-width:48px;text-align:right;font-family:Consolas,monospace;color:#8fd0ff}
.tip{margin-top:8px;padding-top:7px;border-top:1px solid rgba(120,190,255,.12);
  font-size:10px;color:#5f7d92;line-height:1.5}
.fab{position:fixed;right:18px;bottom:18px;width:38px;height:38px;border-radius:50%;
  background:linear-gradient(135deg,#1d4a6e,#0d2233);border:1px solid rgba(120,190,255,.45);
  color:#9fd8ff;font-size:16px;cursor:pointer;z-index:2147483647;display:none;
  box-shadow:0 6px 18px rgba(0,0,0,.6)}
.fab:hover{border-color:#7fd0ff;color:#fff}
.hidden{display:none!important}
`;

  function buildPanel() {
    const host = document.createElement('div');
    host.setAttribute('data-dsh-trainer', '1');
    host.style.cssText = 'all:initial;position:fixed;z-index:2147483647;';
    const root = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = CSS;
    root.appendChild(style);

    const wrap = document.createElement('div');
    wrap.innerHTML = `
<div class="panel" id="panel">
  <div class="head" id="head">
    <span class="dot" id="dot"></span>
    <b>ASHFALL 修改器</b>
    <button class="hbtn" id="min" title="收起/展开">—</button>
    <button class="hbtn" id="close" title="隐藏 (Alt+M)">×</button>
  </div>
  <div class="body">
    <div class="stats">
      <span>状态<i id="s-state">—</i></span>
      <span>时间<i id="s-time">—</i></span>
      <span>击杀<i id="s-kills">—</i></span>
      <span>敌<i id="s-enemies">—</i></span>
      <span>部队<i id="s-allies">—</i></span>
      <span>均血<i id="s-health">—</i></span>
      <span>篡改<i id="s-tampered">—</i></span>
      <span>门禁<i id="s-gate">—</i></span>
      <span>实速<i id="s-rt">—</i></span>
      <span>解钳<i id="s-unclamp">—</i></span>
    </div>

    <div class="sec">
      <h4>生存</h4>
      <div class="row">
        <button class="act" data-t="inv">全体免伤</button>
        <button class="act" data-t="hp">锁定满血</button>
        <button class="act" data-t="line">防线无伤</button>
      </div>
    </div>

    <div class="sec">
      <h4>输出</h4>
      <div class="row">
        <button class="act" data-m="10">敌伤 ×10</button>
        <button class="act" data-m="100">×100</button>
        <button class="act" data-m="1000">×1000</button>
        <button class="act danger" data-t="purge">一键清场</button>
        <button class="act gold" data-mb="1000">BOSS 秒杀</button>
      </div>
    </div>

    <div class="sec">
      <h4>成长</h4>
      <div class="row">
        <input type="number" id="i-kills" value="9999999" min="0" max="9999999">
        <button class="act" data-t="kills">写入击杀</button>
        <button class="act" data-t="maxweapon">满武器</button>
      </div>
      <div class="row" style="margin-top:5px">
        <input type="number" id="i-res" value="30" min="0">
        <button class="act" data-t="research">写入研究</button>
        <button class="act gold" data-t="level">写入等级</button>
      </div>
      <div class="row" style="margin-top:5px">
        <button class="act" data-t="levelup">等级 +1</button>
        <button class="act" data-t="xp">+9999 XP</button>
      </div>
      <div class="row" style="margin-top:5px">
        <button class="act gold" data-t="squad">满编 + 满模块</button>
        <button class="act" data-t="reinforce">补兵</button>
      </div>
    </div>

    <div class="sec">
      <h4>流程</h4>
      <div class="row">
        <button class="act" data-t="victory">判定胜利</button>
        <button class="act" data-t="endless">进入无尽</button>
        <button class="act" data-t="boss">投放 BOSS</button>
      </div>
      <div class="row" style="margin-top:5px">
        <input type="number" id="i-layer" value="50" min="1">
        <button class="act" data-t="layer">跳层</button>
        <button class="act" data-t="pet">召唤伙伴</button>
      </div>
    </div>

    <div class="sec">
      <h4>全局</h4>
      <div class="row" style="align-items:center">
        <span class="rate" id="r-label">1.00x</span>
        <input type="range" id="rate" min="0" max="1000" value="333" step="1">
      </div>
      <div class="row" style="margin-top:5px">
        <button class="act" data-r="0.25" style="min-width:0;flex:1 1 0">0.25x</button>
        <button class="act on" data-r="1" style="min-width:0;flex:1 1 0">1x</button>
        <button class="act" data-r="3" style="min-width:0;flex:1 1 0">3x</button>
        <button class="act" data-r="10" style="min-width:0;flex:1 1 0">10x</button>
        <button class="act gold" data-r="100" style="min-width:0;flex:1 1 0">100x</button>
      </div>
      <div class="row" style="margin-top:5px">
        <button class="act" data-t="unlock">一键解锁存档</button>
        <button class="act" data-t="panel">官方工具台</button>
      </div>
    </div>

    <div class="tip" id="tip">Alt+M 显示/隐藏 · 拖动标题栏移动<br>满编会短暂展开官方工具台以拉满模块 · 改数据置 tampered 标记</div>
  </div>
</div>
<div class="fab" id="fab" title="打开修改器 (Alt+M)">⚙</div>
`;
    while (wrap.firstChild) root.appendChild(wrap.firstChild);

    document.body.appendChild(host);
    hostEl = host;
    return root;
  }

  /* ==========================================================================
   * 7) 绑定
   * ========================================================================== */
  function bind(root) {
    const $ = (id) => root.getElementById(id);
    const panel = $('panel');
    const fab = $('fab');
    const tip = $('tip');

    const say = (msg) => {
      if (!msg) return;
      tip.textContent = msg;
      clearTimeout(say._t);
      say._t = setTimeout(() => {
        tip.innerHTML =
          'Alt+M 显示/隐藏 · 拖动标题栏移动<br>满编会短暂展开官方工具台以拉满模块 · 改数据置 tampered 标记';
      }, 2600);
    };

    // 拖动
    let drag = null;
    $('head').addEventListener('mousedown', (e) => {
      if (e.target.closest('.hbtn')) return;
      drag = { x: e.clientX, y: e.clientY, r: panel.getBoundingClientRect() };
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!drag) return;
      const nx = Math.max(0, Math.min(innerWidth - 60, drag.r.left + e.clientX - drag.x));
      const ny = Math.max(0, Math.min(innerHeight - 30, drag.r.top + e.clientY - drag.y));
      panel.style.left = nx + 'px';
      panel.style.top = ny + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    });
    window.addEventListener('mouseup', () => (drag = null));

    // 收起 / 隐藏
    $('min').addEventListener('click', () => panel.classList.toggle('collapsed'));
    $('close').addEventListener('click', () => {
      panel.classList.add('hidden');
      fab.style.display = 'block';
    });
    fab.addEventListener('click', () => {
      panel.classList.remove('hidden');
      fab.style.display = 'none';
    });

    // 开关按钮
    const toggle = (name, btn, fn) => {
      btn.classList.toggle('on', name);
      fn(name);
    };

    root.getElementById('panel').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      b.blur();
      const t = b.dataset.t;
      const m = b.dataset.m;
      const mb = b.dataset.mb;
      const rKey = b.dataset.r;

      // 时间倍率快捷档
      if (rKey) {
        const r = Number(rKey);
        setRate(r);
        slider.value = String(toSlider(r));
        showRate(r);
        root.querySelectorAll('[data-r]').forEach((x) => x.classList.toggle('on', x === b));
        say('时间倍率 ' + r.toFixed(2) + 'x' + (r > 3 ? ' · 已解除单帧 50ms 钳制' : ''));
        return;
      }

      if (m) {
        const v = Number(m);
        const on = state.damageMult === v;
        state.damageMult = on ? 1 : v;
        root.querySelectorAll('[data-m]').forEach((x) => x.classList.remove('on'));
        if (!on) b.classList.add('on');
        applyDamageMult();
        say('敌人受伤倍率 ×' + state.damageMult);
        return;
      }
      if (mb) {
        const v = Number(mb);
        const on = state.bossMult === v;
        state.bossMult = on ? 1 : v;
        b.classList.toggle('on', !on);
        applyDamageMult();
        say('BOSS 受伤倍率 ×' + state.bossMult);
        return;
      }

      switch (t) {
        case 'inv':
          toggle(!state.invincible, b, (on) => {
            state.invincible = on;
            if (!applyInvincible(on)) say('未进入战斗');
            else say(on ? '全体免伤：开' : '全体免伤：关');
          });
          break;
        case 'hp':
          toggle(!state.lockHp, b, (on) => {
            state.lockHp = on;
            say(on ? '锁定满血：开' : '锁定满血：关');
          });
          break;
        case 'line':
          toggle(!state.lockLine, b, (on) => {
            state.lockLine = on;
            say(on ? '防线无伤：开' : '防线无伤：关');
          });
          break;
        case 'purge':
          say(actions.purge());
          break;
        case 'kills':
          say(actions.setKills(Number(root.getElementById('i-kills').value) || 0));
          break;
        case 'research':
          say(actions.setResearch(Number(root.getElementById('i-res').value) || 0));
          break;
        case 'level':
          say(actions.setLevel(Number(root.getElementById('i-res').value) || 0));
          break;
        case 'levelup':
          say(actions.levelUp());
          break;
        case 'xp':
          say(actions.addXp(9999));
          break;
        case 'maxweapon':
          say(actions.maxWeapon());
          break;
        case 'reinforce':
          say(actions.reinforce());
          break;
        case 'squad':
          say(actions.squadPreset());
          break;
        case 'victory':
          say(actions.victory());
          break;
        case 'endless':
          say(actions.endless());
          break;
        case 'layer':
          say(actions.jumpLayer(Number(root.getElementById('i-layer').value) || 1));
          break;
        case 'boss':
          say(actions.boss());
          break;
        case 'pet':
          say(actions.pet());
          break;
        case 'unlock':
          say(actions.unlock());
          break;
        case 'panel':
          say(actions.panel() || '官方工具台已切换');
          break;
      }
    });

    // 时间倍率
    const slider = root.getElementById('rate');
    const rlabel = root.getElementById('r-label');
    const showRate = (r) => {
      rlabel.textContent = r.toFixed(2) + 'x';
    };
    showRate(rate);
    slider.addEventListener('input', () => {
      const r = toRate(Number(slider.value));
      setRate(r);
      showRate(r);
      root.querySelectorAll('[data-r]').forEach((x) => x.classList.remove('on'));
    });
    slider.addEventListener('change', () => say('时间倍率 ' + rate.toFixed(2) + 'x' + (rate > 3 ? ' · 已解除单帧 50ms 钳制' : '')));

    // 热键
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.altKey && (e.key === 'm' || e.key === 'M')) {
          e.preventDefault();
          const hidden = panel.classList.contains('hidden');
          panel.classList.toggle('hidden', !hidden);
          fab.style.display = hidden ? 'none' : 'block';
        }
      },
      true
    );

    // 状态刷新
    const S = {
      state: $('s-state'),
      time: $('s-time'),
      kills: $('s-kills'),
      enemies: $('s-enemies'),
      allies: $('s-allies'),
      health: $('s-health'),
      tampered: $('s-tampered'),
      gate: $('s-gate'),
      rt: $('s-rt'),
      unclamp: $('s-unclamp'),
    };
    S.gate.textContent = gateHits ? 'OPEN' : '—';

    let lastT = null;
    let lastW = 0;
    let measured = 0;

    setInterval(() => {
      const L = battle();
      const dot = $('dot');
      if (!L) {
        dot.classList.remove('on');
        S.state.textContent = '待机';
        return;
      }
      dot.classList.add('on');
      S.state.textContent = L.state;
      S.time.textContent = (L.time || 0).toFixed(1) + 's';
      S.kills.textContent = L.kills;
      S.enemies.textContent = L.enemies.length;
      S.allies.textContent = L.allies.length;
      S.health.textContent = Math.round(L.health) + '%';
      S.tampered.textContent = L.tampered ? 'YES' : 'no';
      S.tampered.className = L.tampered ? 'warn' : '';
      S.gate.textContent = gateHits ? 'OPEN' : '—';
      S.unclamp.textContent = unclampHits ? String(unclampHits) : '—';

      // 实测倍率 = 游戏内时间推进 / 真实时间，指数平滑压抖动
      const now = performance.now();
      if (lastT !== null && now > lastW) {
        const inst = (L.time - lastT) / ((now - lastW) / 1000);
        if (isFinite(inst) && inst >= 0) {
          measured = measured ? measured * 0.6 + inst * 0.4 : inst;
          S.rt.textContent = measured.toFixed(1) + 'x';
        }
      }
      lastT = L.time;
      lastW = now;
    }, 400);
  }

  /* ==========================================================================
   * 8) 启动
   * ========================================================================== */
  function boot() {
    if (!document.body) return setTimeout(boot, 50);
    let root;
    try {
      root = buildPanel();
    } catch (err) {
      console.warn('[DSH Trainer] 面板注入失败:', err);
      return;
    }
    bind(root);
    setInterval(tick, TICK_MS);
    console.log('%c[DSH Trainer] 已就绪 — 门禁命中 ' + gateHits + ' 次', 'color:#4c9ede;font-weight:bold');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
