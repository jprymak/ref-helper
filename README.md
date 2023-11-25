![cover](https://jprymak.github.io/ref-helper/og.png)

# Ref-helper

Ref-helper is an application that can help HVACR engineers in their daily tasks concerning the design of cooling water, brine, or heating piping systems. A simple and intuitive user interface allows user to input fluid parameters quickly and compare resulting fluid velocity and pressure drop for each pipe diameter.

Currently, only seam and seamless steel pipes selection is supported.

## Features

- pipe selection by flow
- pipe selection by capacity
- pipe diameter range from DN15 to DN450

## How to run this app

### Visit demo page

[jprymak.github.io/ref-helper](https://jprymak.github.io/ref-helper)

### As PWA (Progressive web app)

While visiting demo page, it is possible to install this app as PWA by clicking the install icon on the address bar and following instructions. It should work without internet access after that.

### Run app locally

1. Clone or download this repository
2. Open cmd and cd to project's location
3. Type `yarn` to install all dependencies listed in package.json
4. Type `yarn start` to run server
5. Browser should automatically open http://localhost:3000

## Tools

- vite
- typescript
- react
- SASS/BEM
- classnames
- gh-pages
- vite-plugin-pwa
