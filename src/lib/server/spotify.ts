import {CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN} from '$env/static/private';
import { json } from '@sveltejs/kit';

let ACCESS_TOKEN: string | null = null;

type SimplifiedArtist = {
    name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
};

async function refreshAccessToken() {
    const res = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH_TOKEN,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        })
    });
    const data = await res.json();
    ACCESS_TOKEN = data.access_token;
}

export async function GetCurrentPlaying() {
    try {
        if (!ACCESS_TOKEN) await refreshAccessToken();

        const playerRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
                    });

        if (playerRes.status === 204 || playerRes.status === 400) {
            return json({ playing: false });
        }
        const data = await playerRes.json();
        if(!data?.item) {
            return json({ playing: false });
        }
        return json({
            playing: true,
            title: data.item.name,
            artist: data.item.artists.map((a: SimplifiedArtist) => a.name).join(', '),
            album: data.item.album.name,
            url: data.item.external_urls.spotify,
            image: data.item.album.images[0]?.url,
            preview_url: data.item.preview_url
        }, { headers: { 'Cache-Control': 'no-cache' } });
    } catch (err: any) {
        if (err instanceof Error) {
            console.error('Error fetching now playing:', err.message);
        } else {
            console.error('Error fetching now playing:', err);
        }

        const status = (err as any)?.response?.status;
        if (status === 401) {
            await refreshAccessToken();
            return await GetCurrentPlaying();
        }

        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
