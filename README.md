# MCalculator

It is a port of the Microsoft Calculator App engine to the web, emulating the same UI on the front-end. 

This project exists to test the scope of porting Desktop utilities, written in native code, to the web so as to run everywhere #WebIsTheFuture.

Try it [here](https://muzam1l.github.io/mcalculator)

<img alt="demo" src="./engine/docs/Images/calc-screenshot.png" />

# [Engine](./engine)

The Engine is written entirely in cpp with modern and legacy C++ code mixed with Windows-specific tools. Modifying the bits here and there and making it work with CMakeTools was a challenge initially. However, after adding my thin cpp View layer to interact with the core engine, I compiled it to WebAssembly using [Emscripten](https://emscripten.org/) to make it interact with the browser environment.

# [UI](./server)

![responsive example](./engine/docs/Images/calc-resposive.gif)

UI layer was written in plain HTML, CSS, and vanilla Javascript to make it run fast and have a small footprint. Keyboard and Button clicks are captured and mapped to the engine commands. The engine does all the calculations and most of the error and state handling and sends the results back to the UI.

# Current development

Only the _Standard_ mode of the calculator is available in this build as it is supposed to be just a POC. This project is NOT under active development. Contributions are however welcomed.

# Features working as of now
* All basic operations.
* [Infinite precision](https://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic).
* History panel.
* Memory panel, with `MC`, `M+`, and `M-` functions. Hover or tap the list items to reveal these buttons.

![memory-screenshot](./engine/docs/Images/calc-memory.gif)

# Build 🤷‍♂️

You'll need _Emscripten_ to build. 

1. Download and install [Emscripten](https://emscripten.org/docs/getting_started/downloads.html#sdk-download-and-install).

2. cd to `engine/` and run:

```bash
%/path/to/emscripten%/emcmake cmake .
%/path/to/emscripten%/emmake make
%/path/to/emscripten%/emcc -02 libEngine.a CalcManager/libCalcManager.a CalcModel/libCalcModel.a  -o engine.js
```

The first two lines generate _Cmake_ files and _library.a_ files respectively in their respective folders.

See [CMakeLists.txt](./engine/CMakeLists.txt).

The third one generates the `engine.js` and `engine.wasm` which are used by the [server](./server).

# More

Now go get a life!
