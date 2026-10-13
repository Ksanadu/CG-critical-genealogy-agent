@echo off
REM DSH Web -> Desktop 迁移恢复脚本（双击运行）
REM 用途：桌面版首次启动后若历史/配置为空，用此脚本把备份写回 DSH_HOME
set DSH_HOME=C:\Users\Ksanadu\.dsh
set BACKUP_ZIP=D:\CG\data\dsh-migrate\dsh-web-full-backup.zip
echo [1/3] DSH_HOME=%DSH_HOME%
echo [2/3] BACKUP=%BACKUP_ZIP%
echo 请先完全退出 DSH 桌面版和 dsh web（关闭 127.0.0.1:3080），再按任意键继续...
pause >nul
powershell -NoProfile -Command "Expand-Archive -Path '%BACKUP_ZIP%' -DestinationPath '%DSH_HOME%' -Force"
echo [3/3] 恢复完成，重新打开桌面版即可。
pause
