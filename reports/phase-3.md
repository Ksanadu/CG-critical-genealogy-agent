# 阶段 3 报告：政治原子图谱与谱系分叉入口

## 设计复核结论

Phase3 的工程结构已实现：节点与边各自限定为四种类型；图补丁按完整快照生成版本；图节点/边附带 Proposal 和原文 `source_id + char_range`；补丁、fork、签字与合并/删除操作都保留不可变审计记录。未知节点/边类型在写入前拒绝。图补丁只有引用已生效 Proposal 才能提交；因此 Phase1/2 父项尚未签字时，图谱保持为空。

当前阶段边界：五条 Phase1 候选仍未签字；正式 Phase2 还原 Proposal 数为 0，20 条可证伪条件人工抽检为 0/20。原设计的阶段门槛尚未通过。本次依用户指令进入 Phase3 的**结构实现与空图验收**，不表示 Phase2 或 Phase3 的史学内容门槛已通过，也不生成任何节点、边或分支。阶段 0 的字段/切分/译文近似见 [`design-review-phase-2.md`](design-review-phase-2.md)。

## 已实现的硬边界

- 节点类型固定为 `actor`、`office`、`resource`、`ritual_symbolic_capital`；边类型固定为 `coercion`、`exchange`、`fictive_kinship`、`ritual_authorization`。
- 每个版本是完整快照，不自动继承、合并或挑选其他版本的图内容；已有图版本后提交新版本必须显式给出 `parent_version_id`。
- 图补丁是 `graph_patch_draft`，打印人工判断提示并进入审阅队列；只有人工显式批准后才写入 `graph_versions`、`graph_nodes`、`graph_edges`。
- Fork 申请仅排队，批准动作 `keep_both` 将 A/B 两支并列保存，不作优选。
- 合并/删除必须显式传 `human_approved=true`、签字人和至少 20 字理由；合并还需人工提交结果分支内容。操作是追加式状态事件，底层分支历史不会物理擦除。
- 每个节点、边和分支引用都要解析回内容对象与字符范围；图记录自身亦有内容 hash。人工操作追加至 [`DECISIONS.md`](../DECISIONS.md) 并将日志新版本再次摄入账本。

## 当前运行状态

- 活动 Proposal：0；待审 Phase2 草稿：0。
- 图版本 / 节点 / 边：0 / 0 / 0。
- Fork 请求 / 生效 fork / 分支操作：0 / 0 / 0。
- 正式图谱快照：空；Phase3 CLI 查询已核验为空。
- 自动化测试：35/35 通过，含无效节点/边类型拒写、patch 未签不得落图、源跨度解析、fork 保留两支、无签字/理由不足时 merge/delete 被拒，以及签字操作保留分支历史。
- 原文账本：3 个对象、1,116 个单元；哈希链头 `sha256:32d9d7f2d24963fba486fcd56c4f08a240d20b574719ec4417a818925a60262c`，Phase3 schema 初始化未改写源文链。

## 三个回溯案例

### 案例 A：创世记 1:1

- 原文片段：`In the beginning God created the heaven and the earth.`
- 引用：Genesis `source_id=sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b`，`char_range=[16,70)`。
- 相关 Phase1 候选：经典 P/J? 与 P/非 P 两条，均待审。Phase2 Proposal：无。Phase3 节点/边/fork：无。

### 案例 B：创世记 2:4a / 2:4b

- 原文范围：Genesis `source_id=sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b`；`2:4a=[4605,4691)`、`2:4b=[4691,4752)`。
- 相关 Phase1 候选：传统 P/J? 与来源中性的 P/非 P 并列，均待审。Phase2 Proposal：无。Phase3 无分叉裁决或合并。

### 案例 C：申命记 1:1–34:12

- 原文范围：Deuteronomy `source_id=sha256:595b6a472969924c59a75898d6e9af6aeab1e00c69bb699c0d7413bf3e5ae698`，`char_range=[16,152190)`。
- 相关 Phase1 候选：经典 D、Noth Dtr、Dtr 多阶段三条，均待审。Phase2 Proposal：无。Phase3 节点/边/fork：无。

三例展示的是原文到当前候选的溯源链和阶段停点，不伪造下游解释或空残余结果。

## 指标与阶段门槛

| 指标 | 阶段 3 当前值 | 说明 |
|---|---:|---|
| 新增 Proposal / Residue / fork | 0 / N/A / 0 | 无活动 Phase2 Proposal；残余 Agent 尚未运行 |
| 残余标记比例 | N/A | 没有残余记录；缺失不填零，下降不是进步 |
| 正式平行分支平均数 | N/A | 尚无正式 fork；两条 Genesis 和三条 Deuteronomy 假设仍是 Phase1 待审候选，不能冒充分支数；下降不是进步 |
| 平均置信度 | N/A | 无活动 Proposal；未自动评分，置信度上升不是进步 |
| 自动化测试通过率 | 100%（35/35） | Phase0–3 结构与门控测试 |

**Phase3 状态：图谱与分叉基础设施已就绪；数据阶段未通过。** 由于当前没有已批准 Proposal，活动图保持为空；Phase4 未启动。

## 本阶段我不确定、需要人工复核的地方

- Phase1 五条假设的 AI panel 结果是“保留为候选”，不是人类批准；见 [`phase-1-ai-panel.md`](phase-1-ai-panel.md)。在父分层与 Phase2 提议完成人工审阅前，图谱内容无法进入活动表。
- “完整快照”要求每次 patch 携带该版本完整的节点/边集合；后续若改为增量补丁，需要再定义继承及冲突解决规则，不能静默合并。
- Merge 操作记录的是人类编写的结果分支及审计事件，不会自动把两个子图做语义融合；自动融合仍不属于当前实现。
- KJV 英文译文不能单独支持希伯来语词形判断；任何图边都必须来自人类提交的、已签字 Proposal，并带原文跨度。
