export default {
	common: {
		copyrightHtml: '© 2019 Daisy, Inc.',
		menuItems: {
			calculator: 'Calculator',
			exercises: 'Exercises',
			food: 'Food',
			home: 'Home',
			recipes: 'Recipes',
		},
		units: {
			calories: 'kcal',
			grams: 'g',
			milliliters: 'ml',
			percent: '%',
			energy: 'kJ',
			minutes: 'min | mins',
			pieces: 'piece | pieces',
			plates: 'plate | plates',
		},
		notifications: {
			unknownErrorOccurred: 'Sorry, but an unknown error occurred.',
		},
	},
	home: {
		view: {
			title: 'Home',
			descriptionHtml: `
				<p>Nothing here yet, but I guess you’ve noticed it without me writing this down… <b>haha</b>.</p> <p>I use this 
				page to test out new or existing components while developing.</p> <p>In the future some useful <b>widgets</b> 
				might be available here, <b>settings</b>, etc.</p> <p>Or I’ll just delete this view, who knows…</p>\n
			`,
		},
	},
	calculator: {
		view: {
			title: 'Calculator',
			saveAsRecipeButton: 'Save as recipe',
			descriptionHtml: `
				<p>On this page you can calculate a calorie and macro summary of different food combinations.</p> <p>Search for 
				food using the <b>food search module</b> on the right-hand side and add food to the calorie calculator by 
				clicking on an item.</p> <p>You can customize the <b>serving amount</b> of the added food using the <b>inputs in 
				the calculator table</b>.</p> <p>A <b>trash icon</b> will appear on items when hoovered, click on this icon to remove 
				an item from the table.</p>\n
			`,
		},
		table: {
			addItem: 'Add new item',
			header: {
				name: 'Name',
				serving: 'Serving',
				calories: 'Calories',
				carbs: 'Carbs',
				protein: 'Protein',
				fat: 'Fat',
				summary: 'Summary',
			},
		},
		selector: {
			food: {
				accordionLabel: 'Food selector',
				searchPlaceholder: 'Search for food',
				noItemsFound: 'No food found.',
			},
			recipe: {
				accordionLabel: 'Recipe selector',
				searchPlaceholder: 'Search for recipes',
				noItemsFound: 'No recipes found.',
			},
			exercise: {
				accordionLabel: 'Exercise selector',
				searchPlaceholder: 'Search for exercises',
				noItemsFound: 'No exercises found.',
			},
		},
	},
	food: {
		view: {
			title: 'Food',
			descriptionHtml: `
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed erat viverra, egestas mi et, tempor augue. 
			Nulla id nisl sollicitudin, imperdiet nisl nec, sagittis enim. Aliquam purus tellus, vulputate elementum rhoncus 
			vel, vulputate eget nisi.
			`,
			newFoodDefaultTitle: 'New food',
			newButton: 'New food',
			saveButton: 'Save food',
			deleteButton: 'Delete food',
			searchPlaceholder: 'Search food',
			form: {
				name: 'Name',
				serving: 'Serving',
				unit: 'Unit',
				calories: 'Calories',
				carbs: 'Carbs',
				protein: 'Protein',
				fat: 'Fat',
				energy: 'Energy',
				saturatedFat: 'Saturated fat',
				sugar: 'Sugar',
				fiber: 'Fiber',
				salt: 'Salt',
				description: 'Description',
			},
			notifications: {
				saved: 'Food successfully saved.',
				deleted: 'Food successfully deleted.',
			},
		},
		table: {
			noFoodFound: 'No food found.',
			header: {
				name: 'Name',
				serving: 'Serving',
				calories: 'Calories',
				carbs: 'Carbs',
				protein: 'Protein',
				fat: 'Fat',
			},
		},
	},
	recipes: {
		view: {
			title: 'Recipes',
			descriptionHtml: `
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed erat viverra, egestas mi et, tempor augue. 
				Nulla id nisl sollicitudin, imperdiet nisl nec, sagittis enim. Aliquam purus tellus, vulputate elementum rhoncus 
				vel, vulputate eget nisi.
			`,
			newRecipeDefaultTitle: 'New recipe',
			newButton: 'New recipe',
			saveButton: 'Save recipe',
			deleteButton: 'Delete recipe',
			searchPlaceholder: 'Search recipes...',
			form: {
				name: 'Name',
				description: 'Description',
			},
			notifications: {
				saved: 'Recipe successfully saved.',
				deleted: 'Recipe successfully deleted.',
			},
		},
		table: {
			noRecipeFound: 'No recipe found.',
			header: {
				name: 'Name',
				calories: 'Calories',
				carbs: 'Carbs',
				protein: 'Protein',
				fat: 'Fat',
			},
		},
	},
	exercises: {
		view: {
			title: 'Exercises',
			descriptionHtml: `
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed erat viverra, egestas mi et, tempor augue. 
				Nulla id nisl sollicitudin, imperdiet nisl nec, sagittis enim. Aliquam purus tellus, vulputate elementum rhoncus 
				vel, vulputate eget nisi.
			`,
			newExerciseDefaultTitle: 'New exercise',
			newButton: 'New exercise',
			saveButton: 'Save exercise',
			deleteButton: 'Delete exercise',
			searchPlaceholder: 'Search exercises',
			form: {
				name: 'Name',
				calorieBurn: 'Calorie burn',
				duration: 'Duration',
				description: 'Description and notes',
			},
			notifications: {
				saved: 'Exercise successfully saved.',
				deleted: 'Exercise successfully deleted.',
			},
		},
		table: {
			noExerciseFound: 'No exercise found.',
			header: {
				name: 'Name',
				calorieBurn: 'Calorie burn',
				duration: 'Duration',
			},
		},
	},
};
