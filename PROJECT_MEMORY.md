# 意识星系 / Mind Galaxy — 项目搬运与续接笔记

> 用途：换 WorkBuddy 账号或新环境时，读这个文件即可完整接上项目上下文。
> 最后更新：2026-08-05

---

## 一、项目是什么

前额叶执行功能训练小游戏合集，网页版单文件应用（`index.html`），后续计划迁移微信小程序。
目标用户：开发者自己 + 少量朋友。当前为网页原型验证阶段。

**核心文件**：`mind-galaxy/index.html`（单文件，含全部 HTML/CSS/JS，约 1800+ 行）

**本地路径**：`C:\Users\1\WorkBuddy\2026-08-04-09-32-18\mind-galaxy\`

**GitHub 仓库**（私有）：`https://github.com/Lenu-l/mind-galaxy`
- 用户名：`Lenu-l`
- 注意：GitHub token 是私人凭证，不要写进任何会被提交的文件。换环境后需在 Git 凭据管理器重新配置。

---

## 二、世界观与视觉铁律（必须遵守，否则会被打回重做）

用户给的硬性约束，任何界面都不可违反：
- ❌ 禁止圆角卡片、禁止 emoji 装饰、禁止蓝紫渐变、禁止标准 SaaS 文案（"欢迎使用""开始体验"之类）
- ✅ 曲速变焦导航（scale + blur + opacity 过渡）
- ✅ 发光天体风格（星球 = 微亮 + 外层光晕 + 低饱和有质感纹理）
- ✅ glitch 错误反馈（色差分离 + 扫描线）
- ✅ 神经科学文案（用"突触""神经回路""意识校准"等词）
- ✅ 单色光效为主，每个星球固定主光色
- ✅ 粒子特效用 CSS 动画，不用 Canvas

**已完成的视觉系统**（在 index.html 中）：
- 深空背景：多层星空视差 + 星云 + 螺旋星系 + 土星光环 + 宇宙尘埃噪点
- 主界面：5 颗星球 + 中央能量核 + 双核心布局（巡礼核心 / 自由调控核心）
- 星球亮度已多次调亮（基色 #B08530 档，外层三层 box-shadow 光晕）

---

## 三、五大游戏模式（前 3 个已实现，模式 4-5 待做）

| # | 星球 | 模式 | 训练能力 | 状态 | 主光色 |
|---|------|------|----------|------|--------|
| 1 | 秩序星 | 星轨寻数（舒尔特方格变体）| 注意集中 | ✅ 已完成 | 金/琥珀 |
| 2 | 宁静星 | 杂念捕手 → 已升级为「色轮净化」| 抑制控制 | ✅ 已完成 | 生物荧光绿 #39FF14 |
| 3 | 裂变星 | 神经脉冲（脉冲分流·规则翻转）| 认知灵活 | ✅ 已完成 | 等离子青 #00F0FF |
| 4 | 记忆星 | 记忆回廊（Corsi 方块）| 空间工作记忆 | ⬜ 待做 | 未定 |
| 5 | 双核星 | 双轨监控（Dual N-back）| 听觉+空间工作记忆 | ⬜ 待做 | 未定 |

---

## 四、已实现的两大模式详细逻辑

### 模式 1：星轨寻数（order/orbit）
- **布局**：圆形极坐标盘面（非方格），`generatePositions(count, maxR, minR)` 用 `Math.sqrt(t)` 保证面积均匀
- **碰撞检测**：最小间距 = 热区直径 × 1.3，最多重试 30 次
- **数字 1 约束**：禁止出现在最外圈（radius > maxR×0.7 时强制拉回内圈）
- **操作**：点击数字 1→2→3... 顺序
- **错误惩罚**：调整后用时 = 纯用时 + 错误数 × 惩罚系数
- **评级**：调整后用时判定 S/A/B/C（硬门槛，见 DIFFS.orbit）
- **难度**：学徒(9格)/标准(16格)/经典(25格,浮动)/大师(36格,浮动)
- **视觉**：SVG 光轨连线、超新星爆发、数字浮动动画、能量过载 glitch

### 模式 2：色轮净化（focus）
- **四色孢子**（形状区分，色盲友好）：
  - 赤红 = 圆形（脉动光斑）
  - 翠绿 = 菱形（荧光锐利）
  - 湛蓝 = 三角形（冰裂纹）
  - 金黄 = 星形（放射光芒）
