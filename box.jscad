const BOTTLE_WIDTH = 28;
const BOTTLE_HEIGHT = 28;
const BOTTLE_COUNT = 4;
const WALL_THICKNESS = 4;
const INNERWALL_THICKNESS = 1;

function main() {
  let box_width = BOTTLE_WIDTH * BOTTLE_COUNT
  let box_height = BOTTLE_HEIGHT
  let box = cube({
    size: [box_width + WALL_THICKNESS*2, box_width + WALL_THICKNESS*2, box_height],
    center: [true, true, false],
    round: true,
    radius: 8,
    roundradius: 10,
    resolution: 64,
    fn: 64
  })

  let innerbox = cube({
    size: [box_width, box_width, box_height],
    center: [true, true, false]
  }).translate([0, 0, 4])
  box = difference(
    box,
    innerbox
  )

  let innerwalls = []
  for (let i=1; i<BOTTLE_COUNT; i++) {
    let wall = cube({
      size: [BOTTLE_WIDTH * BOTTLE_COUNT, INNERWALL_THICKNESS, box_height - WALL_THICKNESS-1.5],
      center: [true, true, false]
    })
      .translate([0, (BOTTLE_COUNT * BOTTLE_WIDTH)/2 + INNERWALL_THICKNESS, WALL_THICKNESS]) // normalizes position
      .translate([0, -BOTTLE_WIDTH * i - i, 0])
    innerwalls.push(wall)
  }
  for (let i=1; i<BOTTLE_COUNT; i++) {
    let wall = cube({
      size: [BOTTLE_WIDTH * BOTTLE_COUNT, INNERWALL_THICKNESS, box_height - WALL_THICKNESS -1.5],
      center: [true, true, false]
    })
      .translate([0, (BOTTLE_COUNT * BOTTLE_WIDTH)/2 + INNERWALL_THICKNESS, WALL_THICKNESS]) // normalizes position
      .translate([0, -BOTTLE_WIDTH * i - i, 0])
      .rotateZ(90)
    innerwalls.push(wall)
  }
  box = union(
    box,
    innerwalls
  )
  return box
}
