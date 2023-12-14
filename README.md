# Irish Rail Watcher Challenge

The project was implemented using Vue 3 in Vite @node14

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

After a while you should open http://127.0.0.1:5173/ to see the dashboard.

### Compile and Minify for Production

```sh
npm run build
```

## Notes

- To implement the base challenge, I added some logic
  - disabled checkbox for Southbound direction
  - Dublin Pearse station cannot be removed or marked as favourite
  - Dublin Pearse will never be an option in the selector dropdown
- To be able to follow the Southbound and Northbound directions, I added an *S* or *N* letter next to the destination station name in the table. This was not a requirement, however it is useful for tracking the arrivals based on the direction filter.
- New station can be added by selecting from the dropdown. The add button is enabled only if there is a valid selection.
- Next to the name of the station a small heart icon shows if the station is a favourite one or not. The icon is a toggle button. Favourite stations are stored in localStorage for showing them even after page reload.
- In the top right corner there is a small X icon for removing it from the list. If you have a favourite station loaded from localStorage, by removing it, it removes it from the favourites as well.
- The page is responsive, the layout is different and optimised for smaller screens like mobiles.
- The page contains loading screens until the data arrives from the server.
- The refresh interval is configurable, the default value is 30 seconds. In every 30 second the station data is fetched and the UI elements are reloaded automatically.
- The number of visible arrival rows is configurable, the default value is 3.
- I attached some screenshots for the most important states.

### Further improvements

- The project uses minimal type-safe approach. I am really open for further discussion on the advantages of use of typescript.
- The project does not contain unit tests, however I always try to create testable and maintainable code. I am open for further discussion on the test strategies and the overall advantages of it.
- The project does not contain plugins or custom component registrations. I know how to do those things, I am open for further discussion regarding it as well. 

### Updates 05/06/2023

- I added more type-safe checks
- I sorted the visible stations to avoid position changes after toggling a station's favourite property 
- I introduced Pinia store for state management
- I created custom component directives from StationCard and StationCardMessage components. These components are reusable and does not use any store related logic, they communicate with te parent context via props and events.
- I made TheMainContent component async to be able to initialize the whole application only if the base data (stations) can be fetched. With the help of Suspense built-in component it is easier to add loading state and error notification for it.
- I start the data polling functionality only if the initial data fetching was successful and the TheMainContent component is loaded (see <Suspense @resolve="startRefreshService">)
- I cleaned the whole project code 

### Updates 16/06/2023 and a couple of days before

- I added better type-safety by introducing more data types (mostly exported from types.ts file)
- I improved direction store by replacing northbound related method with directions reactive array, that can be used as model on input fields like checkboxes
- I generated checkboxes in DirectionSelector.vue component based on predefined array values exported from constants.ts (*const RAIL_LINE_DIRECTIONS = ["Southbound", "Northbound"]*) With this approach the watched lines could be updated (e.g. adding more lines) easier.
- I removed store dependencies from StationCard.vue component, now it is a cleaner reusable component, communication with its parent context via props
- I removed the unnecessary data fetch on every direction change by storing the station data in the useStation composable unfiltered and let StationCard.vue component filter it using computed property. Now changing the directions does not fetch data from the server, filtering happens on the client side.
- I made favourite sign (heart) visible on the 'No data' cases as well

