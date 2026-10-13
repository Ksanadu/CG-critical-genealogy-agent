# 通用文本分析实现与验收报告：2026-10-13（Phase 1→4）

本报告记录按 [`TEXT-ANALYSIS-GOALS.md`](../TEXT-ANALYSIS-GOALS.md) 执行的“输入任何历史文本 → 最佳拟合 → 量化 → 重构文本”实现与逐 Phase 自动验收。输出顺序按用户拍板固定：**最佳拟合在前，重构文本在后；中英文**。

## Phase 1：通用摄取——通过

- 新增 `webdemo/analysis.py`（`AnalysisAPI`）与路由 `POST /api/analyze/ingest`：任意 UTF-8 文本（≤1MB）→ source_id + 单元数 + char_count；复摄取幂等；空标题/空文本/超限返回 400。
- 验收用中英文各一段真实史料（史记五帝本纪片段 51 字、英文创世记 1:1-2），中英文摄取、幂等、错误契约全过。
- **事故与修复**：初版 `AnalysisAPI` 绑定了服务启动账本，导致 2 条演示摄取误写入正式账本（`史记五帝本纪片段`、`Genesis 1:1-2 probe`，各 1 单元）。账本追加式不可删，这两条作为“放错位置的合法摄取”永久保留，特此记录。修复后分析 API 只认内存库（无内存库时隐式 reset），正式库从此只读；验收证明后续全链操作前后正式账本 SHA-256 不变。同时把 HTTP body 接收上限提到 2MB，超限返回正常 400 JSON 而非中断连接。

## Phase 2：拟合分与量化面板——通过

- 新增 `POST /api/analyze/run` 与 `GET /api/analyze/result`。拟合分 v1（确定性，可复算）：覆盖 40 + 条件 25 + 多样 20 + 结构 15；分差 ≤3 记实质并列（`joint_top`，不只展示第一名）。
- 验收：史记片段三候选排序 C-B(66.56) > C-A(59.44) > C-C(13.48)；同输入复算 job_id 一致；完全相同的两候选触发并列（83.0/83.0，joint_top 含两者）；越界跨度、重复 ID、空候选、未知 source 全部 400。
- 修了一个路由 bug：`GET /api/analyze/result` 初版只接了 POST，补了 do_GET 分发。

## Phase 3：签字与重构文本——通过

- 新增 `POST /api/analyze/approve`（与 CLI 同等校验：理由 ≥20 字、置信度 [0,1]、显式 human_approved）与 `GET /api/analyze/reconstruction`。批准记为独立不可变行（`job_id:approval:<candidate_id>`），签字前重构视图只返回占位，签字后返回带签字头部的句子（每句带原文跨度、单元 ID、候选、签字人）。
- 验收：占位→签字→已签三态正确；5 类非法签字全部 400；签字后 `result` 的 `trace_integrity=signed`、`mean_confidence=0.5`。
- 修了一个状态 bug：`result` 初版只读 job 行的 `approval_json`（恒 NULL），改为经 `_load_job` 读批准行。

## Phase 4：分析页 + 故事线 + 最终验收——通过

- 新增 `webdemo/analyze.html`（摄取→候选→拟合排序→量化→签字→重构文本，五段式，与目标文档顺序一致）与 `webdemo/story.html`（四步故事线：双重叙事现象→P/J 假说→为何吵一百年→亲手试，每步按钮直连真实账本数据）；首页加两个入口；服务支持 `/analyze.html`、`/story.html`。
- 浏览器黑盒验收：故事线四按钮全部点通（原文定位 `[16,70)`、5 条候选、回溯链 unbroken、健康指标）；分析页在干净内存库走完全程（摄取→并列排序→N/A 口径→签字→重构文本带签字头），截图留证。
- 最终回归：测试套件全绿；正式账本 verify 通过（26 对象、3,729 单元，含上述 2 条误摄取记录）。

## 仍然悬置

- 分析候选内容仍由人填写（机器不生成解读，只排序打分）；拟合分 v1 不含任何语义判断。
- 中文按码点计量，无分词；`analysis_jobs` 批准行用 LIKE 查询，大数据量下可加索引。
- 故事线目前只有创世记一条线；更多文明/语料的故事线待后续加。
