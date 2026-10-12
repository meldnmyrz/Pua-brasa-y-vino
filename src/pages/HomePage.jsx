import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Flame, Wine, Calendar, ArrowRight, Sparkles, 
  MapPin, Phone, Plus, ChevronUp, ChevronDown, ChefHat, ArrowUpRight, Thermometer, Droplets, ShieldCheck, Award
} from 'lucide-react';
import { menuItems, menuCategories, restaurantInfo } from '../data/menuData';
import MenuItemCard from '../components/MenuItemCard';
import ParticleConstellation from '../components/ParticleConstellation';

import Features11 from '../components/Features11';

export default function HomePage({ onOpenItemModal, onAddToCart }) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [textVisible, setTextVisible] = useState(() => (typeof window !== 'undefined' && window.scrollY > 50));
  const textVisibleRef = useRef(typeof window !== 'undefined' && window.scrollY > 50);
  const isFirstWheelActiveRef = useRef(false);
  const secondWheelReadyRef = useRef(false);
  const wheelIdleTimerRef = useRef(null);
  const isFirstTouchActiveRef = useRef(false);
  const secondTouchReadyRef = useRef(false);
  const touchStartYRef = useRef(0);
  const heroRef = useRef(null);
  const mobilePlatillosRef = useRef(null);
  const desktopPlatillosRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PÚA Brasa y Vino | Inicio — Sabores de Brasa & Cava VIP";

    // Si el usuario se desplaza (por ejemplo arrastrando la barra lateral con el mouse):
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      if (window.scrollY > 15) {
        if (!textVisibleRef.current) {
          textVisibleRef.current = true;
          setTextVisible(true);
        }
        secondWheelReadyRef.current = true;
        secondTouchReadyRef.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Gesto con Rueda / Trackpad:
    // Al primer scroll, revela el texto centrado y detiene la pantalla sin bajarla.
    // Al segundo scroll, ahora sí permite descender.
    const handleWheel = (e) => {
      if (window.scrollY <= 25 && !secondWheelReadyRef.current) {
        if (e.deltaY > 0) {
          e.preventDefault();
          window.scrollTo(0, 0);

          if (!textVisibleRef.current) {
            textVisibleRef.current = true;
            setTextVisible(true);
          }

          isFirstWheelActiveRef.current = true;

          // Mientras dure el impulso o inercia de este primer scroll, se mantiene bloqueado
          clearTimeout(wheelIdleTimerRef.current);
          wheelIdleTimerRef.current = setTimeout(() => {
            isFirstWheelActiveRef.current = false;
            secondWheelReadyRef.current = true;
          }, 450);
          return;
        }
      }
    };

    // Gestos táctiles en celular:
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY; // > 0 indica deslizar hacia abajo

      if (window.scrollY <= 25 && !secondTouchReadyRef.current) {
        if (deltaY > 8) {
          if (e.cancelable) e.preventDefault();
          window.scrollTo(0, 0);

          if (!textVisibleRef.current) {
            textVisibleRef.current = true;
            setTextVisible(true);
          }
          isFirstTouchActiveRef.current = true;
          return;
        }
      }
    };

    const handleTouchEnd = () => {
      if (isFirstTouchActiveRef.current) {
        isFirstTouchActiveRef.current = false;
        secondTouchReadyRef.current = true;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Auto-play continuo del video (PUA BRAND OF)
    const attemptPlay = () => {
      if (mobilePlatillosRef.current) {
        mobilePlatillosRef.current.play().catch(() => {});
      }
      if (desktopPlatillosRef.current) {
        desktopPlatillosRef.current.play().catch(() => {});
      }
    };
    attemptPlay();

    const handleFirstTouch = () => {
      attemptPlay();
      window.removeEventListener('touchstart', handleFirstTouch);
    };
    window.addEventListener('touchstart', handleFirstTouch, { once: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchstart', handleFirstTouch);
      clearTimeout(wheelIdleTimerRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    if (!textVisibleRef.current) {
      textVisibleRef.current = true;
      setTextVisible(true);
      secondWheelReadyRef.current = true;
      secondTouchReadyRef.current = true;
    } else {
      const el = document.getElementById('features-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const featuredDishes = [
    {
      id: "feat-1",
      name: "Tomahawk Angus Prime (45 Días de Maduración)",
      category: "cortes",
      price: 1350,
      description: "Corte grueso marmoleado con hueso, asado pacientemente al fuego de leña de encino y terminado con mantequilla de romero y sal marina ahumada.",
      image: "/assets/corte-filete-mignon.jpg",
      tags: ["Corte Insignia", "Maduración 45D"],
      pairing: "Gran Reserva Malbec / Cabernet Sauvignon",
      waitTime: "25 min"
    },
    {
      id: "feat-2",
      name: "Tuétanos a la Leña con Escamoles",
      category: "entradas",
      price: 420,
      description: "Canoas de tuétano rostizadas a fuego vivo de leña, montadas con escamoles a la mantequilla de epazote, perejil crocante y tortillas de comal.",
      image: "/assets/tuetanos-carne-brasas.jpg",
      tags: ["Especialidad del Fuego", "Tradición"],
      pairing: "Mezcal Espadín Ancestral / Tempranillo",
      waitTime: "15 min"
    },
    {
      id: "feat-3",
      name: "Tiradito de Atún Aleta Azul & Ponzu Trufado",
      category: "mariscos",
      price: 395,
      description: "Láminas frescas de atún aleta azul con emulsión de ponzu cítrico, aceite de ajonjolí tostado, trufa negra fresca y aguacate tatemado.",
      image: "/assets/tuna-sashimi-tiradito.jpg",
      tags: ["Especialidad del Mar", "Pesca del Día"],
      pairing: "Sauvignon Blanc Valle de Guadalupe",
      waitTime: "12 min"
    },
    {
      id: "feat-4",
      name: "Parrillada al Fuego de Encino (Master Grill)",
      category: "cortes",
      price: 1180,
      description: "Degustación selecta de cortes Prime asados a las brasas vivas, chistorra artesanal y guarnición de vegetales ahumados al sarmiento con chimichurri.",
      image: "/assets/parrillada-brasas.jpg",
      tags: ["Para Compartir", "Master Griller"],
      pairing: "Ribera del Duero Crianza",
      waitTime: "30 min"
    },
    {
      id: "feat-5",
      name: "Smoked Mezcalita Flameada de Autor",
      category: "mixologia",
      price: 260,
      description: "Destilado de agave artesanal infusionado con romero flameado al momento frente al comensal, licor de chile ancho y campana de humo de mezquite.",
      image: "/assets/mixologia-flameada-bar.jpg",
      tags: ["Mixología de Autor", "Flameado"],
      pairing: "Maridaje ideal para entradas y cortes a la leña",
      waitTime: "8 min"
    },
    {
      id: "feat-6",
      name: "Gran Cava Sommelier & Cosechas Privadas",
      category: "maridajes",
      price: 1450,
      description: "Selección curada de más de 500 etiquetas internacionales, servicio a temperatura controlada en cristalería Riedel y asesoría por nuestro sommelier.",
      image: "/assets/cava-vino-mesa.jpg",
      tags: ["Cava Privada", "Etiquetas VIP"],
      pairing: "Maridaje guiado en 5 tiempos de brasas",
      waitTime: "5 min"
    }
  ];

  return (
    <div className="pt-0 pb-28 min-h-screen text-[#f5f7f5] bg-[#000000] relative overflow-x-clip font-sf-pro-text text-left">
      
      {/* ============================================================
          01 HERO STAGE: SOLO VIDEO 2 (PLATILLOS EN LOOP CONTINUO)
          EL TEXTO APARECE CENTRADO AL HACER SCROLL Y DETIENE LA PANTALLA
         ============================================================ */}
      <section 
        ref={heroRef} 
        className="relative w-full h-screen min-h-[100dvh] z-10 bg-black flex flex-col justify-center items-center overflow-hidden px-6 sm:px-12"
      >
        {/* BACKGROUND VIDEO: EXCLUSIVAMENTE VIDEO 2 (PLATILLOS EN LOOP CONTINUO, SIN FUEGO NI LOGO) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          
          {/* MOBILE VIDEO (SOLO PLATILLOS) */}
          <video
            ref={mobilePlatillosRef}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            className="md:hidden w-full h-full object-cover"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          >
            <source src="/assets/pua-brand-of.mp4" type="video/mp4" />
            <source src="/pua-brand-of.mp4" type="video/mp4" />
          </video>

          {/* DESKTOP VIDEO (PUA BRAND OF) */}
          <video
            ref={desktopPlatillosRef}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            className="hidden md:block w-full h-full object-cover"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          >
            <source src="/assets/pua-brand-of.mp4" type="video/mp4" />
            <source src="/pua-brand-of.mp4" type="video/mp4" />
          </video>
        </div>

        {/* GRADIENTE RADIAL SUAVE: DA CONTRASTE AL APARECER EL TEXTO CENTRADO */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            textVisible ? 'opacity-100' : 'opacity-20'
          }`}
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.92) 100%)'
          }}
        />

        {/* TEXTO CENTRADO: APARECE AL HACER SCROLL Y DETIENE LA PANTALLA */}
        <div 
          className={`relative z-20 max-w-4xl mx-auto text-center transition-all duration-700 ease-out pointer-events-none ${
            textVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-6'
          }`}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-sf-pro-display font-semibold tracking-[-0.02em] text-[#ffffff] leading-[1.14] drop-shadow-[0_4px_28px_rgba(0,0,0,0.99)] mb-4 sm:mb-5">
            EL RITUAL DEL <br className="hidden sm:block" />
            <span className="text-[#ffffff]">FUEGO & LA CAVA.</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-[#f5f5f7] max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_18px_rgba(0,0,0,0.99)]">
            Cortes Angus Prime madurados en seco durante 45 días, sellados al fuego directo de encino a 600°C. Acompañados por una cava de más de 500 etiquetas internacionales curadas por sommelier.
          </p>
        </div>

        {/* DESLIZA PARA EXPLORAR / DESLIZA PARA CONOCER MÁS */}
        <div 
          onClick={handleExploreClick}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-2 cursor-pointer select-none group transition-all duration-500"
        >
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#d4d3c9] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:text-white transition-colors">
            {textVisible ? 'DESLIZA PARA CONOCER MÁS' : 'DESLIZA PARA EXPLORAR'}
          </span>
          <div className="w-8 h-8 rounded-full border border-white/25 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:border-[#c49a4a] group-hover:scale-110 transition-all shadow-xl animate-bounce">
            <ChevronDown className="w-4 h-4 text-white group-hover:text-[#c49a4a] transition-colors" />
          </div>
        </div>

      </section>

      {/* ============================================================
          02 REACT BITS PRO FEATURES 11: SPLIT HEADLINE WITH 3 INDEXED CARDS
         ============================================================ */}
      <div id="features-section">
        <Features11 />
      </div>

      {/* 03 WHITE MERCHANDISING CARD (#ffffff PAPER CANVAS WITH INK #1d1d1f TEXT) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 my-20 z-10 relative">
        <div className="card-white-merchandising p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[#1d1d1f] text-xs font-mono uppercase tracking-widest font-semibold block">
              EXPERIENCIA EXCLUSIVA DEL CHEF
            </span>
            <h2 className="text-card-heading sm:text-4xl text-[#1d1d1f] font-sf-pro-display font-semibold">
              Menú Degustación & Omakase de Brasas
            </h2>
            <p className="text-[#6e6e73] text-sm leading-relaxed max-w-xl">
              Disfruta de un recorrido guiado de 5 tiempos preparado frente a tus ojos por nuestro Master Griller, maridado paso a paso con cosechas exclusivas de nuestra cava subterránea.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link to="/reservas" className="btn-apple-blue font-semibold">
                <span>Reservar Omakase VIP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/servicios" className="inline-product-link text-xs font-semibold">
                Saber más sobre eventos privados →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[20px] overflow-hidden border border-[#e8e8ed] h-72">
              <img 
                src="/assets/corte-filete-mignon.jpg" 
                alt="Omakase de Brasas Púa" 
                className="w-full h-full object-cover filter brightness-95"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 04 SIGNATURE DISHES SHOWCASE & INTERACTIVE MENU DISH CARDS */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 my-20 z-10 relative">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-[#c49a4a] uppercase tracking-widest block font-semibold mb-2">
              SELECCIÓN DEL CHEF & SOMMELIER
            </span>
            <h2 className="text-section-heading text-[#f5f5f7]">
              PLATILLOS Y BEBIDAS DESTACADAS
            </h2>
          </div>
          <a 
            href="https://menu-pua.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-product-link text-sm font-semibold flex items-center gap-1.5"
          >
            <span>Ver Menú Completo</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDishes.map((dish) => (
            <MenuItemCard
              key={dish.id}
              item={dish}
              onClick={onOpenItemModal}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </section>

    </div>
  );
}
