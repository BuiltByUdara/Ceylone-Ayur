import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import {
  Sparkles,
  Droplet,
  Leaf,
  Sun,
  Compass,
  ShieldCheck,
  ArrowDown,
  RefreshCw,
  Eye,
  Layers,
  Sparkle,
} from "lucide-react";
import SplineErrorBoundary from "./SplineErrorBoundary";

// Lazy load Spline to prevent blocking initial layout render
const Spline = lazy(() => import("@splinetool/react-spline"));

// Verified Spline public scene URL (with fallback protection)
const SPLINE_SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export default function Hero3D({
  onSelectCategory,
  activeCategory,
  onOpenDoshaQuiz,
  onOpenHerbalGuide,
}) {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [useCanvas3D, setUseCanvas3D] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Mouse Parallax Effect on Hero Glass Elements
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10px to +10px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  // 3D Object Click Handler from Spline Scene
  const handleSplineMouseDown = (e) => {
    if (!e || !e.target) return;
    const name = e.target.name?.toLowerCase() || "";

    if (
      name.includes("leaf") ||
      name.includes("plant") ||
      name.includes("green")
    ) {
      onSelectCategory("Herbal Detox");
    } else if (
      name.includes("water") ||
      name.includes("drop") ||
      name.includes("sphere") ||
      name.includes("fluid")
    ) {
      onSelectCategory("Panchakarma");
    } else if (
      name.includes("sun") ||
      name.includes("gold") ||
      name.includes("ring")
    ) {
      onSelectCategory("Stress Relief");
    } else if (name.includes("lotus") || name.includes("flower")) {
      onSelectCategory("Yoga & Meditation");
    }
  };

  const scrollToDirectory = () => {
    const el = document.getElementById("retreats-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[94vh] flex items-center justify-center overflow-hidden pt-20 pb-12 transition-colors duration-500"
    >
      {/* Background Ambience & Gradient Mesh */}
      <div className="absolute inset-0 bg-radial-glow opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-ayur-emerald/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-ayur-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* 3D Scene Layer with React ErrorBoundary Fallback */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* {!useCanvas3D ? (
          <SplineErrorBoundary
            fallback={
              <Interactive3DBotanicalCanvas 
                onSelectCategory={onSelectCategory} 
                activeCategory={activeCategory} 
              />
            }
          >
            <Suspense fallback={<SplineLoadingFallback />}>
              <Spline 
                scene={SPLINE_SCENE_URL}
                onLoad={() => setSplineLoaded(true)}
                onMouseDown={handleSplineMouseDown}
                onError={() => setUseCanvas3D(true)}
                className="w-full h-full scale-105 opacity-80"
              />
            </Suspense>
          </SplineErrorBoundary>
        ) : (
          <Interactive3DBotanicalCanvas 
            onSelectCategory={onSelectCategory} 
            activeCategory={activeCategory} 
          />
        )} */}
      </div>

      {/* Hero Content Overlay (Glassmorphism UI) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Typography Card */}
          <div
            className="lg:col-span-7 space-y-6 pointer-events-auto"
            style={{
              transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-ayur-gold/40 text-ayur-gold font-medium text-xs sm:text-sm tracking-wider uppercase shadow-gold-glow animate-pulse-subtle">
              <Sparkles className="w-3.5 h-3.5 text-ayur-goldbright" />
              <span>Authentic Sri Lankan Vedic Healing</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ayur-dark dark:text-ayur-sand leading-[1.15]">
              Harmonize Body, Mind & Soul in{" "}
              <span className="text-gold-gradient italic">Ceylon</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
              Experience transformative <strong>Panchakarma</strong>, sacred{" "}
              <strong>Hela Wedakama</strong> botanicals, and bespoke sanctuary
              living guided by certified Sri Lankan Ayurvedic physicians.
            </p>

            {/* Interactive 3D Category Filter Triggers */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-ayur-forest/70 dark:text-ayur-gold/80 mb-3 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-ayur-gold" />
                Select Healing Intention:
              </p>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => onSelectCategory("Herbal Detox")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                    activeCategory === "Herbal Detox"
                      ? "bg-ayur-emerald text-white border-ayur-emerald shadow-emerald-glow scale-105"
                      : "glass-panel text-slate-800 dark:text-ayur-sand border-ayur-moss/30 hover:border-ayur-gold hover:bg-ayur-emerald/10"
                  }`}
                >
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>3D Leaf (Herbal Detox)</span>
                </button>

                <button
                  onClick={() => onSelectCategory("Panchakarma")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                    activeCategory === "Panchakarma"
                      ? "bg-ayur-emerald text-white border-ayur-emerald shadow-emerald-glow scale-105"
                      : "glass-panel text-slate-800 dark:text-ayur-sand border-ayur-moss/30 hover:border-ayur-gold hover:bg-ayur-emerald/10"
                  }`}
                >
                  <Droplet className="w-4 h-4 text-cyan-400" />
                  <span>3D Water (Panchakarma)</span>
                </button>

                <button
                  onClick={() => onSelectCategory("Stress Relief")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                    activeCategory === "Stress Relief"
                      ? "bg-ayur-emerald text-white border-ayur-emerald shadow-emerald-glow scale-105"
                      : "glass-panel text-slate-800 dark:text-ayur-sand border-ayur-moss/30 hover:border-ayur-gold hover:bg-ayur-emerald/10"
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>3D Sun (Stress Relief)</span>
                </button>

                <button
                  onClick={() => onSelectCategory("All")}
                  className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 border ${
                    activeCategory === "All"
                      ? "bg-ayur-gold text-ayur-dark font-semibold border-ayur-gold shadow-gold-glow"
                      : "glass-panel text-slate-700 dark:text-slate-300 border-ayur-gold/20 hover:border-ayur-gold/60"
                  }`}
                >
                  <span>View All</span>
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToDirectory}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-ayur-gold to-ayur-goldbright text-ayur-dark font-bold text-sm tracking-wide shadow-gold-glow hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
              >
                <span>Explore 2026 Sanctuaries</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDoshaQuiz}
                className="px-6 py-3.5 rounded-xl glass-panel text-ayur-dark dark:text-ayur-sand font-semibold text-sm border border-ayur-gold/30 hover:border-ayur-gold hover:bg-ayur-gold/10 transition-all duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-ayur-gold" />
                <span>Prakriti Dosha Test (2 Min)</span>
              </button>
            </div>
          </div>

          {/* Right Floating Glassmorphic 3D Feature Cards */}
          <div
            className="lg:col-span-5 space-y-4 pointer-events-auto"
            style={{
              transform: `translate3d(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px, 0)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* Card 1: 3D Interactive Spatial Canvas Controller */}
            <div className="glass-card p-5 rounded-2xl shadow-glass border-l-4 border-l-ayur-gold backdrop-blur-xl">
              <div className="flex items-start justify-between gap-3.5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-ayur-gold/20 flex items-center justify-center text-ayur-gold flex-shrink-0">
                    <Eye className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-ayur-dark dark:text-ayur-goldlight">
                      Interactive 3D Spatial Canvas
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      Move your cursor or click the floating 3D botanical
                      elements in the background to dynamically filter retreats.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3D Mode Toggle Switcher */}
              <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-ayur-moss/30 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-ayur-gold" />
                  Renderer:{" "}
                  <strong className="text-ayur-dark dark:text-ayur-sand">
                    {useCanvas3D ? "3D Botanical Canvas" : "Spline 3D Engine"}
                  </strong>
                </span>
                <button
                  onClick={() => setUseCanvas3D(!useCanvas3D)}
                  className="px-2.5 py-1 rounded-lg glass-panel hover:bg-ayur-gold/20 text-ayur-gold font-semibold transition-colors"
                >
                  Switch Mode
                </button>
              </div>
            </div>

            {/* Card 2: SLTDA Accreditation Badge */}
            <div className="glass-card p-5 rounded-2xl shadow-glass border-l-4 border-l-ayur-emerald backdrop-blur-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-ayur-emerald/20 flex items-center justify-center text-ayur-leaf flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-sm sm:text-base font-bold text-ayur-dark dark:text-ayur-sand">
                      100% SLTDA Certified
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-ayur-emerald/30 text-emerald-300 px-2 py-0.5 rounded-full">
                      Official
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    All partner retreats are licensed by the Sri Lanka Tourism
                    Development Authority and registered with the Department of
                    Ayurveda.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Indigenous Botanical Link */}
            <div
              onClick={onOpenHerbalGuide}
              className="glass-card p-4 rounded-2xl shadow-glass cursor-pointer hover:border-ayur-gold/80 hover:bg-ayur-gold/5 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    🌿
                  </span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-ayur-dark dark:text-ayur-sand group-hover:text-ayur-gold transition-colors">
                      Sri Lankan Herbal Pharmacopoeia
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Gotu Kola, Kothala Himbutu, Venivel & 400+ plants
                    </p>
                  </div>
                </div>
                <span className="text-xs text-ayur-gold font-medium group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <button
        onClick={scrollToDirectory}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-400 hover:text-ayur-gold transition-colors pointer-events-auto"
        aria-label="Scroll to Directory"
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold">
          Scroll Down
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}

