<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep this personal experience on the index route with client-side interaction state; the flower and letter require no accounts or persistent storage.
- Define the love-note visual system in src/styles.css and use the shared Button for interactive controls to keep styling consistent.
- Timeline memories come from src/data/memories.ts (photos in public/memories/); memories added in-page are saved only in the browser (localStorage) so the site stays self-hostable without a backend.
