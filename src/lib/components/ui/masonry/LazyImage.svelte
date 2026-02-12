<script>
  import { onMount } from 'svelte';
  import { cache } from './cache';
  import whenElementVisible from './common/when-element-visible';
  import { fade } from 'svelte/transition';

  function onLoad() {
    cache[msrc] = true;
    isLoaded = true;
  }

  let { msrc = '', srcset = '', alt = '' } = $props();

  let element = $state();
  let isLoaded = $state(false);
  let isVisible = $state(false);

  if(cache[msrc]) {
    isLoaded = true;
    isVisible = true;
  }

  onMount(() => {
    if (isLoaded) {
      return;
    }

    const disconnect = whenElementVisible(element, () => {
      isVisible = true;
    });

    return () => {
      disconnect();
    }
  });
</script>

<div data-masonry-image class="w-full h-full relaitve block transition-opacity duration-700 ease-in-out {isLoaded ? 'opacity-100' : 'opacity-0'}" bind:this={element}>
  {#if isVisible}
    <img
      class="w-full h-full block"
      onload={onLoad}
      src={msrc}
      {srcset}
      {alt}
    />
  {/if}
</div>