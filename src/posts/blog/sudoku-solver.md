---
title: "Sudoku Solver"
category: "Code"
date: "2022-09-01 02:00:00"
desc: "This is a Sudoku Solver, that helps you solve hard Sudoku puzzles."
thumbnail: "/images/sudoku-solver/sudoku.png"
alt: "Sudoku solver React.js"
---

## Project Description:

With this App, you will be able to solve puzzles in different ways. For instance, if you are stuck in solving a particular value, with this app you will be able to get the correct value for the input you got stuck at. Also, Just in case you just want to quickly solve the entire puzzle, with this App you will be able to get all the values all at once. Furthermore, you have the ability to pass in unsolved sudoku.

With the Code, you can also store your Sudoku Array values, this means the code is structured in such a way that, even if you add new array values or change existing values the code doesn't break. However, you should only include real sudoku puzzle values, and not formulated values, as you won't get an answer for that.

## Reason for Technologies

I faced some difficulties, in keeping the Logic for handling the input Array together to work with the Solver. But I was able to utilize React Hooks and Prop drilling to keep the code consistent. While building this app, I had an initial intent of just making it a simple solver, but during development, it become more interesting, I began to add more features to make it more interactive for the end user. I intend on doing more research on how to improve the code base.

## Table of Contents

- How to install and run the project:
- How to use the Project:
- Roadmap
- License

### How to build and run the project:

First, run the development server:

    npm install

Next run the server:

    npm run dev
    # or
    yarn dev

Open http://localhost:3000 with your browser to see the result.

### Development Roadmap

> SudokuApp: # Takes in other components
>
> Header: # Title, and Input field.
>
> SudokuContainer: # all input fields for the sudoku matrix
>
> Keyboard: # Keyboard for mobile display
>
> SudokuInput: # Input field for sudoku array
>
> DesktopButtons: # Sudoku puzzle solver and refresh buttons

## How to use this project

The opened web app should look like this
![onload](https://res.cloudinary.com/devkp5za2/image/upload/v1674781223/sudoku-solver/onload_image_uvi5ka.jpg)

To solve all empty fields for the sudoku value you will click on th puzzle Icon
![puzzle-icon](https://res.cloudinary.com/devkp5za2/image/upload/v1674781221/sudoku-solver/sudoku_solveAll_zlh9ua.jpg)

This is a sample of a solved sudoku puzzle:
![solved](https://res.cloudinary.com/devkp5za2/image/upload/v1674781223/sudoku-solver/solved_sudokuy_matrix_rs3wbs.jpg)

You can as well refresh the Input to remove the solved sudoku values. by clicking on the refresh icon
![refresh](https://res.cloudinary.com/devkp5za2/image/upload/v1674781222/sudoku-solver/refresh_sudoku_matrix_g3avu4.jpg)

With this app you have the luxury to input your own sudoku values, to be solved. Note make sure the last digit is a zero value. Plus refreshing the Browser will render fresh Sudoku input values.
![input](https://res.cloudinary.com/devkp5za2/image/upload/v1674781222/sudoku-solver/input_unsolved_values_kt11hl.jpg)

Then you can go ahead to input your own values.
Note: the value "0" depicts empty field, that is how the algorithm detects an empty field. example: "401090602300100954695000087100053020850071003000208010209807040000360000734000060" Then, click the enter Icon to push the values to the matrix.
![input-array](https://res.cloudinary.com/devkp5za2/image/upload/v1674781223/sudoku-solver/RENDER_NEW_INPUT_VALUES_jp3ove.jpg)

## Deployed on vercel

checkout the App [Sudokanary](https://sudokanary.vercel.app/)
