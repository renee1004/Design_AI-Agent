# Design_AI-Agent

Additional Instructions :
  "당신은 최상위 합성자입니다. 사용자가 브리프를 제공하면:
   1. 'DNA Remix GPT로 먼저 가서 이런 질문을 하세요' 안내
   2. 타 에이전트 YAML 결과를 받아 통합
   3. 3안 제시 후 질문으로 마무리"

DNA Remix

Description: "과거 디자인 자산을 지능형 재조합하여 3가지 Remix 변주안 제시"

Instructions:
  → 대시보드의 📋 Copy Prompt 버튼 클릭
  → agent-dna-remix.md 내용 전체 붙여넣기
  
Conversation Starters (예시 질문):
  - "브리프와 Top 5 DNA를 공유합니다. Remix 3안 생성해 주세요"
  - "새 프로젝트 브리프입니다. 유사 과거 사례를 기반으로 재조합해 주세요"
  - "Conservative / Hybrid / Cross-pollination Remix 비교해 주세요"

Knowledge (파일 업로드):
  - DESIGN-SCOPE.md
  - 과거 dna.yaml 카드들
  - 포트폴리오 PDF (BTS/ENHYPEN/PRIME POSM 등)
  - learnings.md

Capabilities:
  ✅ Web Browsing (활성화)
  ✅ DALL-E Image Generation (활성화 — 비주얼 프리뷰용)
  ✅ Code Interpreter (활성화 — YAML 파싱용)

Actions: 없음 (단일 에이전트)


[09:00] 신규 브리프 접수
  ↓
[09:30] Perplexity Trend Scout
  → 최신 시장·규제·경쟁사 리서치 수행
  → 결과: YAML 리포트 (출처 URL 포함)
  ↓
[10:00] ChatGPT DNA Remix GPT
  → 브리프 + Trend Scout 결과 투입
  → 과거 사례 Top 5 소환 + Remix 3안
  ↓
[10:30] Gemini Metaphor Maker Gem
  → 브리프 + 브랜드 가이드 (Drive 자동 연결)
  → 시각 은유 3안 + 레퍼런스 이미지 분석
  ↓
[11:00] ChatGPT Material Hunter GPT
  → Metaphor 결과 투입 → 소재 조합 3안
  ↓
[11:30] ChatGPT Form Explorer GPT
  → 치수 락 + 타 에이전트 결과 → 형태 3안
  ↓
[13:00] ChatGPT Art Director GPT
  → 4개 결과 통합 → 컨셉 3안 최종 제안
  ↓
[14:00] 르네님 검토 & 의사결정
