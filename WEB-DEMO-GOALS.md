# 目标文档：批判谱系学 Agent 网页 Demo（可 API 接入、实机演示用）

本文件是网页 Demo 任务的**总体目标与规则说明**，对应用户 2026-10-13 的指令：先写本目标文档，再按 Phase 0 → Phase 4 顺序实现，每完成一个 Phase 即做自动验收，通过后自动进入下一 Phase，以此循环。

## 1. 任务与非目标

- **任务**：在现有 `critical_genealogy` Python 包之上，做一个**本地可运行的网页 Demo**，供实机演示；同时暴露一套 **HTTP API**，让人类与外部程序可以：查某个节点的全部提议还原、查某个节点当前的平行分支、查某条终端结论的完整回溯链、查看三条健康度指标趋势。对应体系设计文档第 6 节"需要暴露一个可查询的接口"的硬约束。
- **非目标**：不做生产级部署、不做用户体系、不做权限/鉴权、不引入数据库新依赖（继续用现有 SQLite 账本）、不改 `critical_genealogy` 现有行为与门禁语义（Demo 只做薄封装层）。
- **演示数据源**：默认指向仓库正式账本 `data/ledger.sqlite3`（只读用法走它）；凡写入/签字动作一律走**内存临时库**，绝不污染正式账本。

## 2. 技术选型与约束

- 后端：Python 标准库 `http.server`（零新依赖，`pip install` 都不需要），JSON API + 一个单页前端。
- 前端：单个 `index.html` + 内联 JS/CSS，无框架、无构建步骤，浏览器打开即用；API 文档页用同一服务静态输出。
- 运行方式：`python -m webdemo.server [--port PORT] [--db PATH]`，默认端口 8077，默认库为正式账本只读。
- 兼容性：Windows + Python 3.13（本机环境）优先；路径与换行处理沿用账本现有约定。

## 3. API 契约（v1，全部 JSON，错误体统一 `{"ok": false, "error": "..."}`）

| 方法与路径 | 用途 | 备注 |
|---|---|---|
| `GET /api/health` | 存活与版本 | `{"ok": true, "service": "cg-webdemo", "ledger_head": "sha256:…"}` |
| `GET /api/verify` | 账本完整性 | 透出 `cli verify` 的 source_count / unit_count / head_hash |
| `GET /api/sources` | 语料清单 | 透出 `cli sources` |
| `GET /api/sources/<id>/manifest` | 逐单元清单 | 大文本截断 text_span（默认前 200 字符，`?full=1` 取全量） |
| `GET /api/locate?source_id=&start=&end=` | 字符区间定位 | 透出 `cli locate` |
| `GET /api/search?q=&source_id?` | 全文检索 | 结果默认上限 50（`?limit=` 可调，上限 200） |
| `GET /api/layers` | 5 条分层候选 + 批准状态 | 含 hypothesis_id / model_id / confidence / human_approved |
| `GET /api/proposals` | 活动 Proposal 列表 | 透出 rule_id / confidence / mapping / condition |
| `GET /api/graph/snapshot?version_id?` | 图版本快照 | 节点/边列表，类型白名单内 |
| `GET /api/forks` | fork 记录与分支状态 | 含 branch_status 的 active/merged/deleted 视图 |
| `GET /api/timeline` | 断裂时间线事件 | 文明标签 + 年份区间 + 批准状态 |
| `GET /api/probes?probe_id?` | 三探针候选与 keep/reject 状态 | `lacan_residue` / `deleuze_singularity` / `badiou_event_site` |
| `GET /api/backtests` | 回测记录与原始指标 | 含 weights_updated=false 的如实展示 |
| `GET /api/weights` | 已激活权重集 | 含和为 1 的校验展示 |
| `GET /api/metrics` | 三条健康度指标当前值 | 残余标记比例 / 平行分支平均数 / 平均置信度，缺失记 N/A 并注明口径 |
| `GET /api/trace?proposal_id=` | 终端结论完整回溯链 | Proposal → 父假设 → source 跨度 → ledger entry_hash 链，不断链才算成功 |
| `POST /api/demo/reset` | 重建内存演示库 | 从正式账本复制一份到内存临时库并重放最小演示数据（见 §5） |
| `POST /api/demo/approve` 等演示写入 | 走内存库的签字动作 | 请求体带 signer/reason/confidence，与 CLI 同等校验 |
| `GET /` | 演示前端单页 | 含健康度仪表盘、回溯链浏览器、API 文档链接 |
| `GET /api/docs` | API 文档页 | 由路由表自动生成 |

