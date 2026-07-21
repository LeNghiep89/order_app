import { useState, useEffect, useCallback } from "react";

/* ── Types ─────────────────────────────────────────────────────────────────── */

type ScreenId =
  | "welcome"
  | "loading"
  | "restaurant"
  | "menu"
  | "reservation"
  | "custom"
  | "fallback"
  | "handoff";

const SCREEN_META: Record<ScreenId, { num: number; label: string }> = {
  welcome:     { num: 1, label: "Welcome State" },
  loading:     { num: 2, label: "Loading State" },
  restaurant:  { num: 3, label: "Restaurant Info" },
  menu:        { num: 4, label: "Menu Response" },
  reservation: { num: 5, label: "Reservation" },
  custom:      { num: 6, label: "Custom Question" },
  fallback:    { num: 7, label: "AI Fallback" },
  handoff:     { num: 8, label: "Booking Handoff" },
};

const SCREEN_ORDER: ScreenId[] = [
  "welcome", "loading", "restaurant", "menu",
  "reservation", "custom", "fallback", "handoff",
];

const DEFAULT_MSG: Partial<Record<ScreenId, string>> = {
  restaurant:  "Tôi muốn tìm hiểu về nhà hàng",
  menu:        "Tôi muốn xem thực đơn",
  reservation: "Tôi muốn đặt bàn",
  custom:      "Nhà hàng có điểm gì đặc biệt?",
  loading:     "Tôi muốn tìm hiểu về nhà hàng",
  fallback:    "",
  handoff:     "",
};

type NavFn = (target: ScreenId, msg?: string) => void;

/* ── Wireframe primitives ───────────────────────────────────────────────────── */

function WfHeader() {
  return (
    <div className="flex items-center px-4 h-11 bg-gray-200 border-b-2 border-gray-400 shrink-0">
      <span className="font-mono text-xs text-gray-500 border border-gray-400 px-1.5 py-0.5 mr-3 leading-none">←</span>
      <span className="font-mono font-bold text-gray-700 text-sm tracking-wide">AI Assistant</span>
      <div className="ml-auto flex gap-1">
        <span className="font-mono text-xs text-gray-400">···</span>
      </div>
    </div>
  );
}

function WfAiMsg({ text, helper }: { text: string; helper?: string }) {
  return (
    <div className="mb-4">
      <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">AI</div>
      <div className="inline-block max-w-[88%] border border-gray-300 bg-gray-100 px-3 py-2.5 font-mono text-xs text-gray-700 leading-relaxed whitespace-pre-line">
        {text}
      </div>
      {helper && (
        <div className="mt-1.5 font-mono text-[10px] text-gray-500 italic max-w-[88%]">{helper}</div>
      )}
    </div>
  );
}

function WfUserMsg({ text }: { text: string }) {
  return (
    <div className="mb-4 text-right">
      <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Bạn</div>
      <div className="inline-block max-w-[82%] bg-gray-500 px-3 py-2.5 font-mono text-xs text-white leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function WfTypingDots() {
  return (
    <div className="mb-4">
      <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">AI</div>
      <div className="inline-flex items-center gap-1.5 border border-gray-300 bg-gray-100 px-4 py-3">
        {[0, 0.3, 0.6].map((d, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: `${d}s`, animationDuration: "1.1s" }}
          />
        ))}
      </div>
    </div>
  );
}

function WfChip({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full border border-gray-500 bg-white px-3 py-2 font-mono text-xs text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors text-left leading-snug"
    >
      [ {label} ]
    </button>
  );
}

function WfChipGroup({ chips }: { chips: { label: string; onClick?: () => void }[] }) {
  return (
    <div className="flex flex-col gap-2 mt-1 mb-3">
      {chips.map((c, i) => <WfChip key={i} label={c.label} onClick={c.onClick} />)}
    </div>
  );
}

