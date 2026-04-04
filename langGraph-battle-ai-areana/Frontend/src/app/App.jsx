import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'

// ── Mock AI response generator ──────────────────────────────────────────────
// Replace these with real API calls to your LangGraph backend
const MOCK_RESPONSES = {
  aiA: [
    "Based on my analysis, the most effective approach here is to break the problem down into its core components. First, we should identify the primary constraints, then work systematically through each solution path. This method ensures we don't overlook any edge cases.",
    "From a computational standpoint, this problem maps elegantly to a graph traversal pattern. I'd recommend using a depth-first search with memoization to avoid redundant calculations. The time complexity would be O(n log n) which is optimal for this class of problems.",
    "The key insight here is that we can leverage dynamic programming to transform an exponential problem into a polynomial one. By caching intermediate results, we reduce the search space dramatically and achieve near-linear performance.",
    "I approach this through the lens of first principles. Rather than applying a pre-existing template, let's construct the solution from fundamental axioms. This leads to a more robust and generalizable answer that adapts well to future requirements.",
  ],
  aiB: [
    "My perspective takes a more pragmatic route — while theoretical purity matters, real-world performance is paramount. I'd suggest a hybrid approach: use a greedy algorithm for the initial pass, then apply local optimization to refine the result. This balances speed with accuracy.",
    "Counterintuitively, the simplest solution often wins. Instead of complex architectures, a clean iterative approach with careful state management achieves the same results with far less cognitive overhead and maintenance burden. Simplicity is a feature, not a compromise.",
    "I'd challenge the framing of this problem. Rather than optimizing within current constraints, we should question those constraints themselves. A paradigm shift — perhaps moving from synchronous to event-driven processing — could yield 10x improvements over incremental tweaks.",
    "Looking at this from a systems perspective, the real bottleneck isn't the algorithm but the data pipeline. Optimizing ingestion and caching strategies would provide more measurable real-world gains than any in-algorithm optimization at this scale.",
  ],
  judge: [
    {
      analysis: "Both responses demonstrate strong analytical thinking. AI Alpha takes a more structured, theoretical approach that excels in correctness and edge-case coverage. AI Beta offers pragmatic, performance-first reasoning that would work well in production systems. The winner depends on context — for academic or correctness-critical settings, Alpha leads; for rapid deployment, Beta shines.",
      winner: "tie",
      scoreA: 82,
      scoreB: 79,
    },
    {
      analysis: "AI Alpha presents a clear, methodical breakdown with solid time-complexity reasoning. However, AI Beta's insight to question the problem framing itself shows deeper metacognitive thinking — a hallmark of senior-level problem solving. Beta's recommendation to shift paradigms could yield compounding benefits over time, making it the stronger response here.",
      winner: "b",
      scoreA: 74,
      scoreB: 88,
    },
    {
      analysis: "In this round, AI Alpha's mastery of dynamic programming principles is textbook-perfect and immediately actionable. AI Beta's systems-level view is insightful but somewhat tangential to the core question. For the specific problem posed, Alpha's solution is more directly applicable and easier to implement correctly, giving it the edge.",
      winner: "a",
      scoreA: 91,
      scoreB: 76,
    },
    {
      analysis: "A genuinely close battle. Both AIs identify valid optimization pathways, though from different angles. AI Alpha's first-principles reasoning builds a more durable foundation, while Beta's simplicity argument has real merit for maintainability. Given the complexity of the query, Alpha's comprehensive framework edges Beta's concise but less exhaustive approach.",
      winner: "a",
      scoreA: 85,
      scoreB: 80,
    },
  ],
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function mockFetchBattleResponse(userMessage) {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
  return {
    aiA: getRandom(MOCK_RESPONSES.aiA),
    aiB: getRandom(MOCK_RESPONSES.aiB),
    judge: getRandom(MOCK_RESPONSES.judge),
  }
}

// ── Sub-components ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="typing-indicator">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  )
}

