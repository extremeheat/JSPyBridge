/**
 * Space Invaider game, Created by Meezan malek ported to JavaScript
 */
import { python } from 'pythonia'
import { setInterval } from 'timers/promises'
import { execSync } from 'child_process'
const pygame = await python('pygame')
const { mixer } = pygame

python.setFastMode(true)
python.cwd() // Allow us to import files relative to this folder

// Download the assets if not already downloaded...
const ap = 'https://raw.githubusercontent.com/meezan-mallick/space_invader_game/master/'
if (!(await import('fs')).existsSync('background.png')) ['background.png', 'background.wav', 'bullet.png', 'enemy.png', 'explosion.wav', 'laser.wav', 'player.png'].forEach(a => execSync(`curl -LO ${ap}/${a}`))

// Init game
await pygame.init()

// Create a screen
const screen = await pygame.display.set_mode([800, 600])

// Title and icon
await pygame.display.set_caption('Space Invaiders')
const icon = await pygame.image.load('player.png')
await pygame.display.set_icon(icon)
// Background image
const backgroundImg = await pygame.image.load('background.png')

// Background sound
await mixer.music.load('background.wav')
await mixer.music.play(-1)

// Defining our player
const playerIcon = await pygame.image.load('player.png')
let playerX = 370
const playerY = 480
let changedX = 0
const playerSpeed = 9

// Score
let scoreValue = 0
const font = await pygame.font.Font('freesansbold.ttf', 32)

async function showScore (x, y) {
  const score = await font.render(`Score : ${scoreValue}`, true, [255, 255, 255])
  await screen.blit(score, [x, y])
}

async function gameOver () {
  const overfont = await pygame.font.Font('freesansbold.ttf', 64)
  const gamefont = await overfont.render('GAME OVER', true, [255, 255, 255])
  await screen.blit(gamefont, [200, 250])
}

async function meezan (x, y) {
  const font2 = await pygame.font.Font('freesansbold.ttf', 16)
  const score = await font2.render('Developed by Meezan malik', true, [255, 255, 255])
  await screen.blit(score, [x, y])
}

async function player (x, y) {
  await screen.blit(playerIcon, [x, y])
}

function randint (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

// # Enemy
const enemyImg = []
const enemyX = []
const enemyY = []
const enemyX_change = []
const enemyY_change = []
const num_of_enemies = 6

for (let i = 0; i < num_of_enemies; i++) {
  await enemyImg.push(await pygame.image.load('enemy.png'))
  await enemyX.push(randint(0, 736))
  await enemyY.push(randint(50, 150))
  await enemyX_change.push(4)
  await enemyY_change.push(40)
}

async function enemy (x, y, i) {
  await screen.blit(await enemyImg[i], [x, y])
}

// # defining our bullet
const bullet_icon = await pygame.image.load('bullet.png')
let bulletX = 0
let bulletY = 480
const bulletY_changed = 15 // bullet speed
let bullet_state = 'ready'

async function bullet (x, y) {
  bullet_state = 'fired'
  await screen.blit(bullet_icon, [x + 16, y + 10])
}

function isCollision (enemyX, enemyY, bulletX, bulletY) {
  const distance = Math.sqrt(Math.pow(enemyX - bulletX, 2) + (Math.pow(enemyY - bulletY, 2)))
  if (distance < 27) return true
  return false
}

const [Quit, Press, Release, Left, Right, Space] = await Promise.all([pygame.QUIT, pygame.KEYDOWN, pygame.KEYUP, pygame.K_LEFT, pygame.K_RIGHT, pygame.K_SPACE])

let running = true
// # main game loop
while (running) {
  await screen.fill([0, 0, 0]) // background
  await screen.blit(backgroundImg, [0, 0])
  for await (const event of await pygame.event.get()) {
    let key
    switch (await event.type) {
      case Quit:
        running = false
        break
      case Press:
        key = await event.key
        if (key === Left) changedX = -playerSpeed
        if (key === Right) changedX = playerSpeed
        if (key === Space) {
          if (bullet_state === 'ready') {
            const bullet_sound = await mixer.Sound('laser.wav')
            await bullet_sound.play()
            bulletX = playerX
            bullet_state = 'fired'
          }
        }
        break
      case Release:
        key = await event.key
        if (key === Left || key === Right) changedX = 0
    }
  }

  // Player movement
  playerX += changedX
  // Restricting the player inside the window
  if (playerX <= 0) playerX = 0
  else if (playerX >= 736) playerX = 736

  for (let i = 0; i < num_of_enemies; i++) {
    if (enemyY[i] > 400) {
      // Game over
      for (let j = 0; j < num_of_enemies; j++) enemyY[j] = 2000
      await gameOver()
      await meezan(300, 350)
      break
    }

    enemyX[i] += enemyX_change[i]
    if (enemyX[i] <= 0) {
      enemyX_change[i] = 4
      enemyY[i] += enemyY_change[i]
    } else if (enemyX[i] >= 736) {
      enemyX_change[i] = -4
      enemyY[i] += enemyY_change[i]
    }

    const collision = isCollision(enemyX[i], enemyY[i], bulletX, bulletY)
    if (collision) {
      mixer.Sound('explosion.wav').then(sound => sound.play())
      bulletY = 480
      bullet_state = 'ready'
      scoreValue += 1
      enemyX[i] = randint(0, 736)
      enemyY[i] = randint(50, 150)
    }

    await enemy(enemyX[i], enemyY[i], i)
  }

  if (bulletY <= 0) {
    bulletY = 480
    bullet_state = 'ready'
  }

  if (bullet_state === 'fired') {
    await bullet(bulletX, bulletY)
    bulletY -= bulletY_changed
  }

  await showScore(10, 10)

  await player(playerX, playerY)
  await pygame.display.update()

  await setInterval(20)
}
python.exit()
