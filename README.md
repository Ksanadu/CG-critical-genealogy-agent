# 批判谱系学 Agent：阶段 0–4（结构全部实现；2026-10-13 已完成一轮用户委托自动验收运行，见 [`reports/auto-acceptance-run-2026-10-13.md`](reports/auto-acceptance-run-2026-10-13.md)，其中所有签字均为占位性质，学术复核仍悬置）

阶段 0 实现机械性的语料摄取与账本：原始 UTF-8 字节按 SHA-256 寻址；文本按原始换行切成连续单元；每单元保存 Python Unicode 字符坐标、精确文本、单元哈希与追加式哈希链。SQLite 触发器阻止常规更新/删除，`verify` 会重新核验源对象、跨度清单、链连接及账本头。

阶段 1 为创世记 1–3 章建立 P/J? 与 P/非 P 候选，并按用户选择扩充完整 KJV《申命记》以检验 D 典；另保留 Noth 单一编者 Dtr 与多阶段 Dtr 修订路径。当前共 5 条候选，均已于 2026-10-13 自动验收运行经用户委托签字（占位置信度 0.5，`Ksanadu-auto-run`），但**人工学术复核仍未进行**，未经人工复核不应视为史实结论。初始设计复核与扩充后的范围记录见 [`reports/design-review-phase-1.md`](reports/design-review-phase-1.md) 和 [`reports/phase-1-deuteronomy-addendum.md`](reports/phase-1-deuteronomy-addendum.md)。

阶段 2 已建立机械可证伪条件校验、人工提供映射的 `proposal_draft` 队列和严格的活动 `proposal` 写入 schema。Phase1 父假设未签字时，草稿仍只能排队；活动 Proposal 必须含规则、来源链、推理链、人工置信度及显式批准。2026-10-13 自动验收运行已提交 20 条占位草稿、完成 3 个批次各 20 条条件抽检（全部 passed）并激活 2 条活动 Proposal（`ARUN-GEN-01`、`ARUN-DSRC-01`，占位置信度 0.5）；这些记录为流程性占位内容，待人工学术复核。

阶段 3 已建立固定节点类型（actor/office/resource/ritual_symbolic_capital）与边类型（coercion/exchange/fictive_kinship/ritual_authorization）、完整快照版本、人工审阅图补丁和 fork 队列。图谱实际节点/边需来源于已签字 Proposal 并经人工批准；合并/删除只能通过带 `human_approved=true`、签字人和理由的显式操作记录，底层分支历史保留。2026-10-13 自动验收运行已生成 2 个图版本（4 节点 / 2 边）、2 个生效 fork，并记录 1 次 merge 与 1 次 delete；节点/边/fork 均为占位标签，待人工学术复核。

阶段 4 已建立 Lacan Residue、Deleuze Singularity、Badiou EventSite 三张独立候选表，人工断裂时间线、原始时间距离回测和人工权重审批入口。候选探针、时间线标注和权重调整都需人工审阅。2026-10-13 自动验收运行已批准 3 个断裂时间线事件、三类探针候选各 1 条、1 次回测（`weights_updated=false`，match_rate 1.0 为占位构造的结果）和 1 组经签字激活的权重 (0.5/0.3/0.2)；以上均为占位内容，回测数字不构成任何探针优劣结论。详见 [`reports/phase-4.md`](reports/phase-4.md)。

阶段 0 不生成训诂分层、还原提议、残余判断或分支，也不推断置信度。字符区间使用左闭右开 `[start, end)`，按 Unicode 码点计数，不按 UTF-8 字节计数；源文件哈希仍按原始 UTF-8 字节计算。

```powershell
python -m unittest discover -s tests -v
python -m critical_genealogy.cli ingest data/sources/genesis_1-3_kjv.txt --title "Genesis 1-3 (KJV)"
python -m critical_genealogy.format_kjv data/sources/deuteronomy_kjv_upstream.json data/sources/deuteronomy_kjv.txt
python -m critical_genealogy.cli ingest data/sources/deuteronomy_kjv.txt --title "Deuteronomy (KJV)"
python -m critical_genealogy.cli verify
python -m critical_genealogy.cli sources
python -m critical_genealogy.cli search "In the beginning"
```

`locate SOURCE_ID START END` 可解析任意非空字符区间；`manifest SOURCE_ID` 可导出逐单元不可变清单。数据库默认位于 `data/ledger.sqlite3`，内容对象默认位于 `data/objects/`。测试使用临时数据库，不修改正式账本。

阶段 1 候选及审阅队列：

```powershell
python -m critical_genealogy.phase1_cli propose
python -m critical_genealogy.phase1_cli --candidates data/layers/deuteronomy_candidates.json propose
python -m critical_genealogy.phase1_cli review list
python -m critical_genealogy.phase1_cli review show REVIEW_ID
python -m critical_genealogy.phase1_cli review approve REVIEW_ID --signer NAME --reason "至少二十个字符的人工审阅理由" --confidence SCORE --human-approved
```

