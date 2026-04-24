// main.js - 디자인 AI 에이전트 데이터 보존 및 내보내기 전용 모듈

const CHAT_STORAGE_KEY = 'designai_chat_histories_v3';

/**
 * 1. 현재 메모리 상의 채팅 히스토리를 브라우저 로컬 저장소에 동기화
 */
function saveChatHistories() {
  try {
    if (typeof agentHistories !== 'undefined') {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(agentHistories));
    }
  } catch (e) {
    console.error('채팅 저장 실패:', e);
  }
}

/**
 * 2. 브라우저 로컬 저장소에서 채팅 히스토리를 메모리로 복원
 */
function loadChatHistories() {
  try {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      agentHistories = JSON.parse(saved);
    }
  } catch (e) {
    console.error('채팅 복원 실패:', e);
  }
}

/**
 * 3. 현재 선택된 에이전트의 대화 내역을 화면에 재구성 (새로고침/에이전트 전환 시)
 */
function renderCurrentAgentHistory() {
  const chatArea = document.getElementById('chatArea');
  if (!chatArea || typeof agentHistories === 'undefined' || typeof currentAgent === 'undefined') return;
  
  chatArea.innerHTML = ''; // 기존 화면 초기화
  const history = agentHistories[currentAgent] || [];
  
  history.forEach(msg => {
    if (msg.role === 'user') {
      // 텍스트 또는 멀티모달(배열) 구조 대응
      const text = typeof msg.content === 'string' 
        ? msg.content 
        : (Array.isArray(msg.content) ? msg.content.find(x => x.text)?.text || '[첨부 포함 메시지]' : '[메시지]');
      addMessage('user', text, null);
    } else if (msg.role === 'assistant' || msg.role === 'model') {
      addMessage('agent', msg.content, typeof AGENTS !== 'undefined' ? AGENTS[currentAgent] : null);
    }
  });
  
  chatArea.scrollTop = chatArea.scrollHeight;
}

/**
 * 4. [UI 연결] 모든 데이터(대화, DNA 등)를 로컬에 즉시 저장
 */
function saveAllLocal() {
  try {
    saveChatHistories();
    if (typeof dnaLibrary !== 'undefined') {
      localStorage.setItem('designaidna', JSON.stringify(dnaLibrary));
    }
    if (typeof toast === 'function') toast('현재 브라우저에 저장했습니다.', 'success');
  } catch (e) {
    if (typeof toast === 'function') toast('저장 실패: ' + e.message, 'error');
  }
}

/**
 * 5. [UI 연결] 대화 내역 및 DNA 데이터를 JSON 파일로 다운로드 (백업용)
 */
function exportChat() {
  try {
    const payload = {
      exportedAt: new Date().toISOString(),
      version: 'design-ai-agent-v3',
      currentAgent: typeof currentAgent !== 'undefined' ? currentAgent : 'orchestrator',
      agentHistories: typeof agentHistories !== 'undefined' ? agentHistories : {},
      dnaLibrary: typeof dnaLibrary !== 'undefined' ? dnaLibrary : []
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-ai-chat-${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (typeof toast === 'function') toast('대화 JSON을 다운로드했습니다.', 'success');
  } catch (e) {
    if (typeof toast === 'function') toast('내보내기 실패: ' + e.message, 'error');
  }
}

/**
 * 6. [UI 연결] 현재 상태의 HTML 문서를 다운로드
 */
function downloadCurrentHTML() {
  try {
    const html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-ai-agent-backup.html';
    a.click();
    URL.revokeObjectURL(url);
    if (typeof toast === 'function') toast('HTML 파일을 다운로드했습니다.', 'success');
  } catch (e) {
    if (typeof toast === 'function') toast('HTML 다운로드 실패: ' + e.message, 'error');
  }
}
