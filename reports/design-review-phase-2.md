# 设计一致性复核：进入阶段 2 前

## 再次确认

阶段 0/1 的核心实现仍沿着设计说明工作：原文是内容寻址对象；文本引用保留 `source_id + char_range`；Phase1 把 Genesis 与 Deuteronomy 的学术框架保留为并列、待审候选；`confidence` 未被系统自动补分；D（经典 Pentateuchal source）与 Dtr（Deuteronomistic History）分开标记。五条 Phase1 候选仍均为 `human_approved=false`，没有有效分层。

已披露的阶段 0 差异仍然存在：`source_id` 是整份文本 hash，逐行单元另有 `unit_id/content_hash`；切分按换行而非句子/子句；语料为 KJV 译文，不含希伯来文底本。这些在 [`phase-1-deuteronomy-addendum.md`](phase-1-deuteronomy-addendum.md) 和 [`design-review-phase-1.md`](design-review-phase-1.md) 中说明，没有在 Phase2 中被当作已解决。

## Phase2 入口边界

设计契约要求每条**生效的还原提议**必须携带 `rule_id`、数值 `confidence`、`source_id`、`reasoning_chain` 和可回溯引用；数据模型只能将其写成 `proposal`，不得存在 `fact` 类型。Phase2 还要求可证伪条件指向可观测事实；其格式/可观测性检查属于机械工作，可以自动化。

但“是否生成某条具体映射”及其置信度是人工决策。Phase1 的五条分层假设尚未签字，所以本次 Phase2 只建立结构性入口：条件构造/校验、独立的 `proposal_draft` 待审记录、严格的 Proposal 写入 schema、人工批准路径。**没有人的映射输入，不生成历史还原内容；没有显式签字和评分，不写入有效 Proposal。** Phase2 的“随机抽样 20 条条件、人工评估”门槛尚未满足前，不宣称阶段通过，也不进入 Phase3。

此边界满足用户本轮“进入 Phase2”的工程要求，同时保留项目规定的阶段验收和人工判断门槛。
