import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.ts';
import { videos } from '../src/data/videos.ts';

const supplied = ['chamachain', 'hevloys-group', 'forex-watch', 'njia-automations', 'akilitechnologies', 'evanscave', 'hevloysprojectslinks', 'legionix', 'eliteroutine', 'theelitecode', 'eliteworkout', 'cyberhealth', 'hevloys-agency', 'hevloys-logistics', 'fairstar', 'pass-key-254', 'kenya-heartbreak-insurance-funding', 'kenya-heartbreak-insurance-fund', 'strong-starlight', 'tos-complaint', 'greenlight-domains', 'hevloys-industries'];

test('all 22 supplied project URLs are registered', () => {
  for (const s of supplied) assert.ok(projects.some((p) => p.url === `https://${s}.netlify.app/`), s);
});
test('Jua Kali, Mkazi and Whos4K are present', () => {
  for (const id of ['jua-kali', 'mkazi', 'whos4k']) assert.ok(projects.find((p) => p.id === id), id);
});
test('ids are unique', () => {
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
  assert.equal(new Set(videos.map((v) => v.id)).size, videos.length);
});
test('project video references resolve', () => {
  for (const p of projects) for (const v of p.videoIds ?? []) assert.ok(videos.find((x) => x.id === v), `${p.id} -> ${v}`);
});
