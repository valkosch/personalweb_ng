<script >
  import { onMount, createEventDispatcher } from 'svelte';
  import createLayout from './common/justified-layout';
  import elementResizeEvent, { unbind } from 'element-resize-event';
  import LazyImage from './LazyImage.svelte';
  import { debounce } from './common/utils';

  function makeStyle({ scaledWidth, scaledHeight, isLastInRow, isLastRow }) {
    let mr = padding + 'px';
    const mb = isLastRow ? '0' : mr;
    let flex = `0 0 ${scaledWidth}px`;
    if (isLastInRow) {
      mr = '0';
      flex = `1 1 ${scaledWidth-4}px`;
    }
    return `height:${scaledHeight}px; flex: ${flex}; margin-right:${mr}; margin-bottom: ${mb}`;
  }

  function onClick(index) {
    dispatch('image-click', {
      image: images[index],
      index
    });
  }

  const dispatch = createEventDispatcher();

  let { images = [], targetRowHeight = 220, padding = 4} = $props();

  let element = $state();
  let scaledImages = $state([]);
  let width = $state();
  let isResizing = $state(false);

  $effect(() => {
    if (width) {
    scaledImages = createLayout({
      images,
      containerWidth: width,
      targetHeight: targetRowHeight,
      padding
    });
    }
  });

  onMount(() => {
    width = element.getBoundingClientRect().width;

    const resizedFinished = debounce(() => {
      isResizing = false;
    }, 100);

    elementResizeEvent(element, () => {
      if (Math.round(width) !== Math.round(element.getBoundingClientRect().width)) {
        isResizing = true;
        width = element.getBoundingClientRect().width;
        resizedFinished();
      }
    });

    return () => unbind(element);
  });
</script>

<div class="w-full  {isResizing ? 'overflow-hidden' : ''}">
  <div data-resizer bind:this={element}></div>
  <div class="flex flex-wrap" style="width: {width}px">
    {#each scaledImages as image (image.src)}
      <button type="button" class="relative bg-gray-600" style={makeStyle(image)} onclick={() => onClick(image.index)}>
        <LazyImage {...image} />
        <slot {image}></slot>
      </button>
    {/each}
  </div>
</div>