// ===================================================================
// 🔒 보안 정책: 이 애플리케이션은 어떠한 데이터도 저장하지 않습니다
// - localStorage 사용 안 함
// - sessionStorage 사용 안 함
// - 쿠키 사용 안 함
// - 서버 전송 안 함
// - 모든 데이터는 메모리에만 존재하며 페이지를 닫으면 즉시 삭제됩니다
// ===================================================================

// 상수 정의
const STABLE_CHAIN_ID = 988;
const USDT0_TOKEN_ADDRESS = '0xAB067d0832D40619EF445B7fAE510f5Da606Ab0A';
const MERKL_API_URL = 'https://api.merkl.xyz/v3/rewards';

// 전역 상태 (메모리에만 존재, 페이지 새로고침 시 삭제됨)
let currentAddress = null;
let rewardsData = null;

// DOM 요소
const walletInput = document.getElementById('wallet-input');
const fetchButton = document.getElementById('fetch-button');
const claimSection = document.getElementById('claim-section');
const loading = document.getElementById('loading');
const noRewards = document.getElementById('no-rewards');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const rewardsInfo = document.getElementById('rewards-info');
const unclaimedAmountSpan = document.getElementById('unclaimed-amount');

// 파라미터 표시 요소
const usersValue = document.getElementById('users-value');
const tokensValue = document.getElementById('tokens-value');
const amountsValue = document.getElementById('amounts-value');
const proofsValue = document.getElementById('proofs-value');

// 초기화
function init() {
    // 이벤트 리스너 등록
    fetchButton.addEventListener('click', handleFetchRewards);
    walletInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleFetchRewards();
        }
    });

    // 복사 버튼 이벤트 리스너
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', handleCopy);
    });

    // URL에서 주소 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const addressParam = urlParams.get('address');
    if (addressParam) {
        walletInput.value = addressParam;
        handleFetchRewards();
    }
}

// 보상 정보 가져오기
async function handleFetchRewards() {
    const address = walletInput.value.trim();

    // 주소 유효성 검사
    if (!address) {
        showError('지갑 주소를 입력해주세요.');
        return;
    }

    if (!isValidAddress(address)) {
        showError('올바른 이더리움 주소를 입력해주세요. (0x로 시작하는 42자)');
        return;
    }

    currentAddress = address.toLowerCase();
    await fetchRewards(currentAddress);
}

// 보상 정보 가져오기
async function fetchRewards(address) {
    resetClaimUI();
    claimSection.classList.remove('hidden');
    loading.classList.remove('hidden');
    fetchButton.disabled = true;
    fetchButton.textContent = '조회 중...';

    try {
        const url = `${MERKL_API_URL}?user=${address}&chainIds=${STABLE_CHAIN_ID}`;
        console.log('Fetching from:', url);
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API 오류: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        // USDT0 토큰 데이터 추출
        if (data[STABLE_CHAIN_ID] && 
            data[STABLE_CHAIN_ID].tokenData && 
            data[STABLE_CHAIN_ID].tokenData[USDT0_TOKEN_ADDRESS]) {
            
            const tokenData = data[STABLE_CHAIN_ID].tokenData[USDT0_TOKEN_ADDRESS];
            const unclaimed = BigInt(tokenData.unclaimed);

            console.log('Token data:', tokenData);
            console.log('Unclaimed:', unclaimed.toString());

            if (unclaimed > 0n) {
                // 클레임 가능한 토큰이 있음
                rewardsData = {
                    address: address,
                    amount: tokenData.unclaimed,
                    decimals: tokenData.decimals,
                    proof: tokenData.proof,
                    symbol: tokenData.symbol
                };

                displayRewards();
            } else {
                // 클레임 가능한 토큰 없음
                loading.classList.add('hidden');
                noRewards.classList.remove('hidden');
            }
        } else {
            // 데이터 없음
            loading.classList.add('hidden');
            noRewards.classList.remove('hidden');
        }

    } catch (error) {
        console.error('보상 정보 불러오기 오류:', error);
        loading.classList.add('hidden');
        showError('보상 정보를 불러오는 중 오류가 발생했습니다: ' + error.message);
    } finally {
        fetchButton.disabled = false;
        fetchButton.textContent = '🔍 정보 조회';
    }
}

