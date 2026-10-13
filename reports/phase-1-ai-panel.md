# Phase1 AI panel recommendation

## 委托与方法

本次按用户指令召集四个独立审阅视角：Genesis 来源批判、Deuteronomy 的 D/Dtr 史学、治理边界，以及一名独立综合反方。审阅只针对现有五条待审假设与报告中列出的学术来源；没有修改文件、数据库、候选状态或 [`DECISIONS.md`](../DECISIONS.md)。

## 面板决定

**保留五条假设作为并列的待检验目录项，不淘汰任何一条；不将任何一条标成已批准或史实；五条 `confidence` 全部保持 `null`。** 投票数量不能换算置信度：候选不全是互斥模型，且没有校准评分方法。`null` 表示未评分，不表示 0。

| 候选 | 面板结论 | 适用范围与签署前修订 |
|---|---|---|
| Genesis 经典 P/J? | 保留 | 保留 `J?` 的问号与 Gen 1:1–2:3 / 2:4a / 2:4b–3:24 的候选边界。KJV 译文不能单独证明希伯来语神名或词形，也不能把来源标签写成事实。 |
| Genesis P + 非 P／J 未定 | 保留 | 作为较宽、来源中性的候选类别；“非 P”不等于已证明的单一口传层，也不必与经典 P/J? 方案完全互斥。 |
| 经典 JEDP 的 D 典 | 保留 | `D` 是经典 Pentateuchal source 标签。整卷 Deuteronomy 仅是粗粒度待审范围，不表示全书逐节同一作者或时期。 |
| Noth 单一编者 Dtr 历史 | 保留为范围外宏观模型 | 该模型覆盖 Deuteronomy–Kings；当前只摄入 Deuteronomy，不能据此验证跨卷统一性。签署前应明确为“宏观模型／超出当前语料可验证范围”，不作 Deuteronomy-only 的逐节归属。 |
| 多阶段 Dtr 编纂／书吏学派 | 保留为模型家族 | Cross 双版次、Smend 编订层、Römer 书吏学派/多期修订是不同方案。当前合并描述适合作为家族索引，不应作为一个已经统一的单一模型签署；后续可拆成独立候选。 |

## 独立意见汇总

Genesis 专项审阅支持并列保留两条路径，并主张置信度留空。Deuteronomy 专项审阅支持经典 D 与多阶段 Dtr，要求把 Noth 模型限制为跨卷宏观假说。综合治理审阅主张五条均留在候选目录、绝不由票数伪造置信度或人工签字。独立反方审阅同样没有建议淘汰候选，但要求澄清 P/J? 表述及拆分多阶段模型家族。

外部依据：McKenzie 对经典 D 及 Deuteronomistic History 各模型的综述：[What Is Source Criticism?](https://www.bibleodyssey.org/articles/what-is-source-criticism/)；[Deuteronomistic History](https://www.bibleodyssey.org/articles/deuteronomistic-history/)。Genesis 创世叙事差异的定性讨论见 [Brettler, Differing Conceptions of the Divine Creator](https://www.thetorah.com/article/differing-conceptions-of-the-divine-creator)。这些资料支持“存在这些学术框架”，不等于判定哪一框架为历史真相。

## 数据库状态与边界

AI panel vote 是推荐记录，不是人工签名。五条记录仍为 `human_approved=false`、`confidence=null`；没有向 [`DECISIONS.md`](../DECISIONS.md) 写入人工决定，也没有生成活动还原提议。若用户要把 AI 推荐直接转成某种有效状态，需另行明确改动治理规则；当前数据库字段不会把 AI vote 伪装成人类签字。

**最终建议：**保留五条假设；不选单一胜者；不填置信度；先按表中范围说明修订候选描述，再由人类显式签署后，Phase2 才能将其作为已批准父假设使用。
