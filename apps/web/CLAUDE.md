We are using Faker.js to generate all mock data throughout the application, including dynamic parameters used in URL structures and navigation (e.g., Next.js routes). This means that all IDs used in routes will be randomly generated on each test run.

For example, a URL like /items/{itemId}/details/{detailsId} will contain randomized itemId and detailsId values on every execution.

Guidelines for Testing Navigation:
• When writing or maintaining navigation tests, do not rely on specific ID values, as they will change every time.
• Focus on testing the base path structures that are not dependent on random parameters (e.g., /items, /dashboard, etc.).
• If a test must validate full navigation paths, ensure it analyzes and adapts to the dynamic segments rather than expecting fixed values.

Always identify which parts of the route are dynamic and structure your tests accordingly to avoid brittle or failing test cases due to randomized data.

Make sure you validate all testIds and try to only test towards testIds.

All faker data loads for a minimal of 1 sec. Make sure to take that in to consideration when writing tests. As we will have a loading state on page load.

If there is nested loading we accuire more loading time. then wait for max 20 sec. For complete loading.
