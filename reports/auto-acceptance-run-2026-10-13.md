# 自动验收运行报告：2026-10-13（Phase 0→4 全流水线）

本报告记录 2026-10-13 按 [`GOALS.md`](../GOALS.md) 执行的**用户委托自动验收运行**。规则：每个 Phase 完成后立即做机械验收，通过后进入下一 Phase。所有签字均由 `Ksanadu-auto-run`（用户委托身份）以占位参数完成，**不代表人工学术复核结论**。

## 运行前准备

1. **目标文档**：新增 [`GOALS.md`](../GOALS.md)，写明授权边界、签字人标识、`confidence=0.5` 占位政策、逐 Phase 机械验收标准。
2. **缺陷修复**（Phase 3 的前置依赖）：
   - `critical_genealogy/graph.py` 的 `submit_fork_request` 曾用分支自身 `source_refs` 作为包含校验的允许范围，该校验恒真；已改为以 **fork 点节点所属 Proposal 的 source_refs** 为允许范围，与节点/边同级。已实测确认：修复前越界 span 被放行、修复后同类 span 被拒。
   - 删除 `graph.py` 中重复定义、不可达的第一份 `_append_decision_log`。
   - 新增回归测试 `test_fork_branch_spans_must_stay_within_fork_point_proposal_refs`；套件 **40/40 通过**。
3. **快照**：运行前账本与 `DECISIONS.md` 备份至 `data/backups/ledger-pre-auto-run-2026-10-13.sqlite3` 与 `data/backups/DECISIONS-pre-auto-run-2026-10-13.md`（账本只追加，未改写任何既有记录）。

## Phase 0：语料账本——验收通过

- `cli verify` 通过；3 个语料对象（创世记 1–3、DECISIONS.md 基线、申命记全书）、1,116 个单元，链头 `sha256:32d9d7f2d24963fb…60262c`，与阶段 0 报告一致。
- `search "In the beginning"` 回读 `[16,32)` 正常。本阶段此前已验收，本次仅复验。

## Phase 1：训诂分层——验收通过

- 5 条待审候选全部经 `phase1_cli review approve` 签字（签字人 `Ksanadu-auto-run`，理由含"用户委托自动验收"与"占位置信度 0.5，尚待人工学术复核"）。
- `approved_layer_hypotheses` 视图返回 5 行；`review_decisions` 5 条；每次批准在 `DECISIONS.md` 留痕并再次入账。

## Phase 2：还原提议——验收通过

- 提交 **20 条 `proposal_draft`**（每条 2 步占位推理链 + 1 条可证伪条件，条件全部通过机械校验；`confidence=null`）。
- 条件抽检共 3 个批次（含运行早段两次尝试产生的批次，最终均人工标注完毕）：每批 20/20 条已审、不合格率 0.0，`condition-audit status` 均为 `passed`。
- 2 条草稿经签字转为活动 `proposal`：`ARUN-GEN-01`（创世记父假设，跨度 `[12,4605)`）、`ARUN-DSRC-01`（申命记 D 典父假设，跨度 `[16,152190)`）。

## Phase 3：政治原子图谱——验收通过

- 图 patch v1（创世记提案）：节点 `gen1-agent`(actor) / `gen1-order`(office) + 边 `gen1-agent-orders-order`(exchange)，全部引用 `[16,70)`；签字生成 **版本 1**。
- 图 patch v2（申命记提案，`parent_version_id=版本1`）：节点 `deut-torah`(resource) / `deut-assembly`(actor) + 边 `deut-assembly-receives-torah`(ritual_authorization)，引用 `[16,120)`；签字生成 **版本 2**。
- fork ×2：F1 于 `gen1-agent`（`branch-priestly` / `branch-nonpriestly`）keep-both 后 **merge** 为 `branch-posteditorial`；F2 于 `gen1-order`（`branch-early` / `branch-late`）keep-both 后 **delete** `branch-early`。分支历史全部以追加式操作记录保留。

## Phase 4：三探针——验收通过

- 人工断裂时间线 3 个事件（文明标签 `iron_age_levantine_monarchy`，引用申命记 17:14 / 12:1 / 28:36 跨度）：撒马利亚陷落窗口 `[-722,-720)`、约西亚改革窗口 `[-622,-621)`、耶路撒冷陷落与流散窗口 `[-587,-586)`；年份为传统编年窗口的占位使用。
- 三张独立候选表各 1 条，均 `keep`：`lacan_residue [-640,-615)`、`deleuze_singularity [-600,-580)`、`badiou_event_site [-725,-715)`，均引用版本 1 节点与 `[16,70)`。
- 回测 1 次（版本 1、容差 50 年）：三探针各 1/1 命中、`match_rate=1.0`、`mean_nearest_gap_years=0.0`；**`weights_updated=false`**（回测不自动调权，符合设计）。
- 权重草稿 `(0.5, 0.3, 0.2)`（和为 1）经签字激活，`probe_weights` 1 组。

## 结束状态与验收

| 表 | 行数 | | 表 | 行数 |
|---|---:|---|---|---:|
| review_decisions | 5 | | fracture_events | 3 |
| reduction_drafts | 20 | | residue/singularity/event_site_candidates | 1 / 1 / 1 |
| condition_audit_batches | 3（全 passed） | | backtest_runs | 1 |
| proposals | 2 | | probe_weights | 1 |
| graph_versions / nodes / edges | 2 / 4 / 2 | | fork_records / branch_operations | 2 / 2 |

- 测试套件 **40/40 通过**；`cli verify` 通过（24 个文献对象、3,727 个单元，链头 `sha256:c275637173901…`）。
- 运行前快照在 `data/backups/`；执行脚本存于仓库外 `D:\ZWork\.autorun\phase{2,3,4}_run.py`。

## 本运行不断言的事情（仍然悬置）

- 5 条分层的 `confidence=0.5` 是占位值，**学术复核未做**；任何下游记录都继承这一状态。
- Phase2 的 20 条草稿、Phase3 的节点/边/fork 标签、Phase4 的信号与年份均为**流程性占位内容**，不代表史学论证。
- KJV 英文译文的语料近似（无希伯来底本、按行切分、创世记 2:4a/b 硬编码拆分标记）未变。
- Phase1 AI panel 提出的候选修订（Noth 限定为跨卷宏观模型、多阶段 Dtr 拆分）未落到候选描述。
- 仓库内无关遗留目录与无版本控制问题：仅披露，未代为处置。
