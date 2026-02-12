<script lang="ts">
  import { onMount } from 'svelte';
  let { class: className, ...restProps } = $props();

  onMount(async () => {
    const module = await import('jquery');
    const jq = module.default;
    
    (window as any).jQuery = (window as any).$ = jq;
    
    const terminalPlugin = await import('jquery.terminal');
    if (terminalPlugin && terminalPlugin.default) {
      terminalPlugin.default(window,jq);
    }
    await import('jquery.terminal/css/jquery.terminal.min.css');
    (window as any).figlet = (await import('figlet')).default;

    const { startTerminal } = await import('./terminal.js');
    
    startTerminal();
  });
</script>

<div class={className} {...restProps} id="terminal"  style:--terminal-font-size=0.8rem style:--color=#d1d5dc></div>
