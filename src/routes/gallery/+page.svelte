<script lang="ts">
  import ImageMasonry from '$lib/components/ui/masonry/ImageMasonry.svelte';
  import PhotoSwipe from 'photoswipe';
  import 'photoswipe/style.css';

  let { data } = $props();


  function onClick(event) {
    const dataSource = images.map((img, index) => {
        return {
            src: img.src,
            msrc: img.msrc,
            width: img.width,
            height: img.height,
        };
    });
    const options = {
        dataSource,
        index: event.detail.index,
        bgOpacity: 0.8,
        loop: true,
        wheelToZoom: true,
        arrowKeys: true,
        escKey: true,
        closeOnVerticalDrag: true,
        showHideOpacity: true,
    };
    const pswp = new PhotoSwipe(options);
    pswp.init();
  }

  let element;
  let images = $derived(data.images);
  let targetRowHeight = 220;

</script>

<div class="w-4/5 bg-black m-2 p-2 rounded-lg md:w-2/3" bind:this={element}>
  <ImageMasonry images={images} targetRowHeight={targetRowHeight} on:image-click={onClick} let:image={image}></ImageMasonry>
</div>
