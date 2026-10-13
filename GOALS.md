# 目标文档：批判谱系学 Agent 全流程自动验收运行

本文件是本次运行的**总体目标与规则说明**。运行方式由用户于 2026-10-13 指定：先写本目标文档，然后按 Phase 0 → Phase 4 顺序推进，每完成一个 Phase 即做机械验收，通过后自动进入下一 Phase，以此循环，直至 Phase 4 验收完毕。

## 1. 项目总目标（不变的部分）

构建一个**不替人做史学裁决**的谱系学工作台：原文按内容寻址入库并保留精确字符跨度；训诂分层、还原提议、政治原子图谱、残余/奇点/事件位探针全部以"待人工审阅"状态存在；每一条事实化记录都必须带签字人、≥20 字理由和（适用时）人工置信度；`DECISIONS.md` 的每次追加都会再次进入内容寻址账本。

## 2. 本次运行的授权与边界

- **授权**：用户已明确授权本次运行以"自动验收"方式逐 Phase 推进。凡记录需要人类签字的环节（分层批准、提案批准、图 patch 批准、fork keep-both、分支 merge/delete、时间线批准、探针 keep、回测、权重批准），一律以用户委托身份签署。
- **签字人标识**：`Ksanadu-auto-run`。所有相关 `--reason` 必须包含"用户委托自动验收"字样，注明为**占位/流程性决定**。
- ** confidence 政策**：凡数据库要求 `[0,1]` 人工置信度的批准，一律填 `0.5`，理由中注明"占位置信度 0.5，待人工学术复核"。0 不表示否定，也不表示任何学术权重。
- **本运行不断言的事**：不断言任何来源分层为史学事实；不断言任何映射已被学术共同体接受；不修改任何已存在的账本记录（账本只追加，不更新/删除）。
- **候选内容性质**：Phase 2 的 20 条草稿、Phase 3 的节点/边标签、Phase 4 的探针信号与断裂时间线年份，均为**为打通全流水线而构造的流程性内容**，多数引用标准教科书定位（如约西亚改革 622/621 BCE、耶路撒冷陷落 587/586 BCE、撒马利亚陷落 722/720 BCE 的传统编年窗口），不是本运行做出的学术论断。报告与 README 中必须如实披露这一点。

## 3. 逐 Phase 验收标准（机械可判）

每个 Phase 的"完成"= 下面全部机械条件满足，且 `python -m unittest discover -s tests` 全绿。

- **Phase 0 语料账本**：`cli verify` 通过；`sources` 至少含 Genesis 1-3、Deuteronomy、DECISIONS.md 三个对象；测试覆盖篡改/更新/删除拒绝、链头核验、区间回读。（本次运行前已达成，验收即可。）
- **Phase 1 训诂分层**：5 条候选（创世记 2、申命记 3）全部经 `phase1_cli review approve` 签字；`approved_layer_hypotheses` 视图返回 5 行；每条 approval 在 `DECISIONS.md` 留有记录且被账本收录。
- **Phase 2 还原提议**：提交 ≥20 条 `proposal_draft`（每条父假设均获 Phase 1 批准、来源跨度可解析、条件通过机械校验）；`condition-sample` 抽样 20 条；`condition-audit review` 逐条人工标注后 `condition-audit status` 结果为 `passed`（不合格率 ≤10%）；至少 1 条草稿经 `review approve` 转为活动 `proposal`，`proposals` 表非空。
- **Phase 3 政治原子图谱**：基于活动 Proposal 提交图 patch 并签字，`graph_versions` ≥1，`graph_nodes`/`graph_edges` 非空且类型在白名单内；至少 1 个 fork 经 `keep-both` 生效；至少记录 1 次 merge 和 1 次 delete 分支操作；所有分支历史保留可查。
- **Phase 4 三探针**：`residue_candidates`/`singularity_candidates`/`event_site_candidates` 各 ≥1 条且全部 `keep`；人工断裂时间线 ≥3 个事件已批准；`backtest_runs` ≥1 条且 `weights_updated=false`；`probe_weights` ≥1 组合法权重（和为 1）经签字激活。
- **收尾**：更新 `reports/auto-acceptance-run-2026-10-13.md` 与 README 状态段；正式账本再次 `verify` 通过。

## 4. 前置缺陷修复（Phase 3 依赖）

运行 Phase 3 前须先修复审查确认的门禁缺陷，并补回归测试：

1. `graph.py::submit_fork_request` 的 fork 分支 source_refs 包含校验实际为空转（用分支自身引用作为允许范围），须改为以 **fork 点节点所属 Proposal 的 source_refs** 为允许范围，与节点/边同级门禁一致。
2. `graph.py` 中 `_append_decision_log` 重复定义两次，删除不可达的第一份。

## 5. 运行前快照

正式账本只追加不更新，但为可回滚参考，运行前在 `data/backups/` 保存 `ledger.sqlite3` 与 `DECISIONS.md` 的快照。

## 6. 结束后仍然悬置的事项（本运行不解决）

- 5 条分层候选的**学术复核**（置信度 0.5 只是占位）；
- KJV 英文译文的语料近似（无希伯来底本、按行切分、创世记 2:4a/b 拆分标记为硬编码英文字符串）；
- Phase1 AI panel 提出的候选修订建议（Noth 限定为跨卷宏观模型、多阶段 Dtr 拆分为模型家族）尚未落到候选描述；
- 仓库内与谱系学无关的遗留目录（`recon/`、`ashfall-recon/`、`oshino_ougi_card.*`、`data/dsh-migrate/` 含 134MB 备份）与无版本控制问题——本运行只披露，不代为删除。
