'use client';

import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'bot'; text: string };
type Turn = { role: string; content: string };

/**
 * The Chat with us widget: the bot answers questions about the Orenyx
 * Engine (the platform, pricing, Voice Dispatch, security, integration),
 * with an email fallback to the team. The bot's brain is the Packet
 * Engine API with site=engine (the Orenyx Engine knowledge).
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'bot',
      text: 'Hi! I can answer questions about the Orenyx Engine — the platform, pricing, Voice Dispatch, security, or integration. What can I help you with?',
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<Turn[]>([]);
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackEmail, setFallbackEmail] = useState('');
  const [fallbackDone, setFallbackDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showFallback, fallbackDone]);

  const addMsg = (m: Msg) => setMessages((prev) => [...prev, m]);

  async function send() {
    const msg = input.trim();
    if (!msg || busy) return;
    setInput('');
    setBusy(true);
    addMsg({ role: 'user', text: msg });
    const priorHistory = history;
    const newHistory = [...priorHistory, { role: 'user', content: msg }];
    setHistory(newHistory);
    try {
      const res = await fetch('https://packet.orenyxengine.com/api/packet/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: priorHistory, site: 'engine' }),
      });
      const d = await res.json();
      const reply = (d && d.reply) || 'Sorry, I could not answer that one.';
      addMsg({ role: 'bot', text: reply });
      setHistory([...newHistory, { role: 'assistant', content: reply }]);
    } catch {
      addMsg({ role: 'bot', text: 'I am having trouble right now. Please try again in a moment.' });
    }
    setBusy(false);
  }

  async function submitFallback(e: React.FormEvent) {
    e.preventDefault();
    const email = fallbackEmail.trim();
    if (!email) return;
    const qs = history
      .filter((h) => h.role === 'user')
      .map((h) => h.content)
      .join(' | ');
    const question = qs || 'A question from the website chat';
    try {
      await fetch('https://packet.orenyxengine.com/api/packet/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: `name=Website chat&email=${encodeURIComponent(email)}&question=${encodeURIComponent(question)}`,
      });
      setFallbackDone(true);
      addMsg({ role: 'bot', text: `Got it — the team will get back to you at ${email}.` });
    } catch {
      addMsg({ role: 'bot', text: 'I could not send that. Please try again in a moment.' });
    }
  }

  return (
    <>
      {/* The floating Chat with us button (upper right, below the header) */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Chat with the Orenyx Engine assistant"
        className="fixed right-5 top-[84px] z-[95] inline-flex items-center gap-2 rounded-full border-2 border-emerald-400/80 bg-emerald-500 px-5 py-3 text-sm font-bold text-black shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all hover:bg-emerald-400 hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
      >
        Chat with us
      </button>

      {/* The chat panel */}
      {open && (
        <div className="fixed right-5 top-[144px] z-[95] flex max-h-[70vh] w-[340px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border-2 border-white/15 bg-[#0a0f0d] shadow-[0_10px_34px_rgba(0,0,0,0.55)]">
          {/* the header */}
          <div className="flex items-center justify-between bg-emerald-500 px-4 py-3">
            <span className="text-sm font-bold text-black">Orenyx Engine</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="bg-transparent text-xl leading-none text-black hover:text-black/70 focus:outline-none"
            >
              &times;
            </button>
          </div>

          {/* the messages */}
          <div ref={scrollRef} className="flex min-h-[160px] flex-1 flex-col gap-2.5 overflow-y-auto p-3.5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'bot'
                    ? 'max-w-[85%] self-start rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2.5 text-sm leading-relaxed text-white/90'
                    : 'max-w-[85%] self-end rounded-2xl rounded-br-md bg-emerald-500 px-3.5 py-2.5 text-sm leading-relaxed text-black'
                }
              >
                {m.text}
              </div>
            ))}
            {busy && (
              <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2.5 text-sm text-white/60">
                ...
              </div>
            )}
          </div>

          {/* the input */}
          <div className="flex gap-2 border-t border-white/10 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Type your question..."
              maxLength={2000}
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={busy}
              className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-emerald-400 disabled:opacity-50"
            >
              Send
            </button>
          </div>

          {/* the email fallback */}
          <div className="border-t border-white/10 p-3">
            {!fallbackDone && !showFallback && (
              <button
                type="button"
                onClick={() => setShowFallback(true)}
                className="bg-transparent text-xs font-semibold text-emerald-400 underline hover:text-emerald-300"
              >
                Prefer a human? Email the team instead
              </button>
            )}
            {!fallbackDone && showFallback && (
              <form onSubmit={submitFallback} className="mt-1 flex gap-2">
                <input
                  type="email"
                  value={fallbackEmail}
                  onChange={(e) => setFallbackEmail(e.target.value)}
                  placeholder="you@yourcompany.com"
                  required
                  aria-label="Your email"
                  className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-3 py-2 text-xs font-bold text-black hover:bg-emerald-400"
                >
                  Send
                </button>
              </form>
            )}
            {fallbackDone && (
              <p className="text-xs text-white/70">Got it — the team will get back to you at your email.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
