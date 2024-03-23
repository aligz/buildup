<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	let { data } = $props();
</script>

<div class="py-10">
	<h1 class="mb-6 scroll-m-20 text-4xl tracking-tight lg:text-5xl">
		Start <b>BuildUp!</b> today
	</h1>
	<Button size="lg">Create&nbsp;<b>Project</b></Button>
	<div class="py-10">
		{#if data.projects.length}
			{#each data.projects as project}
				<div class="grid grid-cols-4 gap-2">
					<a href="/project/{project.id}">
						<Card.Root class="hover:shadow-md">
							<Card.Header>
								<Card.Title>{project.title}</Card.Title>
								<Card.Description>{project.description}</Card.Description>
							</Card.Header>
							<Card.Content></Card.Content>
						</Card.Root>
					</a>
				</div>
			{/each}
		{:else}
			<div class="text-center text-secondary">No project found, start create project today</div>
		{/if}
	</div>
</div>
