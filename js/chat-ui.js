/**
 * GreenCorner - chat-ui.js
 * Tampilan Chat, Manajemen Status AI & Pengalihan Otomatis ke Chatbot Sederhana
 * Berdasarkan spesifikasi bagian 10.2 s/d 10.5 KONTEKS.md
 */

(function () {
  'use strict';

  // Konfigurasi AI
  // Sesuai bagian 10.4 Pilihan B: Tahap 1 hanya chatbot sederhana, AI_ENABLED = false.
  // Jika di kemudian hari backend /api/chat tersedia, cukup ubah AI_ENABLED = true.
  const AI_ENABLED = false;
  const AI_ENDPOINT = '/api/chat';
  const MAX_HISTORY_MESSAGES = 10;
  const MAX_INPUT_LENGTH = 300;

  class ChatUI {
    constructor() {
      this.chatbot = new SimpleChatbot();
      this.messagesHistory = []; // Untuk context AI: [{ role: 'user'|'assistant', content: '' }]
      this.currentAbortController = null;
      this.aiStatus = 'checking'; // 'checking' | 'active' | 'fallback_perm' | 'fallback_temp'

      this.panel = document.querySelector('.chat-panel');
      if (!this.panel) return;

      this.statusDot = this.panel.querySelector('.status-dot');
      this.statusText = this.panel.querySelector('.status-text');
      this.statusAction = this.panel.querySelector('.status-action');
      this.historyEl = this.panel.querySelector('.chat-history');
      this.inputForm = this.panel.querySelector('.chat-input-form');
      this.inputEl = this.panel.querySelector('.chat-input');
      this.sendBtn = this.panel.querySelector('.chat-send-btn');
      this.waitingBar = this.panel.querySelector('.chat-waiting-bar');
      this.stopBtn = this.panel.querySelector('.btn-stop');

      this.init();
    }

    init() {
      // Setup input constraints
      if (this.inputEl) {
        this.inputEl.setAttribute('maxlength', MAX_INPUT_LENGTH);
      }

      // Inisialisasi status AI
      this.checkAIStatus();

      // Tampilkan pesan sambutan awal
      this.renderWelcomeMessage();

      // Event listener formulir
      if (this.inputForm) {
        this.inputForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleUserSubmit();
        });
      }

      // Event listener tombol Stop
      if (this.stopBtn) {
        this.stopBtn.addEventListener('click', () => {
          if (this.currentAbortController) {
            this.currentAbortController.abort();
          }
        });
      }
    }

    setStatus(type, customText) {
      this.aiStatus = type;
      if (!this.statusDot || !this.statusText) return;

      this.statusDot.className = 'status-dot';
      if (this.statusAction) this.statusAction.innerHTML = '';

      if (type === 'checking') {
        this.statusText.textContent = 'Memeriksa AI…';
      } else if (type === 'active') {
        this.statusDot.classList.add('active');
        this.statusText.textContent = 'AI aktif';
      } else if (type === 'fallback_perm') {
        this.statusDot.classList.add('fallback');
        this.statusText.textContent = 'Chatbot sederhana';
      } else if (type === 'fallback_temp') {
        this.statusDot.classList.add('error');
        this.statusText.textContent = customText || 'AI tidak tersedia, pakai chatbot sederhana';

        if (this.statusAction) {
          const retryBtn = document.createElement('button');
          retryBtn.className = 'suggestion-btn';
          retryBtn.textContent = 'Coba AI lagi';
          retryBtn.style.padding = '0.15rem 0.5rem';
          retryBtn.style.fontSize = '0.75rem';
          retryBtn.addEventListener('click', () => {
            this.checkAIStatus(true);
          });
          this.statusAction.appendChild(retryBtn);
        }
      }
    }

    async checkAIStatus(isRetry = false) {
      if (!AI_ENABLED) {
        this.setStatus('fallback_perm');
        return;
      }

      this.setStatus('checking');
      try {
        const res = await fetch(AI_ENDPOINT, {
          method: 'HEAD',
          signal: AbortSignal.timeout(4000)
        });
        if (res.ok) {
          this.setStatus('active');
        } else if (res.status === 429) {
          this.setStatus('fallback_temp', 'Batas pemakaian AI tercapai');
        } else {
          this.setStatus('fallback_perm');
        }
      } catch (err) {
        this.setStatus('fallback_temp');
      }
    }

    renderWelcomeMessage() {
      const welcomeText =
        'Halo! Aku asisten GreenCorner. Tanya apa saja soal proyek kami, bunga Asoka dan Aster, atau tips merawat kebun mini.';
      const initialSuggestions = [
        'Apa itu GreenCorner?',
        'Cara merawat Asoka',
        'Cara merawat Aster',
        'Alat dan bahan apa saja?',
        'Kenapa daun menguning?',
        'Siapa anggota kelompok?'
      ];

      this.appendAssistantBubble({
        text: welcomeText,
        source: 'Chatbot sederhana',
        suggestions: initialSuggestions
      });

      this.messagesHistory.push({ role: 'assistant', content: welcomeText });
    }

    formatTextContent(text) {
      // Mengubah teks polos menjadi elemen DOM aman tanpa kerentanan XSS (innerHTML)
      // Mendukung **tebal**, baris baru, daftar "- ", dan "1. "
      const container = document.createElement('div');
      const lines = text.split('\n');

      let currentList = null;
      let currentListType = null;

      lines.forEach((line) => {
        const trimmed = line.trim();
        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);

        if (isBullet) {
          if (!currentList || currentListType !== 'ul') {
            currentList = document.createElement('ul');
            currentList.style.paddingLeft = '1.25rem';
            currentList.style.margin = '0.35rem 0';
            currentListType = 'ul';
            container.appendChild(currentList);
          }
          const li = document.createElement('li');
          this.appendFormattedInline(li, trimmed.slice(2));
          currentList.appendChild(li);
        } else if (numMatch) {
          if (!currentList || currentListType !== 'ol') {
            currentList = document.createElement('ol');
            currentList.style.paddingLeft = '1.25rem';
            currentList.style.margin = '0.35rem 0';
            currentListType = 'ol';
            container.appendChild(currentList);
          }
          const li = document.createElement('li');
          this.appendFormattedInline(li, numMatch[2]);
          currentList.appendChild(li);
        } else {
          currentList = null;
          currentListType = null;
          if (trimmed.length === 0) {
            const spacer = document.createElement('div');
            spacer.style.height = '0.5rem';
            container.appendChild(spacer);
          } else {
            const p = document.createElement('p');
            p.style.margin = '0.25rem 0';
            this.appendFormattedInline(p, line);
            container.appendChild(p);
          }
        }
      });

      return container;
    }

    appendFormattedInline(element, text) {
      // Parse **tebal** secara aman
      const parts = text.split(/(\*\*.*?\*\*)/g);
      parts.forEach((part) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          const strong = document.createElement('strong');
          strong.textContent = part.slice(2, -2);
          element.appendChild(strong);
        } else if (part.length > 0) {
          element.appendChild(document.createTextNode(part));
        }
      });
    }

    appendUserBubble(text) {
      const msgWrap = document.createElement('div');
      msgWrap.className = 'chat-msg user';

      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      bubble.textContent = text;

      msgWrap.appendChild(bubble);
      this.historyEl.appendChild(msgWrap);
      this.scrollToBottom();
    }

    appendAssistantBubble({ text, source, suggestions, pageLink }) {
      const msgWrap = document.createElement('div');
      msgWrap.className = 'chat-msg assistant';

      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      bubble.appendChild(this.formatTextContent(text));
      msgWrap.appendChild(bubble);

      // Label sumber (AI / Chatbot sederhana)
      if (source) {
        const sourceTag = document.createElement('div');
        sourceTag.className = 'chat-source-tag';
        sourceTag.textContent = source;
        msgWrap.appendChild(sourceTag);
      }

      // Tombol halaman terkait bila ada
      if (pageLink && pageLink.url) {
        const linkBtn = document.createElement('a');
        linkBtn.className = 'page-link-btn';
        linkBtn.href = pageLink.url;
        linkBtn.textContent = pageLink.text || 'Buka halaman';
        msgWrap.appendChild(linkBtn);
      }

      // Tombol saran
      if (suggestions && suggestions.length > 0) {
        const suggWrap = document.createElement('div');
        suggWrap.className = 'chat-suggestions';
        suggestions.forEach((sugText) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'suggestion-btn';
          btn.textContent = sugText;
          btn.addEventListener('click', () => {
            this.sendInput(sugText);
          });
          suggWrap.appendChild(btn);
        });
        msgWrap.appendChild(suggWrap);
      }

      this.historyEl.appendChild(msgWrap);
      this.scrollToBottom();
      return msgWrap;
    }

    appendSystemNote(text) {
      const note = document.createElement('div');
      note.className = 'chat-system-note';
      note.textContent = text;
      this.historyEl.appendChild(note);
      this.scrollToBottom();
    }

    scrollToBottom() {
      if (this.historyEl) {
        this.historyEl.scrollTop = this.historyEl.scrollHeight;
      }
    }

    sendInput(text) {
      if (!this.inputEl) return;
      this.inputEl.value = text;
      this.handleUserSubmit();
    }

    async handleUserSubmit() {
      const rawText = this.inputEl.value.trim();
      if (!rawText) return;

      const userText = rawText.slice(0, MAX_INPUT_LENGTH);
      this.inputEl.value = '';
      this.inputEl.disabled = true;
      this.sendBtn.disabled = true;

      // Tampilkan gelembung pesan user
      this.appendUserBubble(userText);
      this.messagesHistory.push({ role: 'user', content: userText });

      // Jaga panjang riwayat konteks maksimal ~10 pesan
      if (this.messagesHistory.length > MAX_HISTORY_MESSAGES) {
        this.messagesHistory = this.messagesHistory.slice(-MAX_HISTORY_MESSAGES);
      }

      // Skenario: Jika AI aktif dan diizinkan, coba panggil AI
      if (AI_ENABLED && this.aiStatus === 'active') {
        await this.handleAIMessage(userText);
      } else {
        // Langsung jawab lewat chatbot sederhana
        this.handleChatbotMessage(userText);
      }

      this.inputEl.disabled = false;
      this.sendBtn.disabled = false;
      this.inputEl.focus();
    }

    async handleAIMessage(userText) {
      this.currentAbortController = new AbortController();
      if (this.waitingBar) this.waitingBar.style.display = 'flex';

      // Buat gelembung thinking
      const thinkingBubble = document.createElement('div');
      thinkingBubble.className = 'chat-msg assistant thinking-indicator';
      thinkingBubble.innerHTML = '<div class="chat-bubble"><em>Sedang berpikir…</em></div>';
      this.historyEl.appendChild(thinkingBubble);
      this.scrollToBottom();

      try {
        const response = await this.askAI(this.messagesHistory, {
          signal: this.currentAbortController.signal
        });

        thinkingBubble.remove();
        if (this.waitingBar) this.waitingBar.style.display = 'none';

        this.appendAssistantBubble({
          text: response.text,
          source: 'AI',
          suggestions: response.suggestions || []
        });

        this.messagesHistory.push({ role: 'assistant', content: response.text });
      } catch (err) {
        thinkingBubble.remove();
        if (this.waitingBar) this.waitingBar.style.display = 'none';

        if (err.name === 'AbortError' || err.code === 'cancelled') {
          this.appendSystemNote('Jawaban dihentikan.');
          return;
        }

        // Pengalihan ke chatbot sederhana sesuai tabel bagian 10.3
        if (err.code === 'rate_limited') {
          this.setStatus('fallback_temp', 'Batas pemakaian AI tercapai');
          this.appendSystemNote('Batas pemakaian AI tercapai. Pertanyaanmu dijawab oleh chatbot sederhana.');
        } else if (err.code === 'upstream_error') {
          this.setStatus('fallback_temp', 'AI sedang bermasalah');
          this.appendSystemNote('AI sedang bermasalah. Pertanyaanmu dijawab oleh chatbot sederhana.');
        } else if (err.code === 'refused') {
          this.appendSystemNote('AI tidak bisa menjawab pertanyaan ini. Pertanyaanmu dijawab oleh chatbot sederhana.');
        } else {
          this.setStatus('fallback_perm');
          this.appendSystemNote('AI tidak tersedia. Pertanyaanmu dijawab oleh chatbot sederhana.');
        }

        // Jawab dengan chatbot sederhana
        this.handleChatbotMessage(userText);
      } finally {
        this.currentAbortController = null;
      }
    }

    handleChatbotMessage(userText) {
      const result = this.chatbot.processMessage(userText);
      this.appendAssistantBubble(result);
      this.messagesHistory.push({ role: 'assistant', content: result.text });
    }

    /**
     * Lapisan Pemanggil AI
     * Melempar kode kesalahan terstruktur: rate_limited, upstream_error, not_granted, refused, cancelled
     */
    async askAI(messages, { signal }) {
      if (!AI_ENABLED) {
        const err = new Error('AI not configured');
        err.code = 'not_granted';
        throw err;
      }

      try {
        const response = await fetch(AI_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages }),
          signal
        });

        if (response.status === 429) {
          const err = new Error('Rate limit reached');
          err.code = 'rate_limited';
          throw err;
        }

        if (!response.ok) {
          const err = new Error('Upstream server error');
          err.code = 'upstream_error';
          throw err;
        }

        const data = await response.json();
        if (!data || !data.text) {
          const err = new Error('Empty response');
          err.code = 'upstream_error';
          throw err;
        }

        return {
          text: data.text,
          suggestions: data.suggestions || []
        };
      } catch (err) {
        if (err.name === 'AbortError') {
          err.code = 'cancelled';
        }
        throw err;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new ChatUI();
  });
})();
