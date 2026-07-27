import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Marquee.css';

const items = [
  'Освіта',
  'Краса',
  'Кафе',
  'Тату',
  'Розваги',
  'Кондитерські',
  'Ресторани',
  'Фітнес',
  'Мода',
  'Нерухомість',
  'Медицина',
  'Готелі',
  'Стартапи',
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const content = [...items, ...items].map((item, i) => (
    <span className="marquee__item" key={i}>
      {item}
      <span className="marquee__dot" />
    </span>
  ));

  return (
    <div className="marquee">
      <div className="marquee__track" ref={trackRef}>
        {content}
        {content}
      </div>
    </div>
  );
}
