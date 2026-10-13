# DSH Web -> Desktop 迁移对照表

DSH_HOME: C:\Users\Ksanadu\.dsh（web 与桌面同机共用，正常情况零拷贝）

| 内容 | Web 侧位置 | 说明 |
|---|---|---|
| 历史会话 | `.dsh/sessions/--D-CG--/` 等 4 个项目目录，共约169个会话 | 按工作区编码存放，当前会话 session-0bf2904c…也在其中 |
| API 设置 | `.dsh/.credentials.yaml`（密钥库） + `.dsh/settings.yaml.imported`（模型/权限/默认模型） | 含 DEEPSEEK / MOONSHOT / ZAI / GOOGLE / OPENCODE 五组 key 引用 |
| Skill | `.dsh/skills/comfyui/`（SKILL.md + references + scripts） | 用户级 Skill，全局生效 |
| 自制插件 | `.dsh/local-plugins/dsh-inline-image` | 需随 profile 重装依赖 |
| 预设/角色 | `.dsh/.agent-presets/presets.json, session-bindings.json, tavern-state.json` | 问候语/绑定关系 |
| 工作区/用量 | `.dsh/storages/workspace.json, usage-stats-cache.json` | 打开记录与用量缓存 |
| Web profile 覆盖层 | `.dsh/profiles/web/cordis.patch.yml, cordis.yml, package.json` | 桌面版 profile 名可能不同，仅作对照，不直接覆盖 |
| ComfyUI 数据 | `.dsh/data/dsh-comfyui/` | 出图工作流相关 |

备份包：`D:\CG\data\dsh-migrate\dsh-web-full-backup.zip`（134MB，已含上表全部）
恢复脚本：`D:\CG\data\dsh-migrate\restore-dsh-desktop.bat`（桌面版为空时双击回写）
