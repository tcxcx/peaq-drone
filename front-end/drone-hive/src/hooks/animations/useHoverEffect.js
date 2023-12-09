import gsap from 'gsap';
import { useEffect } from 'react';

const useHoverEffect = (ref) => {
  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      const text = element.textContent;
      element.innerHTML = '';
      const lines = text.split('\n');

      lines.forEach((line, idx) => {
        const lineElement = document.createElement('div');
        line.split(' ').forEach(word => {
          const wordSpan = document.createElement('span');
          wordSpan.textContent = word + ' ';
          wordSpan.style.transition = 'color 0.2s';
          wordSpan.addEventListener('mouseenter', () => {
            gsap.to(wordSpan, { color: "#00ff6a", duration: 0.2 });
          });
          wordSpan.addEventListener('mouseleave', () => {
            gsap.to(wordSpan, { color: 'inherit', duration: 0.2 });
          });
          lineElement.appendChild(wordSpan);
        });

        if (idx < lines.length - 1) lineElement.appendChild(document.createElement('br'));
        element.appendChild(lineElement);
      });
    }
  }, [ref]);
};

export default useHoverEffect;
