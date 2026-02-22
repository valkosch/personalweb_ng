export async function load() {
    try {
        const res = await fetch('https://webapp-bucket.assets.v41k0.xyz/manifest.json')
        if (!res.ok) {
            throw new Error('Failed to fetch storage manifest');
        }
        const images = await res.json();
        return { images };

    } catch (err) {
        console.error('[Gallery Fatal Error]:', err);
        throw new Error('Could not connect to the storage server.');    
    }
}