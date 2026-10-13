# CG Web Demo（批判谱系学 Agent · 实机演示）

本地可运行的网页 Demo：只读走正式账本，凡写入/签字动作一律走内存演示库。零新依赖（Python 标准库 + 浏览器）。

## 启动

```powershell
python -m webdemo --port 8077
# 打开 http://127.0.0.1:8077/
```

可选参数：`--host`（默认 127.0.0.1）、`--db`（默认 `data/ledger.sqlite3`，只读）、`--objects`（默认 `data/objects`）。

## 演示动线（打开首页）

1. 顶部健康条：账本 verify 状态 + 三条健康度指标（N/A 如实展示）。
2. 点 **重放演示**：在内存库走完 分层批准 → 草稿+提案 → 图版本 → fork 保留 → 时间线 → 三探针 → 回测 → 权重，9 个阶段灯依次变绿。
3. 左栏看语料源、中栏检索、右栏选 Proposal 看完整回溯链（原文 → 父假设 → 提议 → 账本 entry 链）。
4. `API 文档` 页由路由表自动生成；所有请求均为同源 fetch，可在开发者工具直接复制为 curl。

## 端点总表

只读（正式账本）：`/api/health`、`/api/verify`、`/api/sources`、`/api/sources/manifest`、
`/api/locate`、`/api/search`、`/api/layers`、`/api/proposals`、`/api/graph/snapshot`、
`/api/forks`、`/api/timeline`、`/api/probes`、`/api/backtests`、`/api/weights`、
`/api/metrics`、`/api/trace`。错误体统一 `{"ok": false, "error": "..."}`；
客户端参数错误返回 400，未知路径 404。

演示写入（仅内存库）：`POST /api/demo/reset` 重建内存库；其余见 `/api/docs` 的“演示写入”一节。
全部签字为占位性质（signer=`webdemo`，confidence=0.5），待人工学术复核。

## 隔离保证

- 正式账本在本服务中**只读**：验收已证明多次全链重放前后 `data/ledger.sqlite3` 的 SHA-256 不变。
- 内存库位于系统临时目录（`cg-webdemo-scratch`），`reset` 即删即建；多用户/并发写不在本 Demo 范围内（单进程单演示者假设）。
- 本包只做薄封装，不改 `critical_genealogy` 行为与门禁语义。

## 文件

- `webdemo/server.py` — HTTP 服务（health/verify/docs/首页 + 路由分发）
- `webdemo/readapi.py` — 只读查询 API
- `webdemo/writeapi.py` — 演示写入 API（内存库全链条）
- `webdemo/index.html` — 演示前端单页（无框架、无外部依赖、离线可开）
