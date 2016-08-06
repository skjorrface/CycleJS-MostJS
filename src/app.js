import most from 'most';
import Cycle from '@cycle/most-run';
import { makeDOMDriver, label, div, button, select, option, input } from '@cycle/dom';
import UserInput from './components/userinput';

const InstancesCombinator = (instances, sources) => {
  let arrayOfComponents = [];
  for(let i = 0; i < instances; i++) arrayOfComponents.push(UserInput(sources).DOM);
  let combinedStream = most.combineArray((...args) => div([...args]), arrayOfComponents);
  return combinedStream;
}

const intent = domSource => domSource.DOM.select('.instances-selector').events('input');
const model = intent => intent.map(selection => selection.target.value).startWith(1);
const view = (model, sources) => model.chain(instances_number => {
  return most.combine(
      (vtree, combinedInstances) => div([vtree, combinedInstances]),
      most.of(
        div('.instances-selector', [
            select([
              label('Instances to show: '),
              option({value: 1}, '1'),
              option({value: 2}, '2'),
              option({value: 3}, '3'),
              option({value: 4}, '4'),
              option({value: 5}, '5'),
              option({value: 6}, '6'),
              option({value: 7}, '7'),
              option({value: 8}, '8'),
              option({value: 9}, '9'),
              option({value: 10}, '10')
            ])
        ])), InstancesCombinator(instances_number, sources));
});

function main(sources) {
  return {
    DOM: view(model(intent(sources)), sources)
  };
}
const drivers = {
  DOM: makeDOMDriver('#app')
}

Cycle.run(main, drivers);
