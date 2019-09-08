import {weatherStation} from './bootstrap';
import {xeta} from 'xeta';
weatherStation.start();







// Async is a higher order function that takes a generator function as an argument

function async(generator) {
  let iterator = generator();
  let iteration = iterator.next();
  let value = iteration.value;

  if(isPromise(value)) {
    value.then( resolution => )
  }

}

async(function* () {
  try{
    let todos = yield getTodos();
  }
  catch(error) {
    console.error(error);
  }
});





function getTodos() {
  return xeta.get('https://jsonplaceholder.typicode.com/todos/1').toPromise();
}

getTodos();