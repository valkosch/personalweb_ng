import { GetCurrentPlaying } from "$lib/server/spotify";

export async function GET() {
    return await GetCurrentPlaying();
}