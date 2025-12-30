@echo off
chcp 65001 > nul
echo ========================================
echo   GitHub 저장소 초기 설정
echo   STABLE USDT 클레임
echo ========================================
echo.

REM Git 설치 확인
echo [1/6] Git 설치 확인 중...
git --version
if errorlevel 1 (
    echo ❌ Git이 설치되어 있지 않습니다.
    echo https://git-scm.com/download/win 에서 다운로드하세요.
    pause
    exit /b
)
echo ✅ Git 설치 확인됨
echo.

REM Git 사용자 정보 입력
echo [2/6] Git 사용자 정보 설정
set /p git_name="Git 사용자 이름을 입력하세요: "
set /p git_email="Git 이메일을 입력하세요: "

git config --global user.name "%git_name%"
git config --global user.email "%git_email%"
echo ✅ 사용자 정보 설정 완료
echo.

REM Git 초기화
echo [3/6] Git 저장소 초기화 중...
git init
echo ✅ 초기화 완료
echo.

REM 파일 추가
echo [4/6] 파일 추가 중...
git add .
echo ✅ 파일 추가 완료
echo.

REM 첫 커밋
echo [5/6] 첫 커밋 생성 중...
git commit -m "Initial commit: STABLE USDT 클레임 도우미"
echo ✅ 커밋 완료
echo.

REM GitHub 저장소 URL 입력
echo [6/6] GitHub 저장소 연결
echo.
echo GitHub에서 새 저장소를 생성한 후
echo 저장소 URL을 입력하세요.
echo.
echo 예시: https://github.com/username/stable-usdt-claim.git
echo.
set /p repo_url="저장소 URL: "

git remote add origin %repo_url%
git branch -M main

echo.
echo ========================================
echo   ✅ 초기 설정 완료!
echo.
echo   이제 GitHub에 업로드합니다...
echo ========================================
echo.

REM 푸시
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ 업로드 실패
    echo.
    echo 인증이 필요합니다:
    echo 1. Username: GitHub 사용자명
    echo 2. Password: Personal Access Token
    echo.
    echo Token 생성 방법:
    echo GitHub → Settings → Developer settings
    echo → Personal access tokens → Generate new token
    echo → repo 체크
    echo.
    pause
    exit /b
)

echo.
echo ========================================
echo   🎉 GitHub 업로드 완료!
echo.
echo   다음 단계:
echo   1. https://vercel.com 접속
echo   2. GitHub 계정으로 로그인
echo   3. Import Project → 저장소 선택
echo   4. Deploy 클릭
echo.
echo   자세한 가이드: GITHUB_VERCEL_GUIDE.md
echo ========================================
echo.

pause

