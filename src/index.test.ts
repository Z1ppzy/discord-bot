import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPlayerCount } from './minecraft';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('fetchPlayerCount', () => {
  it('возвращает количество игроков при успешном ответе', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ players: { online: 42 } }),
    }));

    const result = await fetchPlayerCount('mc.example.com');
    expect(result).toBe(42);
  });

  it('возвращает null если сервер недоступен (ok: false)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const result = await fetchPlayerCount('mc.example.com');
    expect(result).toBeNull();
  });

  it('бросает ошибку если fetch упал по сети', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));

    await expect(fetchPlayerCount('mc.example.com')).rejects.toThrow('network error');
  });

  it('передаёт правильный IP в URL', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ players: { online: 5 } }),
    });
    vi.stubGlobal('fetch', mockFetch);

    await fetchPlayerCount('mc.heavenlyweiner.ru');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.mcstatus.io/v2/status/java/mc.heavenlyweiner.ru'
    );
  });
});
