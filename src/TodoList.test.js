import {removeItem, updateOrAddItem} from "./TodoList";

function testItem(number) {
  return {
    key: number.toString(),
    val: {
      title: 'test item ' + number
    }
  }
}

function testItemList(length) {
  let list = [];
  for (let i = 0; i < length; ++i) {
    list.push(testItem(i))
  }
  return list;
}

test('testItem returns correct item', () => {
  const expectedItem = {
    key: '1',
    val: {
      title: 'test item 1'
    }
  }
  expect(testItem(1).val).toStrictEqual(expectedItem.val);
});

test('testItemList returns correct list', () => {
  expect(testItemList(2))
    .toStrictEqual(
      [{key: '0', val: {title: 'test item 0'}},
        {key: '1', val: {title: 'test item 1'}}]);
});

test('item correctly removed', () => {
  const prevState = testItemList(5);
  expect(removeItem(prevState, '4')).toStrictEqual(prevState.filter(item => item.key !== '4'));
});

test('add item to empty prevState', () => {
  const prevState = [];
  expect(updateOrAddItem(prevState, testItem(0))).toStrictEqual(testItemList(1));
})

test('add item to prevState', () => {
  const prevState = testItemList(3);
  const newItem = testItem(3);
  expect(updateOrAddItem(prevState, newItem)).toStrictEqual(testItemList(4));
});

test('update item', () => {
  const prevState = testItemList(5);
  const newItem = { key: '4', val: { title: 'updated test item 4'}};
  let newState = prevState;
  newState.splice(4, 1, newItem);

  expect(updateOrAddItem(prevState, newItem))
    .toStrictEqual(newState);
})



