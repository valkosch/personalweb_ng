<script>
    import Terminal from '$lib/components/terminal/terminal.svelte';
    import Container from '$lib/components/ui/container.svelte';
    import MusicStatus from '$lib/components/ui/MusicStatus.svelte';
    import RecentPosts from '$lib/components/ui/RecentPosts.svelte';
    import Tree from '$lib/components/ui/Tree.svelte';
</script>
<div class="my-5 w-4/5 max-w-2xl min-h-screen flex flex-col items-center gap-4 md:w-2/3">
    <Terminal class="overflow-y-auto rounded-lg shadow-lg/50 max-h-400 h-1/3 !w-full"/>
    <Container>
        <h2 class="text-white text-xl font-bold mb-4">Bienvenido a mi sitio web</h2>
        <p class="text-gray-300">Este es un sitio web personal. Aquí encontrarás información sobre mí, mis proyectos y mis intereses.</p>
    </Container>
    <Container>
        <h2 class="text-white text-xl font-bold mb-4">¿Qué estoy escuchando?</h2>
        <MusicStatus />
    </Container>
    <Container>
        <h2 class="text-white text-xl font-bold mb-4">Mis publicaciones recientes</h2>
        <RecentPosts post_number={5} />
        <a href="https://blog.v41k0.xyz/blog/rss.xml" class="flex items-center gap-2 mt-4 text-sm text-lime-500 hover:bg-lime-500 hover:text-black p-1" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rss">
                  <path d="M4 11a9 9 0 0 1 9 9"></path>
                  <path d="M4 4a16 16 0 0 1 16 16"></path>
                  <circle cx="5" cy="19" r="1"></circle>
              </svg>
              subscribe to my RSS feed
        </a>
    </Container>
    <Container>
        <h2 class="text-white text-xl font-bold mb-4">Charlemos!</h2>
        <p class="text-gray-300">Si quieres contactarme, puedes enviarme un correo electrónico a valkosch [at] proton.me</p>
        <p class="text-white">Mándame un mensaje y vamos a malgastar recursos del gobierno!</p>
        <p class="text-lime-300 text-sm font-mono mt-4 whitespace-pre overflow-x-scroll">
-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEZwuDhxYJKwYBBAHaRw8BAQdAL6kdoTvrCOCgY3f9I/b2xVIdkMTdArLd
9f+IS3ErEUvNJ3ZhbGtvc2NoQHByb3Rvbi5tZSA8dmFsa29zY2hAcHJvdG9u
Lm1lPsKMBBAWCgA+BYJnC4OHBAsJBwgJkNFSnwZ9mXqYAxUICgQWAAIBAhkB
ApsDAh4BFiEEkPUSIcJsYtRKBi800VKfBn2ZepgAAJzgAQDji2+VS8Icy8/X
HEeR9q5xlY5mdus4L6IAOhlmo/x4cQEA0W3ngyXh44oLHYAn3xTKL71XHHBD
j7U7O7DM7ga3WA3OOARnC4OHEgorBgEEAZdVAQUBAQdAlmqwPNGMVmL6iN+t
w7WFaWhJ+lxOaePRkJG4OKC+MHEDAQgHwngEGBYKACoFgmcLg4cJkNFSnwZ9
mXqYApsMFiEEkPUSIcJsYtRKBi800VKfBn2ZepgAAGimAP94eCxC1e+KjD6B
0pyX+0em7F8icBpmXoeagcYZrHdiMAEAjCTPtyDy9j6t8gCcSYUvYncri6Np
295YUlHH76+DVgg=
=oqrr
-----END PGP PUBLIC KEY BLOCK-----
        </p>
    </Container>
</div>
