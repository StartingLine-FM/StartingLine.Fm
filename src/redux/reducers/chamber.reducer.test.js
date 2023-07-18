import chamber_Reducer from "./chamber.reducer";

describe("Testing chamber_Reducer:", () => {
  test("testing for correct initial state of []", () => {
    let action = {};
    let returnedState = chamber_Reducer(undefined, action);
    expect(returnedState).toEqual([]);
  });

  test(`testing SET_CHAMBER action type`, () => {
    let action = {
      type: "SET_CHAMBER",
      payload: [
        {
          title: "Minnesota Legislative Wrap-Up July 2023",
          time: "Tuesday Jul 18, 2023",
          description:
            "Join us on Tuesday, July 18th at 4 p.m. for The Chamber’s 2023 Minnesota Legislative Wrap-up event. This event will bring together key Clay County state legislators to highlight the significant outcomes of the Minnesota legislative session that just recently adjourned.",
        },
      ],
    };
    let returnedState = chamber_Reducer(undefined, action);
    expect(returnedState).toEqual([
      {
        title: "Minnesota Legislative Wrap-Up July 2023",
        time: "Tuesday Jul 18, 2023",
        description:
          "Join us on Tuesday, July 18th at 4 p.m. for The Chamber’s 2023 Minnesota Legislative Wrap-up event. This event will bring together key Clay County state legislators to highlight the significant outcomes of the Minnesota legislative session that just recently adjourned.",
      },
    ]);
  });
});