演示写入端点清单（全部只作用于内存库，正式库只读）：
`POST /api/demo/layer/approve`、`POST /api/demo/draft`、`POST /api/demo/proposal/approve`、
`POST /api/demo/patch/submit`、`POST /api/demo/patch/approve`、`POST /api/demo/fork/submit`、
`POST /api/demo/fork/keep-both`、`POST /api/demo/branch-op`、`POST /api/demo/timeline/submit|decide`、
`POST /api/demo/probe/submit|decide`、`POST /api/demo/backtest/run`、`POST /api/demo/weight/submit|decide`。

## 4. 前端单页（`/`）的演示动线

1. 顶部健康条：账本 verify 状态 + 三条健康度指标（N/A 如实展示）。
2. 左栏：语料源列表 → 点源看 manifest/检索；点任意 Proposal 看 `trace` 回溯链（原文 → 假设 → 提议 → 图 → 探针）。
3. 右栏：一键“重放演示”（调 `POST /api/demo/reset`，走内存库做完 Phase1 批准 → Phase2 草稿+提案 → Phase3 图+fork → Phase4 探针+回测），每步显示эм stage 状态灯。
4. 底部：API 文档链接 + 本页所有请求均为同源 fetch、可在浏览器开发者工具直接复制为 curl。

## 5. 内存演示库的数据口径

`POST /api/demo/reset` 在内存临时库重放最小闭环：批准 5 条分层（占位 signer `webdemo`、confidence 0.5）→ 提交 3 条占位草稿并激活 1 条提案 → 1 个图版本（2 节点 1 边）→ 1 个 fork keep-both → 1 个时间线事件 + 每类探针 1 条 keep → 1 次回测 + 1 组权重。全部标记占位，不代表学术结论。

## 6. 分 Phase 验收标准（机械可判，不过不进下一 Phase）

- **Phase 0（脚手架）**：`python -m webdemo.server --port <空闲端口>` 能启动；`GET /api/health` 与 `GET /api/verify` 返回 200 且 head 与 `cli verify` 一致；`GET /` 返回 HTML。验收脚本用 `urllib`（标准库）跑，不引入 requests/pytest 依赖。
- **Phase 1（只读 API）**：§3 全部 `GET` 端点在正式账本上返回 200；`trace` 对 2 条活动 Proposal 不断链；`metrics` 三条口径与阶段报告一致；`manifest` 截断与 `full=1` 两种模式都对。
- **Phase 2（演示写入 API）**：`reset` 后在内存库走完全链条（批准→草稿→提案→图→fork→时间线→探针→回测→权重），每一步 HTTP 200 且落库可查；正式账本 `verify` 的 head 在前后**不变**（写隔离证明）；非法输入（缺少 signer、理由过短、置信度越界）返回 400 + `ok:false`。
- **Phase 3（前端单页）**：`/` 无 JS 报错地渲染健康条、语料列表、回溯链视图；“重放演示”按钮调通 `reset` 全链并点亮 stage 灯；页面无外部 CDN 依赖（离线可开）。
- **Phase 4（交付）**：新增 `webdemo/README.md`（启动、端口、端点表、演示动线、内存库与正式库隔离说明）；仓库测试套件仍全绿；`reports/web-demo-2026-10-13.md` 记录本次实现与验收；收尾提交 git。

## 7. 本任务不解决的事

- 不做鉴权/多用户/并发写；内存库单进程单演示者假设，文档中写明。
- 不改 `critical_genealogy` 包行为；发现 bug 只记录，不顺手修（避免演示分支污染主线逻辑）。
- 大文件政策不变：此前 135MB zip 已在 `.gitignore`，本次新增文件均为 KB 级。
