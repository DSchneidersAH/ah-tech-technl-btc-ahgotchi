import { useEffect, useRef } from 'react'

function SteijnChat({ messages, onCta }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages.length])

  return (
    <div className="chat">
      <div className="chat-head">
        <div className="chat-avatar">🧑‍🍳</div>
        <div>
          <div className="chat-name">Steijn</div>
          <div className="chat-sub">AH assistant · online</div>
        </div>
      </div>
      <div className="chat-body" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble chat-bubble--${m.from}`}>
            <p>{m.text}</p>
            {m.cta ? (
              <button className="chat-cta" onClick={() => onCta(m)}>
                {m.cta} →
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SteijnChat
