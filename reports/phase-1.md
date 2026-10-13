# 阶段 1 报告：训诂分层候选与人工审阅

## 设计一致性复核

阶段 0 的核心目标与设计说明一致：保留原始文本、SHA-256 内容寻址、精确字符跨度、追加式哈希链，并将决策日志纳入同一账本。已披露两项工程近似：`source_id` 当前标识完整文本对象，逐行单元另有位置绑定的 `unit_id`/`content_hash`；切分按原始换行而非句子/子句。它们没有损坏现有 `(source_id, char_range)` 回溯，但不是设计说明中“每个最小单元一个 source_id”的字面数据形状。详情见 [`design-review-phase-1.md`](design-review-phase-1.md)。

阶段 1 没有改写阶段 0 内容 ID，也没有把英文译文当作希伯来语证据。外部学术综述给出的经典候选边界为创 1:1–2:3（P）、创 2:4b–3:24（J?），并将 2:4a 作为连接句；同一综述也记载 J 是否为独立来源仍有学界分歧。来源：[Steven L. McKenzie, Bible Odyssey](https://www.bibleodyssey.org/articles/what-is-source-criticism/)。创世记两段叙事的神名、次序、词汇与结构差异另见 [Marc Zvi Brettler, TheTorah.com](https://www.thetorah.com/article/differing-conceptions-of-the-divine-creator)。

**范围限制：D 典属于《申命记》路径，不在当前《创世记》1–3 章语料内。** 当前阶段不得把 D 标到创世记；完整 J/P/D 回归门槛尚未通过，需由人类决定是否扩充语料。

## 实现与运行结果

训诂分层模板为人工可审计的候选配置，不是自动事实判定。Agent 为同一创世记争议点生成两条并行假设，各自引用原文 `source_id + char_range`，生成内容本身带内容哈希，并写入不可变的人工审阅队列。每次生成均打印“这是一个需要人工判断的决策点”。两条记录的 `confidence` 都是空值，状态均为 `pending_human_review`，`human_approved=false`；没有自动接受或选优。

| 候选 | `layer_hypothesis_id` | `review_id` | 状态 |
|---|---|---|---|
| 经典文献划分：P 与 J? | `sha256:63c6cb9b4db5ec6d1c52c8df77e16c3f8dcd64dc6283a98841b6981b1028433c` | `sha256:e1aa8c6a946530891af13753a0b87462cec9eac0bb8d21774d2d088b058d7337` | 待审；未批准 |
| P 与非 P 多来源/传统材料：不预设统一 J | `sha256:f7b935976cb23e771028a9d42ad696bff05b38b9c46d63e077456c77139d8c88` | `sha256:4e860b108175e84c95a7db16d988cf5825d49c8dce393def663f376f17ea39e4` | 待审；未批准 |

审阅 CLI 只有在人明确提交 `approve`/`reject`、`--human-approved`、签名人和至少 20 字理由后才记录决策；批准还必须由人填写 `[0,1]` 置信度。签字决定追加至 [`DECISIONS.md`](../DECISIONS.md)，并把新版本及决定字符区间再次摄入账本。本次没有执行签字操作，真实决策日志未改变。

阶段零与阶段一自动化测试共 **16/16 通过**。覆盖候选并存、重复运行幂等、`2:4a/2:4b` 边界无缝衔接、每个候选跨度精确定位回原文、空置信度、人工签字门槛及决策日志回溯。正式语料账本的既有哈希链未被阶段一改写；阶段一候选存于同一 SQLite 文件的独立、不可变表中。

## 三个完整回溯样例

以下每例从原文字符跨度定位到并列的层假设，再明确记录下游阶段尚未运行。候选假设只是待审记录，不是已接受的历史解释。

### 样例 A：创世记 1:1

- 原文：`In the beginning God created the heaven and the earth.`
- 原文引用：`source_id=sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b`，`char_range=[16,70)`；对应行单元 `unit_id=sha256:5b2c92b84d288bfb4561296db629e8ab2f9d61f3fc226462f0217f4a9822234c`。
- 并列分层候选：两条候选均将创 1:1–2:3 暂标为 P；其记录 ID 分别为 `sha256:63c6cb9b4db5ec6d1c52c8df77e16c3f8dcd64dc6283a98841b6981b1028433c` 与 `sha256:f7b935976cb23e771028a9d42ad696bff05b38b9c46d63e077456c77139d8c88`，均待人工核定。
- 还原提议：未运行（阶段 2）。残余判定：未运行（阶段 4）。

### 样例 B：创世记 2:4 的子节边界

- 译文原文：`2:4 These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens,`
- 连接短语引用：`source_id=sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b`；`2:4a=[4605,4691)`、`2:4b=[4691,4752)`；两段均回到行单元 `unit_id=sha256:2c06822d0b10e01588684d45707cadb0724e6bdaa19386475e4a615810988ce6`。两段在字符坐标上相邻、无遗漏或重叠。
- 并列分层候选：经典路径暂将 2:4a 归 P、2:4b 起归 J?；替代路径暂将 2:4a 归 P、2:4b 起归“非 P／传统材料（J 归属未定）”。这是边界与标签的待审呈现，不是算法裁决。
- 还原提议：未运行。残余判定：未运行。

### 样例 C：创世记 3:1

- 原文：`3:1 Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?`
- 原文引用：`source_id=sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b`，`char_range=[7484,7671)`；对应行单元 `unit_id=sha256:7bb684c2a15ca8d1678d97bf351427b1e2b2a770bbbf80e3e2fe43fff686fece`。
- 并列分层候选：经典路径暂列为 J?；替代路径暂列为非 P 传统材料、J 归属未定。两个候选均保持完整，不合并、不排序。
- 还原提议：未运行。残余判定：未运行。

## 指标与验收门槛

| 指标 | 阶段 1 当前值 | 说明 |
|---|---:|---|
| 新增语料 | 0 | 仍使用阶段 0 的单一测试语料 |
| 新增分层假设 | 2 | 均为待审候选，尚无有效分层 |
| 新增还原提议 / 残余 / 分支 | 0 / N/A / 0 | 阶段 2/4/分支治理尚未执行；N/A 不填作零 |
| 残余标记比例 | N/A | 残余探针未运行；下降不是进步 |
| 争议节点平均平行分支数 | N/A；临时候选为 2 条 / 1 个争议点 | 正式 fork 尚未实现；候选数单独展示，未冒充已批准分支；指标下降不是进步 |
| 平均置信度 | N/A | 置信度留待人工填写；无新证据时上升是告警信号，不是进步 |
| 自动化测试通过率 | 100%（16/16） | 阶段零 9 项 + 阶段一 7 项 |

**阶段 1 状态：实现已进入，结构性保留测试通过；阶段验收暂不宣告完成。** 两条候选仍需人工审阅；完整 J/P/D 回归需要《申命记》语料。阶段 2 未启动。

## 本阶段我不确定、需要人工复核的地方

- 请审阅上述两条候选是否都应作为平权解释保留；若要批准，需分别指定置信度、签字人和理由。系统不会替人填分或签字。
- 第二条“非 P 多来源/传统材料”目前是有学术来源支撑的宽口径替代路径，不是某一学者完整、细粒度的重建；是否接受这类聚合标签需人工确认，或提供希望纳入的具体替代模型/文献。
- 当前 KJV 译文没有希伯来文原文；“Elohim/YHWH”等词面观察不能从这份语料单独验证。
- D 典不属于《创世记》1–3 章。是否扩充到《申命记》以完成启动说明中的 J/P/D 回归测试，仍需明确。
