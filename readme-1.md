

# Process

## Design sketches
1. list view
2. master/detail view
   1. desktop view: list on the left, detail on the right
   2. mobile view: hide list view, ony show detail view

## Components:
      
1. `Ticket`:
   1. Description 
   2. `AssigneeButton`: dropdown list of users
   3. `StatusButton`: click to toggle status between 'completed' and 'pending'
   4. `EditButton`: icon button, click to navigate to edit page
   5. State: `isSelected`, 
      1. if true, change background color to indicate selection.
      2. optional: check if in view, if not, scroll to it.

2. `TicketMasterDetail`:
   1. root component hosting list and detail view
      1. left side: `TicketList`
      2. right side: `TicketDetail`

3. `TicketList`:
   1. a list of `Ticket`
   2. Height: parent height - title height, overflow: auto  

4. `TicketDetail`:
   1. Form: description (multiple line textarea), assignee: autocomplete, status: switch
   2. form height: parent height - padding - bottom action bar height, overflow: auto
   3. Bottom action bar: 
      1. `SaveButton`: icon button, click to save
      2. `CancelButton`: icon button, click to cancel
   4. validation: description is required
   
5. `TopBar`:
   1. Title
   2. `NewTicketButton`: click to navigate to detail page with param 'new'
   3. `FilterMenu`: multiple autocomplete
   
## Backend
Go through backend code and fix any issues as I see them
1. adjust functions: 
   1. private `findTicketById` and `findByUserId` return object found or undefined so their signatures are honest.
   2. Errors of above functions are handled upstream. 
   3. Added methods return signatures to be concise, but it is not necessary when the functions are tested and stable.
   4. change `complete` function to `toggleComplete`