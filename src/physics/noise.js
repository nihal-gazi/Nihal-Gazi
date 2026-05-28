/**
 * Generates continuous organic noise using irrational frequencies.
 * Mimics Brownian motion/thermal noise without the overhead of Perlin noise.
 */
export function harmonicNoise(t, offset, speed = 0.001, amplitude = 1) {
  const time = t * speed;
  
  // Using 1.414 (√2) and 1.732 (√3) guarantees non-repeating interference patterns
  const noise = Math.sin(time + offset) +
                Math.sin(time * 1.414 + offset * 2) * 0.5 +
                Math.sin(time * 1.732 + offset * 3) * 0.25;
                
  // Normalize roughly back to the [-amplitude, amplitude] range
  return (noise / 1.75) * amplitude; 
}