- **互补配对（固定不变）**：赤红↔翠绿、湛蓝↔金黄
- **规则**：膜囊显示什么色，就拖入它的「互补色」；其余 3 种全部左划丢弃
- **膜囊目标色切换**：每 21 秒切换（18 秒正常 + 3 秒警告期）
- **警告期（3 秒）**：膜囊快速脉动 + 孢子减速 50% 缓冲
- **切换瞬间**：白光扫描波横贯屏幕
- **惯性保护**：切换后 3 秒内按旧规则操作不记错误，只打断连击
- **操作手势**：拖互补色到膜囊=收集(+分+连击)；左划其他3色=丢弃(无分不打断连击)；误拖非互补色到膜囊=错误(连击清零)
- **难度**：晨露(60s)/微风(90s)/暴雨(90s)，统一 spawnInterval/speed/maxSpores 参数
- **评级**：基于准确率 S(≥90%且0错)/A(≥80%)/B(≥70%)/C(≥60%)，错误≥5锁死B
- **生成**：每 1.5s 随机 1 个，场上最多 6-8 个，超出则最早的自然消散
- **已知待优化（用户最新反馈 2026-08-05，已于 2026-08-05 完成）**：孢子流动速度偏慢→已加快（dew/breeze/storm 速度 30/45/60 → 55/80/110，warning 期×0.5 缓冲保留）；不再直接提示应拖入的互补色，改为膜囊只显示自身显色 + 固定「互补净化·规则」面板（赤红↔翠绿、湛蓝↔金黄，形状+色样色盲友好）供玩家自行对照
- **第二轮微调（用户反馈 2026-08-05 完成）**：①游戏结束/中途返回时光点粒子（.focus-particle, fixed z-index:9999）会残留在结算画面→新增 clearFocusParticles()，在 endFocusGame 与 cleanupFocus 中彻底清除孢子层与光点；②游戏开始前的设定页（screen-setup）新增「互补净化·规则」面板（复用 rp-shape/spore-shape 视觉），仅 focus 模式显示，开局前先讲一遍规则；③时长 90s→75s（三档统一）；④孢子颜色改为洗牌袋（nextSporeColor）保证4色均匀分布，替代纯随机

### 模式 3：神经脉冲（pulse）
- **机制**：中央「脉冲核」周期发射发光脉冲（复用4色+形状：赤红圆/翠绿菱/湛蓝三角/金黄星）；屏幕左右两枚「端口」
- **规则翻转**：规则A={赤红,湛蓝}→左、{翠绿,金黄}→右；周期翻转（flipInterval）为规则B（左右互换），训练认知灵活 / set-shifting
- **翻转反馈**：翻转前 grace(2.5~3.5s) 端口预警脉动；翻转瞬间白光扫描波（pulse-flash，复用 focus-flash 动画）；翻转后 grace 宽限期，按旧规则操作不打断连击（沿用 focus 惯性保护，不记错误）
- **操作**：拖脉冲到正确端口=收集(+分+连击)；拖错端口=glitch错误(连击清零)；拖到空白=放回原位不罚；脉冲超时未处理=遗漏
- **难度**：微光(75s)/湍流(90s)/风暴(90s)，调 spawnInterval/maxPulses/flipInterval/grace/pulseLife
- **评级**：基于准确率 S(≥90%且0错)/A(≥80%)/B(≥70%)/C(≥60%)，错误≥5锁死B（同 focus）
- **视觉**：脉冲核 .orb-plasma 同系青色发光；端口为发光环（非圆角卡片）；错误复用 spore-err 的 hue-rotate glitch

---

## 五、架构与关键数据

### 难度配置（DIFFS 对象，按 mode 分组）
```js
DIFFS = {
  orbit: [ {key:'3x3',...}, {key:'4x4',...}, {key:'5x5',...}, {key:'6x6',...} ],
  focus: [ {key:'dew',...}, {key:'breeze',...}, {key:'storm',...} ]
}
```

### 数据结构（localStorage，key 如 'mind-galaxy'）
```js
profile = {
  streak, totalActivation,
  modeBests: { orbit:{...}, focus:{...} },   // 各难度最佳记录
  modeUnlocks: {...},
  sessions: []
}
today = { completed, ritualProgress, freeSeconds }
```

### 巡礼流程（重要交互约定）
- 巡礼按顺序走完已激活星球（秩序星→宁静星→...），结算页有"继续巡礼"按钮自动进下一关
- 全部完成才打卡（非每关打卡）
- 自由模式：点「自由调控」激活全部星球，可任意点击进入
- 321 倒计时在每个游戏模式正式开始前，不是一点启动巡礼就倒数
- 星球逐个解锁（非一次性全开）

### 结算/评级
- `calcRating(t, dk)` 用于 orbit（基于时间）
- `showFocusResult()` 用于 focus（基于准确率）
- 结果页显示：模式名+难度、评级、纯用时/过载次数/调整用时（orbit）或 准确率/处理数/错误/遗漏/最高连击（focus）、打卡信息

---

## 六、已踩的坑（避免重犯）

