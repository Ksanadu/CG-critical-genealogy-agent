# 设计一致性复核：阶段 3 入口

## 再次确认

阶段 0/1 的既有差异未消失：`source_id` 是完整文本对象 hash，逐行单元另有 `unit_id/content_hash`；切分采用原始换行；Genesis/Deuteronomy 使用 KJV 译文。Phase1 五条候选仍 `confidence=null`、`human_approved=false`；Phase2 没有草稿、有效 Proposal 或完成 20 条人工抽检。详细复核见 [`design-review-phase-2.md`](design-review-phase-2.md) 与 [`phase-1-ai-panel.md`](phase-1-ai-panel.md)。

设计说明的 Phase3 契约要求：图节点/边类型分别固定四种；版本可查询；分叉及其两条证据链可追溯；任何合并/删除都必须由人显式批准且说明理由。当前系统此前没有 Agent4/6 的图表、版本表或分叉操作审计路径，这是尚未实现的阶段能力，不是已经通过的门槛。

## 本次 Phase3 的实施边界

用户要求进入 Phase3，因此本轮建立图谱结构、节点/边类型校验、版本化补丁和 fork 审阅/签字机制。**Phase2 尚无有效 Proposal，所以正式图谱应保持为空。** 只接受引用有效 Proposal 的人工提交补丁；其余内容只进入待审队列，不自动生成节点、边或 fork。

Stage3 的“是否保留分支”通过 `human_approved=true`、签字人及不少于 20 字理由记录。合并/删除采用追加式操作事件，不物理擦除历史分支；任何自动路径均不执行合并或删除。由于 Phase1/2 的内容门槛尚未通过，本轮只能验收 Phase3 的结构性入口，不能宣称图谱分析阶段已完成，也不进入 Phase4。
