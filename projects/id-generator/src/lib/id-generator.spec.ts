import { idGenerator } from "./id-generator";

describe("idGenerator", () => {
	it("should work", () => {
		expect(idGenerator()).toEqual("id-generator");
	});
});
