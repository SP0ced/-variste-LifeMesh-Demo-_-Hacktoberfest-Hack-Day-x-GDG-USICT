import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLifeMeshStore } from '../../store/useLifeMeshStore';
import {
  Sparkles, Eye, FileText, CheckCircle2, AlertTriangle, ShieldCheck,
  Languages, Loader2, ArrowRight, HeartPulse, Activity, Heart, Wind,
  Camera, UploadCloud, RefreshCw
} from 'lucide-react';

const SAMPLE_IMAGES = {
  kidney: {
    name: 'Kidney Graft (Cold Preservation)',
    desc: 'Donor nephrectomy specimen flushed with UW solution at 4°C',
    url: '/kidney_graft.jpg',
    notes: 'Donor: 34M, traumatic brain injury. Cross-clamp time: 14:22 UTC. Perfusion: 1000ml University of Wisconsin cold storage. Arterial cuff: single intact lumen. Serology: HIV/HBsAg/HCV Non-Reactive.',
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  },
  liver: {
    name: 'Liver Graft (Biliary Flushed)',
    desc: 'Whole liver allograft with gallbladder excised and HTK flush',
    url: null,
    notes: 'Donor: 41F. Warm ischemia time: 18 min. Preservation solution: HTK 2000ml. Parenchymal color: uniform brown-red, macrosteatosis estimated < 10%. Biliary tree flushed clear.',
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  },
  heart: {
    name: 'Donor Heart (Cardioplegia)',
    desc: 'Cardiac allograft arrested with cold Celsior cardioplegic solution',
    url: null,
    notes: 'Donor: 22M. Aortic cross-clamp: 15:45 UTC. Left ventricular tone: pristine. LAD coronary artery inspected: zero atheromatous plaque. Viability window ceiling: 4 hours strictly.',
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  },
  lung: {
    name: 'Bilateral Lung Allograft',
    desc: 'En bloc lungs preserved with Perfadex dextran solution',
    url: null,
    notes: 'Donor: 29M. PaO2/FiO2 ratio: 480 mmHg. Zero pulmonary contusion. Bronchial margins clean without purulent secretions. Perfadex flush completed retrograde and antegrade.',
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  }
};

const ORGANS = [
  { id: 'kidney', label: 'Kidney', icon: <HeartPulse size={18} color="#f59e0b" />, color: '#f59e0b' },
  { id: 'liver', label: 'Liver', icon: <Activity size={18} color="#ef4444" />, color: '#ef4444' },
  { id: 'heart', label: 'Heart', icon: <Heart size={18} color="#ec4899" />, color: '#ec4899' },
  { id: 'lung', label: 'Lung', icon: <Wind size={18} color="#3b82f6" />, color: '#3b82f6' },
];

