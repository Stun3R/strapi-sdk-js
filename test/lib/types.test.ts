import type { StrapiResponse } from "../../src";

type DataType = {
  stringField: string;
};

describe("Strapi response types", () => {
  test("allows system fields on array elements", () => {
    const response: StrapiResponse<DataType[]> = {
      data: [
        {
          stringField: "testString1",
          id: 1,
          documentId: "awe89uawe09iwd",
        },
      ],
      meta: {},
    };

    expect(response.data[0].id).toBe(1);
    expect(response.data[0].documentId).toBe("awe89uawe09iwd");
  });

  test("allows system fields on a single document", () => {
    const response: StrapiResponse<DataType> = {
      data: {
        stringField: "testString1",
        id: 1,
        documentId: "awe89uawe09iwd",
      },
      meta: {},
    };

    expect(response.data.id).toBe(1);
    expect(response.data.documentId).toBe("awe89uawe09iwd");
  });
});
