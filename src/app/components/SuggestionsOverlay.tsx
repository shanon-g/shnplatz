'use client';

import React, { Dispatch, RefObject, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import type { SuggestionChannel, SuggestionRow } from '@/types/suggestion';
import { getNextZIndex } from '../utils/zIdxManager';

type Props = {
  suggestionsRef: RefObject<HTMLDivElement | null>;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  setShowSuggestions: Dispatch<SetStateAction<boolean>>;
};

export default function SuggestionsOverlay({ suggestionsRef, onMouseDown, setShowSuggestions }: Props) {
  const [isClosing, setIsClosing] = useState(false);

  // bring-to-front without re-render issues on mobile
  const zIndexRef = useRef<number>(40);

  const [channel, setChannel] = useState<SuggestionChannel>('idea');
  const [items, setItems] = useState<SuggestionRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    // Scroll the bottom marker into view (most reliable)
    bottomRef.current?.scrollIntoView({ behavior, block: 'end' });
  };

  // Memory-only delete tokens (lost on refresh) => delete allowed only before refresh
  const [deleteTokens, setDeleteTokens] = useState<Record<string, string>>({});

  // Optional owner tools (for Update tests)
  const [ownerToken, setOwnerToken] = useState('');
  const isOwner = useMemo(() => ownerToken.length > 0, [ownerToken]);

  useEffect(() => {
    const next = getNextZIndex();
    zIndexRef.current = next;
    if (suggestionsRef.current) suggestionsRef.current.style.zIndex = String(next);
  }, [suggestionsRef]);

  const bringToFront = () => {
    const next = getNextZIndex();
    zIndexRef.current = next;
    if (suggestionsRef.current) suggestionsRef.current.style.zIndex = String(next);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowSuggestions(false);
      setIsClosing(false);
    }, 300);
  };

  const fetchItems = async (ch: SuggestionChannel) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/suggestions?channel=${ch}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to load');
      setItems(data.items || []);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(channel);
  }, [channel]);

  useEffect(() => {
    scrollToBottom('auto');
  }, [items, channel]);

  const send = async () => {
    setError(null);
    const trimmed = message.trim();
    if (!trimmed) {
      setError('Message cannot be empty.');
      return;
    }

    try {
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, message: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to send');

      const created: SuggestionRow = data.item;
      const token: string = data.deleteToken;

      // update UI immediately
      setItems((prev) => [...prev, created]);
      requestAnimationFrame(() => scrollToBottom('smooth'));
      setDeleteTokens((prev) => ({ ...prev, [created.id]: token }));
      setMessage('');
    } catch (e: any) {
      setError(e?.message ?? 'Failed to send');
    }
  };

  const deleteMsg = async (id: string) => {
    setError(null);

    const headers: Record<string, string> = {};

    // admin can delete anytime
    if (isOwner) {
        headers['x-admin-token'] = ownerToken;
    } else {
        const token = deleteTokens[id];
        if (!token) return; // no token => no delete
        headers['x-delete-token'] = token;
    }

    try {
        const res = await fetch(`/api/suggestions/${id}`, {
        method: 'DELETE',
        headers,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Delete failed');

        setItems((prev) => prev.filter((x) => x.id !== id));
        setDeleteTokens((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
        });
    } catch (e: any) {
        setError(e?.message ?? 'Delete failed');
    }
  };

  const updateStatus = async (id: string, status: 'new' | 'seen') => {
    setError(null);
    try {
      const res = await fetch(`/api/suggestions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': ownerToken,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Update failed');

      const updated: SuggestionRow = data.item;
      setItems((prev) => prev.map((x) => (x.id === id ? updated : x)));
    } catch (e: any) {
      setError(e?.message ?? 'Update failed');
    }
  };

  return (
    <div
      ref={suggestionsRef}
      onPointerDownCapture={bringToFront}
      onTouchStartCapture={bringToFront}
      style={{ zIndex: zIndexRef.current }}
      className="fixed flex items-center justify-center animate-slideUp touch-manipulation
        w-[94vw] max-w-6xl
        h-[82vh] max-h-[900px] min-h-[650px]
        left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`relative h-full w-full ${isClosing ? 'dockDown' : 'dockUp'}`}>
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />

        {/* Window */}
        <div className="border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10 overflow-hidden bg-[#12162A]">
          {/* Top Bar */}
          <div
            onMouseDown={(e) => {
              onMouseDown(e);
              bringToFront();
            }}
            className="flex items-center justify-center bg-[#1B2140] border-b-[4px] border-[#36312C] px-4 py-2 cursor-move text-center relative"
          >
            <span className="font-bold text-[#F9F2E4] w-full pulse-glow">Suggestions</span>
            <div className="absolute right-4 flex gap-2">
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4]
                  border-[3.5px] border-[#36312C] text-[#36312C] font-extrabold hover:bg-[#757ed3] transition-colors"
                aria-label="Minimize"
              >
                −
              </button>
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4]
                  border-[3.5px] border-[#36312C] text-[#36312C] font-extrabold hover:bg-[#c4576e] transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 min-h-0">
            {/* Sidebar */}
            <div className="w-[210px] shrink-0 bg-[#161B33] border-r-[4px] border-[#36312C] p-3 text-[#F9F2E4]">
              <div className="text-xs uppercase tracking-widest opacity-70 mb-2">Channels</div>

              <button
                data-testid="channel-idea"
                onClick={() => setChannel('idea')}
                className={`w-full text-left px-3 py-2 rounded-lg border-[3px] border-[#36312C] mb-2 transition-colors
                  ${channel === 'idea' ? 'bg-[#22306B]' : 'bg-[#1B2140] hover:bg-[#22306B]'}`}
              >
                <span className="opacity-80">#</span> ideas
              </button>

              <button
                data-testid="channel-feedback"
                onClick={() => setChannel('feedback')}
                className={`w-full text-left px-3 py-2 rounded-lg border-[3px] border-[#36312C] transition-colors
                  ${channel === 'feedback' ? 'bg-[#22306B]' : 'bg-[#1B2140] hover:bg-[#22306B]'}`}
              >
                <span className="opacity-80">#</span> feedback
              </button>

              <div className="mt-4 p-3 rounded-lg border-[3px] border-[#36312C] bg-[#562929] text-xs leading-relaxed">
                <div className="font-bold mb-1 text-[#F9F2E4]">Note</div>
                <div className="opacity-90">
                  You can delete your message <span className="font-bold">only before you refresh the page</span>.
                </div>
              </div>

              {/* Owner tools (optional) */}
              <div className="mt-4 p-3 rounded-lg border-[3px] border-[#36312C] bg-[#1B2140] text-xs">
                <div className="font-bold mb-2">Owner tools</div>
                <input
                  value={ownerToken}
                  onChange={(e) => setOwnerToken(e.target.value)}
                  placeholder="Admin token (not saved)"
                  className="w-full px-2 py-2 rounded-md bg-[#12162A] border-[2px] border-[#36312C] outline-none"
                />
                <div className="opacity-70 mt-2">
                  For “Update” (status) tests. Leave empty for public view.
                </div>
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#12162A]">
              {/* Messages */}
              <div ref={messagesContainerRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
                {loading ? (
                  <div className="text-[#F9F2E4] opacity-70">Loading…</div>
                ) : items.length === 0 ? (
                  <div className="text-[#F9F2E4] opacity-70">No messages yet :O</div>
                ) : (
                  items.map((m, idx) => {
                    const canDelete = isOwner || Boolean(deleteTokens[m.id]);
                    return (
                      <div
                        key={m.id}
                        data-testid={`msg-${m.id}`}
                        className="flex gap-3 items-start"
                      >
                        {/* Avatar dot */}
                        <div className="w-10 h-10 rounded-full border-[3px] border-[#36312C] shrink-0"
                            style={{ backgroundColor: m.status === 'new' ? '#7E4040' : '#22306B' }}
                        />

                        {/* Bubble */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[#F9F2E4] font-bold">
                                {m.channel === 'idea' ? `Idea #${idx + 1}` : `Feedback #${idx + 1}`}
                            </span>

                            <span className="text-[#F9F2E4] opacity-50 text-xs">
                              {new Date(m.created_at).toLocaleString()}
                            </span>

                            {/* status badge (owner updates) */}
                            <span
                                className="ml-auto text-xs px-2 py-[2px] rounded-full border-[2px] border-[#36312C] text-[#F9F2E4]"
                                style={{ backgroundColor: m.status === 'new' ? '#7E4040' : '#1B2140' }}
                            >
                                {m.status}
                            </span>

                          </div>

                          <div
                              className="mt-1 p-3 rounded-xl border-[3px] text-[#F9F2E4] break-words"
                              style={{
                                  borderColor: m.status === 'new' ? '#7E4040' : '#36312C',
                                  backgroundColor: m.status === 'new' ? '#231A2D' : '#1B2140', // subtle tint for "new"
                              }}
                          >
                            {m.message}
                          </div>


                          <div className="mt-2 flex gap-2">
                            {canDelete ? (
                                <button
                                    data-testid={`delete-${m.id}`}
                                    onClick={() => deleteMsg(m.id)}
                                    className="text-xs px-3 py-1 rounded-lg border-[3px] border-[#36312C] bg-[#2B3057] text-[#F9F2E4] hover:bg-[#353C6B] transition-colors"
                                >
                                    {isOwner ? 'Delete' : 'Delete (until refresh)'}
                                </button>
                            ) : (
                                <span className="text-xs text-[#F9F2E4] opacity-40">Delete unavailable</span>
                            )}

                            {isOwner && m.status === 'new' ? (
                                <button
                                    onClick={() => updateStatus(m.id, 'seen')}
                                    className="text-xs px-3 py-1 rounded-lg border-[3px] border-[#36312C] bg-[#2B3057] text-[#F9F2E4] hover:bg-[#353C6B] transition-colors"
                                >
                                    Mark seen
                                </button>
                            ) : null}

                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} /> {/* bottom marker for scrolling */}
              </div>

              {/* Composer */}
              <div className="border-t-[4px] border-[#36312C] p-3 bg-[#161B33]">
                {error ? (
                  <div className="mb-2 text-sm px-3 py-2 rounded-lg border-[3px] border-[#36312C] bg-[#2A1330] text-[#F9F2E4]">
                    {error}
                  </div>
                ) : null}

                <div className="flex gap-2 items-end">
                  <textarea
                    data-testid="composer-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    maxLength={240}
                    placeholder={`Send a ${channel}… (max 240 chars)`}
                    className="flex-1 resize-none px-3 py-2 rounded-lg bg-[#12162A] text-[#F9F2E4]
                      border-[3px] border-[#36312C] outline-none"
                  />

                  <button
                    data-testid="composer-send"
                    onClick={send}
                    className="px-4 py-2 rounded-lg border-[3px] border-[#36312C] bg-[#22306B] text-[#F9F2E4]
                      hover:bg-[#2C3A7A] transition-colors font-bold"
                  >
                    Send
                  </button>
                </div>

                <div className="mt-2 text-xs text-[#F9F2E4] opacity-60">
                  Warning: you can delete your message only before refresh. Profanity and links are blocked.
                </div>
              </div>
            </div>
          </div>
          {/* End Body */}
        </div>
      </div>
    </div>
  );
}
