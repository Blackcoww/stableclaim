# 🚀 빠른 시작 가이드

## 1분 안에 시작하기

### ⚡ 가장 빠른 방법

1. **파일 열기**
   ```
   index.html 파일을 더블클릭하거나 브라우저로 드래그하세요
   ```

2. **지갑 연결**
   - "🦊 지갑 연결" 버튼 클릭
   - MetaMask에서 연결 승인

3. **토큰 클레임**
   - 자동으로 클레임 가능한 토큰이 표시됩니다
   - "🎁 토큰 클레임하기" 버튼 클릭
   - MetaMask에서 트랜잭션 승인

완료! 🎉

---

## 💻 로컬 서버로 실행하기 (권장)

### 방법 1: Node.js 사용

```bash
# package.json의 http-server 사용
npm start

# 또는 브라우저 자동 열기
npm run dev
```

### 방법 2: Python 사용

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 방법 3: PHP 사용

```bash
php -S localhost:8000
```

그 다음 브라우저에서 접속:
```
http://localhost:8000
```

---

## 📝 체크리스트

시작하기 전에 확인하세요:

- [ ] MetaMask 확장 프로그램 설치됨
- [ ] MetaMask 잠금 해제됨
- [ ] Stable Network (Chain ID: 988) 설정됨
- [ ] 가스비를 위한 STABLE 토큰 있음 (소량)

---

## 🔧 Stable Network 수동 추가

MetaMask에 Stable Network가 없다면:

1. MetaMask 열기
2. 네트워크 드롭다운 클릭
3. "네트워크 추가" 클릭
4. 다음 정보 입력:

```
Network Name: Stable Network
RPC URL: https://rpc.stable.io
Chain ID: 988
Currency Symbol: STABLE
Block Explorer URL: https://stablescan.xyz
```

5. "저장" 클릭

---

## ❓ 자주 묻는 질문

### Q: MetaMask가 없는데요?
A: [metamask.io](https://metamask.io)에서 다운로드하세요

### Q: 클레임 가능한 토큰이 0으로 표시됩니다
A: 이미 클레임했거나 해당 지갑 주소에 보상이 없을 수 있습니다

### Q: 트랜잭션 실패
A: 가스비가 부족한지 확인하세요 (STABLE 토큰 필요)

### Q: 네트워크 전환이 안 됩니다
A: 위의 "Stable Network 수동 추가" 섹션을 참고하세요

---

## 🎯 다음 단계

1. ✅ 웹사이트 열기
2. ✅ 지갑 연결
3. ✅ 토큰 클레임
4. 🎉 완료!

문제가 있나요? README.md의 "문제 해결" 섹션을 확인하세요.

