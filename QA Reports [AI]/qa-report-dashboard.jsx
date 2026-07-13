import React, { useState, useMemo, useRef } from "react";
import Papa from "papaparse";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RTooltip, ResponsiveContainer, LineChart, Line, Legend
} from "recharts";
import {
  Upload, FileText, Sparkles, Search, X, ChevronUp, ChevronDown,
  CheckCircle2, XCircle, MinusCircle, Clock3, Loader2, RotateCcw, LayoutGrid
} from "lucide-react";

/* ---------------------------------------------------------
   THEME — instrument-panel palette. Tailwind has no JIT here,
   so all custom color is applied via inline style, Tailwind
   only handles layout/spacing/flex/grid utilities.
--------------------------------------------------------- */
const THEME = {
  ink: "#12161C",
  panel: "#1B212B",
  panelAlt: "#212836",
  hairline: "#2B3341",
  paper: "#F5F3EE",
  muted: "#8791A1",
  pass: "#3FB68B",
  fail: "#E85C4A",
  blocked: "#E8A23D",
  skip: "#6B7785",
  accent: "#5B8DEF",
};

const STATUS_META = {
  pass: { label: "Passed", color: THEME.pass, Icon: CheckCircle2 },
  fail: { label: "Failed", color: THEME.fail, Icon: XCircle },
  blocked: { label: "Blocked", color: THEME.blocked, Icon: MinusCircle },
  skip: { label: "Skipped", color: THEME.skip, Icon: Clock3 },
};

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

/* ---------------------------------------------------------
   Sample data — lets the report be demoed instantly
--------------------------------------------------------- */
function makeSampleData() {
  const modules = ["Login & Auth", "Wallet / Payments", "Search", "Notifications", "Onboarding"];
  const statuses = ["pass", "pass", "pass", "fail", "pass", "blocked", "pass", "skip", "fail", "pass"];
  const names = [
    "Verify login with valid credentials", "Reject login with expired token",
    "Deposit within min/max limits", "Deposit blocked above daily limit",
    "AML check triggers over $1000", "Search returns relevant results",
    "Search handles empty query", "Push notification on deposit success",
    "Email confirmation sent on signup", "Onboarding completes in under 5 steps",
    "Card decline handled gracefully", "Wallet balance updates in real time",
    "Session timeout after inactivity", "Duplicate deposit prevented",
    "Search filters persist on reload", "Notification preferences saved",
    "Password reset link expires correctly", "Responsible gambling limit enforced",
    "Currency conversion displays correctly", "Guest checkout blocked for wallet top-up",
  ];
  const rows = [];
  const start = new Date("2026-06-29");
  for (let i = 0; i < 42; i++) {
    const date = new Date(start.getTime() + Math.floor(i / 6) * 86400000);
    rows.push({
      id: `TC-${String(1001 + i)}`,
      name: names[i % names.length],
      module: modules[i % modules.length],
      status: statuses[(i * 3 + i) % statuses.length],
      priority: ["High", "Medium", "Low"][i % 3],
      executedBy: ["Jay", "R. Singh", "M. Chen"][i % 3],
      executionDate: date.toISOString().slice(0, 10),
      durationSec: 8 + ((i * 17) % 90),
    });
  }
  return rows;
}

