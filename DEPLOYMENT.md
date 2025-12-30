# Vercel 배포 가이드

이 문서는 USDT0 클레임 도우미를 Vercel에 배포하는 방법을 안내합니다.

## 📦 준비사항

1. GitHub 계정
2. Vercel 계정 (GitHub로 로그인 가능)
3. Git 설치

## 🚀 배포 단계

### 1. GitHub 저장소 생성

```bash
# Git 초기화 (아직 안 했다면)
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: USDT0 Claim Helper"

# GitHub에 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 푸시
git push -u origin main
```

### 2. Vercel로 배포

#### 방법 A: Vercel 웹사이트 사용

1. [Vercel](https://vercel.com)에 접속
2. GitHub 계정으로 로그인
3. "Add New..." > "Project" 클릭
4. GitHub 저장소 선택
5. 프로젝트 설정:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (비워두기)
   - **Output Directory**: (비워두기)
6. "Deploy" 클릭
7. 배포 완료! 🎉

#### 방법 B: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 폴더에서 실행
cd c:\Users\moon\Desktop\project\stable\claim

# 로그인
vercel login

# 배포 (테스트)
vercel

# 프로덕션 배포
vercel --prod
```

### 3. 배포 확인

배포가 완료되면 Vercel이 자동으로 URL을 생성합니다:
- 프로덕션: `https://your-project-name.vercel.app`
- 프리뷰: `https://your-project-name-xxx.vercel.app`

## 🔧 환경 설정

### vercel.json 설정

현재 프로젝트의 `vercel.json` 파일:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

이 설정은:
- 정적 파일로 배포
- 모든 경로를 해당 파일로 라우팅
- SPA(Single Page Application) 지원

## 🌐 커스텀 도메인 설정 (선택사항)

1. Vercel 프로젝트 대시보드 접속
2. "Settings" > "Domains" 클릭
3. 도메인 입력 (예: `claim.yourdomain.com`)
4. DNS 설정 (Vercel이 안내하는 대로)
5. 완료!

### DNS 설정 예시

**A 레코드:**
```
Type: A
Name: claim
Value: 76.76.21.21
```

**CNAME 레코드:**
```
Type: CNAME
Name: claim
Value: cname.vercel-dns.com
```

## 🔄 자동 배포

Vercel은 GitHub와 연동되어 자동 배포를 지원합니다:

- **main/master 브랜치**: 프로덕션 자동 배포
- **다른 브랜치**: 프리뷰 배포
- **Pull Request**: 자동 프리뷰 생성

### Git 워크플로우

```bash
# 코드 수정 후
git add .
git commit -m "Update feature"
git push

# Vercel이 자동으로 배포 시작!
```

## 📊 배포 모니터링

### Vercel 대시보드에서 확인 가능:

- 배포 상태
- 빌드 로그
- 트래픽 통계
- 성능 메트릭
- 에러 로그

## 🐛 문제 해결

### 배포가 실패하는 경우

1. **빌드 로그 확인**
   - Vercel 대시보드에서 로그 확인
   - 에러 메시지 확인

2. **파일 경로 확인**
   - 모든 파일이 Git에 포함되었는지 확인
   - `.gitignore` 확인

3. **vercel.json 확인**
   - 문법 오류 확인
   - JSON 형식 확인

### CORS 에러가 발생하는 경우

Merkl API는 CORS를 허용하므로 문제없습니다. 만약 발생한다면:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ]
}
```

### 404 에러가 발생하는 경우

`vercel.json`의 routes 설정을 확인하세요.

## 🔒 보안 설정

### 환경 변수 (필요한 경우)

Vercel 대시보드에서:
1. "Settings" > "Environment Variables"
2. 변수 추가
3. 재배포

현재 프로젝트는 환경 변수가 필요 없습니다.

### 접근 제한 (선택사항)

Vercel Pro 이상 플랜에서:
- 비밀번호 보호
- IP 화이트리스트
- VPN 연결 필요

## 📈 성능 최적화

### 자동 최적화

Vercel이 자동으로 제공:
- CDN (전 세계)
- Gzip/Brotli 압축
- HTTP/2
- 자동 캐싱
- 이미지 최적화

### 추가 최적화

현재 프로젝트는 이미 최적화되어 있습니다:
- 외부 라이브러리 최소화
- 순수 JavaScript 사용
- 작은 파일 크기

## 💰 비용

### 무료 플랜
- 개인 프로젝트에 충분
- 무제한 배포
- 100GB 대역폭/월
- 커스텀 도메인 지원

### Pro 플랜 ($20/월)
- 상업적 사용
- 더 많은 대역폭
- 고급 보안 기능
- 우선 지원

## 🎯 배포 체크리스트

배포 전 확인:
- [ ] 모든 파일이 Git에 커밋됨
- [ ] vercel.json 파일 존재
- [ ] 로컬에서 정상 작동 확인
- [ ] API 엔드포인트 확인
- [ ] README.md 업데이트

배포 후 확인:
- [ ] 웹사이트 정상 접속
- [ ] 지갑 주소 입력 기능 작동
- [ ] API 호출 성공
- [ ] 복사 기능 작동
- [ ] 모바일 반응형 확인

## 🔗 유용한 링크

- [Vercel 문서](https://vercel.com/docs)
- [Vercel CLI 문서](https://vercel.com/docs/cli)
- [GitHub Actions 연동](https://vercel.com/docs/git)
- [커스텀 도메인 설정](https://vercel.com/docs/custom-domains)

## 📞 지원

문제가 발생하면:
1. Vercel 지원 센터 확인
2. GitHub Issues 생성
3. Vercel 커뮤니티 포럼

---

**축하합니다! 🎉**

배포가 완료되면 전 세계 어디서나 USDT0 클레임 정보를 조회할 수 있습니다!

