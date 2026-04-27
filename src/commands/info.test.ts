import { describe, it, expect, vi } from 'vitest';
import { data, execute } from './info';

describe('/info command', () => {
  it('имя команды — info', () => {
    expect(data.name).toBe('info');
  });

  it('описание команды не пустое', () => {
    expect(data.description.length).toBeGreaterThan(0);
  });

  it('отвечает эмбедом с тремя полями', async () => {
    const reply = vi.fn();
    const interaction = { reply } as any;

    await execute(interaction);

    expect(reply).toHaveBeenCalledOnce();
    const { embeds } = reply.mock.calls[0][0];
    expect(embeds).toHaveLength(1);
    expect(embeds[0].data.fields).toHaveLength(3);
  });

  it('эмбед содержит ссылки на сайт, донат и телеграм', async () => {
    const reply = vi.fn();
    await execute({ reply } as any);

    const fields: { name: string; value: string }[] = reply.mock.calls[0][0].embeds[0].data.fields;
    const values = fields.map(f => f.value);

    expect(values.some(v => v.includes('heavenlyweiner.ru'))).toBe(true);
    expect(values.some(v => v.includes('donate.heavenlyweiner.ru'))).toBe(true);
    expect(values.some(v => v.includes('t.me/heavenlyweiner'))).toBe(true);
  });
});
