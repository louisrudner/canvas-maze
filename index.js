const uuid = require('cuid')
const chalk = require('chalk')
const {createCanvas} = require('canvas')
const mazeGenerator = require('maze-gen')
const { promisify } = require('util')
const fs = require('fs')
const writeFile = promisify(fs.writeFile)

// Number rounding function.
const round = x => y => Math.round(y / x) * x

// The image making function.
module.exports = (filetype, writeTo, width, height, size, thickness, write = true, entranceExit = true, highDPI = true) => {
  // Double sizes if HighDPI is active
  highDPI && (width = width * 2)
  highDPI && (height = height * 2)
  highDPI && (size = size * 2)
  highDPI && (thickness = thickness * 2)

  // Configure canvas
  const canvas = createCanvas(width, height, filetype)
  const ctx = canvas.getContext('2d')

  // Configure size specifications
  if (highDPI) {}
  width = round(size)(width - (thickness * 3))
  height = round(size)(height - (thickness * 3))
  const cell = {
    width: size,
    height: size
  }

  // Generate maze data based on size specifications
  const maze = mazeGenerator(height / size, width / size)

  // Generate the canvas maze based on the maze data.
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      maze[y][x].top && ctx.fillRect(cell.width * x, cell.height * y, cell.width, thickness)
      maze[y][x].right && ctx.fillRect(cell.width * x + size, cell.height * y, thickness, cell.height + thickness)
      maze[y][x].bottom && ctx.fillRect(cell.width * x, cell.height * y + size, cell.width, thickness)
      maze[y][x].left && ctx.fillRect(cell.width * x, cell.height * y, thickness, cell.height + thickness)
    }
  }

  // Generate the start and end points if requested.
  ctx.fillStyle = 'red'
  entranceExit && ctx.fillRect(0, 0, cell.width, thickness)
  entranceExit && ctx.fillRect(width - cell.width, height, cell.width, thickness)

  // Output either an SVG or PNG.
  const uid = uuid().slice(0, 8)
  write && filetype === 'png' && writeFile(`${writeTo}/maze-${size}-${uid}.png`, canvas.toBuffer())
  write && filetype === 'svg' && writeFile(`${writeTo}/maze-${size}-${uid}.svg`, canvas.toBuffer())
  console.log(chalk.green(`Finished writing file: ${writeTo}/maze-${size}-${uid}.${filetype}`))
  
  return canvas
}