/* ---------------------------------------------------------
   CSV → normalized rows
--------------------------------------------------------- */
function normalizeRow(raw, i) {
  const get = (...keys) => {
    for (const k of keys) {
      const found = Object.keys(raw).find((rk) => rk.trim().toLowerCase() === k);
      if (found && raw[found] !== undefined && raw[found] !== "") return raw[found];
    }
    return undefined;
  };
  const statusRaw = String(get("status", "result") ?? "pass").trim().toLowerCase();
  const status = ["pass", "passed", "ok"].includes(statusRaw) ? "pass"
    : ["fail", "failed"].includes(statusRaw) ? "fail"
    : ["blocked", "block"].includes(statusRaw) ? "blocked"
    : ["skip", "skipped"].includes(statusRaw) ? "skip"
    : "pass";
  return {
    id: get("id", "test id", "testid", "tc") || `TC-${1000 + i}`,
    name: get("name", "title", "test name", "test case") || "Untitled test case",
    module: get("module", "feature", "component") || "General",
    status,
    priority: get("priority") || "Medium",
    executedBy: get("executedby", "executed by", "tester", "owner") || "—",
    executionDate: get("executiondate", "execution date", "date") || "",
    durationSec: Number(get("duration", "durationsec", "time (s)", "duration_s")) || 0,
  };
}

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
function KpiCard({ label, value, sub, accentColor }) {
  return (
    <div
      className="rounded-lg p-4 flex flex-col gap-1"
      style={{ background: THEME.panel, border: `1px solid ${THEME.hairline}` }}
    >
      <span className="text-xs tracking-wide uppercase" style={{ color: THEME.muted, fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {label}
      </span>
      <span
        className="text-3xl font-semibold leading-none"
        style={{ color: accentColor || THEME.paper, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {value}
      </span>
      {sub && <span className="text-xs" style={{ color: THEME.muted }}>{sub}</span>}
    </div>
  );
}

function StatusStrip({ rows, hovered, setHovered }) {
  return (
    <div
      className="rounded-lg p-4"
      style={{ background: THEME.panel, border: `1px solid ${THEME.hairline}` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs tracking-wide uppercase" style={{ color: THEME.muted, fontFamily: "'IBM Plex Sans', sans-serif" }}>
          Execution sequence — {rows.length} runs, in order
        </span>
        {hovered && (
          <span className="text-xs font-medium" style={{ color: THEME.paper, fontFamily: "'IBM Plex Mono', monospace" }}>
            {hovered.id} · {STATUS_META[hovered.status].label} · {hovered.name}
          </span>
        )}
      </div>
      <div className="flex gap-[2px] h-10 items-end overflow-x-auto pb-1">
        {rows.map((r, i) => (
          <div
            key={r.id + i}
            onMouseEnter={() => setHovered(r)}
            onMouseLeave={() => setHovered(null)}
            title={`${r.id} — ${r.name}`}
            style={{
              minWidth: 5,
              width: 5,
              height: r.status === "pass" ? "60%" : r.status === "fail" ? "100%" : "80%",
              background: STATUS_META[r.status].color,
              opacity: hovered && hovered !== r ? 0.35 : 1,
              borderRadius: 1,
              transition: "opacity 120ms ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */
export default function QAReportDashboard() {
  const [rows, setRows] = useState([]);
  const [reportTitle, setReportTitle] = useState("Test Execution Report");
  const [inputMode, setInputMode] = useState("upload"); // upload | paste
  const [pasteText, setPasteText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [sortKey, setSortKey] = useState("executionDate");
  const [sortDir, setSortDir] = useState("desc");
  const [hoveredTick, setHoveredTick] = useState(null);
  const fileInputRef = useRef(null);

  const handleCsvFile = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const normalized = res.data.map((r, i) => normalizeRow(r, i));
        setRows(normalized);
      },
    });
  };

  const handleStructureWithAI = async () => {
    if (!pasteText.trim()) return;
    setAiLoading(true);
    setAiError("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content:
                "You are structuring raw QA test execution notes into clean JSON records for a dashboard. " +
                "Read the notes below and return ONLY a JSON array (no markdown fences, no preamble, no commentary). " +
                "Each element must have exactly these fields: " +
                'id (string, e.g. "TC-1001" — invent sequential ids if none given), ' +
                'name (string, short test case title), ' +
                'module (string, feature area — infer a reasonable one if not stated), ' +
                'status (one of "pass", "fail", "blocked", "skip"), ' +
                'priority (one of "High", "Medium", "Low"), ' +
                'executedBy (string, use "—" if unknown), ' +
                'executionDate (string, format YYYY-MM-DD, use best guess or empty string if unknown), ' +
                "durationSec (number, 0 if unknown).\n\n" +
                "Notes:\n" + pasteText,
            },
          ],
        }),
      });
      const data = await response.json();
      const textBlocks = (data.content || []).filter((c) => c.type === "text").map((c) => c.text).join("\n");
      const cleaned = textBlocks.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      const clean = parsed.map((r, i) => ({
        id: r.id || `TC-${1000 + i}`,
        name: r.name || "Untitled test case",
        module: r.module || "General",
        status: ["pass", "fail", "blocked", "skip"].includes(r.status) ? r.status : "pass",
        priority: r.priority || "Medium",
        executedBy: r.executedBy || "—",
        executionDate: r.executionDate || "",
        durationSec: Number(r.durationSec) || 0,
      }));
      setRows(clean);
    } catch (e) {
      setAiError("Couldn't structure that text into test data. Try adding clearer pass/fail wording per line, or use CSV upload instead.");
    } finally {
      setAiLoading(false);
    }
  };

  const modules = useMemo(() => ["all", ...Array.from(new Set(rows.map((r) => r.module)))], [rows]);

  const filtered = useMemo(() => {
    let out = rows;
    if (statusFilter !== "all") out = out.filter((r) => r.status === statusFilter);
    if (moduleFilter !== "all") out = out.filter((r) => r.module === moduleFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter((r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }
    out = [...out].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av === bv) return 0;
      const dir = sortDir === "asc" ? 1 : -1;
      return av > bv ? dir : -dir;
    });
    return out;
  }, [rows, statusFilter, moduleFilter, search, sortKey, sortDir]);

  const stats = useMemo(() => {
    const total = rows.length;
    const byStatus = { pass: 0, fail: 0, blocked: 0, skip: 0 };
    rows.forEach((r) => { byStatus[r.status] = (byStatus[r.status] || 0) + 1; });
    const passRate = total ? Math.round((byStatus.pass / total) * 100) : 0;
    const avgDuration = total ? Math.round(rows.reduce((s, r) => s + (r.durationSec || 0), 0) / total) : 0;
    return { total, byStatus, passRate, avgDuration };
  }, [rows]);

  const pieData = useMemo(() => (
    Object.entries(stats.byStatus)
      .filter(([, v]) => v > 0)
      .map(([k, v]) => ({ name: STATUS_META[k].label, value: v, color: STATUS_META[k].color }))
  ), [stats]);

  const moduleData = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      if (!map[r.module]) map[r.module] = { module: r.module, pass: 0, fail: 0, blocked: 0, skip: 0 };
      map[r.module][r.status] += 1;
    });
    return Object.values(map);
  }, [rows]);

  const trendData = useMemo(() => {
    const withDates = rows.filter((r) => r.executionDate);
    if (!withDates.length) return [];
    const map = {};
    withDates.forEach((r) => {
      if (!map[r.executionDate]) map[r.executionDate] = { date: r.executionDate, pass: 0, total: 0 };
      map[r.executionDate].total += 1;
      if (r.status === "pass") map[r.executionDate].pass += 1;
    });
    return Object.values(map)
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .map((d) => ({ date: d.date, passRate: Math.round((d.pass / d.total) * 100) }));
  }, [rows]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  return (
    <div className="min-h-screen w-full" style={{ background: THEME.ink, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{FONT_IMPORT}</style>

      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ borderBottom: `1px solid ${THEME.hairline}` }}>
        <div className="flex items-center justify-between flex-wrap gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: THEME.accent }}>
              <LayoutGrid size={18} color={THEME.ink} />
            </div>
            <input
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="text-2xl font-semibold bg-transparent outline-none"
              style={{ color: THEME.paper, fontFamily: "'Space Grotesk', sans-serif", minWidth: 260 }}
            />
          </div>
          {rows.length > 0 && (
            <button
              onClick={() => setRows([])}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md"
              style={{ color: THEME.muted, border: `1px solid ${THEME.hairline}` }}
            >
              <RotateCcw size={13} /> New report
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {rows.length === 0 ? (
          /* ---------------- EMPTY / INPUT STATE ---------------- */
          <div className="max-w-2xl mx-auto mt-8">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setInputMode("upload")}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-md"
                style={{
                  background: inputMode === "upload" ? THEME.panelAlt : "transparent",
                  color: inputMode === "upload" ? THEME.paper : THEME.muted,
                  border: `1px solid ${THEME.hairline}`,
                }}
              >
                <Upload size={14} /> Upload CSV
              </button>
              <button
                onClick={() => setInputMode("paste")}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-md"
                style={{
                  background: inputMode === "paste" ? THEME.panelAlt : "transparent",
                  color: inputMode === "paste" ? THEME.paper : THEME.muted,
                  border: `1px solid ${THEME.hairline}`,
                }}
              >
                <Sparkles size={14} /> Paste notes (AI structures it)
              </button>
            </div>

            <div className="rounded-lg p-6" style={{ background: THEME.panel, border: `1px solid ${THEME.hairline}` }}>
              {inputMode === "upload" ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleCsvFile(file);
                  }}
                  className="rounded-md flex flex-col items-center justify-center gap-2 py-12 cursor-pointer"
                  style={{ border: `1px dashed ${THEME.hairline}` }}
                >
                  <FileText size={22} color={THEME.muted} />
                  <span className="text-sm" style={{ color: THEME.paper }}>Drop a CSV, or click to browse</span>
                  <span className="text-xs" style={{ color: THEME.muted }}>
                    Columns: id, name, module, status, priority, executedBy, executionDate, duration
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleCsvFile(e.target.files[0])}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <textarea
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value)}
                    placeholder={`Paste rough notes, e.g.:\nTC-1: Login with valid creds - passed\nDeposit over $1000 didn't trigger AML check - FAILED, high priority\nSearch empty state - blocked, waiting on API`}
                    className="w-full h-40 rounded-md p-3 text-sm outline-none resize-none"
                    style={{
                      background: THEME.ink, color: THEME.paper, border: `1px solid ${THEME.hairline}`,
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  />
                  {aiError && <span className="text-xs" style={{ color: THEME.fail }}>{aiError}</span>}
                  <button
                    onClick={handleStructureWithAI}
                    disabled={aiLoading || !pasteText.trim()}
                    className="flex items-center justify-center gap-2 text-sm py-2 rounded-md self-start px-4"
                    style={{ background: THEME.accent, color: THEME.ink, opacity: aiLoading || !pasteText.trim() ? 0.6 : 1 }}
                  >
                    {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    {aiLoading ? "Structuring…" : "Structure into test data"}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center mt-6">
              <button
                onClick={() => setRows(makeSampleData())}
                className="text-xs underline"
                style={{ color: THEME.muted }}
              >
                No data handy? Load a sample report instead
              </button>
            </div>
          </div>
        ) : (
          /* ---------------- DASHBOARD STATE ---------------- */
          <div className="flex flex-col gap-5">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <KpiCard label="Total Tests" value={stats.total} />
              <KpiCard label="Pass Rate" value={`${stats.passRate}%`} accentColor={THEME.pass} />
              <KpiCard label="Failed" value={stats.byStatus.fail} accentColor={THEME.fail} />
              <KpiCard label="Blocked" value={stats.byStatus.blocked} accentColor={THEME.blocked} />
              <KpiCard label="Avg Duration" value={`${stats.avgDuration}s`} sub="per test case" />
            </div>

            {/* Signature status strip */}
            <StatusStrip rows={rows} hovered={hoveredTick} setHovered={setHoveredTick} />

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4" style={{ background: THEME.panel, border: `1px solid ${THEME.hairline}` }}>
                <span className="text-xs tracking-wide uppercase" style={{ color: THEME.muted }}>Outcome breakdown</span>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                      {pieData.map((d, i) => <Cell key={i} fill={d.color} stroke={THEME.panel} strokeWidth={2} />)}
                    </Pie>
                    <RTooltip contentStyle={{ background: THEME.panelAlt, border: `1px solid ${THEME.hairline}`, borderRadius: 8, color: THEME.paper }} />
                    <Legend wrapperStyle={{ fontSize: 12, color: THEME.muted }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-lg p-4" style={{ background: THEME.panel, border: `1px solid ${THEME.hairline}` }}>
                <span className="text-xs tracking-wide uppercase" style={{ color: THEME.muted }}>Results by module</span>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={moduleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke={THEME.hairline} vertical={false} />
                    <XAxis dataKey="module" tick={{ fill: THEME.muted, fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={50} />
                    <YAxis tick={{ fill: THEME.muted, fontSize: 11 }} allowDecimals={false} />
                    <RTooltip contentStyle={{ background: THEME.panelAlt, border: `1px solid ${THEME.hairline}`, borderRadius: 8, color: THEME.paper }} />
                    <Bar dataKey="pass" stackId="a" fill={THEME.pass} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="fail" stackId="a" fill={THEME.fail} />
                    <Bar dataKey="blocked" stackId="a" fill={THEME.blocked} />
                    <Bar dataKey="skip" stackId="a" fill={THEME.skip} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {trendData.length > 1 && (
              <div className="rounded-lg p-4" style={{ background: THEME.panel, border: `1px solid ${THEME.hairline}` }}>
                <span className="text-xs tracking-wide uppercase" style={{ color: THEME.muted }}>Pass rate trend</span>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke={THEME.hairline} vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: THEME.muted, fontSize: 10 }} />
                    <YAxis tick={{ fill: THEME.muted, fontSize: 11 }} domain={[0, 100]} />
                    <RTooltip contentStyle={{ background: THEME.panelAlt, border: `1px solid ${THEME.hairline}`, borderRadius: 8, color: THEME.paper }} />
                    <Line type="monotone" dataKey="passRate" stroke={THEME.accent} strokeWidth={2} dot={{ r: 3, fill: THEME.accent }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md flex-1 min-w-[200px]" style={{ background: THEME.panel, border: `1px solid ${THEME.hairline}` }}>
                <Search size={14} color={THEME.muted} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search test name or ID…"
                  className="bg-transparent outline-none text-sm flex-1"
                  style={{ color: THEME.paper }}
                />
                {search && <X size={14} color={THEME.muted} className="cursor-pointer" onClick={() => setSearch("")} />}
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm px-3 py-1.5 rounded-md outline-none"
                style={{ background: THEME.panel, color: THEME.paper, border: `1px solid ${THEME.hairline}` }}
              >
                <option value="all">All statuses</option>
                {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="text-sm px-3 py-1.5 rounded-md outline-none"
                style={{ background: THEME.panel, color: THEME.paper, border: `1px solid ${THEME.hairline}` }}
              >
                {modules.map((m) => <option key={m} value={m}>{m === "all" ? "All modules" : m}</option>)}
              </select>
            </div>

            {/* Table */}
            <div className="rounded-lg overflow-hidden" style={{ background: THEME.panel, border: `1px solid ${THEME.hairline}` }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${THEME.hairline}` }}>
                    {[
                      ["id", "ID"], ["name", "Test Case"], ["module", "Module"],
                      ["status", "Status"], ["priority", "Priority"], ["executedBy", "Executed By"],
                      ["executionDate", "Date"], ["durationSec", "Duration"],
                    ].map(([key, label]) => (
                      <th
                        key={key}
                        onClick={() => toggleSort(key)}
                        className="text-left px-4 py-2.5 cursor-pointer select-none whitespace-nowrap"
                        style={{ color: THEME.muted, fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase" }}
                      >
                        <span className="flex items-center gap-1">
                          {label}
                          {sortKey === key && (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => {
                    const meta = STATUS_META[r.status];
                    return (
                      <tr key={r.id} style={{ borderBottom: `1px solid ${THEME.hairline}` }}>
                        <td className="px-4 py-2.5" style={{ color: THEME.muted, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>{r.id}</td>
                        <td className="px-4 py-2.5" style={{ color: THEME.paper }}>{r.name}</td>
                        <td className="px-4 py-2.5" style={{ color: THEME.muted }}>{r.module}</td>
                        <td className="px-4 py-2.5">
                          <span className="flex items-center gap-1.5" style={{ color: meta.color }}>
                            <meta.Icon size={13} /> {meta.label}
                          </span>
                        </td>
                        <td className="px-4 py-2.5" style={{ color: THEME.muted }}>{r.priority}</td>
                        <td className="px-4 py-2.5" style={{ color: THEME.muted }}>{r.executedBy}</td>
                        <td className="px-4 py-2.5" style={{ color: THEME.muted, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>{r.executionDate || "—"}</td>
                        <td className="px-4 py-2.5" style={{ color: THEME.muted, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>{r.durationSec ? `${r.durationSec}s` : "—"}</td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr><td colSpan={8} className="px-4 py-8 text-center" style={{ color: THEME.muted }}>No test cases match these filters.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
