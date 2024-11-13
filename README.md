# Pokémon Inventory Management Web App

A simple web application for managing a Pokémon inventory. Users can store, view, filter, add, edit, and delete Pokémon entries in a Pokédex format.


<div style="display: flex; justify-content: space-around;">
    <img src="https://github.com/user-attachments/assets/92800e2d-21d4-415c-b1c0-5b34efda3af1" width="440" />
    <img src="https://github.com/user-attachments/assets/eeae2a3d-971f-461c-b034-19c0c854049b" width="300" />
</div>

## he

### Pokémon Table
- `pokemon(_pokedex_id_, name, type_1, type_2, height, weight)`
  - **Primary Key**: _pokedex_id_

### Inventory Table
- `inventory(_id_, _pokedex_id_ (fk), nickname, level, attack, defense, height, weight)`
  - **Primary Key**: _id_
  - **Foreign Key**: _pokedex_id_ (fk) references `pokemon(_pokedex_id_)`

### Types Table
- `types(_type_id_, type_name)`
  - **Primary Key**: _type_id_

### Pokémon Types Table (For Many-to-Many Relationship)
- `pokemon_types(_pokedex_id_ (fk), _type_id_ (fk))`
  - **Foreign Keys**: 
    - _pokedex_id_ (fk) references `pokemon(_pokedex_id_)`
    - _type_id_ (fk) references `types(_type_id_)`


## Features
- **View Pokémon**: See a list of Pokémon with their attributes.
- **Filter by Type**: Use a dropdown to view Pokémon by their type (e.g., Grass, Fire).
- **Add Pokémon**: Add new Pokémon to the inventory.
- **Edit Pokémon**: Update details of an existing Pokémon.
- **Delete Pokémon**: Remove a Pokémon from the inventory.

## Technologies
- **Frontend**: React.js, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Installation

### Prerequisites
- **Node.js**: Install from [Node.js website](https://nodejs.org/)
- **MySQL**: Install and set up a local database with MySQL Workbench or CLI


## Usage
- **Inventory Table**: View Pokémon with attributes such as nickname, level, and attack.
- **Type Filter**: Select a Pokémon type from the dropdown to filter the table.
- **Add/Edit Pokémon**: Use the form to add or update Pokémon details.
- **Delete Pokémon**: Click the delete button to remove an entry from the inventory.

## API Endpoints
- **/api/inventory**: Get, add, update, and delete Pokémon entries
- **/api/types**: Retrieve available Pokémon types
- **/api/greeting**: Get a greeting message from the backend

## Future Improvements
- **Pagination**: Handle large inventories more effectively.
- **Sorting and Searching**: Add sorting by level, attack, or nickname.
- **User Authentication**: Enable multiple users with separate inventories.

--- 
