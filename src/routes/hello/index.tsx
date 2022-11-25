import { component$, useStore, useWatch$ } from "@builder.io/qwik";

export default component$(() => {
  const store = useStore<{
    text: string;
    guesses: string[];
    result: string;
    wrongGuesses: number;
  }>({
    text: "",
    guesses: [],
    result: "",
    wrongGuesses: 0,
  });

  const targetWord = "hello";

  const calculatePreview$ = (guesses: string[]) => {
    let result = "";

    for (let c of targetWord) {
      if (guesses.includes(c)) {
        result += c;
      } else {
        result += "_";
      }
      result += " ";
    }
    return result;
  };

  useWatch$(({ track }) => {});

  const text =
    store.result.length == 0 ? calculatePreview$(store.guesses) : store.result;

  return (
    <div>
      <p>{text}</p>
      <p>Wrong guesses: {store.wrongGuesses}</p>
      <p>
        <input
          value={store.text}
          onInput$={(e) => {
            store.text = (e.target as HTMLInputElement).value;
          }}
        ></input>
        <button
          onClick$={() => {
            if (store.text.length == 1) {
              if (targetWord.includes(store.text)) {
                store.guesses.push(store.text);
                store.guesses = [...store.guesses];
              } else {
                store.wrongGuesses++;
              }
            } else if (store.text == targetWord) {
              for (let c of store.text) {
                store.guesses.push(c);
              }
              store.guesses = [...store.guesses];
            } else {
              store.wrongGuesses++;
            }

            if (store.wrongGuesses > 9) {
              alert("LOST");
            }

            let result = "";

            for (let c of targetWord) {
              if (store.guesses.includes(c)) {
                result += c;
              } else {
                result += "_";
              }
              result += " ";
            }

            if (!result.includes("_")) {
              alert("WON");
            }

            store.text = "";
          }}
        >
          Click
        </button>
      </p>
    </div>
  );
});
