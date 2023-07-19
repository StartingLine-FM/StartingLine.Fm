import FU_Reducer from "./FU.reducer";

describe("Testing FU_Reducer:", () => {
  test("testing for correct initial state of []", () => {
    let action = {};
    let returnedState = FU_Reducer(undefined, action);
    expect(returnedState).toEqual([]);
  });

  test(`testing SET_FU action type`, () => {
    let action = {
      type: "SET_FU",
      payload: [
        {
          title: "I AM Fargo Moorhead",
          time: "July 18 @ 2:00 pm - 5:00 pm",
          location: "2001 44th St S, Fargo, ND, United States",
          description:
            "Designed to encourage and empower businesses and their employees to become better informed about FMWF and all it has to offer.I AM Fargo-Moorhead is an interactive program designed to encourage and empower businesses and their employees to become better informed about Fargo-Moorhead-West Fargo and all it has to offer.Fargo-Moorhead has visitors from all over the world, who often need advice and recommendations for where to shop, eat and play. Become an information ambassador to better serve your customers and leave […]",
        },
      ],
    };
    let returnedState = FU_Reducer(undefined, action);
    expect(returnedState).toEqual([
      {
        title: "I AM Fargo Moorhead",
        time: "July 18 @ 2:00 pm - 5:00 pm",
        location: "2001 44th St S, Fargo, ND, United States",
        description:
          "Designed to encourage and empower businesses and their employees to become better informed about FMWF and all it has to offer.I AM Fargo-Moorhead is an interactive program designed to encourage and empower businesses and their employees to become better informed about Fargo-Moorhead-West Fargo and all it has to offer.Fargo-Moorhead has visitors from all over the world, who often need advice and recommendations for where to shop, eat and play. Become an information ambassador to better serve your customers and leave […]",
      },
    ]);
  });
});