function WfActionBlock({ items }: { items: { label: string; primary?: boolean; onClick?: () => void }[] }) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.onClick}
          className={`w-full py-3.5 font-mono text-sm font-bold border-2 transition-colors ${
            item.primary
              ? "border-gray-700 bg-gray-700 text-white hover:bg-gray-800"
              : "border-gray-400 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function WfComposer({ onSend, disabled }: { onSend: (text: string) => void; disabled?: boolean }) {
  const [val, setVal] = useState("");
  const submit = () => {
    if (!disabled && val.trim()) {
      onSend(val.trim());
      setVal("");
    }
  };
  return (
    <div className="flex gap-2 px-3 py-2.5 border-t-2 border-gray-300 bg-white shrink-0">
      <input
        className="flex-1 border border-gray-400 bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700 placeholder-gray-400 outline-none disabled:opacity-50"
        placeholder="Nhập câu hỏi..."
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()}
        disabled={disabled}
      />
      <button
        onClick={submit}
        disabled={disabled}
        className="shrink-0 border-2 border-gray-500 bg-gray-200 px-4 py-2 font-mono text-xs font-bold text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-40"
      >
        Gửi
      </button>
    </div>
  );
}

/* ── Greeting message (shared) ────────────────────────────────────────────── */
const GREETING = "Xin chào! Tôi là trợ lý AI của Madame Lân.\nTôi có thể giúp bạn tìm hiểu nhà hàng, thực đơn hoặc hỗ trợ đặt bàn.";

/* ── Screen components ─────────────────────────────────────────────────────── */

function ScreenWelcome({ nav }: { nav: NavFn }) {
  return (
    <>
      <WfHeader />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <WfAiMsg text={GREETING} />
        <WfChipGroup chips={[
          { label: "Tìm hiểu nhà hàng", onClick: () => nav("restaurant", "Tôi muốn tìm hiểu về nhà hàng") },
          { label: "Xem thực đơn",       onClick: () => nav("menu",        "Tôi muốn xem thực đơn") },
          { label: "Đặt bàn",            onClick: () => nav("reservation", "Tôi muốn đặt bàn") },
        ]} />
      </div>
      <WfComposer onSend={msg => nav("custom", msg)} />
    </>
  );
}

function ScreenLoading({ userMsg, onDone }: { userMsg: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <WfHeader />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <WfAiMsg text={GREETING} />
        <WfUserMsg text={userMsg} />
        <WfTypingDots />
        <p className="font-mono text-[9px] text-gray-400 mt-1 italic">auto-advances after 3s...</p>
      </div>
      <WfComposer onSend={() => {}} disabled />
    </>
  );
}

function ScreenRestaurant({ userMsg, nav }: { userMsg: string; nav: NavFn }) {
  return (
    <>
      <WfHeader />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <WfAiMsg text={GREETING} />
        <WfUserMsg text={userMsg} />
        <WfAiMsg text="Madame Lân là nhà hàng ẩm thực miền Trung nổi tiếng tại Đà Nẵng. Nhà hàng mang đến trải nghiệm ẩm thực truyền thống trong không gian đậm bản sắc địa phương." />
        <WfChipGroup chips={[
          { label: "Câu chuyện thương hiệu", onClick: () => nav("custom", "Câu chuyện thương hiệu") },
          { label: "Không gian nhà hàng",   onClick: () => nav("custom", "Không gian nhà hàng") },
          { label: "Giờ mở cửa",            onClick: () => nav("custom", "Giờ mở cửa") },
        ]} />
      </div>
      <WfComposer onSend={msg => nav("custom", msg)} />
    </>
  );
}

function ScreenMenu({ userMsg, nav }: { userMsg: string; nav: NavFn }) {
  return (
    <>
      <WfHeader />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <WfAiMsg text={GREETING} />
        <WfUserMsg text={userMsg} />
        <WfAiMsg text="Nhà hàng phục vụ nhiều nhóm món ăn đặc sản miền Trung như món cuốn, hải sản, món chính và món tráng miệng." />
        <WfChipGroup chips={[
          { label: "Món đặc sản nổi bật",       onClick: () => nav("custom", "Món đặc sản nổi bật") },
          { label: "Thực đơn cho nhóm khách",   onClick: () => nav("custom", "Thực đơn cho nhóm khách") },
          { label: "Xem menu đầy đủ",           onClick: () => nav("custom", "Xem menu đầy đủ") },
        ]} />
      </div>
      <WfComposer onSend={msg => nav("custom", msg)} />
    </>
  );
}

function ScreenReservation({ userMsg, nav }: { userMsg: string; nav: NavFn }) {
  return (
    <>
      <WfHeader />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <WfAiMsg text={GREETING} />
        <WfUserMsg text={userMsg} />
        <WfAiMsg text="Tôi có thể hỗ trợ bạn đặt bàn nhanh chóng." />
        <WfChipGroup chips={[
          { label: "Đặt bàn hôm nay",   onClick: () => nav("handoff") },
          { label: "Đặt tiệc nhóm",     onClick: () => nav("handoff") },
          { label: "Liên hệ nhà hàng",  onClick: () => nav("handoff") },
        ]} />
      </div>
      <WfComposer onSend={msg => nav("custom", msg)} />
    </>
  );
}

function ScreenCustom({ userMsg, nav }: { userMsg: string; nav: NavFn }) {
  return (
    <>
      <WfHeader />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <WfAiMsg text={GREETING} />
        <WfUserMsg text={userMsg} />
        <WfAiMsg text="[AI generated response]" />
        <WfChipGroup chips={[
          { label: "Cá nướng song vị - Đạm đà khó cưỡng",  onClick: () => nav("custom", "Cá nướng song vị - Đạm đà khó cưỡng") },
          { label: "Mì Quảng – Tinh túy trong từng sợi mì",  onClick: () => nav("fallback") },
          { label: "Đặt bàn ngay",       onClick: () => nav("handoff") },
        ]} />
      </div>
      <WfComposer onSend={msg => nav("fallback", msg)} />
    </>
  );
}

function ScreenFallback({ nav }: { nav: NavFn }) {
  return (
    <>
      <WfHeader />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <WfAiMsg
          text="Tôi chưa hiểu chính xác yêu cầu của bạn."
          helper="Bạn có thể chọn một trong các nội dung dưới đây."
        />
        <WfChipGroup chips={[
          { label: "Tìm hiểu nhà hàng", onClick: () => nav("restaurant", "Tôi muốn tìm hiểu về nhà hàng") },
          { label: "Xem thực đơn",      onClick: () => nav("menu",       "Tôi muốn xem thực đơn") },
          { label: "Đặt bàn",           onClick: () => nav("reservation","Tôi muốn đặt bàn") },
        ]} />
      </div>
      <WfComposer onSend={msg => nav("custom", msg)} />
    </>
  );
}

function ScreenHandoff({ nav }: { nav: NavFn }) {
  return (
    <>
      <WfHeader />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <WfAiMsg text="Tôi đã sẵn sàng hỗ trợ đặt bàn." />
        <WfActionBlock items={[
          { label: "[ Đặt bàn ngay ]", primary: true, onClick: () => nav("welcome") },
          { label: "[ Gọi hotline ]" },
          { label: "[ Chat Zalo ]" },
        ]} />
      </div>
      <WfComposer onSend={msg => nav("custom", msg)} />
    </>
  );
}

/* ── Flow Map ──────────────────────────────────────────────────────────────── */

const FLOW_CONNECTIONS = [
  { from: "welcome",     to: "loading",     label: "chip / send" },
  { from: "loading",     to: "restaurant",  label: "→ after 3s (A)" },
  { from: "loading",     to: "menu",        label: "→ after 3s (B)" },
  { from: "loading",     to: "reservation", label: "→ after 3s (C)" },
  { from: "loading",     to: "custom",      label: "→ after 3s (D)" },
  { from: "restaurant",  to: "custom",      label: "sub-chip" },
  { from: "menu",        to: "custom",      label: "sub-chip" },
  { from: "reservation", to: "handoff",     label: "booking chip" },
  { from: "custom",      to: "fallback",    label: "unclear input" },
  { from: "custom",      to: "handoff",     label: "book chip" },
  { from: "fallback",    to: "loading",     label: "recovery chip" },
];

function FlowMap({ onGo }: { onGo: (s: ScreenId) => void }) {
  const rows: { screens: ScreenId[]; label: string }[] = [
    { screens: ["welcome"], label: "Entry" },
    { screens: ["loading"], label: "Transition" },
    { screens: ["restaurant", "menu", "reservation", "custom"], label: "Responses" },
    { screens: ["fallback", "handoff"], label: "End States" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 px-4 py-5">
      <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4">
        Prototype Flow Map — 8 Frames
      </div>

      {rows.map(row => (
        <div key={row.label} className="mb-4">
          <div className="font-mono text-[9px] text-gray-400 mb-2 uppercase tracking-widest border-b border-gray-300 pb-1">
            {row.label}
          </div>
          <div className="flex flex-wrap gap-2">
            {row.screens.map(sid => {
              const meta = SCREEN_META[sid];
              return (
                <button
                  key={sid}
                  onClick={() => onGo(sid as ScreenId)}
                  className="border-2 border-gray-500 bg-white px-3 py-2.5 font-mono text-xs text-gray-700 hover:bg-gray-200 transition-colors text-left"
                >
                  <div className="text-[9px] text-gray-400 mb-0.5">Frame {meta.num}</div>
                  <div className="font-bold">{meta.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-5 border-t border-gray-300 pt-4">
        <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mb-3">
          Connections
        </div>
        <div className="flex flex-col gap-1.5">
          {FLOW_CONNECTIONS.map((c, i) => (
            <div key={i} className="font-mono text-[10px] text-gray-600 flex items-center gap-2">
              <span className="text-gray-500 font-bold w-20 truncate">{SCREEN_META[c.from as ScreenId].num}. {SCREEN_META[c.from as ScreenId].label}</span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-500 font-bold w-20 truncate">{SCREEN_META[c.to as ScreenId].num}. {SCREEN_META[c.to as ScreenId].label}</span>
              <span className="text-gray-400 italic text-[9px]">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Frame Navigator ───────────────────────────────────────────────────────── */

function FrameNav({
  current,
  onSelect,
}: {
  current: ScreenId;
  onSelect: (s: ScreenId) => void;
}) {
  return (
    <div className="flex gap-1 flex-wrap justify-center px-2 py-2 bg-gray-700">
      {SCREEN_ORDER.map(sid => {
        const meta = SCREEN_META[sid];
        const active = sid === current;
        return (
          <button
            key={sid}
            onClick={() => onSelect(sid)}
            title={`Frame ${meta.num}: ${meta.label}`}
            className={`font-mono text-[10px] font-bold px-2 py-1 border transition-colors ${
              active
                ? "border-white bg-white text-gray-800"
                : "border-gray-500 bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white"
            }`}
          >
            {meta.num}
          </button>
        );
      })}
    </div>
  );
}

/* ── Main App ──────────────────────────────────────────────────────────────── */

export default function App() {
  const [screen, setScreen]       = useState<ScreenId>("welcome");
  const [userMsg, setUserMsg]     = useState("");
  const [pending, setPending]     = useState<ScreenId>("welcome");
  const [viewMap, setViewMap]     = useState(false);

  // Navigate: with message → show loading first; without → direct
  const nav = useCallback<NavFn>((target, msg) => {
    if (msg !== undefined) {
      setUserMsg(msg);
      setPending(target);
      setScreen("loading");
    } else {
      setScreen(target);
    }
  }, []);

  // Direct frame jump (from navigator or map)
  const jumpTo = useCallback((sid: ScreenId) => {
    const defaultMsg = DEFAULT_MSG[sid] ?? "";
    setUserMsg(defaultMsg);
    setPending(sid === "loading" ? "restaurant" : sid);
    setScreen(sid);
    setViewMap(false);
  }, []);

  const handleLoadingDone = useCallback(() => {
    setScreen(pending);
  }, [pending]);

  const activeMsg = userMsg || (DEFAULT_MSG[screen] ?? "");

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-start py-6 px-4">

      {/* Prototype title bar */}
      <div className="w-[390px] flex items-center justify-between mb-3">
        <div>
          <p className="font-mono text-xs font-bold text-gray-600 uppercase tracking-widest">
            UX Wireframe Prototype
          </p>
          <p className="font-mono text-[9px] text-gray-500 mt-0.5">
            Madame Lân — AI Assistant Feature
          </p>
        </div>
        <button
          onClick={() => setViewMap(v => !v)}
          className={`font-mono text-[10px] border px-2.5 py-1 transition-colors ${
            viewMap
              ? "border-gray-600 bg-gray-600 text-white"
              : "border-gray-500 bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {viewMap ? "← Prototype" : "Flow Map"}
        </button>
      </div>

      {/* Mobile frame */}
      <div className="w-[390px] border-2 border-gray-600 bg-white shadow-lg flex flex-col overflow-hidden"
           style={{ height: "844px" }}>

        {/* Frame navigator */}
        <FrameNav current={screen} onSelect={jumpTo} />

        {/* Frame label bar */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border-b border-gray-300 shrink-0">
          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
            Frame {SCREEN_META[screen].num}
          </span>
          <span className="font-mono text-[9px] text-gray-300">|</span>
          <span className="font-mono text-[9px] text-gray-600 font-bold">
            {SCREEN_META[screen].label}
          </span>
          {screen === "loading" && (
            <span className="ml-auto font-mono text-[9px] text-gray-400 italic">
              auto-advancing…
            </span>
          )}
        </div>

        {/* Screen content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {viewMap ? (
            <FlowMap onGo={jumpTo} />
          ) : (
            <>
              {screen === "welcome"     && <ScreenWelcome nav={nav} />}
              {screen === "loading"     && <ScreenLoading userMsg={activeMsg} onDone={handleLoadingDone} />}
              {screen === "restaurant"  && <ScreenRestaurant userMsg={activeMsg} nav={nav} />}
              {screen === "menu"        && <ScreenMenu userMsg={activeMsg} nav={nav} />}
              {screen === "reservation" && <ScreenReservation userMsg={activeMsg} nav={nav} />}
              {screen === "custom"      && <ScreenCustom userMsg={activeMsg} nav={nav} />}
              {screen === "fallback"    && <ScreenFallback nav={nav} />}
              {screen === "handoff"     && <ScreenHandoff nav={nav} />}
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="w-[390px] mt-4 border border-gray-400 bg-white px-4 py-3">
        <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-2">Legend</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {[
            { swatch: "border border-gray-300 bg-gray-100", label: "AI message bubble" },
            { swatch: "bg-gray-500",                         label: "User message bubble" },
            { swatch: "border border-gray-500 bg-white",     label: "Suggestion chip (tap to advance)" },
            { swatch: "border-2 border-gray-700 bg-gray-700",label: "Primary action button" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-4 h-3 shrink-0 ${item.swatch}`} />
              <span className="font-mono text-[9px] text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="font-mono text-[9px] text-gray-400 mt-3 text-center">
        Low-fidelity prototype · UX validation only · Not for production
      </p>
    </div>
  );
}
