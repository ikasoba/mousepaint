import "@ikasoba000/twind-preact";
import { install } from "@twind/core";
import { render } from "preact";
import { App } from "./app.tsx";
import config from "../twind.config.ts";

install(config);

render(<App />, document.getElementById("app")!);
