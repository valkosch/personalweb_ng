export async function load() {
    const images = await fetch('https://webapp-bucket.assets.v41k0.xyz/manifest.json')
    .then(res => res.json())
    return { images };
}