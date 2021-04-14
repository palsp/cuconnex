"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const build_component_1 = require("../src/build-component");
describe("build component functions", function () {
  it("getFileName - should return the correct file name", function () {
    chai_1
      .expect(build_component_1.getFileName("src/components/button.tsx"))
      .to.equal("button.tsx");
    chai_1
      .expect(build_component_1.getFileName("src/components/button.jsx"))
      .to.equal("button.jsx");
    chai_1
      .expect(build_component_1.getFileName("src/components/button.js"))
      .to.equal("button.js");
    chai_1
      .expect(build_component_1.getFileName("src/components/button.spec.ts"))
      .to.equal("button.spec.ts");
    chai_1
      .expect(build_component_1.getFileName("src/components/assets/data.json"))
      .to.equal("data.json");
  });
  it("getBitAddCommand - should work with default component object", function () {
    const files = Object.keys(build_component_1.getDefaultComponent());
    let compId = build_component_1.getFileName(files[0]);
    compId = compId.substring(0, compId.indexOf("."));
    const command = build_component_1.getBitAddCommand(files, compId);
    chai_1
      .expect(command)
      .to.equal(
        'bit add src/comp.tsx src/test.css src/types.d.ts src/try.svg --main src/comp.tsx --id comp --tests ""'
      );
  });
  it("getBitAddCommand - should work with custom component object", function () {
    const component = {
      "src/comp.js": "",
      "src/comp.css": "",
    };
    const files = Object.keys(component);
    let compId = build_component_1.getFileName(files[0]);
    compId = compId.substring(0, compId.indexOf("."));
    const command = build_component_1.getBitAddCommand(files, compId);
    chai_1
      .expect(command)
      .to.equal(
        'bit add src/comp.js src/comp.css --main src/comp.js --id comp --tests ""'
      );
  });
  it("getBitAddCommand - should work with custom component object and test files", function () {
    const component = {
      "src/button.tsx": "",
      "src/style.css": "",
      "src/button.spec.ts": "",
      "src/button2.spec.ts": "",
    };
    const files = Object.keys(component);
    let compId = build_component_1.getFileName(files[0]);
    compId = compId.substring(0, compId.indexOf("."));
    const command = build_component_1.getBitAddCommand(files, compId);
    chai_1
      .expect(command)
      .to.equal(
        'bit add src/button.tsx src/style.css --main src/button.tsx --id button --tests "src/button.spec.ts,src/button2.spec.ts"'
      );
  });
});
