
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties
} from "react";
import anime from "animejs";
import { AlertTriangle, ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import mvpImage from "../Images/MVP.png";
import clealjImage from "../Images/Team/Clealj.png";
import bettercaulSolImage from "../Images/Team/BettercaulSol.jpg";
import dorikImage from "../Images/Team/Dorik.jpg";
import ardraLogo from "../Images/Ardra Assets/ArdraLogo.png";
import apexLogo from "../Images/Support/Apex.png";
import asterLogo from "../Images/Support/Aster.png";
import avantisLogo from "../Images/Support/Avantis.png";
import backpackLogo from "../Images/Support/Backpack.png";
import hyperliquidLogo from "../Images/Support/Hyperliquid.png";
import lighterLogo from "../Images/Support/Lighter.png";
import outkastLogo from "../Images/Support/Outkast.png";
import pacificaLogo from "../Images/Support/Pacifica.png";
import paradexLogo from "../Images/Support/Paradex.png";
import standxLogo from "../Images/Support/StandX.png";

type SlideDefinition = {
  id: string;
  label: string;
};

type NeonTone = "emerald" | "crimson" | "cyan" | "violet";

const slides: SlideDefinition[] = [
  { id: "intro", label: "Welcome" },
  { id: "team", label: "Team" },
  { id: "platform", label: "What is Ardra?" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "market", label: "Market Size" },
  { id: "referral", label: "Referral Flywheel" },
  { id: "gtm", label: "Go-to-Market" },
  { id: "mvp", label: "MVP Results" },
  { id: "scaling", label: "Scalability" },
  { id: "scaling-chart", label: "Potential Impact" },
  { id: "thanks", label: "Thanks" }
];

const neonPalette: Record<
  NeonTone,
  { color: string; soft: string; base: string; shadow: string }
> = {
  emerald: {
    color: "rgba(16,185,129,0.82)",
    soft: "rgba(16,185,129,0.22)",
    base: "rgba(15,23,19,0.72)",
    shadow: "0 20px 48px -18px rgba(16,185,129,0.65)"
  },
  crimson: {
    color: "rgba(244,63,94,0.84)",
    soft: "rgba(244,63,94,0.24)",
    base: "rgba(27,9,15,0.78)",
    shadow: "0 20px 48px -18px rgba(244,63,94,0.72)"
  },
  cyan: {
    color: "rgba(34,211,238,0.88)",
    soft: "rgba(34,211,238,0.22)",
    base: "rgba(6,20,28,0.78)",
    shadow: "0 20px 48px -18px rgba(34,211,238,0.68)"
  },
  violet: {
    color: "rgba(168,85,247,0.82)",
    soft: "rgba(168,85,247,0.26)",
    base: "rgba(26,12,38,0.78)",
    shadow: "0 20px 48px -18px rgba(168,85,247,0.7)"
  }
};

interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone: NeonTone;
  dense?: boolean;
}

const NeonCard: React.FC<NeonCardProps> = ({ tone, dense, className, children, ...rest }) => {
  const palette = neonPalette[tone];

  return (
    <div
      className={cn(
        "neon-card group relative overflow-hidden rounded-[28px] border border-white/12",
        dense ? "p-5 sm:p-6" : "p-6 sm:p-8",
        className
      )}
      style={
        {
          "--neon-color": palette.color,
          "--neon-soft": palette.soft,
          "--neon-base": palette.base,
          "--neon-shadow": palette.shadow
        } as CSSProperties
      }
      {...rest}
    >
      <div className="relative z-10 space-y-4">{children}</div>
    </div>
  );
};
const featureCardRows = [
  {
    id: "automation",
    title: "Automation Engine",
    tone: "crimson" as NeonTone,
    description: "Bots execute 24/7 with guardrails to keep PnL stable while you farm points."
  },
  {
    id: "rebates",
    title: "Fee Rebates",
    tone: "emerald" as NeonTone,
    description: "Receive a portion of fees back across any Perp DEX connected through Ardra."
  },
  {
    id: "referrals",
    title: "Referral Hub",
    tone: "cyan" as NeonTone,
    description: "Share one Ardra link and capture up to 50% of fees on every partner DEX."
  },
  {
    id: "leaderboard",
    title: "Unified Leaderboard",
    tone: "violet" as NeonTone,
    description: "Track quests and volume points across venues in a single command center."
  }
];

