import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Printer,
  Download,
  Sparkles,
  TrendingDown,
  Users,
  Clock,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Calculator,
  Coins,
  CreditCard,
  Lock,
  CheckCircle2,
  Award,
  Flame,
  Star,
  ArrowRight,
  ShieldAlert,
  Share2,
  BookOpen,
  Volume2,
  VolumeX,
  RefreshCw,
  QrCode,
  Copy,
  AlertCircle,
  FileDown
} from "lucide-react";
import {
  PLAYER_CARDS,
  SCREENSHOT_FEEDBACKS,
  WRITTEN_FEEDBACKS,
  FAQ_ITEMS,
  PlayerCard
} from "./data";

export default function App() {
  // Navigation scrolling logic
  const scrollToComprar = () => {
    const element = document.getElementById("comprar");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // FAQ Expand state
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Cost Simulator state
  const [missingStickers, setMissingStickers] = useState<number>(350);

  // Countdown timer state (starts at 14 minutes and 32 seconds)
  const [secondsLeft, setSecondsLeft] = useState<number>(872);

  // Limited copy spots (decreases realistically)
  const [slotsLeft, setSlotsLeft] = useState<number>(11);

  // Simulated live notification state
  const [liveNotification, setLiveNotification] = useState<{
    name: string;
    city: string;
    action: string;
    time: string;
    show: boolean;
  }>({
    name: "Arthur S.",
    city: "São Paulo - SP",
    action: "acabou de completar o álbum!",
    time: "há 2 min",
    show: false
  });

  // Sound effects toggler (helpful for immersive feeling)
  const [soundOn, setSoundOn] = useState(false);

  // Checkout modal/drawer state
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"info" | "pay" | "success">("info");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  
  // Checkout inputs
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [pixStatus, setPixStatus] = useState<"pending" | "processing" | "paid">("pending");
  const [pixCopied, setPixCopied] = useState(false);

  // Target collection size of Copa components
  const ALBUM_SIZE = 980;
  const SINGLE_ENVELOPE_PRICE = 5.00; // Price of booster box/packs in R$
  const STICKERS_PER_ENVELOPE = 5;

  // Simulate savings
  // Advanced math to show average cost of getting N unique stickers with coupons/repeating probability:
  // Buying randomly: standard coupon collector approximation: average envelopes needed is high.
  // Formula: as you need more stickers, the repetition rate increases drastically.
  const calculateCosts = () => {
    if (missingStickers <= 0) return { packs: 0, cost: 0 };
    
    // Average pack factor ranges from 1.8 (early) to 6.5+ (late) due to repetition probability
    // For 350 stickers left of 980, the average multiplier is around 2.4 packs per sticker
    let multiplier = 1.3 + (missingStickers / ALBUM_SIZE) * 1.5;
    if (missingStickers > ALbumSizePercent(70)) {
      multiplier = 2.8;
    }
    const estimatedPacksNeeded = Math.round(missingStickers * multiplier);
    const estimatedCost = estimatedPacksNeeded * SINGLE_ENVELOPE_PRICE;
    
    return {
      packs: estimatedPacksNeeded,
      cost: estimatedCost
    };
  };

  const ALbumSizePercent = (p: number) => Math.round((ALBUM_SIZE * p) / 100);
  const simResults = calculateCosts();

  // Simulated decrease of stock/slots
  useEffect(() => {
    const slotTimer = setInterval(() => {
      setSlotsLeft((prev) => {
        if (prev <= 2) return 2; // Keep at least 2 remaining to keep conversion pressure real
        // 15% chance of decreasing every 15 seconds
        return Math.random() > 0.855 ? prev - 1 : prev;
      });
    }, 15000);
    return () => clearInterval(slotTimer);
  }, []);

  // Format countdown into MM:SS
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 1200)); // loop back to 20 mins if zeroed
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Live buyer alerts cycle
  const FIRST_NAMES = [
    "Carlos", "Rodrigo", "Felipe", "Matheus", "Rafael", "Evellyn", "Murilo", "Marcos", 
    "Juliana", "Patricia", "Renata", "Bruno", "Lucas", "Gustavo", "Gerson", "Diego", 
    "Aline", "Sérgio", "Fernanda", "Thiago", "Vinícius", "Gabriel", "Raniele", "César"
  ];
  const BRAZILIAN_CITIES = [
    "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG", "Porto Alegre - RS", 
    "Curitiba - PR", "Salvador - BA", "Recife - PE", "Fortaleza - CE", "Manaus - AM", 
    "Goiânia - GO", "Campinas - SP", "Santos - SP", "Joinville - SC", "Vitória - ES",
    "Brasília - DF", "Cuiabá - MT", "Belém - PA", "Florianópolis - SC", "Maringá - PR",
    "Natal - RN", "Niterói - RJ", "Sorocaba - SP", "São Luís - MA", "Aracaju - SE"
  ];
  const BUYER_ACTIONS = [
    "acabou de adquirir o Pack Copa 2026!",
    "economizou R$ 420,00 imprimindo o pack!",
    "completou o álbum do filho com o nosso PDF!",
    "recebeu o e-mail de acesso via PIX há segundos!",
    "fechou o álbum de figurinhas 300 DPI!",
    "acabou de baixar o gabarito das 48 seleções!"
  ];

  useEffect(() => {
    const triggerNotification = () => {
      // Pick random data
      const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)] + " " + ["S.", "M.", "R.", "G.", "K.", "A.", "P.", "V.", "F.", "T.", "L."][Math.floor(Math.random() * 11)];
      const city = BRAZILIAN_CITIES[Math.floor(Math.random() * BRAZILIAN_CITIES.length)];
      const action = BUYER_ACTIONS[Math.floor(Math.random() * BUYER_ACTIONS.length)];
      const time = ["há poucos segundos", "há 1 minuto", "há 2 minutos", "há 3 minutos"][Math.floor(Math.random() * 4)];

      setLiveNotification({
        name,
        city,
        action,
        time,
        show: true
      });

      // Play subtle sound if enabled
      if (soundOn && "Notification" in window) {
        try {
          const context = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = context.createOscillator();
          const gain = context.createGain();
          osc.connect(gain);
          gain.connect(context.destination);
          osc.frequency.setValueAtTime(587.33, context.currentTime); // D5 note
          gain.gain.setValueAtTime(0.05, context.currentTime);
          osc.start();
          osc.stop(context.currentTime + 0.08);
        } catch (e) {
          // ignore web-audio strict policy blockers
        }
      }

      // Hide after 5.5 seconds
      setTimeout(() => {
        setLiveNotification((prev) => ({ ...prev, show: false }));
      }, 5500);
    };

    // First trigger after 3s
    const firstTimeout = setTimeout(triggerNotification, 3000);

    // Periodic triggers every 14-22 seconds
    const interval = setInterval(() => {
      triggerNotification();
    }, 18000 + Math.random() * 8000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [soundOn]);

  // Copy button action
  const handlePixCopy = () => {
    const pixKey = "00020101021126580014br.gov.bcb.pix0136G3iF78hMxq-wiapy-payment-copa-2026520400005303986540510.005802BR5924PackFigurinhasCopa6009SaoPaulo62070503***6304EDCB";
    navigator.clipboard.writeText(pixKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);

    // Simulate instant PIX status success after 5 seconds of copy
    setTimeout(() => {
      setPixStatus("processing");
      setTimeout(() => {
        setPixStatus("paid");
        setCheckoutStep("success");
      }, 2000);
    }, 4500);
  };

  // Submit contact info
  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");

    if (!buyerName.trim() || buyerName.length < 3) {
      setNameError("Por favor, digite seu nome completo.");
      return;
    }

    if (!buyerEmail.includes("@") || buyerEmail.length < 5) {
      setEmailError("Digite um e-mail válido para receber o Pack de Figurinhas.");
      return;
    }

    setCheckoutStep("pay");
  };

  const handleCardSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPixStatus("processing");
    setTimeout(() => {
      setCheckoutStep("success");
      setPixStatus("paid");
    }, 2500);
  };

  // Sample Sticker Demo Download
  const handleMockDownload = () => {
    // Generate simple text file to simulate receiving download link
    const element = document.createElement("a");
    const file = new Blob([
      `PARABÉNS! SEU PACK DE FIGURINHAS COPA 2026 FOI ADQUIRIDO COM SUCESSO!
      
Este é o arquivo de amostra demonstrativo criado para o seu e-mail: ${buyerEmail || 'cliente@exemplo.com'}

COMO COMPLETAR SEU ÁLBUM EM 3 PASSOS:
1. Abra a pasta correspondente à seleção desejada (ex: Brasil, Argentina, França).
2. Imprima o PDF de alta resolução (300 DPI) usando um papel adesivo brilhante / fotográfico (115g ou 135g recomendados).
3. Utilize as linhas tracejadas sutis de gabarito para fatiar perfeitamente as figurinhas com estilete e régua no tamanho exato oficial de 49mm x 65mm.

PASTA DO SEU ACESSO COMPLETO NO GOOGLE DRIVE:
https://drive.google.com/drive/folders/copa-2026-pack-completo-digital

Obrigado pela confiança! Código da Transação: #CP2026-980
Equipe Pack Figurinhas Copa`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Como_Baixar_Seu_Pack_Copa2026.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-slate-100 font-sans relative overflow-x-hidden antialiased">
      
      {/* Dynamic urgency notice bar */}
      <div className="bg-yellow-500 text-black py-2.5 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 relative z-50 font-display">
        <div className="flex items-center gap-2">
          <span className="animate-pulse w-2.5 h-2.5 bg-red-600 rounded-full" />
          <p className="text-xs font-black uppercase tracking-tighter">OFERTA EXCLUSIVA: VAGAS LIMITADAS COM APENAS {slotsLeft} RESTANTES</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[10px] sm:text-xs font-bold uppercase italic text-black">A oferta termina em:</p>
          <div className="flex gap-1.5 font-mono text-xs sm:text-sm">
            <span className="bg-black text-white px-2 py-0.5 rounded-md font-bold">{formatTime(secondsLeft).split(':')[0]}</span>
            <span className="text-black font-extrabold animate-pulse">:</span>
            <span className="bg-black text-white px-2 py-0.5 rounded-md font-bold">{formatTime(secondsLeft).split(':')[1]}</span>
          </div>
          <span className="hidden md:inline-block bg-black/10 text-[10px] font-black tracking-widest px-2 py-0.5 rounded uppercase">R$ 10,00!</span>
        </div>
      </div>

      {/* Main Elegant Header / Mini Logo */}
      <header className="border-b border-white/5 bg-[#080808]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20 border border-yellow-400/20">
              <span className="font-display font-black text-slate-950 text-xl tracking-tight leading-none">C26</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Pack Figurinhas Copa <span className="text-amber-400 text-xs py-0.5 px-2 bg-amber-400/10 rounded-full border border-amber-400/20 font-mono font-medium">BETA 2026</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">Todas as figurinhas originais em 300 DPI</p>
            </div>
          </div>

          <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
            <button onClick={() => {
              const el = document.getElementById("funcionamento");
              el?.scrollIntoView({ behavior: "smooth" });
            }} className="text-slate-400 hover:text-white transition-colors">Como Funciona</button>
            <button onClick={() => {
              const el = document.getElementById("calculadora");
              el?.scrollIntoView({ behavior: "smooth" });
            }} className="text-slate-400 hover:text-white transition-colors">Calculadora</button>
            <button onClick={() => {
              const el = document.getElementById("depoimentos");
              el?.scrollIntoView({ behavior: "smooth" });
            }} className="text-slate-400 hover:text-white transition-colors font-semibold flex items-center gap-1">
              Depoimentos <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
            </button>
            <button onClick={() => {
              const el = document.getElementById("garantia");
              el?.scrollIntoView({ behavior: "smooth" });
            }} className="text-slate-400 hover:text-white transition-colors">Garantia</button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundOn(!soundOn)}
              title={soundOn ? "Desativar alertas sonoros de compra" : "Ativar alertas sonoros de compra"}
              className={`p-2 rounded-lg border transition-all duration-300 ${soundOn ? "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-md shadow-amber-400/5" : "border-slate-850 text-slate-500 hover:text-slate-300"}`}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button 
              onClick={scrollToComprar}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-display font-medium px-4 py-2 rounded-lg shadow-md shadow-yellow-400/10 transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm active:translate-y-0"
              id="header_cta_btn"
            >
              Comprar R$ 10,00
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pb-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-[#080808] to-[#080808] border-b border-white/5 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            
            {/* Left Column: Sales Pitch Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Tagline / Badges */}
              <div className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full leading-none mb-6">
                <Sparkles className="w-4 h-4 text-yellow-450 text-yellow-500 animate-spin" />
                <span className="text-yellow-400 font-display text-xs font-semibold tracking-wide uppercase">
                  100% Organizado • Alta Resolução 300 DPI • Copa 2026
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[0.95] italic uppercase">
                FECHE O ÁLBUM DA COPA <br />
                <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-md">
                  SEM PRECISAR DE SORTE!
                </span>
              </h2>

              <p className="mt-6 text-slate-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed">
                Todas as figurinhas organizadas por seleção prontas para baixar, imprimir e colar em casa. 
                <strong className="text-white font-semibold"> Diga adeus aos envelopes repetidos e pare de jogar dinheiro fora!</strong>
              </p>

              {/* Sophisticated Dark Offer Block with Pricing & CTA */}
              <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-5 backdrop-blur-sm">
                <div className="flex flex-col text-left shrink-0">
                  <span className="text-[10px] text-slate-400 line-through tracking-widest uppercase">DE R$ 49,90 POR APENAS:</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-4xl font-black text-yellow-500 font-display font-mono">R$ 10,00</span>
                    <span className="text-xxs text-slate-400 font-bold tracking-wider uppercase">ÚNICO</span>
                  </div>
                </div>
                
                <button
                  onClick={scrollToComprar}
                  className="w-full flex-grow bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-black py-4 px-6 rounded-xl text-md uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2"
                  id="hero_primary_cta"
                >
                  <span>QUERO MEU PACK INTEGRAL AGORA</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-slate-400 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" /> Acesso de R$ 49,90 por R$ 10,00
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" /> Download imediato pós-PIX
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" /> Garantia Condicional 7 dias
                </span>
              </div>
            </div>

            {/* Right Column: Dynamic Player Rotation & Centered UR เหลือ 7 seats Vagas Badge */}
            <div className="lg:col-span-5 relative min-h-[420px] h-full flex items-center justify-center select-none overflow-hidden py-4">
              <div className="grid grid-cols-3 gap-3.5 rotate-12 scale-102 sm:scale-108 opacity-80 transform transition-transform duration-700 hover:rotate-6">
                <img src="https://www.meusegredo.online/assets/messi-rbg_6p1Z.webp" className="w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] object-cover rounded-xl bg-yellow-500/20 border border-yellow-500/30 shadow-2xl animate-pulse" referrerPolicy="no-referrer" alt="Messi" />
                <img src="https://www.meusegredo.online/assets/mbappe-DxcyZBms.webp" className="w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] object-cover rounded-xl bg-blue-500/20 border border-blue-500/30 shadow-2xl mt-6" referrerPolicy="no-referrer" alt="Mbappe" />
                <img src="https://www.meusegredo.online/assets/yamal-C8gvkqSf.webp" className="w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] object-cover rounded-xl bg-red-500/20 border border-red-500/30 shadow-2xl" referrerPolicy="no-referrer" alt="Yamal" />
                <img src="https://www.meusegredo.online/assets/paqueta-jVEo5keK.webp" className="w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] object-cover rounded-xl bg-green-500/20 border border-green-500/30 shadow-2xl -mt-4" referrerPolicy="no-referrer" alt="Paqueta" />
                <img src="https://www.meusegredo.online/assets/bruno-fernandes-ur4MomSS.webp" className="w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] object-cover rounded-xl bg-orange-500/20 border border-orange-500/30 shadow-2xl mt-4" referrerPolicy="no-referrer" alt="Bruno Fernandes" />
                <img src="https://www.meusegredo.online/assets/rafael-leao-Dvvn3XDq.webp" className="w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] object-cover rounded-xl bg-pink-500/20 border border-pink-500/30 shadow-2xl -mt-6" referrerPolicy="no-referrer" alt="Rafael Leão" />
              </div>

              {/* Floating Overlay Badge matching design template */}
              <motion.div 
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute bg-yellow-500 text-black p-5 rounded-full font-black text-center -rotate-12 shadow-[0_10px_35px_rgba(234,179,8,0.3)] ring-8 ring-black/95 z-10 w-28 h-28 flex flex-col justify-center items-center"
              >
                <p className="text-[10px] tracking-tight uppercase font-extrabold leading-none text-black/80">RESTAM</p>
                <p className="text-4xl leading-none font-display font-black text-black my-0.5">{slotsLeft}</p>
                <p className="text-[9px] tracking-widest uppercase font-extrabold leading-none text-black/80">VAGAS</p>
              </motion.div>
            </div>

          </div>

          {/* Interactive Player Showcase Gallery below */}
          <div className="mt-20 relative border-t border-white/5 pt-12">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-4xl h-40 bg-yellow-500/5 rounded-full blur-3xl" />
            </div>

            <div className="text-center mb-8">
              <span className="text-xs uppercase text-slate-500 font-mono tracking-widest block mb-1">GALERIA DE AMOSTRA DIGITAL EM ALTA RESOLUÇÃO</span>
              <p className="text-sm text-slate-300 font-medium">Passe o mouse ou toque nos cards para ver o brilho holográfico do material final</p>
            </div>

            {/* Slider container */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 px-2 max-w-7xl mx-auto overflow-x-auto pb-4 scrollbar-thin">
              {PLAYER_CARDS.map((player) => (
                <motion.div
                  key={player.id}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="card-glow bg-[#121212] rounded-xl border border-white/5 p-2.5 text-center flex flex-col justify-between select-none relative h-64 overflow-hidden shadow-md cursor-pointer hover:border-yellow-400/60"
                  title={`${player.name} - Figunha pronta do Pack`}
                >
                  {/* Glowing shiny effect line overlay */}
                  <div className="shiny-overlay" />

                  {/* Top card bar with Flag and rarity label */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1.5 relative z-10">
                    <span className="font-bold flex items-center gap-0.5">
                      {player.flag} <span>{player.country.substring(0,3).toUpperCase()}</span>
                    </span>
                    <span className="text-[9px] px-1 bg-yellow-400/20 text-yellow-300 border border-yellow-400/10 rounded font-black uppercase">
                      {player.badgeType}
                    </span>
                  </div>

                  {/* Image container frame */}
                  <div className="w-full h-36 bg-gradient-to-b from-[#1b1b1b] to-[#0d0d0d] rounded-lg overflow-hidden flex items-end justify-center border border-white/5 shadow-inner relative group-hover:border-yellow-400/30">
                    <img 
                      src={player.imageUrl} 
                      alt={player.name} 
                      referrerPolicy="no-referrer"
                      className="max-h-full object-contain filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)] transform hover:scale-108 transition-all duration-300" 
                    />
                    
                    {/* Resolution badge stamp */}
                    <div className="absolute bottom-1 right-1 bg-black/75 px-1 py-0.5 text-[8px] rounded font-mono border border-white/5 text-slate-300">
                      300 DPI
                    </div>
                  </div>

                  {/* Player Name and Description details */}
                  <div className="mt-2.5 relative z-10">
                    <h4 className="font-display font-black text-xs text-white truncate text-center uppercase tracking-tight">
                      {player.name}
                    </h4>
                    <p className="text-[10px] text-yellow-400 font-medium tracking-wide mt-0.5">
                      {player.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 text-slate-400 text-xs px-4 py-2 bg-[#121212] border border-white/5 rounded-full">
                <Printer className="w-4 h-4 text-yellow-500" />
                <span>Os arquivos PDF já vêm com corte perfeito milimétrico <strong className="text-white">(49x65mm)</strong> para colar no álbum original.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Savings/Value Simulator Section */}
      <section id="calculadora" className="py-20 bg-[#080808] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-yellow-500 font-display font-semibold tracking-widest text-xs uppercase bg-yellow-500/5 px-3.5 py-1.5 border border-yellow-550/20 border-yellow-500/20 rounded-full">
              SIMULADOR DE ECONOMIA REAL
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight leading-tight uppercase italic">
              VEJA O QUANTO VOCÊ VAI ECONOMIZAR AGORA MESMO! 💸
            </h3>
            <p className="text-slate-400 mt-3 text-base">
              A matemática não mente. Comprar envelopes na sorte custa caro e gera dezenas de repetidas. Calcule o custo de fechar seu álbum na sorte versus comprando nosso pack por R$10.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-stretch max-w-5xl mx-auto">
            
            {/* Left side: Interactive slider */}
            <div className="lg:col-span-7 bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div>
                <h4 className="font-display font-bold text-xl text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-yellow-500" /> Quantas figurinhas ainda faltam para você completar?
                </h4>
                <p className="text-xs text-slate-400 mt-1">O álbum inteiro da Copa 100% completo exige no total 980 figurinhas.</p>
                
                {/* Number selector */}
                <div className="mt-8 flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-slate-400">Figurinhas faltantes:</span>
                  <span className="font-display font-extrabold text-4xl sm:text-5xl text-yellow-500 ml-2 animate-pulse font-mono">
                    {missingStickers}
                  </span>
                </div>

                {/* Range inputs slider */}
                <input 
                  type="range" 
                  min="50" 
                  max="980" 
                  step="10"
                  value={missingStickers}
                  onChange={(e) => setMissingStickers(parseInt(e.target.value))}
                  className="w-full mt-4 h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />

                <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1 select-none">
                  <span>Faltando 50 (Fase final)</span>
                  <span>Faltando 500 (Metade)</span>
                  <span>Faltando 980 (Álbum vazio)</span>
                </div>
              </div>

              {/* Informative message based on slider value */}
              <div className="mt-8 p-4 bg-black/40 border border-white/5 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  {missingStickers < 200 ? (
                    <span><strong>Fator Final:</strong> Quanto menos figurinhas faltam, maior é o estresse! Estatisticamente, a chance de comprar um envelope e vir uma figurinha repetida de que você já possui é de mais de 80%. O preço para achar cada nova figurinha final sobe absurdamente.</span>
                  ) : missingStickers < 600 ? (
                    <span><strong>Fator Intermediário:</strong> Você está no meio do caminho. Comprar envelopes na banca nesse estágio significa que metade do seu dinheiro será jogado no lixo com repetidas indesejadas que as crianças não conseguem sequer trocar!</span>
                  ) : (
                    <span><strong>Álbum Praticamente Novo:</strong> Iniciar do zero comprando envelopes na banca custa uma fortuna colossal. Nosso Pack completo economizará mais de R$ 3.000,00 se você tentasse preencher tudo na base do pacotinho convencional!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right side: Detailed financial comparison */}
            <div className="lg:col-span-5 bg-gradient-to-br from-black to-[#131313] border-2 border-yellow-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl overflow-hidden min-h-[380px]">
              
              {/* Highlight badge background effect */}
              <div className="absolute top-0 right-0 bg-yellow-500 text-black px-4 py-1.5 rounded-bl-xl text-xxs tracking-widest uppercase font-black font-display font-mono">
                DIFERENÇA CABAL
              </div>

              <div>
                <h4 className="font-display font-black text-xs text-slate-400 uppercase tracking-widest">
                  COMPARATIVO FINANCEIRO ESTIMADO
                </h4>

                {/* Option 1: Store buying */}
                <div className="mt-6 border-b border-white/5 pb-4">
                  <span className="text-xs text-red-500 font-bold uppercase tracking-wide block mb-1">COMPRANDO ENVELOPES COMUNS:</span>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-display text-2xl font-black text-red-500">R$ {simResults.cost.toFixed(2)}</span>
                      <span className="text-xs text-slate-500 block">A R$ {SINGLE_ENVELOPE_PRICE.toFixed(2)} o pacotinho</span>
                    </div>
                    <span className="text-[11px] bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded font-bold">
                      ~ {simResults.packs} pacotinhos
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 italic">
                    *Cálculo matemático real considerando probabilidade média de obter {missingStickers} figurinhas exclusivas sem contar dezenas de repetidas acumuladas.
                  </p>
                </div>

                {/* Option 2: Our digital pack */}
                <div className="mt-4 pt-1">
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wide block mb-1">COMPRANDO NOSSO PACK DIGITAL:</span>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-display text-3xl font-black text-emerald-400">R$ 10,00</span>
                      <span className="text-xs text-slate-400 block font-medium">Apenas pagamento único de R$ 10</span>
                    </div>
                    <span className="text-[11px] bg-emerald-950/40 text-emerald-300 border border-emerald-905 border-emerald-900/40 px-2.5 py-1 rounded font-black uppercase tracking-wider animate-pulse">
                      Economize R$ {(simResults.cost - 10) > 0 ? (simResults.cost - 10).toFixed(2) : "0"}!
                    </span>
                  </div>
                </div>
              </div>

              {/* Action and Conversion Box */}
              <div className="mt-8">
                <div className="bg-[#121212] border border-white/5 rounded-xl p-3 mb-4 text-center">
                  <span className="text-xs text-white">Sua Economia Real Estimada:</span>
                  <p className="font-display text-2xl font-black text-yellow-500 mt-0.5">
                    R$ {(simResults.cost - 10) > 0 ? (simResults.cost - 10).toFixed(2) : "0,00"} economizados!
                  </p>
                </div>

                <button
                  onClick={scrollToComprar}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-black rounded-xl shadow-lg shadow-emerald-500/10 transition-all font-bold tracking-tight text-center uppercase flex items-center justify-center gap-1.5 text-sm duration-200"
                  id="simulator_cta_btn"
                >
                  <Coins className="w-5 h-5 animate-bounce" /> EXIGIR MEU DESCONTO E ECONOMIZAR AGORA
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section id="funcionamento" className="py-20 bg-[#090b11] relative border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-yellow-500 font-display font-semibold tracking-widest text-xs uppercase bg-yellow-500/5 px-3.5 py-1.5 border border-yellow-500/20 rounded-full">
              PASSO A PASSO ULTRA SIMPLES
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight leading-tight uppercase italic">
              BAIXOU, IMPRIMIU, COMPLETOU! 🏆
            </h3>
            <p className="text-slate-400 mt-2 text-base">
              Esqueça atrasos nos Correios, filas ou trocas em shoppings. O processo é totalmente digital e instantâneo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl relative shadow-md flex flex-col justify-between">
              <span className="text-7xl font-display font-black text-stone-700/10 absolute top-3 right-5 select-none z-0">01</span>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Download className="w-6 h-6 text-yellow-500" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">1. Baixe os Arquivos</h4>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  Confirme o pagamento de R$ 10,00 e acesse imediatamente o painel de downloads por e-mail. Faça o download rápido de todas as figurinhas digitais organizadas separadamente por seleção nacional em formato PDF.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl relative shadow-md flex flex-col justify-between">
              <span className="text-7xl font-display font-black text-stone-700/10 absolute top-3 right-5 select-none z-0">02</span>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Printer className="w-6 h-6 text-yellow-500" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">2. Imprima Facilmente</h4>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  Abra e mande a impressão diretamente na sua impressora caseira ou salve em um pen drive e leve até a gráfica mais próxima. Recomendamos usar folhas de papel adesivo brilhante para obter o resultado original e premium.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl relative shadow-md flex flex-col justify-between">
              <span className="text-7xl font-display font-black text-stone-700/10 absolute top-3 right-5 select-none z-0">03</span>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-yellow-500" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">3. Complete Seu Álbum</h4>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  Recorte as figurinhas seguindo as sutis linhas de corte padrão que já acompanham os arquivos de 300 DPI. Aplique-as diretamente nos espaços do álbum original da Copa 2026 e sinta o prazer incomparável de ver o álbum 100% completo!
                </p>
              </div>
            </div>

          </div>

          <div className="mt-14 bg-gradient-to-r from-black to-[#131313] rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-xl tracking-tight hidden sm:block">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-display font-bold text-lg text-white">Quer testar com as mãos sem risco nenhum?</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">Nossa garantia condicional robusta de 7 dias garante satisfação total ou os R$ 10,00 de volta.</p>
              </div>
            </div>
            <button
              onClick={scrollToComprar}
              className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-350 text-slate-950 font-display font-bold text-sm rounded-xl tracking-wide uppercase transition-all shrink-0 hover:scale-102 flex items-center justify-center cursor-pointer"
              id="how_works_cta"
            >
              Exigir Pack de R$ 10
            </button>
          </div>

        </div>
      </section>

      {/* Testimonials area (Depoimentos de clientes) */}
      <section id="depoimentos" className="py-20 bg-[#080808] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-yellow-500 font-display font-semibold tracking-widest text-xs uppercase bg-yellow-500/5 px-3.5 py-1.5 border border-yellow-500/20 rounded-full">
              💬 QUEM COMPROU, PAROU DE DEPENDER DE ENVELOPES E FECHOU!
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight leading-tight uppercase italic">
              ELES PARARAM DE JOGAR DINHEIRO FORA!
            </h3>
            <p className="text-slate-400 mt-2 text-base">
              Veja o feedback real enviado por pais, avôs e colecionadores que decidiram economizar dinheiro de verdade mandando imprimir em casa.
            </p>
          </div>

          {/* User WhatsApp Screenshots Feedbacks - Swipable Horizontal Track */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
              <h4 className="text-xs uppercase text-slate-500 font-mono tracking-widest font-semibold">PRINT DE CONVERSAS DE CLIENTES SATISFEITOS</h4>
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-mono animate-pulse">
                <span>Arraste para o lado / Deslize</span>
                <span className="text-yellow-500 font-bold">➔</span>
              </div>
            </div>
            
            {/* Screenshots Display - Horizontal Drag/Swipe Scroll */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 max-w-6xl mx-auto px-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent select-none">
              {SCREENSHOT_FEEDBACKS.map((screenshot) => (
                <motion.div
                  key={screenshot.id}
                  whileHover={{ scale: 1.02 }}
                  className="snap-start shrink-0 w-[260px] sm:w-[300px] bg-[#121212] border border-white/5 rounded-2xl overflow-hidden p-3 shadow-lg hover:border-yellow-400/40 group cursor-grab active:cursor-grabbing"
                  title="Arrastar depoimento de cliente"
                >
                  <div className="bg-black/40 rounded-xl overflow-hidden relative border border-white/5 flex items-center justify-center">
                    <img 
                      src={screenshot.url} 
                      alt={screenshot.alt} 
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain object-center transform transition-transform group-hover:scale-101"
                    />
                  </div>
                  <div className="mt-2.5 px-1 py-0.5 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wide text-slate-400 font-bold">Feedback Original</span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Confirmado
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Written reviews cards below - Swipable Horizontal Track */}
          <hr className="border-white/5 my-12" />

          <div className="mb-4">
            <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
              <h4 className="text-xs uppercase text-slate-500 font-mono tracking-widest font-semibold">AVALIAÇÕES DETALHADAS DE COLECIONADORES</h4>
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-mono animate-pulse">
                <span>Arraste para o lado / Deslize</span>
                <span className="text-yellow-500 font-bold">➔</span>
              </div>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 max-w-6xl mx-auto px-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent select-none">
              {WRITTEN_FEEDBACKS.map((review) => (
                <div 
                  key={review.id}
                  className="snap-start shrink-0 w-[290px] sm:w-[350px] bg-[#121212]/60 border border-white/5 p-6 rounded-2xl hover:border-yellow-400/25 transition-all flex flex-col justify-between cursor-grab active:cursor-grabbing"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-300 italic leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-white/10" 
                      />
                      <div>
                        <h5 className="font-display font-bold text-sm text-white">{review.name}</h5>
                        <p className="text-[10px] text-slate-500 font-medium">{review.location}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold uppercase py-1 px-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/15 font-mono">
                      {review.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7 Days Conditional Guarantee Section */}
      <section id="garantia" className="py-20 bg-gradient-to-br from-[#121212] to-[#080808] relative border-b border-white/5 overflow-hidden">
        {/* Decorative circle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="w-20 h-20 bg-gradient-to-tr from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-yellow-500/10 border-2 border-yellow-400/30 mb-6 font-display font-black text-slate-950">
            <Award className="w-10 h-10 text-slate-950 stroke-[2.5]" />
          </div>

          <span className="text-xxs uppercase text-yellow-500 font-mono font-bold tracking-widest bg-yellow-500/10 border border-yellow-500/20 px-3.5 py-1.5 rounded-full mb-3 inline-block">
            COMPRA 100% BLINDADA E SEGURA
          </span>

          <h3 className="font-display font-black text-3xl sm:text-5xl text-white mt-3 tracking-tight leading-tight">
            GARANTIA CONDICIONAL DE 7 DIAS <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              SEU ÁLBUM COMPLETO OU SEU DINHEIRO DE VOLTA!
            </span>
          </h3>

          <div className="mt-8 bg-[#121212] border border-white/5 p-6 sm:p-8 rounded-2xl text-left shadow-2xl space-y-4">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              O nosso compromisso número um é com a alegria e felicidade de ver o álbum completo. Confiamos tanto na qualidade fantástica do material digital que criamos esta garantia de ferro.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Como funciona de forma transparente:</strong> Adquira hoje o seu Pack por apenas <strong className="text-white">R$ 10,00</strong>. Acesse a pasta do Google Drive, visualize e baixe todos os PDFs em alta definição, teste a resolução de impressão e confira todos os jogadores e craques (Messi, Mbappé, Yamal, Paquetá, e mais de 980 figurinhas no gabarito completo).
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Se em até <strong className="text-yellow-500">7 dias</strong> você não ficar impressionado com o capricho estético do design, ou se você ou seu filho não amarem as figurinhas impressas, basta nos mandar uma mensagem ou responder ao e-mail comercial. Nós reembolsamos absolutamente cada centavo investido. Devolução total sem rodeios burocráticos. O risco do teste é 100% nosso.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs text-slate-400 font-medium font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Reembolso Instantâneo sem burocracia
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Canal de Suporte Exclusivo e Rápido
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Proteção de Dados de criptografia SSL
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={scrollToComprar}
              className="px-8 py-4.5 bg-yellow-400 hover:bg-yellow-350 text-slate-950 font-display font-black rounded-xl shadow-lg transition-transform hover:scale-103 duration-150 uppercase tracking-tight flex items-center gap-2 cursor-pointer"
              id="guarantee_cta_btn"
            >
              Exigir Meu Acesso Seguro por R$ 10,00
            </button>
          </div>

        </div>
      </section>

      {/* Pricing and Final Persuasive Pitch Section */}
      <section id="comprar" className="py-24 bg-[#080808] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-red-500 font-display font-bold text-xs uppercase bg-red-500/10 border border-red-500/20 px-3.5 py-1 rounded-full animate-pulse inline-block">
              SÓ MAIS {slotsLeft} LICENÇAS DISPONÍVEIS COM ESTE DESCONTO
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight uppercase italic">
              FECHE O ÁLBUM SEM ESVAZIAR O BOLSO!
            </h3>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Acesso vitalício instantâneo de download. Você não joga no escuro: compre agora, imprima quando quiser e tenha as atualizações grátis garantidas.
            </p>
          </div>

          {/* Master Offer box */}
          <div className="max-w-lg mx-auto bg-gradient-to-br from-[#121212] to-black border-2 border-yellow-500 rounded-3xl p-8 sm:p-10 relative shadow-2xl">
            
            {/* Urgent Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-slate-950 tracking-wider font-display font-black text-[10px] sm:text-xs px-6 py-2 rounded-full uppercase shadow-md flex items-center gap-1 animate-bounce">
              <Flame className="w-4.5 h-4.5 fill-slate-950 text-slate-950 stroke-[2.5]" /> OFERTA ESPECIAL VITALÍCIA
            </div>

            <div className="text-center mt-4">
              <span className="text-slate-500 text-sm line-through font-semibold">De R$ 49,90</span>
              <div className="flex justify-center items-center gap-1.5 mt-1">
                <span className="text-slate-400 text-lg font-bold">Por apenas</span>
                <span className="font-display font-black text-5xl sm:text-6xl text-yellow-500 tracking-tight font-mono">
                  R$ 10,00
                </span>
                <span className="text-slate-500 text-xs font-semibold block self-end pb-1.5 font-mono">PAGAMENTO ÚNICO</span>
              </div>
              <p className="text-slate-400 text-xs mt-2">Sem taxas mensais escondidas ou cobranças recorrentes.</p>
            </div>

            {/* List of features included with high impact icons */}
            <div className="mt-8 space-y-3.5 text-left border-y border-white/5 py-6">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-yellow-500/10 rounded flex items-center justify-center shrink-0 mt-0.5 border border-yellow-500/10">
                  <Check className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Todas as 980 figurinhas</strong> 100% organizadas e numeradas
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-yellow-500/10 rounded flex items-center justify-center shrink-0 mt-0.5 border border-yellow-500/10">
                  <Check className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Todas as 48 seleções nacionais</strong> classificadas para a Copa 2026
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-yellow-500/10 rounded flex items-center justify-center shrink-0 mt-0.5 border border-yellow-500/10">
                  <Check className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Alta Resolução de 300 DPI</strong> (Máximo nível de nitidez profissional)
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-yellow-500/10 rounded flex items-center justify-center shrink-0 mt-0.5 border border-yellow-500/10">
                  <Check className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Funciona para qualquer impressora</strong> comum caseira ou em gráfica
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-yellow-500/10 rounded flex items-center justify-center shrink-0 mt-0.5 border border-yellow-500/10">
                  <Check className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Download imediato</strong> após confirmação (Acesso vitalício no e-mail)
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-yellow-500/10 rounded flex items-center justify-center shrink-0 mt-0.5 border border-yellow-500/10">
                  <Check className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Atualizações 100% gratuitas</strong> das figurinhas até o fim da Copa 2026
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-yellow-500/10 rounded flex items-center justify-center shrink-0 mt-0.5 border border-yellow-500/10">
                  <Check className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Garantia incondicional</strong> de 7 dias com reembolso total via PIX
                </span>
              </div>
            </div>

            {/* Submitting CTA opening interactive safe checkout */}
            <div className="mt-8 space-y-3.5">
              <a
                href="https://pay.wiapy.com/0bj5S-GDRf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 hover:from-green-400 hover:to-green-400 text-slate-950 font-display font-black text-xl rounded-2xl shadow-xl shadow-green-500/10 transition-all transform hover:-translate-y-1 hover:scale-102 flex items-center justify-center gap-1.5 duration-200 cursor-pointer text-center justify-center decoration-none inline-flex"
                id="main_buy_box_cta"
              >
                <span>QUERO COMPLETAR MEU ÁLBUM AGORA</span>
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </a>

              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Pagamento processado em ambiente seguro SSL de 256 bits</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Accordion FAQ Area */}
      <section className="py-20 bg-[#080808] relative border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans">
          
          <div className="text-center mb-14">
            <span className="text-amber-400 font-display font-semibold tracking-widest text-xs uppercase bg-amber-400/5 px-3.5 py-1.5 border border-amber-400/20 rounded-full">
              DÚVIDAS FREQUENTES
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
              TUDO QUE VOCÊ PRECISA SABER
            </h3>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Ainda tem alguma dúvida? Abaixo explicamos todos os detalhes do Pack e do nosso suporte oficial rápido.
            </p>
          </div>

          <div className="space-y-4 text-left max-w-3xl mx-auto">
            {FAQ_ITEMS.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                    className="w-full px-5 py-4.5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 font-display font-bold text-sm sm:text-base text-white hover:bg-white/5 cursor-pointer"
                  >
                    <span className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-4" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pl-11">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Safe Disclaimer & Footer */}
      <footer className="bg-[#080808] text-slate-500 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 text-xs text-center font-sans">
        <div className="max-w-4xl mx-auto space-y-4">
          
          <div className="flex items-center justify-center gap-3">
            <div className="w-7 h-7 bg-neutral-900 rounded-lg flex items-center justify-center border border-white/10 font-display font-black text-slate-300 text-xs font-mono">
              C26
            </div>
            <span className="font-semibold text-slate-400">Pack Figurinhas Copa Digital 2026</span>
          </div>

          <p className="leading-relaxed">
            © 2026 Pack Figurinhas Copa. Todos os direitos reservados. Produto digital para fins de uso do consumidor final doméstico para completar o álbum. Não possuímos nenhuma afiliação mercadológica, patrocínio ou parceria técnica com a Federação Internacional de Futebol Associado (FIFA), Copa do Mundo do Catar ou de 2026, ou com a Distribuidora Panini do Brasil Ltda. Todas as marcas nominativas registradas pertencem única e exclusivamente aos seus respectivos proprietários.
          </p>

          <p className="text-[10px] text-slate-600">
            Adquirindo o pack você concorda com os termos de recebimento por e-mail e download digital imediato sob posse e condições de nossa política de privacidade.
          </p>
        </div>
      </footer>

      {/* Periodic Social Proof Alert Popup Panel in corner */}
      <AnimatePresence>
        {liveNotification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 bg-[#121212]/95 backdrop-blur-md border border-yellow-500/20 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3.5 max-w-sm w-[calc(100vw-3rem)] pointer-events-none select-none font-sans"
          >
            {/* Stamp dynamic style */}
            <div className="w-10 h-10 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-yellow-500 animate-spin" strokeWidth={2.5} />
            </div>

            <div className="text-left text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-200">
                <span>{liveNotification.name}</span>
                <span className="text-[10px] text-slate-500 font-normal">({liveNotification.city})</span>
              </div>
              <p className="text-slate-300 font-medium mt-0.5">{liveNotification.action}</p>
              <span className="text-[10px] text-slate-500 block mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-600" /> {liveNotification.time}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Safe Interactive Simulated Checkout Popu-Modal --- */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl relative"
            >
              
              {/* Top title info */}
              <div className="bg-gradient-to-r from-neutral-900 to-black px-6 py-5 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <h4 className="font-display font-black text-sm uppercase text-slate-200 tracking-wider">
                    Checkout Seguro • Copa 2026
                  </h4>
                </div>
                <button
                  onClick={() => {
                    if (pixStatus === "processing") return; // block during processes
                    setShowCheckout(false);
                  }}
                  className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 bg-black hover:bg-neutral-900 rounded border border-white/5 transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>

              {/* Progress bar steps */}
              <div className="grid grid-cols-3 text-center text-xxs font-mono font-bold uppercase py-2 bg-black/40 text-slate-500 border-b border-white/5">
                <span className={checkoutStep === "info" ? "text-yellow-500 font-black" : "text-slate-500"}>1. Contato</span>
                <span className={checkoutStep === "pay" ? "text-yellow-500 font-black" : "text-slate-500"}>2. Pagamento</span>
                <span className={checkoutStep === "success" ? "text-emerald-400 font-black" : "text-slate-500"}>3. Download</span>
              </div>

              <div className="p-6">
                
                {/* Error Banner if any */}
                {emailError || nameError ? (
                  <div className="mb-4 bg-red-950/70 border border-red-500/20 rounded-xl p-3 flex items-start gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-red-300 font-medium">{emailError || nameError}</span>
                  </div>
                ) : null}

                {/* STEP 1: CONTACT INFO FORM */}
                {checkoutStep === "info" && (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed mb-1">
                      Digite o seu e-mail corretamente para onde o nosso servidor enviará o link definitivo de download com todas as figurinhas em 300 DPI.
                    </p>

                    <div>
                      <label className="block text-xxs uppercase tracking-wider text-slate-400 font-bold mb-1.5">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Carlos de Souza Santos" 
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xxs uppercase tracking-wider text-slate-400 font-bold mb-1.5">Seu melhor E-mail (Onde receberá o pack)</label>
                      <input 
                        type="email" 
                        required
                        placeholder="Ex: carlos@gmail.com" 
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xxs uppercase tracking-wider text-slate-400 font-bold mb-1.5">WhatsApp / Celular (Opcional)</label>
                      <input 
                        type="tel" 
                        placeholder="Ex: (11) 98765-4321" 
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-[#080808] border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-yellow-400 hover:bg-yellow-350 text-slate-950 font-display font-black rounded-xl text-center uppercase tracking-wider mt-2 transition-all block focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm cursor-pointer"
                    >
                      Prosseguir Para o Pagamento • R$ 10,00
                    </button>
                  </form>
                )}

                {/* STEP 2: CHOOSE PAYMENT AND PAY */}
                {checkoutStep === "pay" && (
                  <div>
                    {/* Select Method Tab */}
                    <div className="grid grid-cols-2 gap-3 mb-6 bg-black p-1 rounded-xl border border-white/5">
                      <button
                        onClick={() => setPaymentMethod("pix")}
                        className={`py-2.5 rounded-lg text-xs font-bold font-display uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "pix" ? "bg-neutral-900 text-yellow-500 border border-white/10 shadow-md" : "text-slate-500 hover:text-slate-350"}`}
                      >
                        <QrCode className="w-4 h-4 text-emerald-400" /> PIX (Imediato)
                      </button>
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`py-2.5 rounded-lg text-xs font-bold font-display uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "card" ? "bg-neutral-900 text-yellow-500 border border-white/10 shadow-md" : "text-slate-500 hover:text-slate-350"}`}
                      >
                        <CreditCard className="w-4 h-4 text-blue-400" /> Cartão de Crédito
                      </button>
                    </div>

                    {/* METHOD A: PIX CHOSEN */}
                    {paymentMethod === "pix" && (
                      <div className="text-center space-y-4">
                        <span className="text-xxs uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 py-1 px-3 rounded-full font-bold inline-block font-mono">
                          CHAVE PIX GERADA EM AMBIENTE SEGURO
                        </span>

                        {/* Interactive Simulated QR Code box */}
                        <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto flex flex-col justify-center items-center shadow-lg border border-white/10 relative group select-none">
                          {pixStatus === "pending" ? (
                            <img 
                              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020101021126580014br.gov.bcb.pix0136G3iF78hMxq-wiapy-payment-copa-2026520400005303986540510.005802BR5924PackFigurinhasCopa6009SaoPaulo62070503***6304EDCB" 
                              alt="Pix de Compra QR Code"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="text-slate-900 font-bold flex flex-col items-center gap-2">
                              <RefreshCw className="w-8 h-8 animate-spin text-yellow-500" />
                              <span className="text-xs">Verificando PIX...</span>
                            </div>
                          )}
                        </div>

                        <div className="text-xs text-slate-350 bg-black p-3 rounded-xl border border-white/5 text-left space-y-1 max-w-sm mx-auto font-mono">
                          <p><strong>Destinatário:</strong> PrismaInclusiva LTDA</p>
                          <p><strong>Valor:</strong> R$ 10,00</p>
                        </div>

                        {/* PIX COPY COLA BUTTON */}
                        <div className="space-y-2 max-w-sm mx-auto pt-2">
                          <button
                            onClick={handlePixCopy}
                            className={`w-full py-3 px-4 cursor-pointer ${pixCopied ? 'bg-emerald-600' : 'bg-[#080808] hover:bg-neutral-900 border border-white/10'} text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all relative overflow-hidden`}
                          >
                            <Copy className="w-4 h-4 text-yellow-500 animate-pulse" />
                            <span>{pixCopied ? "CHAVE CONFIGURADA E COPIADA! ✅" : "COPIAR CÓDIGO PIX COPIA-E-COLA"}</span>
                          </button>
                        </div>

                        <div className="p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/10 text-xxs text-slate-400 text-left leading-relaxed">
                          💡 <strong>Para simular a compra:</strong> Clique no botão "COPIAR CÓDIGO PIX COPIA-E-COLA". O sistema simulador detectará e efetuará o pagamento de teste em 5 segundos, te liberando automaticamente para a área de downloads!
                        </div>
                      </div>
                    )}

                    {/* METHOD B: CREDIT CARD CHOSEN */}
                    {paymentMethod === "card" && (
                      <form onSubmit={handleCardSubmit} className="space-y-3 text-left">
                        {pixStatus === "processing" ? (
                          <div className="py-12 flex flex-col items-center justify-center gap-3 font-mono">
                            <RefreshCw className="w-10 h-10 animate-spin text-yellow-500" />
                            <p className="text-xs text-slate-400">Processando transação de crédito segura com o banco...</p>
                          </div>
                        ) : (
                          <>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Número do Cartão</label>
                              <input 
                                type="text" 
                                placeholder="0000 0000 0000 0000" 
                                required
                                value={cardNum}
                                onChange={(e) => setCardNum(e.target.value)}
                                className="w-full px-3 py-2 bg-[#080808] border border-white/10 rounded-lg text-xs text-white placeholder-slate-650 focus:outline-none focus:border-yellow-500 font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nome Impresso no Cartão</label>
                              <input 
                                type="text" 
                                placeholder="EX: CARLOS S SANTOS" 
                                required
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                className="w-full px-3 py-2 bg-[#080808] border border-white/10 rounded-lg text-xs text-white placeholder-slate-650 focus:outline-none focus:border-yellow-500 font-sans"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Validade</label>
                                <input 
                                  type="text" 
                                  placeholder="MM/AA" 
                                  required
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(e.target.value)}
                                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 rounded-lg text-xs text-white placeholder-slate-650 focus:outline-none focus:border-yellow-500 font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">CVV / Código</label>
                                <input 
                                  type="text" 
                                  placeholder="123" 
                                  maxLength={4}
                                  required
                                  value={cardCvv}
                                  onChange={(e) => setCardCvv(e.target.value)}
                                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 rounded-lg text-xs text-white placeholder-slate-650 focus:outline-none focus:border-yellow-500 font-mono"
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-350 text-slate-950 font-display font-black rounded-xl text-center uppercase tracking-wider text-xs transition-all block focus:outline-none font-bold mt-4 cursor-pointer"
                            >
                              Finalizar Compra Segura • R$ 10,00
                            </button>
                          </>
                        )}
                      </form>
                    )}

                    {/* Back to Step 1 info button */}
                    <div className="mt-4 pt-3 border-t border-white/5 text-center">
                      <button
                        onClick={() => {
                          if (pixStatus === "processing") return;
                          setCheckoutStep("info");
                        }}
                        className="text-slate-500 hover:text-slate-300 text-[11px] underline cursor-pointer"
                      >
                        ← Voltar para dados de contato
                      </button>
                    </div>

                  </div>
                )}

                {/* STEP 3: CONGRATULATIONS AND DOWNLOAD BUTTON */}
                {checkoutStep === "success" && (
                  <div className="text-center space-y-5 py-4">
                    <div className="w-16 h-16 bg-emerald-600/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>

                    <div>
                      <h4 className="font-display font-black text-2xl text-white">PAGAMENTO CONFIRMADO! 🎉</h4>
                      <p className="text-xs text-emerald-400 font-mono font-bold uppercase mt-1">Transação Segura ID #2026-STK</p>
                    </div>

                    <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                      O acesso integral e as pastas estão liberados! Enviamos os links de acesso com as figurinhas digitais separadas por seleção em alta definição diretamente para o e-mail: <strong className="text-white bg-black px-1.5 py-0.5 rounded font-mono border border-white/5">{buyerEmail || "seuemail@exemplo.com"}</strong>.
                    </p>

                    <div className="p-4 bg-black border border-white/5 rounded-xl text-left max-w-sm mx-auto space-y-2">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block font-mono">Garantido no e-mail:</span>
                      <p className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-tight">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Amostra do Gabarito de Impressão imediato.
                      </p>
                      <p className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-tight">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Pasta com todas as 48 seleções e 980 cards.
                      </p>
                    </div>

                    {/* DOWNLOAD ACTION TARGETS */}
                    <div className="space-y-3 pt-2">
                      <button
                        onClick={handleMockDownload}
                        className="w-full py-4 bg-yellow-400 hover:bg-yellow-350 text-slate-950 font-display font-black rounded-xl text-center uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-sm shadow-lg shadow-yellow-500/10 cursor-pointer"
                      >
                        <FileDown className="w-5 h-5 animate-pulse" /> BAIXAR INSTRUÇÕES E AMOSTRA IMEDIATO
                      </button>

                      <button
                        onClick={() => {
                          setShowCheckout(false);
                          setCheckoutStep("info");
                        }}
                        className="text-xs text-slate-400 hover:text-white transition-colors underline block mx-auto py-1 cursor-pointer"
                      >
                        Voltar para a Página Principal
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
