import {urlMatchCheck, truncate} from "./helpers"

  test(`Url and pathname comparison ignores trailing "/"`, () => {
    expect(urlMatchCheck("/ref-helper/", "/ref-helper")).toBe(true);
  });

  test("Truncate first word of long fluid name", () => {
    expect(truncate("Ethylene Glycol 25%")).toBe("E. Glycol 25%");
    expect(truncate("Water")).toBe("Water");
  });
