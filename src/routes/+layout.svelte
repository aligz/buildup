<script>
	import '../app.pcss';
</script>

<header class="container pt-3">
	<nav class="flex items-center space-x-4 lg:space-x-6">
		<a
			href="/"
			class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
		>
			Home
		</a>
		<a
			href="/project"
			class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
		>
			Projects
		</a>
	</nav>
</header>
<main class="container">
	<slot />
</main>
