<script lang="ts">
    import { onMount } from "svelte";

    let song: { playing: boolean; title: string; artist: string; album: string; url: string; image: string } | null = null;

    async function fetchCurrentlyPlaying() {
        const res = await fetch('/api/v1/music');
        const data = await res.json();
        if (data.playing) {
            song = {
                playing: data.playing,
                title: data.title,
                artist: data.artist,
                album: data.album,
                url: data.url,
                image: data.image
            };
        } else {
            song = null;
        }
    }

    onMount(() => {
        fetchCurrentlyPlaying();
        const interval = setInterval(fetchCurrentlyPlaying, 10000);
        return () => clearInterval(interval);
    });
</script>

{#if song && song.playing}
  <div class="flex items-center gap-3 p-2 w-fit">
    <img src={song.image} alt={song.album} class="w-20 h-20 rounded"/>
    <div>
      <a class="p-1 text-lg text-green-500 font-bold hover:underline hover:bg-green-500 hover:text-black" href={song.url} target="_blank" rel="noopener noreferrer">
        {song.title}
      </a>
      <p class="text-gray-300 text-base">{song.artist}</p>
    </div>
  </div>
{:else}
  <p>I'm listening to the silence right now :((, come back later!</p>
{/if}