const dexLogos = [
  { id: "apex", name: "Apex", src: apexLogo },
  { id: "aster", name: "Aster", src: asterLogo },
  { id: "avantis", name: "Avantis", src: avantisLogo },
  { id: "backpack", name: "Backpack", src: backpackLogo },
  { id: "hyperliquid", name: "Hyperliquid", src: hyperliquidLogo },
  { id: "lighter", name: "Lighter", src: lighterLogo },
  { id: "outkast", name: "Outkast", src: outkastLogo },
  { id: "pacifica", name: "Pacifica", src: pacificaLogo },
  { id: "paradex", name: "Paradex", src: paradexLogo },
  { id: "standx", name: "StandX", src: standxLogo }
];

const gtmPhases = [
  {
    title: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    timeline: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    tone: "emerald" as NeonTone,
    points: ["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
  },
  {
    title: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    timeline: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    tone: "crimson" as NeonTone,
    points: ["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
  },
  {
    title: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    timeline: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    tone: "cyan" as NeonTone,
    points: ["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
  }
];
const problemHighlights = [
  {
    title: "Stacked fee gravity",
    description:
      "Maker, taker, funding, and price impact pile onto every trade and inflate cost-per-point before rewards land.",
    metric: "Cost per point ?"
  },
  {
    title: "Negative PnL cliffs",
    description:
      "Manual execution misses beats. When volatility hits, drawdowns wipe out rebate gains and stall quests.",
    metric: "PnL drawdowns"
  },
  {
    title: "Fragmented attribution",
    description:
      "KOLs must pick a single DEX referral link even though their communities roam, so they lose credit when users migrate elsewhere.",
    metric: "Lost referrals"
  }
];

const solutionHighlights = [
  {
    title: "Rebate-driven cost relief",
    description:
      "Fee rebates flow back instantly, cutting effective cost-per-point while campaigns stay in motion.",
    metric: "CPP reduction"
  },
  {
    title: "Autopilot execution",
    description:
      "Entries, exits, and hedges synchronize automatically so time-poor traders avoid catastrophic PnL events.",
    metric: "PnL stability"
  },
  {
    title: "Universal referral layer",
    description:
      "One Ardra link tracks every connected Perp DEX. KOLs capture 20%-50% of fees without resharing links.",
    metric: "20%-50% fee share"
  }
];

const marketData = [
  {
    month: "August",
    volume: "$761B",
    fees: "$228M",
    opportunity: "$22.8M – $68.4M"
  },
  {
    month: "September",
    volume: "$739B",
    fees: "$221M",
    opportunity: "$22.1M – $66.3M"
  },
  {
    month: "October",
    volume: "$1.049T",
    fees: "$314.7M",
    opportunity: "$31.47M – $94.41M"
  }
];

const referralBands = [
  {
    month: "August",
    range: "$22.8M – $68.4M",
    min: 22.8,
    max: 68.4
  },
  {
    month: "September",
    range: "$22.1M – $66.3M",
    min: 22.1,
    max: 66.3
  },
  {
    month: "October",
    range: "$31.47M – $94.41M",
    min: 31.47,
    max: 94.41
  }
];

const mvpMetrics = [
  { label: "Active users", value: "36 traders" },
  { label: "Volume processed", value: "$28.28M" },
  { label: "Referral revenue", value: "$835" },
  { label: "Avg. volume / user", value: "$785,555" },
  { label: "Avg. reward / user", value: "$23.19" },
  { label: "Sample period", value: "14 days" },
  { label: "Daily reward / user", value: "$1.65" }
];

const teamMembers = [
  {
    name: "Clealj",
    role: "Founder & Lead Engineer",
    image: clealjImage,
    highlights: [
      "Production Engineering graduate and supply-chain specialist.",
      "Six years of experience in the crypto market.",
      "Web3 automation developer for the past three years."
    ]
  },
  {
    name: "BettercallSol",
    role: "Advisor",
    image: bettercaulSolImage,
    highlights: [
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    ]
  },
  {
    name: "Dorik",
    role: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    image: dorikImage,
    highlights: [
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    ]
  }
];
const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const slideRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = useMemo(() => slides[currentIndex], [currentIndex]);
  const progress = ((currentIndex + 1) / slides.length) * 100;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleJump = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const slideEl = slideRef.current;
    const containerEl = containerRef.current;
    if (!slideEl || !containerEl) return;

    anime.remove(slideEl);
    anime.remove(containerEl);

    anime({
      targets: containerEl,
      translateX: [direction === 1 ? "24px" : "-24px", "0px"],
      opacity: [0.85, 1],
      easing: "easeOutQuad",
      duration: 460
    });

    anime({
      targets: slideEl,
      translateX: [direction === 1 ? "38px" : "-38px", "0px"],
      opacity: [0, 1],
      easing: "easeOutCubic",
      duration: 540
    });

    const animatedChildren = slideEl.querySelectorAll<HTMLElement>("[data-animate]");

    anime({
      targets: animatedChildren,
      opacity: [0, 1],
      translateY: [24, 0],
      easing: "easeOutQuad",
      duration: 520,
      delay: anime.stagger(80)
    });
  }, [currentIndex, direction]);

  const renderSlideContent = () => {
    switch (currentSlide.id) {
      case "intro":
        return (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-8 text-center" data-animate>
              <img
                src={ardraLogo}
                alt="Ardra logo"
                className="max-h-56 w-auto drop-shadow-[0_0_60px_rgba(34,211,238,0.6)]"
              />
              <h1 className="text-4xl font-[400] tracking-tight text-white sm:text-5xl" style={{ fontFamily: "Orbitron, sans-serif" }}>
                Farm Automation Hub
              </h1>
            </div>
          </div>
        );
      case "platform":
        return (
          <div className="flex flex-1 flex-col gap-8">
            <div className="space-y-4 text-center sm:text-left" data-animate>
              <Badge variant="glow">What is Ardra?</Badge>
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                All-in-one trading automation, rebates, and referrals for every Perp DEX.
              </h2>
              <p className="max-w-2xl text-base text-white/70 sm:text-lg">
                Ardra centralizes bot runners, fee kickbacks, referral attribution, and leaderboard rewards so every trade compounds value without hopping between platforms.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {featureCardRows.map((card) => (
                <NeonCard key={card.id} tone={card.tone} className="h-full" data-animate>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.12)]">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/70">{card.description}</p>
                  </div>
                </NeonCard>
              ))}
            </div>
            <div className="dex-marquee rounded-[24px] border border-white/10 bg-white/5 p-4" data-animate>
              <div className="dex-marquee-track">
                {[...dexLogos, ...dexLogos].map((logo, index) => (
                  <div
                    key={`${logo.id}-${index}`}
                    className="dex-marquee-card flex h-16 w-28 items-center justify-center rounded-2xl border border-white/10 bg-black/40 px-4"
                  >
                    <img src={logo.src} alt={`${logo.name} logo`} className="h-12 w-auto max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "problem":
        return (
          <div className="grid flex-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5" data-animate>
              <Badge variant="glow" className="bg-rose-500/10 text-rose-200">
                Ecosystem problem
              </Badge>
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Perp DEX farming is expensive, risky, and fragmented for both traders and KOL partners.
              </h2>
              <p className="text-base text-white/70 sm:text-lg">
                Daily farming multiplies fees while manual execution invites costly mistakes. With dozens of venues, KOLs lose attribution the moment their community explores elsewhere.
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-400" />
                  Layered fees make points expensive; slippage and human error ramp up cost-per-point.
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-400" />
                  Negative PnL events can explode effective farming costs overnight and erase rewards.
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-400" />
                  KOLs must select a single DEX to promote, losing credit when traders migrate.
                </li>
              </ul>
            </div>
            <div className="grid gap-4" data-animate>
              {problemHighlights.map((item) => (
                <Card
                  key={item.title}
                  className="group relative bg-gradient-to-br from-rose-500/15 via-transparent to-orange-500/10 p-6 transition-colors"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent group-hover:border-rose-400/70 group-hover:shadow-[0_0_24px_rgba(244,63,94,0.35)] transition-all duration-300" />
                  <CardHeader className="mb-2">
                    <CardTitle className="text-lg text-white/90">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-white/70">
                    <p>{item.description}</p>
                    <div className="inline-flex rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/55">
                      {item.metric}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "solution":
        return (
          <div className="grid flex-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5" data-animate>
              <Badge variant="glow" className="bg-emerald-500/15 text-emerald-200">
                Ardra solution
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Ardra compresses farming costs, guards PnL, and unifies referrals in one automation hub.
              </h2>
              <p className="text-base text-white/70 sm:text-lg">
                Rebates flow back to traders, automation prevents wrecked ledgers, and a single referral link credits every integrated Perp DEX. Even a future Ardra airdrop turns regular trading into a dual-yield farm.
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  Rebate programs return part of the fees instantly, shrinking cost-per-point.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  Automation covers traders with limited time and reduces catastrophic PnL swings.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  KOLs push one Ardra link and capture 20%–50% of fees regardless of venue choice.
                </li>
              </ul>
            </div>
            <div className="grid gap-4" data-animate>
              {solutionHighlights.map((item) => (
                <Card
                  key={item.title}
                  className="group relative bg-gradient-to-br from-emerald-500/15 via-transparent to-cyan-500/15 p-6 transition-colors"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent group-hover:border-emerald-400/70 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] transition-all duration-300" />
                  <CardHeader className="mb-2">
                    <CardTitle className="text-lg text-white/90">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-white/70">
                    <p>{item.description}</p>
                    <div className="inline-flex rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/55">
                      {item.metric}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "market":
        return (
          <div className="flex flex-1 flex-col gap-8">
            <div className="space-y-4" data-animate>
              <Badge variant="glow" className="bg-cyan-500/15 text-cyan-200">
                Market size
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Three-month Perp DEX volume creates a nine-figure referral opportunity.
              </h2>
              <p className="max-w-3xl text-base text-white/70 sm:text-lg">
                Based on DeFiLlama volume and an average 0.03% fee, referral programs (10%–30%) unlock tens of millions in monthly revenue for top partners.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3" data-animate>
              {marketData.map((item) => (
                <Card key={item.month} className="bg-gradient-to-br from-white/8 via-white/5 to-white/8 p-6">
                  <CardHeader className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase tracking-[0.4em] text-white/55">{item.month}</div>
                      <BarChart3 className="h-5 w-5 text-white/60" />
                    </div>
                    <CardTitle className="text-2xl text-white">{item.volume}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-white/70">
                    <div>
                      <span className="text-xs uppercase tracking-[0.35em] text-white/50">Fees @0.03%</span>
                      <p className="text-lg text-white/90">{item.fees}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.35em] text-white/50">Referral share 10%–30%</span>
                      <p className="text-lg text-white/90">{item.opportunity}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "referral":
        return (
          <div className="flex flex-1 flex-col gap-10">
            <div className="flex flex-col gap-4" data-animate>
              <Badge variant="glow" className="bg-emerald-500/15 text-emerald-200">
                Referral opportunity
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Affiliate share layered on top of trading fees for partner programs.
              </h2>
              <p className="max-w-3xl text-base text-white/70 sm:text-lg">
                This chart represents the market slice Ardra targets: each bar highlights potential affiliate revenue across top Perp DEX programs (10%-30% share models).
              </p>
            </div>
            <NeonCard tone="emerald" className="space-y-6" data-animate>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/55">
                <span>Expected payout span</span>
                <span>Reference: $100M</span>
              </div>
              <div className="space-y-5">
                {referralBands.map((band) => {
                  const referenceCap = 100;
                  const minPercent = (band.min / referenceCap) * 100;
                  const maxPercent = (band.max / referenceCap) * 100;
                  const span = Math.max(6, maxPercent - minPercent);
                  const offset = Math.min(minPercent, 100 - span);

                  return (
                    <div key={band.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <span className="font-medium text-white/85">{band.month}</span>
                        <span>{band.range}</span>
                      </div>
                      <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                        <div className="absolute inset-y-0 left-0 right-0 bg-white/5" />
                        <div
                          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.45)]"
                          style={{
                            marginLeft: `${offset}%`,
                            width: `${Math.min(span, 100)}%`
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs uppercase tracking-[0.35em] text-white/50">
                        <span>$0M</span>
                        <span>$100M</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </NeonCard>
          </div>
        );
      case "gtm":
        return (
          <div className="flex flex-1 flex-col gap-8">
            <div className="space-y-4" data-animate>
              <Badge variant="glow" className="bg-cyan-500/15 text-cyan-200">
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </h2>
              <p className="max-w-3xl text-base text-white/70 sm:text-lg">
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {gtmPhases.map((phase) => (
                <NeonCard key={phase.title} tone={phase.tone} className="h-full" data-animate>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/55">
                    <span>{phase.timeline}</span>
                    <span>Phase</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.14)]">
                    {phase.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-white/70">
                    {phase.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-white/65" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </NeonCard>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-3" data-animate>
              <Card className="bg-white/6 p-6">
                <CardHeader className="mb-2">
                  <CardTitle className="text-lg text-white/90">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-white/70">
                  <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                </CardContent>
              </Card>
              <Card className="bg-white/6 p-6">
                <CardHeader className="mb-2">
                  <CardTitle className="text-lg text-white/90">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-white/70">
                  <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                </CardContent>
              </Card>
              <Card className="bg-white/6 p-6">
                <CardHeader className="mb-2">
                  <CardTitle className="text-lg text-white/90">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-white/70">
                  <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "mvp":
        return (
          <div className="grid flex-1 gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5" data-animate>
              <Badge variant="glow" className="bg-cyan-500/15 text-cyan-200">
                MVP results
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Two-week MVP on a single exchange delivered sticky usage and referral yield.
              </h2>
              <p className="text-base text-white/70 sm:text-lg">
                We stress-tested automation for 14 days. Adoption reached 36 active users who generated $28.28M in volume and unlocked $835 in revenue without incentives.
              </p>
              <div className="grid gap-4 sm:grid-cols-2" data-animate>
                {mvpMetrics.map((metric) => (
                  <Card
                    key={metric.label}
                    className="group relative overflow-hidden border-white/15 bg-gradient-to-br from-cyan-500/15 via-transparent to-emerald-400/10 p-5 shadow-[0_20px_55px_rgba(34,211,238,0.18)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_75px_rgba(34,211,238,0.28)]"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-400/25" />
                      <div className="absolute inset-[1px] rounded-[2rem] border border-cyan-200/20 group-hover:border-cyan-300/60" />
                    </div>
                    <div className="relative">
                      <div className="text-xs uppercase tracking-[0.35em] text-white/60">{metric.label}</div>
                      <div className="pt-3 text-xl font-semibold text-white">{metric.value}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center" data-animate>
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-2 shadow-[0_22px_70px_rgba(56,189,248,0.2)]">
                <img src={mvpImage} alt="MVP analytics screenshot" className="h-full w-full rounded-[24px] object-cover" />
                <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-tr from-cyan-500/12 via-transparent to-emerald-400/12" />
              </div>
            </div>
          </div>
        );
      case "team":
        return (
          <div className="flex flex-1 flex-col gap-8">
            <div className="space-y-4 text-center sm:text-left" data-animate>
              <Badge variant="glow" className="inline-flex bg-white/10 text-white/80">
                Ardra team
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Builders powering the Ardra ecosystem.
              </h2>
            </div>
            <div className="space-y-6">
              {teamMembers.map((member) => (
                <Card
                  key={member.name}
                  className="bg-white/6 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_24px_70px_rgba(34,211,238,0.2)]"
                  data-animate
                >
                  <div className="relative grid items-center gap-6 sm:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <div className="flex justify-center sm:justify-start">
                      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-[0_0_32px_rgba(34,211,238,0.22)]">
                        <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 text-center sm:items-start sm:text-left">
                      <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                      <p className="text-sm text-white/65">{member.role}</p>
                    </div>
                    <ul className="flex flex-col justify-center gap-3 text-sm text-white/70">
                      {member.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 flex-none rounded-full bg-white/60" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>

          </div>
        );
      case "scaling":
        return (
          <div className="flex flex-1 flex-col gap-8">
            <div className="space-y-4" data-animate>
              <Badge variant="glow" className="bg-white/10 text-white/80">
                Scalability
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Projected volume and rewards as the Ardra user base scales.
              </h2>
              <p className="max-w-2xl text-base text-white/70 sm:text-lg">
                Each tier assumes steady automation usage and rebate capture across integrated Perp DEXs; affiliate activation varies by cohort.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  users: "1,000 users",
                  volume: "$56,111,071 daily volume",
                  reward: "$1,656 rewards / day",
                  feeInfo: "Avg. fee 10%",
                  affiliate: "Affiliate program OFF",
                  badgeTone: "emerald" as NeonTone,
                  affiliateTone: "crimson" as NeonTone
                },
                {
                  users: "5,000 users",
                  volume: "$280,555,357 daily volume",
                  reward: "$8,280 rewards / day",
                  feeInfo: "Avg. fee 10%",
                  affiliate: "Affiliate program OFF",
                  badgeTone: "emerald" as NeonTone,
                  affiliateTone: "crimson" as NeonTone
                },
                {
                  users: "10,000 users",
                  volume: "$561,110,714 daily volume",
                  reward: "$33,120 rewards / day",
                  feeInfo: "Avg. fee 20%",
                  affiliate: "Affiliate program ON",
                  badgeTone: "cyan" as NeonTone,
                  affiliateTone: "emerald" as NeonTone
                },
                {
                  users: "30,000 users",
                  volume: "$1,683,332,142 daily volume",
                  reward: "$99,360 rewards / day",
                  feeInfo: "Avg. fee 20%",
                  affiliate: "Affiliate program ON",
                  badgeTone: "cyan" as NeonTone,
                  affiliateTone: "emerald" as NeonTone
                }
              ].map((tier) => (
                <Card
                  key={tier.users}
                  className="group relative overflow-hidden border border-white/12 bg-gradient-to-br from-emerald-500/12 via-transparent to-cyan-500/12 p-6 shadow-[0_24px_70px_rgba(16,185,129,0.18)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_32px_88px_rgba(16,185,129,0.25)]"
                  data-animate
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-emerald-400/25" />
                    <div className="absolute inset-[1px] rounded-[2rem] border border-emerald-200/20 group-hover:border-emerald-300/60" />
                  </div>
                  <div className="relative space-y-3">
                    <div className="text-sm uppercase tracking-[0.35em] text-white/60">{tier.users}</div>
                    <div className="text-lg font-semibold text-white">{tier.volume}</div>
                    <p className="text-sm text-white/70">{tier.reward}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/65">
                        {tier.feeInfo}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/80",
                          tier.affiliateTone === "emerald"
                            ? "border border-emerald-300/40 bg-emerald-500/15"
                            : "border border-rose-300/40 bg-rose-500/15"
                        )}
                      >
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full",
                            tier.affiliateTone === "emerald" ? "bg-emerald-300" : "bg-rose-300"
                          )}
                        />
                        {tier.affiliate}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      case "scaling-chart":
        return (
          <div className="flex flex-1 flex-col gap-6">
            <div className="space-y-3" data-animate>
              <Badge variant="glow" className="bg-emerald-500/15 text-emerald-200">
                Potential Impact
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Revenue by Protocol (daily)
              </h2>
              <p className="max-w-2xl text-base text-white/70 sm:text-lg">
                This chart highlights how Ardra's 30K-user scenario stacks up against other Solana referral programs.
              </p>
            </div>
            <div className="space-y-3 rounded-[26px] border border-white/12 bg-white/5 p-6" data-animate>
              {[
                { name: "Hylo", value: 11303, label: "$11,303" },
                { name: "Usual", value: 28520, label: "$28,520" },
                { name: "Orca", value: 43333, label: "$43,333" },
                { name: "Raydium", value: 79102, label: "$79,102" },
                { name: "Ardra (30k users)", value: 99360, label: "$99,360", active: true },
                { name: "Meteora", value: 185000, label: "$185,000" },
                { name: "Jupiter", value: 379877, label: "$379,877" }
              ].map((entry) => {
                const referenceCap = 500000;
                const percent = Math.min(100, Math.max(6, (entry.value / referenceCap) * 100));

                return (
                  <div key={entry.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span className={entry.active ? "font-semibold text-white" : ""}>{entry.name}</span>
                      <span className={entry.active ? "font-semibold text-white" : "text-white/60"}>{entry.label}</span>
                    </div>
                    <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="absolute inset-y-0 left-0 right-0 bg-white/5" />
                      <div
                        className={cn(
                          "absolute inset-y-0 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.45)] transition-all duration-500",
                          entry.active ? "opacity-100" : "opacity-70"
                        )}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "thanks":
        return (
          <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
            <img
              src={ardraLogo}
              alt="Ardra logo"
              className="max-h-48 w-auto drop-shadow-[0_0_60px_rgba(34,211,238,0.55)]"
              data-animate
            />
            <p className="font-[400] text-3xl text-white/90" style={{ fontFamily: "'Orbitron', sans-serif" }} data-animate>
              Thanks
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05050a] text-white">
      <div className="background-canvas pointer-events-none absolute inset-0">
        <div className="ambient-glow" />
        <div className="ambient-glow ambient-glow--two" />
        <div className="grid-field">
          <div className="grid-mesh" />
        </div>
        <div className="orb absolute -left-24 top-20 h-64 w-64 rounded-full bg-emerald-500/40" />
        <div className="orb absolute right-12 top-32 h-72 w-72 rounded-full bg-cyan-500/35" />
        <div className="orb absolute bottom-20 left-1/4 h-64 w-64 rounded-full bg-rose-500/35" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="glow" className="bg-white/10 text-white/80">
              Slide {currentIndex + 1}/{slides.length}
            </Badge>
            <div className="text-xs uppercase tracking-[0.35em] text-white/50">{currentSlide.label}</div>
          </div>
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleJump(index)}
                className={cn(
                  "h-2.5 w-8 rounded-full transition-all",
                  index === currentIndex ? "bg-cyan-300" : "bg-white/12 hover:bg-white/25"
                )}
                aria-label={`Go to ${slide.label}`}
              />
            ))}
          </div>
        </header>

        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="relative mt-10 flex-1">
          <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-black/55 shadow-[0_40px_140px_rgba(15,23,42,0.48)] backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-40" />
            <div className="absolute inset-[1px] rounded-[42px] bg-black/60" />
            <div ref={containerRef} className="relative z-10">
              <main ref={slideRef} className="flex min-h-[70vh] flex-col gap-8 p-6 sm:p-10">
                {renderSlideContent()}
              </main>
            </div>
          </div>
        </div>

        <footer className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="lg" onClick={handlePrev} disabled={currentIndex === 0} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            <Button size="lg" onClick={handleNext} disabled={currentIndex === slides.length - 1} className="gap-2">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
































