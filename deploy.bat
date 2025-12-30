@echo off
chcp 65001 > nul
echo ========================================
echo   STABLE USDT 클레임 - GitHub 업로드
echo   made by. 0xblackcow
echo ========================================
echo.

REM 현재 상태 확인
echo [1/5] Git 상태 확인 중...
git status
echo.

REM 변경사항 추가
echo [2/5] 파일 추가 중...
git add .
echo.

REM 커밋 메시지 입력 받기
set /p commit_message="커밋 메시지를 입력하세요 (예: Update features): "
if "%commit_message%"=="" set commit_message=Update: 코드 수정

echo [3/5] 커밋 생성 중... (%commit_message%)
git commit -m "%commit_message%"
echo.

REM 푸시
echo [4/5] GitHub에 업로드 중...
git push
echo.

REM 완료
echo [5/5] 완료!
echo.
echo ========================================
echo   ✅ GitHub 업로드 완료!
echo   
echo   Vercel이 자동으로 배포를 시작합니다.
echo   약 1분 후 웹사이트가 업데이트됩니다.
echo ========================================
echo.

pause

