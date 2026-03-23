// OOP Snake Game Engine

export const CELL = 20;
export const COLS = 25;
export const ROWS = 25;

const DIR = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const OPPOSITES = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };

class Food {
  constructor() {
    this.pos = { x: 10, y: 10 };
  }

  respawn(snakeBody) {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      };
    } while (snakeBody.some((s) => s.x === pos.x && s.y === pos.y));
    this.pos = pos;
  }
}

class Snake {
  constructor() {
    this.body = [
      { x: 12, y: 12 },
      { x: 11, y: 12 },
      { x: 10, y: 12 },
    ];
    this.dir = "RIGHT";
    this.nextDir = "RIGHT";
    this.grew = false;
  }

  setDir(dir) {
    if (dir !== OPPOSITES[this.dir]) this.nextDir = dir;
  }

  move() {
    this.dir = this.nextDir;
    const head = this.body[0];
    const d = DIR[this.dir];
    const newHead = { x: head.x + d.x, y: head.y + d.y };
    this.body.unshift(newHead);
    if (!this.grew) this.body.pop();
    this.grew = false;
    return newHead;
  }

  grow() {
    this.grew = true;
  }

  hitWall() {
    const { x, y } = this.body[0];
    return x < 0 || x >= COLS || y < 0 || y >= ROWS;
  }

  hitSelf() {
    const [head, ...rest] = this.body;
    return rest.some((s) => s.x === head.x && s.y === head.y);
  }
}

export class GameEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.snake = new Snake();
    this.food = new Food();
    this.food.respawn(this.snake.body);
    this.score = 0;
    this.over = false;
    this.started = false;
  }

  start() {
    this.started = true;
  }

  input(dir) {
    this.snake.setDir(dir);
  }

  tick() {
    if (!this.started || this.over) return;

    this.snake.move();

    if (this.snake.hitWall() || this.snake.hitSelf()) {
      this.over = true;
      return;
    }

    const head = this.snake.body[0];
    if (head.x === this.food.pos.x && head.y === this.food.pos.y) {
      this.snake.grow();
      this.score += 10;
      this.food.respawn(this.snake.body);
    }
  }

  getState() {
    return {
      snake: this.snake.body,
      food: this.food.pos,
      score: this.score,
      over: this.over,
      started: this.started,
    };
  }
}
