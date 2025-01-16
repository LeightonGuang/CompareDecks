# Compare Decks

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## About

![screenshot](/src/_assets/images/comparedecksPage.png)

Compare Decks is a web application comparison tool for comparing anything you want, whether it be products, books, movies, card games and services.

<!-- ## Features

- Create a deck and add cards to it
- Compare multiple cards at once
- Edit and delete decks
- Edit and delete cards
-->

## Development

This project is built with Next.js, TypeScript and backend with Supabase. The frontend is styled with Tailwind CSS.

## Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/eafede55-9ddf-4356-abc8-3e0c4d65433c/deploy-status)](https://app.netlify.com/sites/comparedecks/deploys)

Deployed on Netlify.

https://comparedecks.netlify.app

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

### Cards

| Column Name | Data Type                  | Description                                         |
| ----------- | -------------------------- | --------------------------------------------------- |
| id          | `serial primary key`       | Unique identifier for each card. Auto-incrementing. |
| deck_uuid   | `uuid`                     | The uuid of the deck associated with the card.      |
| order       | `integer`                  | The order of the card in the deck.                  |
| imgUrl      | `text`                     | The URL of the image associated with the card.      |
| description | `text`                     | The description of the card.                        |
| created_at  | `timestamp with time zone` | The time the card was created.                      |
| edited_at   | `timestamp with time zone` | The time the card was last edited.                  |

### Deck Attributes

| Column Name | Data Type                  | Description                                                   |
| ----------- | -------------------------- | ------------------------------------------------------------- |
| id          | `serial primary key`       | Unique identifier for each deck attribute. Auto-incrementing. |
| deck_uuid   | `uuid`                     | The uuid of the deck associated with the attribute.           |
| order       | `integer`                  | The order of the attribute in the deck.                       |
| attribute   | `text`                     | The name of the attribute.                                    |
| created_at  | `timestamp with time zone` | The time the attribute was created.                           |
| edited_at   | `timestamp with time zone` | The time the attribute was last edited.                       |

### attribute_values

| Column Name  | Data Type                  | Description                                                    |
| ------------ | -------------------------- | -------------------------------------------------------------- |
| id           | `serial primary key`       | Unique identifier for each attribute value. Auto-incrementing. |
| attribute_id | `integer`                  | The id of the attribute associated with the value.             |
| card_id      | `integer`                  | The id of the card associated with the value.                  |
| value        | `text`                     | The value of the attribute.                                    |
| created_at   | `timestamp with time zone` | The time the attribute value was created.                      |
| edited_at    | `timestamp with time zone` | The time the attribute value was last edited.                  |
