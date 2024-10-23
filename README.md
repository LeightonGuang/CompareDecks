# Compare Decks

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## About

Compare Decks is a web application comparison tool for comparing
whatever you want, whether it be products, books, movies, card games, services, or anything else.

<!-- ## Features

- Create a deck and add cards to it
- Compare multiple cards at once
- Edit and delete decks
- Edit and delete cards
-->

## Development

This project was created with the Next.js starter template and uses TypeScript. It is using Supabase for the database. The frontend is built with Tailwind CSS.

## Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/eafede55-9ddf-4356-abc8-3e0c4d65433c/deploy-status)](https://app.netlify.com/sites/comparedecks/deploys)

This project is deployed on Netlify.

Link: https://comparedecks.netlify.app

## Supabase Database Schema Design

### Decks

| Column Name | Data Type                  | Description                                                                   |
| ----------- | -------------------------- | ----------------------------------------------------------------------------- |
| id          | `serial primary key`       | Unique identifier for each deck. Auto-incrementing.                           |
| name        | `text`                     | The name of the deck.                                                         |
| uuid        | `uuid`                     | A unique identifier for each deck used for url path. Supabase generates this. |
| user_id     | `integer`                  | The ID of the user that created the deck.                                     |
| created_at  | `timestamp with time zone` | The time the deck was created.                                                |
| edited_at   | `timestamp with time zone` | The time the deck was last edited.                                            |
