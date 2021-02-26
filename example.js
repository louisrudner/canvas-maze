const maze = require('./index')

for (let i = 5; i < 15; i++) {
  maze('png', 'images', 970, 342, i, 2)
}
