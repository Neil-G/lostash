# Lostash

A collection of enhanced `useState` that provides utility methods for common use cases. 

[![npm version](https://img.shields.io/npm/v/lostash)](https://www.npmjs.com/package/lostash)
[![license](https://img.shields.io/npm/l/lostash)](LICENSE)
[![downloads](https://img.shields.io/npm/dt/lostash)](https://www.npmjs.com/package/lostash)

## Installation

```sh
# npm
npm install lostash

# yarn
yarn add lostash

# pnpm
pnpm add lostash
```

## Usage Examples

### `useBoolState`

#### Modal Example
```typescript
import { useBoolState } from "lostash";

function ModalExample() {
  const openState = useBoolState();
  return (
    <div>
      <button onClick={openState.setTrue}>Open Modal</button>
      <Modal isOpen={openState.isTrue} onClose={openState.setFalse} />
    </div>
  );
}
```

#### Switch Example

```typescript
function ToggleExample() {
  const checkedState = useBoolState();
  return (
    <div>
      <Switch onClick={checkedState.toggle} checked={checkedState.isTrue} />
    </div>
  );
}
```

### `useStringState`

#### Text Input Example

```jsx
import { useStringState } from "lostash";

function SearchBar() {
  const searchState = useStringState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchState.value}
        onChange={searchState.onChange}
      />
      <button onClick={searchState.clear}>Clear</button>
    </div>
  );
}
```

### `useNumberState`

#### Counter Example

```jsx
import { useNumberState } from "lostash";

function Counter() {
  const counterState = useNumberState(0);
  return (
    <div style={counterStyles}>
      <h2>Counter: {value}</h2>
      <button onClick={counterState.increment}>+1</button>
      <button onClick={counterState.decrement}>-1</button>
      <button onClick={counterState.reset}>Reset</button>
    </div>
  );
}
```

### `useArrayState`

#### To-do List Example

```jsx
import { useArrayState } from "lostash";

function TodoList() {
  const listState = useArrayState<Task>([
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Walk the dog" },
  ]);

  return (
    <div>
      <h2>To-Do List</h2>
      <ul>
        {listState.value.map((task) => (
          <li>
            {task.text}
            <button onClick={() => listState.remove(task)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => listState.push({ id: Date.now(), text: "New Task" })}>
        Add Task
      </button>
      <button onClick={listState.clear}>Clear All</button>
      <button onClick={listState.reset}>Reset</button>
    </div>
  );
}
```

## API

### useBoolState
```ts
useBoolState(initialValue?: boolean): UseBoolState
```
| Property    | Type       | Description |
|------------|-----------|-------------|
| `value`    | `boolean` | The current boolean state. |
| `set`      | `(newState: boolean) => void` | Manually set the boolean state. |
| `reset`    | `() => void` | Resets the state back to the initial value. |
| `toggle`   | `() => void` | Toggles the boolean state (`true` ↔ `false`). |
| `setTrue`  | `() => void` | Sets the state to `true`. |
| `setFalse` | `() => void` | Sets the state to `false`. |
| `isTrue`   | `boolean` | A derived boolean indicating if `value` is `true`. |
| `isFalse`  | `boolean` | A derived boolean indicating if `value` is `false`. |
