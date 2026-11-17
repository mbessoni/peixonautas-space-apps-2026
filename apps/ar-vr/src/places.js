// Locais disponíveis: os mesmos atalhos do apps/map-3d (Jezero usa o ponto de pouso exato).
// `route` (opcional) em lat/lon; sem ela, uma rota de exemplo é gerada no rumo mais plano.
import galeTraverse from './data/gale-curiosity-traverse.json';
import galeObservations from './data/gale-observations.json';

export const PLACES = {
  jezero: {
    name: 'Jezero Crater · Perseverance landing site',
    lat: 18.4447,
    lon: 77.4508,
    route: {
      destName: 'Example destination',
      points: [
        { lat: 18.4447, lon: 77.4508 },
        { lat: 18.4458, lon: 77.4511 },
        { lat: 18.4467, lon: 77.4519 },
        { lat: 18.4482, lon: 77.4513 },
        { lat: 18.4498, lon: 77.4501 },
      ],
    },
  },
  olympus: { name: 'Olympus Mons (volcano)', lat: 18.65, lon: -133.8 },
  valles: { name: 'Valles Marineris (canyon)', lat: -13.9, lon: -59.2 },
  gale: {
    name: 'Gale · Curiosity traverse (sols 3–159)',
    lat: galeTraverse.points[0].lat,
    lon: galeTraverse.points[0].lon,
    exactStart: true,
    dem: 'gale',
    telemetry: galeTraverse.points,
    observations: galeObservations.observations,
    observationRadiusM: galeObservations.maxDisplayDistanceM,
    sampleSites: [
      {
        name: 'Rocknest · CheMin samples',
        lat: -4.59002152,
        lon: 137.4483102,
        solRange: [57, 100],
        minerals: 'Basaltic soil: plagioclase, iron-rich olivine, augite and pigeonite.',
      },
    ],
    route: {
      destName: 'End of Curiosity traverse segment · sol 159',
      points: galeTraverse.points,
    },
  },
};
export const DEFAULT_PLACE = 'gale'; // ponto de localização da equipe: Cratera Gale (-4,59; 137,44)

/** Rota de exemplo genérica: ~800 m com uma curva, saindo de (x, z) no rumo `yaw` (o mais plano). */
export function exampleRouteFrom(x, z, yaw) {
  const pt = (d, turn) => ({ x: x - Math.sin(yaw + turn) * d, z: z - Math.cos(yaw + turn) * d });
  return [pt(0, 0), pt(150, 0.05), pt(320, 0.18), pt(520, 0.12), pt(800, -0.02)];
}