function SkeletonLines({ count = 4 }) {
  return (
    <div style={{ padding: '14px 16px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton skeleton-line"
          style={{ width: i === count - 1 ? '60%' : `${75 + Math.random() * 20}%` }}
        />
      ))}
    </div>
  )
}

function ScoreBar({ score, type }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(score), 200)
    return () => clearTimeout(t)
  }, [score])

  return (
    <div className={`score-item`}>
      <div className={`score-label score-label-${type}`}>
        {type === 'a' ? '⚡ AI Alpha' : '🔮 AI Beta'}
      </div>
      <div className="score-bar-track">
        <div
          className={`score-bar-fill score-bar-fill-${type}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="score-value">{score}/100</div>
    </div>
  )
}

function AICard({ type, name, emoji, content, isLoading }) {
  return (
    <div className={`ai-card ai-card-${type}`}>
      <div className={`ai-card-header ai-card-header-${type}`}>
        <div className={`ai-avatar ai-avatar-${type}`}>{emoji}</div>
        <div>
          <div className={`ai-card-name ai-card-name-${type}`}>{name}</div>
        </div>
        <span className="ai-card-tag">Solution</span>
      </div>
      {isLoading ? (
        <SkeletonLines count={4} />
      ) : (
        <div className="ai-card-body">
          {content.split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
        </div>
      )}
    </div>
  )
}

function JudgeCard({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="judge-card">
        <div className="judge-card-header">
          <div className="judge-avatar">⚖️</div>
          <div>
            <div className="judge-title">Judge AI</div>
            <div className="judge-subtitle">Analyzing both responses…</div>
          </div>
        </div>
        <SkeletonLines count={5} />
      </div>
    )
  }

  const verdictLabel = data.winner === 'tie'
    ? '🤝 Tie'
    : data.winner === 'a'
    ? '⚡ Alpha Wins'
    : '🔮 Beta Wins'

  const verdictClass = data.winner === 'tie'
    ? 'verdict-tie'
    : data.winner === 'a'
    ? 'verdict-a'
    : 'verdict-b'

  return (
    <div className="judge-card">
      <div className="judge-card-header">
        <div className="judge-avatar">⚖️</div>
        <div>
          <div className="judge-title">Judge AI</div>
          <div className="judge-subtitle">Final Verdict</div>
        </div>
        <span className={`judge-verdict-badge ${verdictClass}`}>{verdictLabel}</span>
      </div>
      <div className="judge-card-body">
        <div className="judge-analysis">{data.analysis}</div>
        <div className="judge-scores">
          <ScoreBar score={data.scoreA} type="a" />
          <ScoreBar score={data.scoreB} type="b" />
        </div>
      </div>
    </div>
  )
}

function UserMessage({ text }) {
  return (
    <div className="user-message-wrapper">
      <div className="user-message-bubble">
        <div className="user-message-label">You</div>
        {text}
      </div>
    </div>
  )
}

function BattleRound({ round }) {
  const { userMessage, aiA, aiB, judge, loadingAI, loadingJudge } = round

  return (
    <div className="battle-response">
      <UserMessage text={userMessage} />

      <div className="ai-solutions-row">
        <AICard
          type="a"
          name="AI Alpha"
          emoji="⚡"
          content={aiA || ''}
          isLoading={loadingAI}
        />
        <AICard
          type="b"
          name="AI Beta"
          emoji="🔮"
          content={aiB || ''}
          isLoading={loadingAI}
        />
      </div>

      <JudgeCard data={judge} isLoading={loadingJudge} />
    </div>
  )
}

function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <div className="welcome-glow">⚔️</div>
      <h1 className="welcome-title">AI Battle Arena</h1>
      <p className="welcome-desc">
        Ask any question and watch two independent AI models compete for the best answer.
        A third Judge AI evaluates both responses and delivers the final verdict.
      </p>
      <div className="welcome-cards">
        <div className="welcome-card">
          <div className="welcome-card-icon">⚡</div>
          <div className="welcome-card-text">AI Alpha generates its best response</div>
        </div>
        <div className="welcome-card">
          <div className="welcome-card-icon">🔮</div>
          <div className="welcome-card-text">AI Beta provides an independent take</div>
        </div>
        <div className="welcome-card">
          <div className="welcome-card-icon">⚖️</div>
          <div className="welcome-card-text">Judge AI scores and picks the winner</div>
        </div>
      </div>
    </div>
  )
}

// ── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [rounds, setRounds] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef(null)
  const bottomRef = useRef(null)

  // Auto-scroll to bottom on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [rounds])

  // Auto-resize textarea
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 140) + 'px'
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }, [inputValue, isSubmitting])

  const handleSubmit = useCallback(async () => {
    const message = inputValue.trim()
    if (!message || isSubmitting) return

    setIsSubmitting(true)
    setInputValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    const roundId = Date.now()

    // Add round with loading states
    setRounds(prev => [...prev, {
      id: roundId,
      userMessage: message,
      aiA: null,
      aiB: null,
      judge: null,
      loadingAI: true,
      loadingJudge: true,
    }])

    try {
      const result = await mockFetchBattleResponse(message)

      // Update with AI responses first
      setRounds(prev => prev.map(r =>
        r.id === roundId
          ? { ...r, aiA: result.aiA, aiB: result.aiB, loadingAI: false, loadingJudge: true }
          : r
      ))

      // Simulate judge taking extra time
      await new Promise(res => setTimeout(res, 600))

      // Update with judge response
      setRounds(prev => prev.map(r =>
        r.id === roundId
          ? { ...r, judge: result.judge, loadingJudge: false }
          : r
      ))
    } catch (err) {
      console.error('Error fetching battle response:', err)
      setRounds(prev => prev.map(r =>
        r.id === roundId
          ? {
              ...r,
              aiA: 'An error occurred while generating a response.',
              aiB: 'An error occurred while generating a response.',
              judge: {
                analysis: 'Could not retrieve judge evaluation due to an error.',
                winner: 'tie',
                scoreA: 0,
                scoreB: 0,
              },
              loadingAI: false,
              loadingJudge: false,
            }
          : r
      ))
    } finally {
      setIsSubmitting(false)
      textareaRef.current?.focus()
    }
  }, [inputValue, isSubmitting])

  const canSubmit = inputValue.trim().length > 0 && !isSubmitting

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <div className="header-icon">⚔️</div>
          <div>
            <div className="header-title">AI Battle Arena</div>
            <div className="header-subtitle">LangGraph Powered</div>
          </div>
        </div>
        <div className="header-badges">
          <span className="badge badge-a">
            <span className="badge-dot" />
            AI Alpha
          </span>
          <span className="badge badge-b">
            <span className="badge-dot" />
            AI Beta
          </span>
          <span className="badge badge-judge">
            <span className="badge-dot" />
            Judge
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        {rounds.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="chat-history">
            {rounds.map(round => (
              <BattleRound key={round.id} round={round} />
            ))}
            <div ref={bottomRef} style={{ height: 1 }} />
          </div>
        )}
      </main>

      {/* Input */}
      <div className="input-area">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            className="chat-input"
            placeholder="Ask anything… both AIs will battle it out 🥊"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isSubmitting}
            id="chat-input"
          />
          <div className="input-actions">
            {inputValue.length > 80 && (
              <span className="char-count">{inputValue.length}</span>
            )}
            <button
              id="send-btn"
              className={`send-btn ${isSubmitting ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={!canSubmit}
              aria-label="Send message"
            >
              {isSubmitting ? '⏳' : '➤'}
            </button>
          </div>
        </div>
        <div className="input-hint">
          Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
        </div>
      </div>
    </div>
  )
}
