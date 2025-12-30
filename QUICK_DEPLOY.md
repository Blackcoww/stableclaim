# ⚡ 빠른 배포 가이드 (5분 완성)

GitHub 업로드와 Vercel 배포를 가장 빠르게 완료하는 방법입니다.

---

## 🚀 3단계로 배포하기

### 1️⃣ GitHub 저장소 생성 (1분)

1. [GitHub](https://github.com) 로그인
2. 우측 상단 **"+"** → **"New repository"**
3. 이름 입력: `stable-usdt-claim`
4. **Public** 선택
5. **"Create repository"** 클릭
6. 생성된 저장소 URL 복사 (예: `https://github.com/username/stable-usdt-claim.git`)

---

### 2️⃣ 코드 업로드 (2분)

PowerShell 또는 터미널에서 실행:

```bash
# 프로젝트 폴더로 이동
cd C:\Users\moon\Desktop\project\stable\claim

# Git 초기화
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit"

# GitHub 연결 (YOUR_USERNAME과 YOUR_REPO를 실제 값으로 변경!)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 업로드
git branch -M main
git push -u origin main
```

**인증 필요 시:**
- Username: GitHub 사용자명
- Password: Personal Access Token (비밀번호 대신)

**Token 생성:** GitHub → Settings → Developer settings → Personal access tokens → Generate new token → repo 체크

---

### 3️⃣ Vercel 배포 (2분)

#### 웹사이트에서 배포 (더 쉬움 ✅)

1. [Vercel](https://vercel.com) 접속
2. **"Continue with GitHub"** 로그인
3. **"Add New..." → "Project"**
4. GitHub 저장소 선택
5. **"Deploy"** 클릭
6. 완료! 🎉

#### 또는 CLI로 배포 (빠름 ⚡)

```bash
# Vercel CLI 설치 (최초 1회)
npm i -g vercel

# 로그인
vercel login

# 배포
vercel --prod
```

---

## ✅ 완료!

배포된 URL이 자동으로 생성됩니다:
- 예시: `https://stable-usdt-claim.vercel.app`

---

## 🔄 코드 수정 후 업데이트

```bash
# 변경사항 저장
git add .
git commit -m "Update"
git push

# Vercel이 자동으로 재배포! ✨
```

---

## ❌ 문제 발생 시

### Git push 안 됨
→ Personal Access Token 사용 ([가이드](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token))

### Vercel 저장소 안 보임
→ Vercel → Settings → GitHub → 권한 재설정

### 더 자세한 가이드
→ `GITHUB_VERCEL_GUIDE.md` 참고

---

**그게 끝입니다! 🚀**

전체 상세 가이드는 `GITHUB_VERCEL_GUIDE.md`를 확인하세요.