// 보상 정보 표시
function displayRewards() {
    loading.classList.add('hidden');
    rewardsInfo.classList.remove('hidden');

    // 수량 표시 (decimals 고려)
    const amount = BigInt(rewardsData.amount);
    const decimals = rewardsData.decimals;
    const displayAmount = formatTokenAmount(amount, decimals);

    unclaimedAmountSpan.textContent = `${displayAmount} ${rewardsData.symbol}`;

    // 파라미터 값 설정
    // 1. users (address[]) - 순수 주소 값만 표시 (대괄호/따옴표 제외)
    usersValue.textContent = rewardsData.address;

    // 2. tokens (address[]) - 순수 토큰 주소만 표시
    tokensValue.textContent = USDT0_TOKEN_ADDRESS;

    // 3. amounts (uint256[]) - 순수 숫자만 표시
    amountsValue.textContent = rewardsData.amount;

    // 4. proofs (bytes32[][]) - 이중 배열 형태, 특별한 포맷팅
    // [[로 시작, ]]로 끝, 각 항목은 10칸 들여쓰기
    const proofsFormatted = formatProofs(rewardsData.proof);
    proofsValue.textContent = proofsFormatted;
}

// Proofs 포맷팅 함수
function formatProofs(proofArray) {
    if (!proofArray || proofArray.length === 0) {
        return '[[]]';
    }
    
    // 각 proof 항목을 10칸 들여쓰기로 포맷팅
    const formattedItems = proofArray.map(item => `          "${item}"`).join(',\n');
    
    return `[[\n${formattedItems}\n        ]]`;
}

// 복사 기능
async function handleCopy(event) {
    const button = event.currentTarget;
    const targetId = button.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;

    const textToCopy = targetElement.textContent;

    try {
        await navigator.clipboard.writeText(textToCopy);
        
        // 버튼 상태 변경
        const originalText = button.textContent;
        button.textContent = '✅ 복사됨!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
        
    } catch (error) {
        console.error('복사 오류:', error);
        alert('복사에 실패했습니다. 수동으로 복사해주세요.');
    }
}

// UI 리셋
function resetClaimUI() {
    loading.classList.add('hidden');
    noRewards.classList.add('hidden');
    errorMessage.classList.add('hidden');
    rewardsInfo.classList.add('hidden');
}

// 오류 표시
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    claimSection.classList.remove('hidden');
}

// 유틸리티 함수들

// 주소 유효성 검사
function isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// 토큰 수량 포맷
function formatTokenAmount(amount, decimals) {
    const divisor = BigInt(10 ** decimals);
    const integerPart = amount / divisor;
    const fractionalPart = amount % divisor;
    
    if (fractionalPart === 0n) {
        return integerPart.toString();
    }
    
    // 소수점 이하 6자리까지만 표시
    const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
    const truncated = fractionalStr.substring(0, 6);
    
    // 불필요한 0 제거
    const formatted = truncated.replace(/0+$/, '');
    
    if (formatted.length > 0) {
        return `${integerPart.toString()}.${formatted}`;
    } else {
        return integerPart.toString();
    }
}

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', init);

// 페이지 종료 시 모든 데이터 삭제 (보안 강화)
window.addEventListener('beforeunload', () => {
    currentAddress = null;
    rewardsData = null;
    
    // 입력 필드도 초기화
    if (walletInput) {
        walletInput.value = '';
    }
});

// 페이지 숨김 시에도 데이터 삭제
window.addEventListener('pagehide', () => {
    currentAddress = null;
    rewardsData = null;
});
