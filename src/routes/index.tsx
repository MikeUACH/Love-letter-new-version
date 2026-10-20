import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Fingerprint, Heart, Mail, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import flowers from '@/assets/love-flowers.png';
import { Timeline } from '@/components/Timeline';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Kenthia, un poquito de amor de Miguel' },
    { name: 'description', content: 'Una florecita, una cartita y un montón de amor. Solo para ti, Kenthia. De Miguel.' },
    { property: 'og:title', content: 'Kenthia, esto es para ti ♡' },
    { property: 'og:description', content: 'Una cartita de amor y una flor esperando florecer. Con todo mi amor, Miguel.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: LoveNote,
});

function LoveNote() {
  const [bloomed, setBloomed] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  return (
    <div className="love-page">
      <header className="love-header">
        <div className="wordmark"><Heart /> una cartita de amor</div>
        <span className="header-note">de mí, para mi persona favorita</span>
      </header>
      <span className="tiny-heart heart-one" aria-hidden="true">♡</span>
      <span className="tiny-heart heart-two" aria-hidden="true">♡</span>
      <main className="love-main">
        <div className="eyebrow">Para mi pookie</div>
        <h1>Kenthia,</h1>
        <p className="script">un poquito de amor, solo para ti.</p>
        <p className="intro">Si pudiera atravesar esta pantalla, tomaría tu mano.<br />Por ahora, te hice algo bonito.</p>
        <div className="bloom-space">
          {bloomed ? <>
            <img className="bloom-image" src={flowers} width={1024} height={1024} alt="Flores rositas floreciendo solo para Kenthia" />
            <div className="bloom-hearts" aria-hidden="true"><span>♡</span><span>♡</span><span>♥</span></div>
          </> : <div className="touch-cluster">
            <p className="touch-caption">un poquito de magia para ti ↴</p>
            <Button variant="bloom" className="touch-button" aria-label="Toca aquí para que florezca tu flor" onClick={() => setBloomed(true)}><Fingerprint /></Button>
            <span className="touch-label">pon tu dedo aquí</span>
          </div>}
        </div>
        <div aria-live="polite">{bloomed && <><p className="bloom-message">Una flor para ti. Porque tú haces florecer mi mundo.</p><Button variant="ghost" className="again-button" onClick={() => setBloomed(false)}><RotateCcw /> ¿Otra vez?</Button></>}</div>
        <section className="note-section">
          <Button variant="ghost" className="note-button" aria-expanded={letterOpen} aria-controls="love-letter" onClick={() => setLetterOpen(!letterOpen)}><Mail /> Unas palabras de mi corazón {letterOpen ? <ChevronUp /> : <ChevronDown />}</Button>
          {letterOpen && <article id="love-letter" className="letter">
            <h2>Mi dulce Kenthia,</h2>
            <p>No siempre encuentro las palabras perfectas, pero esto sí lo sé: tú haces especiales mis días normales.</p>
            <p>Eres mi pensamiento favorito, mi hola favorito, y la persona que quisiera tener a mi lado ahora mismo.</p>
            <p>Así que aquí va una florecita, un abrazo enorme, y todo el amor que cabe en una página tan chiquita. Significas muchísimo para mí, pookie. ♡</p>
            <p className="signature">Siempre tuyo,<br />Miguel</p>
          </article>}
        </section>
      </main>
      <footer className="love-footer"><Heart className="footer-heart" /><p>Hecho con todo mi amor, Miguel</p><p>Solo tú. Siempre tú.</p><a href="#story-title" className="scroll-hint script">↓ Nuestra historia continúa aquí</a></footer>
      <Timeline />
      <img className="corner-flower corner-left" src={flowers} width={1024} height={1024} alt="" aria-hidden="true" />
      <img className="corner-flower corner-right" src={flowers} width={1024} height={1024} alt="" aria-hidden="true" />
    </div>
  );
}