// Fallback skeleton while Spline loads
function SplineLoadingFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-ayur-gold/60">
      <RefreshCw className="w-8 h-8 animate-spin text-ayur-gold" />
      <span className="text-xs tracking-wider uppercase font-medium">
        Initializing 3D Spatial Canvas...
      </span>
    </div>
  );
}

// Interactive 3D Botanical Canvas with clickable 3D elements, physics, and particle simulation
function Interactive3DBotanicalCanvas({ onSelectCategory, activeCategory }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let mouse = { x: canvas.width / 2, y: canvas.height / 2, isHover: false };

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Interactive Floating 3D Orbs/Elements
    const nodes = [
      {
        id: "Herbal Detox",
        label: "🌿 Leaf",
        icon: "🌿",
        x: 0.72,
        y: 0.32,
        radius: 46,
        rot: 0,
        rotSpeed: 0.008,
        color: "#10B981",
        glow: "rgba(16, 185, 129, 0.4)",
      },
      {
        id: "Panchakarma",
        label: "💧 Water",
        icon: "💧",
        x: 0.85,
        y: 0.58,
        radius: 44,
        rot: 0,
        rotSpeed: -0.006,
        color: "#06B6D4",
        glow: "rgba(6, 182, 212, 0.4)",
      },
      {
        id: "Stress Relief",
        label: "☀️ Sun",
        icon: "☀️",
        x: 0.65,
        y: 0.76,
        radius: 42,
        rot: 0,
        rotSpeed: 0.005,
        color: "#F59E0B",
        glow: "rgba(245, 158, 11, 0.4)",
      },
      {
        id: "Yoga & Meditation",
        label: "🪷 Lotus",
        icon: "🪷",
        x: 0.82,
        y: 0.22,
        radius: 38,
        rot: 0,
        rotSpeed: 0.007,
        color: "#EC4899",
        glow: "rgba(236, 72, 153, 0.4)",
      },
    ];

    // Ambient floating particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * (canvas.width || 1000),
      y: Math.random() * (canvas.height || 800),
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color:
        Math.random() > 0.5
          ? "rgba(197, 168, 102, 0.4)"
          : "rgba(35, 115, 91, 0.45)",
      pulse: Math.random() * Math.PI,
    }));

    let time = 0;

    const render = () => {
      if (!ctx || !canvas) return;
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw glowing ambient radial background
      const grad = ctx.createRadialGradient(
        canvas.width * 0.75,
        canvas.height * 0.45,
        20,
        canvas.width * 0.75,
        canvas.height * 0.45,
        canvas.width * 0.55,
      );
      grad.addColorStop(0, "rgba(197, 168, 102, 0.12)");
      grad.addColorStop(0.5, "rgba(18, 58, 47, 0.08)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw 3D Celestial Rings
      const centerX = canvas.width * 0.76;
      const centerY = canvas.height * 0.48;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Outer Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, 190, 85, time * 0.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(197, 168, 102, 0.18)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      ctx.stroke();

      // Inner Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, 130, 60, -time * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(35, 115, 91, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.restore();

      // 3. Draw ambient particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const currentRadius = p.radius + Math.sin(p.pulse) * 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // 4. Draw Interactive 3D Botanical Nodes
      nodes.forEach((node, idx) => {
        const floatOffset = Math.sin(time * 1.5 + idx) * 12;
        const actualX = canvas.width * node.x;
        const actualY = canvas.height * node.y + floatOffset;
        node._actualX = actualX;
        node._actualY = actualY;

        const isSelected = activeCategory === node.id;

        // Glow
        ctx.beginPath();
        ctx.arc(
          actualX,
          actualY,
          node.radius + (isSelected ? 16 : 8),
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = isSelected ? node.glow : "rgba(197, 168, 102, 0.1)";
        ctx.fill();

        // Node Circle Body
        ctx.beginPath();
        ctx.arc(actualX, actualY, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? "rgba(12, 45, 36, 0.95)"
          : "rgba(12, 45, 36, 0.75)";
        ctx.strokeStyle = isSelected ? "#C5A866" : "rgba(197, 168, 102, 0.35)";
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.stroke();
        ctx.fill();

        // Icon
        ctx.font = "24px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.icon, actualX, actualY - 4);

        // Label
        ctx.font = isSelected ? "bold 11px sans-serif" : "10px sans-serif";
        ctx.fillStyle = isSelected ? "#DFB143" : "#E2CB8F";
        ctx.fillText(node.id, actualX, actualY + 24);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Click handler for 3D canvas nodes
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      nodes.forEach((node) => {
        if (node._actualX && node._actualY) {
          const dist = Math.hypot(
            clickX - node._actualX,
            clickY - node._actualY,
          );
          if (dist <= node.radius + 15) {
            onSelectCategory(node.id);
          }
        }
      });
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      if (canvas) canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCategory, onSelectCategory]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        title="Click floating 3D botanical elements to filter sanctuaries"
      />
    </div>
  );
}