`approve` 需要显式 `--human-approved`、人工签名、至少 20 个字符的理由和人工给定置信度；候选本身不会自动生效。拒绝候选用 `review reject REVIEW_ID --signer NAME --reason "...至少二十个字符..." --human-approved`。测试语料的版本与来源见 [`data/sources/README.md`](data/sources/README.md)；阶段一报告见 [`reports/phase-1.md`](reports/phase-1.md) 和 [`reports/phase-1-deuteronomy-addendum.md`](reports/phase-1-deuteronomy-addendum.md)。

Phase2 命令：

```powershell
python -m critical_genealogy.phase2_cli condition-check "IF CONDITION WITH AN OBSERVABLE INSCRIPTION OR DATED ARTIFACT"
python -m critical_genealogy.phase2_cli condition-build --observation OBSERVATION --location LOCATION --time-window TIME_WINDOW --impact IMPACT
python -m critical_genealogy.phase2_cli draft --parent-hypothesis-id LAYER_ID --rule-id RULE_ID --mapping MAPPING --condition CONDITION --reasoning-step REASONING_STEP --source-id SOURCE_ID --start START --end END
python -m critical_genealogy.phase2_cli review list
python -m critical_genealogy.phase2_cli condition-sample
python -m critical_genealogy.phase2_cli condition-audit status BATCH_ID
```

条件构造器只格式化人提供的观测项、地点、时间窗与影响描述；它不选择映射。草稿会打印人工判断提示并保持 `confidence=null`。活动 Proposal 的批准要求父分层已获人工签字，并且审批人显式提供评分和理由。`condition-sample` 需要至少 20 条草稿；每条样本都需经 `condition-audit review` 人工标注，未满 20 条或不合格率超过 10% 时阶段门槛保持阻断。Phase2 设计复核和进度报告见 [`reports/design-review-phase-2.md`](reports/design-review-phase-2.md) 与 [`reports/phase-2.md`](reports/phase-2.md)。

Phase3 查询和人工审阅命令：

```powershell
python -m critical_genealogy.phase3_cli types
python -m critical_genealogy.phase3_cli snapshot
python -m critical_genealogy.phase3_cli patch list
python -m critical_genealogy.phase3_cli fork list
python -m critical_genealogy.phase3_cli patch submit GRAPH_PATCH.json
python -m critical_genealogy.phase3_cli patch approve REVIEW_ID --signer NAME --reason "至少二十个字符的人工审阅理由" --human-approved
python -m critical_genealogy.phase3_cli fork submit FORK_REQUEST.json
python -m critical_genealogy.phase3_cli fork keep-both REVIEW_ID --signer NAME --reason "至少二十个字符的保留理由" --human-approved
python -m critical_genealogy.phase3_cli branch-op FORK_ID --action delete --target-branch-id BRANCH_ID --signer NAME --reason "至少二十个字符的删除理由" --human-approved
```

每份图补丁是完整版本快照，不会由 Agent 自动合并旧节点。Fork 两支均需人工批准；merge/delete 是带签字与理由的追加式状态事件，不物理删除历史记录。阶段 3 进度与当前空图状态见 [`reports/phase-3.md`](reports/phase-3.md)，设计复核见 [`reports/design-review-phase-3.md`](reports/design-review-phase-3.md)。

Phase4 候选、时间线与回测命令：

```powershell
python -m critical_genealogy.phase4_cli types
python -m critical_genealogy.phase4_cli probe list
python -m critical_genealogy.phase4_cli probe submit lacan_residue PROBE_CANDIDATE.json
python -m critical_genealogy.phase4_cli timeline submit FRACTURE_EVENT.json
python -m critical_genealogy.phase4_cli backtest run --graph-version-id VERSION_ID --civilization CIVILIZATION --tolerance-years YEARS --signer NAME --reason "人工指定时间窗并说明理由" --human-approved
python -m critical_genealogy.phase4_cli weight submit WEIGHTS.json
python -m critical_genealogy.phase4_cli weight list
python -m critical_genealogy.phase4_cli weight decide REVIEW_ID --action approve --signer NAME --reason "人工理由至少二十个字符" --human-approved
python -m critical_genealogy.phase4_cli weight active
```

Probe / 时间线 JSON 只作为待审输入；时间窗容差由人指定。回测仅输出原始匹配指标，不自动变更权重。权重建议必须由人提交并签署。Phase4 进度、当前数据空缺与未决事项见 [`reports/phase-4.md`](reports/phase-4.md)。

阶段零报告见 [`reports/phase-0.md`](reports/phase-0.md)。
