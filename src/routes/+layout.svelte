<script lang="ts">
	import '@fontsource/ubuntu-mono/400.css';
	import '@fontsource/ubuntu-mono/700.css';
	import '../app.css';

	const buttons = [
		{ href: "https://landchad.net/", src: "landchad.gif", alt: "Landchad" },
		{ href: "", src: "88x31-your-ad.gif", alt: "Your Ad Here" },
		{ href: "", src: "by_cyber-rot_on_neocities.png", alt: "Cyber-rot" },
		{ href: "", src: "dos.gif", alt: "DOS" },
		{ href: "", src: "drmario.gif", alt: "Dr. Mario" },
		{ href: "", src: "f_ckfb.gif", alt: "Fuck FB" },
		{ href: "", src: "f_ckingwww.gif", alt: "Fuck the WWW" },
		{ href: "", src: "free-sex.gif", alt: "Free Sex" },
		{ href: "", src: "gnu-linux.gif", alt: "GNU Linux" },
		{ href: "", src: "google_stand.gif", alt: "Google Stand" },
		{ href: "", src: "linuxnow2.gif", alt: "Linux Now" },
		{ href: "", src: "proxmox.gif", alt: "Proxmox" },
		{ href: "", src: "say-no-to-web3.gif", alt: "No Web3" },
		{ href: "", src: "vim.vialle.love.anim.gif", alt: "Vim" },
	];

	import saddam from '$lib/assets/images/saddam.jpg'
	let { children } = $props();
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/src/lib/assets/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/src/lib/assets/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/src/lib/assets/favicon-16x16.png">
	<link rel="manifest" href="/src/lib/assets/site.webmanifest">
	<title>Mi websitio</title>
</svelte:head>
<header class="w-full py-2 shadow-xl/50 bg-black text-white text-lg font-bold">
	<div class="ml-10">
		<nav>
			<ul class="flex space-x-10">
				<li><a class="p-1 hover:bg-white hover:text-black" href="/">~</a></li>
				<li><a class="p-1 hover:bg-white hover:text-black" href="/gallery">/gallery</a></li>
			</ul>
		</nav>
	</div>
</header>
<main class="min-h-screen flex flex-col items-center">
	{@render children()}
</main>
<footer class=" w-full p-2 bg-black text-white text-center">
	<div class="flex flex-row flex-wrap justify-center gap-2 mb-4">
		{#each buttons as { href, src, alt }}
			<a href={href}>
				<img
					src='/src/lib/assets/images/88x31/{src}'
					{alt}
					width="88"
					height="31"
					loading="lazy"
				/>
			</a>
		{/each}
		<img
			src={saddam}
			alt="Saddam"
			width="88"
			height="31"
			loading="lazy"
		/>
	</div>
	<p>&copy; {new Date().getFullYear()} websitio de valko. All rights reserved since 10.000BC - End of time</p>
</footer>
