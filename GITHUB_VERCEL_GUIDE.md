# 🚀 GitHub 업로드 & Vercel 배포 완벽 가이드

이 가이드는 Windows 환경에서 프로젝트를 GitHub에 업로드하고 Vercel로 배포하는 전체 과정을 단계별로 안내합니다.

---

## 📋 목차

1. [준비사항](#1-준비사항)
2. [GitHub 업로드](#2-github-업로드)
3. [Vercel 배포](#3-vercel-배포)
4. [배포 확인](#4-배포-확인)

---

## 1. 준비사항

### 필요한 계정 및 프로그램

#### ✅ 필수
- [x] GitHub 계정 ([github.com](https://github.com)에서 가입)
- [x] Vercel 계정 ([vercel.com](https://vercel.com)에서 GitHub 계정으로 로그인)
- [x] Git 설치 ([git-scm.com](https://git-scm.com/download/win)에서 다운로드)

### Git 설치 확인

PowerShell 또는 터미널에서:
```bash
git --version
```

출력 예시: `git version 2.41.0.windows.1`

설치가 안 되어 있다면 [Git 다운로드](https://git-scm.com/download/win)

---

## 2. GitHub 업로드

### 2-1. GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 **"+"** 클릭 → **"New repository"** 선택
3. 저장소 정보 입력:
   - **Repository name**: `stable-usdt-claim` (원하는 이름)
   - **Description**: `STABLE USDT 클레임 도우미`
   - **Public** 또는 **Private** 선택
   - **Add a README file**: ❌ 체크 해제 (이미 있음)
   - **Add .gitignore**: ❌ 선택 안 함
   - **Choose a license**: ❌ 선택 안 함
4. **"Create repository"** 클릭

### 2-2. Git 초기 설정 (최초 1회만)

PowerShell에서 실행:

```bash
# Git 사용자 정보 설정
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2-3. 프로젝트 폴더에서 Git 초기화

```bash
# 프로젝트 폴더로 이동
cd C:\Users\moon\Desktop\project\stable\claim

# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "Initial commit: STABLE USDT 클레임 도우미"
```

### 2-4. GitHub 저장소와 연결

GitHub 저장소 페이지에 표시된 URL을 사용:

```bash
# 원격 저장소 추가 (YOUR_USERNAME와 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 기본 브랜치 이름을 main으로 설정
git branch -M main

# 푸시 (업로드)
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/blackcow/stable-usdt-claim.git
git branch -M main
git push -u origin main
```

### 2-5. GitHub 인증

처음 푸시할 때 인증이 필요합니다:

#### 방법 A: Personal Access Token 사용 (권장)

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **"Generate new token (classic)"** 클릭
3. 설정:
   - **Note**: `stable-claim-token`
   - **Expiration**: 90 days (또는 원하는 기간)
   - **Select scopes**: ✅ **repo** 전체 체크
4. **"Generate token"** 클릭
5. 생성된 토큰 복사 (⚠️ 한 번만 표시됨!)
6. Git push 시 비밀번호 대신 토큰 입력

#### 방법 B: GitHub Desktop 사용

1. [GitHub Desktop](https://desktop.github.com/) 다운로드 및 설치
2. GitHub 계정으로 로그인
3. "Add" → "Add existing repository" → 프로젝트 폴더 선택
4. "Publish repository" 클릭

### 2-6. 업로드 확인

GitHub 저장소 페이지를 새로고침하면 모든 파일이 업로드된 것을 확인할 수 있습니다.

---

## 3. Vercel 배포

### 3-1. Vercel 계정 생성

1. [Vercel](https://vercel.com) 접속
2. **"Sign Up"** 클릭
3. **"Continue with GitHub"** 선택
4. GitHub 계정으로 로그인 및 권한 승인

### 3-2. 새 프로젝트 생성

1. Vercel 대시보드에서 **"Add New..."** 클릭
2. **"Project"** 선택
3. **"Import Git Repository"** 섹션에서 GitHub 저장소 찾기
   - 만약 저장소가 보이지 않으면 **"Adjust GitHub App Permissions"** 클릭
   - 필요한 저장소에 대한 권한 부여

### 3-3. 프로젝트 설정

저장소를 선택한 후:

#### ⚙️ Configure Project

```
Project Name: stable-usdt-claim (자동 생성, 변경 가능)

Framework Preset: Other (선택)

Root Directory: ./ (기본값 유지)

Build and Output Settings:
  Build Command: (비워두기)
  Output Directory: (비워두기)
  Install Command: (비워두기)

Environment Variables: (추가 안 함)
```

### 3-4. 배포 시작

1. 모든 설정 확인
2. **"Deploy"** 버튼 클릭
3. 배포 프로세스 관찰 (약 30초~1분 소요)

### 3-5. 배포 완료

배포가 완료되면:
- ✅ 축하 메시지 표시
- 🔗 자동 생성된 URL 제공
- 예시: `https://stable-usdt-claim.vercel.app`

---

## 4. 배포 확인

### 4-1. 웹사이트 테스트

1. Vercel에서 제공한 URL 클릭
2. 웹사이트가 정상적으로 로드되는지 확인
3. 기능 테스트:
   - ✅ 제목 클릭 → 텔레그램 링크 작동
   - ✅ 지갑 주소 입력
   - ✅ 정보 조회 버튼
   - ✅ 데이터 표시
   - ✅ 복사 버튼

### 4-2. 모바일에서 테스트

- 📱 스마트폰에서 URL 접속
- 반응형 디자인 확인

### 4-3. Vercel 대시보드 확인

- 📊 방문자 통계
- 🔄 배포 상태
- ⚙️ 설정 관리

---

## 5. 추가 작업 (선택사항)

### 5-1. 커스텀 도메인 연결

#### Vercel에서 도메인 추가

1. Vercel 프로젝트 → **"Settings"** → **"Domains"**
2. 도메인 입력 (예: `claim.yourdomain.com`)
3. **"Add"** 클릭
4. DNS 설정 안내 따라하기

#### DNS 설정 예시

**A 레코드:**
```
Type: A
Name: claim
Value: 76.76.21.21
TTL: Auto
```

**CNAME 레코드:**
```
Type: CNAME
Name: claim
Value: cname.vercel-dns.com
TTL: Auto
```

### 5-2. 자동 배포 설정 (이미 활성화됨)

GitHub에 코드를 푸시하면 자동으로 Vercel에 배포됩니다:

```bash
# 코드 수정 후
git add .
git commit -m "Update: 기능 개선"
git push

# Vercel이 자동으로 배포 시작!
```

### 5-3. 프리뷰 배포

다른 브랜치로 작업:

```bash
# 새 브랜치 생성
git checkout -b feature/new-feature

# 수정 후 푸시
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Vercel이 자동으로 프리뷰 URL 생성!
```

---

## 6. 문제 해결

### ❌ Git push 실패

**오류:** `Authentication failed`

**해결:**
1. Personal Access Token 사용
2. 또는 GitHub Desktop 사용

---

**오류:** `remote: Repository not found`

**해결:**
```bash
# 원격 저장소 확인
git remote -v

# 잘못된 경우 제거 후 다시 추가
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

---

### ❌ Vercel 배포 실패

**오류:** `Build failed`

**해결:**
1. `vercel.json` 파일 확인
2. 모든 파일이 GitHub에 업로드되었는지 확인
3. Vercel 로그 확인

---

**오류:** 저장소가 안 보임

**해결:**
1. Vercel → Settings → Git Integration
2. GitHub 권한 재설정
3. 필요한 저장소 선택

---

### ❌ 웹사이트가 작동 안 함

**확인사항:**
1. 모든 파일이 올바른 경로에 있는지
2. `index.html`, `styles.css`, `app.js` 모두 존재하는지
3. 브라우저 콘솔에서 에러 확인 (F12)

---

## 7. 단축 명령어

### Git 작업 플로우

```bash
# 상태 확인
git status

# 변경사항 확인
git diff

# 모든 변경사항 추가
git add .

# 커밋
git commit -m "커밋 메시지"

# 푸시
git push

# 최신 코드 받기
git pull

# 브랜치 목록
git branch

# 로그 확인
git log --oneline
```

### Vercel CLI 사용 (선택)

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod

# 로그 확인
vercel logs
```

---

## 8. 체크리스트

### 배포 전 확인사항

- [ ] 모든 파일이 프로젝트 폴더에 있음
- [ ] Git이 설치되어 있음
- [ ] GitHub 계정 생성 완료
- [ ] Vercel 계정 생성 완료
- [ ] 로컬에서 웹사이트 정상 작동 확인

### 배포 후 확인사항

- [ ] GitHub 저장소에 모든 파일 업로드됨
- [ ] Vercel 배포 성공
- [ ] 웹사이트 URL 접속 가능
- [ ] 제목 링크 작동
- [ ] 지갑 조회 기능 작동
- [ ] 복사 기능 작동
- [ ] 모바일 반응형 확인

---

## 9. 유용한 링크

- 📦 **GitHub 저장소**: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
- 🌐 **Vercel 배포**: https://your-project.vercel.app
- 📱 **텔레그램**: https://t.me/rezerocrypto
- 📚 **Git 문서**: https://git-scm.com/doc
- 📚 **Vercel 문서**: https://vercel.com/docs

---

## 🎉 완료!

축하합니다! GitHub 업로드와 Vercel 배포가 완료되었습니다.

이제 전 세계 어디서나 접속 가능한 웹사이트가 되었습니다! 🚀

---

## 📞 도움이 필요하신가요?

- GitHub 이슈: 저장소의 Issues 탭
- Vercel 지원: [vercel.com/support](https://vercel.com/support)
- 텔레그램: [t.me/rezerocrypto](https://t.me/rezerocrypto)

