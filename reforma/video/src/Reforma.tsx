import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const CENA = 180;
export const CENAS = [
  {foto: '1-galinheiro.jpg', titulo: 'Galinheiro', itens: ['Faxina pesada e pintura lavável', 'Bebedouros nipple e comedouros tubulares', 'Piso com caimento para ralo', 'Abate em sala separada']},
  {foto: '2-lateral.jpg', titulo: 'Espaço lateral', itens: ['Descarte da sucata', 'Forro de PVC a 3 m com LED', 'Estantes de aço e ovos organizados', 'Botijões em gaiola externa']},
  {foto: '3-corte.jpg', titulo: 'Sala de corte', itens: ['Bancada de inox, sem madeira', 'Janela de passagem para o balcão', 'Pia exclusiva para as mãos', 'Piso limpo e ralo sifonado']},
  {foto: '4-loja.jpg', titulo: 'Loja', itens: ['Balcão de carnes no fundo', '2 gôndolas e 3 corredores', 'Caixa na frente, com bebidas e sorvete', 'Engenheiro avalia a viga da entrada']},
];
const TEAL = '#0E6B64', YOLK = '#E1A117', INK = '#1B2624';

const Cena: React.FC<{c: typeof CENAS[number]; n: number}> = ({c, n}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const zoom = interpolate(f, [0, CENA], [1.05, 1.15]);
  const painel = spring({frame: f - 45, fps, config: {damping: 200}});
  return (
    <AbsoluteFill style={{backgroundColor: INK, fontFamily: 'sans-serif'}}>
      <Img src={staticFile(c.foto)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`, filter: `brightness(${1 - painel * 0.35})`}} />
      <div style={{position: 'absolute', top: 50, left: 50, background: INK, color: 'white', padding: '14px 26px', borderRadius: 10, fontSize: 40, fontWeight: 800}}>
        <span style={{color: YOLK}}>Foto {n} · </span>{c.titulo}
      </div>
      <div style={{position: 'absolute', left: 50, right: 50, bottom: 60, background: 'white', borderRadius: 18, padding: '34px 40px',
        transform: `translateY(${(1 - painel) * 500}px)`, display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{color: TEAL, fontSize: 30, fontWeight: 800, letterSpacing: 2}}>O QUE MUDA</div>
        {c.itens.map((t, i) => {
          const o = interpolate(f, [60 + i * 12, 75 + i * 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return <div key={t} style={{opacity: o, fontSize: 40, color: INK, display: 'flex', gap: 18, alignItems: 'center'}}>
            <span style={{width: 18, height: 18, borderRadius: 9, background: YOLK, flexShrink: 0}} />{t}</div>;
        })}
      </div>
    </AbsoluteFill>
  );
};

const Final: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: TEAL, color: 'white', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', opacity: interpolate(f, [0, 15], [0, 1])}}>
      <div style={{fontSize: 90, fontWeight: 800}}>Aviário da Praça</div>
      <div style={{fontSize: 44, color: YOLK, marginTop: 20}}>Plano de reforma</div>
    </AbsoluteFill>
  );
};

export const Reforma: React.FC = () => (
  <AbsoluteFill>
    {CENAS.map((c, i) => (
      <Sequence key={c.foto} from={i * CENA} durationInFrames={CENA}><Cena c={c} n={i + 1} /></Sequence>
    ))}
    <Sequence from={CENA * CENAS.length}><Final /></Sequence>
  </AbsoluteFill>
);
