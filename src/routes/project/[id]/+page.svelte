<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
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
		<h2 class="mb-3 text-2xl">Add Page</h2>
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
					<Card.Root>
						<Card.Header>
							<Card.Title>{page.name}</Card.Title>
							<Card.Description>{page.description}</Card.Description>
						</Card.Header>
						<Card.Content>
							<Button>Add Field</Button>
							<ul class="mt-3">
								<li>
									<span>Nama User</span>
									<span class="font-mono text-gray-500">users.name</span>
								</li>
								<li>
									<span>Email User</span>
									<span class="font-mono text-gray-500">users.email</span>
								</li>
								<li>
									<span>Password</span>
									<span class="font-mono text-gray-500">users.password</span>
								</li>
							</ul>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		{:else}
			<div class="text-center text-secondary">No page found</div>
		{/if}
	</div>
</div>
