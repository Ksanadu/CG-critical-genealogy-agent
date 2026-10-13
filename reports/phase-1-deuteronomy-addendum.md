# 阶段 1 补充报告：按人工选择纳入《申命记》

## 人工选择与范围

用户选择扩充同版 KJV《申命记》，并选择将现有候选继续留在待审队列。本报告记录这次范围扩充；没有批准或拒绝任何历史分层，也没有填写置信度。

《申命记》完整 34 章、959 节已由公开上游 JSON 机械格式化并摄入账本。来源、转换规则与上游哈希见 [`data/sources/README.md`](../data/sources/README.md)。原始 JSON 为 174,327 字节，SHA-256：`82116f948cbbec3e5bc893a9d3da9b04f91eb91e2037aadc786d2793363eb5fb`；格式化后为 152,190 个 Unicode 码点、152,296 个 UTF-8 字节、1,026 个账本单元。

- Deuteronomy `source_id`：`sha256:595b6a472969924c59a75898d6e9af6aeab1e00c69bb699c0d7413bf3e5ae698`
- 当前正式账本：3 个文本对象、1,116 个单元
- 哈希链头：`sha256:32d9d7f2d24963fba486fcd56c4f08a240d20b574719ec4417a818925a60262c`
- Phase1 自动化测试：20/20 通过；覆盖全书逐节区间定位、转换复现、D 与 Dtr 候选区分、无自动批准及人工签字约束。

## D 与 Dtr 分开记录

综述指出，经典 Pentateuch 来源批评以 D 指向 Deuteronomy；Deuteronomistic History（Dtr）则是另一种覆盖 Deuteronomy 至 Kings 的历史编纂模型。后者内部又有单一编者、双版次、后续编订层和书吏学派等不同方案。两者相关但不等同，故数据库分别登记 D 与 Dtr 候选，不以一个标签替代另一个。

学术来源：[McKenzie, What Is Source Criticism?](https://www.bibleodyssey.org/articles/what-is-source-criticism/)；[McKenzie, Deuteronomistic History](https://www.bibleodyssey.org/articles/deuteronomistic-history/)。这些是候选背景，不是程序自动裁决的依据。

## 当前待审队列

Genesis 的两条候选仍在队列中，详见 [`phase-1.md`](phase-1.md)。本次为 Deuteronomy 新增 3 条待审候选；3 条均为 `confidence=null`、`human_approved=false`：

| 候选 | `layer_hypothesis_id` | `review_id` | 状态 |
|---|---|---|---|
| 经典 JEDP 划分：D 典（申命记来源候选） | `sha256:36548fa34e9d0d090ba3bae96a04ddf0a83d07f8213d8c775c27981bd3d93c14` | `sha256:575cf0150d8a370ff90cd80ea49d3fe81a207843d9434194e1aecd4c98dbfb13` | 待审 |
| Noth 单一编者的 Dtr 历史：申命记作为起始卷 | `sha256:dc92012e6e38a4a7595e5f9521a0486b0028873eb26653cb52f0ef064d395ca2` | `sha256:d5831c96b186603dc91aa08790d988af5c7e65988226224dbee4f4cd5d12b8f6` | 待审 |
| Dtr 多阶段编纂／学派修订路径 | `sha256:ff682c744eae646897d920b6fc63202a8d5a7631d857b984a8f3d227326fe5db` | `sha256:42d3c7ce403b677d297e90f303d8bacf99edca4cf5d96ebb1dd6d4d1c5257039` | 待审 |

连同 Genesis 两条候选，当前共有 **5 条待审分层候选、0 条获批**。Agent 每次运行仍打印人工决策提示；批准流程要求显式 `--human-approved`、签字人、至少 20 字理由和人工填写的置信度。

## 三个回溯样例

### 样例 A：创世记 1:1

- 原文片段：`In the beginning God created the heaven and the earth.`
- 引用：Genesis `source_id=sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b`，`char_range=[16,70)`。
- 分层候选：Genesis 两条候选均暂列 P；候选 ID 为 `sha256:63c6cb9b4db5ec6d1c52c8df77e16c3f8dcd64dc6283a98841b6981b1028433c` 与 `sha256:f7b935976cb23e771028a9d42ad696bff05b38b9c46d63e077456c77139d8c88`，均待审。
- 还原提议：未运行（阶段 2）；残余探针：未运行（阶段 4）。

### 样例 B：创世记 2:4a / 2:4b

- 原文片段：`...when they were created, in the day that the LORD God made the earth and the heavens,`
- 引用：Genesis `source_id=sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b`；`2:4a=[4605,4691)`，`2:4b=[4691,4752)`。
- 分层候选：传统路径将 2:4a 暂列 P、2:4b 暂列 J?；替代路径将 2:4b 标作非 P、J 归属未定。两条都保留，未排序、未批准。
- 还原提议：未运行；残余探针：未运行。

### 样例 C：申命记 1:1–34:12

- 开始原文：`1:1 These be the words which Moses spake unto all Israel...`
- 末尾原文：`34:12 And in all that mighty hand, and in all the great terror which Moses shewed in the sight of all Israel.`
- 全书范围：Deuteronomy `source_id=sha256:595b6a472969924c59a75898d6e9af6aeab1e00c69bb699c0d7413bf3e5ae698`，`char_range=[16,152190)`；三条 D/Dtr 候选均引用此原文范围。
- 分层候选：经典 D 典路径、Noth 单一 Dtr 历史路径、Dtr 多阶段修订路径分别保存。全书跨度只标明本次审阅对象，不断言每一节都来自同一作者或时期。
- 还原提议：未运行；残余探针：未运行。

## 指标与门槛

| 指标 | 当前值 | 说明 |
|---|---:|---|
| 本次新增语料 | 1 份；1,026 个账本单元 | 完整 Deuteronomy KJV |
| 本次新增分层候选 | 3 | 经典 D、单一 Dtr、多阶段 Dtr；全部待审 |
| 累计分层候选 / 已批准 | 5 / 0 | Genesis 2 条，Deuteronomy 3 条 |
| 新增还原提议 / 残余 / 正式分支 | 0 / N/A / 0 | 阶段 2/4/分支治理尚未运行 |
| 残余标记比例 | N/A | 探针尚未运行；缺失值不填零，下降不是进步 |
| 正式平行分支平均数 | N/A | 5 条是待审假设，不是批准 fork；临时候选数量分别为 Genesis 2、Deuteronomy 3。该指标下降不是进步 |
| 平均置信度 | N/A | 所有候选均未评分；无新证据时置信度上升是告警信号，不是进步 |
| 自动化测试通过率 | 100%（20/20） | 阶段 0 + 阶段 1 测试 |

**阶段 1 仍等待人工审阅，Phase2 未启动。** 扩充语料补齐了 D 典的适用范围测试，但还未取得任何 D/J/P 分层签字，也未替各框架评分。当前 KJV 译文不能单独验证希伯来语词形或神名特征。
