import { GlobalWithFetchMock } from "jest-fetch-mock";
import { configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import "mock-local-storage";

configure({ adapter: new Adapter() });

const customGlobal = global as GlobalWithFetchMock;
customGlobal.fetch = require("jest-fetch-mock");
customGlobal.fetchMock = customGlobal.fetch;