export default function GemmaTriage() {
  const { runGemmaTriage, gemmaResult, isTriageLoading } = useLifeMeshStore();
  const [selectedOrgan, setSelectedOrgan] = useState('kidney');
  const [language, setLanguage] = useState('English');
  const [customNotes, setCustomNotes] = useState(SAMPLE_IMAGES.kidney.notes);
  const [imagePreview, setImagePreview] = useState(SAMPLE_IMAGES.kidney.url);

  const handleSelectOrgan = (organId) => {
    setSelectedOrgan(organId);
    setCustomNotes(SAMPLE_IMAGES[organId].notes);
    setImagePreview(SAMPLE_IMAGES[organId].url || null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunTriage = async () => {
    const imgBase64 = imagePreview
      ? imagePreview.split(',')[1]
      : SAMPLE_IMAGES[selectedOrgan].base64;

    await runGemmaTriage(selectedOrgan, imgBase64, customNotes, language);
  };

  return (
    <div className="page" style={{ padding: '28px 32px' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '0.72rem', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
              Google DeepMind Track A
            </span>
            <span style={{ fontSize: '0.62rem', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>
              Gemma 4 Multimodal
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={26} color="#818cf8" /> Clinical Graft &amp; Notes Triage
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Instant multimodal perception: inspect donor tissue perfusion, OCR handwritten preservation records, and evaluate viability in &lt;2 seconds.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Languages size={16} color="var(--text-muted)" />
          <select value={language} onChange={e => setLanguage(e.target.value)}
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: 8, fontSize: '0.8rem', outline: 'none' }}>
            <option value="English">English</option>
            <option value="Hindi">हिंदी (Hindi)</option>
            <option value="Bengali">বাংলা (Bengali)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
          </select>
        </div>
      </motion.div>

      {/* Main Grid: Inputs Left, AI Diagnostics Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 24, alignItems: 'start' }}>
        
        {/* Left Column: Input Form & Upload */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          
          {/* Organ Selector Tabs */}
          <div className="glass" style={{ padding: 18 }}>
            <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: 10 }}>
              1. Select Harvested Organ Profile
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {ORGANS.map(o => (
                <button
                  key={o.id}
                  onClick={() => handleSelectOrgan(o.id)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    padding: '10px 4px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                    background: selectedOrgan === o.id ? `${o.color}18` : 'var(--bg-elevated)',
                    border: `1px solid ${selectedOrgan === o.id ? o.color : 'var(--border)'}`,
                    color: selectedOrgan === o.id ? o.color : 'var(--text-secondary)'
                  }}
                >
                  {o.icon}
                  <span style={{ fontSize: '0.75rem', fontWeight: selectedOrgan === o.id ? 700 : 500 }}>{o.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Multimodal Photo Input */}
          <div className="glass" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700 }}>
                2. Donor Graft Photograph / Histology
              </label>
              <span style={{ fontSize: '0.65rem', color: '#818cf8', fontWeight: 600 }}>Vision Engine Active</span>
            </div>

            <div style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: 12, textAlign: 'center', background: 'rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
              {imagePreview ? (
                <div style={{ position: 'relative' }}>
                  <img src={imagePreview} alt="Graft Preview" style={{ width: '100%', maxHeight: 180, borderRadius: 8, margin: '0 auto', display: 'block', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 10 }}>
                    <label className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', cursor: 'pointer', padding: '4px 10px' }}>
                      <UploadCloud size={13} style={{ marginRight: 4 }} /> Replace Photo
                      <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                    <button onClick={() => setImagePreview(null)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '4px 10px', color: '#f87171' }}>
                      ✕ Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 0' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Camera size={22} color="#818cf8" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{SAMPLE_IMAGES[selectedOrgan].name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{SAMPLE_IMAGES[selectedOrgan].desc}</div>
                  </div>
                  <label className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem', cursor: 'pointer', marginTop: 4 }}>
                    <UploadCloud size={14} style={{ marginRight: 4 }} /> Upload Custom Photo
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Clinical Preservation Record (OCR Input) */}
          <div className="glass" style={{ padding: 18 }}>
            <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: 8 }}>
              3. Operative Preservation Notes &amp; Serology
            </label>
            <textarea
              rows={4}
              value={customNotes}
              onChange={e => setCustomNotes(e.target.value)}
              placeholder="Enter cross-clamp time, preservation flush, donor vitals..."
              style={{
                width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: 8, color: 'var(--text-primary)', fontSize: '0.78rem', padding: 10,
                fontFamily: 'var(--font-mono)', lineHeight: 1.5, resize: 'vertical', outline: 'none'
              }}
            />
          </div>

          {/* Trigger Button */}
          <button
            onClick={handleRunTriage}
            disabled={isTriageLoading}
            className="btn btn-primary"
            style={{
              padding: '14px 20px', fontSize: '0.95rem', fontWeight: 800,
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 4px 20px rgba(99,102,241,0.3)', cursor: isTriageLoading ? 'wait' : 'pointer'
            }}
          >
            {isTriageLoading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Gemma 4 Multimodal Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Execute Gemma 4 Clinical Triage</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Gemma 4 Diagnostics Card */}
        <div>
          <AnimatePresence mode="wait">
            {!gemmaResult && !isTriageLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass"
                style={{ padding: 48, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 460 }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Eye size={32} color="#818cf8" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 8 }}>Gemma 4 Multimodal Standby</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 420, lineHeight: 1.6 }}>
                  Click <strong>"Execute Gemma 4 Clinical Triage"</strong> to trigger multimodal vision analysis of the graft image, parse cross-clamp timings, and evaluate organ viability in real time.
                </p>
                <div style={{ marginTop: 20, display: 'inline-flex', gap: 8, fontSize: '0.72rem', color: '#a5b4fc', background: 'rgba(99,102,241,0.1)', padding: '6px 14px', borderRadius: 100 }}>
                  <ShieldCheck size={14} /> Open-Weights Edge Engine · Zero Patient PII Leak
                </div>
              </motion.div>
            )}

            {isTriageLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass"
                style={{ padding: 48, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 460 }}
              >
                <Loader2 size={40} color="#818cf8" style={{ animation: 'spin 1s linear infinite', marginBottom: 18 }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 6 }}>Evaluating Graft Perfusion &amp; Operative Logs...</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#818cf8', marginTop: 8 }}>
                  [gemma-4-it] processing image tensor · extracting ischemic timestamps · translating vernacular dispatch
                </div>
              </motion.div>
            )}

            {gemmaResult && !isTriageLoading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="glass"
                style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                {/* Result Header Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--success)', fontWeight: 800 }}>
                        ● Analysis Complete
                      </span>
                      <span style={{ fontSize: '0.62rem', background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>
                        {gemmaResult.model}
                      </span>
                    </div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginTop: 4 }}>
                      {gemmaResult.organ_type} Graft Viability Assessment
                    </h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--success)', lineHeight: 1 }}>
                      {Math.round(gemmaResult.viability_score * 100)}%
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Inference: {gemmaResult.inference_time_ms} ms
                    </div>
                  </div>
                </div>

                {/* Score Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: 6 }}>
                    <span>Viability Threshold Rating</span>
                    <span style={{ color: 'var(--success)' }}>Optimal Candidate (Passing Score &gt; 75%)</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--bg-elevated)', borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${gemmaResult.viability_score * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)', borderRadius: 4 }}
                    />
                  </div>
                </div>

                {/* Core Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="glass" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 4 }}>
                      Tissue Perfusion Analysis
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {gemmaResult.tissue_perfusion}
                    </div>
                  </div>
                  <div className="glass" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 4 }}>
                      Ischemic Necrosis Risk
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>
                      {gemmaResult.ischemic_risk}
                    </div>
                  </div>
                </div>

                {/* Extracted Operative Vitals (OCR) */}
                <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#818cf8', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileText size={14} /> Gemma 4 Extracted Operative Parameters
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 16px', fontSize: '0.78rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Cold Ischemia Time: </span>
                      <strong style={{ color: 'var(--text-primary)' }}>{gemmaResult.extracted_vitals.cold_ischemia_time}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Preservation Fluid: </span>
                      <strong style={{ color: 'var(--text-primary)' }}>{gemmaResult.extracted_vitals.preservation_solution}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Donor Hemodynamics: </span>
                      <strong style={{ color: 'var(--text-primary)' }}>{gemmaResult.extracted_vitals.donor_hemodynamics}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Serology Screen: </span>
                      <strong style={{ color: 'var(--success)' }}>{gemmaResult.extracted_vitals.donor_serology}</strong>
                    </div>
                  </div>
                </div>

                {/* Pathological Findings List */}
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 6 }}>
                    Gemma 4 Multimodal Clinical Observations
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {gemmaResult.clinical_findings.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={14} color="var(--success)" style={{ marginTop: 2, flexShrink: 0 }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vernacular Courier Audio Briefing */}
                <div style={{ borderLeft: '3px solid #818cf8', paddingLeft: 12, background: 'rgba(99,102,241,0.04)', padding: '10px 14px', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#818cf8', marginBottom: 2 }}>
                    Courier Dispatch Briefing ({language})
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{gemmaResult.vernacular_summary}"
                  </div>
                </div>

                {/* Action button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 4 }}>
                  <button onClick={handleRunTriage} className="btn btn-outline" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <RefreshCw size={13} /> Re-analyze
                  </button>
                  <button
                    onClick={() => alert(`Graft ${gemmaResult.organ_type} (Score: ${Math.round(gemmaResult.viability_score * 100)}%) verified by Gemma 4. Dispatched to Zero-Knowledge SMPC Network.`)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6, background: 'var(--accent)' }}
                  >
                    <span>Proceed to SMPC Matching</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
