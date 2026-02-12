<script lang="ts">
    import { on } from "svelte/events";
    let { post_number } = $props();
    type Post = {
        title: string;
        link: string;
        date: string;
        description: string;
        categories: string[];
    }
    let posts: Post[] = $state([]);
    try {
        async function loadPosts() {
            const res = await fetch('https://blog.v41k0.xyz/blog/rss.xml');
            const text = await res.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "text/xml");
            const items = Array.from(xml.querySelectorAll("item")).slice(0, post_number);
            items.forEach(item => {
                const title = item.querySelector("title")?.textContent || '';
                const link = item.querySelector("link")?.textContent || '';
                const date = item.querySelector("pubDate")?.textContent || '';
                const description = item.querySelector("description")?.textContent || '';
                const categories = Array.from(item.querySelectorAll("category")).map(cat => cat.textContent || '');
                posts = [...posts, { title, link, date, description, categories }] 
            });
        }
        $effect(() => {loadPosts()});
        
    } catch (e) {
        console.error('Error loading post', e);
    }
</script>
<div class="flex flex-col">
    {#each posts as post}
        <div class="mb-4 p-4 bg-stone-900 rounded-lg shadow-lg/50 overflow-auto">
        <a href={post.link} target="_blank" rel="noopener noreferrer" class="p-1 text-lg text-green-500 font-bold hover:underline hover:bg-green-500 hover:text-black">{post.title}</a>
            <p class="text-gray-400 text-sm">{new Date(post.date).toLocaleDateString()}</p>
            <p class="text-gray-300 mt-2">{post.description}</p>
            <div class="mt-2 flex flex-wrap">
                {#each post.categories as category}
                    <a href={`https://blog.v41k0.xyz/blog/tags/${category.toLowerCase()}`} class="text-sm text-lime-500 hover:underline mr-2">#{category}</a>
                {/each}
            </div>
        </div>
    {/each}
</div>