## Bug history
- These are bugs that I asked ai to deliberately put into the code without telling me anything about them. I didn't code review anything at this phase as I'm simulating inheriting a messy legacy codebase to aid with my React refresh.

- Project so far
    - created v17 react app
    - I asked ai to deliberately add various layers of bugs, some UX, some 'rushed friday afternoon' coding, some that would cause issues when migrating to v19 react
    - I successfully migrated from v17 to v19 while fixing the migration issues by hand with minimal ai advice and a lot of reading to understand whats exactly changed since react moved from class based to module based etc.

## Bugs by section - identified through manual QA checking
- 20+ bugs found, mixture of logic and bad ux / ui issues.

- issues found: 36

- issues fixed: 0

- issues left: 36

# Home
- [x] bug: when several greetings are displayed, the deletion only works correctly deleting strictly latest to oldest. If I start deleting greetings anywhere else in the stack, eventually there are orphaned entries left which can't be deleted, the UI breaks.
    - FIXED: by learning about useEffect, props, parents etc, and a little nudging from ai. I also spotted an ID issue by myself, you need ID if the greetings will be reordered at some point.

# Contact
- [] bug: draft saved happens on page load... unsure if bug, but I would not save a draft if just loaded this page with empty fields.

- [] bug: no fe validation, if i just type an x in email, nothing happens to show me it invalid

- [] bug: post submit validation on email only goes up to needing an @ and a partial, its not finding the something.com missing.

- [] bug: onion validation... only when the email box no longer has validation does it show that name is too short with single letter.

- [] bad ux: maybe display some rules outside of the validation scope, like 'name must be x length min' for example.

- [] bug: bad email is shown with x@com only when all previous validations have been resolved... theres some weird branching logic somewhere in validation.

- [] bug: validation msgs arent showing next to their field... could be ai's design choice, but I usually put validation messages under the related field.

- [] bug: form doesnt reset after successful send... this could allow for fast spamming.

# Profile
- [] bug: form can be submitted without a display name, display name is pretty fundamental, should be blocked from submitting with empty display name, or at least a warning saying "if you dont put a display name, your username will be displayed instead, accept/confirm"

- [] bug: potential data issue - when saving a profile with Username: s and display name rr, the logger box displays Username: s - rr". it is not clear that display name was saved as its own field.... inspect the data packet.

- [] bug: country dropdown has duplicate entries

# Tasks
- [x] bug: the up and remove text also has the underline when task is checked off... bad ui

- [] bug: checkboxes arent updating properly

- [] bug: small hit box just outside the checkboxes

- [] bug: could be related to another bug, but check box state only updates after switching sub tabs

- [] bug: Add Task should be disabled state if task input is empty

- [] bug: reloading clears storage

# Directory
- [] poor ux: rather than saying "selected [name]" just highlight the row.

- [] bug: when having a change in the search params, whether from clearing it or typing, i would expect the 'is selected' element to reset?

- [] poor ux: took me a while to realise it was also including roles in the search... might be good to have a subtle highlight showing why a match happened OR add a radio button to select by name or engineer OR implement a layered filter, so you select a role set like 'engineer', which filters the list down, and then apply the name searching to that sub group.

# Notes
- [] ux: preview text is unecessary, its not a complicated entry system

- [] ui: no character count, would be useful to know how much space left

- [] ui: pin button appears centered, ui should appear in same relative place regardless of content, ie inline with the title in this layout.

- [] ui:  pinning does nothing except add a star, adding a star is usually an indication of favouriting an item, should probably be a pin icon

- [] ui: as a typical user, i would expect pinning something to bump the display order to the top of the list, or at bottom of other pinned items.

- [] ui: no delete button

# Activity
- [] bug: events on other tabs arent being tracked, just has the initial starting dummy data.

- [] bug: sorting options work, and does take into account filter input when selecting relevance... but 'sorted by score' means nothing... should say 'sorted by relevance' and then the search term possibly?

# Team
- [] ux: no delete button

- [] ux: if this role management, there should also be a demote option

- [] bug: role position is inconsistent, with have consistent column spacing, or place the role on the line below

- [] ui: why is there is there a blue edge on the left? serves no purpose, looks like a visual bug.

- [] ui: poor filtering options or grouping options, i would expect to be able to see just the members for example.

# Help
come back to this section, not sure on intent of the ui / ux, needs a deeper triage to see if there are clues in the code.

- bug: tbc

# Footer
- [] bug: visits arent being tracked

- [] ux: not sure what session tick is tracking exactly, but as it has no context, i would assume it's tracking every click, not every keypress... if so, then it's currently only incrementing when switching tabs, not clicks on any buttons. It only makes sense if its tracking 'pages visited'... triage