<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	let showProjectForm = $state(false);

	const form = superForm(data.form);

	const { form: formData, enhance } = form;
</script>

<div class="py-10">
	<h1 class="mb-6 scroll-m-20 text-4xl tracking-tight lg:text-5xl">
		Start <b>BuildUp!</b> today
	</h1>
	{#if showProjectForm}
		<div class="mb-5">
			<form action="?/create_project" method="POST" use:enhance>
				<Form.Field {form} name="name">
					<Form.Control let:attrs>
						<Form.Label>Project Name</Form.Label>
						<Input {...attrs} bind:value={$formData.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="description">
					<Form.Control let:attrs>
						<Form.Label>Project Description</Form.Label>
						<Textarea {...attrs} bind:value={$formData.description} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Create</Form.Button>
			</form>
		</div>
	{/if}
	<Button
		size="lg"
		on:click={() => {
			showProjectForm = !showProjectForm;
		}}
		>{@html showProjectForm ? 'Hide' : 'Create&nbsp;<b>Project</b>'}
	</Button>
	<div class="py-10">
		{#if data.projects.length}
			<div class="grid grid-cols-4 gap-2">
				{#each data.projects as project}
					<a href="/project/{project.id}">
						<Card.Root class="hover:shadow-md">
							<Card.Header>
								<Card.Title>{project.name}</Card.Title>
								<Card.Description>{project.description}</Card.Description>
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
