<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const form = superForm(data.form);

	const { form: formData, enhance } = form;
</script>

<div class="py-10">
	<h1 class="mb-6 scroll-m-20 text-4xl tracking-tight lg:text-5xl">
		{data.project.name}
	</h1>
	<p>{data.project.description}</p>

	<div class="my-5">
		<h2 class="text-2xl mb-3">Add Page</h2>
		<form action="?/create_page" method="POST" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Page Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Page Description</Form.Label>
					<Textarea {...attrs} bind:value={$formData.description} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Create</Form.Button>
		</form>
	</div>

	<div class="py-10">
		{#if data.project.pages.length}
			<div class="grid grid-cols-4 gap-2">
				{#each data.project.pages as page}
					<a href="/project/{data.project.id}/{page.id}">
						<Card.Root class="hover:shadow-md">
							<Card.Header>
								<Card.Title>{page.name}</Card.Title>
								<Card.Description>{page.description}</Card.Description>
							</Card.Header>
							<Card.Content></Card.Content>
						</Card.Root>
					</a>
				{/each}
			</div>
		{:else}
			<div class="text-center text-secondary">No project found, start create project today</div>
		{/if}
	</div>
</div>