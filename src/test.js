
export function *greetGenerator() {
    let index = 0;
    while(++index) {
      console.log('Hello ', yield);
    }
  }
