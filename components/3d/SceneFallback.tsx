/**
 * Rendered in place of a 3D scene when WebGL is unavailable or the renderer
 * fails. Purely decorative: the surrounding sections already carry all the
 * real content, so this only needs to preserve the visual mood.
 */
export function SceneFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-noir"
    >
      <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(173,138,79,0.28),rgba(10,8,6,0)_68%)]" />
      <div className="absolute left-[18%] top-[62%] h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,31,26,0.24),rgba(10,8,6,0)_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-noir/60" />
    </div>
  );
}
