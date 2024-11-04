# Pokémon Inventory Management Web App

A simple web application for managing a Pokémon inventory. Users can store, view, filter, add, edit, and delete Pokémon entries in a Pokédex format.

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
