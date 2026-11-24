import { useEffect, useRef } from 'react';
import { ArcElement, Chart, DoughnutController } from 'chart.js';
import { groups, services } from '../content.js';

Chart.register(DoughnutController, ArcElement);

export default function ProductionChart({ event }) {
  const canvas = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    const colors = getComputedStyle(canvas.current);
    chart.current = new Chart(canvas.current, {
      type: 'doughnut',
      data: {
        labels: groups.map(({ label }) => label),
        datasets: [{
          data: [0, 0, 0],
          backgroundColor: groups.map(({ token }) => colors.getPropertyValue(token).trim()),
          borderWidth: 0,
          borderRadius: 6,
          spacing: 4,
        }],
      },
      options: {
        cutout: '78%',
        responsive: true,
        events: [],
        animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 550 },
      },
    });
    return () => chart.current.destroy();
  }, []);

  useEffect(() => {
    const recommended = services.filter(({ id }) => event.services.includes(id));
    chart.current.data.datasets[0].data = groups.map(({ id }) => recommended.filter(({ group }) => group === id).length);
    chart.current.update();
  }, [event]);

  return (
    <figure className="production-chart">
      <div className="chart-ring">
        <canvas ref={canvas} aria-hidden="true" />
        <div className="chart-total" aria-hidden="true"><strong>{event.services.length}</strong><span>services</span></div>
      </div>
      <figcaption>
        <h3>Suggested setup</h3>
        <ul>
          {groups.map(({ id, label }) => {
            const matching = services.filter((service) => service.group === id && event.services.includes(service.id));
            return <li key={id}><span className={`chart-dot chart-dot-${id}`} aria-hidden="true" /><span>{label}</span><strong>{matching.length}</strong></li>;
          })}
        </ul>
      </figcaption>
    </figure>
  );
}