1. **致命 bug**：HTML 元素缺 `id` 导致 `getElementById` 返回 null 抛错，后续状态更新不执行。改任何 HTML 后务必核对 id 与 JS 引用一致。
2. **Python 替换脚本误伤**：用 `html.index('/* ===== Focus Game')` 定位时，CSS 段和 JS 段都有同名注释，会找错位置删掉 CSS。替换大段代码前先确认锚点唯一。
3. **孢子堆积 bug**：早期孢子不消失导致满屏，已修复为持续上浮、飘出顶部自动移除。
4. **"峰值记录"文案**已改为"最快记录"（用户要求）。
5. 本地服务器用 `python -m http.server` 跑，端口可能被占用，换端口即可（8090/8100）。

---

## 七、换账号续接步骤

1. 本地 `mind-galaxy/` 目录不动，代码原封保留。
2. 登录新 WorkBuddy 账号后，用 GitHub 拉取或直接打开本地 `index.html`。
3. 把本文件内容作为上下文给新会话，或直接说"读 PROJECT_MEMORY.md 继续"。
4. 模式 3「神经脉冲」已完成（脉冲分流+规则翻转）。下一步建议做模式 4「记忆回廊」（Corsi 方块 / 空间工作记忆），参考原始产品文档。

---

## 八、原始产品文档要点（MVP v1.0）

- 5 模式对应 5 认知能力
- 双轨打卡（巡礼 5 关 / 自由 15 分钟，先到先得，互斥）
- 评级 SABC 硬门槛
- Phase 1=MVP基础版+打卡+评级+localStorage；Phase 2=雷达图+日报+成就+分享；Phase 3=神经树+装扮+排行榜+音效
- 微信小程序个人主体免费，云开发有免费额度

---

## 九、平台适配层（小程序原生改写准备）

**决策（2026-08-05）**：最终要发布微信小程序，采用「原生改写」路线（非 web-view）。先把存储/音频/画布/振动抽成一层**平台适配壳**，当前为 Web(DOM) 实现，将来原生改写只换这一层，游戏逻辑不动。

**位置**：`index.html` 中 `MAT_CLASS` 之后、`loadData()` 之前，注释 `/* ===== Platform Adapter Layer ===== */`。包含：
- `Store`：`get/set/remove(key)` — 现用 localStorage；MP 改 `wx.getStorageSync/setStorageSync/removeStorageSync`
- `Sound`：`unlock()/play(type)` — 现用 `AudioContext`；MP 改 `wx.createWebAudioContext`（受限）或 `wx.createInnerAudioContext`；已加首次交互解锁监听（iOS 自动播放策略）
- `Canvas`：`get2d(id)` 返回 `{canvas,ctx}`、`onResize(cb)` — 现用 `getContext('2d')`+`window resize`；MP 改 `wx.createSelectorQuery` 取 node + `node.getContext('2d')` + `wx.onWindowResize`
- `Haptics`：`vibrate(ms)` — 现用 `navigator.vibrate`；MP 改 `wx.vibrateShort`（iOS 原生不支持 Vibration，web-view 下静默）
- `Platform.viewport()`：返回 `{w,h,dpr}` — 现用 `innerWidth/innerHeight/devicePixelRatio`；MP 改 `wx.getWindowInfo()`

**自检结果（2026-08-05）**：游戏逻辑中已无任何直接的 `localStorage.`/`navigator.vibrate`/`new AudioContext`/`getContext('2d')`/`window.addEventListener('resize')` 调用，全部经由适配层。node --check 通过。

**原生改写时仍需处理（不在适配层内的 Web 全局）**：
1. starfield 绘制里仍直接用了 `devicePixelRatio`（~15 处半径/漂移缩放）与 `innerWidth`（orbit 布局 `availW`）——改写时用 `Platform.viewport().dpr` / `.w` 替换（已在 viewport 集中）。
2. `requestAnimationFrame(animStars/focusLoop/pulseLoop)`：web-view 下正常；原生 MP 的 canvas 用 `Canvas.requestAnimationFrame`（node 上的 rAF）或 `setInterval`。
3. **最大的改写成本在 DOM 本身**：各模式用 `document.getElementById`/`createElement`/`addEventListener` 大量操作 DOM 与 CSS 动画。原生 MP 无 DOM，需用 WXML + `setData` + 数据驱动渲染，或改用 `<canvas>` 全自绘。这一层不在适配壳范围内，是模式 4/5 接入时就要开始考虑的架构约束（建议：新模式的"视图"尽量用数据状态描述，减少直接 DOM 依赖）。

**替代路线（供参考）**：web-view 嵌入——把本 HTML 挂到已备案服务器，用 `<web-view>` 包一层，当前代码几乎零改；代价是需要服务器+ICP、配业务域名、iOS 端音频/振动受限。
