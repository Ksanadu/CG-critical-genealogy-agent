# 阶段 0 报告：语料摄取与账本

## 结果

阶段 0 已完成并通过验收。系统只执行原文保存、内容寻址、字符跨度登记和哈希链核验；没有运行训诂分层、还原生成、残余判断或分支选择，现阶段流程到此停止。

测试语料为《创世记》1–3 章 KJV 英文文本，共 80 节：第 1 章 31 节、第 2 章 25 节、第 3 章 24 节。逐行账本包含 3 个章标题、80 个经文行和 2 个空行，共 85 个单元；原文占 11,010 UTF-8 字节、11,008 个 Python Unicode 字符码点。源文措辞取自 [angono/bible-kjv-json 的 Genesis.json](https://raw.githubusercontent.com/angono/bible-kjv-json/master/Genesis.json)，本地格式仅增加章标题、节号和换行，详见 [`data/sources/README.md`](../data/sources/README.md)。为满足项目自身记录的可回溯要求，初始化版 [`DECISIONS.md`](../DECISIONS.md) 也作为独立治理文本摄入账本：5 个单元，全文引用范围为 `[0, 176)`。因此正式账本共含 2 个内容对象、90 个单元；历史测试语料仍为 1 份、85 个单元。

- Genesis `source_id`：`sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b`
- DECISIONS.md `source_id`：`sha256:d3a0f8c6be8d7380647ffb0aee90848608cbf5ce68e7e0805ecf0579c9eafea6`
- Genesis 账本单元：85；决策日志单元：5；总计：90
- 哈希链头：`sha256:45a4ff0dd6bdf7c90e697ebfa42557d5f37fa958f53f80c1c314a809b9a9050f`
- 自动化测试：9/9 通过；测试覆盖对象篡改、账本行更新/删除拒绝、账本头篡改、重复摄取幂等、Unicode 字符偏移、全部非空短区间回读，以及真实语料上的 100 个固定种子随机区间。
- 正式数据库：`data/ledger.sqlite3`；原文对象按哈希存放于 `data/objects/`。

## 实现边界

完整原文对象以 UTF-8 原始字节的 SHA-256 作为 `source_id`。每个逐行单元另有位置绑定的 `unit_id` 和文本内容哈希：相同句子即使在不同位置重复，也不会混淆其字符坐标。单元清单同时保留 `source_id`、原文 `text_span`、左闭右开的 `char_range`、单元哈希和账本链字段。账本用 SQLite 追加记录、全局序号和前向哈希连接；数据库触发器阻止常规更新/删除，`verify` 会校验内容对象、分段覆盖、字符跨度、单元哈希、序号、前向链接及账本头。

区间坐标按 Python 字符串索引，即 Unicode 码点，不是 UTF-8 字节偏移。原文和区间不做 Unicode 规范化；行切分沿用输入文件的换行边界并保留换行。CLI 提供 `ingest`、`verify`、`manifest`、`locate`、`search`、`sources`。使用方法见 [`README.md`](../README.md)。

## 三个可回溯样例

以下展示“原文片段 → 内容寻址源 → 字符跨度 → 位置单元 → 哈希链记录”。源文引用均回到同一个完整原文对象。每个 `previous_hash` 指向该记录前一条账本记录；该链持续连接至上文列出的账本头。训诂分层、还原提议和残余字段明确记为“未执行”，不是被省略的判断。

### 样例 A：创世记 1:1

- 原文单元：`1:1 In the beginning God created the heaven and the earth.\n`
- `source_id + char_range`：`sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b` + `[12, 71)`
- `unit_id`：`sha256:5b2c92b84d288bfb4561296db629e8ab2f9d61f3fc226462f0217f4a9822234c`
- 单元 `content_hash`：`sha256:012e8e416ed157331520bb9ff2bb330059cd0e585a7ac90a3ceb024476c490f4`
- 链接：`previous_hash=sha256:83218cdb0a77e88de14f141f9fdff01000186bfa4cd1350bb6d45b0b349882f8` → `entry_hash=sha256:7cf6cdab2f602264d1d1c9e3d7d32773bb2ddbb272bf8f2f9e14de2e27fee22c`
- 分层假设：未执行（阶段 1）；还原提议：未生成（阶段 2）；残余判定：未执行（阶段 4）。

### 样例 B：创世记 2:4

- 原文单元：`2:4 These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens,\n`
- `source_id + char_range`：`sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b` + `[4605, 4752)`
- `unit_id`：`sha256:2c06822d0b10e01588684d45707cadb0724e6bdaa19386475e4a615810988ce6`
- 单元 `content_hash`：`sha256:9116e091906d938afa164db8a8bdaf2c387a77a04b2ff2aaf4996ccda430f230`
- 链接：`previous_hash=sha256:ed5c9b52cd37e39c92239ffd7e9488174afea85d8d8cc6410ef284b1bf0d13c6` → `entry_hash=sha256:28b3187580c3b6ec997906dc321ab0b5471fac4785c2ece230f9bc1d7695f0fd`
- 分层假设：未执行；还原提议：未生成；残余判定：未执行。

### 样例 C：创世记 3:1

- 原文单元：`3:1 Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?\n`
- `source_id + char_range`：`sha256:e817e60cbb555f7cadb5b73f04fbb1bf3d5b1bcb8fade5e7e53bb41680ff367b` + `[7484, 7671)`
- `unit_id`：`sha256:7bb684c2a15ca8d1678d97bf351427b1e2b2a770bbbf80e3e2fe43fff686fece`
- 单元 `content_hash`：`sha256:6c5ba7339d6ab6ccbea266ff937f2b01521114eaf1bee247685b7a3c304393de`
- 链接：`previous_hash=sha256:735ffb882575f603aa9a995d5fdc05c347c80c62aa7ee3237f6cfbc180e8505b` → `entry_hash=sha256:cf6a16213c7eaa77f7b007c9118bfbe419bfb64d93cb5b5ec93d2bbb660cacf0`
- 分层假设：未执行；还原提议：未生成；残余判定：未执行。

以上三例的记录只能证明原文、位置与账本链接可核验；它们不包含历史解释或学术判断。阶段 0 没有终端结论对象，因此没有人为伪造下游链路。

## 阶段指标

| 指标 | 阶段 0 基线/当前值 | 说明 |
|---|---:|---|
| 新增语料 | 1 份；85 个单元 | 完整摄入创世记 1–3 章测试文本 |
| 新增提议 / 残余 / 分支 | 0 / 0 / 0 | 对应解释模块尚未运行；不代表已作出“无残余”判断 |
| 残余标记比例 | N/A | Residue 模块尚未建立；不得把它记作 0，也不得把后续下降视作进步 |
| 争议节点平均平行分支数 | N/A | 尚无争议节点/分支数据；该指标下降不是进步 |
| 平均置信度 | N/A | 没有提议记录；无新证据时置信度上升应视作告警信号，而非进步 |
| 阶段 0 测试通过率 | 100%（9/9） | 仅统计本阶段测试套件 |

目前只有一个阶段快照，没有可比较的历史曲线。指标待后续阶段产生相应数据后再形成趋势；不会用缺失数据填零。

## 本阶段我不确定、需要人工复核的地方

- KJV 仅作为阶段 0 的公开文本样本，不构成对英文译本、底本文本或学术版本的选择判断。源仓库链接指向可变的 `master` 分支；本地语料的 `source_id` 固定了本次实际摄入的字节，但未保存上游 JSON 原始快照或提交号。
- 逐行单元是可复现的机械切分，不保证等同于句法或文献学意义上的最小语料单元；换行形式变化会改变单元地址，但完整原文哈希与字符区间仍可校验。
- 字符偏移的跨语言交换约定采用 Unicode 码点。未来若接入按 UTF-16 代码单元计数的客户端，需要显式转换并测试，不得混用坐标。
- 尚未实现人工决策队列、训诂分层、提议/事实类型约束、残余回归守护、分支治理或健康度仪表盘；这些属于后续阶段，本报告不将其标记为已验收。

**阶段门槛结论：通过。** 当前按启动说明停在阶段 0；未进入阶段 1。
