# Canvas Maze

A Module for Creating Maze Images w/ Canvas

![Maze Example](./maze-example.png)

## Usage:

## What does it do?
It generates a maze to your specifications of width, height, cell size and line thickness and outputs either an SVG or PNG file.

The function returns the output canvas so you can call canvas methods on it yourself.

## Example

```javascript
const maze = require('./index')
maze('png', 'images', 970, 342, 10, 2)
```
