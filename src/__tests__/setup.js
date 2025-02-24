import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import "@testing-library/jest-dom/vitest";
import MockAdapter from "axios-mock-adapter";
import api from "../services/api";

afterEach(() => {
  cleanup();
});

let mock = new MockAdapter(api, { onNoMatch: "throwException" });

beforeEach(() => {
  mock = new MockAdapter(api, { onNoMatch: "throwException" });
});

afterEach(() => {
  mock.restore();
});

export default mock;
