import { consoleProfile } from '../data/content';
import { Drawer } from './shared';

export function ConsoleDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const c = consoleProfile;
  return (
    <Drawer open={open} onClose={onClose} label="Console mode: engineering profile">
      <p className="label text-cobalt">Console mode</p>
      <h2 className="mt-2 font-display text-4xl font-extrabold uppercase">The engineering environment</h2>
      <p className="mt-4 text-mute leading-relaxed">The real tools behind the experiments. Specifications are founder-provided and editable. This is modest hardware, chosen deliberately: the message is resourcefulness, not raw power.</p>

      <h3 className="label mt-10 mb-3">Hardware</h3>
      <dl className="border-t hairline">
        {c.hardware.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b hairline py-3">
            <dt className="font-mono text-xs uppercase text-mute">{k}</dt><dd className="font-head text-sm text-ink text-right">{v}</dd>
          </div>
        ))}
      </dl>

      <h3 className="label mt-10 mb-3">Software & development tools</h3>
      <p className="font-mono text-sm text-ink leading-loose">{c.software.join('  ·  ')}</p>

      <h3 className="label mt-10 mb-3">Market tooling</h3>
      <p className="font-mono text-sm text-ink">{c.markets.join('  ·  ')}</p>

      <h3 className="label mt-10 mb-3">Computational approach</h3>
      <p className="text-mute leading-relaxed">{c.approach}</p>

      <h3 className="label mt-10 mb-3">Current technical interests</h3>
      <ul className="grid gap-2">{c.interests.map((i) => <li key={i} className="border-l-2 border-cobalt pl-3 font-head text-sm">{i}</li>)}</ul>
    </Drawer>
  );
}
