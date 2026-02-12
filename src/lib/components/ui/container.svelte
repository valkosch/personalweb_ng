<script lang="ts">
    import { slide } from "svelte/transition";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    let { children } = $props();

    let visible = $state(false);
    onMount(() => {
        visible = true;
    });
    
</script>
{#if visible}
    <div class="text-base text-gray-300 w-full p-4 bg-black rounded-lg shadow-lg/50" transition:slide={{ duration: 500 }}>
        {@render children()}
    </div>
{/if}